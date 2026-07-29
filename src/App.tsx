import { useMemo } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { BracketsCurly, Cpu, GitBranch, HardDrives, MusicNotes, Sparkle, Waveform, SlidersHorizontal, PlayCircle, ImageSquare, GithubLogo, Robot, Package, ChartLineUp, UserFocus, Brain, Briefcase, Cards, ArrowRight, Phone, EnvelopeSimple, MapTrifold, Target, FilePdf } from '@phosphor-icons/react'
import { create } from 'zustand'
import './App.css'

type ProjectDetails = { context: string; strategy: string; architecture: string }
type ProjectNodeData = {
  label: string
  hoverText: string
  category: string
  summary: string
  outcome: string
  role: string
  productType: string
  stage: string
  metrics: string[]
  quadrant: 'ai' | 'hardware' | 'growth' | 'creative'
  github?: string
  details: ProjectDetails
}
type Project = { id: string; data: ProjectNodeData }

const projectImages: Record<string, string> = {
  'proj-dialog': new URL('../photos/AI-A1.png', import.meta.url).href,
  'proj-camera': new URL('../photos/AI-A2.png', import.meta.url).href,
  'proj-xiaobei': new URL('../photos/AI-A8.png', import.meta.url).href,
  'proj-print': new URL('../photos/AI-A10.png', import.meta.url).href,
  'proj-robotic': new URL('../photos/BOT-B1.png', import.meta.url).href,
}
type Experience = { company: string; time: string; role: string; note: string; x: number; y: number; lineHeight: number }
type PortfolioState = { selectedId: string | null; hoveredId: string | null; drawerOpen: boolean; selectNode: (id: string) => void; closeDrawer: () => void; setHoveredId: (id: string | null) => void }

const usePortfolioStore = create<PortfolioState>((set) => ({
  selectedId: null,
  hoveredId: null,
  drawerOpen: false,
  selectNode: (id) => set({ selectedId: id, drawerOpen: true }),
  closeDrawer: () => set({ drawerOpen: false, selectedId: null }),
  setHoveredId: (id) => set({ hoveredId: id }),
}))

