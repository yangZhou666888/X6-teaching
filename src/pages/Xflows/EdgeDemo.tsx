import React from 'react'
import { Graph } from '@antv/x6'
import { Card, Row, Col, Typography, Divider, Button, Space } from 'antd'
import PageNav, { getPageNav } from '../../components/PageNav'

const { Title, Paragraph, Text } = Typography

// 1. 基础添加边
class BasicEdgeGraph extends React.Component {
    private container!: HTMLDivElement

    componentDidMount() {
        const graph = new Graph({
            container: this.container,
            width: 500,
            height: 250,
            background: { color: '#f5f5f5' },
            grid: { visible: true, type: 'dot', size: 10 },
        })

        graph.addNode({
            id: 'node1',
            shape: 'rect',
            x: 50,
            y: 80,
            width: 100,
            height: 40,
            label: '节点 1',
            attrs: { body: { stroke: '#597ef7', fill: '#d6e4ff', rx: 6, ry: 6 } },
        })

        graph.addNode({
            id: 'node2',
            shape: 'rect',
            x: 300,
            y: 80,
            width: 100,
            height: 40,
            label: '节点 2',
            attrs: { body: { stroke: '#597ef7', fill: '#d6e4ff', rx: 6, ry: 6 } },
        })

        // 基础边 - 通过节点 ID 连接
        graph.addEdge({
            shape: 'edge',
            source: 'node1',
            target: 'node2',
            attrs: {
                line: { stroke: '#597ef7', strokeWidth: 2 },
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

// 2. source/target 多种方式
class SourceTargetGraph extends React.Component {
    private container!: HTMLDivElement

    componentDidMount() {
        const graph = new Graph({
            container: this.container,
            width: 500,
            height: 300,
            background: { color: '#f5f5f5' },
            grid: { visible: true, type: 'dot', size: 10 },
        })

        // 节点 ID 方式
        graph.addNode({
            id: 'a1',
            shape: 'rect',
            x: 40,
            y: 30,
            width: 80,
            height: 40,
            label: 'ID 连接',
            attrs: { body: { stroke: '#52c41a', fill: '#d9f7be', rx: 6, ry: 6 } },
        })

        graph.addNode({
            id: 'a2',
            shape: 'rect',
            x: 200,
            y: 30,
            width: 80,
            height: 40,
            label: 'ID 连接',
            attrs: { body: { stroke: '#52c41a', fill: '#d9f7be', rx: 6, ry: 6 } },
        })

        graph.addEdge({
            source: 'a1',
            target: 'a2',
            attrs: { line: { stroke: '#52c41a', strokeWidth: 2 } },
        })

        // 坐标方式
        graph.addNode({
            id: 'b1',
            shape: 'rect',
            x: 40,
            y: 120,
            width: 80,
            height: 40,
            label: '坐标连接',
            attrs: { body: { stroke: '#fa8c16', fill: '#ffe7ba', rx: 6, ry: 6 } },
        })

        graph.addEdge({
            source: 'b1',
            target: { x: 300, y: 140 },
            attrs: { line: { stroke: '#fa8c16', strokeWidth: 2, strokeDasharray: '5 5' } },
        })

        // 节点对象方式
        const c1 = graph.addNode({
            id: 'c1',
            shape: 'rect',
            x: 40,
            y: 210,
            width: 80,
            height: 40,
            label: '对象连接',
            attrs: { body: { stroke: '#722ed1', fill: '#efdbff', rx: 6, ry: 6 } },
        })

        const c2 = graph.addNode({
            id: 'c2',
            shape: 'rect',
            x: 200,
            y: 210,
            width: 80,
            height: 40,
            label: '对象连接',
            attrs: { body: { stroke: '#722ed1', fill: '#efdbff', rx: 6, ry: 6 } },
        })

        graph.addEdge({
            source: c1,
            target: c2,
            attrs: { line: { stroke: '#722ed1', strokeWidth: 2 } },
        })
    }

    refContainer = (container: HTMLDivElement) => {
        this.container = container
    }

    render() {
        return <div ref={this.refContainer} />
    }
}

// 3. vertices 路径点
class VerticesGraph extends React.Component {
    private container!: HTMLDivElement

    componentDidMount() {
        const graph = new Graph({
            container: this.container,
            width: 500,
            height: 280,
            background: { color: '#f5f5f5' },
            grid: { visible: true, type: 'dot', size: 10 },
        })

        graph.addNode({
            id: 'v1',
            shape: 'rect',
            x: 40,
            y: 40,
            width: 80,
            height: 40,
            label: '起点',
            attrs: { body: { stroke: '#1890ff', fill: '#bae7ff', rx: 6, ry: 6 } },
        })

        graph.addNode({
            id: 'v2',
            shape: 'rect',
            x: 350,
            y: 180,
            width: 80,
            height: 40,
            label: '终点',
            attrs: { body: { stroke: '#1890ff', fill: '#bae7ff', rx: 6, ry: 6 } },
        })

        // 带路径点的边
        graph.addEdge({
            source: 'v1',
            target: 'v2',
            vertices: [
                { x: 250, y: 60 },
                { x: 250, y: 180 },
            ],
            attrs: { line: { stroke: '#1890ff', strokeWidth: 2 } },
        })

        // 路径点标记（可视化）
        const vertices = [
            { x: 250, y: 60 },
            { x: 250, y: 180 },
        ]
        vertices.forEach((v) => {
            graph.addNode({
                shape: 'circle',
                x: v.x - 6,
                y: v.y - 6,
                width: 12,
                height: 12,
                attrs: { body: { fill: '#ff4d4f', stroke: 'none' } },
            })
        })
    }

    refContainer = (container: HTMLDivElement) => {
        this.container = container
    }

    render() {
        return <div ref={this.refContainer} />
    }
}

// 4. 边的形状（router + connector）
class EdgeShapeGraph extends React.Component {
    private container!: HTMLDivElement

    componentDidMount() {
        const graph = new Graph({
            container: this.container,
            width: 500,
            height: 350,
            background: { color: '#f5f5f5' },
            grid: { visible: true, type: 'dot', size: 10 },
        })

        // 默认边（直线）
        graph.addNode({ id: 's1', shape: 'rect', x: 40, y: 30, width: 80, height: 40, label: '直线', attrs: { body: { stroke: '#597ef7', fill: '#d6e4ff', rx: 6, ry: 6 } } })
        graph.addNode({ id: 't1', shape: 'rect', x: 250, y: 30, width: 80, height: 40, label: '默认', attrs: { body: { stroke: '#597ef7', fill: '#d6e4ff', rx: 6, ry: 6 } } })
        graph.addEdge({ source: 's1', target: 't1', attrs: { line: { stroke: '#597ef7', strokeWidth: 2 } } })

        // 圆角路由
        graph.addNode({ id: 's2', shape: 'rect', x: 40, y: 110, width: 80, height: 40, label: '圆角', attrs: { body: { stroke: '#52c41a', fill: '#d9f7be', rx: 6, ry: 6 } } })
        graph.addNode({ id: 't2', shape: 'rect', x: 250, y: 110, width: 80, height: 40, label: '路由', attrs: { body: { stroke: '#52c41a', fill: '#d9f7be', rx: 6, ry: 6 } } })
        graph.addEdge({
            source: 's2',
            target: 't2',
            router: 'manhattan',
            connector: 'rounded',
            attrs: { line: { stroke: '#52c41a', strokeWidth: 2 } },
        })

        // 平滑连接器
        graph.addNode({ id: 's3', shape: 'rect', x: 40, y: 190, width: 80, height: 40, label: '平滑', attrs: { body: { stroke: '#fa8c16', fill: '#ffe7ba', rx: 6, ry: 6 } } })
        graph.addNode({ id: 't3', shape: 'rect', x: 250, y: 190, width: 80, height: 40, label: '连接', attrs: { body: { stroke: '#fa8c16', fill: '#ffe7ba', rx: 6, ry: 6 } } })
        graph.addEdge({
            source: 's3',
            target: 't3',
            vertices: [{ x: 200, y: 190 }],// 边要经过的路径点
            connector: 'smooth',
            attrs: { line: { stroke: '#fa8c16', strokeWidth: 2 } },
        })

        // 跳线连接器
        graph.addNode({ id: 's4', shape: 'rect', x: 40, y: 270, width: 80, height: 40, label: '跳线', attrs: { body: { stroke: '#722ed1', fill: '#efdbff', rx: 6, ry: 6 } } })
        graph.addNode({ id: 't4', shape: 'rect', x: 250, y: 270, width: 80, height: 40, label: '连接', attrs: { body: { stroke: '#722ed1', fill: '#efdbff', rx: 6, ry: 6 } } })
        graph.addEdge({
            source: 's4',
            target: 't4',
            connector: 'jumpover',
            attrs: { line: { stroke: '#722ed1', strokeWidth: 2 } },
        })
    }

    refContainer = (container: HTMLDivElement) => {
        this.container = container
    }

    render() {
        return <div ref={this.refContainer} />
    }
}

// 5. 箭头
class ArrowGraph extends React.Component {
    private container!: HTMLDivElement

    componentDidMount() {
        const graph = new Graph({
            container: this.container,
            width: 500,
            height: 300,
            background: { color: '#f5f5f5' },
            grid: { visible: true, type: 'dot', size: 10 },
        })

        // 默认箭头（目标端）
        graph.addNode({ id: 'a1', shape: 'rect', x: 40, y: 30, width: 80, height: 40, label: '默认', attrs: { body: { stroke: '#597ef7', fill: '#d6e4ff', rx: 6, ry: 6 } } })
        graph.addNode({ id: 'a2', shape: 'rect', x: 250, y: 30, width: 80, height: 40, label: '箭头', attrs: { body: { stroke: '#597ef7', fill: '#d6e4ff', rx: 6, ry: 6 } } })
        graph.addEdge({
            source: 'a1',
            target: 'a2',
            attrs: {
                line: {
                    stroke: '#597ef7',
                    strokeWidth: 2,
                    targetMarker: { name: 'block', width: 12, height: 8 },
                },
            },
        })

        // 双向箭头
        graph.addNode({ id: 'b1', shape: 'rect', x: 40, y: 110, width: 80, height: 40, label: '双向', attrs: { body: { stroke: '#52c41a', fill: '#d9f7be', rx: 6, ry: 6 } } })
        graph.addNode({ id: 'b2', shape: 'rect', x: 250, y: 110, width: 80, height: 40, label: '箭头', attrs: { body: { stroke: '#52c41a', fill: '#d9f7be', rx: 6, ry: 6 } } })
        graph.addEdge({
            source: 'b1',
            target: 'b2',
            attrs: {
                line: {
                    stroke: '#52c41a',
                    strokeWidth: 2,
                    sourceMarker: { name: 'block', width: 12, height: 8 },
                    targetMarker: { name: 'block', width: 12, height: 8 },
                },
            },
        })

        // 圆形箭头
        graph.addNode({ id: 'c1', shape: 'rect', x: 40, y: 190, width: 80, height: 40, label: '圆形', attrs: { body: { stroke: '#fa8c16', fill: '#ffe7ba', rx: 6, ry: 6 } } })
        graph.addNode({ id: 'c2', shape: 'rect', x: 250, y: 190, width: 80, height: 40, label: '箭头', attrs: { body: { stroke: '#fa8c16', fill: '#ffe7ba', rx: 6, ry: 6 } } })
        graph.addEdge({
            source: 'c1',
            target: 'c2',
            attrs: {
                line: {
                    stroke: '#fa8c16',
                    strokeWidth: 2,
                    targetMarker: { name: 'circle', r: 6 },
                },
            },
        })

        // 无箭头
        graph.addNode({ id: 'd1', shape: 'rect', x: 40, y: 260, width: 80, height: 40, label: '无箭头', attrs: { body: { stroke: '#722ed1', fill: '#efdbff', rx: 6, ry: 6 } } })
        graph.addNode({ id: 'd2', shape: 'rect', x: 250, y: 260, width: 80, height: 40, label: '纯线', attrs: { body: { stroke: '#722ed1', fill: '#efdbff', rx: 6, ry: 6 } } })
        graph.addEdge({
            source: 'd1',
            target: 'd2',
            attrs: {
                line: {
                    stroke: '#722ed1',
                    strokeWidth: 2,
                    targetMarker: null,
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

// 6. 边的标签
class EdgeLabelGraph extends React.Component {
    private container!: HTMLDivElement

    componentDidMount() {
        const graph = new Graph({
            container: this.container,
            width: 500,
            height: 250,
            background: { color: '#f5f5f5' },
            grid: { visible: true, type: 'dot', size: 10 },
        })

        graph.addNode({ id: 'l1', shape: 'rect', x: 40, y: 80, width: 80, height: 40, label: '标签', attrs: { body: { stroke: '#597ef7', fill: '#d6e4ff', rx: 6, ry: 6 } } })
        graph.addNode({ id: 'l2', shape: 'rect', x: 300, y: 80, width: 80, height: 40, label: '演示', attrs: { body: { stroke: '#597ef7', fill: '#d6e4ff', rx: 6, ry: 6 } } })

        // 带标签的边
        graph.addEdge({
            source: 'l1',
            target: 'l2',
            labels: [
                {
                    attrs: {
                        label: {
                            text: '边的标签',
                            fill: '#333',
                            fontSize: 12,
                        },
                        rect: {
                            fill: '#fff',
                            stroke: '#597ef7',
                            strokeWidth: 1,
                            rx: 4,
                            ry: 4,
                        },
                    },
                    position: { distance: 0.5 },
                },
            ],
            attrs: { line: { stroke: '#597ef7', strokeWidth: 2 } },
        })
    }

    refContainer = (container: HTMLDivElement) => {
        this.container = container
    }

    render() {
        return <div ref={this.refContainer} />
    }
}

// 7. 修改边 API
class ModifyEdgeGraph extends React.Component {
    private container!: HTMLDivElement
    private graph!: Graph
    private edge: any

    componentDidMount() {
        this.graph = new Graph({
            container: this.container,
            width: 500,
            height: 250,
            background: { color: '#f5f5f5' },
            grid: { visible: true, type: 'dot', size: 10 },
        })

        this.graph.addNode({ id: 'm1', shape: 'rect', x: 40, y: 80, width: 80, height: 40, label: '修改我', attrs: { body: { stroke: '#597ef7', fill: '#d6e4ff', rx: 6, ry: 6 } } })
        this.graph.addNode({ id: 'm2', shape: 'rect', x: 300, y: 80, width: 80, height: 40, label: '边', attrs: { body: { stroke: '#597ef7', fill: '#d6e4ff', rx: 6, ry: 6 } } })

        this.edge = this.graph.addEdge({
            source: 'm1',
            target: 'm2',
            attrs: { line: { stroke: '#597ef7', strokeWidth: 2 } },
        })
    }

    changeColor = () => {
        this.edge.attr('line/stroke', '#ff4d4f')
    }

    changeWidth = () => {
        this.edge.attr('line/strokeWidth', 4)
    }

    addDash = () => {
        this.edge.attr('line/strokeDasharray', '5 5')
    }

    addArrow = () => {
        this.edge.attr('line/targetMarker', { name: 'block', width: 12, height: 8 })
    }

    reset = () => {
        this.edge.attr('line/stroke', '#597ef7')
        this.edge.attr('line/strokeWidth', 2)
        this.edge.attr('line/strokeDasharray', 'none')
        this.edge.attr('line/targetMarker', null)
    }

    refContainer = (container: HTMLDivElement) => {
        this.container = container
    }

    render() {
        return (
            <div>
                <div ref={this.refContainer} />
                <Space style={{ marginTop: 8 }}>
                    <Button onClick={this.changeColor}>修改颜色</Button>
                    <Button onClick={this.changeWidth}>修改宽度</Button>
                    <Button onClick={this.addDash}>添加虚线</Button>
                    <Button onClick={this.addArrow}>添加箭头</Button>
                    <Button onClick={this.reset}>重置</Button>
                </Space>
            </div>
        )
    }
}

// 属性速查表
const edgeAttrColumns = [
    { title: '属性', dataIndex: 'attr', key: 'attr' },
    { title: '类型', dataIndex: 'type', key: 'type' },
    { title: '描述', dataIndex: 'desc', key: 'desc' },
]

const edgeAttrData = [
    { key: '1', attr: 'source', type: 'TerminalData', desc: '源节点或起始点' },
    { key: '2', attr: 'target', type: 'TerminalData', desc: '目标节点或目标点' },
    { key: '3', attr: 'vertices', type: 'Point[]', desc: '路径点数组' },
    { key: '4', attr: 'router', type: 'string', desc: '路由（manhattan, orth, normal等）' },
    { key: '5', attr: 'connector', type: 'string', desc: '连接器（rounded, smooth, jumpover）' },
    { key: '6', attr: 'labels', type: 'Label[]', desc: '标签数组' },
    { key: '7', attr: 'attrs.line.stroke', type: 'string', desc: '线条颜色' },
    { key: '8', attr: 'attrs.line.strokeWidth', type: 'number', desc: '线条宽度' },
    { key: '9', attr: 'attrs.line.strokeDasharray', type: 'string', desc: '虚线样式' },
    { key: '10', attr: 'attrs.line.targetMarker', type: 'object', desc: '目标端箭头' },
    { key: '11', attr: 'attrs.line.sourceMarker', type: 'object', desc: '源端箭头' },
]

const EdgeDemo: React.FC = () => {
    return (
        <div style={{ padding: 24 }}>
            <Typography>
                <Title level={2}>X6 边（Edge）学习</Title>
                <Paragraph>
                    了解边的添加方法、形状配置、箭头、标签以及 API 修改。
                </Paragraph>
            </Typography>

            <Divider />

            <Title level={3}>1. 基础添加边</Title>
            <Row gutter={[16, 16]}>
                <Col span={14}>
                    <Card title="基础边演示">
                        <Paragraph>
                            使用 <Text code>graph.addEdge()</Text> 添加边，
                            通过 <Text code>source</Text> 和 <Text code>target</Text> 指定连接的节点。
                        </Paragraph>
                        <BasicEdgeGraph />
                        <pre style={{ background: '#f5f5f5', padding: 12, marginTop: 12 }}>
                            {`// 基础添加边
graph.addEdge({
    shape: 'edge',          // 边类型（默认）
    source: 'node1',        // 源节点 ID
    target: 'node2',        // 目标节点 ID
    attrs: {
        line: {
            stroke: '#597ef7',    // 线条颜色
            strokeWidth: 2,       // 线条宽度
        },
    },
})`}
                        </pre>
                    </Card>
                </Col>
                <Col span={10}>
                    <Card title="边属性速查表">
                        <table style={{ width: '100%', fontSize: 12 }}>
                            <thead>
                                <tr><th>属性</th><th>描述</th></tr>
                            </thead>
                            <tbody>
                                <tr><td><Text code>source</Text></td><td>源节点</td></tr>
                                <tr><td><Text code>target</Text></td><td>目标节点</td></tr>
                                <tr><td><Text code>vertices</Text></td><td>路径点</td></tr>
                                <tr><td><Text code>router</Text></td><td>路由</td></tr>
                                <tr><td><Text code>connector</Text></td><td>连接器</td></tr>
                                <tr><td><Text code>labels</Text></td><td>标签</td></tr>
                                <tr><td><Text code>attrs.line</Text></td><td>线条样式</td></tr>
                            </tbody>
                        </table>
                    </Card>
                </Col>
            </Row>

            <Divider />

            <Title level={3}>2. source/target 多种方式</Title>
            <Row gutter={[16, 16]}>
                <Col span={14}>
                    <Card title="连接方式演示">
                        <Paragraph>
                            source/target 支持：节点 ID、节点对象、坐标点、连接桩等多种方式。
                        </Paragraph>
                        <SourceTargetGraph />
                    </Card>
                </Col>
                <Col span={10}>
                    <Card title="连接方式代码">
                        <pre style={{ background: '#f5f5f5', padding: 12, fontSize: 11 }}>
                            {`// 方式 1：节点 ID
graph.addEdge({
    source: 'node1',
    target: 'node2',
})

// 方式 2：坐标点
graph.addEdge({
    source: 'node1',
    target: { x: 300, y: 140 },
})

// 方式 3：节点对象
const node1 = graph.addNode(...)
const node2 = graph.addNode(...)
graph.addEdge({
    source: node1,
    target: node2,
})

// 方式 4：连接桩
graph.addEdge({
    source: { cell: 'node1', port: 'out' },
    target: { cell: 'node2', port: 'in' },
})`}
                        </pre>
                    </Card>
                </Col>
            </Row>

            <Divider />

            <Title level={3}>3. vertices 路径点</Title>
            <Row gutter={[16, 16]}>
                <Col span={14}>
                    <Card title="路径点演示">
                        <Paragraph>
                            边从起始点开始，按顺序经过路径点（红色圆点），最后到达终止点。
                        </Paragraph>
                        <VerticesGraph />
                        <pre style={{ background: '#f5f5f5', padding: 12, marginTop: 12 }}>
                            {`graph.addEdge({
    source: 'node1',
    target: 'node2',
    vertices: [
        { x: 150, y: 60 },   // 第一个路径点
        { x: 250, y: 180 },  // 第二个路径点
    ],
})`}
                        </pre>
                    </Card>
                </Col>
                <Col span={10}>
                    <Card title="路径点说明">
                        <pre style={{ background: '#f5f5f5', padding: 12, fontSize: 12 }}>
                            {`// vertices 数组定义路径点
// 边会按顺序经过这些点

起点 → 路径点1 → 路径点2 → 终点

// 用途：
// 1. 控制边的走向
// 2. 避免边与其他节点重叠
// 3. 创建复杂的连线路径`}
                        </pre>
                    </Card>
                </Col>
            </Row>

            <Divider />

            <Title level={3}>4. 边的形状（router + connector）</Title>
            <Row gutter={[16, 16]}>
                <Col span={14}>
                    <Card title="形状演示">
                        <Paragraph>
                            <Text code>router</Text> 控制边的路由方式，<Text code>connector</Text> 控制边的连接样式。
                        </Paragraph>
                        <EdgeShapeGraph />
                    </Card>
                </Col>
                <Col span={10}>
                    <Card title="router 和 connector">
                        <pre style={{ background: '#f5f5f5', padding: 12, fontSize: 11 }}>
                            {`// router - 路由方式
'normal'     // 默认直线
'manhattan'  // 曼哈顿路由（正交）
'orth'       // 正交路由
'metro'      // 地铁风格
'oneSide'    // 单侧路由

// connector - 连接样式
'normal'     // 默认直线连接
'rounded'    // 圆角连接
'smooth'     // 平滑曲线
'jumpover'   // 跳线（交叉时跳过）`}
                        </pre>
                    </Card>
                </Col>
            </Row>

            <Divider />

            <Title level={3}>5. 箭头</Title>
            <Row gutter={[16, 16]}>
                <Col span={14}>
                    <Card title="箭头演示">
                        <Paragraph>
                            通过 <Text code>targetMarker</Text> 和 <Text code>sourceMarker</Text> 配置箭头。
                        </Paragraph>
                        <ArrowGraph />
                    </Card>
                </Col>
                <Col span={10}>
                    <Card title="箭头配置">
                        <pre style={{ background: '#f5f5f5', padding: 12, fontSize: 11 }}>
                            {`// 目标端箭头
attrs: {
    line: {
        targetMarker: {
            name: 'block',  // 箭头类型
            width: 12,      // 宽度
            height: 8,      // 高度
        },
    },
}

// 双向箭头
attrs: {
    line: {
        sourceMarker: { name: 'block', width: 12, height: 8 },
        targetMarker: { name: 'block', width: 12, height: 8 },
    },
}

// 圆形箭头
targetMarker: { name: 'circle', r: 6 }

// 无箭头
targetMarker: null`}
                        </pre>
                    </Card>
                </Col>
            </Row>

            <Divider />

            <Title level={3}>6. 边的标签</Title>
            <Row gutter={[16, 16]}>
                <Col span={14}>
                    <Card title="标签演示">
                        <Paragraph>
                            使用 <Text code>labels</Text> 在边上添加文字标签。
                        </Paragraph>
                        <EdgeLabelGraph />
                    </Card>
                </Col>
                <Col span={10}>
                    <Card title="标签配置">
                        <pre style={{ background: '#f5f5f5', padding: 12, fontSize: 11 }}>
                            {`graph.addEdge({
    source: 'node1',
    target: 'node2',
    labels: [
        {
            attrs: {
                label: {
                    text: '边的标签',
                    fill: '#333',
                    fontSize: 12,
                },
                rect: {
                    fill: '#fff',
                    stroke: '#597ef7',
                    rx: 4, ry: 4,
                },
            },
            position: { distance: 0.5 },
        },
    ],
})`}
                        </pre>
                    </Card>
                </Col>
            </Row>

            <Divider />

            <Title level={3}>7. 修改边 API</Title>
            <Row gutter={[16, 16]}>
                <Col span={14}>
                    <Card title="修改边演示">
                        <Paragraph>
                            通过 <Text code>edge.attr()</Text> 修改边的样式。
                        </Paragraph>
                        <ModifyEdgeGraph />
                    </Card>
                </Col>
                <Col span={10}>
                    <Card title="修改边 API">
                        <pre style={{ background: '#f5f5f5', padding: 12, fontSize: 11 }}>
                            {`// 获取边引用
const edge = graph.addEdge({ ... })

// 修改颜色
edge.attr('line/stroke', '#ff0000')

// 修改宽度
edge.attr('line/strokeWidth', 4)

// 添加虚线
edge.attr('line/strokeDasharray', '5 5')

// 添加箭头
edge.attr('line/targetMarker', {
    name: 'block',
    width: 12, height: 8,
})

// 删除边
graph.removeEdge(edge.id)`}
                        </pre>
                    </Card>
                </Col>
            </Row>

            <PageNav {...getPageNav('/edge-demo')} />
        </div>
    )
}

export default EdgeDemo
