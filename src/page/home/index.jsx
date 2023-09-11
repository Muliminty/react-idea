import { useEffect, useState, useRef } from 'react'

import style from './style.module.scss'
import Animation from '../../components/Animation/index'
import Loading from '../../components/Loading/index'
import { useNavigate } from 'react-router-dom'

import router from '../../router/index'


function Home() {
    const AnimationRef = useRef(null);
    const AnimationLiRef = useRef(null);
    const [skillList, setSkillList] = useState([]);

    const skillListApproach = async () => {
        const arr = ['Vite', 'React', 'Antd', 'Redux', 'React-Router', 'Sass CSS Modules', 'Ant Design Charts'];
        const tempList = [];

        for (let i = 0; i < arr.length; i++) {
            const e = arr[i];
            await new Promise((resolve) => setTimeout(resolve, i * 10));

            tempList.push(e);
            setSkillList([...new Set(tempList)]);
        }
    };

    useEffect(() => {
        skillListApproach();
    }, []);

    return (
        <div ref={AnimationRef}>
            <div className={style.Home}>
                <Loading />
                <h1>Muliminty Admin</h1>
                <ul>
                    <p>技术栈</p>
                    {skillList.map((e) => (
                        <Animation ref={AnimationLiRef} type='fadeInRight' key={e}>
                            <li>{e}</li>
                        </Animation>
                    ))}
                </ul>
                <p>中后台项目常见功能demo项目</p>
                <ButtonBox />
            </div>
        </div>
    );
}



const ButtonBox = () => {
    const AnimationLiRef = useRef(null);
    const { routes } = router
    const convertToButtonConfig = (routes) => {
        return routes.map((route) => ({
            text: route.title ? route.title : route.path === "/" ? "主页" : route.path.slice(1),
            route: route.path,
        }));
    };
    const buttonConfig = convertToButtonConfig(routes);
    let navigate = useNavigate();
    const handleButtonClick = (route) => {
        navigate(route);
    };
    return (
        <div className={style.buttonBox}>
            {buttonConfig.map((button, i) => (
                <>
                    <Animation ref={AnimationLiRef} type='flipInY' key={i}>
                        <button key={button.route} onClick={() => handleButtonClick(button.route)}>
                            {button.text}
                        </button>
                    </Animation>

                    <br />

                </>
            ))}
        </div>
    );
};

export default Home
