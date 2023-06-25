
import {
    createBrowserRouter,
    // RouterProvider,
} from "react-router-dom";

import App from "../App";
import BaiduMap from '../page/BaiduMap/index'
import TableDemo from '../page/Table/index'
import EchartDemo from '../page/Echart/index'
import DragDemo from '../page/DragDemo/index'
import DataView from '../page/DataView/index'


const router = createBrowserRouter([
    {
        path: "/",
        element: <App />
    },
    {
        path: "/baiduMap",
        element: <BaiduMap />
    },
    {
        path: "/TableDemo",
        element: <TableDemo />
    },
    {
        path: "/EchartDemo",
        element: <EchartDemo />
    },
    {
        path: "/DragDemo",
        element: <DragDemo />
    },
    {
        path: "/DataView",
        element: <DataView />
    },
]);

export default router