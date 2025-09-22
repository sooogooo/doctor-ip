# 美容医生IP建设电子书项目结构

## 目录结构

```
doctor-ip/
├── README.md                    # 项目说明
├── structure.md                 # 项目结构说明
├── build/                       # 构建脚本和工具
│   ├── build.js                # 主构建脚本
│   ├── validate.js             # 内容验证脚本
│   └── generate-svg.js         # SVG图表生成
├── content/                     # 内容目录
│   ├── chapters/               # 章节内容
│   │   ├── 01-positioning.md   # 第一章：定位策略
│   │   ├── 02-content.md       # 第二章：内容生产
│   │   ├── 03-compliance.md    # 第三章：合规传播
│   │   └── 04-brand.md         # 第四章：品牌资产
│   ├── assets/                 # 资源文件
│   │   ├── images/             # 图片资源
│   │   └── svg/                # SVG图表
│   └── templates/              # 模板库
│       ├── sop/                # 标准作业程序
│       └── examples/           # 示例文档
├── glossary/                   # 术语词典
│   └── terms.md               # 术语定义
├── compliance/                 # 合规指南
│   ├── guidelines.md          # 合规指导原则
│   └── checklist.md           # 合规检查清单
└── dist/                      # 构建输出目录
    ├── ebook.html             # 完整电子书HTML版本
    ├── ebook.pdf              # PDF版本（如需要）
    └── ebook.epub             # EPUB版本（如需要）
```

## 设计原则

1. **结构化六段写作**: 每章采用问题-背景-方法-案例-总结-行动的六段结构
2. **可验证来源**: 所有观点和数据都有明确的来源引用
3. **合规优先**: 严格遵守医疗广告法规和行业规范
4. **实用导向**: 提供具体可执行的SOP和模板
5. **术语统一**: 建立统一的术语词典，确保全书用词一致