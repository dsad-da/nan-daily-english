// NAN每日一句 - 内容数据
// 50+ 精选长难句 + 10篇外刊文章

const SENTENCES = [
  // ===== 考研级别 (1-15) =====
  {
    id: 1,
    level: "考研",
    source: "The Economist",
    sentence: "The notion that artificial intelligence could eventually surpass human intelligence, once dismissed as science fiction, is now taken seriously by leading researchers who warn that we may be unprepared for the consequences.",
    translation: "人工智能最终可能超越人类智能这一观点，曾被视为科幻小说而不屑一顾，如今却被顶尖研究者认真对待，他们警告说我们可能对由此产生的后果毫无准备。",
    grammar: {
      main: { text: "The notion is now taken seriously by leading researchers", desc: "主干：观点被研究者认真对待" },
      clauses: [
        { type: "同位语从句", text: "that artificial intelligence could eventually surpass human intelligence", desc: "解释说明 notion 的具体内容" },
        { type: "过去分词短语", text: "once dismissed as science fiction", desc: "作插入语，补充说明该观点过去的状态" },
        { type: "定语从句", text: "who warn that we may be unprepared for the consequences", desc: "修饰 researchers，说明研究者的观点" }
      ],
      keywords: ["notion", "dismiss", "consequence", "unprepared"],
      grammarPoints: ["同位语从句", "被动语态", "过去分词作插入语"]
    },
    tags: ["AI", "科技", "考研真题风格"]
  },
  {
    id: 2,
    level: "考研",
    source: "The Atlantic",
    sentence: "What makes this discovery particularly significant is not merely that it challenges existing theories, but that it opens up entirely new avenues for research that could fundamentally change our understanding of the universe.",
    translation: "使这一发现尤为重要的，不仅仅是它挑战了现有理论，还在于它开辟了全新的研究途径，这些途径可能从根本上改变我们对宇宙的理解。",
    grammar: {
      main: { text: "What makes this discovery particularly significant is not merely... but...", desc: "主语从句 + 并列表语" },
      clauses: [
        { type: "主语从句", text: "What makes this discovery particularly significant", desc: "what 引导的主语从句" },
        { type: "表语从句1", text: "that it challenges existing theories", desc: "第一个表语从句" },
        { type: "表语从句2", text: "that it opens up entirely new avenues for research", desc: "第二个表语从句" },
        { type: "定语从句", text: "that could fundamentally change our understanding of the universe", desc: "修饰 avenues" }
      ],
      keywords: ["significant", "avenue", "fundamentally", "challenge"],
      grammarPoints: ["主语从句", "not merely... but...", "定语从句"]
    },
    tags: ["科学", "发现"]
  },
  {
    id: 3,
    level: "考研",
    source: "TIME",
    sentence: "The researchers, whose findings were published in the journal Nature, found that people who regularly engage in physical exercise are not only less likely to develop chronic diseases but also tend to have better cognitive function as they age.",
    translation: "这项研究的结果发表在《自然》杂志上，研究人员发现，经常进行体育锻炼的人不仅更不容易患上慢性疾病，而且随着年龄增长往往拥有更好的认知功能。",
    grammar: {
      main: { text: "The researchers found that...", desc: "主干：研究者发现..." },
      clauses: [
        { type: "非限制性定语从句", text: "whose findings were published in the journal Nature", desc: "补充说明 researchers 的研究" },
        { type: "宾语从句", text: "that people are not only less likely to... but also tend to...", desc: "found 的宾语，包含并列结构" },
        { type: "定语从句", text: "who regularly engage in physical exercise", desc: "修饰 people" },
        { type: "时间状语从句", text: "as they age", desc: "表示随时间推移" }
      ],
      keywords: ["chronic", "cognitive", "engage in", "develop"],
      grammarPoints: ["非限制性定语从句", "not only... but also...", "时间状语从句"]
    },
    tags: ["健康", "科学"]
  },
  {
    id: 4,
    level: "考研",
    source: "The Guardian",
    sentence: "It is widely acknowledged that education systems around the world must undergo fundamental transformation if they are to adequately prepare students for the challenges of a rapidly changing technological landscape.",
    translation: "人们普遍认为，如果全球教育体系要充分培养学生应对快速变化的技术环境所带来的挑战，就必须经历根本性的变革。",
    grammar: {
      main: { text: "It is widely acknowledged that...", desc: "形式主语句型" },
      clauses: [
        { type: "主语从句", text: "that education systems must undergo fundamental transformation", desc: "真正的主语" },
        { type: "条件状语从句", text: "if they are to adequately prepare students for the challenges", desc: "条件假设" },
        { type: "介词短语", text: "of a rapidly changing technological landscape", desc: "修饰 challenges" }
      ],
      keywords: ["acknowledge", "undergo", "transformation", "adequately", "landscape"],
      grammarPoints: ["It is + 过去分词 + that...", "be to do 表将来", "条件状语从句"]
    },
    tags: ["教育", "科技"]
  },
  {
    id: 5,
    level: "考研",
    source: "Scientific American",
    sentence: "Although the relationship between sleep deprivation and decreased cognitive performance has long been established, recent studies suggest that even moderate reductions in sleep quality can have profound effects on emotional regulation and decision-making ability.",
    translation: "虽然睡眠不足与认知能力下降之间的关系早已被证实，但最近的研究表明，即使是睡眠质量的适度下降也可能对情绪调节和决策能力产生深远影响。",
    grammar: {
      main: { text: "recent studies suggest that...", desc: "主干：最近研究表明..." },
      clauses: [
        { type: "让步状语从句", text: "Although the relationship between sleep deprivation and decreased cognitive performance has long been established", desc: "让步，引出转折" },
        { type: "宾语从句", text: "that even moderate reductions in sleep quality can have profound effects", desc: "suggest 的宾语" },
        { type: "介词短语", text: "on emotional regulation and decision-making ability", desc: "修饰 effects" }
      ],
      keywords: ["deprivation", "cognitive", "moderate", "profound", "regulation"],
      grammarPoints: ["Although 让步从句", "between... and...", "have effects on..."]
    },
    tags: ["健康", "心理"]
  },
  {
    id: 6,
    level: "考研",
    source: "The New Yorker",
    sentence: "The irony of our digital age is that the very technologies designed to bring us closer together have, in many cases, created deeper divides between communities that were already struggling to find common ground.",
    translation: "我们这个数字时代的讽刺之处在于，那些本应拉近我们距离的技术，在很多情况下，却在本已难以找到共同点的社区之间制造了更深的裂痕。",
    grammar: {
      main: { text: "The irony is that...", desc: "主干：讽刺之处在于..." },
      clauses: [
        { type: "表语从句", text: "that the very technologies have created deeper divides", desc: "表语从句" },
        { type: "过去分词短语", text: "designed to bring us closer together", desc: "修饰 technologies" },
        { type: "定语从句", text: "that were already struggling to find common ground", desc: "修饰 communities" }
      ],
      keywords: ["irony", "digital", "divide", "struggle", "common ground"],
      grammarPoints: ["表语从句", "过去分词作后置定语", "the very 表强调"]
    },
    tags: ["社会", "科技"]
  },
  {
    id: 7,
    level: "考研",
    source: "TIME",
    sentence: "Governments that fail to invest in renewable energy infrastructure today will find themselves increasingly dependent on fossil fuels at a time when the rest of the world is moving decisively toward a sustainable future.",
    translation: "今天未能投资可再生能源基础设施的政府，将会发现自己越来越依赖化石燃料，而此时世界其他国家正在果断地迈向可持续的未来。",
    grammar: {
      main: { text: "Governments will find themselves increasingly dependent on fossil fuels", desc: "主干：政府会发现自己依赖化石燃料" },
      clauses: [
        { type: "定语从句", text: "that fail to invest in renewable energy infrastructure today", desc: "修饰 governments" },
        { type: "时间状语从句", text: "when the rest of the world is moving decisively toward a sustainable future", desc: "at a time when... 时间状语" }
      ],
      keywords: ["renewable", "infrastructure", "increasingly", "decisively", "sustainable"],
      grammarPoints: ["定语从句", "at a time when...", "find oneself + adj."]
    },
    tags: ["能源", "环境"]
  },
  {
    id: 8,
    level: "考研",
    source: "The Atlantic",
    sentence: "Not until the emergence of big data analytics did scientists fully appreciate the extent to which climate change is affecting biodiversity in ways that were previously invisible to traditional monitoring methods.",
    translation: "直到大数据分析的出现，科学家们才充分认识到气候变化正在以前所未有的方式影响生物多样性，而这些影响是传统监测方法所无法察觉的。",
    grammar: {
      main: { text: "Not until... did scientists fully appreciate...", desc: "not until 引起的倒装句" },
      clauses: [
        { type: "介词宾语从句", text: "the extent to which climate change is affecting biodiversity", desc: "to which 引导的定语从句修饰 extent" },
        { type: "方式状语", text: "in ways that were previously invisible to traditional monitoring methods", desc: "in ways + 定语从句" }
      ],
      keywords: ["emergence", "appreciate", "biodiversity", "invisible", "monitoring"],
      grammarPoints: ["Not until 倒装", "to which 定语从句", "the extent to which..."]
    },
    tags: ["环境", "科学"]
  },
  {
    id: 9,
    level: "考研",
    source: "Nature",
    sentence: "The study, conducted over a period of ten years across multiple continents, provides compelling evidence that the decline in insect populations is far more severe than previously thought, with potentially catastrophic consequences for global food chains.",
    translation: "这项跨越多个大洲、历时十年的研究提供了令人信服的证据，表明昆虫数量的下降比此前认为的要严重得多，可能对全球食物链产生灾难性后果。",
    grammar: {
      main: { text: "The study provides compelling evidence that...", desc: "主干：研究提供了证据" },
      clauses: [
        { type: "过去分词短语", text: "conducted over a period of ten years across multiple continents", desc: "后置定语修饰 study" },
        { type: "同位语从句", text: "that the decline in insect populations is far more severe than previously thought", desc: "解释 evidence 的内容" },
        { type: "with 短语", text: "with potentially catastrophic consequences for global food chains", desc: "伴随状语" }
      ],
      keywords: ["compelling", "decline", "severe", "catastrophic", "consequence"],
      grammarPoints: ["同位语从句", "far more... than...", "with 伴随状语"]
    },
    tags: ["生态", "科学"]
  },
  {
    id: 10,
    level: "考研",
    source: "Harvard Business Review",
    sentence: "Companies that embrace a culture of continuous learning and adaptability are significantly more likely to survive economic downturns than those that cling rigidly to traditional business models, regardless of how successful those models may have been in the past.",
    translation: "拥抱持续学习和适应性文化的公司，在经济衰退中存活的可能性要远远高于那些死守传统商业模式的公司，无论这些模式过去多么成功。",
    grammar: {
      main: { text: "Companies are significantly more likely to survive than those", desc: "主干：A 比 B 更可能存活" },
      clauses: [
        { type: "定语从句1", text: "that embrace a culture of continuous learning and adaptability", desc: "修饰 companies" },
        { type: "定语从句2", text: "that cling rigidly to traditional business models", desc: "修饰 those" },
        { type: "让步状语从句", text: "regardless of how successful those models may have been in the past", desc: "无论过去多么成功" }
      ],
      keywords: ["embrace", "adaptability", "downturn", "cling", "rigidly"],
      grammarPoints: ["比较级 + than", "regardless of...", "may have been 虚拟"]
    },
    tags: ["商业", "管理"]
  },
  {
    id: 11,
    level: "六级",
    source: "BBC",
    sentence: "The rise of remote work, accelerated by the global pandemic, has fundamentally altered not only how people think about their careers but also where they choose to live, leading to significant shifts in urban and rural population dynamics.",
    translation: "远程工作的兴起——因全球疫情而加速——不仅从根本上改变了人们对职业的看法，也改变了他们选择居住的地方，导致城乡人口动态发生重大变化。",
    grammar: {
      main: { text: "The rise of remote work has fundamentally altered not only... but also...", desc: "主干：远程工作的兴起改变了..." },
      clauses: [
        { type: "过去分词短语", text: "accelerated by the global pandemic", desc: "插入语，补充说明" },
        { type: "并列宾语", text: "not only how people think about their careers but also where they choose to live", desc: "两个并列的宾语从句" },
        { type: "现在分词短语", text: "leading to significant shifts in urban and rural population dynamics", desc: "结果状语" }
      ],
      keywords: ["accelerate", "fundamentally", "alter", "dynamic", "shift"],
      grammarPoints: ["not only... but also...", "现在分词作结果状语", "过去分词作插入语"]
    },
    tags: ["社会", "工作"]
  },
  {
    id: 12,
    level: "六级",
    source: "The Guardian",
    sentence: "While social media platforms have democratized access to information and given voice to marginalized communities, they have also created echo chambers that reinforce existing biases and make constructive dialogue increasingly difficult.",
    translation: "虽然社交媒体平台使信息获取更加民主化，给了边缘化群体发声的机会，但它们也创造了回音室，强化了现有偏见，使建设性对话变得越来越困难。",
    grammar: {
      main: { text: "they have also created echo chambers", desc: "主干：它们也创造了回音室" },
      clauses: [
        { type: "让步状语从句", text: "While social media platforms have democratized access to information and given voice to marginalized communities", desc: "While 让步" },
        { type: "定语从句", text: "that reinforce existing biases and make constructive dialogue increasingly difficult", desc: "修饰 echo chambers" }
      ],
      keywords: ["democratize", "marginalized", "echo chamber", "reinforce", "bias"],
      grammarPoints: ["While 让步", "make + 宾语 + adj.", "定语从句"]
    },
    tags: ["社会", "媒体"]
  },
  {
    id: 13,
    level: "六级",
    source: "TIME",
    sentence: "The global shortage of semiconductors, which are essential components in everything from smartphones to automobiles, has exposed the fragility of supply chains that many assumed were robust enough to withstand major disruptions.",
    translation: "全球半导体短缺——这些是从智能手机到汽车等各种产品的核心组件——暴露了供应链的脆弱性，而许多人曾认为这些供应链足够强大，能够抵御重大冲击。",
    grammar: {
      main: { text: "The global shortage of semiconductors has exposed the fragility of supply chains", desc: "主干：短缺暴露了脆弱性" },
      clauses: [
        { type: "非限制性定语从句", text: "which are essential components in everything from smartphones to automobiles", desc: "补充说明 semiconductors" },
        { type: "定语从句", text: "that many assumed were robust enough to withstand major disruptions", desc: "修饰 supply chains" }
      ],
      keywords: ["semiconductor", "essential", "fragility", "withstand", "disruption"],
      grammarPoints: ["非限制性定语从句", "from... to...", "enough to do"]
    },
    tags: ["科技", "经济"]
  },
  {
    id: 14,
    level: "六级",
    source: "National Geographic",
    sentence: "As glaciers continue to melt at an unprecedented rate due to rising global temperatures, scientists warn that many coastal cities could face severe flooding within the next few decades unless drastic measures are taken to reduce carbon emissions.",
    translation: "随着全球气温上升，冰川以前所未有的速度持续融化，科学家警告说，除非采取严厉措施减少碳排放，否则许多沿海城市可能在未来几十年内面临严重洪灾。",
    grammar: {
      main: { text: "scientists warn that...", desc: "主干：科学家警告..." },
      clauses: [
        { type: "时间状语从句", text: "As glaciers continue to melt at an unprecedented rate due to rising global temperatures", desc: "As 引导时间/原因" },
        { type: "宾语从句", text: "that many coastal cities could face severe flooding within the next few decades", desc: "warn 的宾语" },
        { type: "条件状语从句", text: "unless drastic measures are taken to reduce carbon emissions", desc: "除非..." }
      ],
      keywords: ["glacier", "unprecedented", "drastic", "emission", "flooding"],
      grammarPoints: ["As 引导从句", "unless 条件句", "be taken to do"]
    },
    tags: ["环境", "气候"]
  },
  {
    id: 15,
    level: "六级",
    source: "The Economist",
    sentence: "The growing inequality between the world's richest and poorest nations, exacerbated by the pandemic and compounded by climate change, poses a serious threat to global stability and could undermine decades of progress in poverty reduction.",
    translation: "世界上最富国和最穷国之间日益加剧的不平等——因疫情而恶化，又因气候变化而加剧——对全球稳定构成严重威胁，并可能破坏数十年来在减贫方面取得的进展。",
    grammar: {
      main: { text: "The growing inequality poses a serious threat and could undermine decades of progress", desc: "主干：不平等构成威胁并可能破坏进展" },
      clauses: [
        { type: "过去分词短语", text: "exacerbated by the pandemic and compounded by climate change", desc: "两个并列的过去分词短语作插入语" },
        { type: "介词短语", text: "in poverty reduction", desc: "修饰 progress" }
      ],
      keywords: ["inequality", "exacerbate", "compound", "undermine", "stability"],
      grammarPoints: ["过去分词作插入语", "pose a threat to...", "decades of..."]
    },
    tags: ["经济", "社会"]
  },
  // ===== 四级/进阶 (16-30) =====
  {
    id: 16,
    level: "四级",
    source: "BBC Learning English",
    sentence: "Learning a second language at an early age not only improves a child's ability to communicate but also enhances their problem-solving skills and makes them more adaptable to different cultural environments.",
    translation: "在幼年学习第二语言不仅能提高孩子的沟通能力，还能增强他们解决问题的能力，使他们更容易适应不同的文化环境。",
    grammar: {
      main: { text: "Learning a second language not only improves... but also enhances... and makes...", desc: "动名词作主语 + 三个并列谓语" },
      clauses: [
        { type: "动名词短语", text: "Learning a second language at an early age", desc: "作主语" }
      ],
      keywords: ["enhance", "adaptable", "cultural", "environment"],
      grammarPoints: ["动名词作主语", "not only... but also...", "make + 宾语 + adj."]
    },
    tags: ["教育", "语言"]
  },
  {
    id: 17,
    level: "四级",
    source: "National Geographic",
    sentence: "The Amazon rainforest, often referred to as the lungs of the Earth, produces approximately 20 percent of the world's oxygen and is home to an estimated 10 percent of all species on the planet.",
    translation: "亚马逊雨林——常被称为地球之肺——产生约全球20%的氧气，据估计是地球上10%物种的栖息地。",
    grammar: {
      main: { text: "The Amazon rainforest produces approximately 20 percent of the world's oxygen and is home to...", desc: "主干：雨林产氧 + 是栖息地" },
      clauses: [
        { type: "过去分词短语", text: "often referred to as the lungs of the Earth", desc: "插入语，补充说明" }
      ],
      keywords: ["approximately", "refer to", "species", "estimated"],
      grammarPoints: ["be referred to as...", "be home to...", "并列谓语"]
    },
    tags: ["自然", "环境"]
  },
  {
    id: 18,
    level: "四级",
    source: "The Guardian",
    sentence: "Research has shown that people who maintain a regular exercise routine tend to sleep better, experience less stress, and have a lower risk of developing heart disease compared to those who lead sedentary lifestyles.",
    translation: "研究表明，与久坐不动的人相比，保持规律运动习惯的人往往睡眠更好、压力更小、患心脏病的风险更低。",
    grammar: {
      main: { text: "Research has shown that...", desc: "主干：研究表明..." },
      clauses: [
        { type: "宾语从句", text: "that people tend to sleep better, experience less stress, and have a lower risk", desc: "三个并列的动词短语" },
        { type: "定语从句1", text: "who maintain a regular exercise routine", desc: "修饰 people" },
        { type: "定语从句2", text: "who lead sedentary lifestyles", desc: "修饰 those" }
      ],
      keywords: ["maintain", "routine", "sedentary", "compared to"],
      grammarPoints: ["compared to 对比", "tend to do", "have a risk of doing"]
    },
    tags: ["健康", "运动"]
  },
  {
    id: 19,
    level: "四级",
    source: "TIME",
    sentence: "The rapid development of electric vehicles, driven by both environmental concerns and technological breakthroughs, is expected to transform the automotive industry and significantly reduce carbon emissions over the next two decades.",
    translation: "电动汽车的快速发展——受环境关切和技术突破的双重驱动——预计将改变汽车行业，并在未来二十年内大幅减少碳排放。",
    grammar: {
      main: { text: "The rapid development of electric vehicles is expected to transform... and reduce...", desc: "主干：发展预计将改变并减少" },
      clauses: [
        { type: "过去分词短语", text: "driven by both environmental concerns and technological breakthroughs", desc: "插入语" }
      ],
      keywords: ["breakthrough", "automotive", "significantly", "emission"],
      grammarPoints: ["be expected to do", "both... and...", "过去分词作插入语"]
    },
    tags: ["科技", "环保"]
  },
  {
    id: 20,
    level: "四级",
    source: "BBC",
    sentence: "Many young people today are choosing to delay major life decisions such as getting married and buying a house, partly because of economic uncertainty and partly because they value personal freedom and career development more than previous generations.",
    translation: "如今许多年轻人选择推迟结婚、买房等重大人生决定，部分原因是经济不确定性，部分原因是他们比前几代人更看重个人自由和职业发展。",
    grammar: {
      main: { text: "Many young people are choosing to delay major life decisions", desc: "主干：年轻人选择推迟决定" },
      clauses: [
        { type: "原因状语", text: "partly because of economic uncertainty", desc: "原因1" },
        { type: "原因状语从句", text: "partly because they value personal freedom and career development more than previous generations", desc: "原因2" }
      ],
      keywords: ["delay", "uncertainty", "value", "previous", "generation"],
      grammarPoints: ["such as 举例", "partly because...", "more than 比较"]
    },
    tags: ["社会", "生活"]
  },
  {
    id: 21,
    level: "四级",
    source: "Scientific American",
    sentence: "Sleep, which accounts for approximately one-third of our lives, plays a crucial role in memory consolidation, immune function, and emotional regulation, yet millions of people worldwide suffer from chronic sleep deprivation.",
    translation: "睡眠约占我们生命的三分之一，在记忆巩固、免疫功能和情绪调节方面起着至关重要的作用，然而全世界有数百万人遭受慢性睡眠不足的困扰。",
    grammar: {
      main: { text: "Sleep plays a crucial role in... yet millions of people suffer from...", desc: "主干：睡眠起重要作用，然而..." },
      clauses: [
        { type: "非限制性定语从句", text: "which accounts for approximately one-third of our lives", desc: "补充说明 sleep" }
      ],
      keywords: ["crucial", "consolidation", "immune", "regulation", "chronic"],
      grammarPoints: ["非限制性定语从句", "play a role in...", "suffer from..."]
    },
    tags: ["健康", "科学"]
  },
  {
    id: 22,
    level: "六级",
    source: "The Atlantic",
    sentence: "The concept of universal basic income, once considered a radical proposal championed only by economists on the fringes, has gained mainstream acceptance as automation and artificial intelligence threaten to displace millions of workers.",
    translation: "全民基本收入的概念——曾一度被认为是只有边缘经济学家支持的激进提议——随着自动化和人工智能威胁到数百万工人的就业，已获得主流认可。",
    grammar: {
      main: { text: "The concept of universal basic income has gained mainstream acceptance", desc: "主干：概念获得了主流认可" },
      clauses: [
        { type: "过去分词短语", text: "once considered a radical proposal championed only by economists on the fringes", desc: "插入语，描述过去状态" },
        { type: "时间/原因状语从句", text: "as automation and artificial intelligence threaten to displace millions of workers", desc: "as 引导" }
      ],
      keywords: ["universal", "radical", "champion", "mainstream", "displace"],
      grammarPoints: ["once considered...", "as 引导从句", "threaten to do"]
    },
    tags: ["经济", "社会"]
  },
  {
    id: 23,
    level: "六级",
    source: "Nature",
    sentence: "Gene editing technology, particularly CRISPR, has opened up unprecedented possibilities for treating genetic diseases, but it has also raised profound ethical questions about how far we should go in altering the human genome.",
    translation: "基因编辑技术，尤其是CRISPR，为治疗遗传疾病开辟了前所未有的可能性，但也引发了关于我们应该在多大程度上改变人类基因组的深刻伦理问题。",
    grammar: {
      main: { text: "Gene editing technology has opened up unprecedented possibilities but has also raised profound ethical questions", desc: "主干：技术开辟可能性，但也引发问题" },
      clauses: [
        { type: "同位语", text: "particularly CRISPR", desc: "补充说明具体技术" },
        { type: "宾语从句", text: "about how far we should go in altering the human genome", desc: "about 引导的宾语从句" }
      ],
      keywords: ["unprecedented", "genetic", "profound", "ethical", "genome"],
      grammarPoints: ["open up", "how far 引导宾语从句", "should go in doing"]
    },
    tags: ["科技", "伦理"]
  },
  {
    id: 24,
    level: "六级",
    source: "TIME",
    sentence: "The mental health crisis among young people, exacerbated by social media, academic pressure, and economic insecurity, has prompted calls for a fundamental rethinking of how societies support the well-being of their youngest members.",
    translation: "年轻人中的心理健康危机——因社交媒体、学业压力和经济不安全而加剧——促使人们呼吁从根本上重新思考社会如何支持其最年轻成员的福祉。",
    grammar: {
      main: { text: "The mental health crisis has prompted calls for a fundamental rethinking", desc: "主干：危机促使了呼吁" },
      clauses: [
        { type: "过去分词短语", text: "exacerbated by social media, academic pressure, and economic insecurity", desc: "插入语" },
        { type: "宾语从句", text: "of how societies support the well-being of their youngest members", desc: "of 引导" }
      ],
      keywords: ["exacerbate", "prompt", "fundamental", "well-being", "insecurity"],
      grammarPoints: ["过去分词作插入语", "prompt calls for...", "how 引导宾语从句"]
    },
    tags: ["心理", "社会"]
  },
  {
    id: 25,
    level: "四级",
    source: "The Guardian",
    sentence: "Volunteering abroad can be a life-changing experience that broadens your perspective, develops your independence, and helps you appreciate the privileges that you may have taken for granted back home.",
    translation: "海外志愿服务可能是一次改变人生的经历，它能拓宽你的视野，培养你的独立性，帮助你认识到那些在国内可能被视为理所当然的特权。",
    grammar: {
      main: { text: "Volunteering abroad can be a life-changing experience", desc: "动名词作主语" },
      clauses: [
        { type: "定语从句", text: "that broadens your perspective, develops your independence, and helps you appreciate the privileges", desc: "三个并列动词" },
        { type: "定语从句", text: "that you may have taken for granted back home", desc: "修饰 privileges" }
      ],
      keywords: ["perspective", "independence", "privilege", "take for granted"],
      grammarPoints: ["动名词作主语", "take for granted", "三个并列动词"]
    },
    tags: ["生活", "成长"]
  },
  {
    id: 26,
    level: "四级",
    source: "BBC",
    sentence: "The popularity of plant-based diets has surged in recent years, driven by growing awareness of the environmental impact of meat production and increasing concern about animal welfare.",
    translation: "近年来，植物性饮食的流行度急剧上升，这得益于人们对肉类生产环境影响的日益认识和对动物福利的日益关注。",
    grammar: {
      main: { text: "The popularity of plant-based diets has surged in recent years", desc: "主干：流行度急剧上升" },
      clauses: [
        { type: "过去分词短语", text: "driven by growing awareness... and increasing concern...", desc: "原因状语" }
      ],
      keywords: ["surge", "awareness", "impact", "welfare", "production"],
      grammarPoints: ["driven by...", "growing awareness of...", "increasing concern about..."]
    },
    tags: ["健康", "环保"]
  },
  {
    id: 27,
    level: "四级",
    source: "National Geographic",
    sentence: "Coral reefs, which support roughly 25 percent of all marine species, are under severe threat from rising ocean temperatures, pollution, and overfishing, putting the entire ocean ecosystem at risk.",
    translation: "珊瑚礁支撑着大约25%的海洋物种，正面临海洋温度上升、污染和过度捕捞的严重威胁，使整个海洋生态系统处于危险之中。",
    grammar: {
      main: { text: "Coral reefs are under severe threat", desc: "主干：珊瑚礁面临严重威胁" },
      clauses: [
        { type: "非限制性定语从句", text: "which support roughly 25 percent of all marine species", desc: "补充说明珊瑚礁的重要性" },
        { type: "现在分词短语", text: "putting the entire ocean ecosystem at risk", desc: "结果状语" }
      ],
      keywords: ["marine", "ecosystem", "overfishing", "pollution", "severe"],
      grammarPoints: ["非限制性定语从句", "be under threat from...", "现在分词作结果状语"]
    },
    tags: ["自然", "环保"]
  },
  {
    id: 28,
    level: "六级",
    source: "The Economist",
    sentence: "Central banks around the world face the delicate task of taming inflation without triggering a recession, a balancing act that requires precise timing and careful calibration of interest rate adjustments.",
    translation: "世界各地的央行面临着在不引发衰退的情况下遏制通胀的微妙任务，这是一项需要精确把握时机和仔细校准利率调整的平衡之举。",
    grammar: {
      main: { text: "Central banks face the delicate task", desc: "主干：央行面临微妙任务" },
      clauses: [
        { type: "介词短语", text: "of taming inflation without triggering a recession", desc: "修饰 task" },
        { type: "同位语", text: "a balancing act that requires precise timing and careful calibration", desc: "解释说明 task" },
        { type: "定语从句", text: "that requires precise timing and careful calibration of interest rate adjustments", desc: "修饰 balancing act" }
      ],
      keywords: ["delicate", "tame", "trigger", "recession", "calibration"],
      grammarPoints: ["without doing", "同位语", "require + 名词"]
    },
    tags: ["经济", "金融"]
  },
  {
    id: 29,
    level: "六级",
    source: "Harvard Business Review",
    sentence: "The most successful leaders in the 21st century are not those who have all the answers, but rather those who ask the right questions, listen actively to diverse perspectives, and create environments where innovation can thrive.",
    translation: "21世纪最成功的领导者不是那些拥有所有答案的人，而是那些提出正确问题、积极倾听不同观点、并创造创新能够蓬勃发展的环境的人。",
    grammar: {
      main: { text: "The most successful leaders are not those who... but rather those who...", desc: "主干：不是...而是..." },
      clauses: [
        { type: "定语从句1", text: "who have all the answers", desc: "修饰 those（否定）" },
        { type: "定语从句2", text: "who ask the right questions, listen actively to diverse perspectives, and create environments", desc: "三个并列动词" },
        { type: "定语从句3", text: "where innovation can thrive", desc: "修饰 environments" }
      ],
      keywords: ["perspective", "innovation", "thrive", "diverse", "actively"],
      grammarPoints: ["not... but rather...", "三个并列动词", "where 引导定语从句"]
    },
    tags: ["领导力", "管理"]
  },
  {
    id: 30,
    level: "四级",
    source: "TIME",
    sentence: "Reading for pleasure has been shown to improve vocabulary, enhance empathy, reduce stress, and even increase life expectancy, making it one of the most beneficial activities a person can engage in.",
    translation: "阅读乐趣已被证明能提高词汇量、增强同理心、减轻压力，甚至延长寿命，使其成为一个人可以从事的最有益的活动之一。",
    grammar: {
      main: { text: "Reading for pleasure has been shown to improve... enhance... reduce... and increase...", desc: "主干：阅读被证明能..." },
      clauses: [
        { type: "现在分词短语", text: "making it one of the most beneficial activities", desc: "结果状语" },
        { type: "定语从句", text: "a person can engage in", desc: "省略 that 的定语从句修饰 activities" }
      ],
      keywords: ["empathy", "expectancy", "beneficial", "engage in"],
      grammarPoints: ["be shown to do", "making it...", "省略 that 的定语从句"]
    },
    tags: ["阅读", "成长"]
  },
  // ===== 更多精选 (31-55) =====
  {
    id: 31,
    level: "考研",
    source: "The New Yorker",
    sentence: "What distinguishes great writing from competent writing is not mastery of grammar or an extensive vocabulary, but rather the ability to make the reader feel something deeply and personally.",
    translation: "将优秀写作与合格写作区分开来的，不是语法的掌握或丰富的词汇量，而是让读者深刻而个人化地感受到某种情感的能力。",
    grammar: {
      main: { text: "What distinguishes great writing is not... but rather the ability to...", desc: "主语从句 + 并列表语" },
      clauses: [
        { type: "主语从句", text: "What distinguishes great writing from competent writing", desc: "what 引导" },
        { type: "不定式", text: "to make the reader feel something deeply and personally", desc: "修饰 ability" }
      ],
      keywords: ["distinguish", "competent", "extensive", "mastery"],
      grammarPoints: ["What 引导主语从句", "not... but rather...", "make sb. do sth."]
    },
    tags: ["文学", "写作"]
  },
  {
    id: 32,
    level: "六级",
    source: "BBC",
    sentence: "The gig economy, characterized by short-term contracts and freelance work rather than permanent jobs, has grown rapidly in recent years, offering flexibility to workers but also raising concerns about job security and benefits.",
    translation: "零工经济——以短期合同和自由职业而非固定工作为特征——近年来发展迅速，为工人提供了灵活性，但也引发了对工作保障和福利的担忧。",
    grammar: {
      main: { text: "The gig economy has grown rapidly, offering flexibility but also raising concerns", desc: "主干：零工经济增长，提供灵活性但也引发担忧" },
      clauses: [
        { type: "过去分词短语", text: "characterized by short-term contracts and freelance work rather than permanent jobs", desc: "插入语" },
        { type: "现在分词短语", text: "offering flexibility to workers but also raising concerns about job security and benefits", desc: "伴随状语" }
      ],
      keywords: ["gig", "freelance", "permanent", "flexibility", "security"],
      grammarPoints: ["characterized by...", "rather than...", "offering... but also raising..."]
    },
    tags: ["经济", "工作"]
  },
  {
    id: 33,
    level: "四级",
    source: "National Geographic",
    sentence: "Dolphins are among the most intelligent animals on Earth, capable of recognizing themselves in mirrors, using tools, and communicating with each other through a complex system of clicks and whistles.",
    translation: "海豚是地球上最聪明的动物之一，能够识别镜中的自己、使用工具，并通过复杂的咔哒声和口哨声系统相互交流。",
    grammar: {
      main: { text: "Dolphins are among the most intelligent animals on Earth", desc: "主干：海豚是最聪明的动物之一" },
      clauses: [
        { type: "形容词短语", text: "capable of recognizing themselves in mirrors, using tools, and communicating with each other", desc: "三个并列的动名词" }
      ],
      keywords: ["intelligent", "capable of", "recognize", "complex", "communicate"],
      grammarPoints: ["be capable of doing", "三个并列动名词", "each other"]
    },
    tags: ["自然", "动物"]
  },
  {
    id: 34,
    level: "考研",
    source: "The Atlantic",
    sentence: "The paradox of choice suggests that while having more options seems desirable, an excess of choices can lead to anxiety, decision paralysis, and ultimately dissatisfaction with whatever option is finally selected.",
    translation: "选择悖论表明，虽然拥有更多选择似乎令人向往，但过多的选择可能导致焦虑、决策瘫痪，最终对最终选择的任何选项都不满意。",
    grammar: {
      main: { text: "The paradox of choice suggests that...", desc: "主干：选择悖论表明..." },
      clauses: [
        { type: "宾语从句", text: "that while having more options seems desirable, an excess of choices can lead to...", desc: "suggest 的宾语" },
        { type: "让步状语从句", text: "while having more options seems desirable", desc: "while 让步" },
        { type: "宾语从句", text: "whatever option is finally selected", desc: "with 的宾语" }
      ],
      keywords: ["paradox", "desirable", "excess", "paralysis", "dissatisfaction"],
      grammarPoints: ["while 让步", "lead to...", "whatever 引导从句"]
    },
    tags: ["心理", "社会"]
  },
  {
    id: 35,
    level: "六级",
    source: "Scientific American",
    sentence: "The human brain, which contains roughly 86 billion neurons connected by trillions of synapses, remains the most complex structure in the known universe, and scientists are still far from fully understanding how it works.",
    translation: "人类大脑包含大约860亿个神经元，通过数万亿个突触连接，仍然是已知宇宙中最复杂的结构，科学家们距离完全理解它的工作原理还很遥远。",
    grammar: {
      main: { text: "The human brain remains the most complex structure and scientists are still far from fully understanding", desc: "两个并列句" },
      clauses: [
        { type: "非限制性定语从句", text: "which contains roughly 86 billion neurons connected by trillions of synapses", desc: "补充说明大脑" },
        { type: "宾语从句", text: "how it works", desc: "understanding 的宾语" }
      ],
      keywords: ["neuron", "synapse", "complex", "roughly", "trillion"],
      grammarPoints: ["非限制性定语从句", "be far from doing", "how 引导宾语从句"]
    },
    tags: ["科学", "大脑"]
  },
  {
    id: 36,
    level: "四级",
    source: "The Guardian",
    sentence: "Cooking at home is not only healthier and more affordable than eating out, but it can also be a creative and therapeutic activity that brings families together and helps people develop a deeper appreciation for food.",
    translation: "在家做饭不仅比外出就餐更健康、更实惠，而且还可以成为一种创造性和治疗性的活动，将家人聚在一起，帮助人们更深刻地欣赏食物。",
    grammar: {
      main: { text: "Cooking at home is not only healthier and more affordable but it can also be a creative and therapeutic activity", desc: "两个并列句" },
      clauses: [
        { type: "定语从句", text: "that brings families together and helps people develop a deeper appreciation for food", desc: "修饰 activity" }
      ],
      keywords: ["affordable", "therapeutic", "appreciation", "creative"],
      grammarPoints: ["not only... but also...", "动名词作主语", "help sb. do sth."]
    },
    tags: ["生活", "健康"]
  },
  {
    id: 37,
    level: "考研",
    source: "Nature",
    sentence: "Microplastics, tiny fragments of plastic less than five millimeters in size, have been found in virtually every environment on Earth, from the deepest ocean trenches to the highest mountain peaks, raising urgent questions about their impact on human health.",
    translation: "微塑料——小于五毫米的微小塑料碎片——几乎在地球上的每个环境中都被发现，从最深的海沟到最高的山峰，引发了关于其对人类健康影响的紧迫问题。",
    grammar: {
      main: { text: "Microplastics have been found in virtually every environment on Earth", desc: "主干：微塑料在每个环境中被发现" },
      clauses: [
        { type: "同位语", text: "tiny fragments of plastic less than five millimeters in size", desc: "解释 microplastics" },
        { type: "介词短语", text: "from the deepest ocean trenches to the highest mountain peaks", desc: "范围说明" },
        { type: "现在分词短语", text: "raising urgent questions about their impact on human health", desc: "结果状语" }
      ],
      keywords: ["microplastic", "virtually", "trench", "urgent", "impact"],
      grammarPoints: ["同位语", "from... to...", "现在分词作结果状语"]
    },
    tags: ["环境", "健康"]
  },
  {
    id: 38,
    level: "六级",
    source: "TIME",
    sentence: "The debate over privacy in the digital age is not simply a matter of choosing between security and freedom, but rather of finding a balance that protects individual rights while allowing society to benefit from technological advances.",
    translation: "数字时代关于隐私的争论不仅仅是安全与自由之间的选择问题，而是要在保护个人权利的同时让社会从技术进步中受益，找到一个平衡点。",
    grammar: {
      main: { text: "The debate is not simply a matter of... but rather of...", desc: "主干：不仅仅是...而是..." },
      clauses: [
        { type: "不定式", text: "of finding a balance that protects individual rights while allowing society to benefit from technological advances", desc: "of 引导" },
        { type: "定语从句", text: "that protects individual rights", desc: "修饰 balance" },
        { type: "让步/时间状语", text: "while allowing society to benefit from technological advances", desc: "while 引导" }
      ],
      keywords: ["privacy", "security", "individual", "balance", "advance"],
      grammarPoints: ["not simply... but rather...", "allow sb. to do", "while doing"]
    },
    tags: ["科技", "隐私"]
  },
  {
    id: 39,
    level: "四级",
    source: "BBC Learning English",
    sentence: "Music has the unique ability to transcend language barriers, evoke powerful emotions, and bring people from different cultures and backgrounds together in a shared experience.",
    translation: "音乐具有超越语言障碍、唤起强烈情感、并将来自不同文化和背景的人们聚集在共同体验中的独特能力。",
    grammar: {
      main: { text: "Music has the unique ability to transcend... evoke... and bring...", desc: "主干：音乐有能力..." },
      clauses: [
        { type: "不定式", text: "to transcend language barriers, evoke powerful emotions, and bring people together", desc: "三个并列不定式修饰 ability" }
      ],
      keywords: ["transcend", "barrier", "evoke", "emotion", "shared"],
      grammarPoints: ["the ability to do", "三个并列不定式", "bring... together"]
    },
    tags: ["文化", "音乐"]
  },
  {
    id: 40,
    level: "考研",
    source: "The Economist",
    sentence: "Housing affordability has become one of the most pressing social issues in major cities worldwide, with young people increasingly unable to purchase homes in the neighborhoods where they grew up.",
    translation: "住房负担能力已成为全球主要城市最紧迫的社会问题之一，年轻人越来越无力在他们成长的社区购买住房。",
    grammar: {
      main: { text: "Housing affordability has become one of the most pressing social issues", desc: "主干：住房负担成为紧迫问题" },
      clauses: [
        { type: "with 复合结构", text: "with young people increasingly unable to purchase homes in the neighborhoods", desc: "with + 名词 + adj." },
        { type: "定语从句", text: "where they grew up", desc: "修饰 neighborhoods" }
      ],
      keywords: ["affordability", "pressing", "increasingly", "purchase", "neighborhood"],
      grammarPoints: ["with + 名词 + adj.", "where 引导定语从句", "one of the most..."]
    },
    tags: ["社会", "住房"]
  },
  {
    id: 41,
    level: "六级",
    source: "Harvard Business Review",
    sentence: "The transition to a circular economy, in which products are designed to be reused, repaired, and recycled rather than discarded, represents one of the most significant opportunities for businesses to reduce their environmental footprint.",
    translation: "向循环经济的转型——在这种经济模式中，产品被设计为可重复使用、可修复和可回收，而不是被丢弃——代表了企业减少环境足迹的最重要机遇之一。",
    grammar: {
      main: { text: "The transition to a circular economy represents one of the most significant opportunities", desc: "主干：转型代表机遇" },
      clauses: [
        { type: "非限制性定语从句", text: "in which products are designed to be reused, repaired, and recycled rather than discarded", desc: "修饰 circular economy" }
      ],
      keywords: ["circular", "transition", "recycle", "discard", "footprint"],
      grammarPoints: ["in which 定语从句", "be designed to do", "rather than"]
    },
    tags: ["经济", "环保"]
  },
  {
    id: 42,
    level: "四级",
    source: "National Geographic",
    sentence: "The world's oceans absorb about 30 percent of the carbon dioxide produced by humans, which helps slow global warming but also causes the water to become more acidic, threatening marine life.",
    translation: "世界海洋吸收了人类产生的约30%的二氧化碳，这有助于减缓全球变暖，但也导致海水变得更酸，威胁海洋生物。",
    grammar: {
      main: { text: "The world's oceans absorb about 30 percent of the carbon dioxide", desc: "主干：海洋吸收二氧化碳" },
      clauses: [
        { type: "非限制性定语从句", text: "which helps slow global warming but also causes the water to become more acidic", desc: "补充说明结果" },
        { type: "现在分词短语", text: "threatening marine life", desc: "伴随结果" }
      ],
      keywords: ["absorb", "carbon dioxide", "acidic", "marine", "threaten"],
      grammarPoints: ["非限制性定语从句", "cause... to do", "现在分词作伴随状语"]
    },
    tags: ["环境", "海洋"]
  },
  {
    id: 43,
    level: "六级",
    source: "The Guardian",
    sentence: "The rise of populism in many democracies reflects a deep-seated frustration among citizens who feel that the political establishment has failed to address their concerns about immigration, inequality, and cultural change.",
    translation: "许多民主国家民粹主义的兴起反映了公民中根深蒂固的挫败感，他们觉得政治体制未能解决他们对移民、不平等和文化变革的关切。",
    grammar: {
      main: { text: "The rise of populism reflects a deep-seated frustration", desc: "主干：兴起反映了挫败感" },
      clauses: [
        { type: "定语从句", text: "who feel that the political establishment has failed to address their concerns", desc: "修饰 citizens" },
        { type: "宾语从句", text: "that the political establishment has failed to address their concerns about immigration, inequality, and cultural change", desc: "feel 的宾语" }
      ],
      keywords: ["populism", "frustration", "establishment", "immigration", "inequality"],
      grammarPoints: ["reflect", "fail to do", "address concerns about..."]
    },
    tags: ["政治", "社会"]
  },
  {
    id: 44,
    level: "四级",
    source: "TIME",
    sentence: "Regular reading, even just 20 minutes a day, can significantly improve brain function, increase empathy, and reduce the risk of cognitive decline later in life.",
    translation: "定期阅读，即使每天只有20分钟，也能显著改善大脑功能、增强同理心，并降低晚年认知能力下降的风险。",
    grammar: {
      main: { text: "Regular reading can improve brain function, increase empathy, and reduce the risk", desc: "三个并列动词" },
      clauses: [
        { type: "插入语", text: "even just 20 minutes a day", desc: "补充说明" }
      ],
      keywords: ["significantly", "empathy", "cognitive", "decline"],
      grammarPoints: ["动名词作主语", "even just...", "the risk of doing"]
    },
    tags: ["健康", "阅读"]
  },
  {
    id: 45,
    level: "考研",
    source: "The Atlantic",
    sentence: "The fact that we can now sequence an entire human genome for under a thousand dollars, a task that cost billions just two decades ago, illustrates the extraordinary pace of technological progress and its potential to transform medicine.",
    translation: "我们现在能以不到一千美元的价格完成整个人类基因组测序——而仅仅二十年前这项任务需要数十亿美元——这说明了技术进步的非凡速度及其改变医学的潜力。",
    grammar: {
      main: { text: "The fact illustrates the extraordinary pace of technological progress and its potential to transform medicine", desc: "主干：事实说明了速度和潜力" },
      clauses: [
        { type: "同位语从句", text: "that we can now sequence an entire human genome for under a thousand dollars", desc: "解释 fact" },
        { type: "同位语", text: "a task that cost billions just two decades ago", desc: "补充说明" },
        { type: "定语从句", text: "that cost billions just two decades ago", desc: "修饰 task" }
      ],
      keywords: ["sequence", "genome", "extraordinary", "pace", "transform"],
      grammarPoints: ["同位语从句", "the fact that...", "illustrate"]
    },
    tags: ["科技", "医学"]
  },
  {
    id: 46,
    level: "六级",
    source: "BBC",
    sentence: "The growing movement to reduce single-use plastics has gained momentum globally, with many countries implementing bans on plastic bags and straws, and consumers increasingly choosing reusable alternatives.",
    translation: "减少一次性塑料的运动在全球范围内势头日增，许多国家实施了塑料袋和吸管禁令，消费者也越来越多地选择可重复使用的替代品。",
    grammar: {
      main: { text: "The growing movement has gained momentum globally", desc: "主干：运动获得了势头" },
      clauses: [
        { type: "介词短语", text: "to reduce single-use plastics", desc: "修饰 movement" },
        { type: "with 复合结构", text: "with many countries implementing bans and consumers increasingly choosing alternatives", desc: "两个并列的 with 结构" }
      ],
      keywords: ["momentum", "implement", "alternative", "reusable", "single-use"],
      grammarPoints: ["with + 名词 + doing", "gain momentum", "increasingly"]
    },
    tags: ["环保", "社会"]
  },
  {
    id: 47,
    level: "四级",
    source: "Scientific American",
    sentence: "Drinking enough water every day is essential for maintaining good health, as it helps regulate body temperature, transport nutrients, and remove waste products from the body.",
    translation: "每天喝足够的水对保持健康至关重要，因为它有助于调节体温、运输营养物质和排出体内的废物。",
    grammar: {
      main: { text: "Drinking enough water is essential for maintaining good health", desc: "动名词作主语" },
      clauses: [
        { type: "原因状语从句", text: "as it helps regulate body temperature, transport nutrients, and remove waste products", desc: "三个并列动词" }
      ],
      keywords: ["essential", "maintain", "regulate", "nutrient", "remove"],
      grammarPoints: ["动名词作主语", "be essential for doing", "help (to) do"]
    },
    tags: ["健康", "生活"]
  },
  {
    id: 48,
    level: "考研",
    source: "Nature",
    sentence: "The discovery of gravitational waves, predicted by Einstein a century ago but only recently detected by sophisticated instruments, has opened an entirely new window onto the universe and confirmed a key prediction of general relativity.",
    translation: "引力波的发现——一个世纪前由爱因斯坦预测，但直到最近才被精密仪器探测到——为宇宙打开了一扇全新的窗口，证实了广义相对论的一个关键预测。",
    grammar: {
      main: { text: "The discovery of gravitational waves has opened an entirely new window onto the universe and confirmed a key prediction", desc: "主干：发现打开了窗口并证实了预测" },
      clauses: [
        { type: "过去分词短语", text: "predicted by Einstein a century ago but only recently detected by sophisticated instruments", desc: "插入语" }
      ],
      keywords: ["gravitational", "sophisticated", "detect", "confirm", "relativity"],
      grammarPoints: ["过去分词作插入语", "onto", "an entirely new window"]
    },
    tags: ["物理", "科学"]
  },
  {
    id: 49,
    level: "六级",
    source: "The Economist",
    sentence: "The shift toward renewable energy sources is not just an environmental imperative but also an economic opportunity, as the cost of solar and wind power continues to fall and new jobs are created in the green energy sector.",
    translation: "向可再生能源的转变不仅是一种环境必要，也是一种经济机遇，因为太阳能和风能的成本持续下降，绿色能源领域创造了新的就业机会。",
    grammar: {
      main: { text: "The shift is not just an environmental imperative but also an economic opportunity", desc: "主干：转变不仅是必要也是机遇" },
      clauses: [
        { type: "原因状语从句", text: "as the cost of solar and wind power continues to fall and new jobs are created in the green energy sector", desc: "as 引导原因" }
      ],
      keywords: ["imperative", "renewable", "sector", "opportunity"],
      grammarPoints: ["not just... but also...", "as 引导原因从句", "continue to do"]
    },
    tags: ["能源", "经济"]
  },
  {
    id: 50,
    level: "四级",
    source: "The Guardian",
    sentence: "Spending time in nature, whether it is a walk in the park or a hike in the mountains, has been proven to lower blood pressure, reduce anxiety, and improve overall mental well-being.",
    translation: "在大自然中度过时光——无论是在公园散步还是在山中远足——已被证明能降低血压、减轻焦虑并改善整体心理健康。",
    grammar: {
      main: { text: "Spending time in nature has been proven to lower... reduce... and improve...", desc: "三个并列不定式" },
      clauses: [
        { type: "让步插入语", text: "whether it is a walk in the park or a hike in the mountains", desc: "whether... or... 无论" }
      ],
      keywords: ["anxiety", "overall", "well-being", "blood pressure"],
      grammarPoints: ["动名词作主语", "whether... or...", "be proven to do"]
    },
    tags: ["健康", "自然"]
  },
  {
    id: 51,
    level: "考研",
    source: "Harvard Business Review",
    sentence: "Organizations that foster a culture of psychological safety, where employees feel comfortable expressing dissenting opinions and admitting mistakes, consistently outperform those that punish failure and reward conformity.",
    translation: "培养心理安全感文化的组织——员工在其中可以自在地表达不同意见和承认错误——始终优于那些惩罚失败和奖励从众的组织。",
    grammar: {
      main: { text: "Organizations consistently outperform those", desc: "主干：组织始终优于那些" },
      clauses: [
        { type: "定语从句1", text: "that foster a culture of psychological safety", desc: "修饰 organizations" },
        { type: "非限制性定语从句", text: "where employees feel comfortable expressing dissenting opinions and admitting mistakes", desc: "修饰 culture/environment" },
        { type: "定语从句2", text: "that punish failure and reward conformity", desc: "修饰 those" }
      ],
      keywords: ["foster", "psychological", "dissenting", "conformity", "outperform"],
      grammarPoints: ["where 引导定语从句", "feel comfortable doing", "those 代词"]
    },
    tags: ["管理", "职场"]
  },
  {
    id: 52,
    level: "六级",
    source: "TIME",
    sentence: "The global vaccine rollout, unprecedented in both its speed and scale, has demonstrated what can be achieved when scientists, governments, and pharmaceutical companies work together toward a common goal.",
    translation: "全球疫苗接种工作——在速度和规模上都是史无前例的——展示了当科学家、政府和制药公司朝着共同目标合作时可以取得的成就。",
    grammar: {
      main: { text: "The global vaccine rollout has demonstrated what can be achieved", desc: "主干：接种工作展示了成就" },
      clauses: [
        { type: "插入语", text: "unprecedented in both its speed and scale", desc: "补充说明" },
        { type: "宾语从句", text: "what can be achieved when scientists, governments, and pharmaceutical companies work together toward a common goal", desc: "demonstrated 的宾语" },
        { type: "时间状语从句", text: "when scientists, governments, and pharmaceutical companies work together toward a common goal", desc: "when 引导" }
      ],
      keywords: ["unprecedented", "pharmaceutical", "demonstrate", "achieve"],
      grammarPoints: ["both... and...", "what 引导宾语从句", "work toward..."]
    },
    tags: ["医学", "合作"]
  },
  {
    id: 53,
    level: "四级",
    source: "BBC Learning English",
    sentence: "Learning to manage your time effectively is one of the most valuable skills you can develop, as it allows you to accomplish more in less time and reduces the stress associated with procrastination.",
    translation: "学会有效管理时间是你能培养的最有价值的技能之一，因为它能让你在更少的时间内完成更多事情，并减少拖延带来的压力。",
    grammar: {
      main: { text: "Learning to manage your time effectively is one of the most valuable skills", desc: "动名词作主语" },
      clauses: [
        { type: "定语从句", text: "you can develop", desc: "省略 that" },
        { type: "原因状语从句", text: "as it allows you to accomplish more in less time and reduces the stress", desc: "as 引导原因" },
        { type: "过去分词短语", text: "associated with procrastination", desc: "修饰 stress" }
      ],
      keywords: ["effectively", "valuable", "accomplish", "procrastination", "associated"],
      grammarPoints: ["动名词作主语", "allow sb. to do", "associated with"]
    },
    tags: ["效率", "成长"]
  },
  {
    id: 54,
    level: "考研",
    source: "The New Yorker",
    sentence: "In an era of information overload, the ability to think critically—to evaluate evidence, identify biases, and distinguish fact from opinion—has never been more important for navigating the complexities of modern life.",
    translation: "在信息过载的时代，批判性思维能力——评估证据、识别偏见、区分事实与观点——对于应对现代生活的复杂性从未如此重要。",
    grammar: {
      main: { text: "the ability to think critically has never been more important", desc: "主干：能力从未如此重要" },
      clauses: [
        { type: "介词短语", text: "In an era of information overload", desc: "时间/背景" },
        { type: "插入语", text: "to evaluate evidence, identify biases, and distinguish fact from opinion", desc: "解释 critical thinking" }
      ],
      keywords: ["overload", "critically", "evaluate", "bias", "distinguish", "navigate"],
      grammarPoints: ["has never been more important（最高级否定）", "distinguish... from...", "不定式作同位语"]
    },
    tags: ["思维", "社会"]
  },
  {
    id: 55,
    level: "六级",
    source: "National Geographic",
    sentence: "The rapid expansion of urban areas, which now house more than half of the world's population, is putting unprecedented pressure on natural habitats, water resources, and agricultural land, forcing difficult trade-offs between development and conservation.",
    translation: "城市地区的快速扩张——现在容纳了世界一半以上的人口——给自然栖息地、水资源和农业用地带来了前所未有的压力，迫使在发展与保护之间做出艰难的权衡。",
    grammar: {
      main: { text: "The rapid expansion of urban areas is putting unprecedented pressure on... and forcing difficult trade-offs", desc: "两个并列的现在分词" },
      clauses: [
        { type: "非限制性定语从句", text: "which now house more than half of the world's population", desc: "补充说明 urban areas" },
        { type: "现在分词短语", text: "forcing difficult trade-offs between development and conservation", desc: "结果状语" }
      ],
      keywords: ["expansion", "unprecedented", "habitat", "trade-off", "conservation"],
      grammarPoints: ["非限制性定语从句", "put pressure on...", "between... and..."]
    },
    tags: ["城市化", "环境"]
  },
  // ===== 雅思级别 (56-60) =====
  {
    id: 56,
    level: "雅思",
    source: "The Guardian",
    sentence: "The proliferation of surveillance cameras in public spaces, while ostensibly intended to enhance security, has raised fundamental questions about the balance between safety and the right to privacy in democratic societies.",
    translation: "公共空间中监控摄像头的激增——表面上是为了加强安全——引发了关于民主社会中安全与隐私权之间平衡的根本问题。",
    grammar: {
      main: { text: "The proliferation of surveillance cameras has raised fundamental questions", desc: "主干：监控摄像头的激增引发了根本问题" },
      clauses: [
        { type: "让步插入语", text: "while ostensibly intended to enhance security", desc: "while 引导的让步状语" },
        { type: "介词短语", text: "about the balance between safety and the right to privacy", desc: "修饰 questions" },
        { type: "介词短语", text: "in democratic societies", desc: "地点状语" }
      ],
      keywords: ["proliferation", "surveillance", "ostensibly", "enhance", "privacy"],
      grammarPoints: ["while 让步", "between... and...", "the right to do"]
    },
    tags: ["社会", "隐私"]
  },
  {
    id: 57,
    level: "雅思",
    source: "BBC",
    sentence: "Governments should allocate a greater proportion of their budgets to scientific research, as the long-term benefits of investment in areas such as renewable energy and medical innovation far outweigh the short-term costs.",
    translation: "政府应将更大比例的预算分配给科学研究，因为投资于可再生能源和医疗创新等领域的长期收益远远超过短期成本。",
    grammar: {
      main: { text: "Governments should allocate a greater proportion of their budgets to scientific research", desc: "主干：政府应分配更多预算给科研" },
      clauses: [
        { type: "原因状语从句", text: "as the long-term benefits of investment... far outweigh the short-term costs", desc: "as 引导原因" },
        { type: "介词短语", text: "in areas such as renewable energy and medical innovation", desc: "修饰 investment" }
      ],
      keywords: ["allocate", "proportion", "budget", "outweigh", "innovation"],
      grammarPoints: ["allocate... to...", "such as 举例", "far outweigh 强调比较"]
    },
    tags: ["政府", "科学"]
  },
  {
    id: 58,
    level: "雅思",
    source: "The Economist",
    sentence: "The widening gap between the rich and the poor, if left unaddressed, could destabilize entire economies and lead to social unrest on a scale not seen since the last century.",
    translation: "贫富之间日益扩大的差距，如果不加以解决，可能会破坏整个经济体的稳定，并导致自上个世纪以来从未见过的社会动荡。",
    grammar: {
      main: { text: "The widening gap could destabilize entire economies and lead to social unrest", desc: "主干：差距可能破坏稳定并导致动荡" },
      clauses: [
        { type: "条件插入语", text: "if left unaddressed", desc: "省略主语的条件状语" },
        { type: "介词短语", text: "on a scale not seen since the last century", desc: "修饰 unrest 的程度" }
      ],
      keywords: ["destabilize", "unrest", "unaddressed", "economy", "scale"],
      grammarPoints: ["if left... 省略句", "lead to...", "not seen since... 过去分词短语"]
    },
    tags: ["经济", "社会"]
  },
  {
    id: 59,
    level: "雅思",
    source: "Nature",
    sentence: "While some argue that space exploration is a waste of resources that could be better spent solving problems on Earth, others contend that the scientific knowledge gained from such endeavors is invaluable and may ultimately benefit all of humanity.",
    translation: "虽然一些人认为太空探索是浪费资源，这些资源可以更好地用于解决地球上的问题，但另一些人认为从这些努力中获得的科学知识是无价的，最终可能造福全人类。",
    grammar: {
      main: { text: "While some argue that... others contend that...", desc: "主干：一些人认为...另一些人认为..." },
      clauses: [
        { type: "让步状语从句", text: "While some argue that space exploration is a waste of resources", desc: "While 让步" },
        { type: "定语从句", text: "that could be better spent solving problems on Earth", desc: "修饰 resources" },
        { type: "宾语从句", text: "that the scientific knowledge gained from such endeavors is invaluable", desc: "contend 的宾语" },
        { type: "并列句", text: "and may ultimately benefit all of humanity", desc: "与 is invaluable 并列" }
      ],
      keywords: ["contend", "endeavor", "invaluable", "ultimately", "exploration"],
      grammarPoints: ["While... others...", "be spent doing", "gain from..."]
    },
    tags: ["科学", "太空"]
  },
  {
    id: 60,
    level: "雅思",
    source: "TIME",
    sentence: "Education should not merely focus on academic achievement but should also cultivate critical thinking, creativity, and emotional intelligence—qualities that are increasingly valued in the modern workplace.",
    translation: "教育不应仅仅关注学业成绩，还应培养批判性思维、创造力和情商——这些品质在现代职场中越来越受到重视。",
    grammar: {
      main: { text: "Education should not merely focus on... but should also cultivate...", desc: "主干：教育不应只关注...还应培养..." },
      clauses: [
        { type: "同位语", text: "qualities that are increasingly valued in the modern workplace", desc: "解释前面三个品质" },
        { type: "定语从句", text: "that are increasingly valued in the modern workplace", desc: "修饰 qualities" }
      ],
      keywords: ["cultivate", "critical thinking", "emotional intelligence", "increasingly", "valued"],
      grammarPoints: ["not merely... but also...", "破折号作同位语", "be valued in..."]
    },
    tags: ["教育", "职场"]
  },
  // ===== 托福级别 (61-65) =====
  {
    id: 61,
    level: "托福",
    source: "Scientific American",
    sentence: "The ability of certain bird species to navigate thousands of miles during migration, using the Earth's magnetic field as a guide, has fascinated scientists for decades and remains one of nature's most remarkable mysteries.",
    translation: "某些鸟类在迁徙过程中利用地球磁场作为导航，能够飞行数千英里的能力几十年来一直令科学家着迷，至今仍是自然界最引人注目的奥秘之一。",
    grammar: {
      main: { text: "The ability has fascinated scientists and remains one of nature's most remarkable mysteries", desc: "主干：能力令科学家着迷，至今仍是奥秘" },
      clauses: [
        { type: "不定式", text: "of certain bird species to navigate thousands of miles during migration", desc: "修饰 ability" },
        { type: "现在分词短语", text: "using the Earth's magnetic field as a guide", desc: "方式状语" }
      ],
      keywords: ["navigate", "migration", "magnetic", "fascinate", "remarkable"],
      grammarPoints: ["the ability to do", "现在分词作方式状语", "one of the most..."]
    },
    tags: ["自然", "动物"]
  },
  {
    id: 62,
    level: "托福",
    source: "National Geographic",
    sentence: "Archaeologists have recently discovered that ancient civilizations in South America were far more sophisticated than previously believed, with evidence of complex irrigation systems, astronomical observatories, and extensive trade networks dating back thousands of years.",
    translation: "考古学家最近发现，南美洲的古代文明远比之前认为的要复杂得多，有证据表明数千年前就存在复杂的灌溉系统、天文台和广泛的贸易网络。",
    grammar: {
      main: { text: "Archaeologists have recently discovered that...", desc: "主干：考古学家发现..." },
      clauses: [
        { type: "宾语从句", text: "that ancient civilizations were far more sophisticated than previously believed", desc: "discovered 的宾语" },
        { type: "介词短语", text: "with evidence of complex irrigation systems, astronomical observatories, and extensive trade networks", desc: "with 引导的伴随状语" },
        { type: "现在分词短语", text: "dating back thousands of years", desc: "修饰 networks" }
      ],
      keywords: ["archaeologist", "sophisticated", "irrigation", "astronomical", "extensive"],
      grammarPoints: ["far more... than...", "with + 名词 + of...", "date back to..."]
    },
    tags: ["历史", "考古"]
  },
  {
    id: 63,
    level: "托福",
    source: "The Atlantic",
    sentence: "The transition from fossil fuels to renewable energy sources, while essential for combating climate change, will require massive investment in infrastructure, significant changes in consumer behavior, and unprecedented international cooperation.",
    translation: "从化石燃料向可再生能源的转型——虽然对应对气候变化至关重要——将需要大规模的基础设施投资、消费者行为的重大变化以及前所未有的国际合作。",
    grammar: {
      main: { text: "The transition will require massive investment, significant changes, and unprecedented international cooperation", desc: "主干：转型将需要投资、变化和合作" },
      clauses: [
        { type: "介词短语", text: "from fossil fuels to renewable energy sources", desc: "修饰 transition" },
        { type: "让步插入语", text: "while essential for combating climate change", desc: "while 引导的让步" }
      ],
      keywords: ["transition", "combating", "infrastructure", "unprecedented", "cooperation"],
      grammarPoints: ["from... to...", "while + adj. 让步", "三个并列宾语"]
    },
    tags: ["能源", "环境"]
  },
  {
    id: 64,
    level: "托福",
    source: "BBC",
    sentence: "Studies have demonstrated that children who are exposed to multiple languages from an early age develop stronger cognitive abilities, including improved memory, enhanced problem-solving skills, and greater mental flexibility.",
    translation: "研究表明，从幼年就接触多种语言的儿童会发展出更强的认知能力，包括改善的记忆力、增强的解决问题的能力和更大的心理灵活性。",
    grammar: {
      main: { text: "Studies have demonstrated that...", desc: "主干：研究证明..." },
      clauses: [
        { type: "宾语从句", text: "that children develop stronger cognitive abilities", desc: "demonstrated 的宾语" },
        { type: "定语从句", text: "who are exposed to multiple languages from an early age", desc: "修饰 children" },
        { type: "同位语", text: "including improved memory, enhanced problem-solving skills, and greater mental flexibility", desc: "解释 cognitive abilities" }
      ],
      keywords: ["demonstrate", "exposed to", "cognitive", "enhanced", "flexibility"],
      grammarPoints: ["be exposed to...", "including 举例", "三个并列名词短语"]
    },
    tags: ["教育", "语言"]
  },
  {
    id: 65,
    level: "托福",
    source: "TIME",
    sentence: "The rapid advancement of biotechnology, particularly in the fields of gene therapy and personalized medicine, promises to revolutionize healthcare by enabling treatments tailored to an individual's genetic makeup.",
    translation: "生物技术的快速发展——特别是在基因治疗和个性化医疗领域——有望通过实现针对个人基因构成的定制治疗来彻底改变医疗保健。",
    grammar: {
      main: { text: "The rapid advancement of biotechnology promises to revolutionize healthcare", desc: "主干：生物技术的发展有望彻底改变医疗" },
      clauses: [
        { type: "同位语", text: "particularly in the fields of gene therapy and personalized medicine", desc: "补充说明具体领域" },
        { type: "介词短语", text: "by enabling treatments tailored to an individual's genetic makeup", desc: "方式状语" },
        { type: "过去分词短语", text: "tailored to an individual's genetic makeup", desc: "修饰 treatments" }
      ],
      keywords: ["biotechnology", "therapy", "personalized", "revolutionize", "tailored"],
      grammarPoints: ["promise to do", "tailored to 过去分词", "by doing 方式状语"]
    },
    tags: ["科技", "医学"]
  },
  // ===== 补充考研 (66-68) =====
  {
    id: 66,
    level: "考研",
    source: "The Economist",
    sentence: "Central to the debate over artificial intelligence is the question of whether machines can truly think, or whether they are merely sophisticated tools that simulate human intelligence without genuine understanding.",
    translation: "人工智能辩论的核心问题是机器是否能真正思考，还是它们仅仅是模拟人类智能而没有真正理解的精密工具。",
    grammar: {
      main: { text: "Central to the debate is the question of whether... or whether...", desc: "倒装句，主干是 the question" },
      clauses: [
        { type: "介词短语", text: "Central to the debate over artificial intelligence", desc: "表语前置引起倒装" },
        { type: "宾语从句1", text: "whether machines can truly think", desc: "of 的宾语" },
        { type: "宾语从句2", text: "whether they are merely sophisticated tools", desc: "or 连接的并列宾语" },
        { type: "定语从句", text: "that simulate human intelligence without genuine understanding", desc: "修饰 tools" }
      ],
      keywords: ["central", "debate", "simulate", "genuine", "sophisticated"],
      grammarPoints: ["表语前置倒装", "whether... or whether...", "without + n. 否定伴随"]
    },
    tags: ["AI", "哲学"]
  },
  {
    id: 67,
    level: "考研",
    source: "Nature",
    sentence: "It is no exaggeration to say that the discovery of the microbiome—the trillions of microorganisms living in and on our bodies—has fundamentally transformed our understanding of human health and disease.",
    translation: "毫不夸张地说，微生物组的发现——生活在我们体内和体表的数万亿微生物——从根本上改变了我们对人类健康和疾病的理解。",
    grammar: {
      main: { text: "It is no exaggeration to say that...", desc: "形式主语句型" },
      clauses: [
        { type: "真正主语", text: "to say that the discovery has fundamentally transformed our understanding", desc: "不定式作真正主语" },
        { type: "同位语", text: "the trillions of microorganisms living in and on our bodies", desc: "解释 microbiome" },
        { type: "现在分词短语", text: "living in and on our bodies", desc: "修饰 microorganisms" }
      ],
      keywords: ["exaggeration", "microbiome", "microorganism", "fundamentally", "transform"],
      grammarPoints: ["It is no exaggeration to say that...", "破折号同位语", "living 现在分词作后置定语"]
    },
    tags: ["医学", "科学"]
  },
  {
    id: 68,
    level: "考研",
    source: "Harvard Business Review",
    sentence: "What separates enduring companies from those that fade into obscurity is not the absence of failure, but rather the capacity to learn from setbacks, adapt to changing circumstances, and continuously reinvent themselves.",
    translation: "将经久不衰的公司与逐渐销声匿迹的公司区分开来的，不是没有失败，而是从挫折中学习、适应不断变化的环境并持续自我革新的能力。",
    grammar: {
      main: { text: "What separates enduring companies is not the absence... but rather the capacity to...", desc: "主语从句 + 并列表语" },
      clauses: [
        { type: "主语从句", text: "What separates enduring companies from those that fade into obscurity", desc: "what 引导主语从句" },
        { type: "定语从句", text: "that fade into obscurity", desc: "修饰 those" },
        { type: "不定式", text: "to learn from setbacks, adapt to changing circumstances, and continuously reinvent themselves", desc: "三个并列不定式修饰 capacity" }
      ],
      keywords: ["enduring", "obscurity", "setback", "reinvent", "circumstance"],
      grammarPoints: ["What 引导主语从句", "not... but rather...", "三个并列不定式"]
    },
    tags: ["商业", "管理"]
  },
  // ===== 补充六级 (69-70) =====
  {
    id: 69,
    level: "六级",
    source: "The Guardian",
    sentence: "The concept of sustainable development, which seeks to balance economic growth with environmental protection and social equity, has become a guiding principle for policymakers around the world.",
    translation: "可持续发展的概念——寻求平衡经济增长与环境保护和社会公平——已成为全球政策制定者的指导原则。",
    grammar: {
      main: { text: "The concept of sustainable development has become a guiding principle", desc: "主干：概念成为指导原则" },
      clauses: [
        { type: "非限制性定语从句", text: "which seeks to balance economic growth with environmental protection and social equity", desc: "补充说明 sustainable development" }
      ],
      keywords: ["sustainable", "equity", "guiding", "principle", "policymaker"],
      grammarPoints: ["非限制性定语从句", "balance... with...", "seek to do"]
    },
    tags: ["环境", "政策"]
  },
  {
    id: 70,
    level: "六级",
    source: "Scientific American",
    sentence: "Artificial intelligence is increasingly being used to diagnose diseases, predict natural disasters, and optimize energy consumption, demonstrating its potential to address some of humanity's most pressing challenges.",
    translation: "人工智能正越来越多地被用于诊断疾病、预测自然灾害和优化能源消耗，展示了其解决人类一些最紧迫挑战的潜力。",
    grammar: {
      main: { text: "Artificial intelligence is increasingly being used to diagnose... predict... and optimize...", desc: "主干：AI被用于三个目的" },
      clauses: [
        { type: "现在分词短语", text: "demonstrating its potential to address some of humanity's most pressing challenges", desc: "结果状语" },
        { type: "不定式", text: "to address some of humanity's most pressing challenges", desc: "修饰 potential" }
      ],
      keywords: ["diagnose", "predict", "optimize", "demonstrate", "pressing"],
      grammarPoints: ["be used to do", "三个并列不定式", "现在分词作结果状语"]
    },
    tags: ["科技", "AI"]
  },
  // ===== 补充句子 (71-90) =====
  {
    id: 71,
    level: "四级",
    source: "BBC",
    sentence: "The number of students choosing to study abroad has increased dramatically over the past decade, driven by the desire for better educational opportunities and international experience.",
    translation: "过去十年来，选择出国留学的学生数量急剧增加，这得益于对更好教育机会和国际经验的渴望。",
    grammar: {
      main: { text: "The number of students has increased dramatically", desc: "主干：学生数量急剧增加" },
      clauses: [
        { type: "现在分词短语", text: "choosing to study abroad", desc: "修饰 students" },
        { type: "过去分词短语", text: "driven by the desire for better educational opportunities", desc: "原因状语" }
      ],
      keywords: ["dramatically", "decade", "driven by", "desire", "opportunity"],
      grammarPoints: ["现在分词作后置定语", "过去分词作原因状语", "the number of..."]
    },
    tags: ["教育", "留学"]
  },
  {
    id: 72,
    level: "四级",
    source: "The Guardian",
    sentence: "Eating a balanced diet that includes plenty of fruits, vegetables, and whole grains is essential for maintaining good health and preventing chronic diseases.",
    translation: "吃包含大量水果、蔬菜和全谷物的均衡饮食对保持健康和预防慢性疾病至关重要。",
    grammar: {
      main: { text: "Eating a balanced diet is essential for maintaining good health", desc: "主干：吃均衡饮食对保持健康至关重要" },
      clauses: [
        { type: "动名词短语", text: "Eating a balanced diet", desc: "作主语" },
        { type: "定语从句", text: "that includes plenty of fruits, vegetables, and whole grains", desc: "修饰 diet" }
      ],
      keywords: ["balanced", "essential", "maintain", "prevent", "chronic"],
      grammarPoints: ["动名词作主语", "that 引导定语从句", "be essential for doing"]
    },
    tags: ["健康", "饮食"]
  },
  {
    id: 73,
    level: "六级",
    source: "TIME",
    sentence: "The gig economy, which allows people to work flexible hours as independent contractors, has grown rapidly but raised concerns about worker protections and benefits.",
    translation: "零工经济允许人们作为独立承包商灵活工作时间，发展迅速，但也引发了对工人保护和福利的担忧。",
    grammar: {
      main: { text: "The gig economy has grown rapidly but raised concerns", desc: "主干：零工经济发展迅速但也引发担忧" },
      clauses: [
        { type: "非限制性定语从句", text: "which allows people to work flexible hours as independent contractors", desc: "补充说明 gig economy" }
      ],
      keywords: ["gig economy", "flexible", "contractor", "protection", "benefit"],
      grammarPoints: ["非限制性定语从句", "allow sb to do", "raise concerns about..."]
    },
    tags: ["经济", "工作"]
  },
  {
    id: 74,
    level: "六级",
    source: "The Economist",
    sentence: "Central banks around the world are grappling with the challenge of controlling inflation without stifling economic growth, a delicate balancing act that requires careful calibration of monetary policy.",
    translation: "世界各地的央行正在努力应对在不扼杀经济增长的情况下控制通胀的挑战，这是一项需要仔细校准货币政策的微妙平衡之举。",
    grammar: {
      main: { text: "Central banks are grappling with the challenge", desc: "主干：央行正在应对挑战" },
      clauses: [
        { type: "介词短语", text: "of controlling inflation without stifling economic growth", desc: "修饰 challenge" },
        { type: "同位语", text: "a delicate balancing act that requires careful calibration", desc: "解释说明 challenge" }
      ],
      keywords: ["grapple", "inflation", "stifle", "delicate", "calibration"],
      grammarPoints: ["grapple with...", "without doing", "同位语"]
    },
    tags: ["经济", "金融"]
  },
  {
    id: 75,
    level: "考研",
    source: "Nature",
    sentence: "The discovery that the human microbiome plays a crucial role in regulating immune function has opened up new avenues for treating autoimmune diseases and allergies.",
    translation: "人类微生物组在调节免疫功能中起关键作用的发现，为治疗自身免疫性疾病和过敏开辟了新途径。",
    grammar: {
      main: { text: "The discovery has opened up new avenues", desc: "主干：发现开辟了新途径" },
      clauses: [
        { type: "同位语从句", text: "that the human microbiome plays a crucial role in regulating immune function", desc: "解释 discovery" }
      ],
      keywords: ["microbiome", "crucial", "regulate", "avenue", "autoimmune"],
      grammarPoints: ["同位语从句", "play a role in...", "open up"]
    },
    tags: ["医学", "科学"]
  },
  {
    id: 76,
    level: "考研",
    source: "The Atlantic",
    sentence: "What makes a great leader is not the ability to command obedience, but rather the capacity to inspire others to pursue a shared vision with enthusiasm and commitment.",
    translation: "使一个伟大领袖的不是命令服从的能力，而是激励他人以热情和承诺追求共同愿景的能力。",
    grammar: {
      main: { text: "What makes a great leader is not... but rather the capacity to...", desc: "主语从句 + 并列表语" },
      clauses: [
        { type: "主语从句", text: "What makes a great leader", desc: "what 引导" },
        { type: "不定式", text: "to inspire others to pursue a shared vision", desc: "修饰 capacity" }
      ],
      keywords: ["command", "obedience", "inspire", "pursue", "commitment"],
      grammarPoints: ["What 引导主语从句", "not... but rather...", "inspire sb to do"]
    },
    tags: ["领导力", "管理"]
  },
  {
    id: 77,
    level: "雅思",
    source: "BBC",
    sentence: "While some people believe that university education should be free for everyone, others argue that students should contribute to the cost of their studies, as this encourages them to value their education more highly.",
    translation: "虽然一些人认为大学教育应该对所有人免费，但另一些人认为学生应该为学习成本做出贡献，因为这鼓励他们更重视教育。",
    grammar: {
      main: { text: "While some people believe that... others argue that...", desc: "主干：一些人认为...另一些人认为..." },
      clauses: [
        { type: "让步状语从句", text: "While some people believe that university education should be free", desc: "While 让步" },
        { type: "原因状语从句", text: "as this encourages them to value their education more highly", desc: "as 引导原因" }
      ],
      keywords: ["university", "contribute", "encourage", "value", "highly"],
      grammarPoints: ["While... others...", "argue that...", "encourage sb to do"]
    },
    tags: ["教育", "社会"]
  },
  {
    id: 78,
    level: "雅思",
    source: "The Guardian",
    sentence: "The increasing popularity of online shopping has had a profound impact on traditional brick-and-mortar stores, many of which have been forced to close or reinvent themselves to survive.",
    translation: "网上购物日益普及对传统实体店产生了深远影响，其中许多被迫关闭或重新改造以求生存。",
    grammar: {
      main: { text: "The increasing popularity has had a profound impact", desc: "主干：普及产生了深远影响" },
      clauses: [
        { type: "非限制性定语从句", text: "many of which have been forced to close or reinvent themselves", desc: "补充说明 stores" }
      ],
      keywords: ["profound", "impact", "brick-and-mortar", "reinvent", "survive"],
      grammarPoints: ["have an impact on...", "many of which...", "be forced to do"]
    },
    tags: ["商业", "科技"]
  },
  {
    id: 79,
    level: "托福",
    source: "Scientific American",
    sentence: "Recent advances in neuroscience have revealed that the brain is far more plastic than previously thought, capable of forming new neural connections throughout life in response to learning and experience.",
    translation: "神经科学的最新进展表明，大脑的可塑性远超此前认为的，能够在整个生命过程中根据学习和经验形成新的神经连接。",
    grammar: {
      main: { text: "Recent advances have revealed that...", desc: "主干：进展表明..." },
      clauses: [
        { type: "宾语从句", text: "that the brain is far more plastic than previously thought", desc: "revealed 的宾语" },
        { type: "形容词短语", text: "capable of forming new neural connections", desc: "补充说明 brain" },
        { type: "介词短语", text: "in response to learning and experience", desc: "条件状语" }
      ],
      keywords: ["neuroscience", "plastic", "neural", "connection", "response"],
      grammarPoints: ["far more... than...", "capable of doing", "in response to..."]
    },
    tags: ["科学", "大脑"]
  },
  {
    id: 80,
    level: "托福",
    source: "TIME",
    sentence: "Climate change poses an existential threat to many island nations, which face the prospect of losing significant portions of their territory to rising sea levels within the next few decades.",
    translation: "气候变化对许多岛国构成生存威胁，这些国家面临在未来几十年内因海平面上升而失去大部分领土的前景。",
    grammar: {
      main: { text: "Climate change poses an existential threat", desc: "主干：气候变化构成生存威胁" },
      clauses: [
        { type: "非限制性定语从句", text: "which face the prospect of losing significant portions of their territory", desc: "补充说明 island nations" },
        { type: "介词短语", text: "to rising sea levels within the next few decades", desc: "时间/原因状语" }
      ],
      keywords: ["existential", "threat", "prospect", "territory", "significant"],
      grammarPoints: ["pose a threat to...", "the prospect of doing", "within the next..."]
    },
    tags: ["环境", "气候"]
  },
  {
    id: 81,
    level: "四级",
    source: "National Geographic",
    sentence: "Volunteering in developing countries can be a life-changing experience that broadens your perspective and helps you appreciate the privileges you may have taken for granted.",
    translation: "在发展中国家做志愿者可能是一次改变人生的经历，它能拓宽你的视野，帮助你认识到可能被视为理所当然的特权。",
    grammar: {
      main: { text: "Volunteering can be a life-changing experience", desc: "动名词作主语" },
      clauses: [
        { type: "定语从句", text: "that broadens your perspective and helps you appreciate", desc: "修饰 experience" },
        { type: "定语从句", text: "you may have taken for granted", desc: "省略 that，修饰 privileges" }
      ],
      keywords: ["volunteer", "perspective", "appreciate", "privilege", "take for granted"],
      grammarPoints: ["动名词作主语", "take for granted", "help sb do"]
    },
    tags: ["社会", "志愿"]
  },
  {
    id: 82,
    level: "六级",
    source: "Harvard Business Review",
    sentence: "Companies that invest in employee training and development tend to have higher retention rates, greater innovation, and better financial performance than those that do not.",
    translation: "投资于员工培训和发展的公司往往比不投资的公司拥有更高的留任率、更强的创新能力和更好的财务表现。",
    grammar: {
      main: { text: "Companies tend to have higher retention rates than those", desc: "主干：公司往往拥有更高的留任率" },
      clauses: [
        { type: "定语从句1", text: "that invest in employee training and development", desc: "修饰 companies" },
        { type: "定语从句2", text: "that do not", desc: "修饰 those" }
      ],
      keywords: ["invest", "retention", "innovation", "financial", "performance"],
      grammarPoints: ["tend to do", "比较级 + than", "those 代词"]
    },
    tags: ["商业", "管理"]
  },
  {
    id: 83,
    level: "考研",
    source: "The New Yorker",
    sentence: "The paradox of modern technology is that while it has made communication easier and more convenient, it has also made genuine human connection more difficult to achieve.",
    translation: "现代技术的悖论是，虽然它使沟通变得更容易更方便，但也使真正的人际联系更难实现。",
    grammar: {
      main: { text: "The paradox is that...", desc: "主干：悖论在于..." },
      clauses: [
        { type: "表语从句", text: "that while it has made communication easier... it has also made genuine human connection more difficult", desc: "表语从句含让步" },
        { type: "让步状语从句", text: "while it has made communication easier and more convenient", desc: "while 让步" }
      ],
      keywords: ["paradox", "convenient", "genuine", "connection", "achieve"],
      grammarPoints: ["表语从句", "while 让步", "make + 宾语 + adj."]
    },
    tags: ["科技", "社会"]
  },
  {
    id: 84,
    level: "雅思",
    source: "The Economist",
    sentence: "The growing income inequality between the richest and poorest segments of society has become one of the most pressing issues of our time, with far-reaching implications for social stability and economic growth.",
    translation: "社会最富裕和最贫困阶层之间日益扩大的收入不平等已成为我们时代最紧迫的问题之一，对社会稳定和经济增长具有深远影响。",
    grammar: {
      main: { text: "The growing income inequality has become one of the most pressing issues", desc: "主干：收入不平等成为最紧迫问题之一" },
      clauses: [
        { type: "介词短语", text: "between the richest and poorest segments of society", desc: "修饰 inequality" },
        { type: "with 短语", text: "with far-reaching implications for social stability", desc: "伴随状语" }
      ],
      keywords: ["inequality", "segment", "pressing", "implication", "stability"],
      grammarPoints: ["one of the most...", "with + 名词 + 介词短语", "between... and..."]
    },
    tags: ["经济", "社会"]
  },
  {
    id: 85,
    level: "四级",
    source: "BBC Learning English",
    sentence: "Learning to manage your time effectively is one of the most valuable skills you can develop, as it allows you to accomplish more in less time and reduces stress.",
    translation: "学会有效管理时间是你能培养的最有价值的技能之一，因为它能让你在更少的时间内完成更多事情并减少压力。",
    grammar: {
      main: { text: "Learning to manage your time is one of the most valuable skills", desc: "动名词作主语" },
      clauses: [
        { type: "定语从句", text: "you can develop", desc: "省略 that" },
        { type: "原因状语从句", text: "as it allows you to accomplish more in less time", desc: "as 引导原因" }
      ],
      keywords: ["manage", "effectively", "valuable", "accomplish", "reduce"],
      grammarPoints: ["动名词作主语", "allow sb to do", "as 引导原因从句"]
    },
    tags: ["效率", "成长"]
  },
  {
    id: 86,
    level: "六级",
    source: "Nature",
    sentence: "Gene therapy, which involves replacing or modifying defective genes to treat disease, has shown remarkable promise in clinical trials for conditions such as sickle cell disease and certain types of blindness.",
    translation: "基因治疗——通过替换或修饰缺陷基因来治疗疾病——在镰状细胞病和某些类型失明等疾病的临床试验中显示出显著前景。",
    grammar: {
      main: { text: "Gene therapy has shown remarkable promise", desc: "主干：基因治疗显示出显著前景" },
      clauses: [
        { type: "非限制性定语从句", text: "which involves replacing or modifying defective genes to treat disease", desc: "补充说明 gene therapy" },
        { type: "介词短语", text: "for conditions such as sickle cell disease", desc: "修饰 promise" }
      ],
      keywords: ["therapy", "defective", "remarkable", "clinical", "trial"],
      grammarPoints: ["非限制性定语从句", "involve doing", "such as 举例"]
    },
    tags: ["医学", "科技"]
  },
  {
    id: 87,
    level: "考研",
    source: "TIME",
    sentence: "The fact that misinformation spreads faster than factual information on social media platforms poses a serious threat to democratic discourse and public trust in institutions.",
    translation: "社交媒体平台上错误信息比事实信息传播更快的事实，对民主话语和公众对机构的信任构成严重威胁。",
    grammar: {
      main: { text: "The fact poses a serious threat", desc: "主干：事实构成严重威胁" },
      clauses: [
        { type: "同位语从句", text: "that misinformation spreads faster than factual information on social media platforms", desc: "解释 fact" }
      ],
      keywords: ["misinformation", "factual", "discourse", "institution", "threat"],
      grammarPoints: ["同位语从句", "the fact that...", "pose a threat to..."]
    },
    tags: ["媒体", "社会"]
  },
  {
    id: 88,
    level: "托福",
    source: "National Geographic",
    sentence: "The decline of pollinator populations, caused by habitat loss, pesticide use, and climate change, threatens global food security, as approximately 75 percent of the world's food crops depend on animal pollination.",
    translation: "传粉者数量的下降——由栖息地丧失、农药使用和气候变化引起——威胁着全球粮食安全，因为世界上约75%的粮食作物依赖动物授粉。",
    grammar: {
      main: { text: "The decline threatens global food security", desc: "主干：下降威胁全球粮食安全" },
      clauses: [
        { type: "过去分词短语", text: "caused by habitat loss, pesticide use, and climate change", desc: "原因状语" },
        { type: "原因状语从句", text: "as approximately 75 percent of the world's food crops depend on animal pollination", desc: "as 引导原因" }
      ],
      keywords: ["pollinator", "habitat", "pesticide", "security", "approximate"],
      grammarPoints: ["过去分词作原因状语", "as 引导原因从句", "depend on..."]
    },
    tags: ["环境", "农业"]
  },
  {
    id: 89,
    level: "四级",
    source: "The Guardian",
    sentence: "Regular physical activity, such as walking, cycling, or swimming, can significantly reduce the risk of heart disease, stroke, and type 2 diabetes.",
    translation: "定期体育活动，如步行、骑自行车或游泳，可以显著降低患心脏病、中风和2型糖尿病的风险。",
    grammar: {
      main: { text: "Regular physical activity can significantly reduce the risk", desc: "主干：体育活动可以降低风险" },
      clauses: [
        { type: "插入语", text: "such as walking, cycling, or swimming", desc: "举例说明" }
      ],
      keywords: ["physical", "activity", "significantly", "reduce", "risk"],
      grammarPoints: ["such as 举例", "reduce the risk of...", "三个并列名词"]
    },
    tags: ["健康", "运动"]
  },
  {
    id: 90,
    level: "六级",
    source: "Harvard Business Review",
    sentence: "The most successful organizations are those that embrace diversity and inclusion, recognizing that diverse teams produce better outcomes because they bring a wider range of perspectives and experiences to problem-solving.",
    translation: "最成功的组织是那些拥抱多样性和包容性的组织，他们认识到多元化的团队能产生更好的结果，因为它们为解决问题带来了更广泛的视角和经验。",
    grammar: {
      main: { text: "The most successful organizations are those that...", desc: "主干：最成功的组织是那些..." },
      clauses: [
        { type: "定语从句", text: "that embrace diversity and inclusion", desc: "修饰 those" },
        { type: "现在分词短语", text: "recognizing that diverse teams produce better outcomes", desc: "伴随状语" },
        { type: "原因状语从句", text: "because they bring a wider range of perspectives and experiences", desc: "because 引导原因" }
      ],
      keywords: ["embrace", "diversity", "inclusion", "outcome", "perspective"],
      grammarPoints: ["those 代词", "现在分词作伴随状语", "a range of..."]
    },
    tags: ["管理", "职场"]
  }
];

