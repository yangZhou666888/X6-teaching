import { history } from '@umijs/max';
import { Button, Typography } from 'antd';
import {
  ArrowRightOutlined,
  DeploymentUnitOutlined,
  ForkOutlined,
  NodeIndexOutlined,
  PartitionOutlined,
  PlayCircleOutlined,
  GithubOutlined,
  CompressOutlined,
  BlockOutlined,
  CopyOutlined,
  HistoryOutlined,
  DragOutlined,
  HighlightOutlined,
  SelectOutlined,
} from '@ant-design/icons';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './index.less';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: <DeploymentUnitOutlined />,
    iconClass: styles.featureIconBlue,
    title: '画布基础',
    desc: '学习 X6 画布的创建方式，掌握固定大小、容器大小和自适应三种模式。',
    link: '/canvas',
  },
  {
    icon: <PartitionOutlined />,
    iconClass: styles.featureIconCyan,
    title: '节点学习',
    desc: '深入了解节点的创建、配置和自定义，包括形状、样式、标签等核心属性。',
    link: '/node-demo',
  },
  {
    icon: <NodeIndexOutlined />,
    iconClass: styles.featureIconAmber,
    title: '边学习',
    desc: '掌握边的连接方式、路径算法和样式配置，实现节点间的优雅连接。',
    link: '/edge-demo',
  },
  {
    icon: <ForkOutlined />,
    iconClass: styles.featureIconPurple,
    title: '连接桩',
    desc: '学习连接桩（Port）的概念和用法，实现精确的节点连接点控制。',
    link: '/port-demo',
  },
  {
    icon: <BlockOutlined />,
    iconClass: styles.featureIconBlue,
    title: '工具系统',
    desc: '掌握节点工具、边工具的使用，包括按钮、边界、调整大小等功能。',
    link: '/tools-demo',
  },
  {
    icon: <DragOutlined />,
    iconClass: styles.featureIconGreen,
    title: '对齐线',
    desc: '学习对齐线插件，实现节点拖动时的智能对齐辅助功能。',
    link: '/snapline-demo',
  },
  {
    icon: <SelectOutlined />,
    iconClass: styles.featureIconCyan,
    title: '框选功能',
    desc: '掌握选择与框选功能，包括点击选择、多选、框选以及相关配置。',
    link: '/selection-demo',
  },
  {
    icon: <CopyOutlined />,
    iconClass: styles.featureIconAmber,
    title: '复制粘贴',
    desc: '学习剪切板功能，实现节点和边的复制、剪切、粘贴操作。',
    link: '/clipboard-demo',
  },
  {
    icon: <HighlightOutlined />,
    iconClass: styles.featureIconPurple,
    title: '快捷键',
    desc: '掌握快捷键插件，为画布绑定键盘快捷键提升操作效率。',
    link: '/keyboard-demo',
  },
  {
    icon: <HistoryOutlined />,
    iconClass: styles.featureIconGreen,
    title: '撤销重做',
    desc: '学习历史记录功能，实现操作的撤销、重做以及批量操作。',
    link: '/history-demo',
  },
  {
    icon: <CompressOutlined />,
    iconClass: styles.featureIconCyan,
    title: '滚动画布',
    desc: '集成滚动画布插件，支持画布滚动和平移功能。',
    link: '/scroller-demo',
  },
  {
    icon: <CompressOutlined />,
    iconClass: styles.featureIconBlue,
    title: '小地图',
    desc: '集成小地图插件，提供全局视野，方便在大型流程图中快速导航。',
    link: '/minimap-demo',
  },
];

const learningPath = [
  { title: '基础入门', items: ['画布学习', '画布配置', '节点学习', '边学习', '连接桩学习'], color: '#4f46e5' },
  { title: '工具交互', items: ['工具教学', '对齐线', '框选功能', '复制粘贴', '快捷键', '撤销重做'], color: '#06b6d4' },
  { title: '进阶功能', items: ['滚动画布', '小地图'], color: '#10b981' },
];

const techStack = [
  { icon: 'X6', name: 'AntV X6', desc: '图编辑引擎', version: 'v2.19' },
  { icon: 'U', name: 'Umi Max', desc: '企业级框架', version: 'v4.x' },
  { icon: 'A', name: 'Ant Design', desc: 'UI 组件库', version: 'v5.x' },
  { icon: 'T', name: 'TypeScript', desc: '类型安全', version: 'v5.x' },
];

