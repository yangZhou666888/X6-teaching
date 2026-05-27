import React from 'react'
import { Graph } from '@antv/x6'
import { MiniMap } from '@antv/x6-plugin-minimap'
import { Card, Row, Col, Typography, Divider } from 'antd'
import PageNav, { getPageNav } from '../../components/PageNav';

const { Title, Paragraph, Text } = Typography

// 1. 基础小地图
class BasicMinimapGraph extends React.Component {
    private graphContainer!: HTMLDivElement
    private minimapContainer!: HTMLDivElement

    componentDidMount() {
        const graph = new Graph({
            container: this.graphContainer,
            width: 500,
            height: 300,
            background: { color: '#f5f5f5' },
            grid: { visible: true, type: 'dot', size: 10 },
            panning: { enabled: true },
            mousewheel: { enabled: true, modifiers: ['ctrl', 'meta'] },
        })

        // 注册小地图插件
        graph.use(
            new MiniMap({
                container: this.minimapContainer,
                width: 200,
                height: 150,
                padding: 10,
            })
        )

        // 添加节点
        graph.addNode({
            id: 'node1',
            x: 50,
            y: 50,
            width: 120,
            height: 50,
            label: '节点 1',
            attrs: { body: { stroke: '#597ef7', fill: '#d6e4ff', rx: 6, ry: 6 } },
        })

        graph.addNode({
            id: 'node2',
            x: 250,
            y: 150,
            width: 120,
            height: 50,
            label: '节点 2',
            attrs: { body: { stroke: '#52c41a', fill: '#d9f7be', rx: 6, ry: 6 } },
        })

        graph.addNode({
            id: 'node3',
            x: 450,
            y: 80,
            width: 120,
            height: 50,
            label: '节点 3',
            attrs: { body: { stroke: '#fa8c16', fill: '#ffe7ba', rx: 6, ry: 6 } },
        })

        graph.addNode({
            id: 'node4',
            x: 350,
            y: 250,
            width: 120,
            height: 50,
            label: '节点 4',
            attrs: { body: { stroke: '#722ed1', fill: '#efdbff', rx: 6, ry: 6 } },
        })

        // 添加边
        graph.addEdge({
            source: 'node1',
            target: 'node2',
            attrs: { line: { stroke: '#597ef7', strokeWidth: 2 } },
        })

        graph.addEdge({
            source: 'node2',
            target: 'node3',
            attrs: { line: { stroke: '#52c41a', strokeWidth: 2 } },
        })

        graph.addEdge({
            source: 'node2',
            target: 'node4',
            attrs: { line: { stroke: '#fa8c16', strokeWidth: 2 } },
        })

        graph.centerContent()
    }

    refGraphContainer = (container: HTMLDivElement) => {
        this.graphContainer = container
    }

    refMinimapContainer = (container: HTMLDivElement) => {
        this.minimapContainer = container
    }

    render() {
        return (
            <div style={{ display: 'flex', gap: 16 }}>
                <div ref={this.refGraphContainer} style={{ border: '1px solid #d9d9d9' }} />
                <div>
                    <div style={{ marginBottom: 8, fontWeight: 'bold' }}>小地图</div>
                    <div ref={this.refMinimapContainer} style={{ border: '1px solid #d9d9d9' }} />
                </div>
            </div>
        )
    }
}

// 2. 可缩放小地图
class ScalableMinimapGraph extends React.Component {
    private graphContainer!: HTMLDivElement
    private minimapContainer!: HTMLDivElement

