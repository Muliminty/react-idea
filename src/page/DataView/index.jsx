import { useState } from 'react'
import { map, uniq, flatten, cloneDeep, uniqBy, find, filter as _filter } from 'lodash'

import style from './style.module.scss'
import { Card } from 'antd';
import { DndContext, useSensors, useSensor, PointerSensor } from '@dnd-kit/core';
import Draggable from './Draggable'
import Droppable from './Droppable'
import MyLine from './materialsComponents/Line'
import PieChart from './materialsComponents/PieChart'
import CircularChart from './materialsComponents/CircularChart'

import Decoration8 from '@jiaminghi/data-view-react/es/Decoration8'
import Decoration5 from '@jiaminghi/data-view-react/es/Decoration5'
import Decoration10 from '@jiaminghi/data-view-react/es/Decoration10'
import BorderBox3 from '@jiaminghi/data-view-react/es/BorderBox3'
import BorderBox4 from '@jiaminghi/data-view-react/es/BorderBox4'
import BorderBox5 from '@jiaminghi/data-view-react/es/BorderBox5'
import BorderBox8 from '@jiaminghi/data-view-react/es/BorderBox8'

function DataView() {

    const materialsList = [
        {
            id: 'chart_1', title: '折线统计图', node: <>
                <MyLine />
            </>
        },
        { id: 'chart_2', title: '环图', node: <CircularChart /> },
        {
            id: 'chart_3', title: '饼图', node: <>
                <PieChart />
            </>
        },
        {
            id: 'chart_4', title: '饼图', node: <div style={{ background: 'red', height: '100%' }}>
                123
            </div>
        },
        // {
        //     id: 'chart_4', title: '33', node: <>
        //         <CircularChart />
        //     </>
        // },
        // { id: 'border_1', title: '44', node: <BorderBox9>BorderBox9</BorderBox9> },
    ]


    const [materialList, setMaterialList] = useState([...materialsList]);

    const [showList, setShowList] = useState([
        { id: 'aa', title: '盒子a', children: [], BorderNode: (props) => <>{props}</> },
        { id: 'bb', title: '盒子b', children: [], BorderNode: (props) => <>{props}</> },
        { id: 'cc', title: '盒子c', children: [], BorderNode: (props) => <>{props}</> },
        { id: 'dd', title: '盒子c', children: [], BorderNode: (props) => <BorderBox3>{props}</BorderBox3> },
        { id: 'ee', title: '盒子c', children: [], BorderNode: (props) => <BorderBox4>{props}</BorderBox4> },
        { id: 'ff', title: '盒子c', children: [], BorderNode: (props) => <BorderBox8>{props}</BorderBox8> },
        { id: 'gg', title: '盒子c', children: [], BorderNode: (props) => <BorderBox8>{props}</BorderBox8> },
        { id: 'gg1', title: '盒子c', children: [], BorderNode: (props) => <BorderBox4 reverse="{true}">{props}</BorderBox4> },
        { id: 'gg2', title: '盒子c', children: [], BorderNode: (props) => <BorderBox5 reverse="{true}">{props}</BorderBox5> },
        // { id: 'gg3', title: '盒子c', children: [], BorderNode: (props) => <>{props}</> },
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
        cloneData = [item, ...cloneData]
        // 根据id进行去重
        const newMaterialList = uniqBy(cloneData, 'id')
        return newMaterialList
    }

    /**
     * 根据ID返回指定元素
    */
    const getItemByID = (id, arr) => find(arr, ['id', id])


    const sensors = useSensors(useSensor(PointerSensor, {
        activationConstraint: {
            delay: 200, // 长按0.2s拖拽
            tolerance: 0,
        }
    }))

    return <div className={style.DataView}>
        <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
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
            <Decoration8 style={{ width: '25%', height: '70px' }} />
            <Decoration5 style={{ width: '40%', height: '100px' }} />
            <Decoration8 reverse={true} style={{ width: '25%', height: '70px' }} />
            <div className={style.show_header_title}>物联网数据统计平台</div>
        </div>

        <Decoration10 style={{ width: '100%', height: '3px' }} />

        <div className={style.show_content}>
            <div className={style.item1}>
                <BorderBox3>
                    {map(list, (e, i) => {
                        if (i < 3) return <>
                            <Droppable id={e.id} className='droppable droppable1'>
                                <Draggable className='draggable' >
                                    {map(e.children, (v) => {
                                        return <Draggable key={v.id} id={v.id}>
                                            <div className={style.title}>
                                                {v.title}
                                            </div>
                                            {v.node || v.title}
                                        </Draggable>
                                    })}
                                </Draggable>
                            </Droppable>
                        </>
                    })}
                </BorderBox3>
            </div>





            <div className={style.item2}>
                {map(list, (e, i) => {
                    if (i >= 3 && i < 5) return <Droppable id={e.id} className='droppable droppable2'>
                        {e.BorderNode(<Draggable className='draggable' >
                            {map(e.children, (v) => {
                                return <Draggable key={v.id} id={v.id}>
                                    <div className={style.title}>
                                        {v.title}
                                    </div>
                                    {v.node || v.title}
                                </Draggable>
                            })}
                        </Draggable>)}

                    </Droppable>
                })}
            </div>

            <div className={style.item3}>
                {map(list, (e, i) => {
                    if (i > 5) return <Droppable id={e.id} className='droppable droppable2'>
                        {e.BorderNode(<Draggable className='draggable' >
                            {map(e.children, (v) => {
                                return <Draggable key={v.id} id={v.id}>
                                    <div className={style.title}>
                                        {v.title}
                                    </div>
                                    {v.node || v.title}
                                </Draggable>
                            })}
                        </Draggable>)}

                    </Droppable>
                })}
            </div>
        </div>
    </div>
}



export default DataView
