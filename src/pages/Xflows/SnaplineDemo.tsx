import React from 'react'
import { Graph } from '@antv/x6'
import { Snapline } from '@antv/x6-plugin-snapline'
import { Card, Row, Col, Typography, Divider, Button, Space, Switch } from 'antd'
import PageNav, { getPageNav } from '../../components/PageNav'

const { Title, Paragraph, Text } = Typography

class BasicSnaplineGraph extends React.Component {
    private container!: HTMLDivElement

    componentDidMount() {
        const graph = new Graph({
            container: this.container,
            width: 500,
            height: 300,
            background: { color: '#f5f5f5' },
            grid: { visible: true, type: 'dot', size: 10 },
        })

        graph.use(new Snapline({ enabled: true }))

        graph.addNode({
            shape: 'rect',
            x: 60,
            y: 60,
            width: 120,
            height: 60,
            label: '节点 A',
            attrs: { body: { stroke: '#597ef7', fill: '#d6e4ff', rx: 6, ry: 6 } },
        })

        graph.addNode({
            shape: 'rect',
            x: 300,
            y: 150,
            width: 120,
            height: 60,
            label: '节点 B',
            attrs: { body: { stroke: '#52c41a', fill: '#d9f7be', rx: 6, ry: 6 } },
        })

        graph.addNode({
            shape: 'circle',
            x: 200,
            y: 200,
            width: 60,
            height: 60,
            label: 'C',
            attrs: { body: { stroke: '#fa8c16', fill: '#ffe7ba' } },
        })
    }

    refContainer = (container: HTMLDivElement) => { this.container = container }
    render() { return <div ref={this.refContainer} /> }
}

class ConfigSnaplineGraph extends React.Component {
    private container!: HTMLDivElement
    private graph!: Graph

    componentDidMount() {
        this.graph = new Graph({
            container: this.container,
            width: 500,
            height: 300,
            background: { color: '#f5f5f5' },
            grid: { visible: true, type: 'dot', size: 10 },
        })

        this.graph.use(new Snapline({ enabled: true, tolerance: 20, sharp: true }))

        this.graph.addNode({
            shape: 'rect',
            x: 60,
            y: 60,
            width: 120,
            height: 60,
            label: '对齐精度 20px',
            attrs: { body: { stroke: '#597ef7', fill: '#d6e4ff', rx: 6, ry: 6 } },
        })

        this.graph.addNode({
            shape: 'rect',
            x: 300,
            y: 150,
            width: 120,
            height: 60,
            label: '短款对齐线',
            attrs: { body: { stroke: '#52c41a', fill: '#d9f7be', rx: 6, ry: 6 } },
        })

        this.graph.addNode({
            shape: 'rect',
            x: 180,
            y: 220,
            width: 120,
            height: 60,
            label: '拖动试试',
            attrs: { body: { stroke: '#fa8c16', fill: '#ffe7ba', rx: 6, ry: 6 } },
        })
    }

    refContainer = (container: HTMLDivElement) => { this.container = container }
    render() { return <div ref={this.refContainer} /> }
}

class APISnaplineGraph extends React.Component {
    private container!: HTMLDivElement
    private graph!: Graph

    componentDidMount() {
        this.graph = new Graph({
            container: this.container,
            width: 500,
            height: 280,
            background: { color: '#f5f5f5' },
            grid: { visible: true, type: 'dot', size: 10 },
        })

        this.graph.use(new Snapline({ enabled: true }))

        this.graph.addNode({
            shape: 'rect',
            x: 60,
            y: 60,
            width: 120,
            height: 60,
            label: '节点 A',
            attrs: { body: { stroke: '#597ef7', fill: '#d6e4ff', rx: 6, ry: 6 } },
        })

        this.graph.addNode({
            shape: 'rect',
            x: 300,
            y: 150,
            width: 120,
            height: 60,
            label: '节点 B',
            attrs: { body: { stroke: '#52c41a', fill: '#d9f7be', rx: 6, ry: 6 } },
        })
    }

    toggleSnapline = () => {
        if (this.graph.isSnaplineEnabled()) {
            this.graph.disableSnapline()
        } else {
            this.graph.enableSnapline()
        }
    }

    setTolerance = (tolerance: number) => {
        this.graph.setSnaplineTolerance(tolerance)
    }

    refContainer = (container: HTMLDivElement) => { this.container = container }
    render() {
        return (
            <div>
                <div ref={this.refContainer} />
                <Space style={{ marginTop: 8 }}>
                    <Button onClick={this.toggleSnapline}>切换对齐线</Button>
                    <Button onClick={() => this.setTolerance(5)}>精度 5px</Button>
                    <Button onClick={() => this.setTolerance(20)}>精度 20px</Button>
                </Space>
            </div>
        )
    }
}

