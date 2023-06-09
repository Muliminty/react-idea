
import {
    createBrowserRouter,
    // RouterProvider,
} from "react-router-dom";

import App from "../App";
import BaiduMap from '../page/BaiduMap/index'

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />
    },
    {
        path: "/baiduMap",
        element: <BaiduMap />
    },
]);

export default router