const projects: Project[] = [
  {
    id: 'proj-dialog', data: {
      label: 'AI 对话模块【类 havivi】',
      hoverText: '以 Query 改写和意图过滤提升会话稳定性', 
      category: 'AI 对话 / 大模型基建', 
      productType: '无屏终端智能对话系统',
      role: '技术产品经理', 
      stage: '已上线 / 持续优化', 
      quadrant: 'ai',
      metrics: ['10→30 轮记忆', 'RAG 99.3%', '安全性 98%', 'DPO 数据集构建'], 
      summary: '负责无屏终端对话体验与记忆链路优化，解决旧意图污染和资源调度超时问题。', 
      outcome: '通过 Query 改写、意图过滤、RAG 与 DPO 后训练，将会话召回和安全性提升到可交付水平。',
      details: {
        context: '机器“转头就忘”且“听不懂人话”，缺乏真实沟通的陪伴感：用户在使用无屏AI设备时，刚放完音乐或故事机器就卡在旧状态里答非所问；且设备完全记不住自己的喜好和说过的话，聊了10句就上下文断层，感觉像在和一个“没有记忆的机械喇叭”说话。',
        strategy: '“前置意图清道夫 + 30轮分层超长记忆”交互架构：在用户说话前通过“Query改写+意图过滤”自动抹除旧任务干扰；同时建立结构化个人画像与会话切片向量检索，把机器的连续对话记忆能力从 10 轮直接拉长至 30 轮，并搭配 15 套真人人设 Prompt。并联合百度完成 DPO 后训练与安全 Limits 设定，自研爬虫构建 RAG，利用切片召回机制稳定接入历史对话。',
        architecture: '把“机械问答盒”变成“越用越懂你”的拟人化专属伙伴：用户不再遇到答非所问或状态卡死的烦恼（错误率降至5%）；设备能够像老朋友一样记住用户的个性细节并提供长效情感陪伴，显著提升了用户的日常使用意愿与留存率。'
      }
    }
  },

  {
    id: 'proj-xiaobei', data: {
      label: 'AI 桌面陪伴机器人产品线',
      hoverText: '从 0 到 1 负责定义、控本与量产落地', 
      category: 'AI 硬件 / 儿童陪伴', 
      productType: '桌面陪伴摆件',
      role: '产品定义/功能设计/功能测试', 
      stage: '已上市 / 已量产', 
      quadrant: 'hardware',
      metrics: ['2 个月 500 万', '1w+ 出货', '199 元定价', '4 月上市'], 
      summary: '主导情感陪伴桌面机器人定义，在成本红线内完成结构、交互与量产方案。', outcome: '去掉摄像头、用马达替代舵机、把自然语言触发映射到本地意图库，形成轻量级可量产机器人方案。',
      details: {
        context: '桌面摆件易沦为“三天新鲜感”的摆设，且缺乏真正管用的习惯培养机制：传统桌面智能硬件大多功能单一、交互枯燥，既无法提供长效的情感陪伴，也难以帮助儿童或职场人群真正建立自律习惯，用户新鲜感退去后极易被闲置吃灰。',
        strategy: '“正向行为激励养成体系 + 多版本分层场景化”产品设计：独创“完成任务—获得奖励—喂养桌宠—宠物成长”的桌宠养成游戏化闭环，将时间管理与任务提醒趣味化；同时基于同一硬件底座精准打穿陪伴版（情感交互）、时间管理版（习惯培养）及学习版（国学/诗词内容）差异化需求。',
        architecture: '实现高黏性用户陪伴，并创造上市2个月超500万元的商业爆发：成功将桌面摆件从“无感硬件”转化为“高频互动的陪伴伙伴”，大幅提升用户的每日留存与使用粘性；产品上市仅 2 个月全渠道销售额突破 500万元+（自有平台销量超1万台），实现了口碑与商业爆发的双赢。'
      }
    }
  },
/** 
  {
    id: 'proj-translation', data: {
      label: 'AI 口语训练机',
      hoverText: '以 user_id 为核心推动重构库表结构', 
      category: 'AI 硬件 / 教育场景', 
      productType: '青少年翻译硬件',
      role: '底层数据架构重构 / 场景体验设计', 
      stage: '试产 / 预计 10 月上市', 
      quadrant: 'hardware',
      metrics: ['换绑恢复率 100%', '多账号隔离', '口语陪练', '翻译 / 对话'], 
      summary: '围绕家庭共用和账号换绑场景，重构底层数据隔离和翻译展示体验。', 
      outcome: '实现账号切换后历史记录无缝恢复，并砍掉冗余概览页，让翻译体验更专注。',
      details: {
        context: '孩子“不敢开口、发音不准”，家长“不会辅导、没空监督”且担心看屏伤眼：儿童学习英语口语时常因害怕出错而不敢开口，传统设备单向跟读缺乏实时纠错；家长因自身发音有限或工作繁忙难以有效辅导，同时又极度焦虑电子屏幕对孩子视力的损伤和游戏分心问题。',
        strategy: '“无屏护眼硬件 + 多维AI实时纠音 + 场景化沉浸对话”闭环设计：采用无屏极简硬件杜绝视力伤害与屏显干扰；依托高精度 AI 语音引擎从准确度、流利度、语法等 5 大维度生成即时可视化的权威纠错报告；结合全真场景对话与 3 分钟 AI 分级测验，实现千人千面的自主常态化训练。',
        architecture: '解放家长辅导压力，让孩子低成本实现开口自由与应试能力双提升：彻底帮家长摆脱“陪读纠音”的负担，学习数据全量追溯可量化；孩子在无屏安全环境中建立开口自信、养成自主练习习惯，用极高的性价比打通了校内同步巩固与中高考/剑桥口语应试提分的学练闭环。'
      }
    }
  },
*/
  {
    id: 'proj-robotic',
    data: {
      label: 'AI机器人产品线',
      hoverText: '结构降本73%，让桌面机器人从百元走向千家万户',
      category: 'AI硬件 / 消费级机器人',
      productType: 'AI机器人产品线',
      role: '产品负责人',
      stage: '样机验证完成 / 推进量产中',
      quadrant: 'growth',
      metrics: ['执行机构降本 73%', 'BOM成本 ¥30 -> ¥8', '规划 4 款产品形态', '预设 15+ 动作组合'],
      summary: '通过“连杆代替舵机”实现极致降本，结合大模型意图映射，打造高性价比肢体互动机器人。',
      outcome: '将核心执行机构成本降低 73%，成功打通大模型至本地动作库的映射，赋能消费级机器人高毛利量产。',
      details: {
        context: '传统桌面机器人依赖多舵机（单执行机构成本>30元），BOM成本高昂；且设备多为单向语音问答，肢体动作与大模型大脑严重脱节，用户易产生新鲜感衰减。',
        strategy: '采用“2个马达牙箱+连杆机构”替代传统多舵机方案，将成本大幅降至约 8 元；同时设计“大模型意图到本地动作库”的映射机制与随机动作编排，实现软硬件实时协同。',
        architecture: '彻底摒弃单调语音问答，赋予机器人灵动的肢体语言；凭借 73% 的核心结构降本拓宽毛利空间与全渠道分销优势，推动端侧 AI 机器人走向千家万户。'
      }
    }
  },

  {
    id: 'proj-dog', data: {
      label: 'AI 机器狗产品线',
      hoverText: '围绕红外信号跟随定义核心交互', 
      category: '具身智能 / 交互定义', 
      productType: '机器狗产品系列',
      role: '产品架构定义 / 通信与结构协同', 
      stage: '打样 / 开模中', 
      quadrant: 'hardware',
      metrics: ['20+ 竞品调研', '2-4 元成本', '100% 成功率', '11 月上市'], 
      summary: '围绕养狗人士的心理诉求，定义机器狗的核心交互并推进量产可行性。', outcome: '完成仿真与八轮形态的全功能架构定义，并推动多模态可行性验证。',
      details: {
        context: '传统遥控玩具狗“机械呆板、无跟随互动”，而高端仿生机器狗动辄数千元高不可攀：市场上普通的智能机器狗大多只能按固定路径走动、缺乏真正的智能陪伴与“跟随”人动的人宠互动感；而具备视觉/雷达跟随的高端产品成本与售价过高，普通家庭和儿童玩家难以消费。',
        strategy: '“2-4元极低成本红外跟随方案 + 三形态多模态交互”产品规划：围绕仿生、卡通及八轮底盘三种形态定义产品线；创新设计红外信号跟随方案，仅需 2–4 元硬件成本即可实现机器狗根据遥控器方向持续平滑移动的智能“跟随”功能，并独立完成了核心动作库与通信流程定义。  ',
        architecture: '用极致性价比打造“养得起、会跟人”的下一代智能陪伴玩伴：在样机与室内环境中成功验证了超低成本的红外跟随功能，用极高的硬件性价比打破了传统跟随机器狗高昂的价格壁垒，产品已进入打样与开模阶段，为公司开辟了高潜力的陪伴玩具新阵地。  '
      }
    }
  },

  {
    id: 'proj-camera', data: {
      label: 'AI 相机',
      hoverText: '重构 Prompt 与知识库召回链路', 
      category: '视觉理解 / RAG 优化',
      productType: 'AI 相机视觉模块',
      role: '视觉业务梳理 / Prompt 与知识库优化', 
      stage: '已上市 / 持续优化', 
      quadrant: 'ai',
      metrics: ['幻觉率 12%→5%', '图生图 10s', '已上市', '成长相册'], 
      summary: '负责视觉分类、回答偏差和成长相册闭环优化，提升图像理解体验。', 
      outcome: '让图识别、图生图和成长相册形成闭环，并完成自动化精准打标。',
      details: {
        context: '照片堆积成“数字垃圾”缺乏互动感，且传统AI生成等待长、易失败且回答呆板：用户/儿童拍完照片后往往沦为沉寂的本地文件、难以分类整理；同时在使用拍摄衍生功能（如图生图、AI角色对话）时，经常遇到回答冗长跑题、生成等待时间长甚至直接报错失败的糟糕体验。',
        strategy: '“全链路CV自动分类相册 + 秒级图生图与精细化Prompt治理”：创新设计“拍摄—识别—分类—图生图—相册归档”自动链路，实现植物/动物/风景智能打标归档；优化图生图响应至 10 秒内并建立异常重试兜底，同时通过分步提示与 Few-shot 约束 System Prompt，将 AI 角色的错误及无关回答占比降至 5%。',
        architecture: '让普通拍照变为“记录+探索+趣味创作”的高流畅交互体验：将记录生活升级为可分类、可互动的成长回忆录；彻底解决了 AI 相机生成慢、易报错、答非所问的痛点，为用户打造出低延迟、高乐趣、内容安全的下一代智能影像玩伴。'
      }
    }
  },

  {
    id: 'proj-print', data: {
      label: 'AI 打印机',
      hoverText: '用低成本链路把准确率拉到 98%',
       category: '文生字 / 低成本落地', 
       productType: 'AI 打印机方案',
      role: '产品负责人', 
      stage: '9 月上市', 
      quadrant: 'creative',
      metrics: ['300 条样本', '98% 准确率', '2 周提速', '多风格输出'], 
      summary: '放弃高成本微调，改走数据清洗与后台合成的低成本路线。', 
      outcome: '把文生字准确率从 37%-51% 拉升到 98%，显著降低交付成本。',
      details: {
        context: 'AI直接打印经常“乱码打错字”，排版错乱耗时耗材：用户在使用AI标签打印机生成个性化文字或边框时，传统大模型直接出字方案存在严重的错字、漏字及文字结构异常（准确率仅 37%–51%），导致打出来的标签根本不能用，极其浪费时间与打印耗材并十分消耗用户耐心。',
        strategy: '“图文分离架构 + NLP结构化渲染”技术路线重构：摒弃单纯依赖模型微调的思路，推翻并重构为“NLP文本清洗及结构化JSON输出 + 预设底图与边框后台合成”技术路径；将文字由结构化数据精确控制，背景与插画由模板和文生图模型独立完成，实现图文解耦。',
        architecture: '打印准确率飙升至98%，让用户体验到“即想即打、一打即对”的极速创作：将文字打印准确率从原本的“不及格”直接提升至 98%，且研发周期缩短约 2 周；彻底解决了AI打印打错字、排版崩塌的致命体验缺陷，为用户提供稳定、高效且极具创意趣味的智能打印体验。  '
      }
    }
  },

  {
    id: 'proj-estate', data: {
      label: 'AI 物业管理系统',
      hoverText: '自然语言工单与多节点编排提效', 
      category: '物业 SaaS / 工作流自动化', 
      productType: 'AI 物业管理系统',
      role: '流程设计 / 数据分析 / MCP 工单编排', 
      stage: '已上线 / 持续运营', 
      quadrant: 'growth',
      metrics: ['30 秒内响应', '76.8% 满意度', '67% 提效', '近千用户'], 
      summary: '将自然语言工单与多节点编排接入物业场景，显著提升响应效率。', 
      outcome: '响应时长压缩到 30 秒内，满意度提升到 76.8%。',
      details: {
        context: '传统物业响应慢、办理流程繁琐，业主/客户办事“到处跑、等半天”：园区业主或租户在日常办理物业报修、咨询政策或提交诉求时，常遇到人工客服回复不及时、人工办理节点冗长、信息不透明等问题，导致体验差、满意度低。',
        strategy: '“结构化知识库 + 热力图流程精简”的智能体（Agent）服务架构：联合团队搭建 16 套结构化知识库，结合用户行为轨迹与热力图深度优化 Prompt 和交互节点，将物业服务流程精简 60% 以上，并基于 MCP 协议完成自然语言工单创建，实现多节点任务编排，平均响应时长压缩至 30 秒内。',
        architecture: '实现“秒级响应、一站式自助办理”，大幅提升园区客户满意度与使用率：日均服务近千名用户，将原本繁琐的物业沟通变为高效流畅的智能对话，功能使用率提升至 23.7%，客户满意度大幅提升至 76.8%，真正实现了物业服务的降本增效与数字化升级'
      }
    }
  },

  {
    id: 'proj-overseas', data: {
      label: '全球展会宣讲与外贸报价',
      hoverText: '展会、报价、BOM 一体化推进', 
      category: '出海商业化 / B 端销售', 
      productType: '海外大客户商业化方案',
      role: '商业化策略 / 需求收集 / 报价方案', 
      stage: '持续推进 / 商机储备', 
      quadrant: 'growth',
      metrics: ['6 场展会', '3 套方案', '6 次报价', '300 万商机'], 
      summary: '把 AI 产品包装成可售卖的商业方案，并推动海内外大客户订单落地。', 
      outcome: '完成海内外展会宣讲、BOM 核算和阶梯报价，形成标准化商业化打法。',
      details: {
        context: '精准破译海外头部客户与B端渠道的定制化诉求：面向 Moose Toys、沃尔玛、DP 等海外巨头及代理商，深入洞察其在消费级 AI 硬件领域的市场痛点与定制偏好，弥合国际客户需求与国内硬件研发之间的信息不对称与文化壁垒。',
        strategy: '“懂技术、精产品”的高效商务沟通与定制方案输出：作为产品负责人带队参加 6 场国内外展会完成技术演示与讲解；依托“AI大模型+硬件结构”复合背景，现场将客户模糊的商业想法快速转化为可落地的硬件功能定义与 3 套系统化定制方案。',
        architecture: '推动 300 万级商机闭环，展现强悍的跨部门核算与交付能力：协同研发、结构、供应链及采购团队完成精细化 BOM 核算、阶梯报价与交付评估；完成 6 次精准报价，成功撬动单笔最高 300 万元 的潜在商机，高效打通了 AI 硬件从展会对接、B端定制到商业变现的全链路。'
      }
    }
  },


  {
    id: 'proj-ecommerce', data: {
      label: '全栈仓储中台与电商',
      hoverText: '营业额增长 41%，协同效率同步提升', 
      category: '电商增长 / 仓储中台', 
      productType: '电商运营 + 仓储中台',
      role: '增长优化 / 中台设计 / 技术协同', 
      stage: '已上线 / 持续优化', 
      quadrant: 'growth',
      metrics: ['营业额 +41%', 'GMV 150 万+', '转化率 3.6%', '分布式锁'], 
      summary: '一边做增长，一边把仓储和数据协同能力搭成中台。', 
      outcome: '营业额提升 41%，并通过分布式锁和可视化系统提升协同效率。',
      details: {
        context: '多渠道库存割裂、履约链路漫长，导致库存积压与履约履约效率低下：电商业务在面对多平台分销与高并发订单时，常出现线上线下库存不互通、超卖漏单、拣货打包效率低以及缺货超卖等问题，导致运营成本居高不下且用户体验差。',
        strategy: '“全栈中台架构 + 数字化精细运营”双轮驱动：全栈主导仓储 WMS/OMS 中台的设计与开发，打通多渠道订单路由与实时库存同步；同时制定自动化拣货与履约流程，结合电商数据看板精细化调配库存与商品上下架策略，实现软硬件与供应链的高效协同。<br />采用 SpringBoot + MyBatis-Plus + Redis 开发仓储中台，引入分布式锁解决高并发冲突，打通跨部门集成。',
        architecture: '大幅降低库存周转天数，支撑百万级订单的高效平稳履约：实现库存准确率与发货履约效率显著提升，大幅降低了仓储物流与运营人力成本；成功保障了高并发促销场景下的无错履约，为全渠道销售突破与商业化增长提供了坚实的中台支撑。'
      }
    }
  },

  {
    id: 'proj-healing', data: {
      label: '疗愈型桌面机器人',
      hoverText: '用户研究驱动的情绪陪伴智能体', 
      category: '情绪陪伴 / 智能体', 
      productType: '疗愈型桌面机器人',
      role: '产品负责人', stage: '原型验证 / 软硬件整合', 
      quadrant: 'ai',
      metrics: ['5 家机构', '50+ 用户', '9 大场景', 'RAG 知识库'], 
      summary: '围绕职场心理健康构建轻量陪伴机器人，并完成智能体原型验证。', 
      outcome: '通过用户访谈和知识库建设，形成可落地的冥想与疏导闭环。',
      details: {
        context: '职场人群情绪压抑焦虑，传统心理疏导门槛高且普通机器缺乏“懂人的情感温度”：职场人在面临高压工作时常有焦虑与情绪低落等问题，但线下心理咨询成本高、门槛大，而市面上普通的智能硬件大多只有冷冰冰的指令问答，无法感知用户的微表情与情绪变化，难以提供精准、及时的心理疗愈与陪伴。',
        strategy: '“心理学知识库 + 多模态情绪感知 + Dify/Coze Agent”软硬件闭环：基于 50+ 目标用户及 5 家心理机构深度访谈，构建覆盖 9 类情绪场景的结构化知识库；基于 Dify 与 Coze 搭建 AI 智能体框架，将情绪识别、语音交互、引导式冥想与软硬件动作反馈打通，完成高保真原型验证。',
        architecture: '把冰冷的桌面硬件升级为“有温度、能共情”的职场心灵避风港：完成了从学术论文、用户心理需求分析到 PRD 及软硬件可行性方案的全链路闭环；实现了从微表情/语音到动作与引导式冥想的拟人化响应，为桌面陪伴机器人开辟了精准的疗愈细分场景。'
      }
    }
  },

  {
    id: 'proj-hikari', data: {
      label: 'GenerateMusic AI 音乐工作站',
      hoverText: '本地优先的多模态创作工作流', 
      category: '本地 AI / 多模态创作', 
      productType: '端侧音乐创作工作站',
      role: '产品规划 / 工作流设计 / 模型编排', 
      stage: '个人项目 / 持续迭代', 
      quadrant: 'creative',
      metrics: ['Tauri 2 + FastAPI', '本地优先', 'Model Marketplace', '多模态链路'], summary: '从一句话生成扩展到作词、编曲、封面生成与模型管理，完成端侧创作闭环。', outcome: '搭建本地优先的音乐创作工作站，兼顾隐私、体验与生成效率。', github: 'https://github.com/WeeKend-1220/GenerateMusic.git',
      details: {
        context: '“做 AI 硬件和 Demo 急需背景音乐，Suno 太贵，豆包和 Google 限制太多”：平时做产品原型和视频展示需要背景音，云端工具要么按次高额扣费，要么限制生成次数且有隐私隐患；而本地跑开源音乐模型又全是复杂的命令行，缺乏对 BPM、歌词及曲风的精细化控制',
        strategy: '用 AI 工具链全栈手撕“端云协同 + Local-First”音乐工作站：前端/后端：用 Tauri 2 + React 19 + Bun + FastAPI + uv 快速搭建跨平台桌面端。  端侧算力与 AI 闭环：基于 Apple MLX 加速与 ACE-Step 模型，将计算量最大的音频生成甩在本地；结合云端/本地 LLM 设计 Prompt 管道，将用户一句模糊的描述自动拆解为曲风、情绪、BPM 与结构化歌词。  多模态与模型生态：打通“文本作词 $\rightarrow$ 音频生成 $\rightarrow$ 图像封面”全链路，并手撕了一个 UI 化的 Model Marketplace，让用户能一键界面化下载和切换数十 GB 的模型权重',
        architecture: '0 成本实现“想法到音乐”的秒级验证，全栈工程与创客能力沉淀：不懂乐理也能一键或高级自定义生成完整歌曲，彻底解决自己做产品 Demo 时的 BGM 自由！  实现了翻唱（Cover）与局部重绘（Repaint）等高级音频对齐场景。  完美验证了“AI 工具辅助 + 全栈快速原型 + 端侧多模态大模型落地”的 Vibe Coding 闭环，源码已开源至 GitHub。'
      }
    }
  },
]

