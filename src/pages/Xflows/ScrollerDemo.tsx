import React from 'react'
import { Graph } from '@antv/x6'
import { Scroller } from '@antv/x6-plugin-scroller'
import { Card, Row, Col, Typography, Divider, Button, Space } from 'antd'
import PageNav, { getPageNav } from '../../components/PageNav'

const { Title, Paragraph, Text } = Typography

// 1. 基础滚动画布
class BasicScrollerGraph extends React.Component {
    private graphContainer!: HTMLDivElement

    componentDidMount() {
        const graph = new Graph({
            container: this.graphContainer,
            width: 600,
            height: 300,
            background: { color: '#f5f5f5' },
            grid: { visible: true, type: 'dot', size: 10 },
        })

        graph.use(
            new Scroller({
                enabled: true,
                pageVisible: true,
                pageBreak: false,
                autoResize: true,
            })
        )

        graph.addNode({ id: 'n1', x: 50, y: 50, width: 120, height: 50, label: '节点 1', attrs: { body: { stroke: '#597ef7', fill: '#d6e4ff', rx: 6, ry: 6 } } })
        graph.addNode({ id: 'n2', x: 250, y: 50, width: 120, height: 50, label: '节点 2', attrs: { body: { stroke: '#52c41a', fill: '#d9f7be', rx: 6, ry: 6 } } })
        graph.addNode({ id: 'n3', x: 450, y: 50, width: 120, height: 50, label: '节点 3', attrs: { body: { stroke: '#fa8c16', fill: '#ffe7ba', rx: 6, ry: 6 } } })
        graph.addNode({ id: 'n4', x: 150, y: 180, width: 120, height: 50, label: '节点 4', attrs: { body: { stroke: '#722ed1', fill: '#efdbff', rx: 6, ry: 6 } } })
        graph.addNode({ id: 'n5', x: 350, y: 180, width: 120, height: 50, label: '节点 5', attrs: { body: { stroke: '#eb2f96', fill: '#fff0f6', rx: 6, ry: 6 } } })

        graph.addEdge({ source: 'n1', target: 'n2', attrs: { line: { stroke: '#597ef7', strokeWidth: 2 } } })
        graph.addEdge({ source: 'n2', target: 'n3', attrs: { line: { stroke: '#52c41a', strokeWidth: 2 } } })
        graph.addEdge({ source: 'n1', target: 'n4', attrs: { line: { stroke: '#722ed1', strokeWidth: 2 } } })
        graph.addEdge({ source: 'n3', target: 'n5', attrs: { line: { stroke: '#fa8c16', strokeWidth: 2 } } })

        graph.centerContent()
    }

    refContainer = (container: HTMLDivElement) => {
        this.graphContainer = container
    }

    render() {
        return <div ref={this.refContainer} style={{ border: '1px solid #d9d9d9' }} />
    }
}

// 2. pannable 拖拽平移
class PannableScrollerGraph extends React.Component {
    private graphContainer!: HTMLDivElement

    componentDidMount() {
        const graph = new Graph({
            container: this.graphContainer,
            width: 600,
            height: 300,
            background: { color: '#f5f5f5' },
            grid: { visible: true, type: 'dot', size: 10 },
        })

        graph.use(
            new Scroller({
                enabled: true,
                pannable: true,
                pageVisible: true,
                pageBreak: false,
                autoResize: true,
            })
        )

        graph.addNode({ id: 'a', x: 80, y: 60, width: 120, height: 50, label: '拖拽我', attrs: { body: { stroke: '#1890ff', fill: '#bae7ff', rx: 6, ry: 6 } } })
        graph.addNode({ id: 'b', x: 300, y: 60, width: 120, height: 50, label: '平移画布', attrs: { body: { stroke: '#52c41a', fill: '#d9f7be', rx: 6, ry: 6 } } })
        graph.addNode({ id: 'c', x: 190, y: 180, width: 120, height: 50, label: '滚动查看', attrs: { body: { stroke: '#fa8c16', fill: '#ffe7ba', rx: 6, ry: 6 } } })

        graph.addEdge({ source: 'a', target: 'b', attrs: { line: { stroke: '#1890ff', strokeWidth: 2 } } })
        graph.addEdge({ source: 'a', target: 'c', attrs: { line: { stroke: '#52c41a', strokeWidth: 2 } } })
        graph.addEdge({ source: 'b', target: 'c', attrs: { line: { stroke: '#fa8c16', strokeWidth: 2 } } })

        graph.centerContent()
    }

