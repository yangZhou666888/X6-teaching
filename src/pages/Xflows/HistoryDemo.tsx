import React from 'react'
import { Graph } from '@antv/x6'
import { History } from '@antv/x6-plugin-history'
import { Keyboard } from '@antv/x6-plugin-keyboard'
import { Card, Row, Col, Typography, Divider, Button, Space } from 'antd'
import PageNav, { getPageNav } from '../../components/PageNav'

const { Title, Paragraph, Text } = Typography

class BasicHistoryGraph extends React.Component {
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

        this.graph.use(new History({ enabled: true }))
        this.graph.use(new Keyboard({ enabled: true }))

        this.graph.bindKey('ctrl+z', () => this.graph.undo())
        this.graph.bindKey('ctrl+shift+z', () => this.graph.redo())

        this.graph.addNode({
            shape: 'rect',
            x: 60,
            y: 80,
            width: 120,
            height: 60,
            label: '拖动我',
            attrs: { body: { stroke: '#597ef7', fill: '#d6e4ff', rx: 6, ry: 6 } },
        })

        this.graph.addNode({
            shape: 'circle',
            x: 250,
            y: 100,
            width: 60,
            height: 60,
            label: '拖动',
            attrs: { body: { stroke: '#52c41a', fill: '#d9f7be' } },
        })

        this.graph.addNode({
            shape: 'rect',
            x: 350,
            y: 80,
            width: 100,
            height: 60,
            label: '试试',
            attrs: { body: { stroke: '#fa8c16', fill: '#ffe7ba', rx: 6, ry: 6 } },
        })
    }

    undo = () => { this.graph.undo() }
    redo = () => { this.graph.redo() }

    refContainer = (container: HTMLDivElement) => { this.container = container }
    render() {
        return (
            <div>
                <div ref={this.refContainer} />
                <Space style={{ marginTop: 8 }}>
                    <Button onClick={this.undo} disabled={!this.graph?.canUndo()}>撤销 (Undo)</Button>
                    <Button onClick={this.redo} disabled={!this.graph?.canRedo()}>重做 (Redo)</Button>
                </Space>
            </div>
        )
    }
}

class BatchHistoryGraph extends React.Component {
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

        this.graph.use(new History({ enabled: true }))
        this.graph.use(new Keyboard({ enabled: true }))

        this.graph.bindKey('ctrl+z', () => this.graph.undo())
        this.graph.bindKey('ctrl+shift+z', () => this.graph.redo())

        this.graph.addNode({
            id: 'batch-node',
            shape: 'rect',
            x: 150,
            y: 80,
            width: 180,
            height: 80,
            label: '批量操作节点',
            attrs: { body: { stroke: '#597ef7', fill: '#d6e4ff', rx: 6, ry: 6 } },
        })
    }

    batchChange = () => {
        const node = this.graph.getCellById('batch-node')
        // 批量操作 - 一次性撤销
        this.graph.batchUpdate(() => {
            node.attr('body/fill', '#d9f7be')
            node.attr('body/stroke', '#52c41a')
            node.attr('label/text', '已修改颜色')
            node.prop('position', { x: 200, y: 120 })
            node.prop('size', { width: 200, height: 100 })
        })
    }

    singleChange = () => {
        const node = this.graph.getCellById('batch-node')
        // 单独操作 - 每次撤销一步
        node.attr('body/fill', '#fff1f0')
        node.attr('body/stroke', '#ff4d4f')
        node.attr('label/text', '单独修改')
    }

    refContainer = (container: HTMLDivElement) => { this.container = container }
    render() {
        return (
            <div>
                <div ref={this.refContainer} />
                <Space style={{ marginTop: 8 }}>
                    <Button type="primary" onClick={this.batchChange}>批量修改（一次撤销）</Button>
                    <Button onClick={this.singleChange}>单独修改（逐步撤销）</Button>
                </Space>
            </div>
        )
    }
}

class ConfigHistoryGraph extends React.Component {
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

        this.graph.use(new History({
            enabled: true,
            stackSize: 5,
            ignoreAdd: true,
        }))

        this.graph.addNode({
            shape: 'rect',
            x: 150,
            y: 60,
            width: 160,
            height: 60,
            label: '最多记录5步',
            attrs: { body: { stroke: '#597ef7', fill: '#d6e4ff', rx: 6, ry: 6 } },
        })

        this.graph.addNode({
            shape: 'rect',
            x: 150,
            y: 160,
            width: 160,
            height: 60,
            label: '添加不记录',
            attrs: { body: { stroke: '#52c41a', fill: '#d9f7be', rx: 6, ry: 6 } },
        })
    }

    undo = () => { this.graph.undo() }
    redo = () => { this.graph.redo() }
    clean = () => { this.graph.cleanHistory() }

    refContainer = (container: HTMLDivElement) => { this.container = container }
    render() {
        return (
            <div>
                <div ref={this.refContainer} />
                <Space style={{ marginTop: 8 }}>
                    <Button onClick={this.undo}>撤销</Button>
                    <Button onClick={this.redo}>重做</Button>
                    <Button danger onClick={this.clean}>清空历史</Button>
                </Space>
            </div>
        )
    }
}

