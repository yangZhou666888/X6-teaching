import React from 'react'
import { Graph } from '@antv/x6'
import { Keyboard } from '@antv/x6-plugin-keyboard'
import { Clipboard } from '@antv/x6-plugin-clipboard'
import { History } from '@antv/x6-plugin-history'
import { Card, Row, Col, Typography, Divider, Button, Space, Tag } from 'antd'
import PageNav, { getPageNav } from '../../components/PageNav'

const { Title, Paragraph, Text } = Typography

// 1. 基础快捷键
class BasicKeyboardGraph extends React.Component {
    private container!: HTMLDivElement

    componentDidMount() {
        const graph = new Graph({
            container: this.container,
            width: 500,
            height: 280,
            background: { color: '#f5f5f5' },
            grid: { visible: true, type: 'dot', size: 10 },
        })

        graph.use(
            new Keyboard({
                enabled: true,
            })
        )

        graph.addNode({
            id: 'node1',
            shape: 'rect',
            x: 80,
            y: 80,
            width: 120,
            height: 50,
            label: '节点 A',
            attrs: { body: { stroke: '#597ef7', fill: '#d6e4ff', rx: 6, ry: 6 } },
        })

        graph.addNode({
            id: 'node2',
            shape: 'rect',
            x: 280,
            y: 80,
            width: 120,
            height: 50,
            label: '节点 B',
            attrs: { body: { stroke: '#52c41a', fill: '#d9f7be', rx: 6, ry: 6 } },
        })

        graph.bindKey('ctrl+1', () => {
            const node = graph.getCellById('node1')
            if (node) {
                node.attr('body/fill', '#ffe7ba')
                node.attr('body/stroke', '#fa8c16')
            }
            return false
        })

        graph.bindKey('ctrl+2', () => {
            const node = graph.getCellById('node2')
            if (node) {
                node.attr('body/fill', '#efdbff')
                node.attr('body/stroke', '#722ed1')
            }
            return false
        })
    }

    refContainer = (container: HTMLDivElement) => {
        this.container = container
    }

    render() {
        return (
            <div>
                <div ref={this.refContainer} />
                <div style={{ marginTop: 8 }}>
                    <Space>
                        <Tag color="blue">Ctrl+1</Tag> 修改节点 A 颜色
                    </Space>
                    <br />
                    <Space style={{ marginTop: 4 }}>
                        <Tag color="green">Ctrl+2</Tag> 修改节点 B 颜色
                    </Space>
                </div>
            </div>
        )
    }
}

// 2. 快捷键配置演示
class KeyboardConfigGraph extends React.Component {
    private container!: HTMLDivElement
    private outputRef!: HTMLPreElement

    componentDidMount() {
        const graph = new Graph({
            container: this.container,
            width: 500,
            height: 280,
            background: { color: '#f5f5f5' },
            grid: { visible: true, type: 'dot', size: 10 },
        })

        graph.use(
            new Keyboard({
                enabled: true,
                global: true,
                guard: (e: KeyboardEvent) => {
                    if (e.target instanceof HTMLInputElement) {
                        return false
                    }
                    return true
                },
                format: (key: string) => {
                    return key.toLowerCase()
                },
            })
        )

        graph.addNode({
            shape: 'rect',
            x: 150,
            y: 60,
            width: 180,
            height: 60,
            label: '全局快捷键节点',
            attrs: { body: { stroke: '#597ef7', fill: '#d6e4ff', rx: 6, ry: 6 } },
        })

        graph.bindKey('g', () => {
            if (this.outputRef) {
                this.outputRef.textContent = `[${new Date().toLocaleTimeString()}] 按下了 G 键（全局模式）\n` + (this.outputRef.textContent || '')
            }
            return false
        })

        graph.bindKey('h', () => {
            if (this.outputRef) {
                this.outputRef.textContent = `[${new Date().toLocaleTimeString()}] 按下了 H 键（全局模式）\n` + (this.outputRef.textContent || '')
            }
            return false
        })
    }