    componentDidMount() {
        const graph = new Graph({
            container: this.graphContainer,
            width: 500,
            height: 300,
            background: { color: '#f5f5f5' },
            grid: { visible: true, type: 'dot', size: 10 },
            panning: { enabled: true },
            mousewheel: { enabled: true, modifiers: ['ctrl', 'meta'] },
        })

        // 可缩放的小地图
        graph.use(
            new MiniMap({
                container: this.minimapContainer,
                width: 200,
                height: 150,
                padding: 10,
                scalable: true,      // 支持缩放操作
                minScale: 0.01,      // 最小缩放比例
                maxScale: 16,        // 最大缩放比例
            })
        )

        // 创建流程图
        graph.addNode({ id: 'start', x: 200, y: 30, width: 100, height: 40, label: '开始', attrs: { body: { stroke: '#1890ff', fill: '#bae7ff', rx: 20, ry: 20 } } })
        graph.addNode({ id: 'process1', x: 200, y: 110, width: 100, height: 40, label: '处理 1', attrs: { body: { stroke: '#52c41a', fill: '#d9f7be', rx: 6, ry: 6 } } })
        graph.addNode({ id: 'process2', x: 200, y: 190, width: 100, height: 40, label: '处理 2', attrs: { body: { stroke: '#52c41a', fill: '#d9f7be', rx: 6, ry: 6 } } })
        graph.addNode({ id: 'end', x: 200, y: 270, width: 100, height: 40, label: '结束', attrs: { body: { stroke: '#ff4d4f', fill: '#ffccc7', rx: 20, ry: 20 } } })

        graph.addEdge({ source: 'start', target: 'process1', attrs: { line: { stroke: '#1890ff', strokeWidth: 2 } } })
        graph.addEdge({ source: 'process1', target: 'process2', attrs: { line: { stroke: '#52c41a', strokeWidth: 2 } } })
        graph.addEdge({ source: 'process2', target: 'end', attrs: { line: { stroke: '#ff4d4f', strokeWidth: 2 } } })

        graph.centerContent()
    }

    refGraphContainer = (container: HTMLDivElement) => {
        this.graphContainer = container
    }

    refMinimapContainer = (container: HTMLDivElement) => {
        this.minimapContainer = container
    }

    render() {
        return (
            <div style={{ display: 'flex', gap: 16 }}>
                <div ref={this.refGraphContainer} style={{ border: '1px solid #d9d9d9' }} />
                <div>
                    <div style={{ marginBottom: 8, fontWeight: 'bold' }}>可缩放小地图</div>
                    <div ref={this.refMinimapContainer} style={{ border: '1px solid #d9d9d9' }} />
                </div>
            </div>
        )
    }
}

// 3. 小地图 + 对齐线
class MinimapWithSnaplineGraph extends React.Component {
    private graphContainer!: HTMLDivElement
    private minimapContainer!: HTMLDivElement

    componentDidMount() {
        const graph = new Graph({
            container: this.graphContainer,
            width: 500,
            height: 300,
            background: { color: '#f5f5f5' },
            grid: { visible: true, type: 'dot', size: 10 },
            panning: { enabled: true },
            mousewheel: { enabled: true, modifiers: ['ctrl', 'meta'] },
        })

        // 小地图
        graph.use(
            new MiniMap({
                container: this.minimapContainer,
                width: 200,
                height: 150,
                padding: 10,
            })
        )

        // 对齐线（必须在添加节点之前注册）
        const { Snapline } = require('@antv/x6-plugin-snapline')
        graph.use(new Snapline({ enabled: true }))

        // 添加节点
        graph.addNode({ id: 'n1', x: 80, y: 50, width: 120, height: 50, label: '拖动我', attrs: { body: { stroke: '#597ef7', fill: '#d6e4ff', rx: 6, ry: 6 } } })
        graph.addNode({ id: 'n2', x: 280, y: 50, width: 120, height: 50, label: '对齐线', attrs: { body: { stroke: '#52c41a', fill: '#d9f7be', rx: 6, ry: 6 } } })
        graph.addNode({ id: 'n3', x: 80, y: 180, width: 120, height: 50, label: '小地图', attrs: { body: { stroke: '#fa8c16', fill: '#ffe7ba', rx: 6, ry: 6 } } })
        graph.addNode({ id: 'n4', x: 280, y: 180, width: 120, height: 50, label: '拖动画布', attrs: { body: { stroke: '#722ed1', fill: '#efdbff', rx: 6, ry: 6 } } })

        graph.addEdge({ source: 'n1', target: 'n2', attrs: { line: { stroke: '#597ef7', strokeWidth: 2 } } })
        graph.addEdge({ source: 'n1', target: 'n3', attrs: { line: { stroke: '#52c41a', strokeWidth: 2 } } })
        graph.addEdge({ source: 'n2', target: 'n4', attrs: { line: { stroke: '#fa8c16', strokeWidth: 2 } } })
        graph.addEdge({ source: 'n3', target: 'n4', attrs: { line: { stroke: '#722ed1', strokeWidth: 2 } } })

        graph.centerContent()
    }

