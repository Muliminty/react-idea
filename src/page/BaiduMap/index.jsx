
import style from './style.module.scss'
import { Map, MapvglView, MapvglLayer, InfoWindow } from 'react-bmapgl';
import Example from './demo1'
const { BMapGL } = window

function BaiduMap() {



    return <div className={style.BaiduMap}>
        {/* <Map
            style={{ height: 450 }}
            center={new BMapGL.Point(116.404449, 39.914889)}
            zoom={12}
            heading={0}
            tilt={40}
            onClick={e => console.log(e)}
            enableScrollWheelZoom
        /> */}

        <Example onClick={(map, e) => {
            console.log('点击的经纬度：' + e.latlng.lng + ', ' + e.latlng.lat);
            let p = {
                lng: e.latlng.lng,
                lat: e.latlng.lat
            }
            const point = new BMapGL.Point(p.lng, p.lat);

            let m = new BMapGL.Marker(point)
            map.addOverlay(m);

        }} />
    </div>;
}




export default BaiduMap