    refContainer = (container: HTMLDivElement) => {
        this.graphContainer = container
    }

    render() {
        return <div ref={this.refContainer} style={{ border: '1px solid #d9d9d9' }} />
    }
}

// 3. pageVisible + pageBreak 分页显示
class PageBreakScrollerGraph extends React.Component {
    private graphContainer!: HTMLDivElement

    componentDidMount() {
        const graph = new Graph({
            container: this.graphContainer,
            width: 600,
            height: 300,
            background: { color: '#f5f5f5' },
            grid: { visible: true, type: 'dot', size: 10 },
        })

        graph.use(
            new Scroller({
                enabled: true,
                pannable: true,
                pageVisible: true,
                pageBreak: true,
                pageWidth: 300,
                pageHeight: 200,
                autoResize: true,
            })
        )

        graph.addNode({ id: 'p1', x: 50, y: 50, width: 100, height: 40, label: '页面 1', attrs: { body: { stroke: '#597ef7', fill: '#d6e4ff', rx: 6, ry: 6 } } })
        graph.addNode({ id: 'p2', x: 350, y: 50, width: 100, height: 40, label: '页面 2', attrs: { body: { stroke: '#52c41a', fill: '#d9f7be', rx: 6, ry: 6 } } })
        graph.addNode({ id: 'p3', x: 50, y: 250, width: 100, height: 40, label: '页面 3', attrs: { body: { stroke: '#fa8c16', fill: '#ffe7ba', rx: 6, ry: 6 } } })
        graph.addNode({ id: 'p4', x: 350, y: 250, width: 100, height: 40, label: '页面 4', attrs: { body: { stroke: '#722ed1', fill: '#efdbff', rx: 6, ry: 6 } } })

        graph.addEdge({ source: 'p1', target: 'p2', attrs: { line: { stroke: '#597ef7', strokeWidth: 2 } } })
        graph.addEdge({ source: 'p1', target: 'p3', attrs: { line: { stroke: '#52c41a', strokeWidth: 2 } } })
        graph.addEdge({ source: 'p2', target: 'p4', attrs: { line: { stroke: '#fa8c16', strokeWidth: 2 } } })
        graph.addEdge({ source: 'p3', target: 'p4', attrs: { line: { stroke: '#722ed1', strokeWidth: 2 } } })

        graph.centerContent()
    }

    refContainer = (container: HTMLDivElement) => {
        this.graphContainer = container
    }

    render() {
        return <div ref={this.refContainer} style={{ border: '1px solid #d9d9d9' }} />
    }
}

// 4. lockScroller / unlockScroller 演示
class LockScrollerGraph extends React.Component {
    private graphContainer!: HTMLDivElement
    private scroller!: Scroller

    componentDidMount() {
        const graph = new Graph({
            container: this.graphContainer,
            width: 600,
            height: 300,
            background: { color: '#f5f5f5' },
            grid: { visible: true, type: 'dot', size: 10 },
        })

        this.scroller = new Scroller({
            enabled: true,
            pannable: true,
            pageVisible: true,
            pageBreak: false,
            autoResize: true,
        })

        graph.use(this.scroller)

        graph.addNode({ id: 'lock1', x: 80, y: 80, width: 140, height: 50, label: '锁定/解锁', attrs: { body: { stroke: '#ff4d4f', fill: '#ffccc7', rx: 6, ry: 6 } } })
        graph.addNode({ id: 'lock2', x: 300, y: 80, width: 140, height: 50, label: '滚动区域', attrs: { body: { stroke: '#597ef7', fill: '#d6e4ff', rx: 6, ry: 6 } } })
        graph.addNode({ id: 'lock3', x: 190, y: 200, width: 140, height: 50, label: '拖拽区域', attrs: { body: { stroke: '#52c41a', fill: '#d9f7be', rx: 6, ry: 6 } } })

        graph.addEdge({ source: 'lock1', target: 'lock2', attrs: { line: { stroke: '#ff4d4f', strokeWidth: 2 } } })
        graph.addEdge({ source: 'lock1', target: 'lock3', attrs: { line: { stroke: '#597ef7', strokeWidth: 2 } } })

        graph.centerContent()
    }

