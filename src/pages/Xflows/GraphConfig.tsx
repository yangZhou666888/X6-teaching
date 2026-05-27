import React from 'react'
import { Graph } from '@antv/x6'
import { Snapline } from '@antv/x6-plugin-snapline'
import { Card, Row, Col, Typography, Divider } from 'antd'
import PageNav, { getPageNav } from '../../components/PageNav'

const { Title, Paragraph, Text } = Typography

// 基础背景和网格
class BasicGridGraph extends React.Component {
    private container: HTMLDivElement

    componentDidMount() {
        const graph = new Graph({
            container: this.container, // 画布挂载的 DOM 容器
            width: 400, // 画布宽度（像素）
            height: 250, // 画布高度（像素）
            background: {
                color: '#F2F7FA', // 画布背景颜色
            },
            grid: {
                visible: true, // 是否显示网格
                type: 'dot', // 网格类型：'dot' 点状
                size: 10, // 网格间距（像素），节点移动的最小单位
                args: {
                    color: '#a0a0a0', // 网格点颜色
                    thickness: 1, // 网格点大小
                },
            },
        })

        graph.addNode({
            id: 'grid1', // 节点唯一标识
            x: 60, // 节点左上角 x 坐标
            y: 60, // 节点左上角 y 坐标
            width: 120, // 节点宽度
            height: 40, // 节点高度
            label: '网格对齐', // 节点显示的文字
            attrs: {
                body: {
                    stroke: '#597ef7', // 边框颜色
                    fill: '#d6e4ff', // 填充颜色
                    rx: 6, // 圆角 x 半径
                    ry: 6, // 圆角 y 半径
                },
            },
        })

        graph.addNode({
            id: 'grid2',
            x: 220,
            y: 160,
            width: 120,
            height: 40,
            label: 'size: 10',
            attrs: {
                body: {
                    stroke: '#597ef7',
                    fill: '#d6e4ff',
                    rx: 6,
                    ry: 6,
                },
            },
        })

        graph.addEdge({
            source: 'grid1', // 起始节点 id
            target: 'grid2', // 目标节点 id
            attrs: {
                line: {
                    stroke: '#597ef7', // 线条颜色
                    strokeWidth: 1, // 线条宽度
                },
            },
        })
    }

    refContainer = (container: HTMLDivElement) => {
        this.container = container
    }

    render() {
        return <div ref={this.refContainer} />
    }
}

// 网格类型：mesh
class MeshGridGraph extends React.Component {
    private container: HTMLDivElement

    componentDidMount() {
        const graph = new Graph({
            container: this.container, // 画布挂载的 DOM 容器
            width: 400, // 画布宽度
            height: 250, // 画布高度
            background: {
                color: '#f6ffed', // 浅绿色背景
            },
            grid: {
                visible: true, // 显示网格
                type: 'mesh', // 网格类型：'mesh' 线状网格
                size: 20, // 网格间距 20px
                args: {
                    color: '#ddd', // 网格线颜色
                    thickness: 1, // 网格线宽度
                },
            },
        })

        graph.addNode({
            id: 'mesh1',
            x: 80,
            y: 80,
            width: 120,
            height: 40,
            label: 'mesh 网格',
            attrs: {
                body: {
                    stroke: '#52c41a', // 绿色边框
                    fill: '#d9f7be', // 浅绿色填充
                    rx: 6,
                    ry: 6,
                },
            },
        })

        graph.addNode({
            id: 'mesh2',
            x: 240,
            y: 160,
            width: 120,
            height: 40,
            label: 'size: 20',
            attrs: {
                body: {
                    stroke: '#52c41a',
                    fill: '#d9f7be',
                    rx: 6,
                    ry: 6,
                },
            },
        })

        graph.addEdge({
            source: 'mesh1',
            target: 'mesh2',
            attrs: {
                line: {
                    stroke: '#52c41a', // 绿色线条
                    strokeWidth: 1,
                },
            },
        })
    }

    refContainer = (container: HTMLDivElement) => {
        this.container = container
    }

    render() {
        return <div ref={this.refContainer} />
    }
}

// 缩放和平移
class ZoomPanGraph extends React.Component {
    private container: HTMLDivElement