    refGraphContainer = (container: HTMLDivElement) => {
        this.graphContainer = container
    }

    refMinimapContainer = (container: HTMLDivElement) => {
        this.minimapContainer = container
    }

    render() {
        return (
            <div style={{ display: 'flex', gap: 16 }}>
                <div ref={this.refGraphContainer} style={{ border: '1px solid #d9d9d9' }} />
                <div>
                    <div style={{ marginBottom: 8, fontWeight: 'bold' }}>小地图 + 对齐线</div>
                    <div ref={this.refMinimapContainer} style={{ border: '1px solid #d9d9d9' }} />
                </div>
            </div>
        )
    }
}

// 4. 自定义样式小地图
class CustomMinimapGraph extends React.Component {
    private graphContainer!: HTMLDivElement
    private minimapContainer!: HTMLDivElement

    componentDidMount() {
        const graph = new Graph({
            container: this.graphContainer,
            width: 500,
            height: 300,
            background: { color: '#fafafa' },
            grid: { visible: true, type: 'dot', size: 10 },
            panning: { enabled: true },
            mousewheel: { enabled: true, modifiers: ['ctrl', 'meta'] },
        })

        // 自定义样式的小地图
        graph.use(
            new MiniMap({
                container: this.minimapContainer,
                width: 180,
                height: 120,
                padding: 5,
                scalable: false,  // 不支持缩放
            })
        )

        // 添加节点
        graph.addNode({ id: 'a', x: 100, y: 50, width: 80, height: 40, label: 'A', attrs: { body: { stroke: '#597ef7', fill: '#d6e4ff', rx: 6, ry: 6 } } })
        graph.addNode({ id: 'b', x: 300, y: 50, width: 80, height: 40, label: 'B', attrs: { body: { stroke: '#52c41a', fill: '#d9f7be', rx: 6, ry: 6 } } })
        graph.addNode({ id: 'c', x: 200, y: 180, width: 80, height: 40, label: 'C', attrs: { body: { stroke: '#fa8c16', fill: '#ffe7ba', rx: 6, ry: 6 } } })

        graph.addEdge({ source: 'a', target: 'b', attrs: { line: { stroke: '#597ef7', strokeWidth: 2 } } })
        graph.addEdge({ source: 'a', target: 'c', attrs: { line: { stroke: '#52c41a', strokeWidth: 2 } } })
        graph.addEdge({ source: 'b', target: 'c', attrs: { line: { stroke: '#fa8c16', strokeWidth: 2 } } })

        graph.centerContent()
    }

    refGraphContainer = (container: HTMLDivElement) => {
        this.graphContainer = container
    }

    refMinimapContainer = (container: HTMLDivElement) => {
        this.minimapContainer = container
    }

    render() {
        return (
            <div style={{ display: 'flex', gap: 16 }}>
                <div ref={this.refGraphContainer} style={{ border: '1px solid #d9d9d9' }} />
                <div>
                    <div style={{ marginBottom: 8, fontWeight: 'bold' }}>自定义样式小地图</div>
                    <div ref={this.refMinimapContainer} style={{ border: '1px solid #d9d9d9', borderRadius: 8, overflow: 'hidden' }} />
                </div>
            </div>
        )
    }
}

