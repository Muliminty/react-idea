import { useEffect, useState, useRef } from 'react'

import style from './style.module.scss'
import Animation from '../../components/Animation/index'
import Loading from '../../components/Loading/index'
import { useNavigate } from 'react-router-dom'


function Home() {

    let AnimationRef = useRef(null)
    let AnimationLiRef = useRef(null)

    let navigate = useNavigate();

    const [skillList, setSkillList] = useState(['Vite']);

    const skillListApproach = () => {
        let arr = ['Vite', 'React', 'Antd', 'Redux', 'React-Router', 'Sass CSS Modules', 'Ant Design Charts']
        arr.forEach((e, i) => {
            setTimeout(() => {
                skillList.push(e)
                setSkillList([...new Set(skillList)])
            }, i * 200)
        })
    }
    useEffect(() => {
        skillListApproach()
    }, [])

    return <div ref={AnimationRef}>

        <div className={style.Home}>
            <Loading />

            <h1>Muliminty Admin</h1>

            <ul>
                <p>技术栈</p>
                {skillList.map((e) => {
                    return <Animation ref={AnimationLiRef} type='fadeInRight' key={`${e}`} >
                        <li >{e}</li>
                    </Animation>
                })}
            </ul>

            <p>中后台项目常见功能demo项目</p>

            <div className={style.buttonBox}>
                <button onClick={() => {
                    navigate("/baiduMap");
                }}>百度地图</button>

                <button onClick={() => {
                    navigate("/TableDemo");
                }}>TableDemo</button>

                <button onClick={() => {
                    navigate("/EchartDemo");
                }}>EchartDemo</button>

                <button onClick={() => {
                    navigate("/DragDemo");
                }}>拖拽demo</button>

                <button onClick={() => {
                    navigate("/DataView");
                }}>数据大屏</button>
            </div>

        </div>

    </div >
}

export default Home