// ===== 文章数据 =====
const ARTICLES = [
  {
    id: 1,
    level: "四级",
    source: "BBC Learning English",
    title: "The Power of Habit: Why We Do What We Do",
    summary: "探讨习惯的力量以及如何利用习惯改变生活",
    paragraphs: [
      {
        en: "Habits are powerful forces in our lives. They shape our daily routines, influence our health, and determine much of our behavior without us even realizing it. According to researchers at Duke University, more than 40 percent of the actions people perform each day aren't actual decisions, but habits.",
        cn: "习惯是我们生活中强大的力量。它们塑造我们的日常作息，影响我们的健康，并在我们不知不觉中决定了我们的大部分行为。根据杜克大学的研究，人们每天执行的40%以上的动作不是实际的决定，而是习惯。",
        difficultWords: ["routine", "influence", "behavior", "perform", "habit"]
      },
      {
        en: "The habit loop, as described by Charles Duhigg in his book 'The Power of Habit,' consists of three components: a cue, a routine, and a reward. The cue triggers the behavior, the routine is the behavior itself, and the reward is the positive reinforcement that tells your brain to remember this loop for the future.",
        cn: "查尔斯·杜希格在其著作《习惯的力量》中描述的习惯循环由三个部分组成：提示、惯常行为和奖励。提示触发行为，惯常行为是行为本身，而奖励是告诉你的大脑记住这个循环以备将来的正向强化。",
        difficultWords: ["cue", "trigger", "reinforcement", "component", "loop"]
      },
      {
        en: "Understanding how habits work is the first step toward changing them. By identifying the cues and rewards associated with unwanted habits, we can replace negative routines with positive ones. For example, if stress is the cue for unhealthy eating, replacing the eating routine with a short walk can achieve the same reward of relief.",
        cn: "理解习惯如何运作是改变它们的第一步。通过识别与不良习惯相关的提示和奖励，我们可以用积极的惯常行为替代消极的。例如，如果压力是不健康饮食的提示，用短暂散步替代饮食行为可以获得同样的缓解奖励。",
        difficultWords: ["identify", "associated with", "unwanted", "achieve", "relief"]
      },
      {
        en: "Research suggests that it takes an average of 66 days to form a new habit, though this can vary significantly depending on the person and the complexity of the behavior. The key is consistency: performing the new behavior at the same time and in the same context each day until it becomes automatic.",
        cn: "研究表明，形成一个新习惯平均需要66天，尽管这可能因人而异，也取决于行为的复杂程度。关键在于一致性：每天在同一时间和同一背景下执行新行为，直到它变得自动化。",
        difficultWords: ["consistency", "automatic", "complexity", "vary", "significant"]
      }
    ],
    question: "According to the article, what percentage of daily actions are habits rather than actual decisions?",
    options: ["More than 20%", "More than 30%", "More than 40%", "More than 50%"],
    answer: 2
  },
  {
    id: 2,
    level: "六级",
    source: "The Atlantic",
    title: "Why Remote Work Is Here to Stay",
    summary: "分析远程工作的趋势及其对社会的深远影响",
    paragraphs: [
      {
        en: "The COVID-19 pandemic forced a massive experiment in remote work that few companies had anticipated. What began as a temporary measure has evolved into a permanent shift in how millions of people around the world approach their jobs. Surveys consistently show that a majority of remote workers prefer to continue working from home, at least part of the time.",
        cn: "新冠疫情迫使一场大规模的远程工作实验，这是很少有公司预料到的。最初作为临时措施的东西，已经演变成全球数百万人工作方式的永久性转变。调查一致显示，大多数远程工作者更愿意继续在家工作，至少是部分时间。",
        difficultWords: ["anticipate", "temporary", "permanent", "evolve", "consistently"]
      },
      {
        en: "The benefits of remote work are well documented. Workers report higher productivity, better work-life balance, and reduced stress from eliminating daily commutes. Companies benefit from lower office costs and access to a global talent pool. Environmental gains are also significant, with reduced commuting leading to lower carbon emissions.",
        cn: "远程工作的好处已被充分记录。员工报告了更高的生产力、更好的工作与生活平衡，以及因消除日常通勤而减少的压力。公司受益于更低的办公成本和获取全球人才库的机会。环境收益也很显著，减少通勤导致碳排放降低。",
        difficultWords: ["productivity", "commute", "eliminate", "talent pool", "emission"]
      },
      {
        en: "However, remote work also presents challenges. Social isolation, difficulty separating work from personal life, and the loss of spontaneous collaboration are common concerns. Managers face new challenges in maintaining team cohesion and monitoring performance without micromanaging.",
        cn: "然而，远程工作也带来了挑战。社交隔离、难以将工作与个人生活分开，以及失去自发的协作是常见的担忧。管理者在保持团队凝聚力和监控绩效而不进行微观管理方面面临新的挑战。",
        difficultWords: ["isolation", "spontaneous", "collaboration", "cohesion", "micromanaging"]
      },
      {
        en: "The future of work is likely to be hybrid, combining the flexibility of remote work with the collaboration benefits of in-person interaction. Companies that successfully navigate this transition will be those that invest in technology, trust their employees, and create policies that balance individual preferences with organizational needs.",
        cn: "工作的未来可能是混合模式，将远程工作的灵活性与面对面互动的协作优势结合起来。成功驾驭这一转型的公司将是那些投资技术、信任员工，并制定平衡个人偏好与组织需求的政策的公司。",
        difficultWords: ["hybrid", "navigate", "transition", "preference", "organizational"]
      }
    ],
    question: "What does the article suggest about the future of work?",
    options: ["Everyone will work remotely", "Everyone will return to offices", "A hybrid model combining remote and in-person work", "Remote work will be completely replaced by AI"],
    answer: 2
  },
  {
    id: 3,
    level: "考研",
    source: "The Economist",
    title: "The Ethics of Artificial Intelligence",
    summary: "探讨人工智能发展带来的伦理挑战",
    paragraphs: [
      {
        en: "Artificial intelligence is no longer a futuristic concept—it is already deeply embedded in our daily lives, from the algorithms that recommend what we watch and buy to the systems that determine whether we qualify for a loan or a job interview. As AI becomes more powerful, the ethical questions surrounding its use become increasingly urgent.",
        cn: "人工智能不再是一个未来主义的概念——它已经深深嵌入我们的日常生活中，从推荐我们观看和购买内容的算法，到决定我们是否有资格获得贷款或工作面试的系统。随着人工智能变得更加强大，围绕其使用的伦理问题变得越来越紧迫。",
        difficultWords: ["futuristic", "embedded", "algorithm", "qualify", "urgent"]
      },
      {
        en: "One of the most pressing concerns is algorithmic bias. AI systems learn from historical data, which often reflects existing societal prejudices. If not carefully designed and monitored, these systems can perpetuate and even amplify discrimination based on race, gender, age, or socioeconomic status. Several high-profile cases have demonstrated how biased algorithms can lead to unfair outcomes in criminal justice, hiring, and lending.",
        cn: "最紧迫的问题之一是算法偏见。人工智能系统从历史数据中学习，这些数据往往反映了现有的社会偏见。如果不仔细设计和监控，这些系统可能延续甚至放大基于种族、性别、年龄或社会经济地位的歧视。几个备受关注的案例表明，有偏见的算法如何在刑事司法、招聘和贷款中导致不公平的结果。",
        difficultWords: ["algorithmic", "prejudice", "perpetuate", "amplify", "socioeconomic"]
      },
      {
        en: "The question of accountability is equally complex. When an autonomous vehicle causes an accident, or when an AI-powered medical system makes an incorrect diagnosis, who is responsible? The developer, the company that deployed the system, or the AI itself? Current legal frameworks are not equipped to handle these questions, and new regulations are urgently needed.",
        cn: "责任问题同样复杂。当自动驾驶汽车造成事故，或者当人工智能驱动的医疗系统做出错误诊断时，谁应该负责？是开发者、部署系统的公司，还是人工智能本身？目前的法律框架无法处理这些问题，迫切需要新的法规。",
        difficultWords: ["accountability", "autonomous", "diagnosis", "framework", "regulation"]
      },
      {
        en: "Despite these challenges, AI also offers tremendous potential for good. It can help doctors detect diseases earlier, enable more efficient use of energy, and provide personalized education to millions of students. The key is to develop AI responsibly, with robust ethical guidelines, transparent decision-making processes, and meaningful human oversight.",
        cn: "尽管存在这些挑战，人工智能也提供了巨大的造福潜力。它可以帮助医生更早发现疾病，实现更高效的能源利用，并为数百万学生提供个性化教育。关键是要负责任地开发人工智能，建立健全的伦理准则、透明的决策过程和有意义的人类监督。",
        difficultWords: ["tremendous", "robust", "transparent", "oversight", "responsible"]
      }
    ],
    question: "According to the article, what is one of the most pressing concerns about AI?",
    options: ["AI will replace all human jobs", "Algorithmic bias can perpetuate discrimination", "AI systems are too expensive to develop", "AI cannot be controlled by humans"],
    answer: 1
  },
  {
    id: 4,
    level: "四级",
    source: "National Geographic",
    title: "The Secret Life of Trees",
    summary: "揭示树木之间令人惊叹的交流和互助网络",
    paragraphs: [
      {
        en: "Trees are far more social than we ever imagined. Through an underground network of fungi known as the 'Wood Wide Web,' trees share nutrients, water, and even chemical warning signals with their neighbors. This remarkable discovery has fundamentally changed how scientists understand forest ecosystems.",
        cn: "树木远比我们想象的更具社交性。通过被称为'树木互联网'的地下真菌网络，树木与邻居共享养分、水分，甚至化学警告信号。这一令人惊叹的发现从根本上改变了科学家对森林生态系统的理解。",
        difficultWords: ["fungi", "nutrient", "remarkable", "ecosystem", "underground"]
      },
      {
        en: "Mother trees, the largest and oldest trees in a forest, play a crucial role in this network. They can recognize their own offspring and send them extra nutrients through the fungal connections. When a mother tree is dying, it dumps its resources into the network, distributing them to the next generation of trees.",
        cn: "母树——森林中最大最老的树木——在这个网络中扮演着关键角色。它们能识别自己的后代，并通过真菌连接向它们发送额外的养分。当一棵母树即将死亡时，它会将资源倾倒到网络中，分配给下一代树木。",
        difficultWords: ["offspring", "fungal", "connection", "distribute", "generation"]
      },
      {
        en: "Trees also use this network to warn each other about threats. When a tree is attacked by insects, it releases chemical signals through the fungal network that alert nearby trees to prepare their defenses. Some trees even release chemicals that attract the natural predators of the attacking insects.",
        cn: "树木还利用这个网络相互警告威胁。当一棵树被昆虫攻击时，它通过真菌网络释放化学信号，警告附近的树木准备防御。有些树甚至释放能吸引攻击昆虫天敌的化学物质。",
        difficultWords: ["release", "chemical", "alert", "defense", "predator"]
      },
      {
        en: "Understanding these connections has important implications for forestry and conservation. Clear-cutting forests doesn't just remove trees—it destroys the underground network that supports the entire ecosystem. Sustainable forestry practices that preserve mother trees and maintain the fungal network are essential for the long-term health of our forests.",
        cn: "理解这些连接对林业和保护具有重要意义。砍伐森林不仅仅是移除树木——它破坏了支撑整个生态系统的地下网络。保护母树并维护真菌网络的可持续林业实践对森林的长期健康至关重要。",
        difficultWords: ["implication", "conservation", "sustainable", "preserve", "essential"]
      }
    ],
    question: "What is the 'Wood Wide Web'?",
    options: ["A type of tree species", "An underground fungal network connecting trees", "A satellite system for monitoring forests", "A computer program for studying trees"],
    answer: 1
  },
  {
    id: 5,
    level: "六级",
    source: "TIME",
    title: "The Science of Sleep: Why We Can't Afford to Skip It",
    summary: "揭示睡眠对健康的深远影响以及现代人的睡眠危机",
    paragraphs: [
      {
        en: "Sleep is not a luxury—it is a biological necessity as fundamental as food and water. Yet in our fast-paced, always-connected world, sleep deprivation has become an epidemic. The Centers for Disease Control and Prevention reports that one in three American adults doesn't get enough sleep, a trend that has serious consequences for public health.",
        cn: "睡眠不是奢侈品——它是与食物和水一样基本的生物需求。然而在我们这个快节奏、永远在线的世界里，睡眠不足已成为一种流行病。美国疾病控制与预防中心报告称，三分之一的美国成年人睡眠不足，这一趋势对公共健康有严重后果。",
        difficultWords: ["luxury", "biological", "necessity", "deprivation", "epidemic"]
      },
      {
        en: "During sleep, the brain performs critical maintenance tasks. It consolidates memories, clearing out irrelevant information and strengthening important neural connections. The glymphatic system, discovered only recently, flushes out toxic waste products that accumulate during waking hours. Without adequate sleep, these toxins can build up and contribute to neurodegenerative diseases like Alzheimer's.",
        cn: "在睡眠期间，大脑执行关键的维护任务。它巩固记忆，清除无关信息并加强重要的神经连接。最近才发现的glymphatic系统冲洗掉在清醒时积累的有毒废物。没有充足的睡眠，这些毒素会积聚并导致阿尔茨海默症等神经退行性疾病。",
        difficultWords: ["consolidate", "irrelevant", "neural", "toxic", "neurodegenerative"]
      },
      {
        en: "The effects of sleep deprivation extend far beyond feeling tired. Chronic lack of sleep is linked to obesity, diabetes, heart disease, depression, and weakened immune function. It impairs cognitive performance, reducing attention, decision-making ability, and creativity. Studies show that being awake for 24 hours impairs cognitive function as much as being legally drunk.",
        cn: "睡眠不足的影响远不止感到疲倦。长期缺乏睡眠与肥胖、糖尿病、心脏病、抑郁症和免疫功能减弱有关。它损害认知表现，降低注意力、决策能力和创造力。研究表明，清醒24小时对认知功能的损害相当于法定醉酒程度。",
        difficultWords: ["chronic", "obesity", "impair", "cognitive", "creativity"]
      },
      {
        en: "The solution is not complicated, but it requires commitment. Sleep experts recommend maintaining a consistent sleep schedule, creating a dark and cool sleeping environment, avoiding screens before bedtime, and limiting caffeine and alcohol. Perhaps most importantly, we need to change our cultural attitude toward sleep and recognize that getting enough rest is not laziness—it's essential for peak performance and long-term health.",
        cn: "解决方案并不复杂，但需要承诺。睡眠专家建议保持一致的睡眠时间表，创造黑暗凉爽的睡眠环境，睡前避免使用屏幕，限制咖啡因和酒精。也许最重要的是，我们需要改变对睡眠的文化态度，认识到充足的休息不是懒惰——它是巅峰表现和长期健康所必需的。",
        difficultWords: ["consistent", "commitment", "caffeine", "attitude", "peak"]
      }
    ],
    question: "What does the glymphatic system do during sleep?",
    options: ["It produces dreams", "It flushes out toxic waste products from the brain", "It increases heart rate", "It strengthens muscles"],
    answer: 1
  },
  {
    id: 6,
    level: "四级",
    source: "The Guardian",
    title: "Why Walking Is the Best Exercise",
    summary: "揭示步行作为最佳运动形式的科学证据",
    paragraphs: [
      {
        en: "In a world obsessed with high-intensity workouts and expensive gym memberships, walking remains one of the most effective and accessible forms of exercise. It requires no special equipment, no training, and no gym membership. All you need is a pair of comfortable shoes and the motivation to step outside.",
        cn: "在一个痴迷于高强度锻炼和昂贵健身房会员的世界里，步行仍然是最有效和最容易获得的运动形式之一。它不需要特殊设备、不需要训练、也不需要健身房会员。你需要的只是一双舒适的鞋子和走出去的动力。",
        difficultWords: ["obsessed", "intensity", "accessible", "equipment", "motivation"]
      },
      {
        en: "The health benefits of walking are extensive. Regular walking reduces the risk of heart disease, stroke, type 2 diabetes, and several types of cancer. It strengthens bones and muscles, improves balance and coordination, and boosts immune function. A study published in the British Journal of Sports Medicine found that walking at a brisk pace can reduce the risk of death from any cause by up to 24 percent.",
        cn: "步行的健康益处是广泛的。定期步行降低患心脏病、中风、2型糖尿病和几种癌症的风险。它增强骨骼和肌肉，改善平衡和协调，并增强免疫功能。发表在《英国运动医学杂志》上的一项研究发现，快步行走可以将任何原因导致的死亡风险降低高达24%。",
        difficultWords: ["extensive", "stroke", "coordination", "boost", "brisk"]
      },
      {
        en: "Walking also has profound mental health benefits. It reduces symptoms of depression and anxiety, improves mood, and enhances cognitive function. Walking in nature, sometimes called 'forest bathing,' has been shown to lower cortisol levels and blood pressure while increasing feelings of well-being and creativity.",
        cn: "步行对心理健康也有深远的益处。它减少抑郁和焦虑的症状，改善情绪，并增强认知功能。在大自然中步行——有时被称为'森林浴'——已被证明能降低皮质醇水平和血压，同时增加幸福感和创造力。",
        difficultWords: ["profound", "symptom", "cortisol", "enhance", "well-being"]
      },
      {
        en: "The social benefits of walking should not be underestimated. Walking with friends or family provides opportunities for meaningful conversation and strengthens relationships. Community walking groups combat loneliness and create a sense of belonging. In an age of digital isolation, walking together is a simple but powerful way to reconnect with others and with the world around us.",
        cn: "步行的社交益处不应被低估。与朋友或家人一起散步提供了有意义对话的机会，并加强了人际关系。社区步行团体对抗孤独感并创造归属感。在数字隔离的时代，一起散步是与他人和我们周围世界重新连接的简单而有力的方式。",
        difficultWords: ["underestimate", "combat", "loneliness", "belonging", "reconnect"]
      }
    ],
    question: "According to the article, what can brisk walking reduce?",
    options: ["Only heart disease risk", "The risk of death from any cause by up to 24%", "Only mental health issues", "Only bone problems"],
    answer: 1
  },
  {
    id: 7,
    level: "考研",
    source: "Nature",
    title: "The Promise and Peril of Gene Editing",
    summary: "探讨CRISPR基因编辑技术的潜力与伦理挑战",
    paragraphs: [
      {
        en: "CRISPR-Cas9, the revolutionary gene editing tool, has transformed biological research in ways that were unimaginable just a decade ago. By allowing scientists to precisely modify DNA sequences, CRISPR has opened up new possibilities for treating genetic diseases, creating disease-resistant crops, and even eliminating mosquito-borne illnesses like malaria.",
        cn: "CRISPR-Cas9，这一革命性的基因编辑工具，以十年前无法想象的方式改变了生物研究。通过允许科学家精确修改DNA序列，CRISPR为治疗遗传疾病、创造抗病作物，甚至消除疟疾等蚊媒疾病开辟了新的可能性。",
        difficultWords: ["revolutionary", "precisely", "modify", "eliminate", "mosquito-borne"]
      },
      {
        en: "In medicine, CRISPR is already showing remarkable promise. Clinical trials are underway for treatments targeting sickle cell disease, beta-thalassemia, and certain forms of cancer. The first CRISPR-based therapy, Casgevy, was approved by the FDA in 2023 for the treatment of sickle cell disease, marking a historic milestone in genetic medicine.",
        cn: "在医学领域，CRISPR已经展现出非凡的前景。针对镰状细胞病、β-地中海贫血和某些癌症的临床试验正在进行中。首个基于CRISPR的疗法Casgevy于2023年获得FDA批准用于治疗镰状细胞病，标志着基因医学的历史性里程碑。",
        difficultWords: ["clinical trial", "therapy", "approve", "milestone", "sickle cell"]
      },
      {
        en: "However, the power of gene editing also raises profound ethical concerns. The case of He Jiankui, who in 2018 created the world's first gene-edited babies, shocked the scientific community and highlighted the dangers of unregulated experimentation. The ability to modify the human germline—changes that would be passed to future generations—raises questions about consent, equity, and the very definition of what it means to be human.",
        cn: "然而，基因编辑的力量也引发了深刻的伦理关切。贺建奎在2018年创造了世界首例基因编辑婴儿的案例震惊了科学界，并凸显了不受监管的实验的危险性。修改人类生殖系的能力——这些改变将传递给后代——引发了关于同意、公平以及人之为人意味着什么的根本问题。",
        difficultWords: ["profound", "highlight", "unregulated", "germline", "consent"]
      },
      {
        en: "The challenge for society is to harness the enormous potential of gene editing while preventing its misuse. This requires robust international regulations, transparent public dialogue, and ethical frameworks that can keep pace with the technology's rapid advancement. The decisions we make today about gene editing will shape the future of medicine, agriculture, and perhaps humanity itself.",
        cn: "社会面临的挑战是利用基因编辑的巨大潜力，同时防止其被滥用。这需要健全的国际法规、透明的公众对话，以及能够跟上技术快速发展的伦理框架。我们今天关于基因编辑的决定将塑造医学、农业乃至人类本身的未来。",
        difficultWords: ["harness", "misuse", "transparent", "framework", "advancement"]
      }
    ],
    question: "What was the historic milestone mentioned in the article?",
    options: ["The discovery of CRISPR", "The first gene-edited baby", "FDA approval of the first CRISPR-based therapy", "The elimination of malaria"],
    answer: 2
  },
  {
    id: 8,
    level: "六级",
    source: "Harvard Business Review",
    title: "The Future of Leadership in the Age of AI",
    summary: "探讨人工智能时代领导力的新要求",
    paragraphs: [
      {
        en: "The rise of artificial intelligence is not just transforming industries—it is fundamentally reshaping what it means to be a leader. As AI takes over routine analytical tasks, the uniquely human qualities of leadership—empathy, creativity, ethical judgment, and the ability to inspire others—become more valuable than ever.",
        cn: "人工智能的兴起不仅在改变行业——它从根本上重新定义了领导者的含义。随着人工智能接管常规分析任务，领导力中独特的人类品质——同理心、创造力、道德判断力和激励他人的能力——变得比以往任何时候都更有价值。",
        difficultWords: ["fundamentally", "reshape", "empathy", "ethical", "inspire"]
      },
      {
        en: "The most effective leaders of the future will be those who can successfully collaborate with AI systems while maintaining the human touch that builds trust and loyalty. This requires a new set of skills: the ability to ask the right questions of AI tools, the judgment to know when to rely on algorithms and when to trust human intuition, and the communication skills to explain AI-driven decisions to stakeholders.",
        cn: "未来最有效的领导者将是那些能够成功与人工智能系统合作，同时保持建立信任和忠诚度的人情味的人。这需要一套新技能：向人工智能工具提出正确问题的能力，判断何时依赖算法、何时信任人类直觉的能力，以及向利益相关者解释人工智能驱动决策的沟通技能。",
        difficultWords: ["collaborate", "intuition", "stakeholder", "algorithm", "loyalty"]
      },
      {
        en: "AI also creates new ethical challenges for leaders. Questions about data privacy, algorithmic bias, job displacement, and the responsible use of AI require leaders who can navigate complex moral landscapes. The leaders who earn the most trust will be those who are transparent about how they use AI and who take responsibility for its impacts.",
        cn: "人工智能也为领导者创造了新的伦理挑战。关于数据隐私、算法偏见、工作流失和负责任使用人工智能的问题，需要能够驾驭复杂道德景观的领导者。赢得最多信任的领导者将是那些对如何使用人工智能保持透明，并对其影响承担责任的人。",
        difficultWords: ["displacement", "navigate", "transparent", "responsible", "landscape"]
      },
      {
        en: "Perhaps the most important leadership skill in the age of AI is adaptability. The pace of technological change means that leaders must be lifelong learners, constantly updating their knowledge and skills. They must be comfortable with uncertainty, willing to experiment, and able to lead their organizations through continuous transformation. The leaders who thrive will be those who see AI not as a threat, but as a partner in creating a better future.",
        cn: "在人工智能时代，也许最重要的领导力技能是适应能力。技术变革的步伐意味着领导者必须是终身学习者，不断更新他们的知识和技能。他们必须适应不确定性，愿意尝试，并能够带领他们的组织经历持续的变革。蓬勃发展的领导者将是那些将人工智能视为创造更美好未来的伙伴而非威胁的人。",
        difficultWords: ["adaptability", "lifelong", "uncertainty", "transformation", "thrive"]
      }
    ],
    question: "According to the article, what becomes more valuable as AI takes over routine tasks?",
    options: ["Technical programming skills", "Uniquely human qualities like empathy and creativity", "The ability to work longer hours", "Knowledge of AI algorithms"],
    answer: 1
  },
  {
    id: 9,
    level: "四级",
    source: "BBC",
    title: "The Benefits of Bilingualism",
    summary: "揭示掌握两种语言对大脑和生活的多重好处",
    paragraphs: [
      {
        en: "Speaking more than one language is far more than a practical skill—it fundamentally changes the way your brain works. Bilingual individuals show enhanced cognitive abilities, better problem-solving skills, and greater mental flexibility compared to monolingual speakers. These benefits extend throughout life, from childhood to old age.",
        cn: "说一种以上的语言远不止是一项实用技能——它从根本上改变了你的大脑运作方式。与只会一种语言的人相比，双语者表现出增强的认知能力、更好的问题解决技能和更大的心理灵活性。这些益处贯穿一生，从童年到老年。",
        difficultWords: ["bilingual", "cognitive", "flexibility", "monolingual", "enhanced"]
      },
      {
        en: "Research has shown that bilingual brains develop more dense gray matter, the tissue responsible for processing information. This increased density is particularly pronounced in areas associated with language, attention, and memory. Bilingual children consistently outperform their monolingual peers on tests that require switching between tasks or filtering out distracting information.",
        cn: "研究表明，双语大脑会发展出更密集的灰质——负责处理信息的组织。这种密度的增加在与语言、注意力和记忆相关的区域尤为明显。在需要在任务之间切换或过滤干扰信息的测试中，双语儿童始终优于只说一种语言的同龄人。",
        difficultWords: ["dense", "tissue", "pronounced", "filter", "distracting"]
      },
      {
        en: "Perhaps most remarkably, bilingualism appears to delay the onset of dementia and Alzheimer's disease by an average of four to five years. Scientists believe that the constant mental exercise of managing two languages builds a 'cognitive reserve' that helps the brain resist the effects of aging and neurodegeneration.",
        cn: "也许最引人注目的是，双语能力似乎能将痴呆症和阿尔茨海默症的发病平均延迟四到五年。科学家认为，管理两种语言的持续脑力锻炼建立了一种'认知储备'，帮助大脑抵抗衰老和神经退化的影响。",
        difficultWords: ["dementia", "onset", "reserve", "resist", "neurodegeneration"]
      },
      {
        en: "The social and cultural benefits of bilingualism are equally significant. Bilingual individuals have access to a wider range of cultural experiences, can communicate with more people, and often show greater empathy and understanding of different perspectives. In an increasingly interconnected world, bilingualism is not just an advantage—it is becoming a necessity.",
        cn: "双语能力的社会和文化益处同样重要。双语者可以接触到更广泛的文化体验，能够与更多人交流，并且往往表现出更大的同理心和对不同观点的理解。在一个日益互联的世界中，双语不仅仅是一种优势——它正在成为一种必需品。",
        difficultWords: ["interconnected", "empathy", "perspective", "advantage", "necessity"]
      }
    ],
    question: "How much can bilingualism delay the onset of dementia?",
    options: ["1-2 years", "2-3 years", "4-5 years", "7-8 years"],
    answer: 2
  },
  {
    id: 10,
    level: "考研",
    source: "The Economist",
    title: "The Global Water Crisis: A Threat to Stability",
    summary: "分析全球水资源危机的严重性及其对地缘政治的影响",
    paragraphs: [
      {
        en: "Water scarcity is no longer a problem confined to arid regions—it is a global crisis that affects every continent and threatens the stability of nations. According to the United Nations, by 2025, two-thirds of the world's population could be living in water-stressed conditions. This looming crisis has the potential to trigger conflicts, mass migration, and economic devastation.",
        cn: "水资源短缺不再是干旱地区特有的问题——它是一场影响每个大洲、威胁国家稳定的全球性危机。根据联合国的数据，到2025年，世界三分之二的人口可能生活在水资源紧张的条件下。这场迫在眉睫的危机有可能引发冲突、大规模移民和经济破坏。",
        difficultWords: ["scarcity", "arid", "looming", "trigger", "devastation"]
      },
      {
        en: "The causes of the water crisis are complex and interconnected. Climate change is altering precipitation patterns, causing droughts in some regions and floods in others. Population growth and urbanization are increasing demand, while pollution and over-extraction are depleting existing sources. Agriculture, which accounts for approximately 70 percent of global freshwater use, is particularly vulnerable to water shortages.",
        cn: "水资源危机的原因是复杂且相互关联的。气候变化正在改变降水模式，在一些地区造成干旱，在另一些地区造成洪水。人口增长和城市化增加了需求，而污染和过度开采正在耗尽现有水源。农业约占全球淡水使用量的70%，特别容易受到水资源短缺的影响。",
        difficultWords: ["precipitation", "drought", "urbanization", "deplete", "vulnerable"]
      },
      {
        en: "The geopolitical implications of water scarcity are already becoming apparent. The Nile River, which flows through eleven countries, has been a source of tension between Egypt, Sudan, and Ethiopia over the construction of the Grand Ethiopian Renaissance Dam. Similar disputes over shared water resources are occurring in Central Asia, South Asia, and the Middle East, regions where water scarcity intersects with political instability.",
        cn: "水资源短缺的地缘政治影响已经变得明显。流经十一个国家的尼罗河一直是埃及、苏丹和埃塞俄比亚之间关于大埃塞俄比亚复兴大坝建设的紧张根源。关于共享水资源的类似争端正在中亚、南亚和中东发生，这些地区的水资源短缺与政治不稳定交织在一起。",
        difficultWords: ["geopolitical", "tension", "construction", "dispute", "instability"]
      },
      {
        en: "Addressing the global water crisis requires a multifaceted approach. Investment in water infrastructure, including desalination plants and efficient irrigation systems, is essential. Governments must implement better water management policies, including pricing that reflects the true value of water and regulations that prevent pollution. International cooperation on shared water resources is critical to preventing conflicts. Perhaps most importantly, we must recognize that water is not an infinite resource and treat it accordingly.",
        cn: "解决全球水资源危机需要多方面的方法。对水利基础设施的投资，包括海水淡化厂和高效灌溉系统，是必不可少的。各国政府必须实施更好的水资源管理政策，包括反映水的真实价值的定价和防止污染的法规。在共享水资源方面的国际合作对于防止冲突至关重要。也许最重要的是，我们必须认识到水不是无限的资源，并相应地对待它。",
        difficultWords: ["multifaceted", "desalination", "irrigation", "infrastructure", "infinite"]
      }
    ],
    question: "What percentage of global freshwater is used by agriculture?",
    options: ["About 50%", "About 60%", "About 70%", "About 80%"],
    answer: 2
  },
  {
    id: 11,
    level: "雅思",
    source: "The Guardian",
    title: "The Urbanization Challenge: Cities of the Future",
    summary: "探讨快速城市化带来的挑战以及未来城市的可持续发展方案",
    paragraphs: [
      {
        en: "More than half of the world's population now lives in urban areas, and by 2050, that figure is projected to reach 68 percent. This unprecedented urbanization presents both enormous opportunities and formidable challenges. Cities are engines of economic growth, innovation, and cultural exchange, but they are also sources of pollution, inequality, and social fragmentation.",
        cn: "现在世界上超过一半的人口居住在城市地区，到2025年，这一数字预计将达到68%。这种前所未有的城市化既带来了巨大的机遇，也带来了艰巨的挑战。城市是经济增长、创新和文化交流的引擎，但也是污染、不平等和社会分裂的源头。",
        difficultWords: ["projected", "unprecedented", "formidable", "fragmentation", "engine"]
      },
      {
        en: "One of the most critical challenges is housing affordability. In many major cities, housing costs have risen far faster than wages, forcing lower-income residents to the urban periphery where they face longer commutes and fewer services. This spatial inequality reinforces economic disparities and can lead to the formation of segregated communities with vastly different quality of life.",
        cn: "最关键的挑战之一是住房负担能力。在许多主要城市，住房成本的上涨速度远超工资增长，迫使低收入居民迁移到城市外围，在那里他们面临更长的通勤时间和更少的服务。这种空间不平等加剧了经济差距，并可能导致形成生活质量截然不同的隔离社区。",
        difficultWords: ["affordability", "periphery", "spatial", "disparity", "segregated"]
      },
      {
        en: "Transportation is another major challenge. As cities grow, traffic congestion worsens, air quality deteriorates, and public transport systems struggle to keep pace. Many cities are now investing in sustainable transport solutions, including electric bus fleets, cycling infrastructure, and pedestrian-friendly urban design. Singapore's congestion pricing system and Copenhagen's extensive cycling network offer valuable models for other cities.",
        cn: "交通是另一个主要挑战。随着城市扩张，交通拥堵加剧，空气质量恶化，公共交通系统难以跟上步伐。许多城市正在投资可持续交通解决方案，包括电动公交车队、自行车基础设施和步行友好的城市设计。新加坡的拥堵收费系统和哥本哈根广泛的自行车网络为其他城市提供了有价值的范例。",
        difficultWords: ["congestion", "deteriorate", "pedestrian", "infrastructure", "fleet"]
      },
      {
        en: "The concept of the 'smart city' offers promising solutions. By leveraging data analytics, the Internet of Things, and artificial intelligence, cities can optimize everything from energy use and waste management to emergency response and public safety. However, smart city initiatives must be implemented with careful attention to privacy, data security, and digital inclusion to ensure that the benefits of technology are shared equitably across all segments of the population.",
        cn: "'智慧城市'的概念提供了有前景的解决方案。通过利用数据分析、物联网和人工智能，城市可以优化从能源使用和废物管理到应急响应和公共安全的一切。然而，智慧城市倡议的实施必须仔细关注隐私、数据安全和数字包容，以确保技术的好处在所有人群群体中公平分享。",
        difficultWords: ["leveraging", "inclusion", "equitably", "segment", "initiative"]
      }
    ],
    question: "According to the article, what percentage of the world's population is projected to live in urban areas by 2050?",
    options: ["50 percent", "58 percent", "68 percent", "78 percent"],
    answer: 2
  },
  {
    id: 12,
    level: "雅思",
    source: "BBC",
    title: "The Power of Cultural Exchange in a Globalized World",
    summary: "分析文化交流在全球化时代的重要性及其对个人和社会的深远影响",
    paragraphs: [
      {
        en: "In an increasingly interconnected world, cultural exchange has become more important than ever. Whether through international travel, educational programs, or digital communication, exposure to different cultures broadens our perspectives, challenges our assumptions, and fosters mutual understanding. Research consistently shows that individuals who engage with diverse cultures develop greater empathy, creativity, and adaptability.",
        cn: "在一个日益互联的世界中，文化交流变得比以往任何时候都更加重要。无论是通过国际旅行、教育项目还是数字通信，接触不同文化拓宽了我们的视野，挑战了我们的假设，并促进了相互理解。研究一致表明，接触多元文化的个人会发展出更大的同理心、创造力和适应能力。",
        difficultWords: ["interconnected", "exposure", "foster", "mutual", "adaptability"]
      },
      {
        en: "Student exchange programs are among the most effective forms of cultural exchange. Young people who study abroad not only gain academic knowledge but also develop invaluable life skills. They learn to navigate unfamiliar environments, communicate across language barriers, and build relationships with people from different backgrounds. These experiences often shape their worldview and career choices in profound ways.",
        cn: "学生交流项目是最有效的文化交流形式之一。出国留学的年轻人不仅获得了学术知识，还培养了宝贵的生活技能。他们学会在陌生环境中导航，跨越语言障碍沟通，并与来自不同背景的人建立关系。这些经历常常以深刻的方式塑造他们的世界观和职业选择。",
        difficultWords: ["navigate", "barrier", "profound", "worldview", "invaluable"]
      },
      {
        en: "Cultural exchange also has significant economic benefits. Countries that embrace cultural diversity tend to be more innovative and competitive in the global marketplace. The creative industries—art, music, film, fashion, and cuisine—thrive on cross-cultural inspiration. Cities like London, New York, and Tokyo owe much of their economic dynamism to the diverse communities that contribute to their cultural vibrancy.",
        cn: "文化交流也具有显著的经济效益。拥抱文化多样性的国家往往在全球市场中更具创新力和竞争力。创意产业——艺术、音乐、电影、时尚和美食——在跨文化灵感的滋养下蓬勃发展。伦敦、纽约和东京等城市的经济活力在很大程度上归功于为其文化繁荣做出贡献的多元社区。",
        difficultWords: ["diversity", "competitive", "dynamism", "vibrancy", "cuisine"]
      },
      {
        en: "However, cultural exchange must be approached with sensitivity and respect. The goal is not to create a homogeneous global culture but to celebrate diversity while finding common ground. True cultural exchange is a two-way process that involves listening as much as speaking, learning as much as teaching. When done well, it enriches both the individual and society, creating a more tolerant, creative, and peaceful world.",
        cn: "然而，文化交流必须以敏感和尊重的方式进行。目标不是创造同质的全球文化，而是在寻找共同点的同时庆祝多样性。真正的文化交流是一个双向过程，既涉及倾听也涉及表达，既涉及学习也涉及教导。当做得好时，它丰富了个人和社会，创造了一个更宽容、更有创造力、更和平的世界。",
        difficultWords: ["sensitivity", "homogeneous", "tolerant", "enrich", "celebrate"]
      }
    ],
    question: "What does the article say about the goal of cultural exchange?",
    options: ["To create a single global culture", "To celebrate diversity while finding common ground", "To replace local traditions with Western culture", "To promote economic competition between nations"],
    answer: 1
  },
  {
    id: 13,
    level: "托福",
    source: "Scientific American",
    title: "The Microbiome Revolution: How Bacteria Shape Our Health",
    summary: "揭示人体微生物组对健康的关键作用及其在医学中的应用前景",
    paragraphs: [
      {
        en: "The human body is home to trillions of microorganisms—bacteria, viruses, fungi, and other microscopic creatures—that collectively make up the microbiome. These tiny organisms, which outnumber our own cells, play a crucial role in virtually every aspect of our health, from digestion and immunity to mood and cognitive function. The study of the microbiome has emerged as one of the most exciting frontiers in modern medicine.",
        cn: "人体是数万亿微生物——细菌、病毒、真菌和其他微观生物——的家园，它们共同构成了微生物组。这些微小的生物体数量超过我们自身的细胞，在几乎每一个健康方面都扮演着关键角色，从消化和免疫到情绪和认知功能。微生物组的研究已成为现代医学最令人兴奋的前沿领域之一。",
        difficultWords: ["microorganism", "microbiome", "outnumber", "immunity", "frontier"]
      },
      {
        en: "Research has revealed that the gut microbiome, in particular, has a profound influence on our health. The trillions of bacteria living in our intestines help break down food, produce essential vitamins, and train our immune system. An imbalanced gut microbiome has been linked to a wide range of conditions, including obesity, diabetes, autoimmune disorders, depression, and even autism.",
        cn: "研究揭示，肠道微生物组尤其对我们的健康有着深远的影响。生活在我们肠道中的数万亿细菌帮助分解食物、产生必需的维生素并训练我们的免疫系统。肠道微生物组失衡与一系列疾病有关，包括肥胖、糖尿病、自身免疫性疾病、抑郁症，甚至自闭症。",
        difficultWords: ["intestine", "vitamin", "autoimmune", "imbalanced", "disorder"]
      },
      {
        en: "The implications for medicine are enormous. Scientists are now exploring the possibility of treating diseases by manipulating the microbiome—a approach known as microbiome therapy. Fecal microbiota transplantation, which involves transferring gut bacteria from a healthy donor to a patient, has already proven remarkably effective against recurrent Clostridioides difficile infections and is being investigated for other conditions.",
        cn: "这对医学的意义是巨大的。科学家们正在探索通过操控微生物组来治疗疾病的可能性——这种方法被称为微生物组疗法。粪便微生物群移植——将健康捐赠者的肠道细菌转移到患者体内——已被证明对反复发作的艰难梭菌感染非常有效，并正在被研究用于其他疾病。",
        difficultWords: ["manipulating", "transplantation", "donor", "recurrent", "investigated"]
      },
      {
        en: "Perhaps most intriguingly, research has uncovered a connection between the gut microbiome and the brain—a communication pathway known as the gut-brain axis. The bacteria in our intestines produce neurotransmitters like serotonin and dopamine that influence our mood, behavior, and cognitive function. This discovery has opened up entirely new approaches to treating mental health conditions and has led some scientists to refer to the gut as our 'second brain.'",
        cn: "也许最引人入胜的是，研究发现了肠道微生物组与大脑之间的联系——一条被称为肠-脑轴的沟通通路。我们肠道中的细菌产生像血清素和多巴胺这样的神经递质，影响我们的情绪、行为和认知功能。这一发现为治疗心理健康状况开辟了全新的方法，一些科学家甚至将肠道称为我们的'第二大脑'。",
        difficultWords: ["intriguingly", "neurotransmitter", "serotonin", "dopamine", "axis"]
      }
    ],
    question: "What is the 'gut-brain axis'?",
    options: ["A type of bacteria in the stomach", "A communication pathway between the gut microbiome and the brain", "A surgical procedure for treating brain diseases", "A new diet plan for improving mental health"],
    answer: 1
  },
  {
    id: 14,
    level: "四级",
    source: "BBC Learning English",
    title: "The Art of Effective Communication",
    summary: "探讨有效沟通的技巧及其在个人和职业生活中的重要性",
    paragraphs: [
      {
        en: "Communication is one of the most fundamental human skills, yet many people struggle to express themselves clearly and listen effectively. Good communication is not just about speaking well—it involves understanding your audience, choosing the right words, and being attentive to nonverbal cues such as body language, facial expressions, and tone of voice.",
        cn: "沟通是人类最基本的技能之一，但许多人难以清晰地表达自己和有效地倾听。良好的沟通不仅仅是说得好——它涉及了解你的受众、选择合适的词汇，并注意非语言线索，如肢体语言、面部表情和语调。",
        difficultWords: ["fundamental", "audience", "attentive", "nonverbal", "cue"]
      },
      {
        en: "Active listening is a critical component of effective communication. It requires giving your full attention to the speaker, avoiding interruptions, and responding thoughtfully. Research shows that people who practice active listening are perceived as more trustworthy, empathetic, and competent. Simple techniques like maintaining eye contact, nodding, and paraphrasing what the speaker has said can dramatically improve the quality of any conversation.",
        cn: "积极倾听是有效沟通的关键组成部分。它要求你全神贯注于说话者，避免打断，并深思熟虑地回应。研究表明，实践积极倾听的人被认为更值得信赖、更有同理心、更有能力。简单的技巧，如保持眼神接触、点头和复述说话者所说的内容，可以显著提高任何对话的质量。",
        difficultWords: ["component", "interruption", "trustworthy", "paraphrase", "perceive"]
      },
      {
        en: "In the digital age, written communication has become increasingly important. Emails, text messages, and social media posts require a different set of skills than face-to-face conversations. The absence of nonverbal cues means that written messages are more likely to be misunderstood. To communicate effectively in writing, it is important to be clear, concise, and considerate of the reader's perspective.",
        cn: "在数字时代，书面沟通变得越来越重要。电子邮件、短信和社交媒体帖子需要与面对面交流不同的技能。非语言线索的缺失意味着书面信息更容易被误解。为了在书面沟通中有效表达，重要的是要清晰、简洁，并考虑到读者的视角。",
        difficultWords: ["concise", "considerate", "perspective", "absence", "misunderstand"]
      },
      {
        en: "Cross-cultural communication presents additional challenges. Different cultures have different norms for directness, formality, and personal space. What is considered polite in one culture may be perceived as rude in another. Developing cultural awareness and adapting your communication style accordingly is essential for success in our increasingly globalized world.",
        cn: "跨文化沟通带来了额外的挑战。不同的文化对直接性、正式程度和个人空间有不同的规范。在一个文化中被视为礼貌的行为，在另一个文化中可能被视为粗鲁。培养文化意识并相应地调整你的沟通风格，在我们日益全球化的世界中对成功至关重要。",
        difficultWords: ["norm", "formality", "rude", "awareness", "accordingly"]
      }
    ],
    question: "According to the article, what is a key component of effective communication?",
    options: ["Speaking as loudly as possible", "Active listening", "Using complex vocabulary", "Avoiding eye contact"],
    answer: 1
  },
  {
    id: 15,
    level: "六级",
    source: "TIME",
    title: "The Psychology of Decision-Making",
    summary: "揭示人类决策过程中的心理机制及其对日常选择的影响",
    paragraphs: [
      {
        en: "Every day, we make thousands of decisions, from what to eat for breakfast to major life choices about careers and relationships. Yet most of us give little thought to the psychological processes that drive our decision-making. Understanding these processes can help us make better choices and avoid common cognitive pitfalls that lead to poor outcomes.",
        cn: "每天，我们做出数千个决定，从早餐吃什么到关于职业和人际关系的重大人生选择。然而，我们大多数人很少思考驱动我们决策的心理过程。理解这些过程可以帮助我们做出更好的选择，避免导致不良结果的常见认知陷阱。",
        difficultWords: ["psychological", "cognitive", "pitfall", "outcome", "process"]
      },
      {
        en: "Nobel laureate Daniel Kahneman identified two systems of thinking: System 1, which is fast, intuitive, and automatic, and System 2, which is slow, deliberate, and analytical. Most of our daily decisions are made by System 1, which relies on mental shortcuts known as heuristics. While these shortcuts are efficient, they can also lead to systematic errors in judgment, known as cognitive biases.",
        cn: "诺贝尔奖得主丹尼尔·卡尼曼识别出两种思维系统：系统1是快速、直觉和自动的，系统2是缓慢、深思熟虑和分析性的。我们大多数日常决定由系统1做出，它依赖被称为启发法的心理捷径。虽然这些捷径效率很高，但它们也可能导致系统性的判断错误，即认知偏差。",
        difficultWords: ["intuitive", "deliberate", "heuristic", "systematic", "bias"]
      },
      {
        en: "One of the most well-known cognitive biases is the anchoring effect, where people rely too heavily on the first piece of information they encounter when making decisions. For example, the initial price quoted for a product sets an anchor that influences how we perceive subsequent prices, even if the anchor is arbitrary. Other common biases include confirmation bias, where we seek out information that confirms our existing beliefs, and the sunk cost fallacy, where we continue investing in something because of what we have already spent.",
        cn: "最知名的认知偏差之一是锚定效应，人们在做决定时过于依赖他们遇到的第一条信息。例如，产品的初始报价设定了一个锚点，影响我们如何看待后续价格，即使这个锚点是任意的。其他常见的偏差包括确认偏差——我们寻求确认现有信念的信息，以及沉没成本谬误——因为我们已经投入了什么而继续投资。",
        difficultWords: ["anchoring", "arbitrary", "confirmation", "fallacy", "subsequent"]
      },
      {
        en: "The good news is that awareness of these biases is the first step toward overcoming them. By slowing down our thinking, seeking out diverse perspectives, and deliberately challenging our assumptions, we can make more rational and informed decisions. Some organizations are now using 'nudge' techniques—gentle modifications to the choice environment—to help people make better decisions without restricting their freedom of choice.",
        cn: "好消息是，意识到这些偏差是克服它们的第一步。通过放慢思维、寻求不同观点并刻意挑战我们的假设，我们可以做出更理性和明智的决定。一些组织现在正在使用'助推'技术——对选择环境进行温和的修改——帮助人们在不限制选择自由的情况下做出更好的决定。",
        difficultWords: ["overcoming", "rational", "deliberately", "modification", "restrict"]
      }
    ],
    question: "What is the 'anchoring effect' according to the article?",
    options: ["A technique for improving memory", "Relying too heavily on the first piece of information encountered", "A method for solving complex problems", "The tendency to avoid making decisions"],
    answer: 1
  },
  {
    id: 16,
    level: "四级",
    source: "BBC News",
    title: "The Benefits of Learning a Second Language",
    summary: "揭示学习第二语言对大脑和职业发展的多重好处",
    paragraphs: [
      {
        en: "In today's interconnected world, speaking more than one language is increasingly seen as a valuable skill. Research has shown that bilingual individuals often have better problem-solving abilities, improved memory, and greater mental flexibility compared to those who speak only one language.",
        cn: "在当今互联的世界中，会说一种以上的语言越来越被视为一项有价值的技能。研究表明，双语者往往比只会一种语言的人拥有更好的解决问题的能力、更强的记忆力和更大的心理灵活性。",
        difficultWords: ["interconnected", "bilingual", "flexibility", "cognitive"]
      },
      {
        en: "Beyond cognitive benefits, being bilingual can also open up career opportunities. Many employers value candidates who can communicate with clients and partners in different languages. In fields like international business, diplomacy, and tourism, language skills can be a decisive factor in hiring decisions.",
        cn: "除了认知上的好处，双语能力还能开启职业机会。许多雇主重视能够用不同语言与客户和合作伙伴沟通的候选人。在国际商务、外交和旅游等领域，语言技能可能是招聘决策中的决定性因素。",
        difficultWords: ["diplomacy", "decisive", "candidates", "employers"]
      },
      {
        en: "The best time to start learning a second language is during childhood, when the brain is most receptive to new linguistic patterns. However, adults can also achieve fluency with dedication and consistent practice. The key is to immerse yourself in the language as much as possible through reading, listening, and speaking.",
        cn: "学习第二语言的最佳时间是童年，此时大脑对新的语言模式最为敏感。然而，成年人也可以通过专注和持续的练习达到流利。关键是通过阅读、听力和口语尽可能多地沉浸在语言中。",
        difficultWords: ["receptive", "linguistic", "fluency", "immerse"]
      },
      {
        en: "Technology has made language learning more accessible than ever. Apps, online courses, and language exchange platforms allow people to practice with native speakers from around the world. While these tools are helpful, they work best when combined with traditional methods like classroom instruction and conversation practice.",
        cn: "科技使语言学习比以往任何时候都更容易。应用程序、在线课程和语言交流平台让人们可以与世界各地的母语者练习。虽然这些工具有帮助，但与课堂指导和对话练习等传统方法结合使用时效果最佳。",
        difficultWords: ["accessible", "exchange", "instruction", "traditional"]
      }
    ],
    question: "According to the article, what is the best time to learn a second language?",
    options: ["During adulthood", "During childhood", "After retirement", "During college"],
    answer: 1
  },
  {
    id: 17,
    level: "六级",
    source: "The Economist",
    title: "The Rise of Artificial Intelligence in Healthcare",
    summary: "探讨人工智能在医疗领域的应用前景和挑战",
    paragraphs: [
      {
        en: "Artificial intelligence is transforming healthcare in ways that were unimaginable just a decade ago. From diagnosing diseases to developing new drugs, AI-powered systems are helping doctors make faster and more accurate decisions. In radiology, for example, AI algorithms can detect signs of cancer in medical images with accuracy that matches or even exceeds that of human specialists.",
        cn: "人工智能正在以十年前无法想象的方式改变医疗保健。从诊断疾病到开发新药，人工智能驱动的系统正在帮助医生做出更快、更准确的决策。例如，在放射学领域，人工智能算法可以在医学图像中检测癌症迹象，其准确性甚至可以匹配或超过人类专家。",
        difficultWords: ["radiology", "algorithms", "accuracy", "specialists"]
      },
      {
        en: "One of the most promising applications of AI in healthcare is personalized medicine. By analyzing a patient's genetic makeup, lifestyle factors, and medical history, AI systems can recommend treatments that are tailored to the individual. This approach has shown particular promise in oncology, where AI can help identify the most effective chemotherapy drugs for specific types of cancer.",
        cn: "人工智能在医疗保健中最有前景的应用之一是个性化医疗。通过分析患者的基因构成、生活方式因素和病史，人工智能系统可以推荐针对个人定制的治疗方法。这种方法在肿瘤学中显示出特别的前景，人工智能可以帮助识别针对特定类型癌症最有效的化疗药物。",
        difficultWords: ["personalized", "oncology", "chemotherapy", "tailored"]
      },
      {
        en: "Despite these advances, the integration of AI into healthcare faces significant challenges. Concerns about data privacy, algorithmic bias, and the potential for errors must be addressed. There is also the question of accountability: when an AI system makes a mistake, who is responsible? These issues require careful regulation and ongoing dialogue between technologists, healthcare professionals, and policymakers.",
        cn: "尽管取得了这些进展，人工智能融入医疗保健仍面临重大挑战。必须解决对数据隐私、算法偏见和潜在错误的担忧。还有一个责任问题：当人工智能系统犯错时，谁应该负责？这些问题需要技术人员、医疗专业人员和政策制定者之间的仔细监管和持续对话。",
        difficultWords: ["integration", "algorithmic", "accountability", "regulation"]
      }
    ],
    question: "What is one of the most promising applications of AI in healthcare?",
    options: ["Replacing all doctors", "Personalized medicine", "Building hospitals", "Training nurses"],
    answer: 1
  },
  {
    id: 18,
    level: "考研",
    source: "Nature",
    title: "The Future of Space Exploration",
    summary: "展望人类太空探索的未来方向和挑战",
    paragraphs: [
      {
        en: "Humanity stands at the threshold of a new era in space exploration. With advances in rocket technology, robotics, and artificial intelligence, we are closer than ever to becoming a multi-planetary species. Private companies like SpaceX and Blue Origin are developing reusable rockets that could dramatically reduce the cost of space travel, making it accessible to more people than ever before.",
        cn: "人类正处于太空探索新纪元的门槛上。随着火箭技术、机器人技术和人工智能的进步，我们比以往任何时候都更接近成为多星球物种。像SpaceX和蓝色起源这样的私人公司正在开发可重复使用的火箭，这可以大幅降低太空旅行的成本，使其比以往任何时候都更容易被更多人使用。",
        difficultWords: ["threshold", "multi-planetary", "reusable", "accessible"]
      },
      {
        en: "The Moon is likely to be the next major destination for human explorers. NASA's Artemis program aims to return astronauts to the lunar surface by 2025, with the goal of establishing a permanent base there. This base could serve as a stepping stone for future missions to Mars and beyond, as well as a platform for scientific research and resource extraction.",
        cn: "月球可能是人类探索者的下一个主要目的地。美国宇航局的阿尔忒弥斯计划旨在2025年之前将宇航员送回月球表面，目标是在那里建立一个永久基地。这个基地可以作为未来火星及更远任务的垫脚石，也可以作为科学研究和资源开采的平台。",
        difficultWords: ["lunar", "permanent", "extraction", "stepping stone"]
      },
      {
        en: "However, space exploration also raises profound ethical questions. As we venture further into the cosmos, we must consider the environmental impact of our activities, the potential for contaminating other worlds with Earth organisms, and the rights of any extraterrestrial life we might discover. These issues will require international cooperation and new legal frameworks to ensure that space is explored responsibly.",
        cn: "然而，太空探索也引发了深刻的伦理问题。当我们进一步深入宇宙时，必须考虑我们活动的环境影响、用地球生物污染其他世界的潜在风险，以及我们可能发现的任何外星生命的权利。这些问题将需要国际合作和新的法律框架，以确保负责任地探索太空。",
        difficultWords: ["cosmos", "contaminating", "extraterrestrial", "frameworks"]
      }
    ],
    question: "What is NASA's Artemis program aiming to do?",
    options: ["Build a space station", "Return astronauts to the Moon", "Send humans to Mars", "Explore Jupiter"],
    answer: 1
  },
  {
    id: 19,
    level: "四级",
    source: "National Geographic",
    title: "The Wonders of the Deep Ocean",
    summary: "揭示深海世界的奥秘和科学发现",
    paragraphs: [
      {
        en: "The deep ocean remains one of the least explored places on Earth. Below 200 meters, sunlight cannot penetrate, creating a world of perpetual darkness. Yet this mysterious realm is teeming with life, including creatures that have adapted to extreme conditions of pressure, cold, and lack of light in remarkable ways.",
        cn: "深海仍然是地球上最少被探索的地方之一。在200米以下，阳光无法穿透，形成了一个永恒黑暗的世界。然而，这个神秘的领域充满了生命，包括以非凡方式适应了极端压力、寒冷和缺乏光线条件的生物。",
        difficultWords: ["penetrate", "perpetual", "teeming", "adapted"]
      },
      {
        en: "Deep-sea exploration has revealed fascinating discoveries. Hydrothermal vents, where superheated water erupts from the ocean floor, support unique ecosystems that thrive without sunlight. These communities of organisms, which rely on chemical energy rather than solar power, have expanded our understanding of where life can exist and have implications for the search for life on other planets.",
        cn: "深海探索揭示了令人着迷的发现。热液喷口——过热水从海底喷出的地方——支持着独特的生态系统，这些系统在没有阳光的情况下繁衍生息。这些生物群落依赖化学能而非太阳能，扩展了我们对生命可以在哪里存在的理解，并对寻找其他行星上的生命具有重要意义。",
        difficultWords: ["hydrothermal", "erupts", "ecosystems", "implications"]
      },
      {
        en: "Despite its importance, the deep ocean faces growing threats from human activities. Deep-sea mining, plastic pollution, and climate change are all impacting these fragile ecosystems. Scientists warn that we must act quickly to protect the deep ocean before it is too late, calling for stricter regulations on deep-sea mining and better waste management to prevent pollution from reaching the deep sea.",
        cn: "尽管深海很重要，但它正面临来自人类活动的日益严重的威胁。深海采矿、塑料污染和气候变化都在影响这些脆弱的生态系统。科学家警告说，我们必须迅速采取行动保护深海，否则为时已晚，呼吁对深海采矿实施更严格的监管，并改善废物管理以防止污染到达深海。",
        difficultWords: ["fragile", "mining", "regulations", "management"]
      }
    ],
    question: "What supports life at hydrothermal vents?",
    options: ["Sunlight", "Chemical energy", "Wind power", "Electricity"],
    answer: 1
  },
  {
    id: 20,
    level: "六级",
    source: "TIME",
    title: "The Psychology of Social Media",
    summary: "分析社交媒体对心理健康的影响",
    paragraphs: [
      {
        en: "Social media has become an integral part of modern life, with billions of people worldwide using platforms like Facebook, Instagram, and Twitter to connect with others, share experiences, and consume information. However, growing research suggests that excessive social media use can have negative effects on mental health, particularly among young people.",
        cn: "社交媒体已成为现代生活不可或缺的一部分，全球数十亿人使用Facebook、Instagram和Twitter等平台与他人联系、分享经验和消费信息。然而，越来越多的研究表明，过度使用社交媒体可能对心理健康产生负面影响，尤其是在年轻人中。",
        difficultWords: ["integral", "excessive", "negative", "particularly"]
      },
      {
        en: "One of the main concerns is the impact of social media on self-esteem. Platforms like Instagram encourage users to present idealized versions of their lives, which can lead to social comparison and feelings of inadequacy. Studies have found that people who spend more time on social media are more likely to report symptoms of depression and anxiety, although the relationship is complex and may be influenced by other factors.",
        cn: "主要担忧之一是社交媒体对自尊的影响。像Instagram这样的平台鼓励用户展示理想化的生活版本，这可能导致社会比较和不足感。研究发现，在社交媒体上花费更多时间的人更容易报告抑郁和焦虑症状，尽管这种关系很复杂，可能受到其他因素的影响。",
        difficultWords: ["self-esteem", "idealized", "inadequacy", "symptoms"]
      },
      {
        en: "Despite these concerns, social media also offers significant benefits. It can provide a sense of community for people who feel isolated, facilitate political activism and social movements, and enable businesses to reach customers in new ways. The key challenge is finding a healthy balance that allows people to enjoy the benefits of social media while minimizing its potential harms.",
        cn: "尽管存在这些担忧，社交媒体也提供了显著的好处。它可以为感到孤立的人提供社区感，促进政治行动主义和社会运动，并使企业能够以新的方式接触客户。关键挑战是找到一个健康的平衡，让人们能够享受社交媒体的好处，同时将其潜在危害降至最低。",
        difficultWords: ["isolated", "facilitate", "activism", "minimizing"]
      }
    ],
    question: "What is one of the main concerns about social media?",
    options: ["It's too expensive", "Its impact on self-esteem", "It's too slow", "It uses too much data"],
    answer: 1
  },
  {
    id: 21,
    level: "四级",
    source: "BBC",
    title: "The Importance of Sleep for Students",
    summary: "揭示睡眠对学习效果和学生健康的关键作用",
    paragraphs: [
      {
        en: "Sleep is often the first thing students sacrifice when facing deadlines and exams. However, research consistently shows that getting enough sleep is crucial for learning and memory consolidation. During sleep, the brain processes and stores information from the day, making it easier to recall later.",
        cn: "睡眠常常是学生在面对截止日期和考试时首先牺牲的东西。然而，研究一致表明，充足的睡眠对学习和记忆巩固至关重要。在睡眠期间，大脑处理和存储当天的信息，使其更容易在以后回忆。",
        difficultWords: ["sacrifice", "consolidation", "crucial", "recall", "process"]
      },
      {
        en: "Studies have found that students who sleep less than seven hours per night perform significantly worse on exams than those who get adequate rest. Sleep deprivation impairs attention, concentration, and problem-solving ability, all of which are essential for academic success.",
        cn: "研究发现，每晚睡眠不足七小时的学生在考试中的表现明显比睡眠充足的学生差。睡眠不足会损害注意力、集中力和解决问题的能力，这些都是学业成功所必需的。",
        difficultWords: ["adequate", "deprivation", "impair", "concentration", "essential"]
      },
      {
        en: "Experts recommend that young adults get seven to nine hours of sleep each night. To improve sleep quality, students should maintain a consistent sleep schedule, avoid caffeine and screens before bedtime, and create a dark, quiet sleeping environment.",
        cn: "专家建议年轻人每晚睡七到九个小时。为了改善睡眠质量，学生应保持一致的睡眠时间表，睡前避免咖啡因和屏幕，并创造黑暗安静的睡眠环境。",
        difficultWords: ["recommend", "consistent", "caffeine", "environment", "quality"]
      }
    ],
    question: "How many hours of sleep do experts recommend for young adults?",
    options: ["5-6 hours", "6-7 hours", "7-9 hours", "9-10 hours"],
    answer: 2
  },
  {
    id: 22,
    level: "六级",
    source: "The Economist",
    title: "The Future of Renewable Energy",
    summary: "分析可再生能源的发展趋势和挑战",
    paragraphs: [
      {
        en: "The transition to renewable energy is accelerating worldwide. Solar and wind power costs have fallen dramatically over the past decade, making them competitive with fossil fuels in many markets. In 2022, renewable energy sources accounted for nearly 30 percent of global electricity generation, a record high.",
        cn: "向可再生能源的转型正在全球范围内加速。太阳能和风能成本在过去十年大幅下降，使其在许多市场上与化石燃料具有竞争力。2022年，可再生能源占全球发电量的近30%，创历史新高。",
        difficultWords: ["transition", "accelerating", "competitive", "generation", "record"]
      },
      {
        en: "Despite this progress, significant challenges remain. Energy storage technology must improve to handle the intermittent nature of solar and wind power. Grid infrastructure needs upgrading to accommodate distributed energy sources. And political will is needed to phase out subsidies for fossil fuels.",
        cn: "尽管取得了这一进展，重大挑战仍然存在。储能技术必须改进以处理太阳能和风能的间歇性。电网基础设施需要升级以适应分布式能源。并且需要政治意愿来逐步取消对化石燃料的补贴。",
        difficultWords: ["intermittent", "infrastructure", "accommodate", "subsidy", "phase out"]
      },
      {
        en: "The economic benefits of renewable energy are becoming increasingly clear. The sector now employs more than 12 million people worldwide, and this number is expected to grow significantly. Countries that invest early in renewable energy infrastructure will be well-positioned to lead the clean energy economy of the future.",
        cn: "可再生能源的经济效益日益明显。该行业目前在全球雇用超过1200万人，预计这一数字将大幅增长。早期投资可再生能源基础设施的国家将处于领先地位，引领未来的清洁能源经济。",
        difficultWords: ["sector", "employ", "significantly", "infrastructure", "well-positioned"]
      }
    ],
    question: "What percentage of global electricity came from renewable sources in 2022?",
    options: ["About 10%", "About 20%", "About 30%", "About 40%"],
    answer: 2
  },
  {
    id: 23,
    level: "考研",
    source: "Nature",
    title: "The Promise of Quantum Computing",
    summary: "探讨量子计算的潜力和应用前景",
    paragraphs: [
      {
        en: "Quantum computing represents a fundamental shift in how we process information. Unlike classical computers, which use bits that can only be in one of two states (0 or 1), quantum computers use quantum bits, or qubits, which can exist in multiple states simultaneously thanks to a phenomenon called superposition.",
        cn: "量子计算代表了我们处理信息方式的根本性转变。与只能处于两种状态之一（0或1）的经典计算机不同，量子计算机使用量子比特或量子位，由于一种叫做叠加的现象，它们可以同时存在于多种状态。",
        difficultWords: ["fundamental", "classical", "simultaneously", "superposition", "phenomenon"]
      },
      {
        en: "The potential applications of quantum computing are vast. In drug discovery, quantum computers could simulate molecular interactions at a level of detail impossible for classical computers, dramatically accelerating the development of new medicines. In cryptography, quantum computers could break many of the encryption methods currently used to secure digital communications.",
        cn: "量子计算的潜在应用是巨大的。在药物发现方面，量子计算机可以以经典计算机无法达到的详细程度模拟分子相互作用，大大加速新药的开发。在密码学方面，量子计算机可以破解目前用于保护数字通信的许多加密方法。",
        difficultWords: ["simulate", "molecular", "accelerating", "cryptography", "encryption"]
      },
      {
        en: "Despite enormous progress, building practical quantum computers remains extraordinarily challenging. Qubits are extremely fragile and must be kept at temperatures near absolute zero. Current quantum computers are prone to errors and can only perform calculations for short periods. Scientists and engineers around the world are working to overcome these obstacles.",
        cn: "尽管取得了巨大进展，但建造实用的量子计算机仍然极具挑战性。量子位极其脆弱，必须保持在接近绝对零度的温度下。目前的量子计算机容易出错，只能在短时间内进行计算。世界各地的科学家和工程师正在努力克服这些障碍。",
        difficultWords: ["extraordinarily", "fragile", "absolute", "prone", "obstacle"]
      }
    ],
    question: "What allows qubits to exist in multiple states simultaneously?",
    options: ["Classical computing", "Superposition", "Encryption", "Molecular interaction"],
    answer: 1
  },
  {
    id: 24,
    level: "四级",
    source: "The Guardian",
    title: "The Benefits of Reading for Pleasure",
    summary: "揭示阅读对个人成长和心理健康的多重好处",
    paragraphs: [
      {
        en: "Reading for pleasure is one of the most beneficial activities a person can engage in. Studies have shown that regular readers have stronger cognitive abilities, better vocabulary, and higher levels of empathy than non-readers. Reading also reduces stress and can even help prevent cognitive decline in old age.",
        cn: "阅读乐趣是一个人可以从事的最有益的活动之一。研究表明，经常阅读的人比不阅读的人拥有更强的认知能力、更好的词汇量和更高水平的同理心。阅读还能减轻压力，甚至有助于预防老年认知衰退。",
        difficultWords: ["beneficial", "cognitive", "empathy", "decline", "prevent"]
      },
      {
        en: "Fiction, in particular, has been shown to enhance social cognition—the ability to understand and predict other people's behavior. When we read novels, we practice imagining ourselves in other people's situations, which strengthens our capacity for empathy and emotional understanding.",
        cn: "小说尤其被证明能增强社会认知——理解和预测他人行为的能力。当我们阅读小说时，我们练习将自己想象成他人的处境，这增强了我们的同理心和情感理解能力。",
        difficultWords: ["fiction", "enhance", "cognition", "predict", "capacity"]
      },
      {
        en: "In the digital age, finding time to read can be challenging. However, even reading for just 20 minutes a day can have significant benefits. The key is to choose books that genuinely interest you and to make reading a regular part of your routine, whether it's during your commute, before bed, or during your lunch break.",
        cn: "在数字时代，找时间阅读可能很有挑战性。然而，即使每天只阅读20分钟也能带来显著的好处。关键是选择真正感兴趣的书籍，并使阅读成为你日常生活的一部分，无论是在通勤时、睡前还是午休时。",
        difficultWords: ["genuinely", "routine", "commute", "significant", "regular"]
      }
    ],
    question: "What does fiction reading enhance according to the article?",
    options: ["Physical strength", "Social cognition", "Mathematical ability", "Musical talent"],
    answer: 1
  },
  {
    id: 25,
    level: "六级",
    source: "TIME",
    title: "The Psychology of Decision Making",
    summary: "分析人类决策过程中的心理机制和认知偏差",
    paragraphs: [
      {
        en: "Every day, we make thousands of decisions, from trivial choices like what to eat for breakfast to life-changing decisions about careers and relationships. Yet most of us give little thought to the psychological processes that drive our decision-making, which are often far from rational.",
        cn: "每天，我们做出数千个决定，从早餐吃什么这样的琐碎选择到关于职业和人生关系的改变人生的决定。然而，我们大多数人很少思考驱动我们决策的心理过程，这些过程往往远非理性。",
        difficultWords: ["trivial", "psychological", "rational", "process", "drive"]
      },
      {
        en: "Nobel laureate Daniel Kahneman identified two systems of thinking: System 1, which is fast, intuitive, and automatic, and System 2, which is slow, deliberate, and analytical. Most of our daily decisions are made by System 1, which relies on mental shortcuts known as heuristics. While these shortcuts are efficient, they can also lead to systematic errors in judgment.",
        cn: "诺贝尔奖得主丹尼尔·卡尼曼识别出两种思维系统：系统1是快速、直觉和自动的，系统2是缓慢、深思熟虑和分析性的。我们大多数日常决定由系统1做出，它依赖于被称为启发法的心理捷径。虽然这些捷径效率很高，但它们也可能导致系统性的判断错误。",
        difficultWords: ["intuitive", "deliberate", "heuristic", "systematic", "judgment"]
      },
      {
        en: "Understanding these cognitive biases can help us make better decisions. By slowing down our thinking, seeking diverse perspectives, and deliberately challenging our assumptions, we can overcome many of the pitfalls that lead to poor choices. Some organizations are now using 'nudge' techniques to help people make better decisions without restricting their freedom.",
        cn: "理解这些认知偏差可以帮助我们做出更好的决定。通过放慢思维、寻求不同观点并刻意挑战我们的假设，我们可以克服许多导致糟糕选择的陷阱。一些组织现在正在使用'助推'技术来帮助人们在不限制自由的情况下做出更好的决定。",
        difficultWords: ["bias", "deliberately", "assumption", "pitfall", "restriction"]
      }
    ],
    question: "Who identified the two systems of thinking?",
    options: ["Albert Einstein", "Daniel Kahneman", "Stephen Hawking", "Isaac Newton"],
    answer: 1
  },
  {
    id: 26,
    level: "四级",
    source: "BBC Learning English",
    title: "How to Improve Your Memory",
    summary: "介绍科学验证的记忆提升方法和技巧",
    paragraphs: [
      {
        en: "Memory is not a single, unified function but a complex system involving multiple brain regions. Understanding how memory works can help us develop more effective strategies for learning and retaining information. Scientists have identified several techniques that can significantly improve memory performance.",
        cn: "记忆不是一个单一、统一的功能，而是一个涉及多个大脑区域的复杂系统。理解记忆如何工作可以帮助我们制定更有效的学习和保持信息的策略。科学家已经确定了几种可以显著提高记忆表现的技术。",
        difficultWords: ["unified", "complex", "retaining", "strategy", "technique"]
      },
      {
        en: "One of the most powerful memory techniques is spaced repetition, which involves reviewing information at gradually increasing intervals. Instead of cramming all your studying into one session, spacing out your review sessions over time leads to much better long-term retention. Apps like Anki use this principle to help users memorize vocabulary and facts efficiently.",
        cn: "最强大的记忆技巧之一是间隔重复，它涉及在逐渐增加的间隔时间复习信息。与其将所有学习内容塞进一个学习 session，不如将复习 session 分散在一段时间内，这样可以获得更好的长期记忆保持。像 Anki 这样的应用程序使用这个原理帮助用户高效记忆词汇和事实。",
        difficultWords: ["repetition", "interval", "cramming", "retention", "efficiently"]
      },
      {
        en: "Another effective strategy is active recall, which means testing yourself on the material rather than simply re-reading it. Research has shown that the effort of retrieving information from memory strengthens the neural pathways associated with that information, making it easier to recall in the future.",
        cn: "另一个有效的策略是主动回忆，这意味着对自己进行材料测试，而不是简单地重新阅读。研究表明，从记忆中检索信息的努力加强了与该信息相关的神经通路，使其在未来更容易回忆。",
        difficultWords: ["recall", "retrieving", "neural", "pathway", "associated"]
      }
    ],
    question: "What is spaced repetition?",
    options: ["Studying everything at once", "Reviewing information at increasing intervals", "Never reviewing material", "Only studying before exams"],
    answer: 1
  },
  {
    id: 27,
    level: "考研",
    source: "The Atlantic",
    title: "The Ethics of Artificial Intelligence",
    summary: "探讨人工智能发展带来的伦理挑战和社会影响",
    paragraphs: [
      {
        en: "As artificial intelligence becomes increasingly powerful and pervasive, society faces profound ethical questions about how this technology should be developed and deployed. From autonomous vehicles making life-or-death decisions to algorithms that determine who gets a loan or a job interview, AI systems are making choices that were once the exclusive domain of humans.",
        cn: "随着人工智能变得越来越强大和普遍，社会面临着关于应如何开发和部署这项技术的深刻伦理问题。从自动驾驶汽车做出生死决定到决定谁获得贷款或工作面试的算法，人工智能系统正在做出曾经是人类专属领域的选择。",
        difficultWords: ["pervasive", "profound", "autonomous", "exclusive", "domain"]
      },
      {
        en: "One of the most pressing concerns is algorithmic bias. AI systems learn from historical data, which often reflects existing societal prejudices. If not carefully designed and monitored, these systems can perpetuate and even amplify discrimination based on race, gender, age, or socioeconomic status. Several high-profile cases have demonstrated how biased algorithms can lead to unfair outcomes in criminal justice, hiring, and lending.",
        cn: "最紧迫的问题之一是算法偏见。人工智能系统从历史数据中学习，这些数据往往反映了现有的社会偏见。如果不仔细设计和监控，这些系统可能延续甚至放大基于种族、性别、年龄或社会经济地位的歧视。几个备受关注的案例表明，有偏见的算法如何在刑事司法、招聘和贷款中导致不公平的结果。",
        difficultWords: ["algorithmic", "prejudice", "perpetuate", "amplify", "socioeconomic"]
      },
      {
        en: "The question of accountability is equally complex. When an autonomous vehicle causes an accident, or when an AI-powered medical system makes an incorrect diagnosis, who is responsible? Current legal frameworks are not equipped to handle these questions, and new regulations are urgently needed to ensure that AI is developed and used responsibly.",
        cn: "责任问题同样复杂。当自动驾驶汽车造成事故，或者当人工智能驱动的医疗系统做出错误诊断时，谁应该负责？目前的法律框架无法处理这些问题，迫切需要新的法规来确保人工智能得到负责任的开发和使用。",
        difficultWords: ["accountability", "diagnosis", "framework", "regulation", "responsibly"]
      }
    ],
    question: "What is one of the most pressing concerns about AI?",
    options: ["AI is too expensive", "Algorithmic bias", "AI is too slow", "AI uses too much energy"],
    answer: 1
  },
  {
    id: 28,
    level: "六级",
    source: "Scientific American",
    title: "The Wonders of the Human Brain",
    summary: "揭示人脑的惊人能力和最新神经科学发现",
    paragraphs: [
      {
        en: "The human brain is the most complex structure in the known universe, containing approximately 86 billion neurons connected by trillions of synapses. Despite decades of research, we are still far from fully understanding how this remarkable organ works, but recent discoveries have shed new light on its extraordinary capabilities.",
        cn: "人脑是已知宇宙中最复杂的结构，包含大约860亿个神经元，通过数万亿个突触连接。尽管研究了几十年，我们仍然远未完全理解这个非凡器官的工作原理，但最近的发现为其非凡能力提供了新的见解。",
        difficultWords: ["approximately", "neuron", "synapse", "remarkable", "extraordinary"]
      },
      {
        en: "One of the most surprising discoveries in recent neuroscience is the brain's remarkable plasticity. Contrary to the long-held belief that the brain stops developing after childhood, scientists have found that the brain continues to form new neural connections throughout life. This neuroplasticity allows the brain to reorganize itself after injury and to adapt to new experiences and learning.",
        cn: "最近神经科学中最令人惊讶的发现之一是大脑非凡的可塑性。与长期以来认为大脑在童年之后停止发育的观点相反，科学家发现大脑在整个生命过程中继续形成新的神经连接。这种神经可塑性使大脑能够在受伤后自我重组，并适应新的经验和学习。",
        difficultWords: ["plasticity", "contrary", "neuroplasticity", "reorganize", "adapt"]
      },
      {
        en: "The implications of these discoveries are profound. They suggest that we have far more potential for learning and growth throughout our lives than previously believed. They also offer hope for treating neurological conditions such as stroke, traumatic brain injury, and neurodegenerative diseases like Alzheimer's.",
        cn: "这些发现的影响是深远的。它们表明，我们在整个生命过程中拥有比此前认为的更多的学习和成长潜力。它们也为治疗中风、创伤性脑损伤和阿尔茨海默症等神经系统疾病提供了希望。",
        difficultWords: ["implication", "potential", "neurological", "traumatic", "neurodegenerative"]
      }
    ],
    question: "How many neurons does the human brain contain approximately?",
    options: ["86 million", "860 million", "86 billion", "860 billion"],
    answer: 2
  },
  {
    id: 29,
    level: "四级",
    source: "National Geographic",
    title: "Protecting Our Oceans",
    summary: "介绍海洋保护的重要性和当前面临的挑战",
    paragraphs: [
      {
        en: "The oceans cover more than 70 percent of the Earth's surface and are home to an incredible diversity of life. They regulate our climate, produce much of the oxygen we breathe, and provide food for billions of people. Yet despite their importance, the world's oceans face unprecedented threats from pollution, overfishing, and climate change.",
        cn: "海洋覆盖了地球表面的70%以上，是令人难以置信的生物多样性的家园。它们调节我们的气候，产生我们呼吸的大部分氧气，并为数十亿人提供食物。然而，尽管它们很重要，世界海洋面临着来自污染、过度捕捞和气候变化的前所未有的威胁。",
        difficultWords: ["diversity", "regulate", "unprecedented", "overfishing", "pollution"]
      },
      {
        en: "Plastic pollution is one of the most visible threats to marine ecosystems. Every year, approximately 8 million tons of plastic waste enters the oceans, harming marine life and contaminating the food chain. Microplastics, tiny fragments less than 5 millimeters in size, have been found in virtually every ocean environment and even in the deepest trenches.",
        cn: "塑料污染是海洋生态系统最明显的威胁之一。每年约有800万吨塑料废物进入海洋，危害海洋生物并污染食物链。微塑料——小于5毫米的微小碎片——几乎在每个海洋环境中甚至最深的海沟中都被发现。",
        difficultWords: ["visible", "marine", "contaminate", "microplastic", "fragment"]
      },
      {
        en: "Marine protected areas (MPAs) are one of the most effective tools for ocean conservation. These designated zones restrict human activities such as fishing and drilling, allowing ecosystems to recover and thrive. Currently, about 8 percent of the world's oceans are protected, but scientists recommend increasing this to at least 30 percent to ensure the long-term health of marine ecosystems.",
        cn: "海洋保护区是海洋保护最有效的工具之一。这些指定区域限制捕鱼和钻探等人类活动，使生态系统得以恢复和繁荣。目前，世界约8%的海洋受到保护，但科学家建议将这一比例提高到至少30%，以确保海洋生态系统的长期健康。",
        difficultWords: ["designated", "restrict", "drilling", "thrive", "recommend"]
      }
    ],
    question: "How much plastic waste enters the oceans annually?",
    options: ["About 2 million tons", "About 5 million tons", "About 8 million tons", "About 10 million tons"],
    answer: 2
  },
  {
    id: 30,
    level: "考研",
    source: "Harvard Business Review",
    title: "The Future of Remote Work",
    summary: "分析远程工作的趋势及其对组织管理的影响",
    paragraphs: [
      {
        en: "The COVID-19 pandemic forced a massive experiment in remote work that few organizations had anticipated. What began as a temporary measure has evolved into a permanent shift in how millions of people around the world approach their jobs. Surveys consistently show that a majority of remote workers prefer to continue working from home, at least part of the time.",
        cn: "新冠疫情迫使一场大规模的远程工作实验，这是很少有组织预料到的。最初作为临时措施，已经演变成全球数百万人工作方式的永久性转变。调查一致显示，大多数远程工作者更愿意继续在家工作，至少是部分时间。",
        difficultWords: ["anticipated", "temporary", "permanent", "evolved", "consistently"]
      },
      {
        en: "The benefits of remote work are well documented. Workers report higher productivity, better work-life balance, and reduced stress from eliminating daily commutes. Companies benefit from lower office costs and access to a global talent pool. Environmental gains are also significant, with reduced commuting leading to lower carbon emissions.",
        cn: "远程工作的好处已被充分记录。员工报告了更高的生产力、更好的工作与生活平衡，以及因消除日常通勤而减少的压力。公司受益于更低的办公成本和获取全球人才库的机会。环境收益也很显著，减少通勤导致碳排放降低。",
        difficultWords: ["productivity", "commute", "eliminate", "emission", "significant"]
      },
      {
        en: "However, remote work also presents challenges that organizations must address. Social isolation, difficulty separating work from personal life, and the loss of spontaneous collaboration are common concerns. Managers face new challenges in maintaining team cohesion and monitoring performance without micromanaging. The most successful organizations will be those that develop thoughtful policies that balance flexibility with accountability.",
        cn: "然而，远程工作也带来了组织必须应对的挑战。社交隔离、难以将工作与个人生活分开，以及失去自发的协作是常见的担忧。管理者在保持团队凝聚力和监控绩效而不进行微观管理方面面临新的挑战。最成功的组织将是那些制定深思熟虑的政策，在灵活性与问责之间取得平衡的组织。",
        difficultWords: ["isolation", "spontaneous", "cohesion", "micromanaging", "accountability"]
      }
    ],
    question: "What do surveys show about remote workers?",
    options: ["They all want to return to offices", "Most prefer to continue working from home", "They are less productive", "They want shorter work hours"],
    answer: 1
  }
];

