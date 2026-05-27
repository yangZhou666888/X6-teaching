import React from 'react';
import { Button, Space } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { history } from '@umijs/max';

interface PageNavProps {
  prev?: { title: string; path: string };
  next?: { title: string; path: string };
}

const PageNav: React.FC<PageNavProps> = ({ prev, next }) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '24px 0',
        marginTop: 24,
        borderTop: '1px solid #f0f0f0',
      }}
    >
      <div>
        {prev && (
          <Button
            icon={<LeftOutlined />}
            onClick={() => history.push(prev.path)}
          >
            {prev.title}
          </Button>
        )}
      </div>
      <div>
        {next && (
          <Button
            type="primary"
            onClick={() => history.push(next.path)}
          >
            {next.title}
            <RightOutlined />
          </Button>
        )}
      </div>
    </div>
  );
};

export default PageNav;

export const TUTORIAL_PAGES = [
  { title: '画布学习', path: '/canvas' },
  { title: '画布配置', path: '/graph-config' },
  { title: '画布配置练习', path: '/graph-config-practice' },
  { title: '节点学习', path: '/node-demo' },
  { title: '边学习', path: '/edge-demo' },
  { title: '连接桩学习', path: '/port-demo' },
  { title: '连接桩练习', path: '/port-practice' },
  { title: '连接桩完整教学', path: '/port-full-demo' },
  { title: '工具教学', path: '/tools-demo' },
  { title: '对齐线教学', path: '/snapline-demo' },
  { title: '框选教学', path: '/selection-demo' },
  { title: '复制粘贴教学', path: '/clipboard-demo' },
  { title: '快捷键教学', path: '/keyboard-demo' },
  { title: '撤销重做教学', path: '/history-demo' },
  { title: '滚动画布教学', path: '/scroller-demo' },
  { title: '小地图教学', path: '/minimap-demo' },
];

export const getPageNav = (currentPath: string) => {
  const index = TUTORIAL_PAGES.findIndex(p => p.path === currentPath);
  const prev = index > 0 ? TUTORIAL_PAGES[index - 1] : undefined;
  const next = index < TUTORIAL_PAGES.length - 1 ? TUTORIAL_PAGES[index + 1] : undefined;
  return { prev, next };
};
