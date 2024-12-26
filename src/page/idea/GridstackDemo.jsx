
import React, { useEffect } from 'react';
import GridStack from 'gridstack';
import 'gridstack/dist/h5/gridstack.min.css'; // 引入GridStack的样式
import './Gridstack.css'; // 自定义样式，类似demo.css的内容

// 引入Ionicons
import 'ionicons/dist/ionicons/ionicons.css';

const Gridstack = () => {
    // 子项内容
    const children = [
        { x: 0, y: 0, w: 4, h: 2, content: '1' },
        {
            x: 4, y: 0, w: 4, h: 4, locked: true, content: "I can't be moved or dragged, nor pushed by others!<br><ion-icon name='ios-lock'></ion-icon>"
        },
        {
            x: 8, y: 0, w: 2, h: 2, minW: 2, noResize: true, content: "<p class='card-text text-center' style='margin-bottom: 0'>Drag me!<p class='card-text text-center' style='margin-bottom: 0'><ion-icon name='hand'></ion-icon><p class='card-text text-center' style='margin-bottom: 0'>...but don't resize me!"
        },
        { x: 10, y: 0, w: 2, h: 2, content: '4' },
        { x: 0, y: 2, w: 2, h: 2, content: '5' },
        { x: 2, y: 2, w: 2, h: 4, content: '6' },
        { x: 8, y: 2, w: 4, h: 2, content: '7' },
        { x: 0, y: 4, w: 2, h: 2, content: '8' },
        { x: 4, y: 4, w: 4, h: 2, content: '9' },
        { x: 8, y: 4, w: 2, h: 2, content: '10' },
        { x: 10, y: 4, w: 2, h: 2, content: '11' },
    ];

    // 新插入的项目
    const insert = [{ h: 2, content: 'new item' }];

    useEffect(() => {
        const grid = GridStack.init({
            cellHeight: 70,
            acceptWidgets: true,
            removable: '#trash', // 拖出删除区域
            children
        });

        // 初始化拖拽
        GridStack.setupDragIn('.sidepanel>.grid-stack-item', undefined, insert);

        // 监听网格项添加、移除、变化
        grid.on('added removed change', (e, items) => {
            let str = '';
            items.forEach((item) => {
                str += ` (x,y)=${item.x},${item.y}`;
            });
            console.log(`${e.type} ${items.length} items: ${str}`);
        });

        return () => {
            grid.destroy(); // 清理GridStack实例
        };
    }, []);

    return (
        <div>
            <h1>Advanced Demo</h1>
            <div className="row">
                <div className="sidepanel col-md-2 d-none d-md-block">
                    <div id="trash" className="sidepanel-item">
                        <ion-icon name="trash"></ion-icon>
                        <div>Drop here to remove!</div>
                    </div>
                    <div className="grid-stack-item sidepanel-item">
                        <ion-icon name="add-circle"></ion-icon>
                        <div>Drag me in the dashboard!</div>
                    </div>
                </div>
                <div className="col-sm-12 col-md-10">
                    <div className="grid-stack"></div>
                </div>
            </div>
        </div>
    );
};

export default Gridstack;