const experiences: Experience[] = [
  { 
    company: '广东省贝恩施科技股份有限公司', 
    time: '2025.10 - 至今', role: '产品经理', 
    note: '负责并参与 AI 机器人、AI 打印机、AI 对话模块等共计15个项目，2026年内预计上市 9 款产品。',
     x: 6, y: 80, lineHeight: 132 
    },

  {
   company: '天安数码城集团-深圳市智慧空间平台技术有限公司', 
    time: '2025.04 - 2025.07', role: 'AI 产品经理', 
    note: '完成物业 SaaS 中台优化与物业 Agent 设计研发，并推动桌面机器人 PoC 验证。', 
    x: 40, y: 32, lineHeight: 160 
  },

  { 
    company: '深圳市嘉明福科技有限公司', 
    time: '2022.07 - 2025.03',
    role: '电商运营 / 全栈工程师', 
    note: '负责电商运营与公司内部使用的仓储系统全栈开发，推进增长项目和仓储协同能力建设。', 
    x: 75, y: 92, lineHeight: 120 
  },
]

const hikariwave = projects.find((project) => project.id === 'proj-hikari')
const projectList = projects.filter((project) => project.id !== 'proj-hikari')
const capabilityCards = [
  { title: 'AI × 硬件集成', note: '模型能力落到真实设备', Icon: Robot },
  { title: '硬件产品定义', note: '成本、结构、交互一起算', Icon: Package },
  { title: '路线图管理', note: '拆版本、排优先级、推交付', Icon: MapTrifold },
  { title: '数据驱动迭代', note: '用指标找到体验问题', Icon: ChartLineUp },
  { title: '用户体验打磨', note: '把技术变成用户价值', Icon: UserFocus },
]

