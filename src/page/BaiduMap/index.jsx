
import style from './style.module.scss'
import { useEffect, useRef } from 'react';
import Map from './demo1'
const { BMapGL } = window

function BaiduMap() {

    let _map = useRef(null)


    useEffect(() => {
        init()
    }, [])

    const init = () => {
        // 创建点坐标
        const point = new BMapGL.Point(116.404449, 39.914889);
        // 初始化地图，设置中心点坐标和地图级别
        _map.current.centerAndZoom(point, 15);
        _map.current.enableScrollWheelZoom(false); //开启鼠标滚轮缩放
        // _map.current.setHeading(64.5);   //设置地图旋转角度
        // _map.current.setTilt(73);       //设置地图的倾斜角度
    }


    const click = (e) => {

        let p = {
            lng: e.latlng?.lng,
            lat: e.latlng?.lat
        }
        const point = new BMapGL.Point(p.lng, p.lat);  // 创建点坐标
        let m = new BMapGL.Marker(point)  // 创建标注   
        _map.current.addOverlay(m);   // 将标注添加到地图中
    }

    return <div className={style.BaiduMap}>
        <Map
            style={{ height: 500 }}
            mapref={_map}
            onClick={click}
        />
    </div>;
}




export default BaiduMap