// ===== 每日一词 =====
const DAILY_WORDS = [
  { word: "ubiquitous", phonetic: "/juːˈbɪkwɪtəs/", meaning: "adj. 无处不在的", example: "Smartphones have become ubiquitous in modern society." },
  { word: "eloquent", phonetic: "/ˈeləkwənt/", meaning: "adj. 雄辩的，有说服力的", example: "She gave an eloquent speech about the importance of education." },
  { word: "resilient", phonetic: "/rɪˈzɪliənt/", meaning: "adj. 有韧性的，能恢复的", example: "Children are remarkably resilient and can adapt to change quickly." },
  { word: "meticulous", phonetic: "/məˈtɪkjʊləs/", meaning: "adj. 一丝不苟的", example: "The scientist was meticulous in recording her experimental data." },
  { word: "paradigm", phonetic: "/ˈpærədaɪm/", meaning: "n. 范式，典范", example: "The discovery represented a paradigm shift in our understanding of physics." },
  { word: "ephemeral", phonetic: "/ɪˈfemərəl/", meaning: "adj. 短暂的，转瞬即逝的", example: "Social media posts are often ephemeral, quickly forgotten." },
  { word: "pragmatic", phonetic: "/præɡˈmætɪk/", meaning: "adj. 务实的", example: "We need a pragmatic approach to solving this complex problem." },
  { word: "unprecedented", phonetic: "/ʌnˈpresɪdentɪd/", meaning: "adj. 史无前例的", example: "The pandemic caused unprecedented disruption to global economies." },
  { word: "intricate", phonetic: "/ˈɪntrɪkət/", meaning: "adj. 复杂精细的", example: "The watch mechanism is incredibly intricate and precise." },
  { word: "compelling", phonetic: "/kəmˈpelɪŋ/", meaning: "adj. 引人注目的，令人信服的", example: "The lawyer presented a compelling argument for her client's innocence." },
  { word: "scrutiny", phonetic: "/ˈskruːtəni/", meaning: "n. 仔细审查", example: "The government's policies have come under intense public scrutiny." },
  { word: "coherent", phonetic: "/koʊˈhɪrənt/", meaning: "adj. 连贯的，一致的", example: "She presented a coherent plan for the company's future growth." },
  { word: "deteriorate", phonetic: "/dɪˈtɪriəreɪt/", meaning: "v. 恶化，变坏", example: "Without proper maintenance, the building's condition will deteriorate." },
  { word: "advocate", phonetic: "/ˈædvəkeɪt/", meaning: "v./n. 提倡，倡导者", example: "She has long been an advocate for children's rights." },
  { word: "profound", phonetic: "/prəˈfaʊnd/", meaning: "adj. 深刻的，深远的", example: "Technology has had a profound impact on how we communicate." },
  { word: "ambiguous", phonetic: "/æmˈbɪɡjuəs/", meaning: "adj. 模棱两可的", example: "The contract's language was deliberately ambiguous." },
  { word: "surge", phonetic: "/sɜːrdʒ/", meaning: "v./n. 激增，涌动", example: "There has been a surge in demand for renewable energy." },
  { word: "lucrative", phonetic: "/ˈluːkrətɪv/", meaning: "adj. 利润丰厚的", example: "The tech industry offers many lucrative career opportunities." },
  { word: "consensus", phonetic: "/kənˈsensəs/", meaning: "n. 共识", example: "The committee reached a consensus on the new policy." },
  { word: "volatile", phonetic: "/ˈvɒlətaɪl/", meaning: "adj. 不稳定的，易变的", example: "The stock market has been particularly volatile this week." },
  { word: "alleviate", phonetic: "/əˈliːvieɪt/", meaning: "v. 减轻，缓解", example: "The new medicine helped alleviate her chronic pain." },
  { word: "tenacious", phonetic: "/tɪˈneɪʃəs/", meaning: "adj. 坚韧不拔的", example: "Her tenacious spirit helped her overcome every obstacle." },
  { word: "deterioration", phonetic: "/dɪˌtɪriəˈreɪʃn/", meaning: "n. 恶化", example: "The deterioration of air quality is a serious public health concern." },
  { word: "exemplify", phonetic: "/ɪɡˈzemplɪfaɪ/", meaning: "v. 例证，作为典范", example: "Her career exemplifies the power of hard work and determination." },
  { word: "substantial", phonetic: "/səbˈstænʃl/", meaning: "adj. 大量的，实质的", example: "The company made a substantial investment in research and development." },
  { word: "versatile", phonetic: "/ˈvɜːrsətaɪl/", meaning: "adj. 多才多艺的，多功能的", example: "She is a versatile musician who plays five different instruments." },
  { word: "implicit", phonetic: "/ɪmˈplɪsɪt/", meaning: "adj. 含蓄的，暗示的", example: "There was an implicit understanding between them." },
  { word: "augment", phonetic: "/ɔːɡˈment/", meaning: "v. 增加，扩大", example: "She took a part-time job to augment her income." },
  { word: "perpetuate", phonetic: "/pərˈpetʃueɪt/", meaning: "v. 使永存，使延续", example: "Stereotypes can perpetuate discrimination and inequality." },
  { word: "nuance", phonetic: "/ˈnjuːɑːns/", meaning: "n. 细微差别", example: "Understanding cultural nuances is essential for effective communication." }
];

