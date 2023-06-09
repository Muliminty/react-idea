
import { useEffect } from 'react';
const { BMapGL } = window
import PropTypes from 'prop-types'
function Example(props) {
    useEffect(() => {
        // 创建地图实例
        let map = new BMapGL.Map("map")
        // 创建点坐标
        const point = new BMapGL.Point(116.404449, 39.914889);
        // 初始化地图，设置中心点坐标和地图级别
        map.centerAndZoom(point, 15);

        map.enableScrollWheelZoom(false); //开启鼠标滚轮缩放
        map.setHeading(64.5);   //设置地图旋转角度
        map.setTilt(73);       //设置地图的倾斜角度

        let marker = new BMapGL.Marker(point);        // 创建标注   
        map.addOverlay(marker); // 将标注添加到地图中

        map.addEventListener('click', function (e) {
            // console.log('点击的经纬度：' + e.latlng.lng + ', ' + e.latlng.lat);
            // let p = {
            //     lng: e.latlng.lng,
            //     lat: e.latlng.lat
            // }
            // const point = new BMapGL.Point(p.lng, p.lat);

            // let m = new BMapGL.Marker(point)
            // map.addOverlay(m);
            props.onClick && props.onClick(map, e)
        });


    }, [])



    return <div id="map" style={{ height: 500 }} > </div>
}


Example.propTypes = {
    onClick: PropTypes.func
}

export default Example