    refContainer = (container: HTMLDivElement) => {
        this.container = container
    }

    refOutput = (el: HTMLPreElement) => {
        this.outputRef = el
    }

    render() {
        return (
            <div>
                <div ref={this.refContainer} />
                <div style={{ marginTop: 8, marginBottom: 8 }}>
                    <Space>
                        <Tag color="blue">G</Tag> 记录事件
                    </Space>
                    <Space style={{ marginLeft: 16 }}>
                        <Tag color="green">H</Tag> 记录事件
                    </Space>
                </div>
                <pre
                    ref={this.refOutput}
                    style={{
                        background: '#f5f5f5',
                        padding: 12,
                        maxHeight: 120,
                        overflow: 'auto',
                        fontSize: 12,
                        minHeight: 60,
                    }}
                />
            </div>
        )
    }
}

// 3. Keyboard API 演示
class KeyboardAPIGraph extends React.Component {
    private container!: HTMLDivElement
    private outputRef!: HTMLPreElement
    private graph!: Graph

    componentDidMount() {
        this.graph = new Graph({
            container: this.container,
            width: 500,
            height: 260,
            background: { color: '#f5f5f5' },
            grid: { visible: true, type: 'dot', size: 10 },
        })

        this.graph.use(
            new Keyboard({
                enabled: true,
            })
        )

        this.graph.addNode({
            shape: 'rect',
            x: 150,
            y: 60,
            width: 180,
            height: 60,
            label: 'API 演示节点',
            attrs: { body: { stroke: '#597ef7', fill: '#d6e4ff', rx: 6, ry: 6 } },
        })
    }

    log(msg: string) {
        if (this.outputRef) {
            this.outputRef.textContent = `[${new Date().toLocaleTimeString()}] ${msg}\n` + (this.outputRef.textContent || '')
        }
    }

    onBindKey = () => {
        this.graph.bindKey('b', () => {
            this.log('按下了 B 键（bindKey 绑定）')
            return false
        })
        this.log('已绑定快捷键 B')
    }

    onUnbindKey = () => {
        this.graph.unbindKey('b')
        this.log('已解绑快捷键 B')
    }

    onClearKeys = () => {
        this.graph.clearKeys()
        this.log('已清除所有快捷键')
    }

    onDisable = () => {
        this.graph.disableKeyboard()
        this.log('已禁用键盘（disableKeyboard）')
    }

    onEnable = () => {
        this.graph.enableKeyboard()
        this.log('已启用键盘（enableKeyboard）')
    }

    refContainer = (container: HTMLDivElement) => {
        this.container = container
    }

    refOutput = (el: HTMLPreElement) => {
        this.outputRef = el
    }

    render() {
        return (
            <div>
                <div ref={this.refContainer} />
                <Space wrap style={{ marginTop: 8, marginBottom: 8 }}>
                    <Button type="primary" onClick={this.onBindKey}>bindKey('b')</Button>
                    <Button onClick={this.onUnbindKey}>unbindKey('b')</Button>
                    <Button danger onClick={this.onClearKeys}>clearKeys()</Button>
                    <Button onClick={this.onEnable}>enableKeyboard()</Button>
                    <Button onClick={this.onDisable}>disableKeyboard()</Button>
                </Space>
                <pre
                    ref={this.refOutput}
                    style={{
                        background: '#f5f5f5',
                        padding: 12,
                        maxHeight: 150,
                        overflow: 'auto',
                        fontSize: 12,
                        minHeight: 60,
                    }}
                />
            </div>
        )
    }
}

// 4. 常用快捷键示例 - 复制粘贴
class CopyPasteGraph extends React.Component {
    private container!: HTMLDivElement
    private graph!: Graph

