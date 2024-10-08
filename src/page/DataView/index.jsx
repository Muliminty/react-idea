import { useState, useRef, useEffect } from 'react'
import { map, uniq, flatten, cloneDeep, uniqBy, find, filter as _filter, } from 'lodash'
import { Button, Modal, Input, Select } from 'antd';
import useFullScreen from '../../hook/useFullScreen'
import style from './style.module.scss'
import { Card } from 'antd';
import { DndContext, useSensors, useSensor, PointerSensor } from '@dnd-kit/core';
import Draggable from './Draggable'
import Droppable from './Droppable'
import MyLine from './materialsComponents/Line'
import PieChart from './materialsComponents/PieChart'
import CircularChart from './materialsComponents/CircularChart'

// import Decoration8 from '@jiaminghi/data-view-react/es/Decoration8'
// import Decoration5 from '@jiaminghi/data-view-react/es/Decoration5'
// import Decoration10 from '@jiaminghi/data-view-react/es/Decoration10'
// import BorderBox3 from '@jiaminghi/data-view-react/es/BorderBox3'
// import BorderBox4 from '@jiaminghi/data-view-react/es/BorderBox4'
// import BorderBox5 from '@jiaminghi/data-view-react/es/BorderBox5'
// import BorderBox8 from '@jiaminghi/data-view-react/es/BorderBox8'

function DataView() {

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const materialsList = useRef([
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
    ])

    const [materialList, setMaterialList] = useState([...materialsList.current]);

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
        AddItemChildrenListByID(activeId, overId, showList)

        /**
         * 如果模板盒子里面有数据，就过滤物料盒的项
         * */

        const List = map(showList, 'children')
        const flattenList = flatten([...List])
        const flattenIDList = map(flattenList, 'id')
        const res = []
        materialsList.current.forEach((e) => { if (!flattenIDList.includes(e.id)) res.push(e) })
        setMaterialList(res)


        // 物料挪出盒子就将物料添加到物料库
        if (!overId) AddItemByID(activeId, materialList);

        setTimeout(() => {
            let o = document.querySelector(`#${active.id}`)
            o.style.zIndex = "10";
            o.style.position = "relative";
        }, 0)
    }
    /**
 * 基于id添加元素到指定项的children数组
 * */
    const AddItemChildrenListByID = (id, overId, arr) => {


        const item = getItemByID(id, materialsList.current)
        const newShowList = map(arr, (e) => {
            e.children = _filter(e.children, (o) => o.id !== id)
            if (e.id === overId) e.children = uniq([item])
            e.children = uniqBy(e.children, 'id')  // 去重
            return e
        })
        setShowList(newShowList)

    }


    const AddItemByID = (id, arr) => {
        const item = getItemByID(id, materialsList.current)
        let cloneData = cloneDeep(arr)
        cloneData = [item, ...cloneData]
        // 根据id进行去重
        const newMaterialList = uniqBy(cloneData, 'id')
        setMaterialList(newMaterialList)
    }

    /**
     * 根据ID返回指定元素
    */
    const getItemByID = (id, arr) => find(arr, ['id', id])


    const sensors = useSensors(useSensor(PointerSensor, {
        activationConstraint: {
            delay: 0, // 长按0.2s拖拽
            tolerance: 0,
        }
    }))
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = (val) => {
        const map = {
            MyLine: <MyLine />,
            CircularChart: <CircularChart />,
            PieChart: <PieChart />,
        }
        const num = Math.ceil(Math.random() * 999999);
        const obj = {
            id: `chart_${num}`, title: val.title, node: <>
                {map[val.node]}
            </>
        }
        materialsList.current = [obj, ...materialsList.current]
        setMaterialList((val) => {
            return [obj, ...val]
        })
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const handleAddMaterial = () => { showModal() }

    const onDragStart = ({ active }) => {
        let o = document.querySelector(`#${active.id}`)
        o.style.zIndex = "10000";
        o.style.position = "absolute";
    };
    return <div className={style.DataView}>
        <DndContext onDragEnd={handleDragEnd}
            onDragStart={onDragStart}
            sensors={sensors}
        >
            <Material list={materialList} add={handleAddMaterial} />
            <Show list={showList} />

            <MaterialModal open={isModalOpen} onCancel={handleCancel} onOk={handleOk} />
        </DndContext>
    </div >
}


