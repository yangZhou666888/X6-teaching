import React from 'react'
import { Graph } from '@antv/x6'
import { Clipboard } from '@antv/x6-plugin-clipboard'
import { Keyboard } from '@antv/x6-plugin-keyboard'
import { Selection } from '@antv/x6-plugin-selection'
import { Card, Row, Col, Typography, Divider, Button, Space } from 'antd'
import PageNav, { getPageNav } from '../../components/PageNav'

const { Title, Paragraph, Text } = Typography

class BasicClipboardGraph extends React.Component {
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

        this.graph.use(new Selection({ enabled: true, multiple: true }))
        this.graph.use(new Clipboard({ enabled: true }))
        this.graph.use(new Keyboard({ enabled: true }))

        this.graph.bindKey('ctrl+c', () => {
            const cells = this.graph.getSelectedCells()
            if (cells.length) {
                this.graph.copy(cells)
            }
        })

        this.graph.bindKey('ctrl+v', () => {
            if (!this.graph.isClipboardEmpty()) {
                const cells = this.graph.paste({ offset: 32 })
                this.graph.cleanSelection()
                this.graph.select(cells)
            }
        })

        this.graph.addNode({
            shape: 'rect',
            x: 60,
            y: 60,
            width: 120,
            height: 60,
            label: '选中后复制',
            attrs: { body: { stroke: '#597ef7', fill: '#d6e4ff', rx: 6, ry: 6 } },
        })

        this.graph.addNode({
            shape: 'circle',
            x: 250,
            y: 100,
            width: 60,
            height: 60,
            label: 'A',
            attrs: { body: { stroke: '#52c41a', fill: '#d9f7be' } },
        })

        this.graph.addNode({
            shape: 'rect',
            x: 350,
            y: 60,
            width: 100,
            height: 50,
            label: '节点 B',
            attrs: { body: { stroke: '#fa8c16', fill: '#ffe7ba', rx: 6, ry: 6 } },
        })
    }

    copyAll = () => {
        const cells = this.graph.getCells()
        this.graph.copy(cells)
    }

    paste = () => {
        if (!this.graph.isClipboardEmpty()) {
            this.graph.paste({ offset: 32 })
        }
    }

    cutSelected = () => {
        const cells = this.graph.getSelectedCells()
        if (cells.length) {
            this.graph.cut(cells)
        }
    }

    refContainer = (container: HTMLDivElement) => { this.container = container }
    render() {
        return (
            <div>
                <div ref={this.refContainer} />
                <Space style={{ marginTop: 8 }}>
                    <Button onClick={this.copyAll}>复制全部</Button>
                    <Button type="primary" onClick={this.paste}>粘贴</Button>
                    <Button danger onClick={this.cutSelected}>剪切选中</Button>
                </Space>
            </div>
        )
    }
}

class LocalStorageClipboardGraph extends React.Component {
    private container!: HTMLDivElement
    private graph!: Graph

    componentDidMount() {
        this.graph = new Graph({
            container: this.container,
            width: 500,
            height: 250,
            background: { color: '#f5f5f5' },
            grid: { visible: true, type: 'dot', size: 10 },
        })

        this.graph.use(new Selection({ enabled: true, multiple: true }))
        this.graph.use(new Clipboard({
            enabled: true,
            useLocalStorage: true,
        }))
        this.graph.use(new Keyboard({ enabled: true }))

        this.graph.bindKey('ctrl+c', () => {
            const cells = this.graph.getSelectedCells()
            if (cells.length) {
                this.graph.copy(cells)
            }
        })

        this.graph.bindKey('ctrl+v', () => {
            if (!this.graph.isClipboardEmpty()) {
                const cells = this.graph.paste({ offset: 32 })
                this.graph.cleanSelection()
                this.graph.select(cells)
            }
        })

        this.graph.addNode({
            shape: 'rect',
            x: 100,
            y: 60,
            width: 140,
            height: 60,
            label: '支持 localStorage',
            attrs: { body: { stroke: '#722ed1', fill: '#efdbff', rx: 6, ry: 6 } },
        })

        this.graph.addNode({
            shape: 'rect',
            x: 280,
            y: 140,
            width: 140,
            height: 60,
            label: '刷新后仍可粘贴',
            attrs: { body: { stroke: '#eb2f96', fill: '#fff0f6', rx: 6, ry: 6 } },
        })
    }

