import React from 'react'
import { Graph } from '@antv/x6'
import { Selection } from '@antv/x6-plugin-selection'
import { Card, Row, Col, Typography, Divider, Button, Space } from 'antd'
import PageNav, { getPageNav } from '../../components/PageNav'

const { Title, Paragraph, Text } = Typography

class BasicSelectionGraph extends React.Component {
    private container!: HTMLDivElement

    componentDidMount() {
        const graph = new Graph({
            container: this.container,
            width: 500,
            height: 300,
            background: { color: '#f5f5f5' },
            grid: { visible: true, type: 'dot', size: 10 },
        })

        graph.use(new Selection({ enabled: true }))

        graph.addNode({
            shape: 'rect',
            x: 60,
            y: 60,
            width: 100,
            height: 50,
            label: '节点 A',
            attrs: { body: { stroke: '#597ef7', fill: '#d6e4ff', rx: 6, ry: 6 } },
        })

        graph.addNode({
            shape: 'rect',
            x: 200,
            y: 120,
            width: 100,
            height: 50,
            label: '节点 B',
            attrs: { body: { stroke: '#52c41a', fill: '#d9f7be', rx: 6, ry: 6 } },
        })

        graph.addNode({
            shape: 'circle',
            x: 360,
            y: 80,
            width: 60,
            height: 60,
            label: 'C',
            attrs: { body: { stroke: '#fa8c16', fill: '#ffe7ba' } },
        })

        graph.addNode({
            shape: 'rect',
            x: 140,
            y: 200,
            width: 120,
            height: 50,
            label: '节点 D',
            attrs: { body: { stroke: '#722ed1', fill: '#efdbff', rx: 6, ry: 6 } },
        })
    }

    refContainer = (container: HTMLDivElement) => { this.container = container }
    render() { return <div ref={this.refContainer} /> }
}

class RubberbandSelectionGraph extends React.Component {
    private container!: HTMLDivElement

    componentDidMount() {
        const graph = new Graph({
            container: this.container,
            width: 500,
            height: 300,
            background: { color: '#f5f5f5' },
            grid: { visible: true, type: 'dot', size: 10 },
        })

        graph.use(new Selection({
            enabled: true,
            multiple: true,
            rubberband: true,
            movable: true,
        }))

        const colors = ['#597ef7', '#52c41a', '#fa8c16', '#722ed1', '#eb2f96']
        for (let i = 0; i < 6; i++) {
            graph.addNode({
                shape: 'rect',
                x: 40 + (i % 3) * 150,
                y: 50 + Math.floor(i / 3) * 120,
                width: 100,
                height: 60,
                label: '节点 ' + (i + 1),
                attrs: {
                    body: {
                        stroke: colors[i],
                        fill: colors[i] + '20',
                        rx: 6,
                        ry: 6,
                    },
                },
            })
        }
    }

    refContainer = (container: HTMLDivElement) => { this.container = container }
    render() { return <div ref={this.refContainer} /> }
}

class APISelectionGraph extends React.Component {
    private container!: HTMLDivElement
    private graph!: Graph
    private selection!: Selection

    componentDidMount() {
        this.graph = new Graph({
            container: this.container,
            width: 500,
            height: 280,
            background: { color: '#f5f5f5' },
            grid: { visible: true, type: 'dot', size: 10 },
        })

        this.selection = new Selection({
            enabled: true,
            multiple: true,
        })

        this.graph.use(this.selection)

        this.graph.addNode({
            id: 'a',
            shape: 'rect',
            x: 60,
            y: 60,
            width: 100,
            height: 50,
            label: '节点 A',
            attrs: { body: { stroke: '#597ef7', fill: '#d6e4ff', rx: 6, ry: 6 } },
        })

        this.graph.addNode({
            id: 'b',
            shape: 'rect',
            x: 200,
            y: 120,
            width: 100,
            height: 50,
            label: '节点 B',
            attrs: { body: { stroke: '#52c41a', fill: '#d9f7be', rx: 6, ry: 6 } },
        })

        this.graph.addNode({
            id: 'c',
            shape: 'circle',
            x: 360,
            y: 80,
            width: 60,
            height: 60,
            label: 'C',
            attrs: { body: { stroke: '#fa8c16', fill: '#ffe7ba' } },
        })
    }

    selectA = () => { this.graph.select('a') }
    selectB = () => { this.graph.select('b') }
    selectAll = () => { this.graph.select(['a', 'b', 'c']) }
    unselectAll = () => { this.graph.cleanSelection() }
    getSelected = () => {
        const cells = this.graph.getSelectedCells()
        alert('选中了 ' + cells.length + ' 个节点: ' + cells.map(c => c.id).join(', '))
    }

    refContainer = (container: HTMLDivElement) => { this.container = container }
    render() {
        return (
            <div>
                <div ref={this.refContainer} />
                <Space style={{ marginTop: 8 }} wrap>
                    <Button onClick={this.selectA}>选中 A</Button>
                    <Button onClick={this.selectB}>选中 B</Button>
                    <Button onClick={this.selectAll}>全选</Button>
                    <Button onClick={this.unselectAll}>取消选择</Button>
                    <Button type="primary" onClick={this.getSelected}>获取选中</Button>
                </Space>
            </div>
        )
    }
}