    componentDidMount() {
        const graph = new Graph({
            container: this.container, // 画布挂载的 DOM 容器
            width: 400, // 画布宽度
            height: 250, // 画布高度
            background: {
                color: '#fff7e6', // 浅橙色背景
            },
            grid: {
                visible: true, // 显示网格
                type: 'dot', // 点状网格
                size: 10, // 间距 10px
            },
            panning: {
                enabled: true, // 启用画布平移（按住鼠标拖拽）
            },
            mousewheel: {
                enabled: true, // 启用滚轮缩放
                modifiers: ['ctrl', 'meta'], // 需要按住 Ctrl 或 Cmd 键才触发缩放
            },
        })

        graph.addNode({
            id: 'zoom1',
            x: 50,
            y: 50,
            width: 140,
            height: 40,
            label: '拖拽画布平移',
            attrs: {
                body: {
                    stroke: '#fa8c16', // 橙色边框
                    fill: '#ffe7ba', // 浅橙色填充
                    rx: 6,
                    ry: 6,
                },
            },
        })

        graph.addNode({
            id: 'zoom2',
            x: 250,
            y: 150,
            width: 140,
            height: 40,
            label: 'Ctrl+滚轮缩放',
            attrs: {
                body: {
                    stroke: '#fa8c16',
                    fill: '#ffe7ba',
                    rx: 6,
                    ry: 6,
                },
            },
        })

        graph.addEdge({
            source: 'zoom1', // 起始节点 id
            target: 'zoom2', // 目标节点 id
            attrs: {
                line: {
                    stroke: '#fa8c16', // 橙色线条
                    strokeWidth: 1, // 线条宽度
                },
            },
        })
    }

    refContainer = (container: HTMLDivElement) => {
        this.container = container
    }

    render() {
        return <div ref={this.refContainer} />
    }
}

// 对齐线插件
class SnaplineGraph extends React.Component {
    private container: HTMLDivElement

    componentDidMount() {
        const graph = new Graph({
            container: this.container, // 画布挂载的 DOM 容器
            width: 400, // 画布宽度
            height: 250, // 画布高度
            background: {
                color: '#f0f5ff', // 浅蓝色背景
            },
            grid: {
                visible: true, // 显示网格
                type: 'dot', // 点状网格
                size: 10, // 间距 10px
            },
        })

        // 对齐线插件（必须在添加节点之前注册）
        graph.use(
            new Snapline({
                enabled: true, // 启用对齐线
            }),
        )

        graph.addNode({
            id: 'snap1',
            x: 80,
            y: 80,
            width: 120,
            height: 40,
            label: '拖动我',
            attrs: {
                body: {
                    stroke: '#722ed1', // 紫色边框
                    fill: '#efdbff', // 浅紫色填充
                    rx: 6,
                    ry: 6,
                },
            },
        })

        graph.addNode({
            id: 'snap2',
            x: 250,
            y: 160,
            width: 120,
            height: 40,
            label: '对齐线',
            attrs: {
                body: {
                    stroke: '#722ed1',
                    fill: '#efdbff',
                    rx: 6,
                    ry: 6,
                },
            },
        })

        graph.addNode({
            id: 'snap3',
            x: 80,
            y: 160,
            width: 120,
            height: 40,
            label: 'Snapline',
            attrs: {
                body: {
                    stroke: '#722ed1',
                    fill: '#efdbff',
                    rx: 6,
                    ry: 6,
                },
            },
        })
    }

    refContainer = (container: HTMLDivElement) => {
        this.container = container
    }

    render() {
        return <div ref={this.refContainer} />
    }
}

// 综合示例
class FullFeatureGraph extends React.Component {
    private container: HTMLDivElement

