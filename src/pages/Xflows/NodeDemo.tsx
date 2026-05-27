import React from 'react'
import { Graph } from '@antv/x6'
import { Card, Row, Col, Typography, Divider, Table, Button, Space } from 'antd'
import PageNav, { getPageNav } from '../../components/PageNav'

const { Title, Paragraph, Text } = Typography

// 1. 内置节点类型展示
class BuiltInNodesGraph extends React.Component {
    private container!: HTMLDivElement

    componentDidMount() {
        const graph = new Graph({
            container: this.container,
            width: 600,
            height: 350,
            background: { color: '#f5f5f5' },
            grid: { visible: true, type: 'dot', size: 10 },
        })

        // rect - 矩形（默认）
        graph.addNode({
            shape: 'rect',
            x: 40,
            y: 30,
            width: 100,
            height: 40,
            label: 'rect',
            attrs: {
                body: { stroke: '#597ef7', fill: '#d6e4ff', rx: 6, ry: 6 },
            },
        })

        // circle - 圆形
        graph.addNode({
            shape: 'circle',
            x: 200,
            y: 30,
            width: 60,
            height: 60,
            label: 'circle',
            attrs: {
                body: { stroke: '#52c41a', fill: '#d9f7be' },
            },
        })

        // ellipse - 椭圆
        graph.addNode({
            shape: 'ellipse',
            x: 320,
            y: 30,
            width: 100,
            height: 60,
            label: 'ellipse',
            attrs: {
                body: { stroke: '#fa8c16', fill: '#ffe7ba' },
            },
        })

        // polygon - 多边形
        graph.addNode({
            shape: 'polygon',
            x: 460,
            y: 30,
            width: 100,
            height: 60,
            label: 'polygon',
            attrs: {
                body: {
                    stroke: '#722ed1',
                    fill: '#efdbff',
                    refPoints: '0,10 10,0 20,10 20,20 10,30 0,20',
                },
            },
        })

        // polyline - 折线
        graph.addNode({
            shape: 'polyline',
            x: 40,
            y: 130,
            width: 100,
            height: 60,
            label: 'polyline',
            attrs: {
                body: {
                    stroke: '#eb2f96',
                    fill: '#fff0f6',
                    refPoints: '0,0 100,0 100,60 50,30 0,60',
                },
            },
        })

        // path - 路径
        graph.addNode({
            shape: 'path',
            x: 200,
            y: 130,
            width: 80,
            height: 80,
            label: 'path',
            attrs: {
                body: {
                    stroke: '#1890ff',
                    fill: '#bae7ff',
                    d: 'M 0 10 L 20 0 L 40 10 L 40 30 L 20 40 L 0 30 Z',
                },
            },
        })

        // image - 图片
        graph.addNode({
            shape: 'image',
            x: 340,
            y: 130,
            width: 80,
            height: 80,
            label: 'image',
            attrs: {
                image: {
                    xlinkHref: 'https://gw.alipayobjects.com/zos/bmw-prod/d9f3b43e-9b1a-4e1d-8e83-3c3c1b3c8c8c.svg',
                    width: 80,
                    height: 80,
                },
            },
        })

        // html - HTML 节点
        graph.addNode({
            shape: 'html',
            x: 480,
            y: 130,
            width: 120,
            height: 60,
            html: `<div style="
                background: #f0f5ff;
                border: 1px solid #597ef7;
                border-radius: 6px;
                padding: 8px;
                text-align: center;
                color: #597ef7;
                font-weight: bold;
                width: 100%;
                height: 100%;
                box-sizing: border-box;
                display: flex;
                align-items: center;
                justify-content: center;
            ">HTML 节点</div>`,
        })
    }

    refContainer = (container: HTMLDivElement) => {
        this.container = container
    }

    render() {
        return <div ref={this.refContainer} />
    }
}

// 2. 添加节点基础
class AddNodeGraph extends React.Component {
    private container!: HTMLDivElement
    private graph!: Graph

    componentDidMount() {
        this.graph = new Graph({
            container: this.container,
            width: 400,
            height: 250,
            background: { color: '#f5f5f5' },
            grid: { visible: true, type: 'dot', size: 10 },
        })

        // 基础添加节点
        this.graph.addNode({
            shape: 'rect',
            x: 100,
            y: 40,
            width: 120,
            height: 40,
            label: '基础节点',
            attrs: {
                body: { stroke: '#597ef7', fill: '#d6e4ff', rx: 6, ry: 6 },
            },
        })
    }

