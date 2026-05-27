import React from 'react'
import { Graph } from '@antv/x6'
import { Card, Row, Col, Typography, Divider, Button, Space } from 'antd'
import PageNav, { getPageNav } from '../../components/PageNav'

const { Title, Paragraph, Text } = Typography

class ButtonToolGraph extends React.Component {
    private container!: HTMLDivElement

    componentDidMount() {
        const graph = new Graph({
            container: this.container,
            width: 500,
            height: 300,
            background: { color: '#f5f5f5' },
            grid: { visible: true, type: 'dot', size: 10 },
        })

        const node = graph.addNode({
            shape: 'rect',
            x: 150,
            y: 80,
            width: 180,
            height: 80,
            label: '悬停查看工具',
            attrs: { body: { stroke: '#597ef7', fill: '#d6e4ff', rx: 6, ry: 6 } },
        })

        node.addTools([
            {
                name: 'button',
                args: {
                    x: 0,
                    y: 0,
                    offset: { x: 10, y: 10 },
                    onClick: () => { alert('点击了删除按钮') },
                },
            },
            {
                name: 'button',
                args: {
                    x: '100%',
                    y: 0,
                    offset: { x: -10, y: 10 },
                    markup: [
                        {
                            tagName: 'circle',
                            selector: 'button',
                            attrs: {
                                r: 7,
                                fill: '#52c41a',
                                cursor: 'pointer',
                            },
                        },
                        {
                            tagName: 'text',
                            selector: 'icon',
                            attrs: {
                                fill: '#fff',
                                fontSize: 10,
                                textAnchor: 'middle',
                                pointerEvents: 'none',
                                y: '0.3em',
                            },
                        },
                    ],
                    onClick: ({ cell }: any) => {
                        cell.attr('body/fill', '#d9f7be')
                    },
                },
            },
        ])
    }

    refContainer = (container: HTMLDivElement) => { this.container = container }
    render() { return <div ref={this.refContainer} /> }
}

class BoundaryToolGraph extends React.Component {
    private container!: HTMLDivElement

    componentDidMount() {
        const graph = new Graph({
            container: this.container,
            width: 500,
            height: 300,
            background: { color: '#f5f5f5' },
            grid: { visible: true, type: 'dot', size: 10 },
        })

        const node = graph.addNode({
            shape: 'rect',
            x: 150,
            y: 80,
            width: 180,
            height: 80,
            label: '点击节点查看边界工具',
            attrs: { body: { stroke: '#597ef7', fill: '#d6e4ff', rx: 6, ry: 6 } },
        })

        graph.on('node:click', ({ node }) => {
            node.removeTools()
            node.addTools([
                {
                    name: 'boundary',
                    args: {
                        attrs: {
                            fill: '#7c68fc',
                            stroke: '#9254de',
                            strokeWidth: 1,
                            fillOpacity: 0.1,
                        },
                    },
                },
            ])
        })

        graph.on('blank:click', () => {
            graph.getNodes().forEach(node => node.removeTools())
        })
    }

    refContainer = (container: HTMLDivElement) => { this.container = container }
    render() { return <div ref={this.refContainer} /> }
}

class ResizeToolGraph extends React.Component {
    private container!: HTMLDivElement

    componentDidMount() {
        const graph = new Graph({
            container: this.container,
            width: 500,
            height: 300,
            background: { color: '#f5f5f5' },
            grid: { visible: true, type: 'dot', size: 10 },
        })

        const node = graph.addNode({
            shape: 'rect',
            x: 150,
            y: 80,
            width: 180,
            height: 80,
            label: '点击添加调整大小工具',
            attrs: { body: { stroke: '#597ef7', fill: '#d6e4ff', rx: 6, ry: 6 } },
        })

        graph.on('node:click', ({ node }) => {
            node.removeTools()
            node.addTools([
                {
                    name: 'node-resize',
                    args: {
                        preserveAspectRatio: false,
                    },
                },
            ])
        })

        graph.on('blank:click', () => {
            graph.getNodes().forEach(node => node.removeTools())
        })
    }

    refContainer = (container: HTMLDivElement) => { this.container = container }
    render() { return <div ref={this.refContainer} /> }
}

class EdgeToolGraph extends React.Component {
    private container!: HTMLDivElement

    componentDidMount() {
        const graph = new Graph({
            container: this.container,
            width: 500,
            height: 300,
            background: { color: '#f5f5f5' },
            grid: { visible: true, type: 'dot', size: 10 },
        })

        const source = graph.addNode({
            shape: 'rect',
            x: 60,
            y: 100,
            width: 100,
            height: 50,
            label: '源节点',
            attrs: { body: { stroke: '#597ef7', fill: '#d6e4ff', rx: 6, ry: 6 } },
        })

        const target = graph.addNode({
            shape: 'rect',
            x: 320,
            y: 100,
            width: 100,
            height: 50,
            label: '目标节点',
            attrs: { body: { stroke: '#52c41a', fill: '#d9f7be', rx: 6, ry: 6 } },
        })

        const edge = graph.addEdge({
            source,
            target,
            attrs: { line: { stroke: '#597ef7', strokeWidth: 2 } },
            vertices: [{ x: 240, y: 60 }],
        })

        graph.on('edge:click', ({ edge }) => {
            edge.removeTools()
            edge.addTools([
                { name: 'vertices' },
                { name: 'segments' },
                { name: 'source-arrowhead' },
                { name: 'target-arrowhead' },
            ])
        })

        graph.on('blank:click', () => {
            graph.getEdges().forEach(edge => edge.removeTools())
        })
    }