const personalProjectHighlights = [
  {
    title: 'Tauri 2 + FastAPI',
    note: '用跨端桌面壳承载 React 前端，后端负责模型编排、任务队列和本地文件管理，让创作链路稳定可扩展。',
    Icon: BracketsCurly,
  },
  {
    title: '本地优先',
    note: '把音频生成、模型权重和素材沉淀在用户设备侧，减少云端调用成本，同时保护未发布作品和 Prompt 隐私。',
    Icon: HardDrives,
  },
  {
    title: 'Model Marketplace',
    note: '把数十 GB 模型下载、校验、切换和版本管理做成可视化流程，降低普通用户使用开源模型的门槛。',
    Icon: Cpu,
  },
  {
    title: '多模态链路',
    note: '串联文本作词、曲风拆解、音频生成、封面生成和局部重绘，让一句想法可以进入完整音乐生产流。',
    Icon: GitBranch,
  },
]

function ProjectCard({ project, selected }: { project: Project; selected: boolean }) {
  const { hoveredId, setHoveredId, selectNode } = usePortfolioStore()
  const isHovered = hoveredId === project.id
  return (
    <button type="button" className={`project-card ${selected ? 'is-selected' : ''}`} onMouseEnter={() => setHoveredId(project.id)} onMouseLeave={() => setHoveredId(null)} onClick={() => selectNode(project.id)}>
      <div className="project-card__image">
        {projectImages[project.id] ? <img src={projectImages[project.id]} alt={project.data.label} loading="lazy" /> : <span>图片</span>}
      </div>
      <div className="project-card__top"><span>{project.data.category}</span><span>{project.data.stage}</span></div>
      <h3>{project.data.label}</h3>
      <p className="project-card__summary">{project.data.summary}</p>
      <div className="project-card__chips">{project.data.metrics.slice(0, 2).map((metric) => <span key={metric}>{metric}</span>)}</div>
      <AnimatePresence>{isHovered ? <motion.div className="project-card__hover" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }}>{project.data.hoverText}</motion.div> : null}</AnimatePresence>
    </button>
  )
}

