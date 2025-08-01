#!/usr/bin/env node

// 资源压缩脚本 - 使用前请安装依赖：
// npm install terser cssnano postcss autoprefixer

const fs = require('fs').promises;
const path = require('path');
const { minify } = require('terser');
const postcss = require('postcss');
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');

// 配置
const config = {
    js: {
        files: [
            'script.js',
            'animations.js',
            'performance.js',
            'image-optimizer.js',
            'languages.js',
            'project-detail.js'
        ],
        options: {
            compress: {
                drop_console: true,
                drop_debugger: true,
                pure_funcs: ['console.log']
            },
            mangle: {
                safari10: true
            },
            format: {
                comments: false
            }
        }
    },
    css: {
        files: [
            'style.css',
            'loader.css',
            'critical.css'
        ],
        options: {
            preset: ['default', {
                discardComments: {
                    removeAll: true
                }
            }]
        }
    }
};

// 压缩 JavaScript
async function compressJS() {
    console.log('开始压缩 JavaScript 文件...');
    
    for (const file of config.js.files) {
        try {
            const filePath = path.join(__dirname, file);
            const code = await fs.readFile(filePath, 'utf8');
            const result = await minify(code, config.js.options);
            
            if (result.error) {
                console.error(`压缩 ${file} 失败:`, result.error);
                continue;
            }
            
            // 创建压缩文件
            const minFile = file.replace('.js', '.min.js');
            await fs.writeFile(path.join(__dirname, minFile), result.code);
            
            // 计算压缩率
            const originalSize = Buffer.byteLength(code);
            const minifiedSize = Buffer.byteLength(result.code);
            const savings = ((originalSize - minifiedSize) / originalSize * 100).toFixed(2);
            
            console.log(`✓ ${file} -> ${minFile} (节省 ${savings}%)`);
        } catch (error) {
            console.error(`处理 ${file} 时出错:`, error);
        }
    }
}

// 压缩 CSS
async function compressCSS() {
    console.log('\n开始压缩 CSS 文件...');
    
    for (const file of config.css.files) {
        try {
            const filePath = path.join(__dirname, file);
            const css = await fs.readFile(filePath, 'utf8');
            
            const result = await postcss([
                autoprefixer(),
                cssnano(config.css.options)
            ]).process(css, { from: filePath });
            
            // 创建压缩文件
            const minFile = file.replace('.css', '.min.css');
            await fs.writeFile(path.join(__dirname, minFile), result.css);
            
            // 计算压缩率
            const originalSize = Buffer.byteLength(css);
            const minifiedSize = Buffer.byteLength(result.css);
            const savings = ((originalSize - minifiedSize) / originalSize * 100).toFixed(2);
            
            console.log(`✓ ${file} -> ${minFile} (节省 ${savings}%)`);
        } catch (error) {
            console.error(`处理 ${file} 时出错:`, error);
        }
    }
}

// 创建资源映射文件
async function createAssetMap() {
    console.log('\n创建资源映射文件...');
    
    const assetMap = {
        js: {},
        css: {}
    };
    
    // 添加版本号
    const version = Date.now();
    
    for (const file of config.js.files) {
        const minFile = file.replace('.js', '.min.js');
        assetMap.js[file] = `${minFile}?v=${version}`;
    }
    
    for (const file of config.css.files) {
        const minFile = file.replace('.css', '.min.css');
        assetMap.css[file] = `${minFile}?v=${version}`;
    }
    
    await fs.writeFile(
        path.join(__dirname, 'asset-map.json'),
        JSON.stringify(assetMap, null, 2)
    );
    
    console.log('✓ 资源映射文件已创建');
}

// 主函数
async function main() {
    console.log('资源压缩工具 v1.0.0\n');
    
    try {
        await compressJS();
        await compressCSS();
        await createAssetMap();
        
        console.log('\n✨ 所有资源压缩完成！');
        console.log('\n提示：请更新 HTML 文件中的资源引用，使用压缩后的文件。');
    } catch (error) {
        console.error('压缩过程中出现错误:', error);
        process.exit(1);
    }
}

// 运行
if (require.main === module) {
    main();
}