const MinimapDemo: React.FC = () => {
    return (
        <div style={{ padding: 24 }}>
            <Typography>
                <Title level={2}>X6 小地图（Minimap）学习</Title>
                <Paragraph>
                    了解小地图插件的使用方式和配置选项。
                </Paragraph>
            </Typography>

            <Divider />

            <Title level={3}>1. 基础小地图</Title>
            <Row gutter={[16, 16]}>
                <Col span={16}>
                    <Card title="基础演示">
                        <Paragraph>
                            小地图显示画布的缩略图，蓝色矩形表示当前视口位置。
                            拖拽画布或缩放时，小地图会同步更新。
                        </Paragraph>
                        <BasicMinimapGraph />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card title="配置选项">
                        <pre style={{ background: '#f5f5f5', padding: 12, fontSize: 12 }}>
{`graph.use(
    new MiniMap({
        container: minimapContainer,
        width: 200,      // 小地图宽度
        height: 150,     // 小地图高度
        padding: 10,     // 内边距
    })
)`}
                        </pre>
                    </Card>
                </Col>
            </Row>

            <Divider />

            <Title level={3}>2. 可缩放小地图</Title>
            <Row gutter={[16, 16]}>
                <Col span={16}>
                    <Card title="可缩放演示">
                        <Paragraph>
                            设置 <Text code>scalable: true</Text> 后，可以在小地图上拖拽缩放手柄进行缩放。
                        </Paragraph>
                        <ScalableMinimapGraph />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card title="缩放配置">
                        <pre style={{ background: '#f5f5f5', padding: 12, fontSize: 12 }}>
{`graph.use(
    new MiniMap({
        container: minimapContainer,
        width: 200,
        height: 150,
        scalable: true,   // 支持缩放
        minScale: 0.01,   // 最小缩放
        maxScale: 16,     // 最大缩放
    })
)`}
                        </pre>
                    </Card>
                </Col>
            </Row>

            <Divider />

            <Title level={3}>3. 小地图 + 对齐线</Title>
            <Row gutter={[16, 16]}>
                <Col span={16}>
                    <Card title="组合演示">
                        <Paragraph>
                            小地图可以和其他插件（如对齐线）一起使用。
                            拖动节点时会显示对齐线，小地图同步显示。
                        </Paragraph>
                        <MinimapWithSnaplineGraph />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card title="组合配置">
                        <pre style={{ background: '#f5f5f5', padding: 12, fontSize: 12 }}>
{`import { MiniMap } from '@antv/x6-plugin-minimap'
import { Snapline } from '@antv/x6-plugin-snapline'

// 小地图
graph.use(new MiniMap({
    container: minimapContainer,
    width: 200,
    height: 150,
}))

// 对齐线
graph.use(new Snapline({
    enabled: true,
}))`}
                        </pre>
                    </Card>
                </Col>
            </Row>

            <Divider />

            <Title level={3}>4. 自定义样式小地图</Title>
            <Row gutter={[16, 16]}>
                <Col span={16}>
                    <Card title="自定义演示">
                        <Paragraph>
                            可以通过 CSS 自定义小地图容器的样式，如圆角、边框等。
                        </Paragraph>
                        <CustomMinimapGraph />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card title="自定义样式">
                        <pre style={{ background: '#f5f5f5', padding: 12, fontSize: 12 }}>
{`// 自定义容器样式
<div
    ref={minimapRef}
    style={{
        border: '1px solid #d9d9d9',
        borderRadius: 8,
        overflow: 'hidden',
    }}
/>

// 配置
graph.use(new MiniMap({
    container: minimapRef.current,
    width: 180,
    height: 120,
    padding: 5,
    scalable: false,
}))`}
                        </pre>
                    </Card>
                </Col>
            </Row>

            <Divider />

            <Title level={3}>配置选项速查</Title>
            <Card>
                <pre style={{ background: '#f5f5f5', padding: 16 }}>
{`// MiniMap 配置选项
{
    container: HTMLElement,  // 必需，小地图容器
    width: number,          // 小地图宽度，默认 300
    height: number,         // 小地图高度，默认 200
    padding: number,        // 内边距，默认 10
    scalable: boolean,      // 是否支持缩放，默认 true
    minScale: number,       // 最小缩放比例，默认 0.01
    maxScale: number,       // 最大缩放比例，默认 16
    graphOptions: object,   // 内部图实例配置
    createGraph: function,  // 自定义创建图实例
}

// 使用方式
import { MiniMap } from '@antv/x6-plugin-minimap'

graph.use(
    new MiniMap({
        container: minimapContainer,
        width: 200,
        height: 150,
        padding: 10,
        scalable: true,
        minScale: 0.01,
        maxScale: 16,
    })
)`}
                </pre>
            </Card>
            <PageNav {...getPageNav('/minimap-demo')} />
        </div>
    )
}

export default MinimapDemo
