import { useEffect, useState, useRef } from 'react'

import style from './style.module.scss'
import Animation from '../../components/Animation/index'
import Loading from '../../components/Loading/index'



function Home() {

    let AnimationRef = useRef(null)
    let AnimationLiRef = useRef(null)

    const [skillList, setSkillList] = useState(['Vite']);

    const skillListApproach = () => {
        let arr = ['Vite', 'React', 'Antd', 'Redux', 'React-Router', 'Sass CSS Modules']
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

                }}>进入后台</button>
            </div>

        </div>

    </div >
}

export default Home
