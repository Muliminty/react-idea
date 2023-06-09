
import { useEffect, useRef } from 'react';
const { BMapGL } = window
import PropTypes from 'prop-types'


function Map(props) {
    let map = useRef({})
    useEffect(() => {
        // 创建地图实例
        map.current = new BMapGL.Map("map")

        // 绑定示例到父组件ref
        props.mapref.current = map.current

        // 绑定点击事件
        map.current.addEventListener('click', function (e) {
            props.onClick(e)
        });


    }, [])



    return <div id="map"  {...props}> </div>
}


Map.propTypes = {
    onClick: PropTypes.func,
    mapref: PropTypes.object,

}

export default Map