const SnaplineDemo: React.FC = () => {
    return (
        <div style={{ padding: 24 }}>
            <Typography>
                <Title level={2}>X6 对齐线（Snapline）学习</Title>
                <Paragraph>
                    对齐线是移动节点排版的辅助工具，当移动的节点与其他节点对齐时，会自动出现对齐线，帮助用户进行位置排版。
                </Paragraph>
            </Typography>

            <Divider />

            <Title level={3}>1. 基础对齐线</Title>
            <Row gutter={[16, 16]}>
                <Col span={14}>
                    <Card title="基础演示">
                        <Paragraph>
                            拖动任意节点，当与其他节点的边缘或中心对齐时，会出现蓝色对齐线。需要先安装插件：
                        </Paragraph>
                        <pre style={{ background: '#f5f5f5', padding: 8, marginBottom: 12, fontSize: 12 }}>
                            npm install @antv/x6-plugin-snapline
                        </pre>
                        <BasicSnaplineGraph />
                    </Card>
                </Col>
                <Col span={10}>
                    <Card title="使用方式">
                        <pre style={{ background: '#f5f5f5', padding: 12, fontSize: 12 }}>
{`import { Snapline } from '@antv/x6-plugin-snapline'

const graph = new Graph({
    container: this.container,
    width: 500,
    height: 300,
})

graph.use(
    new Snapline({
        enabled: true,
    }),
)`}
                        </pre>
                    </Card>
                </Col>
            </Row>

            <Divider />

            <Title level={3}>2. 对齐线配置</Title>
            <Row gutter={[16, 16]}>
                <Col span={14}>
                    <Card title="配置演示">
                        <Paragraph>
                            可以配置对齐精度（tolerance）和短款对齐线（sharp）。当前演示设置了精度为 20px 和短款对齐线。
                        </Paragraph>
                        <ConfigSnaplineGraph />
                    </Card>
                </Col>
                <Col span={10}>
                    <Card title="配置项说明">
                        <pre style={{ background: '#f5f5f5', padding: 12, fontSize: 12 }}>
{`new Snapline({
    enabled: true,

    // 对齐精度 (px)
    // 移动节点时与目标位置
    // 距离小于 tolerance 时触发
    tolerance: 20,

    // 是否显示截断的对齐线
    // false: 贯穿画布
    // true: 只到相关节点
    sharp: true,

    // 改变大小时是否触发
    resizing: false,

    // 是否自动清除对齐线
    // true: 3s 后清除
    // false: 不清除
    // number: 指定时间后清除
    clean: true,
})`}
                        </pre>
                    </Card>
                </Col>
            </Row>

            <Divider />

            <Title level={3}>3. 对齐线 API</Title>
            <Row gutter={[16, 16]}>
                <Col span={14}>
                    <Card title="API 演示">
                        <Paragraph>
                            通过 API 可以动态控制对齐线的启用/禁用，以及调整对齐精度。
                        </Paragraph>
                        <APISnaplineGraph />
                    </Card>
                </Col>
                <Col span={10}>
                    <Card title="API 速查">
                        <pre style={{ background: '#f5f5f5', padding: 12, fontSize: 12 }}>
{`// 启用对齐线
graph.enableSnapline()

// 禁用对齐线
graph.disableSnapline()

// 切换状态
graph.toggleSnapline(enabled?)

// 判断是否启用
graph.isSnaplineEnabled()

// 设置精度
graph.setSnaplineTolerance(10)

// 获取精度
graph.getSnaplineTolerance()

// 启用调整大小触发
graph.enableSnaplineOnResizing()

// 禁用调整大小触发
graph.disableSnaplineOnResizing()

// 隐藏对齐线
graph.hideSnapline()`}
                        </pre>
                    </Card>
                </Col>
            </Row>

            <Divider />

            <Title level={3}>4. 节点过滤</Title>
            <Card>
                <pre style={{ background: '#f5f5f5', padding: 16 }}>
{`// 只有指定 shape 的节点参与对齐计算
graph.use(
    new Snapline({
        enabled: true,
        filter: ['rect', 'circle'],
    }),
)

// 只有指定 ID 的节点参与对齐计算
graph.use(
    new Snapline({
        enabled: true,
        filter: [
            { id: 'node1' },
            { id: 'node2' },
        ],
    }),
)

// 使用函数过滤
graph.use(
    new Snapline({
        enabled: true,
        filter: (node) => {
            // 返回 true 的节点参与对齐计算
            return node.shape !== 'circle'
        },
    }),
)`}
                </pre>
            </Card>

            <PageNav {...getPageNav('/snapline-demo')} />
        </div>
    )
}

export default SnaplineDemo
