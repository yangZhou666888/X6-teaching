import React from 'react'
import { Graph } from '@antv/x6'
import { Card, Row, Col, Typography, Divider, Button, Space } from 'antd'
import PageNav, { getPageNav } from '../../components/PageNav';

const { Title, Paragraph, Text } = Typography

// 1. 基础连接桩配置
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
            x: 120,
            y: 60,
            width: 160,
            height: 100,
            label: '基础连接桩',
            attrs: { body: { stroke: '#597ef7', fill: '#d6e4ff', rx: 6, ry: 6 } },
            ports: {
                // TODO: 配置 groups（分组）
                // 提示：定义 top 和 bottom 两个分组
                // top: { position: 'top', attrs: { circle: { r: 6, magnet: true, ... } } }
                // bottom: { position: 'bottom', attrs: { circle: { r: 6, magnet: true, ... } } }
                groups: {

                },
                // TODO: 配置 items（连接桩）
                // 提示：添加 2 个 top 和 2 个 bottom 连接桩
                items: [

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

// 2. 四方向连接桩
class FourDirPortGraph extends React.Component {
    private container!: HTMLDivElement

    componentDidMount() {
        const graph = new Graph({
            container: this.container,
            width: 400,
            height: 280,
            background: { color: '#f5f5f5' },
            grid: { visible: true, type: 'dot', size: 10 },
        })

        graph.addNode({
            shape: 'rect',
            x: 120,
            y: 60,
            width: 160,
            height: 100,
            label: '四方向',
            attrs: { body: { stroke: '#597ef7', fill: '#d6e4ff', rx: 6, ry: 6 } },
            ports: {
                // TODO: 配置四个方向的分组
                // 提示：top, right, bottom, left
                groups: {

                },
                // TODO: 每个方向各添加 1 个连接桩
                items: [

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

// 3. 连接桩 CRUD
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
            x: 120,
            y: 60,
            width: 160,
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
        // TODO: 添加一个 bottom 连接桩
    }

    removePort = () => {
        // TODO: 删除最后一个连接桩
        // 提示：先获取所有连接桩 node.getPorts()，再删除最后一个
    }

    updatePort = () => {
        // TODO: 修改第一个连接桩的颜色
        // 提示：node.portProp(portId, 'attrs/circle/stroke', '#ff4d4f')
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

// 4. 连接桩连线
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

        // 源节点
        graph.addNode({
            id: 'source',
            shape: 'rect',
            x: 40,
            y: 80,
            width: 140,
            height: 80,
            label: '源节点',
            attrs: { body: { stroke: '#597ef7', fill: '#d6e4ff', rx: 6, ry: 6 } },
            ports: {
                groups: {
                    right: {
                        position: 'right',
                        attrs: { circle: { r: 6, magnet: true, stroke: '#52c41a', fill: '#d9f7be', strokeWidth: 2 } },
                    },
                },
                items: [
                    { id: 'out1', group: 'right', attrs: { text: { text: '输出 1' } } },
                    { id: 'out2', group: 'right', attrs: { text: { text: '输出 2' } } },
                ],
            },
        })

        // 目标节点
        graph.addNode({
            id: 'target',
            shape: 'rect',
            x: 300,
            y: 80,
            width: 140,
            height: 80,
            label: '目标节点',
            attrs: { body: { stroke: '#fa8c16', fill: '#ffe7ba', rx: 6, ry: 6 } },
            ports: {
                groups: {
                    left: {
                        position: 'left',
                        attrs: { circle: { r: 6, magnet: true, stroke: '#fa8c16', fill: '#ffe7ba', strokeWidth: 2 } },
                    },
                },
                items: [
                    { id: 'in1', group: 'left', attrs: { text: { text: '输入 1' } } },
                    { id: 'in2', group: 'left', attrs: { text: { text: '输入 2' } } },
                ],
            },
        })

        // TODO: 添加两条边，连接 out1 -> in1, out2 -> in2
        // 提示：source: { cell: 'source', port: 'out1' }
    }

    refContainer = (container: HTMLDivElement) => {
        this.container = container
    }

    render() {
        return <div ref={this.refContainer} />
    }
}

const PortPractice: React.FC = () => {
    return (
        <div style={{ padding: 24 }}>
            <Typography>
                <Title level={2}>X6 连接桩（Port）练习</Title>
                <Paragraph>
                    请根据 TODO 提示，补充每个示例的配置。
                </Paragraph>
            </Typography>

            <Divider />

            <Row gutter={[16, 16]}>
                <Col span={12}>
                    <Card title="1. 基础连接桩配置">
                        <Paragraph>
                            TODO: 配置 <Text code>groups</Text> 和 <Text code>items</Text>
                        </Paragraph>
                        <BasicPortGraph />
                    </Card>
                </Col>

                <Col span={12}>
                    <Card title="2. 四方向连接桩">
                        <Paragraph>
                            TODO: 配置 top、right、bottom、left 四个方向
                        </Paragraph>
                        <FourDirPortGraph />
                    </Card>
                </Col>
            </Row>

            <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
                <Col span={12}>
                    <Card title="3. 连接桩 CRUD">
                        <Paragraph>
                            TODO: 实现添加、删除、修改连接桩
                        </Paragraph>
                        <PortCRUDGraph />
                    </Card>
                </Col>

                <Col span={12}>
                    <Card title="4. 连接桩连线">
                        <Paragraph>
                            TODO: 通过 <Text code>{`{ cell, port }`}</Text> 连接两个节点的连接桩
                        </Paragraph>
                        <PortConnectionGraph />
                    </Card>
                </Col>
            </Row>
            <PageNav {...getPageNav('/port-practice')} />
        </div>
    )
}

export default PortPractice