// ===== 语法专题 =====
const GRAMMAR_TOPICS = [
  {
    id: 1,
    title: "虚拟语气",
    icon: "&#x1F4AD;",
    summary: "表达假设、愿望、建议等非真实情况",
    points: [
      {
        rule: "if 引导的虚拟条件句",
        structure: "If + 主语 + 过去式/过去完成式, 主语 + would/could/might + 动词原形/have done",
        example: "If I were you, I would study harder.",
        translation: "如果我是你，我会更努力学习。",
        note: "与现在事实相反用过去式，与过去事实相反用过去完成式"
      },
      {
        rule: "wish 后的虚拟语气",
        structure: "wish + 主语 + 过去式/过去完成式/could do",
        example: "I wish I had studied English earlier.",
        translation: "我希望我早点学英语就好了。",
        note: "对现在用过去式，对过去用过去完成式"
      },
      {
        rule: "suggest/recommend 等词后的虚拟",
        structure: "suggest/recommend/insist + that + 主语 + (should) + 动词原形",
        example: "The doctor suggested that he (should) take a rest.",
        translation: "医生建议他休息一下。",
        note: "should 可省略，常见于美式英语"
      }
    ],
    relatedSentences: [34, 51]
  },
  {
    id: 2,
    title: "倒装句",
    icon: "&#x1F504;",
    summary: "将谓语动词提到主语之前的特殊句式",
    points: [
      {
        rule: "否定词位于句首的倒装",
        structure: "否定词 + 助动词/be动词 + 主语 + 动词",
        example: "Not until midnight did he finish his homework.",
        translation: "直到半夜他才完成作业。",
        note: "常见否定词：never, seldom, hardly, not until, not only"
      },
      {
        rule: "Only + 状语位于句首",
        structure: "Only + 状语 + 助动词/be动词 + 主语 + 动词",
        example: "Only then did I realize my mistake.",
        translation: "直到那时我才意识到我的错误。",
        note: "only 后必须是状语才倒装"
      },
      {
        rule: "So/Such... that 句型的倒装",
        structure: "So + adj./adv. / Such + n. + 助动词 + 主语 + that...",
        example: "So beautiful was the sunset that everyone stopped to watch.",
        translation: "日落太美了，每个人都停下来观看。",
        note: "强调程度之深"
      }
    ],
    relatedSentences: [8, 54]
  },
  {
    id: 3,
    title: "定语从句",
    icon: "&#x1F4DD;",
    summary: "修饰名词或代词的从句",
    points: [
      {
        rule: "关系代词的选择",
        structure: "who/whom/whose/which/that",
        example: "The book that/which I bought yesterday is very interesting.",
        translation: "我昨天买的那本书很有趣。",
        note: "先行词是人用who/that，物用which/that"
      },
      {
        rule: "非限制性定语从句",
        structure: "主句, which/who/whose...",
        example: "He passed the exam, which made his parents proud.",
        translation: "他通过了考试，这让他父母很骄傲。",
        note: "用逗号隔开，不能用that"
      },
      {
        rule: "介词 + 关系代词",
        structure: "介词 + which/whom",
        example: "The house in which I grew up has been demolished.",
        translation: "我长大的那栋房子已被拆除。",
        note: "介词前置更正式"
      }
    ],
    relatedSentences: [1, 6, 10]
  },
  {
    id: 4,
    title: "非谓语动词",
    icon: "&#x1F4D6;",
    summary: "不定式、动名词、分词的用法",
    points: [
      {
        rule: "不定式作主语",
        structure: "To + 动词原形 + is + ...",
        example: "To learn a foreign language requires patience.",
        translation: "学习一门外语需要耐心。",
        note: "常用 It is... to do 形式主语句型"
      },
      {
        rule: "现在分词与过去分词",
        structure: "doing (主动/进行) / done (被动/完成)",
        example: "The excited students cheered loudly. / The boring lecture put everyone to sleep.",
        translation: "兴奋的学生们大声欢呼。/ 无聊的讲座让每个人都睡着了。",
        note: "-ing 修饰事物特征，-ed 修饰人感受"
      },
      {
        rule: "独立主格结构",
        structure: "名词/代词 + 分词/形容词/介词短语",
        example: "Weather permitting, we will go on a picnic.",
        translation: "如果天气允许，我们将去野餐。",
        note: "逻辑主语与句子主语不一致时使用"
      }
    ],
    relatedSentences: [11, 27, 37]
  },
  {
    id: 5,
    title: "名词性从句",
    icon: "&#x1F4E6;",
    summary: "主语从句、宾语从句、表语从句、同位语从句",
    points: [
      {
        rule: "主语从句",
        structure: "What/That/Whether... + 谓语 + ...",
        example: "What he said surprised everyone.",
        translation: "他说的话让每个人都很惊讶。",
        note: "what 引导时在从句中作成分，that 不作成分"
      },
      {
        rule: "同位语从句 vs 定语从句",
        structure: "n. + that + 完整句子 (同位语) / n. + that + 不完整句子 (定语)",
        example: "The fact that he passed the exam surprised us. (同位语)",
        translation: "他通过考试的事实让我们惊讶。",
        note: "同位语从句解释名词内容，定语从句修饰限定名词"
      },
      {
        rule: "whether 与 if 的区别",
        structure: "whether 可用于主语从句、表语从句、介词后；if 只能引导宾语从句",
        example: "Whether he will come is still unknown.",
        translation: "他是否会来仍未知。",
        note: "主语从句只能用 whether"
      }
    ],
    relatedSentences: [2, 4, 9]
  }
];