const HomePage: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<HTMLDivElement>(null);
  const techRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animations
      gsap.fromTo(`.${styles.heroBadge}`, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' });
      gsap.fromTo(`.${styles.heroTitle}`, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.2 });
      gsap.fromTo(`.${styles.heroDesc}`, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.4 });
      gsap.fromTo(`.${styles.heroActions}`, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.6 });
      gsap.fromTo(`.${styles.heroMetrics}`, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.8 });
      gsap.fromTo(`.${styles.heroVisual}`, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out', delay: 0.4 });
      gsap.fromTo(`.${styles.heroVisualNode}`, { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.7)', stagger: 0.15, delay: 0.8 });

      // Section animations
      const sections = [featuresRef, pathRef, techRef, ctaRef];
      sections.forEach(ref => {
        if (ref.current) {
          gsap.fromTo(ref.current.querySelectorAll(`.${styles.sectionLabel}, .${styles.sectionTitle}, .${styles.sectionDesc}`),
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, scrollTrigger: { trigger: ref.current, start: 'top 80%' } }
          );
        }
      });

      // Feature cards
      gsap.fromTo(`.${styles.featureCard}`, { opacity: 0, y: 60 }, {
        opacity: 1, y: 0, duration: 0.8, stagger: 0.08, ease: 'power3.out',
        scrollTrigger: { trigger: `.${styles.featuresGrid}`, start: 'top 85%' }
      });

      // Learning path
      gsap.fromTo(`.${styles.pathCard}`, { opacity: 0, x: -40 }, {
        opacity: 1, x: 0, duration: 0.7, stagger: 0.2, ease: 'power3.out',
        scrollTrigger: { trigger: `.${styles.pathGrid}`, start: 'top 85%' }
      });

      // Tech cards
      gsap.fromTo(`.${styles.techCard}`, { opacity: 0, y: 40, scale: 0.95 }, {
        opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: `.${styles.techGrid}`, start: 'top 85%' }
      });

      // CTA
      gsap.fromTo(`.${styles.ctaContent}`, { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 0.8,
        scrollTrigger: { trigger: `.${styles.ctaSection}`, start: 'top 75%' }
      });

      // Parallax
      gsap.to(`.${styles.heroGlowPrimary}`, { y: -50, scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: 1 } });
      gsap.to(`.${styles.heroGlowAccent}`, { y: 50, scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: 1 } });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className={styles.landingPage}>
      {/* Hero Section */}
      <section className={styles.heroSection} ref={heroRef}>
        <div className={styles.heroBgGrid} />
        <div className={styles.heroGlowPrimary} />
        <div className={styles.heroGlowAccent} />

        <div className={styles.heroContent}>
          <div className={styles.heroLeft}>
            <div className={styles.heroBadge}>
              <span className={styles.heroBadgeDot} />
              开源教学项目 · 13 个完整教程
            </div>

            <Typography.Title className={styles.heroTitle}>
              <span className={styles.heroTitleLine}>X6 流程图</span>
              <span className={styles.heroTitleLine}>
                <span className={styles.heroTitleGradient}>编辑器教学</span>
              </span>
            </Typography.Title>

            <Typography.Paragraph className={styles.heroDesc}>
              从零开始学习蚂蚁 AntV X6 图编辑引擎。通过 13 个精心设计的教程，
              涵盖画布、节点、边、连接桩、工具、插件等核心功能，助你快速掌握可视化编辑器开发。
            </Typography.Paragraph>

            <div className={styles.heroActions}>
              <Button type="primary" size="large" className={styles.btnPrimary} icon={<PlayCircleOutlined />} onClick={() => history.push('/canvas')}>
                开始学习
              </Button>
              <Button size="large" className={styles.btnGhost} icon={<GithubOutlined />} href="https://gitee.com" target="_blank">
                Gitee 源码
              </Button>
            </div>

            <div className={styles.heroMetrics}>
              <div className={styles.metricItem}>
                <span className={styles.metricValue}>13</span>
                <span className={styles.metricLabel}>教学模块</span>
              </div>
              <div className={styles.metricItem}>
                <span className={styles.metricValue}>30+</span>
                <span className={styles.metricLabel}>核心知识点</span>
              </div>
              <div className={styles.metricItem}>
                <span className={styles.metricValue}>50+</span>
                <span className={styles.metricLabel}>代码示例</span>
              </div>
              <div className={styles.metricItem}>
                <span className={styles.metricValue}>100%</span>
                <span className={styles.metricLabel}>中文注释</span>
              </div>
            </div>
          </div>

          <div className={styles.heroRight}>
            <div className={styles.heroVisual}>
              <div className={styles.heroVisualRing} />
              <div className={styles.heroVisualRingInner} />
              <div className={styles.heroVisualCenter}>X6</div>
              <div className={styles.heroVisualNode1}>Graph</div>
              <div className={styles.heroVisualNode2}>Node</div>
              <div className={styles.heroVisualNode3}>Edge</div>
              <div className={styles.heroVisualNode4}>Port</div>
              <div className={styles.heroVisualNode5}>Tool</div>
              <div className={styles.heroVisualNode6}>Plugin</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.featuresSection} ref={featuresRef}>
        <div className={styles.featuresSectionBg} />
        <div style={{ position: 'relative', zIndex: 2, maxWidth: 1400, margin: '0 auto' }}>
          <div>
            <span className={styles.sectionLabel}>教程内容</span>
            <Typography.Title className={styles.sectionTitle}>全面覆盖 X6 核心功能</Typography.Title>
            <Typography.Paragraph className={styles.sectionDesc}>
              从基础的画布、节点、边，到进阶的工具系统、插件使用，每个教程都包含交互式演示和详细代码。
            </Typography.Paragraph>
          </div>

          <div className={styles.featuresGrid}>
            {features.map((feature, index) => (
              <div key={index} className={styles.featureCard} onClick={() => history.push(feature.link)}>
                <div className={feature.iconClass}>{feature.icon}</div>
                <Typography.Title level={4} className={styles.featureTitle}>{feature.title}</Typography.Title>
                <Typography.Paragraph className={styles.featureDesc}>{feature.desc}</Typography.Paragraph>
                <span className={styles.featureLink}>查看教程 <ArrowRightOutlined /></span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Path Section */}
      <section className={styles.pathSection} ref={pathRef}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <div>
            <span className={styles.sectionLabel}>学习路径</span>
            <Typography.Title className={styles.sectionTitle}>循序渐进，从入门到精通</Typography.Title>
            <Typography.Paragraph className={styles.sectionDesc}>
              我们为你规划了清晰的学习路径，建议按照顺序学习，逐步掌握 X6 的全部功能。
            </Typography.Paragraph>
          </div>

          <div className={styles.pathGrid}>
            {learningPath.map((group, index) => (
              <div key={index} className={styles.pathCard}>
                <div className={styles.pathCardHeader} style={{ borderColor: group.color }}>
                  <span className={styles.pathStep} style={{ background: group.color }}>{index + 1}</span>
                  <Typography.Title level={4} className={styles.pathTitle}>{group.title}</Typography.Title>
                </div>
                <div className={styles.pathItems}>
                  {group.items.map((item, i) => (
                    <div key={i} className={styles.pathItem}>
                      <span className={styles.pathDot} style={{ background: group.color }} />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className={styles.techSection} ref={techRef}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <div>
            <span className={styles.sectionLabel}>技术栈</span>
            <Typography.Title className={styles.sectionTitle}>基于主流技术构建</Typography.Title>
            <Typography.Paragraph className={styles.sectionDesc}>
              使用企业级技术栈，确保代码质量和开发体验。
            </Typography.Paragraph>
          </div>

          <div className={styles.techGrid}>
            {techStack.map((tech, index) => (
              <div key={index} className={styles.techCard}>
                <div className={styles.techLogo}>{tech.icon}</div>
                <Typography.Title level={5} className={styles.techName}>{tech.name}</Typography.Title>
                <Typography.Text className={styles.techDesc}>{tech.desc}</Typography.Text>
                <span className={styles.techVersion}>{tech.version}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection} ref={ctaRef}>
        <div className={styles.ctaGlow} />
        <div className={styles.ctaContent}>
          <Typography.Title className={styles.ctaTitle}>准备好开始学习了吗？</Typography.Title>
          <Typography.Paragraph className={styles.ctaDesc}>
            从画布基础开始，一步步掌握 X6 流程图编辑器的核心功能。
          </Typography.Paragraph>
          <div className={styles.ctaActions}>
            <Button type="primary" size="large" className={styles.btnPrimary} icon={<PlayCircleOutlined />} onClick={() => history.push('/canvas')}>
              开始学习
            </Button>
            <Button size="large" className={styles.btnGhost} icon={<GithubOutlined />} href="https://gitee.com" target="_blank">
              Gitee 源码
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footerSection}>
        <Typography.Text className={styles.footerText}>
          X6 流程图编辑器教学 · 基于{' '}
          <a className={styles.footerLink} href="https://x6.antv.antgroup.com/" target="_blank" rel="noopener noreferrer">AntV X6</a>
          {' '}构建 · 欢迎 Star & Fork
        </Typography.Text>
      </footer>
    </div>
  );
};

export default HomePage;
