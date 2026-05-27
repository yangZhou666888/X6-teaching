import React from 'react'
import { Graph } from '@antv/x6'
import { Card, Row, Col, Typography, Divider, Button, Space } from 'antd'
import PageNav, { getPageNav } from '../../components/PageNav';

const { Title, Paragraph, Text } = Typography

// 1. 基础连接桩配置 - groups + items
class BasicPortGraph extends React.Component {
    private container!: HTMLDivElement

    componentDidMount() {
        const graph = new Graph({
            container: this.container,
            width: 400,
            height: 250,
            background: { color: '#f5f5f5' },
            grid: { visible: true, type: 'dot', size: 10 },
        })

        graph.addNode({
            shape: 'rect',
            x: 100,
            y: 60,
            width: 180,
            height: 100,
            label: '基础配置',
            attrs: { body: { stroke: '#597ef7', fill: '#d6e4ff', rx: 6, ry: 6 } },
            ports: {
                groups: {
                    top: {
                        position: 'top',
                        attrs: {
                            circle: {
                                r: 6,
                                magnet: true,
                                stroke: '#597ef7',
                                fill: '#fff',
                                strokeWidth: 2,
                            },
                        },
                    },
                    bottom: {
                        position: 'bottom',
                        attrs: {
                            circle: {
                                r: 6,
                                magnet: true,
                                stroke: '#52c41a',
                                fill: '#fff',
                                strokeWidth: 2,
                            },
                        },
                    },
                },
                items: [
                    { id: 'port1', group: 'top' },
                    { id: 'port2', group: 'top' },
                    { id: 'port3', group: 'bottom' },
                    { id: 'port4', group: 'bottom' },
                ],
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

// 2. 连接桩 CRUD
class PortCRUDGraph extends React.Component {
    private container!: HTMLDivElement
    private graph!: Graph
    private node: any

    componentDidMount() {
        this.graph = new Graph({
            container: this.container,
            width: 400,
            height: 250,
            background: { color: '#f5f5f5' },
            grid: { visible: true, type: 'dot', size: 10 },
        })

        this.node = this.graph.addNode({
            shape: 'rect',
            x: 100,
            y: 60,
            width: 180,
            height: 100,
            label: 'CRUD 演示',
            attrs: { body: { stroke: '#597ef7', fill: '#d6e4ff', rx: 6, ry: 6 } },
            ports: {
                groups: {
                    top: {
                        position: 'top',
                        attrs: { circle: { r: 6, magnet: true, stroke: '#597ef7', fill: '#fff', strokeWidth: 2 } },
                    },
                    bottom: {
                        position: 'bottom',
                        attrs: { circle: { r: 6, magnet: true, stroke: '#52c41a', fill: '#fff', strokeWidth: 2 } },
                    },
                },
                items: [
                    { id: 'port1', group: 'top' },
                ],
            },
        })
    }

    addPort = () => {
        this.node.addPort({
            group: 'bottom',
            attrs: {
                text: { text: '新端口' },
            },
        })
    }

    removePort = () => {
        const ports = this.node.getPorts()
        if (ports.length > 0) {
            this.node.removePort(ports[ports.length - 1].id)
        }
    }

    updatePort = () => {
        const ports = this.node.getPorts()
        if (ports.length > 0) {
            this.node.portProp(ports[0].id, 'attrs/circle/stroke', '#ff4d4f')
            this.node.portProp(ports[0].id, 'attrs/circle/fill', '#fff1f0')
        }
    }

    refContainer = (container: HTMLDivElement) => {
        this.container = container
    }

    render() {
        return (
            <div>
                <div ref={this.refContainer} />
                <Space style={{ marginTop: 8 }}>
                    <Button type="primary" onClick={this.addPort}>添加连接桩</Button>
                    <Button danger onClick={this.removePort}>删除连接桩</Button>
                    <Button onClick={this.updatePort}>修改连接桩</Button>
                </Space>
            </div>
        )
    }
}

// 3. 位置布局 - left, right, top, bottom
class PositionGraph extends React.Component {
    private container!: HTMLDivElement

    componentDidMount() {
        const graph = new Graph({
            container: this.container,
            width: 500,
            height: 300,
            background: { color: '#f5f5f5' },
            grid: { visible: true, type: 'dot', size: 10 },
        })

        graph.addNode({
            shape: 'rect',
            x: 150,
            y: 60,
            width: 180,
            height: 120,
            label: '四方向布局',
            attrs: { body: { stroke: '#597ef7', fill: '#d6e4ff', rx: 6, ry: 6 } },
            ports: {
                groups: {
                    top: { position: 'top', attrs: { circle: { r: 6, magnet: true, stroke: '#ff4d4f', fill: '#fff', strokeWidth: 2 } } },
                    right: { position: 'right', attrs: { circle: { r: 6, magnet: true, stroke: '#52c41a', fill: '#fff', strokeWidth: 2 } } },
                    bottom: { position: 'bottom', attrs: { circle: { r: 6, magnet: true, stroke: '#1890ff', fill: '#fff', strokeWidth: 2 } } },
                    left: { position: 'left', attrs: { circle: { r: 6, magnet: true, stroke: '#fa8c16', fill: '#fff', strokeWidth: 2 } } },
                },
                items: [
                    { id: 't1', group: 'top' },
                    { id: 't2', group: 'top' },
                    { id: 'r1', group: 'right' },
                    { id: 'r2', group: 'right' },
                    { id: 'b1', group: 'bottom' },
                    { id: 'b2', group: 'bottom' },
                    { id: 'l1', group: 'left' },
                    { id: 'l2', group: 'left' },
                ],
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

// 4. 椭圆分布
class EllipseGraph extends React.Component {
    private container!: HTMLDivElement

    componentDidMount() {
        const graph = new Graph({
            container: this.container,
            width: 400,
            height: 300,
            background: { color: '#f5f5f5' },
            grid: { visible: true, type: 'dot', size: 10 },
        })

        graph.addNode({
            shape: 'ellipse',
            x: 100,
            y: 60,
            width: 180,
            height: 140,
            label: '椭圆分布',
            attrs: { body: { stroke: '#722ed1', fill: '#efdbff' } },
            ports: {
                groups: {
                    ellipse: {
                        position: 'ellipse',
                        attrs: { circle: { r: 6, magnet: true, stroke: '#722ed1', fill: '#fff', strokeWidth: 2 } },
                    },
                },
                items: [
                    { id: 'e1', group: 'ellipse' },
                    { id: 'e2', group: 'ellipse' },
                    { id: 'e3', group: 'ellipse' },
                    { id: 'e4', group: 'ellipse' },
                    { id: 'e5', group: 'ellipse' },
                    { id: 'e6', group: 'ellipse' },
                ],
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

// 5. 标签位置
class LabelPositionGraph extends React.Component {
    private container!: HTMLDivElement

    componentDidMount() {
        const graph = new Graph({
            container: this.container,
            width: 500,
            height: 300,
            background: { color: '#f5f5f5' },
            grid: { visible: true, type: 'dot', size: 10 },
        })

        graph.addNode({
            shape: 'rect',
            x: 130,
            y: 60,
            width: 220,
            height: 140,
            label: '标签位置演示',
            attrs: { body: { stroke: '#597ef7', fill: '#d6e4ff', rx: 6, ry: 6 } },
            ports: {
                groups: {
                    top: {
                        position: 'top',
                        attrs: { circle: { r: 6, magnet: true, stroke: '#ff4d4f', fill: '#fff', strokeWidth: 2 } },
                        label: { position: 'top' },
                    },
                    right: {
                        position: 'right',
                        attrs: { circle: { r: 6, magnet: true, stroke: '#52c41a', fill: '#fff', strokeWidth: 2 } },
                        label: { position: 'right' },
                    },
                    bottom: {
                        position: 'bottom',
                        attrs: { circle: { r: 6, magnet: true, stroke: '#1890ff', fill: '#fff', strokeWidth: 2 } },
                        label: { position: 'bottom' },
                    },
                    left: {
                        position: 'left',
                        attrs: { circle: { r: 6, magnet: true, stroke: '#fa8c16', fill: '#fff', strokeWidth: 2 } },
                        label: { position: 'left' },
                    },
                },
                items: [
                    { id: 't1', group: 'top', attrs: { text: { text: 'top 标签' } } },
                    { id: 'r1', group: 'right', attrs: { text: { text: 'right 标签' } } },
                    { id: 'b1', group: 'bottom', attrs: { text: { text: 'bottom 标签' } } },
                    { id: 'l1', group: 'left', attrs: { text: { text: 'left 标签' } } },
                ],
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

// 6. 连接桩连线
class PortConnectionGraph extends React.Component {
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
            id: 'source',
            shape: 'rect',
            x: 40,
            y: 60,
            width: 140,
            height: 80,
            label: '源节点',
            attrs: { body: { stroke: '#597ef7', fill: '#d6e4ff', rx: 6, ry: 6 } },
            ports: {
                groups: {
                    right: { position: 'right', attrs: { circle: { r: 6, magnet: true, stroke: '#52c41a', fill: '#d9f7be', strokeWidth: 2 } } },
                },
                items: [
                    { id: 'out1', group: 'right', attrs: { text: { text: '输出 1' } } },
                    { id: 'out2', group: 'right', attrs: { text: { text: '输出 2' } } },
                ],
            },
        })

        graph.addNode({
            id: 'target',
            shape: 'rect',
            x: 300,
            y: 60,
            width: 140,
            height: 80,
            label: '目标节点',
            attrs: { body: { stroke: '#fa8c16', fill: '#ffe7ba', rx: 6, ry: 6 } },
            ports: {
                groups: {
                    left: { position: 'left', attrs: { circle: { r: 6, magnet: true, stroke: '#fa8c16', fill: '#ffe7ba', strokeWidth: 2 } } },
                },
                items: [
                    { id: 'in1', group: 'left', attrs: { text: { text: '输入 1' } } },
                    { id: 'in2', group: 'left', attrs: { text: { text: '输入 2' } } },
                ],
            },
        })

        graph.addEdge({
            source: { cell: 'source', port: 'out1' },
            target: { cell: 'target', port: 'in1' },
            attrs: { line: { stroke: '#52c41a', strokeWidth: 2 } },
        })

        graph.addEdge({
            source: { cell: 'source', port: 'out2' },
            target: { cell: 'target', port: 'in2' },
            attrs: { line: { stroke: '#fa8c16', strokeWidth: 2 } },
        })
    }

    refContainer = (container: HTMLDivElement) => {
        this.container = container
    }

    render() {
        return <div ref={this.refContainer} />
    }
}

const PortFullDemo: React.FC = () => {
    return (
        <div style={{ padding: 24 }}>
            <Typography>
                <Title level={2}>X6 连接桩（Port）完整教学</Title>
                <Paragraph>
                    了解连接桩的配置、增删改、位置布局以及标签配置。
                </Paragraph>
            </Typography>

            <Divider />

            <Title level={3}>1. 配置连接桩</Title>
            <Row gutter={[16, 16]}>
                <Col span={14}>
                    <Card title="基础演示">
                        <Paragraph>
                            连接桩通过 <Text code>ports</Text> 配置，包含 <Text code>groups</Text>（分组）和 <Text code>items</Text>（具体连接桩）。
                        </Paragraph>
                        <BasicPortGraph />
                    </Card>
                </Col>
                <Col span={10}>
                    <Card title="配置结构">
                        <pre style={{ background: '#f5f5f5', padding: 12, fontSize: 12 }}>
{`graph.addNode({
    ports: {
        // groups: 定义连接桩分组
        groups: {
            top: {
                position: 'top',
                attrs: {
                    circle: {
                        r: 6,
                        magnet: true,
                        stroke: '#597ef7',
                        fill: '#fff',
                    },
                },
            },
        },
        // items: 具体的连接桩
        items: [
            { id: 'port1', group: 'top' },
            { id: 'port2', group: 'top' },
        ],
    },
})`}
                        </pre>
                    </Card>
                </Col>
            </Row>

            <Divider />

            <Title level={3}>2. 修改连接桩</Title>
            <Row gutter={[16, 16]}>
                <Col span={14}>
                    <Card title="增删改演示">
                        <Paragraph>
                            通过 API 动态添加、删除、修改连接桩。
                        </Paragraph>
                        <PortCRUDGraph />
                    </Card>
                </Col>
                <Col span={10}>
                    <Card title="CRUD API">
                        <pre style={{ background: '#f5f5f5', padding: 12, fontSize: 12 }}>
{`// 添加连接桩
node.addPort({
    group: 'top',
    attrs: {
        text: { text: 'xx' },
    },
})

// 删除连接桩
node.removePort(portId)

// 更新连接桩
node.portProp(
    portId,
    'attrs/circle/stroke',
    color
)

// 获取所有连接桩
const ports = node.getPorts()`}
                        </pre>
                    </Card>
                </Col>
            </Row>

            <Divider />

            <Title level={3}>3. 连接桩位置</Title>
            <Row gutter={[16, 16]}>
                <Col span={14}>
                    <Card title="四方向布局">
                        <Paragraph>
                            支持 top、right、bottom、left 四个方向均匀分布。
                        </Paragraph>
                        <PositionGraph />
                    </Card>
                </Col>
                <Col span={10}>
                    <Card title="位置算法">
                        <pre style={{ background: '#f5f5f5', padding: 12, fontSize: 12 }}>
{`// 内置位置算法
position: 'top'           // 顶部均匀分布
position: 'right'         // 右侧均匀分布
position: 'bottom'        // 底部均匀分布
position: 'left'          // 左侧均匀分布
position: 'ellipse'       // 椭圆圆弧分布
position: 'ellipseSpread' // 椭圆均匀分布
position: 'line'          // 沿指定线分布

// 绝对定位
position: { name: 'absolute' }`}
                        </pre>
                    </Card>
                </Col>
            </Row>

            <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
                <Col span={14}>
                    <Card title="椭圆分布">
                        <Paragraph>
                            连接桩沿椭圆均匀分布。
                        </Paragraph>
                        <EllipseGraph />
                    </Card>
                </Col>
                <Col span={10}>
                    <Card title="椭圆分布配置">
                        <pre style={{ background: '#f5f5f5', padding: 12, fontSize: 12 }}>
{`groups: {
    ellipse: {
        position: 'ellipse',
        attrs: {
            circle: {
                r: 6,
                magnet: true,
                stroke: '#722ed1',
                fill: '#fff',
            },
        },
    },
},
items: [
    { id: 'e1', group: 'ellipse' },
    { id: 'e2', group: 'ellipse' },
    { id: 'e3', group: 'ellipse' },
    { id: 'e4', group: 'ellipse' },
    { id: 'e5', group: 'ellipse' },
    { id: 'e6', group: 'ellipse' },
]`}
                        </pre>
                    </Card>
                </Col>
            </Row>

            <Divider />

            <Title level={3}>4. 连接桩标签位置</Title>
            <Row gutter={[16, 16]}>
                <Col span={14}>
                    <Card title="标签位置演示">
                        <Paragraph>
                            通过 <Text code>label.position</Text> 控制标签在连接桩的方位。
                        </Paragraph>
                        <LabelPositionGraph />
                    </Card>
                </Col>
                <Col span={10}>
                    <Card title="标签位置选项">
                        <pre style={{ background: '#f5f5f5', padding: 12, fontSize: 12 }}>
{`// 标签位置
label.position: 'left'           // 连接桩左侧
label.position: 'right'          // 连接桩右侧
label.position: 'top'            // 连接桩上方
label.position: 'bottom'         // 连接桩下方
label.position: 'inside'         // 节点内围
label.position: 'outside'        // 节点外围
label.position: 'insideOriented' // 内围自动调整方向
label.position: 'outsideOriented'// 外围自动调整方向
label.position: 'radial'         // 圆形外围
label.position: 'radialOriented' // 圆形外围自动旋转`}
                        </pre>
                    </Card>
                </Col>
            </Row>

            <Divider />

            <Title level={3}>5. 连接桩连线</Title>
            <Row gutter={[16, 16]}>
                <Col span={14}>
                    <Card title="连线演示">
                        <Paragraph>
                            通过 <Text code>{`{ cell: 'nodeId', port: 'portId' }`}</Text> 指定连接桩进行连线。
                        </Paragraph>
                        <PortConnectionGraph />
                    </Card>
                </Col>
                <Col span={10}>
                    <Card title="连接桩连线代码">
                        <pre style={{ background: '#f5f5f5', padding: 12, fontSize: 12 }}>
{`graph.addEdge({
    source: {
        cell: 'source',  // 源节点 ID
        port: 'out1',    // 源连接桩 ID
    },
    target: {
        cell: 'target',  // 目标节点 ID
        port: 'in1',     // 目标连接桩 ID
    },
    attrs: {
        line: {
            stroke: '#52c41a',
            strokeWidth: 2,
        },
    },
})`}
                        </pre>
                    </Card>
                </Col>
            </Row>
            <PageNav {...getPageNav('/port-full-demo')} />
        </div>
    )
}

export default PortFullDemo
