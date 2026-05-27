import React from 'react'
import { Graph } from '@antv/x6'
import { Snapline } from '@antv/x6-plugin-snapline'

// 方式一：固定画布大小
class FixedSizeGraph extends React.Component {
    private container: HTMLDivElement

    componentDidMount() {
        const graph = new Graph({
            container: this.container,
            width: 500,
            height: 300,
        })

        // 插件必须在添加节点之前注册
        graph.use(
            new Snapline({
                enabled: true,
            }),
        )
        // TODO
        graph.addNode({
            id: 'node1', // 节点唯一标识，用于边的 source/target 引用
            x: 50, // 节点左上角的 x 坐标（相对于画布）
            y: 50, // 节点左上角的 y 坐标（相对于画布）
            width: 100, // 节点宽度
            height: 40,// 节点高度
            label: 'Node 1', // 节点显示的文字
            attrs: {
                body: {
                    stroke: '#597ef7',
                    fill: '#d6e4ff',
                    rx: 6,
                    ry: 6,
                }
            }
        })

        graph.addNode({
            id: 'node2',
            x: 200,
            y: 150,
            width: 100,
            height: 40,
            label: 'Node 2',
            attrs: {
                body: {
                    stroke: '#597ef7',
                    fill: '#d6e4ff',
                    rx: 6,
                    ry: 6,
                }
            }
        })

        graph.addEdge({
            source: 'node1', // 起始节点的 id
            target: 'node2',// 目标节点的 id
            attrs: {
                line: { // line 是选择器名称，对应边的路径线条
                    stroke: '#597ef7',// 线条颜色
                    strokeWidth: 1,// 线条宽度
                },
            },
        })

        graph.centerContent()
    }



    refContainer = (container: HTMLDivElement) => {
        this.container = container
    }

    render() {
        return <div ref={this.refContainer} style={{ border: '1px solid #d9d9d9' }} />
    }
}

// 方式二：容器大小（默认）
class ContainerSizeGraph extends React.Component {
    private container: HTMLDivElement

    componentDidMount() {
        const graph = new Graph({
            container: this.container,
            // 不设置 width/height，自动使用容器大小
        })

        // TODO: 添加节点和边
        // 插件必须在添加节点之前注册
        graph.use(
            new Snapline({
                enabled: true,
            }),
        )

        graph.addNode({
            id: 'node1', // 节点唯一标识，用于边的 source/target 引用
            x: 50, // 节点左上角的 x 坐标（相对于画布）
            y: 50, // 节点左上角的 y 坐标（相对于画布）
            width: 100, // 节点宽度
            height: 40,// 节点高度
            label: 'Node 1', // 节点显示的文字
            attrs: {
                body: {
                    stroke: '#597ef7',
                    fill: '#d6e4ff',
                    rx: 6,
                    ry: 6,
                }
            }
        })

        graph.addNode({
            id: 'node2',
            x: 200,
            y: 150,
            width: 100,
            height: 40,
            label: 'Node 2',
            attrs: {
                body: {
                    stroke: '#597ef7',
                    fill: '#d6e4ff',
                    rx: 6,
                    ry: 6,
                }
            }
        })

        graph.addEdge({
            source: 'node1', // 起始节点的 id
            target: 'node2',// 目标节点的 id
            attrs: {
                line: { // line 是选择器名称，对应边的路径线条
                    stroke: '#597ef7',// 线条颜色
                    strokeWidth: 1,// 线条宽度
                },
            },
        })

        graph.centerContent()

    }

    refContainer = (container: HTMLDivElement) => {
        this.container = container
    }

    render() {
        // TODO: 设置容器的宽高
        return <div ref={this.refContainer} style={{ border: '1px solid #d9d9d9', width: 500, height: 500 }} />
    }
}

// 方式三：自适应容器大小
class AutoResizeGraph extends React.Component {
    private container: HTMLDivElement

    componentDidMount() {
        const graph = new Graph({
            container: this.container,
            autoResize: true,
        })

        graph.use(
            new Snapline({
                enabled: true,
            }),
        )

        graph.addNode({
            id: 'node1',
            x: 50,
            y: 50,
            width: 100,
            height: 40,
            label: 'Node 1',
            attrs: {
                body: {
                    stroke: '#597ef7',
                    fill: '#d6e4ff',
                    rx: 6,
                    ry: 6,
                }
            }
        })

        graph.addNode({
            id: 'node2',
            x: 200,
            y: 150,
            width: 100,
            height: 40,
            label: 'Node 2',
            attrs: {
                body: {
                    stroke: '#597ef7',
                    fill: '#d6e4ff',
                    rx: 6,
                    ry: 6,
                }
            }
        })

        graph.addEdge({
            source: 'node1',
            target: 'node2',
            attrs: {
                line: {
                    stroke: '#597ef7',
                    strokeWidth: 1,
                },
            },
        })

        graph.centerContent()
    }

    refContainer = (container: HTMLDivElement) => {
        this.container = container
    }

    render() {
        return (
            <div style={{ width: '100%', height: '500px' }}>
                <div ref={this.refContainer} style={{ width: '100%', height: '100%', border: '1px solid #d9d9d9' }} />
            </div>
        )
    }
}

// 主页面
export default class Xflows extends React.Component {
    render() {
        return (
            <div style={{ padding: 24 }}>
                <h2>X6 画布学习</h2>

                <h3>方式一：固定画布大小</h3>
                <FixedSizeGraph />

                <h3 style={{ marginTop: 24 }}>方式二：容器大小（默认）</h3>
                <ContainerSizeGraph />

                <h3 style={{ marginTop: 24 }}>方式三：自适应容器大小</h3>
                <AutoResizeGraph />
            </div>
        )
    }
}