    addNewNode = () => {
        const x = Math.random() * 250 + 20
        const y = Math.random() * 150 + 80
        this.graph.addNode({
            shape: 'rect',
            x,
            y,
            width: 100,
            height: 40,
            label: `新节点`,
            attrs: {
                body: {
                    stroke: '#52c41a',
                    fill: '#d9f7be',
                    rx: 6,
                    ry: 6,
                },
            },
        })
    }

    refContainer = (container: HTMLDivElement) => {
        this.container = container
    }

    render() {
        return (
            <div>
                <div ref={this.refContainer} />
                <Button type="primary" onClick={this.addNewNode} style={{ marginTop: 8 }}>
                    点击添加节点
                </Button>
            </div>
        )
    }
}

// 3. 自定义节点 - markup + attrs
class CustomNodeGraph extends React.Component {
    private container!: HTMLDivElement

    componentDidMount() {
        const graph = new Graph({
            container: this.container,
            width: 500,
            height: 280,
            background: { color: '#f5f5f5' },
            grid: { visible: true, type: 'dot', size: 10 },
        })

        // 自定义节点：使用 markup 定义结构，attrs 定义样式
        graph.addNode({
            shape: 'rect',
            x: 40,
            y: 40,
            width: 160,
            height: 80,
            markup: [
                { tagName: 'rect', selector: 'body' },
                { tagName: 'text', selector: 'label' },
                { tagName: 'circle', selector: 'dot' },
            ],
            attrs: {
                body: {
                    stroke: '#597ef7',
                    fill: '#d6e4ff',
                    rx: 10,
                    ry: 10,
                    width: 160,
                    height: 80,
                },
                label: {
                    text: '自定义节点',
                    fill: '#333',
                    fontSize: 14,
                    refX: 0.5,
                    refY: 0.4,
                    textAnchor: 'middle',
                    textVerticalAnchor: 'middle',
                },
                dot: {
                    r: 6,
                    fill: '#597ef7',
                    refX: 0.5,
                    refY: 0.8,
                },
            },
        })

        // 带图标的自定义节点
        graph.addNode({
            shape: 'rect',
            x: 260,
            y: 40,
            width: 180,
            height: 80,
            markup: [
                { tagName: 'rect', selector: 'body' },
                { tagName: 'text', selector: 'title' },
                { tagName: 'text', selector: 'desc' },
            ],
            attrs: {
                body: {
                    stroke: '#52c41a',
                    fill: '#fff',
                    rx: 8,
                    ry: 8,
                    width: 180,
                    height: 80,
                },
                title: {
                    text: '带描述的节点',
                    fill: '#333',
                    fontSize: 14,
                    fontWeight: 'bold',
                    refX: 0.5,
                    refY: 0.35,
                    textAnchor: 'middle',
                    textVerticalAnchor: 'middle',
                },
                desc: {
                    text: '这是一段描述文字',
                    fill: '#999',
                    fontSize: 11,
                    refX: 0.5,
                    refY: 0.7,
                    textAnchor: 'middle',
                    textVerticalAnchor: 'middle',
                },
            },
        })

        // 带状态颜色的节点
        graph.addNode({
            shape: 'rect',
            x: 150,
            y: 170,
            width: 180,
            height: 60,
            markup: [
                { tagName: 'rect', selector: 'body' },
                { tagName: 'circle', selector: 'status' },
                { tagName: 'text', selector: 'label' },
            ],
            attrs: {
                body: {
                    stroke: '#faad14',
                    fill: '#fffbe6',
                    rx: 8,
                    ry: 8,
                    width: 180,
                    height: 60,
                },
                status: {
                    r: 5,
                    fill: '#52c41a',
                    refX: 15,
                    refY: 0.5,
                },
                label: {
                    text: '带状态指示器',
                    fill: '#333',
                    fontSize: 13,
                    refX: 35,
                    refY: 0.5,
                    textVerticalAnchor: 'middle',
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

// 4. 修改节点 API
class ModifyNodeGraph extends React.Component {
    private container!: HTMLDivElement
    private graph!: Graph
    private node: any

    componentDidMount() {
        this.graph = new Graph({
            container: this.container,
            width: 500,
            height: 280,
            background: { color: '#f5f5f5' },
            grid: { visible: true, type: 'dot', size: 10 },
        })

        this.node = this.graph.addNode({
            shape: 'rect',
            x: 150,
            y: 80,
            width: 160,
            height: 60,
            label: '修改我',
            attrs: {
                body: { stroke: '#597ef7', fill: '#d6e4ff', rx: 6, ry: 6 },
                label: { fontSize: 14 },
            },
        })
    }

    changeSize = () => {
        // 使用 prop 修改尺寸
        this.node.prop('size', { width: 200, height: 80 })
    }

    changeColor = () => {
        // 使用 attr 修改填充色
        this.node.attr('body/fill', '#ffe7ba')
        this.node.attr('body/stroke', '#fa8c16')
    }

    changeLabel = () => {
        // 使用 attr 修改文字
        this.node.attr('label/text', '已被修改')
        this.node.attr('label/fill', '#ff4d4f')
    }

    changePosition = () => {
        // 使用 prop 修改位置
        const x = Math.random() * 250 + 50
        const y = Math.random() * 150 + 50
        this.node.prop('position', { x, y })
    }

    resetNode = () => {
        // 重置所有属性
        this.node.prop('size', { width: 160, height: 60 })
        this.node.prop('position', { x: 150, y: 80 })
        this.node.attr('body/fill', '#d6e4ff')
        this.node.attr('body/stroke', '#597ef7')
        this.node.attr('label/text', '修改我')
        this.node.attr('label/fill', '#000')
    }

    refContainer = (container: HTMLDivElement) => {
        this.container = container
    }

    render() {
        return (
            <div>
                <div ref={this.refContainer} />
                <Space style={{ marginTop: 8 }}>
                    <Button onClick={this.changeSize}>修改尺寸</Button>
                    <Button onClick={this.changeColor}>修改颜色</Button>
                    <Button onClick={this.changeLabel}>修改文字</Button>
                    <Button onClick={this.changePosition}>修改位置</Button>
                    <Button onClick={this.resetNode}>重置</Button>
                </Space>
            </div>
        )
    }
}

// 5. prop 展示
class PropDemoGraph extends React.Component {
    private container!: HTMLDivElement
    private outputRef!: HTMLPreElement

    componentDidMount() {
        const graph = new Graph({
            container: this.container,
            width: 400,
            height: 200,
            background: { color: '#f5f5f5' },
            grid: { visible: true, type: 'dot', size: 10 },
        })

        const node = graph.addNode({
            shape: 'rect',
            x: 100,
            y: 50,
            width: 160,
            height: 60,
            label: '查看 prop',
            attrs: {
                body: { stroke: '#597ef7', fill: '#d6e4ff', rx: 6, ry: 6 },
            },
        })

        // 打印 node.prop()
        if (this.outputRef) {
            this.outputRef.textContent = JSON.stringify(node.prop(), null, 2)
        }
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
                <pre
                    ref={this.refOutput}
                    style={{
                        background: '#f5f5f5',
                        padding: 12,
                        marginTop: 8,
                        maxHeight: 200,
                        overflow: 'auto',
                        fontSize: 12,
                    }}
                />
            </div>
        )
    }
}

// 内置节点类型表格
const nodeTypeColumns = [
    { title: 'shape', dataIndex: 'shape', key: 'shape' },
    { title: '描述', dataIndex: 'desc', key: 'desc' },
]

const nodeTypeData = [
    { key: '1', shape: 'rect', desc: '矩形（默认）' },
    { key: '2', shape: 'circle', desc: '圆形' },
    { key: '3', shape: 'ellipse', desc: '椭圆' },
    { key: '4', shape: 'polygon', desc: '多边形' },
    { key: '5', shape: 'polyline', desc: '折线' },
    { key: '6', shape: 'path', desc: '路径' },
    { key: '7', shape: 'image', desc: '图片' },
    { key: '8', shape: 'html', desc: 'HTML 节点' },
]

const NodeDemo: React.FC = () => {
    return (
        <div style={{ padding: 24 }}>
            <Typography>
                <Title level={2}>X6 节点学习</Title>
                <Paragraph>
                    了解 X6 的节点渲染方式、添加方法、内置类型、自定义节点以及 API 修改。
                </Paragraph>
            </Typography>

            <Divider />

            <Title level={3}>1. 内置节点类型</Title>
            <Row gutter={[16, 16]}>
                <Col span={14}>
                    <Card title="内置节点演示">
                        <BuiltInNodesGraph />
                    </Card>
                </Col>
                <Col span={10}>
                    <Card title="节点类型对照表">
                        <Table
                            columns={nodeTypeColumns}
                            dataSource={nodeTypeData}
                            size="small"
                            pagination={false}
                        />
                        <pre style={{ background: '#f5f5f5', padding: 12, marginTop: 12 }}>
                            {`// 使用 shape 指定节点类型
graph.addNode({
    shape: 'rect',   // 矩形
    // shape: 'circle',  // 圆形
    // shape: 'ellipse', // 椭圆
    x: 100,
    y: 40,
    width: 100,
    height: 40,
})`}
                        </pre>
                    </Card>
                </Col>
            </Row>

            <Divider />

            <Title level={3}>2. 添加节点</Title>
            <Row gutter={[16, 16]}>
                <Col span={12}>
                    <Card title="基础添加">
                        <Paragraph>
                            使用 <Text code>graph.addNode()</Text> 添加节点，
                            可以指定 <Text code>shape</Text>、<Text code>x</Text>、<Text code>y</Text>、
                            <Text code>width</Text>、<Text code>height</Text>、<Text code>label</Text> 等属性。
                        </Paragraph>
                        <AddNodeGraph />
                        <pre style={{ background: '#f5f5f5', padding: 12, marginTop: 12 }}>
                            {`// 基础添加节点
graph.addNode({
    shape: 'rect',    // 节点类型
    x: 100,           // x 坐标
    y: 40,            // y 坐标
    width: 120,       // 宽度
    height: 40,       // 高度
    label: '节点',    // 文字
    attrs: {
        body: {
            stroke: '#597ef7', // 边框颜色
            fill: '#d6e4ff',   // 填充颜色
            rx: 6,             // 圆角
            ry: 6,
        },
    },
})`}
                        </pre>
                    </Card>
                </Col>
                <Col span={12}>
                    <Card title="节点属性速查">
                        <pre style={{ background: '#f5f5f5', padding: 16 }}>
                            {`// 节点属性
{
    shape: 'rect',     // 节点类型
    id: 'node1',       // 唯一标识
    x: 100,            // x 坐标 (px)
    y: 100,            // y 坐标 (px)
    width: 100,        // 宽度 (px)
    height: 40,        // 高度 (px)
    angle: 0,          // 旋转角度
    label: '文字',     // 显示文字
    visible: true,     // 是否可见
    zIndex: 1,         // 层级
    
    attrs: {
        body: {
            stroke: '#333',    // 边框颜色
            strokeWidth: 2,    // 边框宽度
            fill: '#fff',      // 填充颜色
            rx: 6,             // 圆角 x
            ry: 6,             // 圆角 y
        },
        label: {
            fontSize: 14,      // 字体大小
            fill: '#000',      // 字体颜色
            fontWeight: 'bold', // 加粗
            refX: 0.5,         // 水平居中
            refY: 0.5,         // 垂直居中
            textAnchor: 'middle',
            textVerticalAnchor: 'middle',
        },
    },
}`}
                        </pre>
                    </Card>
                </Col>
            </Row>

            <Divider />

            <Title level={3}>3. 自定义节点 (markup + attrs)</Title>
            <Row gutter={[16, 16]}>
                <Col span={12}>
                    <Card title="自定义节点演示">
                        <Paragraph>
                            使用 <Text code>markup</Text> 定义节点结构（类比 HTML），
                            使用 <Text code>attrs</Text> 定义样式（类比 CSS）。
                        </Paragraph>
                        <CustomNodeGraph />
                    </Card>
                </Col>
                <Col span={12}>
                    <Card title="markup + attrs 示例">
                        <pre style={{ background: '#f5f5f5', padding: 16, fontSize: 12 }}>
                            {`graph.addNode({
    shape: 'rect',
    x: 40, y: 40,
    width: 160, height: 80,
    
    // markup: 定义节点结构
    // 类比 HTML 标签
    markup: [
        { tagName: 'rect', selector: 'body' },
        { tagName: 'text', selector: 'label' },
        { tagName: 'circle', selector: 'dot' },
    ],
    
    // attrs: 定义样式
    // 类比 CSS 样式
    attrs: {
        body: {
            stroke: '#597ef7',  // 边框颜色
            fill: '#d6e4ff',    // 填充颜色
            rx: 10, ry: 10,     // 圆角
            refWidth: '100%',   // 相对宽度
            refHeight: '100%',  // 相对高度
        },
        label: {
            text: '自定义节点', // 文字
            fill: '#333',
            fontSize: 14,
            refX: 0.5,         // 水平位置 (50%)
            refY: 0.4,         // 垂直位置 (40%)
            textAnchor: 'middle',
            textVerticalAnchor: 'middle',
        },
        dot: {
            r: 6,              // 半径
            fill: '#597ef7',
            refX: 0.5,         // 水平居中
            refY: 0.8,         // 底部 80% 位置
        },
    },
})`}
                        </pre>
                    </Card>
                </Col>
            </Row>

            <Divider />

            <Title level={3}>4. 修改节点 API</Title>
            <Row gutter={[16, 16]}>
                <Col span={12}>
                    <Card title="prop 和 attr 方法">
                        <Paragraph>
                            渲染完成后，可以通过 <Text code>node.prop()</Text> 和 <Text code>node.attr()</Text> 修改节点。
                        </Paragraph>
                        <ModifyNodeGraph />
                    </Card>
                </Col>
                <Col span={12}>
                    <Card title="prop 展示">
                        <Paragraph>
                            打印 <Text code>node.prop()</Text> 可以查看节点的所有属性。
                        </Paragraph>
                        <PropDemoGraph />
                    </Card>
                </Col>
            </Row>

            <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
                <Col span={24}>
                    <Card title="修改节点 API 速查">
                        <pre style={{ background: '#f5f5f5', padding: 16 }}>
                            {`// 获取节点引用
const node = graph.addNode({ ... })

// ========== prop 方法 ==========

// 修改尺寸
node.prop('size', { width: 200, height: 80 })

// 修改位置
node.prop('position', { x: 100, y: 100 })

// 修改任意属性
node.prop('attrs/body/fill', '#ccc')

// 获取所有属性
console.log(node.prop())

// ========== attr 方法 ==========

// 修改填充色（等价于 node.prop('attrs/rect/fill', '#ccc')）
node.attr('body/fill', '#ccc')

// 修改边框颜色
node.attr('body/stroke', '#ff0000')

// 修改文字
node.attr('label/text', '新文字')

// 修改文字颜色
node.attr('label/fill', '#333')

// 修改文字大小
node.attr('label/fontSize', 16)

// ========== 其他常用方法 ==========

// 删除节点
graph.removeNode(node.id)

// 获取节点位置
const pos = node.position()  // { x, y }

// 获取节点尺寸
const size = node.getSize()  // { width, height }

// 判断节点是否可见
const visible = node.isVisible()  // true/false`}
                        </pre>
                    </Card>
                </Col>
            </Row>

            <Divider />

            <Title level={3}>5. 特殊属性说明</Title>
            <Card>
                <pre style={{ background: '#f5f5f5', padding: 16 }}>
                    {`// X6 内置的特殊属性（不是 SVG 原生属性）

{
    refX: 0.5,          // 相对于父元素的 x 位置 (0-1 或 像素值)
    refY: 0.5,          // 相对于父元素的 y 位置 (0-1 或 像素值)
    refWidth: '100%',   // 相对宽度
    refHeight: '100%',  // 相对高度
    textAnchor: 'middle',       // 文字水平对齐: start/middle/end
    textVerticalAnchor: 'middle', // 文字垂直对齐: start/middle/end
}

// 示例：文字居中
attrs: {
    label: {
        text: '居中文字',
        refX: 0.5,              // 水平 50% 位置
        refY: 0.5,              // 垂直 50% 位置
        textAnchor: 'middle',   // 水平居中
        textVerticalAnchor: 'middle', // 垂直居中
    },
}`}
                </pre>
            </Card>

            <PageNav {...getPageNav('/node-demo')} />
        </div>
    )
}

export default NodeDemo