    componentDidMount() {
        const graph = new Graph({
            container: this.container, // 画布挂载的 DOM 容器
            width: 400, // 画布宽度
            height: 280, // 画布高度
            background: {
                color: '#fafafa', // 浅灰色背景
            },
            grid: {
                visible: true, // 显示网格
                type: 'dot', // 点状网格
                size: 10, // 间距 10px
                args: {
                    color: '#ccc', // 网格点颜色
                    thickness: 1, // 网格点大小
                },
            },
            panning: {
                enabled: true, // 启用画布平移
            },
            mousewheel: {
                enabled: true, // 启用滚轮缩放
                modifiers: ['ctrl', 'meta'], // 按住 Ctrl/Cmd 触发
            },
        })

        // 对齐线插件（必须在添加节点之前注册）
        graph.use(
            new Snapline({
                enabled: true, // 启用对齐线
            }),
        )

        // 创建流程图 - 开始节点
        graph.addNode({
            id: 'start', // 节点 id
            x: 150, // x 坐标
            y: 30, // y 坐标
            width: 100, // 宽度
            height: 40, // 高度
            label: '开始', // 显示文字
            attrs: {
                body: {
                    stroke: '#1890ff', // 蓝色边框
                    fill: '#bae7ff', // 浅蓝色填充
                    rx: 20, // 大圆角（椭圆效果）
                    ry: 20,
                },
            },
        })

        // 创建流程图 - 处理节点
        graph.addNode({
            id: 'process',
            x: 150,
            y: 110,
            width: 100,
            height: 40,
            label: '处理',
            attrs: {
                body: {
                    stroke: '#52c41a', // 绿色边框
                    fill: '#d9f7be', // 浅绿色填充
                    rx: 6, // 小圆角
                    ry: 6,
                },
            },
        })

        // 创建流程图 - 结束节点
        graph.addNode({
            id: 'end',
            x: 150,
            y: 190,
            width: 100,
            height: 40,
            label: '结束',
            attrs: {
                body: {
                    stroke: '#ff4d4f', // 红色边框
                    fill: '#ffccc7', // 浅红色填充
                    rx: 20, // 大圆角（椭圆效果）
                    ry: 20,
                },
            },
        })

        // 连接 开始 -> 处理
        graph.addEdge({
            source: 'start', // 起始节点 id
            target: 'process', // 目标节点 id
            attrs: {
                line: {
                    stroke: '#1890ff', // 蓝色线条
                    strokeWidth: 1, // 线条宽度
                },
            },
        })

        // 连接 处理 -> 结束
        graph.addEdge({
            source: 'process',
            target: 'end',
            attrs: {
                line: {
                    stroke: '#52c41a', // 绿色线条
                    strokeWidth: 1,
                },
            },
        })

        graph.centerContent() // 将内容居中显示
    }

    refContainer = (container: HTMLDivElement) => {
        this.container = container
    }

    render() {
        return <div ref={this.refContainer} />
    }
}

