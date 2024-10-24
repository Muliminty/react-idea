
import {
    createBrowserRouter,
    // RouterProvider,
} from "react-router-dom";

import App from "../App";
import TableDemo from '../page/Table/index'
import EchartDemo from '../page/Echart/index'
import DragDemo from '../page/DragDemo/index'
// import DataView from '../page/DataView/index'
import AntdBox from '../page/antd/index'
import MdEditor from '../page/Vditor/index'
// import GenerateCode from '../page/generateCode/index'

// import BaiduMap from '../page/BaiduMap/index'

import Admin from '../page/admin/index'


const router = createBrowserRouter([
    {
        path: "/",
        element: <App />
    },
    {
        title: '小功能整理',
        path: "/Admin",
        element: <Admin />
    },
    // {
    //     title: '百度地图',
    //     path: "/baiduMap",
    //     element: <BaiduMap />
    // },
    {
        title: '表格可拖拽',
        path: "/TableDemo",
        element: <TableDemo />
    },
    {
        title: 'EchartDemo',
        path: "/EchartDemo",
        element: <EchartDemo />
    },
    {
        title: '拖拽demo',
        path: "/DragDemo",
        element: <DragDemo />
    },
    // {
    //     title: '数据大屏demo',
    //     path: "/DataView",
    //     element: <DataView />
    // },
    {
        title: 'antd',
        path: "/AntdBox",
        element: <AntdBox />
    },
    {
        title: 'markdown编辑器',
        path: "/MdEditor",
        element: <MdEditor />
    },

    // {
    //     title: '代码生成器',
    //     path: "/GenerateCode",
    //     element: <GenerateCode />
    // },
]);



export default router