const HistoryDemo: React.FC = () => {
    return (
        <div style={{ padding: 24 }}>
            <Typography>
                <Title level={2}>X6 撤销重做（History）学习</Title>
                <Paragraph>
                    了解 X6 的历史记录功能，包括撤销、重做操作，以及批量操作和历史记录配置。
                </Paragraph>
            </Typography>

            <Divider />

            <Title level={3}>1. 基础撤销重做</Title>
            <Row gutter={[16, 16]}>
                <Col span={14}>
                    <Card title="基础演示">
                        <Paragraph>
                            拖动节点后，点击撤销按钮可以还原位置，点击重做可以重新应用。也可以使用 <Text code>Ctrl+Z</Text> 撤销，<Text code>Ctrl+Shift+Z</Text> 重做。
                        </Paragraph>
                        <pre style={{ background: '#f5f5f5', padding: 8, marginBottom: 12, fontSize: 12 }}>
                            npm install @antv/x6-plugin-history @antv/x6-plugin-keyboard
                        </pre>
                        <BasicHistoryGraph />
                    </Card>
                </Col>
                <Col span={10}>
                    <Card title="使用方式">
                        <pre style={{ background: '#f5f5f5', padding: 12, fontSize: 12 }}>
{`import { History } from '@antv/x6-plugin-history'
import { Keyboard } from '@antv/x6-plugin-keyboard'

const graph = new Graph({ ... })

graph.use(new History({ enabled: true }))
graph.use(new Keyboard({ enabled: true }))

// 绑定快捷键
graph.bindKey('ctrl+z', () => {
    graph.undo()
})

graph.bindKey('ctrl+shift+z', () => {
    graph.redo()
})`}
                        </pre>
                    </Card>
                </Col>
            </Row>

            <Divider />

            <Title level={3}>2. 批量操作</Title>
            <Row gutter={[16, 16]}>
                <Col span={14}>
                    <Card title="批量操作演示">
                        <Paragraph>
                            使用 <Text code>graph.batchUpdate()</Text> 可以将多个操作合并为一条历史记录，一次撤销即可还原所有更改。
                        </Paragraph>
                        <BatchHistoryGraph />
                    </Card>
                </Col>
                <Col span={10}>
                    <Card title="批量操作方式">
                        <pre style={{ background: '#f5f5f5', padding: 12, fontSize: 12 }}>
{`// 方式一: batchUpdate
graph.batchUpdate(() => {
    node.attr('body/fill', 'red')
    node.attr('label/text', '修改')
    node.prop('position', { x: 100, y: 100 })
})
// 以上操作合并为一条记录

// 方式二: startBatch/stopBatch
graph.startBatch('my-batch')

node.attr('body/fill', 'red')
node.prop('size', { width: 200, height: 100 })

graph.stopBatch('my-batch')`}
                        </pre>
                    </Card>
                </Col>
            </Row>

            <Divider />

            <Title level={3}>3. History 配置</Title>
            <Row gutter={[16, 16]}>
                <Col span={14}>
                    <Card title="配置演示">
                        <Paragraph>
                            可以配置历史记录栈大小、是否忽略添加/删除/修改等。当前演示设置了最多记录 5 步，且添加节点不记录。
                        </Paragraph>
                        <ConfigHistoryGraph />
                    </Card>
                </Col>
                <Col span={10}>
                    <Card title="配置项说明">
                        <pre style={{ background: '#f5f5f5', padding: 12, fontSize: 12 }}>
{`new History({
    enabled: true,

    // 历史记录栈大小
    // 0 表示不限制
    stackSize: 5,

    // 是否忽略添加操作
    ignoreAdd: true,

    // 是否忽略删除操作
    ignoreRemove: false,

    // 是否忽略属性变化
    ignoreChange: false,
})`}
                        </pre>
                    </Card>
                </Col>
            </Row>

            <Divider />

            <Title level={3}>4. History API</Title>
            <Card>
                <pre style={{ background: '#f5f5f5', padding: 16 }}>
{`// 撤销
graph.undo(options?)

// 重做
graph.redo(options?)

// 撤销且不加入重做队列
graph.undoAndCancel(options?)

// 判断是否可以撤销/重做
graph.canUndo()  // boolean
graph.canRedo()  // boolean

// 清空历史记录
graph.cleanHistory()

// 启用/禁用历史
graph.enableHistory()
graph.disableHistory()
graph.toggleHistory(enabled?)

// 获取历史栈大小
graph.getHistoryStackSize()

// 获取撤销栈大小
graph.getUndoStackSize()

// 获取重做栈大小
graph.getRedoStackSize()`}
                </pre>
            </Card>

            <Divider />

            <Title level={3}>5. 事件监听</Title>
            <Card>
                <pre style={{ background: '#f5f5f5', padding: 16 }}>
{`// 撤销时触发
graph.on('history:undo', ({ cmds }) => {
    console.log('撤销:', cmds)
})

// 重做时触发
graph.on('history:redo', ({ cmds }) => {
    console.log('重做:', cmds)
})

// 历史记录变化时触发
graph.on('history:change', ({ cmds }) => {
    console.log('历史变化:', cmds)
    console.log('可撤销:', graph.canUndo())
    console.log('可重做:', graph.canRedo())
})`}
                </pre>
            </Card>

            <PageNav {...getPageNav('/history-demo')} />
        </div>
    )
}

export default HistoryDemo
