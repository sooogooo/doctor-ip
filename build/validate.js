const fs = require('fs');
const path = require('path');

class ContentValidator {
    constructor() {
        this.contentDir = path.join(__dirname, '../content');
        this.complianceDir = path.join(__dirname, '../compliance');
        this.errors = [];
        this.warnings = [];
        
        // 合规关键词检查
        this.prohibitedWords = [
            '最好', '最佳', '第一', '唯一', '完美', '神奇', '奇迹',
            '立即见效', '永久', '一次性', '100%', '绝对', '保证',
            '治愈', '根治', '彻底解决'
        ];
        
        // 必须包含的合规声明关键词
        this.requiredComplianceTerms = [
            '个体差异', '风险', '专业医生', '正规机构', '术前咨询'
        ];
    }

    async validate() {
        console.log('🔍 开始内容验证...');
        
        try {
            await this.validateChapters();
            await this.validateCompliance();
            await this.validateStructure();
            
            this.reportResults();
            
        } catch (error) {
            console.error('❌ 验证失败:', error.message);
            process.exit(1);
        }
    }

    async validateChapters() {
        console.log('📚 验证章节内容...');
        
        const chaptersDir = path.join(this.contentDir, 'chapters');
        const requiredChapters = [
            '01-positioning.md',
            '02-content.md', 
            '03-compliance.md',
            '04-brand.md'
        ];

        for (const chapter of requiredChapters) {
            const chapterPath = path.join(chaptersDir, chapter);
            
            if (!fs.existsSync(chapterPath)) {
                this.errors.push(`缺少必需章节: ${chapter}`);
                continue;
            }

            const content = fs.readFileSync(chapterPath, 'utf8');
            await this.validateChapterContent(chapter, content);
        }
    }

    async validateChapterContent(filename, content) {
        // 检查六段式结构
        const requiredSections = ['问题', '背景', '方法', '案例', '总结', '行动'];
        const missingSections = [];
        
        for (const section of requiredSections) {
            if (!content.includes(section)) {
                missingSections.push(section);
            }
        }
        
        if (missingSections.length > 0) {
            this.warnings.push(`${filename}: 缺少六段式结构中的: ${missingSections.join(', ')}`);
        }

        // 检查禁用词汇
        for (const word of this.prohibitedWords) {
            if (content.includes(word)) {
                this.errors.push(`${filename}: 包含禁用词汇 "${word}"`);
            }
        }

        // 检查合规声明
        let hasComplianceTerms = false;
        for (const term of this.requiredComplianceTerms) {
            if (content.includes(term)) {
                hasComplianceTerms = true;
                break;
            }
        }
        
        if (!hasComplianceTerms) {
            this.warnings.push(`${filename}: 建议添加合规声明相关内容`);
        }

        // 检查字数
        const wordCount = content.replace(/\s/g, '').length;
        if (wordCount < 1000) {
            this.warnings.push(`${filename}: 内容字数偏少 (${wordCount}字)，建议丰富内容`);
        }

        // 检查是否有引用来源
        if (!content.includes('参考') && !content.includes('来源') && !content.includes('引用')) {
            this.warnings.push(`${filename}: 建议添加参考来源以提高可信度`);
        }
    }

    async validateCompliance() {
        console.log('⚖️  验证合规性...');
        
        const guidelinesPath = path.join(this.complianceDir, 'guidelines.md');
        const checklistPath = path.join(this.complianceDir, 'checklist.md');

        if (!fs.existsSync(guidelinesPath)) {
            this.errors.push('缺少合规指导原则文件');
        }

        if (!fs.existsSync(checklistPath)) {
            this.errors.push('缺少合规检查清单文件');
        }
    }

    async validateStructure() {
        console.log('🏗️  验证项目结构...');
        
        const requiredDirs = [
            'content/chapters',
            'content/assets/images',
            'content/assets/svg',
            'content/templates/sop',
            'content/templates/examples',
            'glossary',
            'compliance',
            'build'
        ];

        for (const dir of requiredDirs) {
            const dirPath = path.join(__dirname, '..', dir);
            if (!fs.existsSync(dirPath)) {
                this.errors.push(`缺少必需目录: ${dir}`);
            }
        }

        // 检查术语词典
        const termsPath = path.join(__dirname, '../glossary/terms.md');
        if (!fs.existsSync(termsPath)) {
            this.warnings.push('建议创建术语词典以确保用词统一');
        }
    }

    reportResults() {
        console.log('\n📊 验证结果报告');
        console.log('=================');
        
        if (this.errors.length === 0 && this.warnings.length === 0) {
            console.log('✅ 所有验证项目通过！');
            return;
        }

        if (this.errors.length > 0) {
            console.log('\n❌ 错误 (必须修复):');
            this.errors.forEach((error, index) => {
                console.log(`${index + 1}. ${error}`);
            });
        }

        if (this.warnings.length > 0) {
            console.log('\n⚠️  警告 (建议优化):');
            this.warnings.forEach((warning, index) => {
                console.log(`${index + 1}. ${warning}`);
            });
        }

        if (this.errors.length > 0) {
            console.log('\n请修复上述错误后重新验证。');
            process.exit(1);
        } else {
            console.log('\n验证完成，请参考警告信息进行优化。');
        }
    }
}

// 执行验证
if (require.main === module) {
    const validator = new ContentValidator();
    validator.validate();
}

module.exports = ContentValidator;