// ===== 写作模板 =====
const WRITING_TEMPLATES = [
  {
    id: 1,
    title: "雅思大作文 - 观点讨论类",
    level: "雅思",
    structure: [
      { part: "开头段", content: "It is often argued that... While I agree that..., I believe that..." },
      { part: "主体段1", content: "On the one hand, there are several reasons why... Firstly,... Secondly,... For example,..." },
      { part: "主体段2", content: "On the other hand, I believe that... This is because... Furthermore,..." },
      { part: "结尾段", content: "In conclusion, while... I firmly believe that..." }
    ],
    keyPhrases: ["It is often argued that", "On the one hand", "On the other hand", "Furthermore", "In conclusion"],
    sampleEssay: "It is often argued that technology has made our lives easier. While I agree that technology has brought many benefits, I believe that it has also created new challenges."
  },
  {
    id: 2,
    title: "考研英语 - 图表作文",
    level: "考研",
    structure: [
      { part: "描述图表", content: "As is clearly shown in the chart/graph/table, ... increased/decreased significantly from... to..." },
      { part: "分析原因", content: "There are several reasons accounting for this phenomenon. First and foremost,... In addition,... Last but not least,..." },
      { part: "提出建议", content: "In view of the above analysis, it is imperative that... Only in this way can we..." },
      { part: "总结", content: "Taking all these factors into consideration, we may safely conclude that..." }
    ],
    keyPhrases: ["As is clearly shown in", "First and foremost", "In addition", "Last but not least", "Taking all these factors into consideration"],
    sampleEssay: "As is clearly shown in the chart, the number of people using smartphones has increased dramatically over the past decade."
  },
  {
    id: 3,
    title: "四级/六级 - 议论文",
    level: "四级",
    structure: [
      { part: "引出话题", content: "Nowadays, there is a growing concern about... Some people believe that..., while others argue that..." },
      { part: "正方观点", content: "Those who support this view point out that... For instance,..." },
      { part: "反方观点", content: "However, others hold the opposite opinion. They argue that... A good example is..." },
      { part: "我的看法", content: "From my perspective, I am inclined to agree with... because..." }
    ],
    keyPhrases: ["Nowadays", "Some people believe that", "while others argue that", "From my perspective", "I am inclined to agree with"],
    sampleEssay: "Nowadays, there is a growing concern about environmental pollution. Some people believe that individual actions can make a difference, while others argue that only government policies can solve this problem."
  },
  {
    id: 4,
    title: "托福独立写作",
    level: "托福",
    structure: [
      { part: "开头", content: "In today's society, the issue of... has attracted widespread attention. In my opinion,..." },
      { part: "理由1", content: "To begin with,... This is because... For example,..." },
      { part: "理由2", content: "Moreover,... As a result,... A case in point is..." },
      { part: "让步段", content: "Admittedly, some may argue that... However, I still believe that..." },
      { part: "结尾", content: "In conclusion, for the reasons mentioned above, I strongly believe that..." }
    ],
    keyPhrases: ["In today's society", "To begin with", "Moreover", "Admittedly", "A case in point is", "In conclusion"],
    sampleEssay: "In today's society, the issue of whether children should start learning foreign languages at an early age has attracted widespread attention."
  }
];

