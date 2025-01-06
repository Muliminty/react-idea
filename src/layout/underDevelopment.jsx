// underDevelopment
import { Outlet } from 'react-router-dom';

const UnderDevelopment = () => {
    return <>
        <h2>开发中</h2>
        <Outlet />
    </>;
};

export default UnderDevelopment;