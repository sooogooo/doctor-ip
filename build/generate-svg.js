const fs = require('fs');
const path = require('path');

class SVGGenerator {
    constructor() {
        this.outputDir = path.join(__dirname, '../content/assets/svg');
        this.colors = {
            primary: '#2c5aa0',
            secondary: '#3498db',
            accent: '#e74c3c',
            gray: '#34495e',
            lightGray: '#ecf0f1'
        };
    }

    generateAll() {
        console.log('🎨 生成SVG图表...');
        
        try {
            // 确保输出目录存在
            if (!fs.existsSync(this.outputDir)) {
                fs.mkdirSync(this.outputDir, { recursive: true });
            }

            this.generatePositioningMatrix();
            this.generateComplianceFlowchart();
            this.generateContentMatrix();
            this.generateBrandAssetsPyramid();
            
            console.log('✅ SVG图表生成完成！');
            
        } catch (error) {
            console.error('❌ SVG生成失败:', error.message);
            process.exit(1);
        }
    }

    generatePositioningMatrix() {
        const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 500" width="600" height="500">
            <defs>
                <style>
                    .title { font: bold 16px sans-serif; fill: ${this.colors.primary}; }
                    .label { font: 12px sans-serif; fill: ${this.colors.gray}; }
                    .axis-label { font: 14px sans-serif; fill: ${this.colors.gray}; }
                    .quadrant { font: bold 14px sans-serif; fill: white; }
                    .quadrant-bg { opacity: 0.8; }
                </style>
            </defs>
            
            <!-- 标题 -->
            <text x="300" y="30" text-anchor="middle" class="title">医美IP定位四象限模型</text>
            
            <!-- 坐标轴 -->
            <line x1="100" y1="400" x2="500" y2="400" stroke="${this.colors.gray}" stroke-width="2"/>
            <line x1="300" y1="80" x2="300" y2="400" stroke="${this.colors.gray}" stroke-width="2"/>
            
            <!-- 轴标签 -->
            <text x="300" y="440" text-anchor="middle" class="axis-label">传播广度</text>
            <text x="50" y="250" text-anchor="middle" class="axis-label" transform="rotate(-90 50 250)">专业深度</text>
            
            <!-- 象限背景 -->
            <rect x="100" y="80" width="200" height="160" fill="${this.colors.primary}" class="quadrant-bg"/>
            <rect x="300" y="80" width="200" height="160" fill="${this.colors.secondary}" class="quadrant-bg"/>
            <rect x="100" y="240" width="200" height="160" fill="${this.colors.accent}" class="quadrant-bg"/>
            <rect x="300" y="240" width="200" height="160" fill="#27ae60" class="quadrant-bg"/>
            
            <!-- 象限标题 -->
            <text x="200" y="110" text-anchor="middle" class="quadrant">学术专家型</text>
            <text x="400" y="110" text-anchor="middle" class="quadrant">科普教育型</text>
            <text x="200" y="270" text-anchor="middle" class="quadrant">临床实战型</text>
            <text x="400" y="270" text-anchor="middle" class="quadrant">服务顾问型</text>
            
            <!-- 象限描述 -->
            <text x="200" y="140" text-anchor="middle" class="label" fill="white">高专业深度</text>
            <text x="200" y="155" text-anchor="middle" class="label" fill="white">窄传播范围</text>
            <text x="200" y="180" text-anchor="middle" class="label" fill="white">权威地位</text>
            
            <text x="400" y="140" text-anchor="middle" class="label" fill="white">中等专业深度</text>
            <text x="400" y="155" text-anchor="middle" class="label" fill="white">广传播范围</text>
            <text x="400" y="180" text-anchor="middle" class="label" fill="white">科普达人</text>
            
            <text x="200" y="300" text-anchor="middle" class="label" fill="white">高专业深度</text>
            <text x="200" y="315" text-anchor="middle" class="label" fill="white">中等传播范围</text>
            <text x="200" y="340" text-anchor="middle" class="label" fill="white">临床经验</text>
            
            <text x="400" y="300" text-anchor="middle" class="label" fill="white">中等专业深度</text>
            <text x="400" y="315" text-anchor="middle" class="label" fill="white">广传播范围</text>
            <text x="400" y="340" text-anchor="middle" class="label" fill="white">服务优化</text>
            
            <!-- 刻度 -->
            <text x="150" y="420" text-anchor="middle" class="label">窄</text>
            <text x="450" y="420" text-anchor="middle" class="label">广</text>
            <text x="80" y="350" text-anchor="middle" class="label">低</text>
            <text x="80" y="130" text-anchor="middle" class="label">高</text>
        </svg>`;
        
        this.saveSVG('positioning-matrix.svg', svg);
    }

    generateComplianceFlowchart() {
        const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
            <defs>
                <style>
                    .title { font: bold 16px sans-serif; fill: ${this.colors.primary}; }
                    .step { font: 12px sans-serif; fill: white; }
                    .step-bg { fill: ${this.colors.primary}; stroke: ${this.colors.gray}; stroke-width: 2; }
                    .decision-bg { fill: ${this.colors.accent}; stroke: ${this.colors.gray}; stroke-width: 2; }
                    .process-bg { fill: ${this.colors.secondary}; stroke: ${this.colors.gray}; stroke-width: 2; }
                    .arrow { stroke: ${this.colors.gray}; stroke-width: 2; fill: none; marker-end: url(#arrowhead); }
                </style>
                <defs>
                    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="${this.colors.gray}"/>
                    </marker>
                </defs>
            </defs>
            
            <!-- 标题 -->
            <text x="400" y="30" text-anchor="middle" class="title">医美内容合规审核流程</text>
            
            <!-- 开始 -->
            <ellipse cx="400" cy="80" rx="60" ry="25" class="step-bg"/>
            <text x="400" y="87" text-anchor="middle" class="step">内容创作完成</text>
            
            <!-- 自查阶段 -->
            <rect x="330" y="130" width="140" height="40" rx="5" class="process-bg"/>
            <text x="400" y="145" text-anchor="middle" class="step">自查阶段</text>
            <text x="400" y="160" text-anchor="middle" class="step">禁用词检查</text>
            
            <!-- 专业审核 -->
            <rect x="330" y="200" width="140" height="40" rx="5" class="process-bg"/>
            <text x="400" y="215" text-anchor="middle" class="step">专业审核</text>
            <text x="400" y="230" text-anchor="middle" class="step">医学准确性</text>
            
            <!-- 决策点1 -->
            <polygon points="400,270 450,290 400,310 350,290" class="decision-bg"/>
            <text x="400" y="295" text-anchor="middle" class="step">是否</text>
            <text x="400" y="308" text-anchor="middle" class="step">通过？</text>
            
            <!-- 修改 -->
            <rect x="530" y="270" width="100" height="40" rx="5" class="step-bg"/>
            <text x="580" y="285" text-anchor="middle" class="step">内容修改</text>
            <text x="580" y="300" text-anchor="middle" class="step">重新审核</text>
            
            <!-- 合规审核 -->
            <rect x="330" y="350" width="140" height="40" rx="5" class="process-bg"/>
            <text x="400" y="365" text-anchor="middle" class="step">合规审核</text>
            <text x="400" y="380" text-anchor="middle" class="step">法规符合性</text>
            
            <!-- 决策点2 -->
            <polygon points="400,420 450,440 400,460 350,440" class="decision-bg"/>
            <text x="400" y="445" text-anchor="middle" class="step">是否</text>
            <text x="400" y="458" text-anchor="middle" class="step">合规？</text>
            
            <!-- 发布 -->
            <ellipse cx="400" cy="520" rx="60" ry="25" class="step-bg"/>
            <text x="400" y="527" text-anchor="middle" class="step">内容发布</text>
            
            <!-- 连接线 -->
            <line x1="400" y1="105" x2="400" y2="130" class="arrow"/>
            <line x1="400" y1="170" x2="400" y2="200" class="arrow"/>
            <line x1="400" y1="240" x2="400" y2="270" class="arrow"/>
            <line x1="450" y1="290" x2="530" y2="290" class="arrow"/>
            <line x1="580" y1="270" x2="580" y2="220" class="arrow"/>
            <line x1="530" y1="220" x2="470" y2="220" class="arrow"/>
            <line x1="400" y1="310" x2="400" y2="350" class="arrow"/>
            <line x1="400" y1="390" x2="400" y2="420" class="arrow"/>
            <line x1="450" y1="440" x2="580" y2="440" class="arrow"/>
            <line x1="580" y1="440" x2="580" y2="370" class="arrow"/>
            <line x1="530" y1="370" x2="470" y2="370" class="arrow"/>
            <line x1="400" y1="460" x2="400" y2="495" class="arrow"/>
            
            <!-- 标签 -->
            <text x="490" y="285" class="step" fill="${this.colors.gray}">不通过</text>
            <text x="490" y="435" class="step" fill="${this.colors.gray}">不合规</text>
            <text x="420" y="335" class="step" fill="${this.colors.gray}">通过</text>
            <text x="420" y="485" class="step" fill="${this.colors.gray}">合规</text>
        </svg>`;
        
        this.saveSVG('compliance-flowchart.svg', svg);
    }