// ===== 学习小贴士 =====
const STUDY_TIPS = [
  "每天坚持阅读英文原版材料15分钟，词汇量会在不知不觉中飞速增长。",
  "遇到长难句时，先找主干（主语+谓语+宾语），再分析修饰成分。",
  "背单词不要孤立地记，把它放在句子和语境中记忆效果更好。",
  "听力提升的秘诀：精听+跟读，模仿语音语调比单纯听更有效。",
  "写作时多用从句和连接词，让文章逻辑更清晰、表达更高级。",
  "每天用英语写三句话日记，坚持一个月会有惊人进步。",
  "阅读外刊时，先通读全文理解大意，再逐段精读分析语法。",
  "学习英语最好的方法是大量输入+适量输出，多听多读是基础。",
  "不要害怕犯错，语言学习就是在不断试错中进步的过程。",
  "利用碎片时间听英文播客或有声书，让英语融入日常生活。",
  "复习比学习新知识更重要，遵循艾宾浩斯遗忘曲线定期复习。",
  "找一个语伴或加入学习社群，互相督促能让学习效率翻倍。",
  "看美剧学英语时，先看中文字幕理解剧情，再看英文字幕学习表达。",
  "学习词根词缀能帮助你快速推测生词含义，举一反三。",
  "每天大声朗读英文文章10分钟，口语和语感会同时提升。"
];

// 导出数据
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { SENTENCES, ARTICLES, DAILY_WORDS, STUDY_TIPS, GRAMMAR_TOPICS, WRITING_TEMPLATES };
}
