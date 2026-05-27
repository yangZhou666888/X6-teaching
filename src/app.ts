// 运行时配置

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState(): Promise<{ name: string }> {
  return { name: 'X6 Flow Tutorial' };
}

export const layout = () => {
  return {
    title: 'X6 流程图编辑器教学',
    logo: '/logo.svg',
    menu: {
      locale: false,
    },
    fixSiderbar: true,
    contentStyle: {
      paddingBottom: 24,
    },
  };
};
