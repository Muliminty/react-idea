/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { useState, useEffect, useImperativeHandle, forwardRef, useCallback } from 'react'
import style from './style.module.scss'

import '../../assets/scss/animation/fadeInRight.scss'
import '../../assets/scss/animation/flipInY.scss'

// eslint-disable-next-line react/display-name
export default forwardRef((props, ref) => {


    const { type = 'flipInY', time } = props
    const [value, setValue] = useState(type);

    useEffect(() => {
        start(time)
    }, [time])



    const start = () => {
        setValue('');
        setValue(type)
    }
    const end = () => setValue('')

    useImperativeHandle(ref, () => {
        return {
            start,
            end,
        }
    })


    return (
        <div ref={ref} className={`${style.Animation} ${value} animated `}>
            {props.children}
        </div >
    )
})
