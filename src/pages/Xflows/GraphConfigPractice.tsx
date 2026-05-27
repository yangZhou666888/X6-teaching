import React from 'react'
import { Graph } from '@antv/x6'
import { Snapline } from '@antv/x6-plugin-snapline'
import { Card, Row, Col, Typography, Divider } from 'antd'
import PageNav, { getPageNav } from '../../components/PageNav'

const { Title, Paragraph, Text } = Typography

const nodes = [
    {
        id: 'node1',
        x: 60,
        y: 60,
        width: 120,
        height: 40,
        label: '节点 1',
        attrs: {
            body: {
                stroke: '#597ef7',
                fill: '#d6e4ff',
                rx: 6,
                ry: 6,
            },
        },
    },
    {
        id: 'node2',
        x: 260,
        y: 160,
        width: 120,
        height: 40,
        label: '节点 2',
        attrs: {
            body: {
                stroke: '#597ef7',
                fill: '#d6e4ff',
                rx: 6,
                ry: 6,
            },
        },
    },
    {
        id: 'node3',
        x: 60,
        y: 160,
        width: 120,
        height: 40,
        label: '节点 3',
        attrs: {
            body: {
                stroke: '#52c41a',
                fill: '#d9f7be',
                rx: 6,
                ry: 6,
            },
        },
    },
]

const edges = [
    {
        source: 'node1',
        target: 'node2',
        attrs: {
            line: {
                stroke: '#597ef7',
                strokeWidth: 1,
            },
        },
    },
    {
        source: 'node1',
        target: 'node3',
        attrs: {
            line: {
                stroke: '#52c41a',
                strokeWidth: 1,
            },
        },
    },
]

// 1. 背景与网格
class BgGridGraph extends React.Component {
    private container: HTMLDivElement

    componentDidMount() {
        const graph = new Graph({
            container: this.container,
            width: 400,
            height: 250,
            // TODO: 设置背景颜色
            background: { color: '#455a84' },
            // TODO: 设置网格
            grid: {
                visible: true, // 显示网格
                // type: 'dot', // 网格类型：点状
                // type: 'mesh', // 网格类型：线状
                type: 'doubleMesh', // 网格类型：双线
                size: 10, // 网格间距
                args: {
                    color: '#a0a0a0', // 网格点颜色
                    thickness: 1, // 网格点大小
                },
            }
        })
        graph.addNodes(nodes)
        graph.addEdges(edges)
        graph.centerContent()
    }

    refContainer = (container: HTMLDivElement) => {
        this.container = container
    }

    render() {
        return <div ref={this.refContainer} />
    }
}

// 2. 缩放与平移
class ZoomPanGraph extends React.Component {
    private container: HTMLDivElement

    componentDidMount() {
        const graph = new Graph({
            container: this.container,
            width: 400,
            height: 250,
            background: { color: '#fff7e6' },
            grid: { visible: true, type: 'mesh', size: 20 },
            // TODO: 设置平移
            panning: {
                enabled: true, // 启用平移
            },
            // TODO: 设置缩放
            mousewheel: {
                enabled: true, // 启用鼠标滚轮缩放
            }
        })

        graph.addNodes(nodes)
        graph.addEdges(edges)
        graph.centerContent()
    }

    refContainer = (container: HTMLDivElement) => {
        this.container = container
    }

    render() {
        return <div ref={this.refContainer} />
    }
}

// 3. 对齐线插件
class SnaplineGraph extends React.Component {
    private container: HTMLDivElement

    componentDidMount() {
        const graph = new Graph({
            container: this.container,
            width: 400,
            height: 250,
            background: { color: '#f0f5ff' },
            grid: { visible: true, type: 'dot', size: 10 },
        })

        // TODO: 注册对齐线插件（必须在添加节点之前）
        graph.use(new Snapline())
        // 之前的写法
        // graph.use(
        //     new Snapline({
        //         enabled: true,
        //     }),
        // )

        graph.addNodes(nodes)
        graph.addEdges(edges)
        graph.centerContent()
    }

    refContainer = (container: HTMLDivElement) => {
        this.container = container
    }

    render() {
        return <div ref={this.refContainer} />
    }
}

// 4. 综合示例
class FullGraph extends React.Component {
    private container: HTMLDivElement

    componentDidMount() {
        const graph = new Graph({
            container: this.container,
            width: 400,
            height: 250,
            // TODO: 设置背景
            background: { color: '#fffbe6' },
            // TODO: 设置网格
            grid: {
                visible: true,
                type: 'doubleMesh',
                size: 20,
                args: {
                    color: '#a0a0a0',
                    thickness: 1,
                },
            },
            // TODO: 设置平移
            panning: {
                enabled: true,
            },
            // TODO: 设置缩放
            mousewheel: {
                enabled: true,
            },
        })

        // TODO: 注册对齐线插件
        graph.use(new Snapline({
            enabled: true,
        }))

        graph.addNodes(nodes)
        graph.addEdges(edges)
        graph.centerContent()
    }

    refContainer = (container: HTMLDivElement) => {
        this.container = container
    }

    render() {
        return <div ref={this.refContainer} />
    }
}

const GraphConfigPractice: React.FC = () => {
    return (
        <div style={{ padding: 24 }}>
            <Typography>
                <Title level={2}>X6 画布配置练习</Title>
                <Paragraph>
                    请根据 TODO 提示，补充每个画布的配置项。
                </Paragraph>
            </Typography>

            <Divider />

            <Row gutter={[16, 16]}>
                <Col span={12}>
                    <Card title="1. 背景与网格">
                        <Paragraph>
                            TODO: 设置 <Text code>background</Text> 背景颜色和 <Text code>grid</Text> 网格
                        </Paragraph>
                        <BgGridGraph />
                    </Card>
                </Col>

                <Col span={12}>
                    <Card title="2. 缩放与平移">
                        <Paragraph>
                            TODO: 设置 <Text code>panning</Text> 平移和 <Text code>mousewheel</Text> 缩放
                        </Paragraph>
                        <ZoomPanGraph />
                    </Card>
                </Col>
            </Row>

            <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
                <Col span={12}>
                    <Card title="3. 对齐线插件">
                        <Paragraph>
                            TODO: 使用 <Text code>graph.use(new Snapline(...))</Text> 注册插件
                        </Paragraph>
                        <SnaplineGraph />
                    </Card>
                </Col>

                <Col span={12}>
                    <Card title="4. 综合示例">
                        <Paragraph>
                            TODO: 组合以上所有配置
                        </Paragraph>
                        <FullGraph />
                    </Card>
                </Col>
            </Row>

            <PageNav {...getPageNav('/graph-config-practice')} />
        </div>
    )
}

export default GraphConfigPractice
