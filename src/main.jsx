import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowUpRight,
  BookOpenCheck,
  Brain,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Languages,
  Mail,
  MessageCircle,
  MousePointer2,
  Phone,
  Search,
  Sparkles,
  Star,
  Target,
  Trophy
} from 'lucide-react';
import './styles.css';

const stats = [
  { value: '9类', label: '考试词库' },
  { value: '3万+', label: '覆盖词汇' },
  { value: 'AI', label: '翻译助学' },
  { value: 'SM-2', label: '科学复习' }
];

const words = [
  { word: 'radiant', sound: '/ˈreɪdiənt/', meaning: '光芒四射的；喜悦的', tag: 'CET-6' },
  { word: 'sustain', sound: '/səˈsteɪn/', meaning: '维持；支撑；经受', tag: '考研' },
  { word: 'clarity', sound: '/ˈklærəti/', meaning: '清晰；明确；透明', tag: 'IELTS' }
];

const features = [
  {
    title: '今日新词',
    type: '核心学习流程',
    desc: '每天一组高频词，释义、音标、例句和记忆状态集中呈现。',
    icon: BookOpenCheck,
    tone: 'green'
  },
  {
    title: '智能复习',
    type: 'SM-2 记忆节奏',
    desc: '根据掌握情况安排复习，把快忘的词优先拉回来。',
    icon: Clock3,
    tone: 'yellow'
  },
  {
    title: 'AI 查词翻译',
    type: '理解辅助',
    desc: '英译中、例句理解和同义词线索，帮用户少卡壳。',
    icon: Languages,
    tone: 'red'
  }
];

const strengths = [
  {
    icon: Target,
    title: '多考试覆盖',
    text: '覆盖 CET-4、CET-6、高考、PRETCO、考研、IELTS、TOEFL、GRE 等常见备考场景。'
  },
  {
    icon: Brain,
    title: '科学记忆节奏',
    text: '用复习间隔和掌握状态组织学习，减少盲目刷词。'
  },
  {
    icon: Sparkles,
    title: 'AI 辅助理解',
    text: '把翻译、解释、例句和查词放到学习流程里，理解更顺。'
  },
  {
    icon: CheckCircle2,
    title: '学习数据反馈',
    text: '今日进度、待复习、错词记录和词库切换都能清楚看到。'
  }
];

const contacts = [
  { label: '微信号', value: 'qazxsw01020304', icon: MessageCircle, action: 'copy' },
  {
    label: 'QQ 号',
    value: '2275803244',
    icon: Phone,
    action: 'qq',
    href: 'tencent://AddContact/?fromId=45&fromSubId=1&subcmd=all&uin=2275803244'
  },
  { label: '邮箱', value: '2275803244@qq.com', icon: Mail, action: 'mail', href: 'mailto:2275803244@qq.com' }
];

function App() {
  const [activeWord, setActiveWord] = useState(0);
  const [copied, setCopied] = useState('');

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveWord((index) => (index + 1) % words.length);
    }, 2600);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const elements = document.querySelectorAll('[data-reveal]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('isVisible');
        });
      },
      { threshold: 0.18 }
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const currentWord = useMemo(() => words[activeWord], [activeWord]);

  return (
    <main>
      <Hero currentWord={currentWord} activeWord={activeWord} setActiveWord={setActiveWord} />
      <ProductStory currentWord={currentWord} />
      <ScreenShowcase />
      <Features />
      <Strengths />
      <ContactInfo copied={copied} setCopied={setCopied} />
      <ContactFooter />
      <MobileDock setCopied={setCopied} />
    </main>
  );
}

function Hero({ currentWord, activeWord, setActiveWord }) {
  return (
    <section className="hero" id="home">
      <video
        className="heroVideo"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="assets/hero-study.mp4" type="video/mp4" />
      </video>
      <div className="heroImage" />
      <div className="heroOverlay" />
      <nav className="nav shell">
        <a className="brand" href="#home" aria-label="返回首页">
          <img alt="" src="assets/ciguang-app-icon-final.png" />
          <span>词光单词</span>
          <small>V2.0 Mini Program</small>
        </a>
        <div className="navLinks" aria-label="页面导航">
          <a href="#product">产品</a>
          <a href="#features">功能</a>
          <a href="#strengths">优势</a>
          <a href="#contact">体验</a>
        </div>
        <a className="navContact" href="#contact">
          <Mail size={18} />
          获取小程序
        </a>
      </nav>

      <div className="heroContent shell">
        <div className="heroCopy" data-reveal>
          <p className="eyebrow">
            <Star size={18} />
            AI Vocabulary Learning / WeChat Mini Program
          </p>
          <h1>让每个单词，都有一道记忆的光</h1>
          <p className="heroLead">
            词光单词是一款面向英语考试备考的微信小程序，集合多词库、AI 翻译、查词、错词本和科学复习，让背单词从硬记变成清楚的学习闭环。
          </p>
          <div className="heroActions">
            <a className="primaryAction" href="#features">
              查看核心功能
              <ArrowUpRight size={20} />
            </a>
            <a className="secondaryAction" href="#product">
              了解产品
            </a>
          </div>
        </div>

        <div className="heroPanel" data-reveal>
          <div className="wordCard">
            <div className="wordCardTop">
              <span>{currentWord.tag}</span>
              <Sparkles size={18} />
            </div>
            <strong>{currentWord.word}</strong>
            <em>{currentWord.sound}</em>
            <p>{currentWord.meaning}</p>
            <div className="wordActions">
              {words.map((item, index) => (
                <button
                  aria-label={`切换到 ${item.word}`}
                  className={index === activeWord ? 'activeDot' : ''}
                  key={item.word}
                  onClick={() => setActiveWord(index)}
                  type="button"
                />
              ))}
            </div>
          </div>
          <div className="miniMetrics">
            <span>今日新学 <b>24</b></span>
            <span>待复习 <b>18</b></span>
            <span>掌握率 <b>86%</b></span>
          </div>
        </div>
      </div>
      <a className="scrollCue" href="#product" aria-label="向下浏览">
        <MousePointer2 size={18} />
        Scroll
      </a>
    </section>
  );
}

