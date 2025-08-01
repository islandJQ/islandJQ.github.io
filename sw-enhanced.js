// Enhanced Service Worker with advanced caching strategies
const CACHE_VERSION = 'v2.0.1';
const CACHE_NAME = `islandJQ-${CACHE_VERSION}`;
const IMAGE_CACHE = `islandJQ-images-${CACHE_VERSION}`;
const FONT_CACHE = `islandJQ-fonts-${CACHE_VERSION}`;
const API_CACHE = `islandJQ-api-${CACHE_VERSION}`;

// 不同资源的缓存策略
const cacheStrategies = {
    // 静态资源 - Cache First
    static: [
        '/',
        '/index.html',
        '/style.css',
        '/critical.css',
        '/script.js',
        '/animations.js',
        '/languages.js',
        '/performance.js',
        '/image-optimizer.js',
        '/loader.css',
        '/manifest.json'
    ],
    // 页面 - Network First
    pages: [
        '/works.html',
        '/me.html',
        '/news.html',
        '/publications.html',
        '/contact.html',
        '/project-detail.html',
        '/publication-detail.html',
        '/contact-form.html'
    ],
    // 图片 - Cache First with Network Fallback
    images: /\.(jpg|jpeg|png|gif|webp|avif|svg)$/i,
    // 字体 - Cache First (长期缓存)
    fonts: /\.(woff|woff2|ttf|otf)$/i,
    // API 请求 - Network First with Cache Fallback
    api: /\/api\//
};

// 安装事件 - 预缓存关键资源
self.addEventListener('install', event => {
    console.log('Service Worker installing...');
    
    event.waitUntil(
        Promise.all([
            // 缓存静态资源
            caches.open(CACHE_NAME).then(cache => {
                return cache.addAll(cacheStrategies.static);
            }),
            // 缓存字体
            caches.open(FONT_CACHE).then(cache => {
                return cache.addAll([
                    'https://fonts.googleapis.com/css2?family=DIN+Next+LT+Pro:wght@100;200;300;400;500;600;700&display=swap',
                    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css'
                ]);
            })
        ]).then(() => self.skipWaiting())
    );
});

// 激活事件 - 清理旧缓存
self.addEventListener('activate', event => {
    console.log('Service Worker activating...');
    
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (!cacheName.includes(CACHE_VERSION)) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// Fetch 事件 - 智能缓存策略
self.addEventListener('fetch', event => {
    const { request } = event;
    const url = new URL(request.url);
    
    // 忽略非 GET 请求
    if (request.method !== 'GET') return;
    
    // 忽略浏览器扩展
    if (url.protocol === 'chrome-extension:') return;
    
    // 图片资源 - Cache First
    if (cacheStrategies.images.test(url.pathname)) {
        event.respondWith(
            caches.open(IMAGE_CACHE).then(cache => {
                return cache.match(request).then(cachedResponse => {
                    if (cachedResponse) {
                        // 后台更新缓存
                        fetchAndCache(request, IMAGE_CACHE);
                        return cachedResponse;
                    }
                    return fetchAndCache(request, IMAGE_CACHE);
                });
            })
        );
        return;
    }
    
    // 字体资源 - Cache First (长期缓存)
    if (cacheStrategies.fonts.test(url.pathname) || url.hostname.includes('fonts')) {
        event.respondWith(
            caches.open(FONT_CACHE).then(cache => {
                return cache.match(request).then(cachedResponse => {
                    return cachedResponse || fetchAndCache(request, FONT_CACHE);
                });
            })
        );
        return;
    }
    
    // API 请求 - Network First
    if (cacheStrategies.api.test(url.pathname)) {
        event.respondWith(
            fetch(request)
                .then(response => {
                    const responseClone = response.clone();
                    caches.open(API_CACHE).then(cache => {
                        cache.put(request, responseClone);
                    });
                    return response;
                })
                .catch(() => {
                    return caches.match(request);
                })
        );
        return;
    }
    
    // 页面 - Network First with Offline Support
    if (cacheStrategies.pages.includes(url.pathname) || url.pathname.endsWith('.html')) {
        event.respondWith(
            fetch(request)
                .then(response => {
                    const responseClone = response.clone();
                    caches.open(CACHE_NAME).then(cache => {
                        cache.put(request, responseClone);
                    });
                    return response;
                })
                .catch(() => {
                    return caches.match(request).then(cachedResponse => {
                        return cachedResponse || caches.match('/offline.html');
                    });
                })
        );
        return;
    }
    
    // 默认策略 - Cache First
    event.respondWith(
        caches.match(request).then(cachedResponse => {
            return cachedResponse || fetch(request).then(response => {
                // 只缓存成功的响应
                if (response.status === 200) {
                    const responseClone = response.clone();
                    caches.open(CACHE_NAME).then(cache => {
                        cache.put(request, responseClone);
                    });
                }
                return response;
            });
        })
    );
});

// 辅助函数 - 获取并缓存
function fetchAndCache(request, cacheName) {
    return fetch(request).then(response => {
        // 只缓存成功的响应
        if (response.status === 200) {
            const responseClone = response.clone();
            caches.open(cacheName).then(cache => {
                cache.put(request, responseClone);
            });
        }
        return response;
    }).catch(() => {
        // 如果网络失败，尝试从缓存返回
        return caches.match(request);
    });
}

// 后台同步
self.addEventListener('sync', event => {
    if (event.tag === 'sync-data') {
        event.waitUntil(syncData());
    }
});

// 推送通知
self.addEventListener('push', event => {
    const options = {
        body: event.data ? event.data.text() : '您有新的更新',
        icon: '/images/icon-192.png',
        badge: '/images/badge-72.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };
    
    event.waitUntil(
        self.registration.showNotification('islandJQ Design Studio', options)
    );
});

// 消息处理
self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
    
    if (event.data && event.data.type === 'CLEAR_CACHE') {
        event.waitUntil(
            caches.keys().then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cacheName => caches.delete(cacheName))
                );
            })
        );
    }
});

// 定期清理缓存
async function cleanupCaches() {
    const maxAge = 7 * 24 * 60 * 60 * 1000; // 7天
    const now = Date.now();
    
    const cacheNames = await caches.keys();
    
    for (const cacheName of cacheNames) {
        const cache = await caches.open(cacheName);
        const requests = await cache.keys();
        
        for (const request of requests) {
            const response = await cache.match(request);
            if (response) {
                const dateHeader = response.headers.get('date');
                if (dateHeader) {
                    const cacheTime = new Date(dateHeader).getTime();
                    if (now - cacheTime > maxAge) {
                        await cache.delete(request);
                    }
                }
            }
        }
    }
}

// 每小时清理一次缓存
setInterval(cleanupCaches, 60 * 60 * 1000);