const GraphConfigDemo: React.FC = () => {
    return (
        <div style={{ padding: 24 }}>
            <Typography>
                <Title level={2}>X6 画布配置学习</Title>
                <Paragraph>
                    学习画布的背景、网格、缩放、平移以及插件的使用。
                </Paragraph>
            </Typography>

            <Divider />

            <Title level={3}>背景与网格</Title>

            <Row gutter={[16, 16]}>
                <Col span={12}>
                    <Card title="1. 基础网格 (dot)" extra={<Text code>type: 'dot'</Text>}>
                        <Paragraph>
                            点状网格，<Text code>size: 10</Text> 表示网格间距为 10px，
                            节点会自动吸附到网格上。
                        </Paragraph>
                        <BasicGridGraph />
                        <pre style={{ background: '#f5f5f5', padding: 12, marginTop: 12 }}>
                            {`const graph = new Graph({
    container: this.container,  // 挂载的 DOM 容器
    width: 400,                 // 画布宽度
    height: 250,                // 画布高度
    background: {
        color: '#F2F7FA',       // 背景颜色
    },
    grid: {
        visible: true,          // 显示网格
        type: 'dot',            // 点状网格
        size: 10,               // 间距 10px
        args: {
            color: '#a0a0a0',   // 网格点颜色
            thickness: 1,       // 网格点大小
        },
    },
})`}
                        </pre>
                    </Card>
                </Col>

                <Col span={12}>
                    <Card title="2. 线状网格 (mesh)" extra={<Text code>type: 'mesh'</Text>}>
                        <Paragraph>
                            线状网格，适合需要更明显参考线的场景。
                        </Paragraph>
                        <MeshGridGraph />
                        <pre style={{ background: '#f5f5f5', padding: 12, marginTop: 12 }}>
                            {`const graph = new Graph({
    container: this.container,  // 挂载的 DOM 容器
    width: 400,                 // 画布宽度
    height: 250,                // 画布高度
    background: {
        color: '#f6ffed',       // 浅绿色背景
    },
    grid: {
        visible: true,          // 显示网格
        type: 'mesh',           // 线状网格
        size: 20,               // 间距 20px
        args: {
            color: '#ddd',      // 网格线颜色
            thickness: 1,       // 网格线宽度
        },
    },
})`}
                        </pre>
                    </Card>
                </Col>
            </Row>

            <Divider />

            <Title level={3}>缩放与平移</Title>

            <Row gutter={[16, 16]}>
                <Col span={12}>
                    <Card title="3. 缩放与平移" extra={<Text code>panning + mousewheel</Text>}>
                        <Paragraph>
                            按住鼠标拖拽可以平移画布，按住 <Text code>Ctrl</Text> 或 <Text code>Meta</Text> 键滚动滚轮可以缩放。
                        </Paragraph>
                        <ZoomPanGraph />
                        <pre style={{ background: '#f5f5f5', padding: 12, marginTop: 12 }}>
                            {`const graph = new Graph({
    container: this.container,  // 挂载的 DOM 容器
    width: 400,                 // 画布宽度
    height: 250,                // 画布高度
    panning: {
        enabled: true,          // 启用画布平移
    },
    mousewheel: {
        enabled: true,          // 启用滚轮缩放
        modifiers: ['ctrl', 'meta'], // 按住 Ctrl/Cmd 触发
    },
})`}
                        </pre>
                    </Card>
                </Col>

                <Col span={12}>
                    <Card title="4. 对齐线插件" extra={<Text code>Snapline</Text>}>
                        <Paragraph>
                            拖动节点时会显示与其他节点的对齐线，帮助精确对齐。
                        </Paragraph>
                        <Paragraph type="warning">
                            注意：<Text code>graph.use()</Text> 必须在添加节点之前调用。
                        </Paragraph>
                        <SnaplineGraph />
                        <pre style={{ background: '#f5f5f5', padding: 12, marginTop: 12 }}>
                            {`import { Snapline } from '@antv/x6-plugin-snapline'

// 先注册插件（必须在 addNode 之前）
graph.use(
    new Snapline({
        enabled: true,  // 启用对齐线
    }),
)

// 再添加节点
graph.addNode(...)`}
                        </pre>
                    </Card>
                </Col>
            </Row>

            <Divider />

            <Title level={3}>综合示例</Title>

            <Row>
                <Col span={24}>
                    <Card title="5. 完整功能画布">
                        <Paragraph>
                            包含背景、网格、缩放、平移、对齐线的完整示例。
                            试着拖拽画布、缩放、拖动节点看看效果。
                        </Paragraph>
                        <FullFeatureGraph />
                        <pre style={{ background: '#f5f5f5', padding: 12, marginTop: 12 }}>
                            {`const graph = new Graph({
    container: this.container,  // 挂载的 DOM 容器
    width: 400,                 // 画布宽度
    height: 280,                // 画布高度
    background: {
        color: '#fafafa',       // 浅灰色背景
    },
    grid: {
        visible: true,          // 显示网格
        type: 'dot',            // 点状网格
        size: 10,               // 间距 10px
        args: {
            color: '#ccc',      // 网格点颜色
            thickness: 1,       // 网格点大小
        },
    },
    panning: {
        enabled: true,          // 启用画布平移
    },
    mousewheel: {
        enabled: true,          // 启用滚轮缩放
        modifiers: ['ctrl', 'meta'],
    },
})

// 注册对齐线插件（必须在 addNode 之前）
graph.use(new Snapline({ enabled: true }))

// 添加节点和边
graph.addNode({ id: 'start', ... })
graph.addEdge({ source: 'start', target: 'end', ... })

graph.centerContent() // 内容居中`}
                        </pre>
                    </Card>
                </Col>
            </Row>

            <Divider />

            <Title level={3}>网格类型速查</Title>
            <Card>
                <pre style={{ background: '#f5f5f5', padding: 16 }}>
                    {`// 点状网格
grid: {
    visible: true,   // 是否显示
    type: 'dot',     // 点状
    size: 10,        // 间距 10px
}

// 固定点状网格（缩放时点大小不变）
grid: {
    visible: true,
    type: 'fixedDot',
    size: 10,
}

// 线状网格
grid: {
    visible: true,
    type: 'mesh',
    size: 20,
}

// 双线网格（大小两种网格叠加）
grid: {
    visible: true,
    type: 'doubleMesh',
    args: [
        { color: '#eee', thickness: 1 },        // 小网格
        { color: '#ddd', thickness: 1, factor: 4 }, // 大网格（4倍间距）
    ],
}`}
                </pre>
            </Card>

            <PageNav {...getPageNav('/graph-config')} />
        </div>
    )
}

export default GraphConfigDemo
