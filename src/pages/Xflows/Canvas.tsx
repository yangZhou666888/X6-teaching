import React from 'react'
import { Graph } from '@antv/x6'
import { Card, Row, Col, Typography, Divider } from 'antd'
import { Snapline } from '@antv/x6-plugin-snapline'
import PageNav, { getPageNav } from '../../components/PageNav'

const { Title, Paragraph, Text } = Typography

// 固定画布大小
class FixedSizeCanvas extends React.Component {
    private container: HTMLDivElement

    componentDidMount() {
        const graph = new Graph({
            container: this.container,
            width: 400,
            height: 250,
            background: {
                color: '#f0f5ff',
            },
        })

        graph.addNode({
            id: 'fixed1', // 节点唯一标识，用于边的 source/target 引用
            x: 50, // 节点左上角的 x 坐标（相对于画布）
            y: 50,// 节点左上角的 y 坐标（相对于画布）
            width: 120,// 节点宽度
            height: 40,// 节点高度
            label: '固定大小画布',// 节点显示的文字
            attrs: {
                body: {
                    stroke: '#597ef7',// 边框颜色
                    fill: '#d6e4ff',// 填充/背景颜色
                    rx: 6,// 圆角 x 半径
                    ry: 6,// 圆角 y 半径
                },
            },
        })

        graph.addNode({
            id: 'fixed2',
            x: 230,
            y: 150,
            width: 120,
            height: 40,
            label: '400 x 250',
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
            source: 'fixed1',
            target: 'fixed2',
            attrs: {
                line: {
                    stroke: '#597ef7',
                    strokeWidth: 1,
                },
            },
        })

        graph.use(
            new Snapline({
                enabled: true,
            }),
        )

        graph.centerContent()
    }

    refContainer = (container: HTMLDivElement) => {
        this.container = container
    }

    render() {
        return <div ref={this.refContainer} />
    }
}

// 容器大小（默认）
class ContainerSizeCanvas extends React.Component {
    private container: HTMLDivElement

    // 没有设置宽度和高度，默认是容器大小
    componentDidMount() {
        const graph = new Graph({
            container: this.container,
            background: {
                color: '#f6ffed',
            },
        })

        graph.addNode({
            id: 'container1',
            x: 80,
            y: 60,
            width: 140,
            height: 40,
            label: '容器大小画布',
            attrs: {
                body: {
                    stroke: '#52c41a',
                    fill: '#d9f7be',
                    rx: 6,
                    ry: 6,
                },
            },
        })

        graph.addNode({
            id: 'container2',
            x: 260,
            y: 140,
            width: 140,
            height: 40,
            label: '跟随容器',
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
            source: 'container1',
            target: 'container2',
            attrs: {
                line: {
                    stroke: '#52c41a',
                    strokeWidth: 1,
                },
            },
        })

        graph.use(
            new Snapline({
                enabled: true,
            }),
        )

        graph.centerContent()
    }

    refContainer = (container: HTMLDivElement) => {
        this.container = container
    }

    render() {
        return <div ref={this.refContainer} style={{ width: '100%', height: '250px' }} />
    }
}

// 自适应容器大小
class AutoResizeCanvas extends React.Component {
    private container: HTMLDivElement

    // 自适应容器大小
    // 容器大小变化时，画布会自动调整大小
    componentDidMount() {
        const graph = new Graph({
            container: this.container,
            autoResize: true, // 自适应容器大小
            background: {
                color: '#fff7e6',
            },
        })

        graph.addNode({
            id: 'auto1',
            x: 100,
            y: 80,
            width: 150,
            height: 40,
            label: '自适应画布',
            attrs: {
                body: {
                    stroke: '#fa8c16',
                    fill: '#ffe7ba',
                    rx: 6,
                    ry: 6,
                },
            },
        })

        graph.addNode({
            id: 'auto2',
            x: 350,
            y: 180,
            width: 150,
            height: 40,
            label: 'autoResize: true',
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
            source: 'auto1',// 起始节点的 id
            target: 'auto2', // 目标节点的 id
            attrs: {
                line: {// line 是选择器名称，对应边的路径线条
                    stroke: '#fa8c16',// 线条颜色
                    strokeWidth: 1,// 线条宽度
                },
            },
        })

        graph.use(
            new Snapline({
                enabled: true,
            }),
        )

        graph.centerContent()
    }

    refContainer = (container: HTMLDivElement) => {
        this.container = container
    }

    render() {
        return (
            <div style={{ width: '100%', height: '100%' }}>
                <div ref={this.refContainer} style={{ width: '100%', height: '250px' }} />
            </div>
        )
    }
}

// 不设置大小导致渲染失败
class NoSizeCanvas extends React.Component {
    private container: HTMLDivElement