export default function App() {
  const { selectedId, drawerOpen, closeDrawer } = usePortfolioStore()
  const selectedProject = useMemo(() => projects.find((project) => project.id === selectedId) ?? null, [selectedId])

  return (
    <div className="resume-page" onClick={() => closeDrawer()}>
      <main className="resume-sheet" onClick={(event) => event.stopPropagation()}>
        <section className="resume-hero">
          <div className="resume-hero__identity">
            <div>
              <p className="resume-hero__kicker"><Brain size={15} weight="duotone" /> AI Hardware Product Manager</p>
              <h1>王昆</h1>
              <p className="resume-hero__en">Karson</p>
            </div>
            <div className="resume-hero__positioning">
              <div className="resume-hero__proof-strip" aria-label="Karson key proof points">
                <div><Sparkle size={18} weight="duotone" /><strong>0→1</strong><span>AI 硬件定义</span></div>
                <div><Package size={18} weight="duotone" /><strong>量产</strong><span>产品销售额累计超千万</span></div>
                <div><ChartLineUp size={18} weight="duotone" /><strong>增长</strong><span>数据验证闭环</span></div>
              </div>
              <p>把大模型、端侧硬件和商业化路径接到一起，让 AI 产品从 Demo 走到量产。</p>
              <div className="resume-hero__contact-row">
                <span><Phone size={14} weight="duotone" />13662283240</span>
                <span><EnvelopeSimple size={14} weight="duotone" />2029466278@qq.com</span>
                <a href="/王昆.pdf" target="_blank" rel="noreferrer"><FilePdf size={14} weight="duotone" />查看简历 PDF</a>
              </div>
            </div>
          </div>
          <div className="resume-hero__proof">
            <div className="resume-hero__summary">
              <p className="resume-hero__summary-title"><Target size={26} weight="duotone" />核心优势</p>
              <div className="resume-hero__advantage-list">
                <div><strong>软硬件降本与工程落地; </strong><span>协同全链路团队，用“双马达连杆”替代多舵机降本 73%；重构 AI 打印机路线，将文字准确率提升至 98%。</span></div>
                <div><strong>大模型交互与架构深度; </strong><span>理解 Memory 分层、意图调度与 Prompt 治理，解决无屏设备意图污染，稳定支持 30+ 轮长对话。</span></div>
                <div><strong>Vibe Coding 原型验证; </strong><span>具备全栈开发背景，熟练运用 React、Tauri、FastAPI、LangChain 快速将 Idea 转化为高保真 Demo。</span></div>
              </div>
            </div>
            <div className="resume-hero__metrics">
              <div><strong>15+</strong><span>AI 硬件形态定义</span></div>
              <div><strong>6</strong><span>产品成功量产</span></div>
              <div><strong>500万+</strong><span>单品两月销售额</span></div>
            </div>
            <div className="resume-skills" aria-label="Capability Stack">
              {capabilityCards.map(({ title, note, Icon }) => (
                <div key={title} className="skill-card">
                  <Icon size={22} weight="duotone" />
                  <strong>{title}</strong>
                  <span>{note}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="resume-block resume-timeline-block">
          <div className="block-title"><h2><Briefcase size={34} weight="duotone" />工作经历</h2></div>
          <div className="timeline-area">
            {experiences.map((exp, index) => (
              <div key={exp.company} className="timeline-item" style={{ left: `${exp.x}%`, top: `${exp.y}px` }}>
                <div className="timeline-item__card"><strong>{exp.company}</strong><span>{exp.time}</span><p>{exp.role}</p><small>{exp.note}</small></div>
                {index < experiences.length - 1 ? <div className="timeline-item__line" style={{ height: `${exp.lineHeight}px` }} /> : null}
              </div>
            ))}
          </div>
        </section>

        <section className="resume-block resume-block--projects">
          <div className="block-title block-title--row"><div><h2><Cards size={34} weight="duotone" />项目经历</h2><p>点击你想了解的项目卡片即可了解更多</p></div><div className="carousel-indicator">横向浏览 <ArrowRight size={15} weight="bold" /></div></div>
          <div className="project-gallery project-gallery--expanded">
            <div className="project-gallery__scroll">
              <div className="project-gallery__cards project-gallery__cards--single-row">
                {projectList.map((project) => <ProjectCard key={project.id} project={project} selected={selectedId === project.id} />)}
              </div>
            </div>
            <div className="project-gallery__hint">点击任意卡片查看完整案例</div>
          </div>
        </section>

        <section className="resume-block resume-block--hikari">
          <div className="block-title"><h2><MusicNotes size={34} weight="duotone" />个人项目</h2></div>
          {hikariwave ? (
            <div className="hikariwave-hero">
              <div className="hikariwave-hero__copy">
                <p className="detail-panel__label"><MusicNotes size={15} weight="duotone" /> Personal Project · UX Case</p>
                <h3><span>GenerateMusic AI音乐工作站</span></h3>
                <p className="hikariwave-hero__lead">{hikariwave.data.summary} 核心目标不是只做“能生成”，而是把复杂参数、模型切换和多模态结果包装成用户能顺着走完的创作流程。</p>
                <div className="hikariwave-hero__ux-card">
                  <span><Sparkle size={15} weight="duotone" /> UX Focus</span>
                  <p>把专业模型能力压缩成「想法输入 → 结构化提示词 → 本地生成 → 试听微调 → 封面导出」的低心智路径，同时保留高级用户对歌词、BPM、曲风和局部重绘的控制权。</p>
                </div>
                <div className="hikariwave-hero__flow" aria-label="GenerateMusic AI workflow">
                  {[
                    { step: '一句话想法', Icon: Sparkle },
                    { step: '提示词拆解', Icon: SlidersHorizontal },
                    { step: '本地生成', Icon: Waveform },
                    { step: '试听重绘', Icon: PlayCircle },
                    { step: '封面导出', Icon: ImageSquare },
                  ].map(({ step, Icon }, index) => (
                    <div key={step} className="hikariwave-hero__flow-step"><Icon size={18} weight="duotone" /><span>{`0${index + 1}`}</span>{step}</div>
                  ))}
                </div>
                <div className="hikariwave-hero__footer">
                  <div className="detail-panel__meta">
                    <span>{hikariwave.data.category}</span>
                    <span>{hikariwave.data.stage}</span>
                    <span>{hikariwave.data.productType}</span>
                  </div>
                  {hikariwave.data.github ? <a className="hikariwave-hero__cta" href={hikariwave.data.github} target="_blank" rel="noreferrer"><GithubLogo size={18} weight="fill" /> 查看 GitHub</a> : null}
                </div>
              </div>
              <div className="hikariwave-hero__metrics">
                {personalProjectHighlights.map((item, index) => {
                  const Icon = item.Icon
                  return (
                    <div key={item.title} className="hikariwave-hero__metric">
                      <div className="hikariwave-hero__metric-icon"><Icon size={24} weight="duotone" /></div>
                      <span>{`0${index + 1}`} / Product Layer</span>
                      <strong>{item.title}</strong>
                      <p>{item.note}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          ) : null}
        </section>
      </main>

      <AnimatePresence>
        {drawerOpen && selectedProject ? (
          <>
            <motion.div className="drawer-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closeDrawer} />
            <motion.aside className="drawer" initial={{ x: '100%', opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: '100%', opacity: 0 }}>
              <div className="drawer__content" onClick={(event) => event.stopPropagation()}>
                <button type="button" className="drawer__close" onClick={closeDrawer}>Close</button>
                <p className="drawer__eyebrow">Project Detail</p>
                <h2>{selectedProject.data.productType}</h2>
                <div className="drawer__hero">
                  <div className="drawer__hero-head">
                    <div>
                      <p className="drawer__tag">{selectedProject.data.category}</p>
                      <h2>{selectedProject.data.productType}</h2>
                    </div>
                    <div className="drawer__status">{selectedProject.data.stage}</div>
                  </div>
                  <div className="drawer__hero-image">
                    {projectImages[selectedProject.id] ? <img src={projectImages[selectedProject.id]} alt={selectedProject.data.label} /> : null}
                  </div>
                  <p className="drawer__lead">{selectedProject.data.summary}</p>
                  <div className="drawer__hero-grid">
                    <div className="drawer__hero-panel"><span>Role</span><strong>{selectedProject.data.role}</strong></div>
                    <div className="drawer__hero-panel"><span>Outcome</span><strong>{selectedProject.data.outcome}</strong></div>
                  </div>
                  <div className="drawer__metrics-grid drawer__metrics-grid--hero">{selectedProject.data.metrics.map((metric) => <div key={metric} className="drawer__metric"><strong>{metric}</strong></div>)}</div>
                  {selectedProject.data.github ? <a className="drawer__github" href={selectedProject.data.github} target="_blank" rel="noreferrer">GitHub 项目链接</a> : null}
                </div>
                <div className="drawer__section-grid">
                  <div className="drawer__section drawer__section--card"><span>Problem</span><p>{selectedProject.data.details.context}</p></div>
                  <div className="drawer__section drawer__section--card"><span>Action</span><p>{selectedProject.data.details.strategy}</p></div>
                  <div className="drawer__section drawer__section--card"><span>Mechanism</span><p>{selectedProject.data.details.architecture}</p></div>
                </div>
              </div>
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