    lockScroller = () => {
        this.scroller.lockScroller()
    }

    unlockScroller = () => {
        this.scroller.unlockScroller()
    }

    refContainer = (container: HTMLDivElement) => {
        this.graphContainer = container
    }

    render() {
        return (
            <div>
                <div ref={this.refContainer} style={{ border: '1px solid #d9d9d9' }} />
                <Space style={{ marginTop: 8 }}>
                    <Button type="primary" danger onClick={this.lockScroller}>lockScroller</Button>
                    <Button type="primary" onClick={this.unlockScroller}>unlockScroller</Button>
                </Space>
            </div>
        )
    }
}

// 5. scrollbarPosition 滚动条位置
class ScrollbarPositionGraph extends React.Component {
    private graphContainer!: HTMLDivElement
    private scroller!: Scroller

    componentDidMount() {
        const graph = new Graph({
            container: this.graphContainer,
            width: 600,
            height: 300,
            background: { color: '#f5f5f5' },
            grid: { visible: true, type: 'dot', size: 10 },
        })

        this.scroller = new Scroller({
            enabled: true,
            pannable: true,
            pageVisible: true,
            pageBreak: false,
            autoResize: true,
        })

        graph.use(this.scroller)

        graph.addNode({ id: 's1', x: 50, y: 50, width: 100, height: 40, label: '左上', attrs: { body: { stroke: '#597ef7', fill: '#d6e4ff', rx: 6, ry: 6 } } })
        graph.addNode({ id: 's2', x: 450, y: 50, width: 100, height: 40, label: '右上', attrs: { body: { stroke: '#52c41a', fill: '#d9f7be', rx: 6, ry: 6 } } })
        graph.addNode({ id: 's3', x: 50, y: 250, width: 100, height: 40, label: '左下', attrs: { body: { stroke: '#fa8c16', fill: '#ffe7ba', rx: 6, ry: 6 } } })
        graph.addNode({ id: 's4', x: 450, y: 250, width: 100, height: 40, label: '右下', attrs: { body: { stroke: '#722ed1', fill: '#efdbff', rx: 6, ry: 6 } } })

        graph.addEdge({ source: 's1', target: 's2', attrs: { line: { stroke: '#597ef7', strokeWidth: 2 } } })
        graph.addEdge({ source: 's1', target: 's3', attrs: { line: { stroke: '#52c41a', strokeWidth: 2 } } })
        graph.addEdge({ source: 's2', target: 's4', attrs: { line: { stroke: '#fa8c16', strokeWidth: 2 } } })
        graph.addEdge({ source: 's3', target: 's4', attrs: { line: { stroke: '#722ed1', strokeWidth: 2 } } })
    }

    setToTopLeft = () => {
        this.scroller.setScrollbarPosition(0, 0)
    }

    setToBottomRight = () => {
        this.scroller.setScrollbarPosition(300, 200)
    }

    getScrollbarPosition = () => {
        const pos = this.scroller.getScrollbarPosition()
        console.log('scrollbar position:', pos)
    }

    refContainer = (container: HTMLDivElement) => {
        this.graphContainer = container
    }

    render() {
        return (
            <div>
                <div ref={this.refContainer} style={{ border: '1px solid #d9d9d9' }} />
                <Space style={{ marginTop: 8 }}>
                    <Button onClick={this.setToTopLeft}>滚动到左上角</Button>
                    <Button onClick={this.setToBottomRight}>滚动到右下角</Button>
                    <Button type="dashed" onClick={this.getScrollbarPosition}>获取滚动位置</Button>
                </Space>
            </div>
        )
    }
}

// 6. autoResize 自动调整
class AutoResizeScrollerGraph extends React.Component {
    private graphContainer!: HTMLDivElement
    private graph!: Graph
    private scroller!: Scroller