    // 不设置大小导致渲染失败
    componentDidMount() {
        const graph = new Graph({
            container: this.container,
            background: {
                color: '#fff1f0',
            },
        })

        graph.addNode({
            id: 'nosize1',
            x: 50,
            y: 50,
            width: 150,
            height: 40,
            label: '无大小容器',
            attrs: {
                body: {
                    stroke: '#ff4d4f',
                    fill: '#ffccc7',
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

const CanvasDemo: React.FC = () => {
    return (
        <div style={{ padding: 24 }}>
            <Typography>
                <Title level={2}>X6 画布（Graph）学习</Title>
                <Paragraph>
                    X6 中的 <Text code>Graph</Text> 是一个容器，用来渲染和管理节点（Node）、边（Edge）以及其他图形元素。
                    画布本身也包含很多功能（缩放、网格、平移等等）。
                </Paragraph>
            </Typography>

            <Divider />

            <Title level={3}>画布大小设置方式</Title>

            <Row gutter={[16, 16]}>
                <Col span={12}>
                    <Card
                        title="1. 固定画布大小"
                        extra={<Text code>width: 400, height: 250</Text>}
                    >
                        <Paragraph>
                            通过设置 <Text code>width</Text> 和 <Text code>height</Text> 的固定数值来设置画布大小。
                        </Paragraph>
                        <FixedSizeCanvas />
                        <pre style={{ background: '#f5f5f5', padding: 12, marginTop: 12 }}>
                            {`const graph = new Graph({
  container: this.container,
  width: 400,
  height: 250,
})`}
                        </pre>
                    </Card>
                </Col>

                <Col span={12}>
                    <Card
                        title="2. 容器大小（默认）"
                        extra={<Text type="success">推荐</Text>}
                    >
                        <Paragraph>
                            不设置 <Text code>width</Text> 和 <Text code>height</Text>，默认以画布容器大小初始化。
                            需要容器有确定的尺寸。
                        </Paragraph>
                        <ContainerSizeCanvas />
                        <pre style={{ background: '#f5f5f5', padding: 12, marginTop: 12 }}>
                            {`const graph = new Graph({
  container: this.container,
  // 不设置 width 和 height
  // 容器需要设置 style={{ width: '100%', height: '250px' }}
})`}
                        </pre>
                    </Card>
                </Col>
            </Row>

            <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
                <Col span={12}>
                    <Card
                        title="3. 自适应容器大小"
                        extra={<Text code>autoResize: true</Text>}
                    >
                        <Paragraph>
                            设置 <Text code>autoResize: true</Text>，当容器大小改变时，画布大小也会自动重新计算。
                        </Paragraph>
                        <Paragraph type="warning">
                            注意：需要在外层容器设置 <Text code>width: '100%', height: '100%'</Text>
                        </Paragraph>
                        <AutoResizeCanvas />
                        <pre style={{ background: '#f5f5f5', padding: 12, marginTop: 12 }}>
                            {`<div style={{ width: '100%', height: '100%' }}>
  <div ref={this.refContainer} style={{ width: '100%', height: '250px' }} />
</div>

const graph = new Graph({
  container: this.container,
  autoResize: true,
})`}
                        </pre>
                    </Card>
                </Col>

                <Col span={12}>
                    <Card
                        title="4. 常见错误：容器无大小"
                        extra={<Text type="danger">避免</Text>}
                    >
                        <Paragraph>
                            如果容器没有设置大小，也没有设置 <Text code>width</Text> 和 <Text code>height</Text>，
                            会导致渲染不出画布。
                        </Paragraph>
                        <NoSizeCanvas />
                        <pre style={{ background: '#f5f5f5', padding: 12, marginTop: 12 }}>
                            {`// 错误示例：容器无大小
<div ref={this.refContainer} />
// 此时画布大小为 0，无法渲染

// 正确做法：设置容器大小
<div ref={this.refContainer} 
     style={{ width: '100%', height: '250px' }} />`}
                        </pre>
                    </Card>
                </Col>
            </Row>

            <Divider />

            <Title level={3}>常用配置项</Title>
            <Card>
                <pre style={{ background: '#f5f5f5', padding: 16 }}>
                    {`const graph = new Graph({
    container: this.container,
    
    // 画布大小（二选一）
    width: 800,              // 固定宽度
    height: 500,             // 固定高度
    // 或者
    autoResize: true,        // 自适应容器大小
    
    // 背景
    background: {
        color: '#f5f5f5',
    },
    
    // 网格
    grid: {
        visible: true,
        type: 'dot',
        size: 10,
    },
    
    // 缩放
    mousewheel: {
        enabled: true,
        modifiers: ['ctrl', 'meta'],
    },
    
    // 平移
    panning: {
        enabled: true,
    },
})`}
                </pre>
            </Card>

            <PageNav {...getPageNav('/canvas')} />
        </div>
    )
}

export default CanvasDemo
