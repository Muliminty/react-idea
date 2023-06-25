import { useState } from 'react'
import { map, uniq, flatten, cloneDeep, uniqBy, find, filter as _filter } from 'lodash'

import style from './style.module.scss'
import { Card } from 'antd';
import { DndContext } from '@dnd-kit/core';
import Draggable from './Draggable'
import Droppable from './Droppable'
import MyLine from './materialsComponents/Line'

import MyFlylineChartEnhanced from './materialsComponents/FlylineChartEnhanced'

function DataView() {

    const materialsList = [
        { id: 'chart_1', title: '折线统计图', node: <MyLine /> },
        { id: 'chart_2', title: '22', node: <MyFlylineChartEnhanced /> },
        { id: 'chart_3', title: '33', node: <span>33</span> },
        { id: 'chart_31', title: '331', node: <span>331</span> },
        { id: 'chart_32', title: '332', node: <span>332</span> },
        { id: 'chart_33', title: '333', node: <span>333</span> },
        { id: 'chart_34', title: '334', node: <span>334</span> },
        { id: 'chart_35', title: '335', node: <span>335</span> },
        { id: 'border_1', title: '44', node: <span>44</span> },
    ]


    const [materialList, setMaterialList] = useState([...materialsList]);

    const [showList, setShowList] = useState([
        { id: 'aa', title: '盒子a', children: [], BorderNode: (props) => <>{props}</> },
        { id: 'bb', title: '盒子b', children: [], BorderNode: (props) => <>{props}</> },
        { id: 'cc', title: '盒子c', children: [], BorderNode: (props) => <>{props}</> },
        { id: 'dd', title: '盒子c', children: [], BorderNode: (props) => <>{props}</> },
        { id: 'ee', title: '盒子c', children: [], BorderNode: (props) => <>{props}</> },
        { id: 'ff', title: '盒子c', children: [], BorderNode: (props) => <>{props}</> },
        { id: 'gg', title: '盒子c', children: [], BorderNode: (props) => <>{props}</> },
        { id: 'gg1', title: '盒子c', children: [], BorderNode: (props) => <>{props}</> },
        { id: 'gg2', title: '盒子c', children: [], BorderNode: (props) => <>{props}</> },
        { id: 'gg3', title: '盒子c', children: [], BorderNode: (props) => <>{props}</> },
    ]);


    const handleDragEnd = ({ active, over }) => {
        const activeId = active.id
        const overId = over?.id
        // 1.将拖拽物料添加到盒子
        const newShowList = AddItemChildrenListByID(activeId, overId, showList)
        setShowList(newShowList)


        /**
         * 如果模板盒子里面有数据，就过滤物料盒的项
         * */

        const List = map(showList, 'children')
        const flattenList = flatten([...List])
        const flattenIDList = map(flattenList, 'id')
        const res = []
        materialsList.forEach((e) => { if (!flattenIDList.includes(e.id)) res.push(e) })
        setMaterialList(res)

        // 物料挪出盒子就将物料添加到物料库
        if (!overId) {
            const newMaterialList = AddItemByID(activeId, materialList);
            setMaterialList(newMaterialList)
        }
    }
    /**
 * 基于id添加元素到指定项的children数组
 * */
    const AddItemChildrenListByID = (id, overId, arr) => {
        const item = getItemByID(id, materialsList)
        const newShowList = map(arr, (e) => {
            e.children = _filter(e.children, (o) => o.id !== id)

            // 是否多个
            if (e.id === overId) e.children = uniq([item])
            // if (e.id === overId) e.children = uniq([...e.children, item])

            e.children = uniqBy(e.children, 'id')  // 去重
            return e
        })
        return newShowList
    }


    /**
     *  基于id在数组后面添加指定元素，并去重
     * */
    const AddItemByID = (id, arr) => {
        const item = getItemByID(id, materialsList)
        let cloneData = cloneDeep(arr)
        cloneData = [...cloneData, item]
        // 根据id进行去重
        const newMaterialList = uniqBy(cloneData, 'id')
        return newMaterialList
    }

    /**
     * 根据ID返回指定元素
    */
    const getItemByID = (id, arr) => find(arr, ['id', id])

    return <div className={style.DataView}>
        <DndContext onDragEnd={handleDragEnd}>
            <Material list={materialList} />

            <Show list={showList} />
        </DndContext>
    </div >
}


// eslint-disable-next-line react/prop-types
const Material = ({ list = [] }) => {

    return <div className={style.material}>
        {map(list, (e) => {
            return <Draggable key={e.id} id={e.id}>
                <Card
                    title={e.title}
                    bordered={false}
                >
                    {e.node}
                </Card>
            </Draggable>
        })}

    </div>
}

// eslint-disable-next-line react/prop-types
const Show = ({ list = [] }) => {

    return <div className={style.show}>


        <div className={style.show_header}>
            <div>物联网平台数据统计</div>

            <div>2023年6月25日 16:40:15</div>
        </div>
        <div className={style.show_content}>
            <div className={style.item1}>
                {map(list, (e, i) => {
                    if (i < 3) return <Droppable id={e.id} className='droppable droppable1'>
                        <Draggable >
                            {map(e.children, (v) => {
                                return <Draggable key={v.id} id={v.id}>
                                    {v.node || v.title}
                                </Draggable>
                            })}
                        </Draggable>
                    </Droppable>
                })}
            </div>

            <div className={style.item2}>
                {map(list, (e, i) => {
                    if (3 <= i && 5 > i) return <Droppable id={e.id} className='droppable droppable2'>
                        <Draggable >
                            {map(e.children, (v) => {
                                return <Draggable key={v.id} id={v.id}>
                                    {v.node || v.title}
                                </Draggable>
                            })}
                        </Draggable>
                    </Droppable>
                })}
            </div>

            <div className={style.item3}>
                {map(list, (e, i) => {
                    if (5 < i) return <Droppable id={e.id} className='droppable droppable3'>
                        <Draggable >
                            {map(e.children, (v) => {
                                return <Draggable key={v.id} id={v.id}>
                                    {v.node || v.title}
                                </Draggable>
                            })}
                        </Draggable>
                    </Droppable>
                })}
            </div>
        </div>
    </div>
}



export default DataView