    componentDidMount() {
        this.graph = new Graph({
            container: this.graphContainer,
            width: 600,
            height: 300,
            background: { color: '#f5f5f5' },
            grid: { visible: true, type: 'dot', size: 10 },
        })

        this.scroller = new Scroller({
            enabled: true,
            pannable: true,
            pageVisible: true,
            pageBreak: false,
            autoResize: true,
        })

        this.graph.use(this.scroller)

        this.graph.addNode({ id: 'ar1', x: 200, y: 100, width: 120, height: 50, label: '初始节点', attrs: { body: { stroke: '#597ef7', fill: '#d6e4ff', rx: 6, ry: 6 } } })

        this.graph.centerContent()
    }

    addNode = () => {
        const nodes = this.graph.getNodes()
        const count = nodes.length
        const x = 50 + Math.random() * 500
        const y = 50 + Math.random() * 400
        const colors = [
            { stroke: '#597ef7', fill: '#d6e4ff' },
            { stroke: '#52c41a', fill: '#d9f7be' },
            { stroke: '#fa8c16', fill: '#ffe7ba' },
            { stroke: '#722ed1', fill: '#efdbff' },
            { stroke: '#eb2f96', fill: '#fff0f6' },
        ]
        const color = colors[count % colors.length]
        this.graph.addNode({
            x,
            y,
            width: 120,
            height: 50,
            label: `节点 ${count + 1}`,
            attrs: { body: { stroke: color.stroke, fill: color.fill, rx: 6, ry: 6 } },
        })
    }

    refContainer = (container: HTMLDivElement) => {
        this.graphContainer = container
    }

    render() {
        return (
            <div>
                <div ref={this.refContainer} style={{ border: '1px solid #d9d9d9' }} />
                <Space style={{ marginTop: 8 }}>
                    <Button type="primary" onClick={this.addNode}>添加节点（自动扩展画布）</Button>
                </Space>
            </div>
        )
    }
}