    componentDidMount() {
        this.graph = new Graph({
            container: this.container,
            width: 500,
            height: 300,
            background: { color: '#f5f5f5' },
            grid: { visible: true, type: 'dot', size: 10 },
            selecting: {
                enabled: true,
                showNodeSelectionBox: true,
            },
        })

        this.graph.use(
            new Keyboard({
                enabled: true,
            })
        )

        this.graph.use(
            new Clipboard({
                enabled: true,
            })
        )

        this.graph.addNode({
            id: 'copy1',
            shape: 'rect',
            x: 60,
            y: 80,
            width: 120,
            height: 50,
            label: '选中后复制',
            attrs: { body: { stroke: '#597ef7', fill: '#d6e4ff', rx: 6, ry: 6 } },
        })

        this.graph.addNode({
            id: 'copy2',
            shape: 'rect',
            x: 60,
            y: 180,
            width: 120,
            height: 50,
            label: '也可以复制我',
            attrs: { body: { stroke: '#52c41a', fill: '#d9f7be', rx: 6, ry: 6 } },
        })

        this.graph.bindKey('ctrl+c', () => {
            const cells = this.graph.getSelectedCells()
            if (cells.length) {
                this.graph.copy(cells)
            }
            return false
        })

        this.graph.bindKey('ctrl+v', () => {
            if (!this.graph.isClipboardEmpty()) {
                const cells = this.graph.paste({ offset: 32 })
                this.graph.cleanSelection()
                this.graph.select(cells)
            }
            return false
        })
    }

    refContainer = (container: HTMLDivElement) => {
        this.container = container
    }

    render() {
        return (
            <div>
                <div ref={this.refContainer} />
                <div style={{ marginTop: 8 }}>
                    <Space>
                        <Tag color="blue">Ctrl+C</Tag> 复制选中节点
                    </Space>
                    <br />
                    <Space style={{ marginTop: 4 }}>
                        <Tag color="green">Ctrl+V</Tag> 粘贴节点（偏移 32px）
                    </Space>
                </div>
            </div>
        )
    }
}

// 5. 删除与撤销重做
class DeleteUndoGraph extends React.Component {
    private container!: HTMLDivElement
    private graph!: Graph

    componentDidMount() {
        this.graph = new Graph({
            container: this.container,
            width: 500,
            height: 300,
            background: { color: '#f5f5f5' },
            grid: { visible: true, type: 'dot', size: 10 },
            selecting: {
                enabled: true,
                showNodeSelectionBox: true,
            },
        })

        this.graph.use(
            new Keyboard({
                enabled: true,
            })
        )

        this.graph.use(new History())

        const colors = [
            { stroke: '#597ef7', fill: '#d6e4ff' },
            { stroke: '#52c41a', fill: '#d9f7be' },
            { stroke: '#fa8c16', fill: '#ffe7ba' },
            { stroke: '#722ed1', fill: '#efdbff' },
        ]

        colors.forEach((c, i) => {
            this.graph.addNode({
                shape: 'rect',
                x: 40 + i * 110,
                y: 100,
                width: 90,
                height: 50,
                label: `节点 ${i + 1}`,
                attrs: { body: { stroke: c.stroke, fill: c.fill, rx: 6, ry: 6 } },
            })
        })

        this.graph.addNode({
            shape: 'circle',
            x: 200,
            y: 200,
            width: 60,
            height: 60,
            label: '圆形',
            attrs: { body: { stroke: '#eb2f96', fill: '#fff0f6' } },
        })

        this.graph.bindKey('delete', () => {
            const cells = this.graph.getSelectedCells()
            if (cells.length) {
                this.graph.removeCells(cells)
            }
            return false
        })

        this.graph.bindKey('backspace', () => {
            const cells = this.graph.getSelectedCells()
            if (cells.length) {
                this.graph.removeCells(cells)
            }
            return false
        })

        this.graph.bindKey('ctrl+z', () => {
            this.graph.undo()
            return false
        })

        this.graph.bindKey('ctrl+shift+z', () => {
            this.graph.redo()
            return false
        })
    }

    refContainer = (container: HTMLDivElement) => {
        this.container = container
    }