const SelectionDemo: React.FC = () => {
    return (
        <div style={{ padding: 24 }}>
            <Typography>
                <Title level={2}>X6 框选（Selection）学习</Title>
                <Paragraph>
                    了解 X6 的选择与框选功能，包括点击选择、多选、框选以及相关配置和 API。
                </Paragraph>
            </Typography>

            <Divider />

            <Title level={3}>1. 基础选择</Title>
            <Row gutter={[16, 16]}>
                <Col span={14}>
                    <Card title="基础演示">
                        <Paragraph>
                            点击节点即可选中，选中后节点会显示选中状态的高亮框。需要先安装插件：
                        </Paragraph>
                        <pre style={{ background: '#f5f5f5', padding: 8, marginBottom: 12, fontSize: 12 }}>
                            npm install @antv/x6-plugin-selection
                        </pre>
                        <BasicSelectionGraph />
                    </Card>
                </Col>
                <Col span={10}>
                    <Card title="使用方式">
                        <pre style={{ background: '#f5f5f5', padding: 12, fontSize: 12 }}>
{`import { Selection } from '@antv/x6-plugin-selection'

const graph = new Graph({
    container: this.container,
    width: 500,
    height: 300,
})

graph.use(
    new Selection({
        enabled: true,
    }),
)`}
                        </pre>
                    </Card>
                </Col>
            </Row>

            <Divider />

            <Title level={3}>2. 多选与框选</Title>
            <Row gutter={[16, 16]}>
                <Col span={14}>
                    <Card title="多选与框选演示">
                        <Paragraph>
                            按住 <Text code>Ctrl</Text> 键点击节点可以多选。在空白处按住鼠标拖动可以框选多个节点。
                        </Paragraph>
                        <RubberbandSelectionGraph />
                    </Card>
                </Col>
                <Col span={10}>
                    <Card title="配置项">
                        <pre style={{ background: '#f5f5f5', padding: 12, fontSize: 12 }}>
{`new Selection({
    enabled: true,

    // 是否启用多选
    // 按住 Ctrl/Cmd 点击多选
    multiple: true,

    // 是否启用框选
    // 在空白处拖动框选
    rubberband: true,

    // 框选时是否完全包围才选中
    strict: false,

    // 拖动选框时是否移动选中节点
    movable: true,

    // 框选触发方式
    // 'leftMouseDown' 鼠标左键
    // 'mouseWheelDown' 鼠标中键
    eventTypes: ['leftMouseDown'],
})`}
                        </pre>
                    </Card>
                </Col>
            </Row>

            <Divider />

            <Title level={3}>3. Selection API</Title>
            <Row gutter={[16, 16]}>
                <Col span={14}>
                    <Card title="API 演示">
                        <Paragraph>
                            通过 API 可以程序化地控制选择状态。
                        </Paragraph>
                        <APISelectionGraph />
                    </Card>
                </Col>
                <Col span={10}>
                    <Card title="API 速查">
                        <pre style={{ background: '#f5f5f5', padding: 12, fontSize: 12 }}>
{`// 选中指定节点
graph.select(cells)

// 取消选中
graph.unselect(cells)

// 清空选区
graph.cleanSelection()

// 重置选区
graph.resetSelection(cells?)

// 获取选中的节点
graph.getSelectedCells()

// 判断是否选中
graph.isSelected(cell)

// 判断选区是否为空
graph.isSelectionEmpty()

// 启用/禁用选择
graph.enableSelection()
graph.disableSelection()

// 启用/禁用框选
graph.enableRubberband()
graph.disableRubberband()`}
                        </pre>
                    </Card>
                </Col>
            </Row>

            <Divider />

            <Title level={3}>4. 修饰键与过滤</Title>
            <Card>
                <pre style={{ background: '#f5f5f5', padding: 16 }}>
{`// 设置框选修饰键
// 按住 Alt 键才能触发框选
new Selection({
    enabled: true,
    rubberband: true,
    modifiers: 'alt',
})

// 设置多选修饰键
new Selection({
    enabled: true,
    multiple: true,
    multipleSelectionModifiers: ['ctrl', 'meta'],
})

// 节点过滤
// 只有指定节点才能被选中
new Selection({
    enabled: true,
    filter: ['rect', 'circle'],
    // 或
    filter: [{ id: 'node1' }, { id: 'node2' }],
    // 或
    filter: (cell) => cell.shape !== 'circle',
})

// 显示选中节点数量
new Selection({
    enabled: true,
    showNodeSelectionBox: true,
})`}
                </pre>
            </Card>

            <Divider />

            <Title level={3}>5. 事件监听</Title>
            <Card>
                <pre style={{ background: '#f5f5f5', padding: 16 }}>
{`// 节点被选中时触发
graph.on('node:selected', ({ node }) => {
    console.log('选中:', node.id)
})

// 节点取消选中时触发
graph.on('node:unselected', ({ node }) => {
    console.log('取消选中:', node.id)
})

// 选区变化时触发
graph.on('selection:changed', ({ added, removed, selected }) => {
    console.log('新增:', added)
    console.log('移除:', removed)
    console.log('当前选中:', selected)
})`}
                </pre>
            </Card>

            <PageNav {...getPageNav('/selection-demo')} />
        </div>
    )
}

export default SelectionDemo