const ScrollerDemo: React.FC = () => {
    return (
        <div style={{ padding: 24 }}>
            <Typography>
                <Title level={2}>X6 滚动画布（Scroller）学习</Title>
                <Paragraph>
                    了解 Scroller 插件的使用方式、配置选项和常用 API。Scroller 插件为画布提供滚动条，支持拖拽平移、分页显示、自动调整大小等功能。
                </Paragraph>
            </Typography>

            <Divider />

            <Title level={3}>1. 基础滚动画布</Title>
            <Row gutter={[16, 16]}>
                <Col span={14}>
                    <Card title="基础演示">
                        <Paragraph>
                            使用 <Text code>Scroller</Text> 插件为画布添加滚动条。设置 <Text code>enabled: true</Text> 启用滚动画布，
                            <Text code>pageVisible: true</Text> 显示页面边界。
                        </Paragraph>
                        <BasicScrollerGraph />
                    </Card>
                </Col>
                <Col span={10}>
                    <Card title="基础配置">
                        <pre style={{ background: '#f5f5f5', padding: 12, fontSize: 12 }}>
{`import { Scroller } from '@antv/x6-plugin-scroller'

const graph = new Graph({
    container: container,
    width: 600,
    height: 300,
})

graph.use(
    new Scroller({
        enabled: true,      // 启用滚动画布
        pageVisible: true,  // 显示页面边界
        pageBreak: false,   // 不显示分页线
        autoResize: true,   // 自动调整大小
    })
)`}
                        </pre>
                    </Card>
                </Col>
            </Row>

            <Divider />

            <Title level={3}>2. pannable 拖拽平移</Title>
            <Row gutter={[16, 16]}>
                <Col span={14}>
                    <Card title="拖拽平移演示">
                        <Paragraph>
                            设置 <Text code>pannable: true</Text> 后，可以通过鼠标拖拽画布进行平移操作。
                            滚动条也会同步显示当前位置。
                        </Paragraph>
                        <PannableScrollerGraph />
                    </Card>
                </Col>
                <Col span={10}>
                    <Card title="pannable 配置">
                        <pre style={{ background: '#f5f5f5', padding: 12, fontSize: 12 }}>
{`graph.use(
    new Scroller({
        enabled: true,
        pannable: true,    // 启用拖拽平移
        pageVisible: true,
        autoResize: true,
    })
)

// 也可以传入对象配置事件类型
graph.use(
    new Scroller({
        enabled: true,
        pannable: {
            enabled: true,
            eventTypes: ['leftMouseDown'],
            // 也支持 'rightMouseDown'
        },
    })
)`}
                        </pre>
                    </Card>
                </Col>
            </Row>

            <Divider />

            <Title level={3}>3. pageVisible + pageBreak 分页显示</Title>
            <Row gutter={[16, 16]}>
                <Col span={14}>
                    <Card title="分页显示演示">
                        <Paragraph>
                            设置 <Text code>pageVisible: true</Text> 显示页面边界，<Text code>pageBreak: true</Text> 显示分页线。
                            可以通过 <Text code>pageWidth</Text> 和 <Text code>pageHeight</Text> 自定义页面尺寸。
                        </Paragraph>
                        <PageBreakScrollerGraph />
                    </Card>
                </Col>
                <Col span={10}>
                    <Card title="分页配置">
                        <pre style={{ background: '#f5f5f5', padding: 12, fontSize: 12 }}>
{`graph.use(
    new Scroller({
        enabled: true,
        pannable: true,
        pageVisible: true,   // 显示页面背景
        pageBreak: true,     // 显示分页线
        pageWidth: 300,      // 页面宽度
        pageHeight: 200,     // 页面高度
        autoResize: true,
    })
)

// pageBreak 会在页面边界处显示
// 虚线分隔线，方便打印预览`}
                        </pre>
                    </Card>
                </Col>
            </Row>

            <Divider />

            <Title level={3}>4. lockScroller / unlockScroller</Title>
            <Row gutter={[16, 16]}>
                <Col span={14}>
                    <Card title="锁定/解锁演示">
                        <Paragraph>
                            <Text code>lockScroller()</Text> 锁定滚动区域，禁止用户滚动和拖拽。
                            <Text code>unlockScroller()</Text> 解锁，恢复滚动功能。
                        </Paragraph>
                        <LockScrollerGraph />
                    </Card>
                </Col>
                <Col span={10}>
                    <Card title="锁定 API">
                        <pre style={{ background: '#f5f5f5', padding: 12, fontSize: 12 }}>
{`const scroller = new Scroller({
    enabled: true,
    pannable: true,
})

graph.use(scroller)

// 锁定滚动（禁止滚动和拖拽）
scroller.lockScroller()

// 解锁滚动（恢复滚动和拖拽）
scroller.unlockScroller()

// 内部实现原理：
// lock:   overflow: hidden
// unlock: overflow: scroll`}
                        </pre>
                    </Card>
                </Col>
            </Row>

            <Divider />

            <Title level={3}>5. getScrollbarPosition / setScrollbarPosition</Title>
            <Row gutter={[16, 16]}>
                <Col span={14}>
                    <Card title="滚动条位置演示">
                        <Paragraph>
                            <Text code>getScrollbarPosition()</Text> 获取当前滚动条位置，
                            <Text code>setScrollbarPosition(left, top)</Text> 设置滚动条位置。
                        </Paragraph>
                        <ScrollbarPositionGraph />
                    </Card>
                </Col>
                <Col span={10}>
                    <Card title="位置 API">
                        <pre style={{ background: '#f5f5f5', padding: 12, fontSize: 12 }}>
{`const scroller = new Scroller({
    enabled: true,
    pannable: true,
})

graph.use(scroller)

// 获取当前滚动条位置
const pos = scroller.getScrollbarPosition()
// { left: number, top: number }

// 设置滚动条位置
scroller.setScrollbarPosition(100, 50)

// 滚动到指定坐标点（画布坐标）
scroller.scrollToPoint(x, y)

// 滚动到内容中心
scroller.scrollToContent()

// 滚动到指定节点
scroller.scrollToCell(cell)`}
                        </pre>
                    </Card>
                </Col>
            </Row>

            <Divider />

            <Title level={3}>6. autoResize 自动调整大小</Title>
            <Row gutter={[16, 16]}>
                <Col span={14}>
                    <Card title="自动调整演示">
                        <Paragraph>
                            设置 <Text code>autoResize: true</Text> 后，当添加新节点超出当前画布范围时，
                            画布会自动扩展以适应内容。点击按钮添加节点试试。
                        </Paragraph>
                        <AutoResizeScrollerGraph />
                    </Card>
                </Col>
                <Col span={10}>
                    <Card title="autoResize 配置">
                        <pre style={{ background: '#f5f5f5', padding: 12, fontSize: 12 }}>
{`const scroller = new Scroller({
    enabled: true,
    pannable: true,
    autoResize: true,  // 自动调整画布大小
})

graph.use(scroller)

// 动态开启/关闭自动调整
scroller.enableAutoResize()
scroller.disableAutoResize()

// 手动更新滚动区域
scroller.updateScroller()

// 调整滚动容器大小
scroller.resize(width, height)`}
                        </pre>
                    </Card>
                </Col>
            </Row>

            <Divider />

            <Title level={3}>Scroller 配置选项速查</Title>
            <Card>
                <pre style={{ background: '#f5f5f5', padding: 16 }}>
{`// Scroller 完整配置选项
{
    enabled: boolean,           // 是否启用，默认 true
    pannable: boolean | {       // 是否可拖拽平移
        enabled: boolean,
        eventTypes: ['leftMouseDown', 'rightMouseDown'],
    },
    className: string,          // 自定义 CSS 类名
    width: number,              // 滚动容器宽度
    height: number,             // 滚动容器高度
    pageWidth: number,          // 页面宽度（默认取 graph.width）
    pageHeight: number,         // 页面高度（默认取 graph.height）
    pageVisible: boolean,       // 是否显示页面背景
    pageBreak: boolean,         // 是否显示分页线
    minVisibleWidth: number,    // 最小可见宽度，默认 50
    minVisibleHeight: number,   // 最小可见高度，默认 50
    background: false | object, // 背景配置
    autoResize: boolean,        // 是否自动调整大小，默认 true
    padding: number | object | function, // 内边距
    modifiers: string[],        // 修饰键（alt, ctrl, shift, meta）
}

// 使用方式
import { Scroller } from '@antv/x6-plugin-scroller'

const scroller = new Scroller(options)
graph.use(scroller)`}
                </pre>
            </Card>

            <Divider />

            <Title level={3}>Scroller API 速查</Title>
            <Card>
                <pre style={{ background: '#f5f5f5', padding: 16 }}>
{`// ========== 滚动控制 ==========

// 锁定滚动
scroller.lockScroller()

// 解锁滚动
scroller.unlockScroller()

// 更新滚动区域
scroller.updateScroller()

// 调整滚动容器大小
scroller.resize(width, height)

// ========== 滚动条位置 ==========

// 获取滚动条位置
const pos = scroller.getScrollbarPosition()
// { left: number, top: number }

// 设置滚动条位置
scroller.setScrollbarPosition(left, top)

// 滚动到指定坐标点
scroller.scrollToPoint(x, y)

// 滚动到内容中心
scroller.scrollToContent()

// 滚动到指定节点
scroller.scrollToCell(cell)

// ========== 平移控制 ==========

// 判断是否可平移
scroller.isPannable()

// 启用平移
scroller.enablePanning()

// 禁用平移
scroller.disablePanning()

// 切换平移状态
scroller.togglePanning(pannable?: boolean)

// ========== 缩放 ==========

// 获取当前缩放比例
const scale = scroller.zoom()

// 缩放（相对值）
scroller.zoom(factor, options?)

// 缩放到指定比例（绝对值）
scroller.zoomTo(factor, options?)

// 缩放到指定区域
scroller.zoomToRect(rect, options?)

// 缩放以适应内容
scroller.zoomToFit(options?)

// ========== 定位 ==========

// 将画布中心定位到视口中心
scroller.center()

// 将指定点定位到视口中心
scroller.centerPoint(x, y, options?)

// 将内容中心定位到视口中心
scroller.centerContent(options?)

// 将指定节点定位到视口中心
scroller.centerCell(cell, options?)

// 将指定点定位到视口指定位置
scroller.positionPoint(point, x, y, options?)

// 将内容定位到视口指定方向
scroller.positionContent(direction, options?)

// ========== 过渡动画 ==========

// 平滑过渡到指定点
scroller.transitionToPoint(x, y, options?)

// 平滑过渡到指定区域
scroller.transitionToRect(rect, options?)

// ========== 自动调整 ==========

// 启用自动调整大小
scroller.enableAutoResize()

// 禁用自动调整大小
scroller.disableAutoResize()`}
                </pre>
            </Card>

            <PageNav {...getPageNav('/scroller-demo')} />
        </div>
    )
}

export default ScrollerDemo