function ProductStory({ currentWord }) {
  return (
    <section className="section productStory" id="product">
      <div className="shell twoCol">
        <div className="appVisual" data-reveal>
          <div className="phoneFrame">
            <div className="phoneHeader">
              <span><img alt="" src="assets/ciguang-app-icon-final.png" />词光单词</span>
              <Search size={18} />
            </div>
            <div className="studyCard">
              <small>今日速记</small>
              <h3>{currentWord.word}</h3>
              <p>{currentWord.meaning}</p>
              <button type="button">记住了</button>
            </div>
            <div className="reviewRows">
              <span>错词本 <b>12</b></span>
              <span>AI 翻译 <b>可用</b></span>
              <span>复习队列 <b>18</b></span>
            </div>
          </div>
          <div className="visualBadge">
            <Trophy size={22} />
            背词、复习、查词在一个小程序里完成
          </div>
        </div>
        <div className="intro" data-reveal>
          <p className="sectionKicker">Product Story</p>
          <h2>为备考用户做一个更轻的背词工具</h2>
          <p>
            词光单词面向四级、六级、高考、考研、雅思、托福、GRE 等英语学习场景。它把词库选择、每日新学、复习提醒、错词巩固和 AI 查词翻译放在一个小程序里，适合碎片时间打开学一组。
          </p>
          <div className="contactRows">
            <span>微信小程序</span>
            <span>AI 翻译云函数</span>
            <span>多词库备考</span>
          </div>
          <div className="statsGrid">
            {stats.map((item) => (
              <div className="stat" key={item.label}>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ScreenShowcase() {
  return (
    <section className="section screenShowcase" id="screens">
      <div className="shell">
        <div className="sectionHead" data-reveal>
          <p className="sectionKicker">Mini Program Screens</p>
          <h2>把真实学习路径展示出来</h2>
          <p>用小程序核心页面做成手机界面展示，让访问者第一眼看懂词光单词能怎么用。</p>
        </div>
        <div className="screenRail">
          <article className="screenMock learnScreen" data-reveal>
            <div className="screenTop">
              <span>今日速记</span>
              <Search size={16} />
            </div>
            <div className="wordSnapshot">
              <small>CET-6 今日词</small>
              <strong>clarity</strong>
              <p>清晰；明确；透明</p>
              <button type="button">记住了</button>
            </div>
            <div className="screenRows">
              <span>待复习 <b>18</b></span>
              <span>错词本 <b>12</b></span>
            </div>
          </article>

          <article className="screenMock reviewScreen" data-reveal>
            <div className="screenTop">
              <span>智能复习</span>
              <Clock3 size={16} />
            </div>
            <div className="progressRing">
              <strong>86%</strong>
              <span>今日掌握率</span>
            </div>
            <div className="reviewQueue">
              <span>SM-2 间隔复习</span>
              <span>优先拉回快忘词</span>
              <span>完成后自动进入下一组</span>
            </div>
          </article>

          <article className="screenMock translateScreen" data-reveal>
            <div className="screenTop">
              <span>AI 查词翻译</span>
              <Languages size={16} />
            </div>
            <div className="searchBox">输入单词或句子</div>
            <div className="translateCard">
              <small>radiant</small>
              <p>光芒四射的；喜悦的</p>
              <em>AI 例句、同义词、语境解释</em>
            </div>
          </article>

          <article className="screenMock mineScreen" data-reveal>
            <div className="screenTop">
              <span>我的学习</span>
              <Trophy size={16} />
            </div>
            <div className="profileBubble">
              <img alt="" src="assets/ciguang-app-icon-final.png" />
              <div>
                <strong>词光单词</strong>
                <span>连续学习 7 天</span>
              </div>
            </div>
            <div className="mineStats">
              <span><b>3万+</b>词汇</span>
              <span><b>9类</b>词库</span>
              <span><b>AI</b>辅助</span>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

function Features() {
  return (
    <section className="section features" id="features">
      <div className="shell">
        <div className="sectionHead" data-reveal>
          <p className="sectionKicker">Core Features</p>
          <h2>核心功能展示</h2>
          <p>把用户每天真正会用到的学习动作放在前面：新学、复习、查词、错词巩固。</p>
        </div>
        <div className="featureGrid">
          {features.map(({ icon: Icon, ...feature }) => (
            <article className={`featureCard ${feature.tone}`} data-reveal key={feature.title}>
              <div className="featureImage">
                <Icon size={58} />
                <span>{feature.type}</span>
              </div>
              <div className="featureInfo">
                <h3>{feature.title}</h3>
                <p>{feature.desc}</p>
                <a href="#contact">
                  了解体验
                  <ChevronRight size={18} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Strengths() {
  return (
    <section className="section strengths" id="strengths">
      <div className="shell">
        <div className="sectionHead" data-reveal>
          <p className="sectionKicker">Why It Works</p>
          <h2>为什么适合长期背词</h2>
          <p>宣传页重点不堆功能，而是讲清楚用户为什么愿意每天打开它。</p>
        </div>
        <div className="strengthGrid">
          {strengths.map(({ icon: Icon, title, text }) => (
            <article className="strengthCard" data-reveal key={title}>
              <div className="strengthIcon">
                <Icon size={28} />
              </div>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactInfo({ copied, setCopied }) {
  const copyContact = async (value) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(value);
      window.setTimeout(() => setCopied(''), 1600);
    } catch {
      setCopied('复制失败，请手动选择');
      window.setTimeout(() => setCopied(''), 1600);
    }
  };

  return (
    <section className="section contactInfo" id="contact-info">
      <div className="shell contactInfoShell">
        <div className="sectionHead" data-reveal>
          <p className="sectionKicker">Contact Developer</p>
          <h2>联系开发者，反馈建议或 Bug</h2>
          <p>联系方式来自小程序「我的 - 联系开发者」。用户遇到问题、想提建议或合作沟通，都可以从这里找到入口。</p>
        </div>
        <div className="contactCards">
          {contacts.map(({ action, href, icon: Icon, label, value }) => (
            <article className="contactCard" data-reveal key={label}>
              <div className="contactIcon">
                <Icon size={28} />
              </div>
              <span>{label}</span>
              <strong>{value}</strong>
              {action === 'copy' ? (
                <button onClick={() => copyContact(value)} type="button">
                  {copied === value ? '已复制' : '复制微信号'}
                </button>
              ) : action === 'qq' ? (
                <div className="contactActions">
                  <button onClick={() => copyContact(value)} type="button">
                    {copied === value ? '已复制' : '复制 QQ'}
                  </button>
                  <a className="contactAction" href={href}>
                    加好友
                  </a>
                </div>
              ) : (
                <a className="contactAction" href={href} rel="noreferrer" target="_blank">
                  发送邮件
                </a>
              )}
            </article>
          ))}
        </div>
        <div className="contactHint" data-reveal>
          {copied && copied !== '复制失败，请手动选择' ? '联系方式已复制到剪贴板' : copied || '欢迎提出建议或反馈 Bug'}
        </div>
      </div>
    </section>
  );
}

function ContactFooter() {
  return (
    <section className="contactFinal" id="contact">
      <div className="shell contactShell" data-reveal>
        <p className="sectionKicker">Start Now</p>
        <h2>打开词光单词，从今天开始积累词汇</h2>
        <p>
          这里后续可以放小程序码、客服微信、产品二维码或下载指引。你把正式图片发来后，我会把这一屏做成真正的转化收尾页。
        </p>
        <div className="footerActions">
          <a className="primaryAction" href="#contact-info">
            <Mail size={20} />
            放置小程序码
          </a>
          <a
            className="secondaryAction light"
            href="tencent://AddContact/?fromId=45&fromSubId=1&subcmd=all&uin=2275803244"
          >
            <MessageCircle size={20} />
            联系开发者
          </a>
        </div>
      </div>
    </section>
  );
}

function MobileDock({ setCopied }) {
  const copyQQ = async () => {
    try {
      await navigator.clipboard.writeText('2275803244');
      setCopied('2275803244');
      window.setTimeout(() => setCopied(''), 1600);
    } catch {
      setCopied('复制失败，请手动选择');
      window.setTimeout(() => setCopied(''), 1600);
    }
  };

  return (
    <div className="mobileDock" aria-label="手机端快捷联系">
      <button onClick={copyQQ} type="button">
        <Phone size={18} />
        复制 QQ
      </button>
      <a href="tencent://AddContact/?fromId=45&fromSubId=1&subcmd=all&uin=2275803244">
        <MessageCircle size={18} />
        加好友
      </a>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
