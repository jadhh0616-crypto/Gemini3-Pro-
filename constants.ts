import { BenchmarkGroup } from './types';

export const BENCHMARK_DATA: BenchmarkGroup[] = [
  {
    id: 'hle',
    name: 'Humanity’s Last Exam',
    description: '这是目前最具挑战性的多学科问答测试，由专家设计，专门用来衡量AI模型在数学、人文、自然科学等高难度领域的学术推理能力，旨在逼近人类专家的极限。',
    category: '推理',
    variations: [
      {
        id: 'hle-no-tools',
        name: 'Humanity’s Last Exam',
        description: '纯模型推理模式：禁止模型使用搜索引擎或代码执行器，必须仅依靠自身的内部知识库和逻辑推理能力解决问题，体现模型的原生智力。',
        category: '推理',
        isBestGemini3: true,
        scores: { gemini3: '37.5%', gemini25: '21.6%', claude: '13.7%', gpt: '26.5%' }
      },
      {
        id: 'hle-tools',
        name: 'Humanity’s Last Exam',
        description: '工具增强模式：允许模型使用搜索引擎获取最新信息或运行Python代码进行计算，测试模型作为智能体综合解决复杂问题的能力。',
        category: '推理',
        isBestGemini3: true,
        scores: { gemini3: '45.8%', gemini25: '—', claude: '—', gpt: '—' }
      }
    ]
  },
  {
    id: 'arc-agi-2',
    name: 'ARC-AGI-2',
    description: '抽象与推理语料库(ARC)被认为是评估通用人工智能(AGI)的核心基准。它通过极少样本的视觉网格谜题，测试模型适应未见过的新规则和抽象逻辑的能力。',
    category: '视觉推理',
    variations: [
      {
        id: 'arc-agi-2-main',
        name: 'ARC-AGI-2',
        description: 'ARC Prize 验证集：使用官方验证集进行的标准测试，重点考察模型在面对完全陌生的逻辑模式时，能否像人类一样快速学习并归纳出规律。',
        category: '视觉推理',
        isBestGemini3: true,
        scores: { gemini3: '31.1%', gemini25: '4.9%', claude: '13.6%', gpt: '17.6%' }
      }
    ]
  },
  {
    id: 'gpqa',
    name: 'GPQA Diamond',
    description: '这是一个针对专家级科学知识的问答数据集。题目由生物学、物理学和化学领域的博士编写，难度极高，即使是外行专家也很难在不查资料的情况下做对。',
    category: '知识',
    variations: [
      {
        id: 'gpqa-diamond',
        name: 'GPQA Diamond',
        description: '纯知识问答：模型必须直接回答这些博士级难题，不得借助外部工具。这反映了模型内部压缩和索引高阶科学知识的深度。',
        category: '知识',
        isBestGemini3: true,
        scores: { gemini3: '91.9%', gemini25: '86.4%', claude: '83.4%', gpt: '88.1%' }
      }
    ]
  },
  {
    id: 'aime',
    name: 'AIME 2025',
    description: '美国数学邀请赛(AIME)是选拔奥林匹克数学竞赛选手的关键赛事。该基准测试使用2025年的最新真题，评估模型解决高难度中学数学竞赛题的能力。',
    category: '数学',
    variations: [
      {
        id: 'aime-no-tools',
        name: 'AIME 2025',
        description: '纯数学思维测试：禁止使用代码解释器（如Python计算），模型必须像人类学生一样，通过逻辑推导和数学公式一步步算出答案。',
        category: '数学',
        isBestGemini3: true,
        scores: { gemini3: '95.0%', gemini25: '88.0%', claude: '87.0%', gpt: '94.0%' }
      },
      {
        id: 'aime-code',
        name: 'AIME 2025',
        description: '代码辅助解题：允许模型编写并运行代码来辅助计算或验证猜想，这通常能显著提高解决复杂计算类数学题的准确率。',
        category: '数学',
        isBestGemini3: true,
        scores: { gemini3: '100%', gemini25: '—', claude: '100%', gpt: '—' }
      }
    ]
  },
  {
    id: 'matharena',
    name: 'MathArena Apex',
    description: '这是一个汇集了各类顶尖数学竞赛题目的综合基准测试，旨在探寻大模型在数学推理方面的极限边界，区分度极高。',
    category: '数学',
    variations: [
      {
        id: 'matharena-apex',
        name: 'MathArena Apex',
        description: '极限竞赛数学：涵盖了比常规竞赛更困难、更复杂的数学命题，主要用于区分最顶尖模型的数学推理微小差距。',
        category: '数学',
        isBestGemini3: true,
        scores: { gemini3: '23.4%', gemini25: '0.5%', claude: '1.6%', gpt: '1.0%' }
      }
    ]
  },
  {
    id: 'mmmu-pro',
    name: 'MMMU-Pro',
    description: '这是一个大规模多学科多模态理解测试。与看图说话不同，它要求模型具备大学水平的专业知识，才能理解图像（如电路图、病理切片）并回答相关问题。',
    category: '多模态',
    variations: [
      {
        id: 'mmmu-pro-std',
        name: 'MMMU-Pro',
        description: '专家级视觉理解：测试模型能否像专家一样解读复杂的图表、科学图像和专业文档，并结合专业知识进行推理。',
        category: '多模态',
        isBestGemini3: true,
        scores: { gemini3: '81.0%', gemini25: '68.0%', claude: '68.0%', gpt: '76.0%' }
      }
    ]
  },
  {
    id: 'screenspot',
    name: 'ScreenSpot-Pro',
    description: '专门测试模型作为“电脑操作员”的能力。模型需要识别屏幕截图中的各种UI元素（图标、菜单、按钮），并准确输出它们的坐标或位置。',
    category: '多模态',
    variations: [
      {
        id: 'screenspot-pro',
        name: 'ScreenSpot-Pro',
        description: 'GUI 屏幕定位：评估模型在桌面或移动端界面中精准定位UI组件的能力，这是实现AI自动操作电脑（Agent）的基础能力。',
        category: '多模态',
        isBestGemini3: true,
        scores: { gemini3: '72.7%', gemini25: '11.4%', claude: '36.2%', gpt: '3.5%' }
      }
    ]
  },
  {
    id: 'charxiv',
    name: 'CharXiv Reasoning',
    description: '这是一个基于科学论文图表的推理测试。模型不仅要能看懂复杂的学术图表，还要能综合图表中的数据进行深度的逻辑分析。',
    category: '多模态',
    variations: [
      {
        id: 'charxiv',
        name: 'CharXiv Reasoning',
        description: '图表数据综合推理：测试从学术论文的统计图、流程图等复杂视觉信息中提取关键数据并得出科学结论的能力。',
        category: '多模态',
        isBestGemini3: true,
        scores: { gemini3: '81.4%', gemini25: '69.6%', claude: '68.5%', gpt: '69.5%' }
      }
    ]
  },
  {
    id: 'omnidoc',
    name: 'OmniDocBench 1.5',
    description: '这是一个衡量光学字符识别(OCR)性能的基准。它包含各种扫描文档、手写笔记和复杂排版，测试模型将图像转换为可编辑文本的精准度。',
    category: 'OCR',
    variations: [
      {
        id: 'omnidoc-bench',
        name: 'OmniDocBench 1.5',
        description: 'OCR 编辑距离：使用“编辑距离”作为指标（分数越低代表错误越少），衡量模型识别出的文本与原文档的差异程度。',
        category: 'OCR',
        isBestGemini3: true,
        scores: { gemini3: '0.115', gemini25: '0.145', claude: '0.145', gpt: '0.147' }
      }
    ]
  },
  {
    id: 'video-mmmu',
    name: 'Video-MMMU',
    description: '视频版的多学科理解测试。模型需要观看较长的视频内容，并回答涉及视频中展示的专业知识、操作步骤或因果关系的问题。',
    category: '视频',
    variations: [
      {
        id: 'video-mmmu-std',
        name: 'Video-MMMU',
        description: '长视频知识获取：测试模型从视频流中提取动态信息、理解复杂过程并回答相关专业问题的能力。',
        category: '视频',
        isBestGemini3: true,
        scores: { gemini3: '87.6%', gemini25: '83.6%', claude: '77.8%', gpt: '80.4%' }
      }
    ]
  },
  {
    id: 'livecode',
    name: 'LiveCodeBench Pro',
    description: '这是一个动态的编程能力测试，题目选自Codeforces等平台的最新编程竞赛题。由于题目是新的，模型无法通过背诵训练数据作弊。',
    category: '编程',
    variations: [
      {
        id: 'livecode-pro',
        name: 'LiveCodeBench Pro',
        description: '实时竞赛编程Elo分：使用Elo等级分系统，评估模型在面对从未见过的算法挑战时的实时编程解决能力。',
        category: '编程',
        isBestGemini3: true,
        scores: { gemini3: '2,439', gemini25: '1,775', claude: '1,418', gpt: '2,243' }
      }
    ]
  },
  {
    id: 'terminal',
    name: 'Terminal-Bench 2.0',
    description: '这是一个模拟Linux终端环境的测试。模型需要像程序员一样，在命令行中输入指令，完成文件操作、系统配置或脚本编写等任务。',
    category: '编程',
    variations: [
      {
        id: 'terminal-bench',
        name: 'Terminal-Bench 2.0',
        description: '命令行智能体操作：测试模型在真实的操作系统终端环境中，通过执行Shell命令来解决复杂技术问题的能力。',
        category: '编程',
        isBestGemini3: true,
        scores: { gemini3: '54.2%', gemini25: '32.6%', claude: '42.8%', gpt: '47.6%' }
      }
    ]
  },
  {
    id: 'swe-bench',
    name: 'SWE-Bench Verified',
    description: '软件工程(Software Engineering)基准测试。模型需要解决GitHub上真实开源项目中的Issue（如Bug修复或功能添加），并通过单元测试。',
    category: '编程',
    variations: [
      {
        id: 'swe-bench-verified',
        name: 'SWE-Bench Verified',
        description: '真实Bug修复率：Verified版本经过人工筛选，确保问题描述清晰。分数代表模型一次性成功修复代码库中真实Bug的比例。',
        category: '编程',
        isBestGemini3: false,
        scores: { gemini3: '76.2%', gemini25: '59.6%', claude: '77.2%', gpt: '76.3%' }
      }
    ]
  },
  {
    id: 't2-bench',
    name: 'τ2-bench',
    description: '这是一个评估智能体(Agent)工具使用能力的测试。模型需要根据任务需求，正确选择并调用各种API或工具（如日历、计算器、搜索）来完成任务。',
    category: 'Agentic',
    variations: [
      {
        id: 't2-bench-std',
        name: 'τ2-bench',
        description: '复杂工具调用：测试模型在面对现实世界任务时，理解用户意图并精准调用外部工具或API的综合能力。',
        category: 'Agentic',
        isBestGemini3: true,
        scores: { gemini3: '85.4%', gemini25: '54.9%', claude: '84.7%', gpt: '80.2%' }
      }
    ]
  },
  {
    id: 'vending',
    name: 'Vending-Bench 2',
    description: '这是一个长视野(Long-horizon)决策测试。模型需要在一个模拟环境中（如自动售货机场景）进行一系列连续决策，以最大化收益或完成目标。',
    category: 'Agentic',
    variations: [
      {
        id: 'vending-bench',
        name: 'Vending-Bench 2',
        description: '多步决策收益：分数代表任务结束时的平均净资产。这反映了模型在需要长时间规划和多步互动的任务中的表现。',
        category: 'Agentic',
        isBestGemini3: true,
        scores: { gemini3: '$5,478.16', gemini25: '$573.64', claude: '$3,838.74', gpt: '$1,473.43' }
      }
    ]
  },
  {
    id: 'facts',
    name: 'FACTS Benchmark Suite',
    description: '这是一个专门针对“幻觉”问题的测试集。它全面检查模型生成的回答是否符合客观事实，涵盖长文本生成和多模态内容描述。',
    category: '知识',
    variations: [
      {
        id: 'facts-suite',
        name: 'FACTS Benchmark Suite',
        description: '事实一致性检测：评估模型在生成长篇内容或描述图片时，能否保持信息准确，不编造不存在的事实。',
        category: '知识',
        isBestGemini3: true,
        scores: { gemini3: '70.5%', gemini25: '63.4%', claude: '50.4%', gpt: '50.8%' }
      }
    ]
  },
  {
    id: 'simpleqa',
    name: 'SimpleQA Verified',
    description: '这是一个纯粹的事实性问答测试。问题简短且有确定答案（如“巴黎是哪个国家的首都？”），用于测试模型“脑子”里存了多少准确知识。',
    category: '知识',
    variations: [
      {
        id: 'simpleqa-verified',
        name: 'SimpleQA Verified',
        description: '静态知识准确度：测试模型对不可变事实性知识的记忆准确率，反映了预训练数据的质量和模型的记忆能力。',
        category: '知识',
        isBestGemini3: true,
        scores: { gemini3: '72.1%', gemini25: '54.5%', claude: '29.3%', gpt: '34.9%' }
      }
    ]
  },
  {
    id: 'mmmlu',
    name: 'MMMLU',
    description: 'Massive Multitask Language Understanding (MMLU) 的多语言版本。它包含57个学科的题目，被翻译成多种语言，测试模型的跨语言知识能力。',
    category: '多语言',
    variations: [
      {
        id: 'mmmlu-std',
        name: 'MMMLU',
        description: '多语言学科问答：测试模型在非英语环境下，解答数学、历史、法律等专业学科问题的能力。',
        category: '多语言',
        isBestGemini3: true,
        scores: { gemini3: '91.8%', gemini25: '89.5%', claude: '89.1%', gpt: '91.0%' }
      }
    ]
  },
  {
    id: 'global-piqa',
    name: 'Global PIQA',
    description: 'PIQA (Physical Interaction QA) 的全球化版本。它测试关于物理世界的常识（如“怎么倒水不洒”），并跨越了100多种语言和文化背景。',
    category: '多语言',
    variations: [
      {
        id: 'global-piqa-std',
        name: 'Global PIQA',
        description: '跨文化物理常识：评估模型是否理解不同文化背景下的日常生活常识和物理规律，体现模型的全球化适应性。',
        category: '多语言',
        isBestGemini3: true,
        scores: { gemini3: '93.4%', gemini25: '91.5%', claude: '90.1%', gpt: '90.9%' }
      }
    ]
  },
  {
    id: 'mrcr',
    name: 'MRCR v2 (8-needle)',
    description: '这是一个极长上下文窗口测试，俗称“大海捞针”。模型需要在长达数万字的文档中，找到并检索出隐藏在角落里的特定信息。',
    category: '上下文',
    variations: [
      {
        id: 'mrcr-128k',
        name: 'MRCR v2 (8-needle)',
        description: '128k 长度检索：在约128,000个Token（约10万单词）的超长文本中进行多点信息检索，测试长文记忆的稳定性。',
        category: '上下文',
        isBestGemini3: true,
        scores: { gemini3: '77.0%', gemini25: '58.0%', claude: '47.1%', gpt: '61.6%' }
      },
      {
        id: 'mrcr-1m',
        name: 'MRCR v2 (8-needle)',
        description: '1M 超长文检索：在100万Token的极限长度下进行测试。目前只有极少数模型支持如此长的上下文并能保持检索能力。',
        category: '上下文',
        isBestGemini3: true,
        scores: { gemini3: '26.3%', gemini25: '16.4%', claude: 'not supported', gpt: 'not supported' }
      }
    ]
  }
];