    render() {
        return (
            <div>
                <div ref={this.refContainer} />
                <div style={{ marginTop: 8 }}>
                    <Space>
                        <Tag color="red">Delete / Backspace</Tag> 删除选中
                    </Space>
                    <br />
                    <Space style={{ marginTop: 4 }}>
                        <Tag color="orange">Ctrl+Z</Tag> 撤销
                    </Space>
                    <br />
                    <Space style={{ marginTop: 4 }}>
                        <Tag color="purple">Ctrl+Shift+Z</Tag> 重做
                    </Space>
                </div>
            </div>
        )
    }
}

// 6. 全选与组合快捷键
class MultiKeyGraph extends React.Component {
    private container!: HTMLDivElement
    private graph!: Graph

    componentDidMount() {
        this.graph = new Graph({
            container: this.container,
            width: 500,
            height: 300,
            background: { color: '#f5f5f5' },
            grid: { visible: true, type: 'dot', size: 10 },
            selecting: {
                enabled: true,
                showNodeSelectionBox: true,
            },
        })

        this.graph.use(
            new Keyboard({
                enabled: true,
            })
        )

        const positions = [
            { x: 60, y: 60, label: 'A', stroke: '#597ef7', fill: '#d6e4ff' },
            { x: 200, y: 60, label: 'B', stroke: '#52c41a', fill: '#d9f7be' },
            { x: 340, y: 60, label: 'C', stroke: '#fa8c16', fill: '#ffe7ba' },
            { x: 60, y: 180, label: 'D', stroke: '#722ed1', fill: '#efdbff' },
            { x: 200, y: 180, label: 'E', stroke: '#eb2f96', fill: '#fff0f6' },
            { x: 340, y: 180, label: 'F', stroke: '#1890ff', fill: '#bae7ff' },
        ]

        positions.forEach((p) => {
            this.graph.addNode({
                shape: 'rect',
                x: p.x,
                y: p.y,
                width: 90,
                height: 50,
                label: p.label,
                attrs: { body: { stroke: p.stroke, fill: p.fill, rx: 6, ry: 6 } },
            })
        })

        this.graph.bindKey('ctrl+a', () => {
            const nodes = this.graph.getNodes()
            if (nodes.length) {
                this.graph.select(nodes)
            }
            return false
        })

        this.graph.bindKey('escape', () => {
            this.graph.cleanSelection()
            return false
        })
    }

    refContainer = (container: HTMLDivElement) => {
        this.container = container
    }

    render() {
        return (
            <div>
                <div ref={this.refContainer} />
                <div style={{ marginTop: 8 }}>
                    <Space>
                        <Tag color="blue">Ctrl+A</Tag> 全选节点
                    </Space>
                    <br />
                    <Space style={{ marginTop: 4 }}>
                        <Tag color="default">Escape</Tag> 取消选择
                    </Space>
                </div>
            </div>
        )
    }
}