    refContainer = (container: HTMLDivElement) => { this.container = container }
    render() { return <div ref={this.refContainer} /> }
}

const ClipboardDemo: React.FC = () => {
    return (
        <div style={{ padding: 24 }}>
            <Typography>
                <Title level={2}>X6 复制粘贴（Clipboard）学习</Title>
                <Paragraph>
                    了解 X6 的剪切板功能，包括复制、剪切、粘贴节点和边，以及 localStorage 持久化存储。
                </Paragraph>
            </Typography>

            <Divider />

            <Title level={3}>1. 基础复制粘贴</Title>
            <Row gutter={[16, 16]}>
                <Col span={14}>
                    <Card title="基础演示">
                        <Paragraph>
                            选中节点后，使用 <Text code>Ctrl+C</Text> 复制，<Text code>Ctrl+V</Text> 粘贴。也可以使用下方按钮操作。需要先安装插件：
                        </Paragraph>
                        <pre style={{ background: '#f5f5f5', padding: 8, marginBottom: 12, fontSize: 12 }}>
                            npm install @antv/x6-plugin-clipboard @antv/x6-plugin-keyboard @antv/x6-plugin-selection
                        </pre>
                        <BasicClipboardGraph />
                    </Card>
                </Col>
                <Col span={10}>
                    <Card title="使用方式">
                        <pre style={{ background: '#f5f5f5', padding: 12, fontSize: 12 }}>
{`import { Clipboard } from '@antv/x6-plugin-clipboard'
import { Keyboard } from '@antv/x6-plugin-keyboard'
import { Selection } from '@antv/x6-plugin-selection'

const graph = new Graph({ ... })

graph.use(new Selection({ enabled: true }))
graph.use(new Clipboard({ enabled: true }))
graph.use(new Keyboard({ enabled: true }))

// 绑定快捷键
graph.bindKey('ctrl+c', () => {
    const cells = graph.getSelectedCells()
    if (cells.length) {
        graph.copy(cells)
    }
})

graph.bindKey('ctrl+v', () => {
    if (!graph.isClipboardEmpty()) {
        graph.paste()
    }
})`}
                        </pre>
                    </Card>
                </Col>
            </Row>

            <Divider />

            <Title level={3}>2. localStorage 持久化</Title>
            <Row gutter={[16, 16]}>
                <Col span={14}>
                    <Card title="持久化演示">
                        <Paragraph>
                            开启 <Text code>useLocalStorage</Text> 后，复制的内容会保存到浏览器 localStorage，刷新页面后仍可粘贴。
                        </Paragraph>
                        <LocalStorageClipboardGraph />
                    </Card>
                </Col>
                <Col span={10}>
                    <Card title="配置说明">
                        <pre style={{ background: '#f5f5f5', padding: 12, fontSize: 12 }}>
{`new Clipboard({
    enabled: true,

    // 开启 localStorage 持久化
    // 刷新页面后仍可粘贴
    useLocalStorage: true,
})`}
                        </pre>
                    </Card>
                </Col>
            </Row>

            <Divider />

            <Title level={3}>3. Clipboard API</Title>
            <Card>
                <pre style={{ background: '#f5f5f5', padding: 16 }}>
{`// 复制节点/边
graph.copy(cells, options?)

// 剪切节点/边
graph.cut(cells, options?)

// 粘贴
graph.paste(options?, graph?)

// 粘贴选项
graph.paste({
    offset: 30,              // 粘贴偏移量
    useLocalStorage: false,  // 是否使用 localStorage
})

// 获取剪切板中的节点
graph.getCellsInClipboard()

// 清空剪切板
graph.cleanClipboard()

// 判断剪切板是否为空
graph.isClipboardEmpty()

// 启用/禁用剪切板
graph.enableClipboard()
graph.disableClipboard()

// 切换状态
graph.toggleClipboard(enabled?)`}
                </pre>
            </Card>

            <Divider />

            <Title level={3}>4. 事件监听</Title>
            <Card>
                <pre style={{ background: '#f5f5f5', padding: 16 }}>
{`// 剪切板内容变化时触发
graph.on('clipboard:changed', ({ cells }) => {
    console.log('剪切板内容:', cells)
})`}
                </pre>
            </Card>

            <PageNav {...getPageNav('/clipboard-demo')} />
        </div>
    )
}

export default ClipboardDemo