    generateContentMatrix() {
        const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 500" width="700" height="500">
            <defs>
                <style>
                    .title { font: bold 16px sans-serif; fill: ${this.colors.primary}; }
                    .header { font: bold 14px sans-serif; fill: white; }
                    .cell-text { font: 12px sans-serif; fill: ${this.colors.gray}; }
                    .matrix-header { fill: ${this.colors.primary}; }
                    .matrix-cell { fill: ${this.colors.lightGray}; stroke: ${this.colors.gray}; stroke-width: 1; }
                </style>
            </defs>
            
            <!-- 标题 -->
            <text x="350" y="30" text-anchor="middle" class="title">医美内容生产矩阵</text>
            
            <!-- 表头 -->
            <rect x="50" y="60" width="100" height="40" class="matrix-header"/>
            <text x="100" y="85" text-anchor="middle" class="header">内容类型</text>
            
            <rect x="150" y="60" width="130" height="40" class="matrix-header"/>
            <text x="215" y="85" text-anchor="middle" class="header">基础科普</text>
            
            <rect x="280" y="60" width="130" height="40" class="matrix-header"/>
            <text x="345" y="85" text-anchor="middle" class="header">进阶教育</text>
            
            <rect x="410" y="60" width="130" height="40" class="matrix-header"/>
            <text x="475" y="85" text-anchor="middle" class="header">前沿技术</text>
            
            <rect x="540" y="60" width="130" height="40" class="matrix-header"/>
            <text x="605" y="85" text-anchor="middle" class="header">案例分享</text>
            
            <!-- 行标题和内容 -->
            <rect x="50" y="100" width="100" height="50" class="matrix-header"/>
            <text x="100" y="115" text-anchor="middle" class="header">知识科普</text>
            <text x="100" y="135" text-anchor="middle" class="header">(40%)</text>
            
            <rect x="150" y="100" width="130" height="50" class="matrix-cell"/>
            <text x="215" y="115" text-anchor="middle" class="cell-text">基础概念</text>
            <text x="215" y="130" text-anchor="middle" class="cell-text">常见问题</text>
            <text x="215" y="145" text-anchor="middle" class="cell-text">预防保健</text>
            
            <rect x="280" y="100" width="130" height="50" class="matrix-cell"/>
            <text x="345" y="115" text-anchor="middle" class="cell-text">原理解析</text>
            <text x="345" y="130" text-anchor="middle" class="cell-text">对比分析</text>
            <text x="345" y="145" text-anchor="middle" class="cell-text">深度科普</text>
            
            <rect x="410" y="100" width="130" height="50" class="matrix-cell"/>
            <text x="475" y="115" text-anchor="middle" class="cell-text">最新技术</text>
            <text x="475" y="130" text-anchor="middle" class="cell-text">学术观点</text>
            <text x="475" y="145" text-anchor="middle" class="cell-text">行业趋势</text>
            
            <rect x="540" y="100" width="130" height="50" class="matrix-cell"/>
            <text x="605" y="115" text-anchor="middle" class="cell-text">科普案例</text>
            <text x="605" y="130" text-anchor="middle" class="cell-text">误区纠正</text>
            <text x="605" y="145" text-anchor="middle" class="cell-text">成功预防</text>
            
            <!-- 第二行 -->
            <rect x="50" y="150" width="100" height="50" class="matrix-header"/>
            <text x="100" y="165" text-anchor="middle" class="header">经验分享</text>
            <text x="100" y="185" text-anchor="middle" class="header">(30%)</text>
            
            <rect x="150" y="150" width="130" height="50" class="matrix-cell"/>
            <text x="215" y="165" text-anchor="middle" class="cell-text">日常护理</text>
            <text x="215" y="180" text-anchor="middle" class="cell-text">简单技巧</text>
            <text x="215" y="195" text-anchor="middle" class="cell-text">生活建议</text>
            
            <rect x="280" y="150" width="130" height="50" class="matrix-cell"/>
            <text x="345" y="165" text-anchor="middle" class="cell-text">专业技巧</text>
            <text x="345" y="180" text-anchor="middle" class="cell-text">实操经验</text>
            <text x="345" y="195" text-anchor="middle" class="cell-text">问题处理</text>
            
            <rect x="410" y="150" width="130" height="50" class="matrix-cell"/>
            <text x="475" y="165" text-anchor="middle" class="cell-text">创新应用</text>
            <text x="475" y="180" text-anchor="middle" class="cell-text">技术心得</text>
            <text x="475" y="195" text-anchor="middle" class="cell-text">研究分享</text>
            
            <rect x="540" y="150" width="130" height="50" class="matrix-cell"/>
            <text x="605" y="165" text-anchor="middle" class="cell-text">临床案例</text>
            <text x="605" y="180" text-anchor="middle" class="cell-text">处理过程</text>
            <text x="605" y="195" text-anchor="middle" class="cell-text">经验总结</text>
            
            <!-- 第三行 -->
            <rect x="50" y="200" width="100" height="50" class="matrix-header"/>
            <text x="100" y="215" text-anchor="middle" class="header">观点表达</text>
            <text x="100" y="235" text-anchor="middle" class="header">(20%)</text>
            
            <rect x="150" y="200" width="130" height="50" class="matrix-cell"/>
            <text x="215" y="215" text-anchor="middle" class="cell-text">健康理念</text>
            <text x="215" y="230" text-anchor="middle" class="cell-text">美学观点</text>
            <text x="215" y="245" text-anchor="middle" class="cell-text">生活态度</text>
            
            <rect x="280" y="200" width="130" height="50" class="matrix-cell"/>
            <text x="345" y="215" text-anchor="middle" class="cell-text">专业见解</text>
            <text x="345" y="230" text-anchor="middle" class="cell-text">行业分析</text>
            <text x="345" y="245" text-anchor="middle" class="cell-text">发展预测</text>
            
            <rect x="410" y="200" width="130" height="50" class="matrix-cell"/>
            <text x="475" y="215" text-anchor="middle" class="cell-text">学术观点</text>
            <text x="475" y="230" text-anchor="middle" class="cell-text">创新思考</text>
            <text x="475" y="245" text-anchor="middle" class="cell-text">前瞻性见解</text>
            
            <rect x="540" y="200" width="130" height="50" class="matrix-cell"/>
            <text x="605" y="215" text-anchor="middle" class="cell-text">观点案例</text>
            <text x="605" y="230" text-anchor="middle" class="cell-text">实践验证</text>
            <text x="605" y="245" text-anchor="middle" class="cell-text">效果展示</text>
            
            <!-- 第四行 -->
            <rect x="50" y="250" width="100" height="50" class="matrix-header"/>
            <text x="100" y="265" text-anchor="middle" class="header">互动问答</text>
            <text x="100" y="285" text-anchor="middle" class="header">(10%)</text>
            
            <rect x="150" y="250" width="130" height="50" class="matrix-cell"/>
            <text x="215" y="265" text-anchor="middle" class="cell-text">常见疑问</text>
            <text x="215" y="280" text-anchor="middle" class="cell-text">基础答疑</text>
            <text x="215" y="295" text-anchor="middle" class="cell-text">简单解答</text>
            
            <rect x="280" y="250" width="130" height="50" class="matrix-cell"/>
            <text x="345" y="265" text-anchor="middle" class="cell-text">专业问题</text>
            <text x="345" y="280" text-anchor="middle" class="cell-text">深度解析</text>
            <text x="345" y="295" text-anchor="middle" class="cell-text">技术答疑</text>
            
            <rect x="410" y="250" width="130" height="50" class="matrix-cell"/>
            <text x="475" y="265" text-anchor="middle" class="cell-text">前沿问题</text>
            <text x="475" y="280" text-anchor="middle" class="cell-text">学术讨论</text>
            <text x="475" y="295" text-anchor="middle" class="cell-text">研究探讨</text>
            
            <rect x="540" y="250" width="130" height="50" class="matrix-cell"/>
            <text x="605" y="265" text-anchor="middle" class="cell-text">案例问答</text>
            <text x="605" y="280" text-anchor="middle" class="cell-text">实际解决</text>
            <text x="605" y="295" text-anchor="middle" class="cell-text">效果说明</text>
        </svg>`;
        
        this.saveSVG('content-matrix.svg', svg);
    }

    generateBrandAssetsPyramid() {
        const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 500" width="600" height="500">
            <defs>
                <style>
                    .title { font: bold 16px sans-serif; fill: ${this.colors.primary}; }
                    .level { font: bold 14px sans-serif; fill: white; }
                    .description { font: 11px sans-serif; fill: white; }
                    .level1 { fill: ${this.colors.primary}; }
                    .level2 { fill: ${this.colors.secondary}; }
                    .level3 { fill: #27ae60; }
                    .level4 { fill: #f39c12; }
                    .level5 { fill: ${this.colors.accent}; }
                </style>
            </defs>
            
            <!-- 标题 -->
            <text x="300" y="30" text-anchor="middle" class="title">医美品牌资产金字塔</text>
            
            <!-- 第一层：品牌知名度 -->
            <polygon points="200,400 400,400 350,350 250,350" class="level1"/>
            <text x="300" y="370" text-anchor="middle" class="level">品牌知名度</text>
            <text x="300" y="385" text-anchor="middle" class="description">行业认知 · 媒体曝光 · 搜索指数</text>
            
            <!-- 第二层：专业权威性 -->
            <polygon points="220,350 380,350 340,300 260,300" class="level2"/>
            <text x="300" y="320" text-anchor="middle" class="level">专业权威性</text>
            <text x="300" y="335" text-anchor="middle" class="description">学术地位 · 临床经验 · 同行认可</text>
            
            <!-- 第三层：用户信任度 -->
            <polygon points="240,300 360,300 330,250 270,250" class="level3"/>
            <text x="300" y="270" text-anchor="middle" class="level">用户信任度</text>
            <text x="300" y="285" text-anchor="middle" class="description">口碑评价 · 案例效果 · 服务质量</text>
            
            <!-- 第四层：品牌联想度 -->
            <polygon points="260,250 340,250 320,200 280,200" class="level4"/>
            <text x="300" y="220" text-anchor="middle" class="level">品牌联想度</text>
            <text x="300" y="235" text-anchor="middle" class="description">专业特色 · 价值理念 · 服务承诺</text>
            
            <!-- 第五层：品牌忠诚度 -->
            <polygon points="280,200 320,200 310,150 290,150" class="level5"/>
            <text x="300" y="170" text-anchor="middle" class="level">品牌忠诚度</text>
            <text x="300" y="185" text-anchor="middle" class="description">复购率 · 推荐率 · 情感连接</text>
            
            <!-- 说明文字 -->
            <text x="50" y="450" class="description" fill="${this.colors.gray}">
                基础层面：建立基本认知和专业形象
            </text>
            <text x="50" y="470" class="description" fill="${this.colors.gray}">
                核心层面：获得用户信任和品牌认同
            </text>
            <text x="400" y="450" class="description" fill="${this.colors.gray}">
                高级层面：实现品牌联想和用户忠诚
            </text>
        </svg>`;
        
        this.saveSVG('brand-assets-pyramid.svg', svg);
    }

    saveSVG(filename, content) {
        const filePath = path.join(this.outputDir, filename);
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ SVG图表已生成: ${filename}`);
    }
}

// 执行生成
if (require.main === module) {
    const generator = new SVGGenerator();
    generator.generateAll();
}

module.exports = SVGGenerator;