const KeyboardDemo: React.FC = () => {
    return (
        <div style={{ padding: 24 }}>
            <Typography>
                <Title level={2}>X6 快捷键（Keyboard）学习</Title>
                <Paragraph>
                    了解 X6 的 Keyboard 插件，包括基础用法、配置选项、API 方法以及常用快捷键实战。
                </Paragraph>
            </Typography>

            <Divider />

            <Title level={3}>1. 基础快捷键</Title>
            <Row gutter={[16, 16]}>
                <Col span={14}>
                    <Card title="基础演示">
                        <Paragraph>
                            使用 <Text code>Keyboard</Text> 插件为画布启用快捷键功能。
                            通过 <Text code>graph.bindKey()</Text> 绑定快捷键回调。
                        </Paragraph>
                        <BasicKeyboardGraph />
                    </Card>
                </Col>
                <Col span={10}>
                    <Card title="引入与注册">
                        <pre style={{ background: '#f5f5f5', padding: 12, fontSize: 12 }}>
{`import { Keyboard } from '@antv/x6-plugin-keyboard'

const graph = new Graph({ ... })

// 注册 Keyboard 插件
graph.use(
    new Keyboard({
        enabled: true,
    })
)

// 绑定快捷键
graph.bindKey('ctrl+1', () => {
    // 回调逻辑
    return false
})`}
                        </pre>
                    </Card>
                </Col>
            </Row>

            <Divider />

            <Title level={3}>2. 快捷键配置</Title>
            <Row gutter={[16, 16]}>
                <Col span={14}>
                    <Card title="配置演示（global + guard）">
                        <Paragraph>
                            配置 <Text code>global: true</Text> 使快捷键全局生效，
                            <Text code>guard</Text> 可以拦截特定场景（如输入框聚焦时），
                            <Text code>format</Text> 用于格式化按键字符串。
                        </Paragraph>
                        <KeyboardConfigGraph />
                    </Card>
                </Col>
                <Col span={10}>
                    <Card title="配置选项详解">
                        <pre style={{ background: '#f5f5f5', padding: 12, fontSize: 12 }}>
{`new Keyboard({
    // 是否启用，默认 true
    enabled: true,

    // 是否全局生效
    // false: 只在画布获焦时生效
    // true:  在页面任何位置生效
    global: true,

    // 守卫函数：返回 false 阻止触发
    guard: (e: KeyboardEvent) => {
        // 输入框聚焦时不触发
        if (e.target instanceof HTMLInputElement) {
            return false
        }
        return true
    },

    // 格式化按键字符串
    format: (key: string) => {
        return key.toLowerCase()
    },
})`}
                        </pre>
                    </Card>
                </Col>
            </Row>

            <Divider />

            <Title level={3}>3. Keyboard API</Title>
            <Row gutter={[16, 16]}>
                <Col span={14}>
                    <Card title="API 操作演示">
                        <Paragraph>
                            点击按钮体验 Keyboard 的核心 API：绑定、解绑、清除、启用和禁用。
                        </Paragraph>
                        <KeyboardAPIGraph />
                    </Card>
                </Col>
                <Col span={10}>
                    <Card title="API 速查">
                        <pre style={{ background: '#f5f5f5', padding: 12, fontSize: 12 }}>
{`// 绑定快捷键
graph.bindKey('ctrl+s', () => {
    console.log('保存')
    return false // 阻止默认行为
})

// 绑定多个按键（或关系）
graph.bindKey(['ctrl+s', 'meta+s'], () => {
    console.log('保存')
    return false
})

// 解绑快捷键
graph.unbindKey('ctrl+s')

// 清除所有快捷键绑定
graph.clearKeys()

// 启用键盘
graph.enableKeyboard()

// 禁用键盘
graph.disableKeyboard()`}
                        </pre>
                    </Card>
                </Col>
            </Row>

            <Divider />

            <Title level={3}>4. 常用快捷键 — 复制粘贴</Title>
            <Row gutter={[16, 16]}>
                <Col span={14}>
                    <Card title="Ctrl+C / Ctrl+V 复制粘贴">
                        <Paragraph>
                            结合 <Text code>Clipboard</Text> 插件实现节点的复制粘贴。
                            先选中节点，再使用快捷键操作。
                        </Paragraph>
                        <CopyPasteGraph />
                    </Card>
                </Col>
                <Col span={10}>
                    <Card title="复制粘贴代码">
                        <pre style={{ background: '#f5f5f5', padding: 12, fontSize: 12 }}>
{`import { Clipboard } from '@antv/x6-plugin-clipboard'

graph.use(new Clipboard({ enabled: true }))

// 复制
graph.bindKey('ctrl+c', () => {
    const cells = graph.getSelectedCells()
    if (cells.length) {
        graph.copy(cells)
    }
    return false
})

// 粘贴（偏移 32px 避免重叠）
graph.bindKey('ctrl+v', () => {
    if (!graph.isClipboardEmpty()) {
        const cells = graph.paste({ offset: 32 })
        graph.cleanSelection()
        graph.select(cells)
    }
    return false
})`}
                        </pre>
                    </Card>
                </Col>
            </Row>

            <Divider />

            <Title level={3}>5. 常用快捷键 — 删除与撤销重做</Title>
            <Row gutter={[16, 16]}>
                <Col span={14}>
                    <Card title="Delete / Ctrl+Z / Ctrl+Shift+Z">
                        <Paragraph>
                            结合 <Text code>History</Text> 插件实现撤销重做。
                            选中节点后按 Delete 或 Backspace 删除，Ctrl+Z 撤销，Ctrl+Shift+Z 重做。
                        </Paragraph>
                        <DeleteUndoGraph />
                    </Card>
                </Col>
                <Col span={10}>
                    <Card title="删除与撤销代码">
                        <pre style={{ background: '#f5f5f5', padding: 12, fontSize: 12 }}>
{`import { History } from '@antv/x6-plugin-history'

graph.use(new History())

// 删除选中节点/边
graph.bindKey('delete', () => {
    const cells = graph.getSelectedCells()
    if (cells.length) {
        graph.removeCells(cells)
    }
    return false
})

graph.bindKey('backspace', () => {
    const cells = graph.getSelectedCells()
    if (cells.length) {
        graph.removeCells(cells)
    }
    return false
})

// 撤销
graph.bindKey('ctrl+z', () => {
    graph.undo()
    return false
})

// 重做
graph.bindKey('ctrl+shift+z', () => {
    graph.redo()
    return false
})`}
                        </pre>
                    </Card>
                </Col>
            </Row>

            <Divider />

            <Title level={3}>6. 常用快捷键 — 全选与取消选择</Title>
            <Row gutter={[16, 16]}>
                <Col span={14}>
                    <Card title="Ctrl+A / Escape">
                        <Paragraph>
                            使用 Ctrl+A 全选所有节点，Escape 取消选择。
                        </Paragraph>
                        <MultiKeyGraph />
                    </Card>
                </Col>
                <Col span={10}>
                    <Card title="全选代码">
                        <pre style={{ background: '#f5f5f5', padding: 12, fontSize: 12 }}>
{`// 全选
graph.bindKey('ctrl+a', () => {
    const nodes = graph.getNodes()
    if (nodes.length) {
        graph.select(nodes)
    }
    return false
})

// 取消选择
graph.bindKey('escape', () => {
    graph.cleanSelection()
    return false
})`}
                        </pre>
                    </Card>
                </Col>
            </Row>

            <Divider />

            <Title level={3}>常用快捷键速查表</Title>
            <Card>
                <pre style={{ background: '#f5f5f5', padding: 16 }}>
{`// ========== 常用快捷键对照表 ==========

// 操作          | 快捷键            | 说明
// -------------|-------------------|------------------
// 复制          | Ctrl+C            | 复制选中的节点/边
// 粘贴          | Ctrl+V            | 粘贴已复制的内容
// 删除          | Delete/Backspace  | 删除选中元素
// 撤销          | Ctrl+Z            | 撤销上一步操作
// 重做          | Ctrl+Shift+Z     | 重做已撤销的操作
// 全选          | Ctrl+A            | 选中所有节点
// 取消选择       | Escape            | 清除选中状态

// ========== 绑定方式 ==========

// 单个按键
graph.bindKey('ctrl+s', callback)

// 多个按键（或关系，任一触发）
graph.bindKey(['ctrl+s', 'meta+s'], callback)

// return false 的作用：
// 阻止浏览器默认行为（如 Ctrl+S 保存网页）
// 建议在所有 bindKey 回调中 return false

// ========== 按键格式 ==========
// ctrl+s, ctrl+shift+z, meta+c (Mac Cmd)
// delete, backspace, escape, enter, tab
// 方向键: up, down, left, right`}
                </pre>
            </Card>

            <PageNav {...getPageNav('/keyboard-demo')} />
        </div>
    )
}

export default KeyboardDemo