    refContainer = (container: HTMLDivElement) => { this.container = container }
    render() { return <div ref={this.refContainer} /> }
}

const ToolsDemo: React.FC = () => {
    return (
        <div style={{ padding: 24 }}>
            <Typography>
                <Title level={2}>X6 工具（Tools）学习</Title>
                <Paragraph>
                    了解 X6 的工具系统，包括节点工具、边工具的使用方法。工具可以在用户交互时显示，提供删除、调整大小、编辑等功能。
                </Paragraph>
            </Typography>

            <Divider />

            <Title level={3}>1. 按钮工具（Button Tool）</Title>
            <Row gutter={[16, 16]}>
                <Col span={14}>
                    <Card title="按钮工具演示">
                        <Paragraph>
                            在节点上添加可点击的按钮，鼠标悬停节点时显示。使用 <Text code>button</Text> 工具可以快速添加删除、编辑等操作按钮。
                        </Paragraph>
                        <ButtonToolGraph />
                    </Card>
                </Col>
                <Col span={10}>
                    <Card title="配置说明">
                        <pre style={{ background: '#f5f5f5', padding: 12, fontSize: 12 }}>
{`node.addTools([
    {
        name: 'button',
        args: {
            x: 0,          // x 位置
            y: 0,          // y 位置
            offset: {      // 偏移量
                x: 10,
                y: 10,
            },
            onClick: () => {
                // 点击回调
            },
        },
    },
])`}
                        </pre>
                    </Card>
                </Col>
            </Row>

            <Divider />

            <Title level={3}>2. 边界工具（Boundary Tool）</Title>
            <Row gutter={[16, 16]}>
                <Col span={14}>
                    <Card title="边界工具演示">
                        <Paragraph>
                            点击节点显示边界高亮效果，点击画布空白处取消。边界工具用于视觉上标识选中的节点范围。
                        </Paragraph>
                        <BoundaryToolGraph />
                    </Card>
                </Col>
                <Col span={10}>
                    <Card title="配置说明">
                        <pre style={{ background: '#f5f5f5', padding: 12, fontSize: 12 }}>
{`node.addTools([
    {
        name: 'boundary',
        args: {
            attrs: {
                fill: '#7c68fc',
                stroke: '#9254de',
                strokeWidth: 1,
                fillOpacity: 0.1,
            },
        },
    },
])`}
                        </pre>
                    </Card>
                </Col>
            </Row>

            <Divider />

            <Title level={3}>3. 节点调整大小工具（Node Resize Tool）</Title>
            <Row gutter={[16, 16]}>
                <Col span={14}>
                    <Card title="调整大小演示">
                        <Paragraph>
                            点击节点后显示调整大小的手柄，拖动手柄可以改变节点大小。
                        </Paragraph>
                        <ResizeToolGraph />
                    </Card>
                </Col>
                <Col span={10}>
                    <Card title="配置说明">
                        <pre style={{ background: '#f5f5f5', padding: 12, fontSize: 12 }}>
{`node.addTools([
    {
        name: 'node-resize',
        args: {
            preserveAspectRatio: false,
            // 是否保持宽高比
            // 设为 true 则保持比例缩放
        },
    },
])`}
                        </pre>
                    </Card>
                </Col>
            </Row>

            <Divider />

            <Title level={3}>4. 边工具（Edge Tools）</Title>
            <Row gutter={[16, 16]}>
                <Col span={14}>
                    <Card title="边工具演示">
                        <Paragraph>
                            点击边后显示路径点编辑、段编辑、箭头编辑等工具。拖动路径点可以改变边的走向。
                        </Paragraph>
                        <EdgeToolGraph />
                    </Card>
                </Col>
                <Col span={10}>
                    <Card title="边工具类型">
                        <pre style={{ background: '#f5f5f5', padding: 12, fontSize: 12 }}>
{`edge.addTools([
    // 路径点工具 - 拖动路径点
    { name: 'vertices' },

    // 线段工具 - 拖动线段
    { name: 'segments' },

    // 源箭头工具
    { name: 'source-arrowhead' },

    // 目标箭头工具
    { name: 'target-arrowhead' },
])`}
                        </pre>
                    </Card>
                </Col>
            </Row>

            <Divider />

            <Title level={3}>工具 API 速查</Title>
            <Card>
                <pre style={{ background: '#f5f5f5', padding: 16 }}>
{`// 添加工具
cell.addTools(tools | name, options?)

// 删除所有工具
cell.removeTools()

// 删除指定工具
cell.removeTools('button')

// 获取工具列表
cell.getTools()

// 判断是否有工具
cell.hasTools()

// 内置工具列表
// 节点工具:
//   - button        按钮工具
//   - button-remove 删除按钮
//   - boundary      边界工具
//   - node-resize   调整大小
//   - node-editor   文本编辑

// 边工具:
//   - vertices      路径点工具
//   - segments      线段工具
//   - source-arrowhead 源箭头
//   - target-arrowhead 目标箭头
//   - edge-editor   边文本编辑
//   - boundary      边界工具`}
                </pre>
            </Card>

            <PageNav {...getPageNav('/tools-demo')} />
        </div>
    )
}

export default ToolsDemo
