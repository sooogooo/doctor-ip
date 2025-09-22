const fs = require('fs');
const path = require('path');

class EbookBuilder {
    constructor() {
        this.contentDir = path.join(__dirname, '../content');
        this.outputDir = path.join(__dirname, '../dist');
        this.chapters = [
            { file: '01-positioning.md', title: '第一章：医美IP定位策略' },
            { file: '02-content.md', title: '第二章：内容生产体系' },
            { file: '03-compliance.md', title: '第三章：合规传播机制' },
            { file: '04-brand.md', title: '第四章：品牌资产建设' }
        ];
    }

    async build() {
        console.log('🚀 开始构建美容医生IP建设电子书...');
        
        try {
            // 确保输出目录存在
            if (!fs.existsSync(this.outputDir)) {
                fs.mkdirSync(this.outputDir, { recursive: true });
            }

            // 生成HTML版本
            await this.generateHTML();
            
            console.log('✅ 电子书构建完成！');
            console.log(`📁 输出目录: ${this.outputDir}`);
            
        } catch (error) {
            console.error('❌ 构建失败:', error.message);
            process.exit(1);
        }
    }

    async generateHTML() {
        console.log('📄 生成HTML版本...');
        
        let htmlContent = this.getHTMLTemplate();
        let tableOfContents = '';
        let mainContent = '';

        // 处理每个章节
        for (const chapter of this.chapters) {
            const chapterPath = path.join(this.contentDir, 'chapters', chapter.file);
            
            if (fs.existsSync(chapterPath)) {
                const content = fs.readFileSync(chapterPath, 'utf8');
                const chapterId = chapter.file.replace('.md', '');
                
                tableOfContents += `<li><a href="#${chapterId}">${chapter.title}</a></li>\n`;
                mainContent += `<section id="${chapterId}" class="chapter">\n`;
                mainContent += `<h1>${chapter.title}</h1>\n`;
                mainContent += this.markdownToHTML(content);
                mainContent += `</section>\n\n`;
            } else {
                console.log(`⚠️  章节文件不存在: ${chapterPath}`);
            }
        }

        // 替换模板内容
        htmlContent = htmlContent.replace('{{TABLE_OF_CONTENTS}}', tableOfContents);
        htmlContent = htmlContent.replace('{{MAIN_CONTENT}}', mainContent);

        // 写入文件
        const outputPath = path.join(this.outputDir, 'ebook.html');
        fs.writeFileSync(outputPath, htmlContent, 'utf8');
        
        console.log(`✅ HTML版本已生成: ${outputPath}`);
    }

    markdownToHTML(markdown) {
        // 简单的Markdown转HTML（实际项目中建议使用marked库）
        return markdown
            .replace(/^# (.*$)/gim, '<h1>$1</h1>')
            .replace(/^## (.*$)/gim, '<h2>$1</h2>')
            .replace(/^### (.*$)/gim, '<h3>$1</h3>')
            .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
            .replace(/\*(.*)\*/gim, '<em>$1</em>')
            .replace(/\n\n/gim, '</p><p>')
            .replace(/^(?!<[h1-6]|<p|<\/)(.+)/gim, '<p>$1</p>');
    }

    getHTMLTemplate() {
        return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>美容医生IP建设</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;
            line-height: 1.8;
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
            background-color: #fafafa;
        }
        
        .header {
            text-align: center;
            padding: 40px 0;
            border-bottom: 3px solid #2c5aa0;
            margin-bottom: 40px;
        }
        
        .header h1 {
            font-size: 2.5em;
            color: #2c5aa0;
            margin: 0;
        }
        
        .subtitle {
            font-size: 1.2em;
            color: #666;
            margin: 10px 0 0 0;
        }
        
        .toc {
            background: white;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            margin-bottom: 40px;
        }
        
        .toc h2 {
            color: #2c5aa0;
            border-bottom: 2px solid #e0e0e0;
            padding-bottom: 10px;
        }
        
        .toc ul {
            list-style: none;
            padding: 0;
        }
        
        .toc li {
            margin: 15px 0;
            padding-left: 20px;
            position: relative;
        }
        
        .toc li:before {
            content: "📚";
            position: absolute;
            left: 0;
        }
        
        .toc a {
            text-decoration: none;
            color: #333;
            font-weight: 500;
            transition: color 0.3s;
        }
        
        .toc a:hover {
            color: #2c5aa0;
        }
        
        .chapter {
            background: white;
            padding: 40px;
            margin-bottom: 40px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        
        .chapter h1 {
            color: #2c5aa0;
            border-bottom: 3px solid #2c5aa0;
            padding-bottom: 15px;
            margin-bottom: 30px;
        }
        
        .chapter h2 {
            color: #34495e;
            margin: 30px 0 20px 0;
            padding-left: 15px;
            border-left: 4px solid #3498db;
        }
        
        .chapter h3 {
            color: #2c3e50;
            margin: 25px 0 15px 0;
        }
        
        .chapter p {
            text-align: justify;
            color: #2c3e50;
            margin: 15px 0;
        }
        
        .chapter strong {
            color: #e74c3c;
        }
        
        .footer {
            text-align: center;
            padding: 40px 0;
            color: #666;
            border-top: 1px solid #e0e0e0;
            margin-top: 40px;
        }
        
        @media (max-width: 768px) {
            body {
                padding: 10px;
            }
            
            .chapter {
                padding: 20px;
            }
            
            .toc {
                padding: 20px;
            }
        }
    </style>
</head>
<body>
    <header class="header">
        <h1>美容医生IP建设</h1>
        <p class="subtitle">务实可执行的品牌建设指南</p>
    </header>
    
    <div class="toc">
        <h2>目录</h2>
        <ul>
            {{TABLE_OF_CONTENTS}}
        </ul>
    </div>
    
    <main>
        {{MAIN_CONTENT}}
    </main>
    
    <footer class="footer">
        <p>© 2024 美容医生IP建设项目组 | 务实·合规·可执行</p>
    </footer>
</body>
</html>`;
    }
}

// 执行构建
if (require.main === module) {
    const builder = new EbookBuilder();
    builder.build();
}

module.exports = EbookBuilder;