import React from 'react';
import { observer, inject } from 'mobx-react';
import moment from 'moment'
import G2 from 'g2'

import { Form, 
            Icon, 
            Button,
            Card,
            Row,
             } from 'antd';

import PicturesWall from '../../../common/element/pictures_wall'
import Dictionary from '../../../common/element/dictionary'


@inject("customerStore") @observer
class StaffReport extends React.Component {
	constructor(props) {
        super(props);
        this.self = this.self.bind(this)
    }
    self(name, params) {
		this.props.customerStore[name](params)
    }
    renderReportPosition(data) {
        //https://antv.alipay.com/g2/demo/04-bar/image-top-bar.html

        //https://antv.alipay.com/g2/demo/04-bar/interval-of-marked.html - legend

        var chart = new G2.Chart({
            id: 'staff-report-position',
            forceFit: true,
            height: 300,
            plotCfg: {
                margin: [40, 180, 20, 20],
            },
        });
        chart.axis('name', {
            labels: null,
            title: null,
            tickLine: null
        });
        chart.source(data, {
            name: {
                alias: 'Статусы'
            }
        });
        chart.interval().position('name*value').color('name')
        chart.render();
    }
    renderReportSource(data) {
        var Stat = G2.Stat;
        var chart = new G2.Chart({
            id: 'staff-report-source',
            forceFit: true,
            height: 300,
            plotCfg: {
                margin: [40, 40, 40, 40],
            },
        });
        chart.source(data);
        chart.coord('theta', {
            radius: 0.8 
        });

        chart.legend('name', false);
        chart.tooltip({
            title: null,
            map: {
              value: 'value'
            }
        });
        chart.intervalStack()
            .position(Stat.summary.percent('value'))
            .color('name')
            .label('name*..percent',function(name, percent){
            percent = (percent * 100).toFixed(2) + '%';
            return name + ' ' + percent;
        });
        chart.render();
    }
    componentDidMount() {
        this.props.customerStore.reportCount('position', this.renderReportPosition)
        this.props.customerStore.reportCount('source', this.renderReportSource)
    }
	render() {        
		return (
            <div className="report-page">
                <Card title="ВСЕГО РАБОТНИКОВ" style={{ marginRight: '20px', 
                                                            marginBottom: '20px', 
                                                            width: 550, 
                                                            textAlign: 'center' }}>
                    <div id="staff-report-position"></div>
                </Card>
                <Card title="ИСТОЧНИКИ ПРИВЛЕЧЕНИЯ" style={{ marginRight: '20px', 
                                                                marginBottom: '20px', 
                                                                width: 550, 
                                                                textAlign: 'center' }}>
                    <div id="staff-report-source"></div>
              </Card>
            </div>
		)
	}
}

export default StaffReport
