import style from './style.module.scss'

import DemoDecompositionTreeGraph from './DemoDecompositionTreeGraph'
import DemoPie from './DemoPie'
import { Card, Col, Row } from 'antd';


import useLineHook from '../../hook/echartsHook/useLineHook';
import usePieHook from '../../hook/echartsHook/usePieHook';
import useBarHook from '../../hook/echartsHook/useBarHook';
import ReactEcharts from 'echarts-for-react';




function EchartDemo() {
    return <div className={style.EchartDemo}>


        <Row gutter={[16, { xs: 8, sm: 16, md: 24, lg: 32 }]}>




            <Col span={24}>
                <Card size='small' title="useLineHook demo" bordered={false}>
                    <LineChart />
                </Card>
            </Col>
            <Col span={24}>
                <Card size='small' title="useLineHook demo" bordered={false}>
                    <PieChart />
                </Card>
            </Col>
            <Col span={24}>
                <Card size='small' title="useLineHook demo" bordered={false}>
                    <BarChart />
                </Card>
            </Col>

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


function LineChart() {
    const dataX = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const dataY = [10, 20, 30, 40, 50, 10, 5];
    const op = {
        title: {
            text: 'Stacked Area Chart'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            }
        },
        legend: {
            data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
    }
    const option = useLineHook({
        dataX, dataY,
        // op,
        // xAxis: [
        //     {
        //         type: 'category',
        //         boundaryGap: false,
        //         data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        //     }
        // ],
        // series: [
        //     {
        //         name: 'Email',
        //         type: 'line',
        //         stack: 'Total',
        //         areaStyle: {},
        //         emphasis: {
        //             focus: 'series'
        //         },
        //         data: [120, 132, 101, 134, 90, 230, 333]
        //     },

        //     {
        //         name: 'Search Engine',
        //         type: 'line',
        //         stack: 'Total',
        //         label: {
        //             show: true,
        //             position: 'top'
        //         },
        //         areaStyle: {},
        //         emphasis: {
        //             focus: 'series'
        //         },
        //         data: [820, 932, 901, 934, 1290, 1330, 1320]
        //     }
        // ]
    });

    return <ReactEcharts option={option} />;
}
function PieChart() {

    const data = [
        { value: 1048, name: 'Search Engine' },
        { value: 735, name: 'Direct' },
        { value: 580, name: 'Email' },
        { value: 484, name: 'Union Ads' },
        { value: 300, name: 'Video Ads' }
    ]

    const series = [
        {
            name: 'Access From',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
                borderRadius: 10,
                borderColor: '#fff',
                borderWidth: 2
            },
            label: {
                show: false,
                position: 'center'
            },
            emphasis: {
                label: {
                    show: true,
                    fontSize: 40,
                    fontWeight: 'bold'
                }
            },
            labelLine: {
                show: false
            },
            data: [
                { value: 1048, name: 'Search Engine' },
                { value: 735, name: 'Direct' },
                { value: 580, name: 'Email' },
                { value: 484, name: 'Union Ads' },
                { value: 300, name: 'Video Ads' }
            ]
        }
    ]
    const op = {
        title: {
            text: 'Referer of a Website',
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            orient: 'vertical',
            left: 'right'
        },
    };

    const option = usePieHook({
        data,
        // op, series
    });

    return <ReactEcharts option={option} />
}

function BarChart() {
    const dataX = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const dataY = [100, 200, 300, 400, 500, 100, 20];

    const series = {
        type: 'bar',
        data: [2, 1.2, 2.4, 3.6],
        coordinateSystem: 'polar',
        label: {
            show: true,
            position: 'middle',
            formatter: '{b}: {c}'
        }
    }
    const op = {
        title: [
            {
                text: 'Tangential Polar Bar Label Position (middle)'
            }
        ],
        polar: {
            radius: [30, '80%']
        },
        angleAxis: {
            max: 4,
            startAngle: 75
        },
        radiusAxis: {
            type: 'category',
            data: ['a', 'b', 'c', 'd']
        },
        tooltip: {},
    }
    const option = useBarHook({
        dataX, dataY,
        // series, op, xAxis: false, yAxis: false
    });
    return <ReactEcharts option={option} />;
}

export default EchartDemo


