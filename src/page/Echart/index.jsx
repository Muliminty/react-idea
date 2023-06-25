import style from './style.module.scss'
// import MyLine from './Line'
// import DemoFlowchart from './DemoFlowchart'
// import DemoConversionDagreGraph from './DemoConversionDagreGraph'
import DemoDecompositionTreeGraph from './DemoDecompositionTreeGraph'
import DemoPie from './DemoPie'
import { Card, Col, Row } from 'antd';




function EchartDemo() {
    return <div className={style.EchartDemo}>


        <Row gutter={[16, { xs: 8, sm: 16, md: 24, lg: 32 }]}>
            <Col span={6}>
                <Card size='small' title="DemoPie" bordered={false}>
                    <DemoPie />
                </Card>
            </Col>
            <Col span={8}>
                <Card size='small' title="Line" bordered={false}>
                    {/* <MyLine /> */}
                </Card>
            </Col>

            <Col span={8}>
                <Card size='small' title="DemoDecompositionTreeGraph" bordered={false}>
                    <DemoDecompositionTreeGraph />
                </Card>
            </Col>
        </Row>


    </div >
}



export default EchartDemo