// eslint-disable-next-line react/prop-types
const Material = ({ list = [], add }) => {


    return <div className={style.MaterialBox}>
        <Button onClick={add}>添加</Button>
        <div className={style.material}>
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
    </div>
}

// eslint-disable-next-line react/prop-types
const MaterialModal = ({ open, onOk, onCancel }) => {

    const [value, setValue] = useState({
        node: 'MyLine',
        title: '',
        api: 'http//....?a=11',// 通过接口获取物料的需要的数据
        data: ''//直接输入物料需要的数据  和api互斥
    });
    const handleChange = (v, k) => {
        setValue({
            ...value,
            [k]: v
        })
    }
    return <Modal title="添加物料" open={open} onOk={() => { onOk(value) }} onCancel={onCancel}>
        <Input placeholder='请输入title' onChange={(e) => { handleChange(e.target.value, 'title') }} />
        <Select
            defaultValue={value.node}
            style={{
                width: 120,
            }}
            onChange={(v) => { handleChange(v, 'node') }}
            options={[
                {
                    value: 'MyLine',
                    label: '折线',
                },
                {
                    value: 'CircularChart',
                    label: '环图',
                },
                {
                    value: 'PieChart',
                    label: '饼图',
                },
            ]}
        />
    </Modal>
}
// eslint-disable-next-line react/prop-types
const Show = ({ list = [] }) => {

    const [isFullScreen, fullScreen, exitFullScreen, fullScreenRef] = useFullScreen()

    return <div className={`${style.show} ${isFullScreen ? 'fullScreen' : ''}`} ref={fullScreenRef}>
        {!isFullScreen && <Button className='btn' onClick={fullScreen}>预览</Button>}
        {/* {isFullScreen && <Button className='btn' onClick={exitFullScreen}>t</Button>} */}
        <div className={style.show_header}>
            {/* <Decoration8 style={{ width: '25%', height: '70px' }} /> */}
            {/* <Decoration5 style={{ width: '40%', height: '100px' }} /> */}
            {/* <Decoration8 reverse={true} style={{ width: '25%', height: '70px' }} /> */}
            <div className={style.show_header_title}>物联网数据统计平台</div>
        </div>
        {/* <Decoration10 style={{ width: '100%', height: '3px' }} /> */}
        <div className={style.show_content}>
            <div className={style.item1}>
                {/* <BorderBox3>
                    {map(list, (e, i) => {
                        if (i < 3) return <>
                            <Droppable id={e.id} className='droppable droppable1'>
                                {map(e.children, (v) => {

                                    return <Draggable key={v.id} id={v.id}>
                                        <div className={style.title}>
                                            {v.title}
                                        </div>
                                        {v.node || v.title}
                                    </Draggable>
                                })}
                            </Droppable>
                        </>
                    })}
                </BorderBox3> */}
            </div>
            <div className={style.item2}>
                {map(list, (e, i) => {
                    if (i >= 3 && i < 5) return <Droppable id={e.id} className='droppable droppable2'>
                        {e.BorderNode(
                            map(e.children, (v) => {
                                return <Draggable key={v.id} id={v.id}>
                                    <div className={style.title}>
                                        {v.title}
                                    </div>
                                    {v.node || v.title}
                                </Draggable>
                            })
                        )}
                    </Droppable>
                })}
            </div>
            <div className={style.item3}>
                {map(list, (e, i) => {
                    if (i > 5) return <Droppable id={e.id} className='droppable droppable2'>
                        {e.BorderNode(
                            map(e.children, (v) => {
                                return <Draggable key={v.id} id={v.id}>
                                    <div className={style.title}>
                                        {v.title}
                                    </div>
                                    {v.node || v.title}
                                </Draggable>
                            })
                        )}
                    </Droppable>
                })}
            </div>
        </div>
    </div>
}



export default DataView
