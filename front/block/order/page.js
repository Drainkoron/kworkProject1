import React from 'react';
import { observer, inject } from 'mobx-react';
import moment from 'moment'

import { Table,
            Card,
            Steps, 
            Icon,
            Button,
            Form, 
            Input,
            Modal,
            Alert,
            Timeline,
            Row,
            Col,
            DatePicker,
            message,
            Checkbox,
            InputNumber,
            Tabs } from 'antd';

const Step = Steps.Step;
const TabPane = Tabs.TabPane;
            

import copyProperty from '../../common/copy_property'
import Dictionary from '../../common/element/dictionary'
import UserSelect from '../../common/element/user_select'
import ConstantSelect from '../../common/element/constant_select'




import { StatusForm } from './dictionary'

const formItemLayout = {
    labelCol: {
        sm: { span: 8 }
    },
    wrapperCol: {
        sm: { span: 14 }
    },
}

const gridStyle = {
    width: '100%',
    textAlign: 'left',
}

import SearchCustomer from '../customer/component/search'


@inject("mainStore", "orderStore") @observer
class OrderPage extends React.Component {
	constructor(props) {
        super(props);
        this.self = this.self.bind(this)
        this.setModelValue = this.setModelValue.bind(this)
        this.setSelect = this.setSelect.bind(this)
        this.reset = this.reset.bind(this)
        
    }
    self(name, params) {
		this.props.orderStore[name](params)
    }
    setModelValue(name, value) {
        this.props.orderStore.setModelValue(name, value)
    }
    setSelect(elem) {
        this.props.orderStore.setModelKey('customer', elem.id)
        copyProperty(this.props.orderStore.model, elem.json_data, ['customer', 'persone', 'address', 'phone', 'typeJob', 'costHour', 'durationHours', 'source'])
    }
    reset() {
        this.props.orderStore.setModelKey('customer', false)
    }
    componentWillReceiveProps(nextProps) {

    }
    componentWillMount() {
        if(this.props.match.params.id != 'new') {
            this.props.orderStore.getForm(this.props.match.params.id)
        }
    }
	render() {
        const { user } = this.props.mainStore
        const { model, keys, form, scheme, setModelKey, selectStaff, act, payout } = this.props.orderStore
        
		return (
            <div> 
                {user? <Card style={{width: '100%'}}>
                    <h3>Форма заявки</h3>
                    <Row style={{marginTop: '30px'}}>
                        <Steps size="small" 
                                current={{'Новая': 0, 'Исполнение': 1, 'В работе': 2, 'Расчёты': 3, 'Завершено': 4}[model.status]}>
                            {Object.keys(StatusForm).map((key, index) => {
                                return <Step key={index} title={StatusForm[key][0]} onClick={() => this.self('changeFormStatus', key)}/>
                            })}
                        </Steps>
                        {{true: <Row style={{marginTop: '30px'}}>
                                    {[...Array(2)].map((num, column) => {
                                        return <Col span={12} key={column}>
                                            {column == 0 ? <Form.Item label="Заказчик" {...formItemLayout}>
                                                <SearchCustomer data={{
                                                    value: model.customer,
                                                    setValue: (value) => this.setModelValue('customer', value),
                                                    setSelect: (elem) => this.setSelect(elem),
                                                    reset: () => this.reset()
                                                }}/>
                                            </Form.Item> : null}
                                            {Object.keys(scheme).map(key => {
                                                if(key != 'store' && scheme[key].options.col == column) {
                                                    return <Form.Item key={key} label={scheme[key].options.name} {...formItemLayout}> 
                                                                {{'Input': <Input {...scheme[key].elem}/>,
                                                                    'Date': <DatePicker {...scheme[key].elem}/>,
                                                                    'Checked': <Checkbox {...scheme[key].elem}/>,
                                                                    'Dictionary': <Dictionary data={scheme[key].elem}/>,
                                                                    'User': <UserSelect data={scheme[key].elem}/>,
                                                                    'Number': <InputNumber {...scheme[key].elem}/>,
                                                                    'Select': <ConstantSelect data={scheme[key].elem}/>
                                                                }[scheme[key].options.type]}
                                                            </Form.Item>
                                                }
                                            })}
                                        </Col>
                                    })}
                                </Row>,
                            false: <Row style={{marginTop: '30px'}}>
                                            {[...Array(2)].map((num, column) => {
                                                return <Col span={12} key={column}>
                                                    {column == 0 ? 
                                                        <div className="view-form-content-elem">
                                                            <div className="view-form-content-elem-header">Заказчик:</div>
                                                            <div className="view-form-content-elem-content">{model.customer}</div>
                                                        </div> : null}
                                                    {Object.keys(scheme).map((key, index) => {
                                                        if(key != 'store' && scheme[key].options.col == column) {
                                                            return <div key={index} className="view-form-content-elem">
                                                                        <div className="view-form-content-elem-header">{scheme[key].options.name}:</div>
                                                                        <div className="view-form-content-elem-content">
                                                                                {{'Input': scheme[key].elem.value,
                                                                                    'Date': moment.isMoment(scheme[key].elem.value) ? scheme[key].elem.value.format("DD MMMM YYYY") : '',
                                                                                    'Checked': scheme[key].elem.checked ? 'Есть' : 'Нет',
                                                                                    'Dictionary': scheme[key].elem.value,
                                                                                    'Select': scheme[key].elem.value,
                                                                                    'Number': scheme[key].elem.value,
                                                                                    'User': scheme[key].elem.value,
                                                                                }[scheme[key].options.type]}
                                                                        </div>
                                                                    </div>
                                                        }
                                                    })}
                                                </Col>
                                            })}
                                        </Row>
                                
                        }[model.status == 'Новая']}       
                    </Row>
                    <div className="page-button-panel">
                        <Button style={{float: 'left'}} 
                                onClick={() => this.self('goList')}>В список</Button>
                        {!model.id ? <Button style={{float: 'right', marginLeft: '20px'}} 
                                onClick={() => this.self('validateForm')}
                                type="primary">
                                Сохранить
                        </Button> : null}
                        {model.status == 'Новая' && model.id ? <Button style={{float: 'right', marginLeft: '20px'}} 
                                onClick={() => this.self('changeStatus', 'Исполнение')}>
                                Исполнить заказ
                        </Button> : null}
                        {model.status == 'Исполнение' ? <Button style={{float: 'right', marginLeft: '20px'}} 
                                onClick={() => this.self('changeStatus', 'В работе')}>
                                Начать работу
                        </Button> : null}
                        {model.status == 'В работе' ? <Button style={{float: 'right', marginLeft: '20px'}} 
                                onClick={() => this.self('changeStatus', 'Расчёты')}>
                                Начать расчёты
                        </Button> : null}
                        {model.status == 'Расчёты' ? <Button style={{float: 'right', marginLeft: '20px'}} 
                                onClick={() => this.self('changeStatus', 'Завершено')}>
                                Завершить
                        </Button> : null}



                        



                    </div>
                    <Alert message={form.error} 
                            type="warning"
                            showIcon
                            style={form.error != false ? {display: 'block', marginBottom: '30px'} : {display: 'none'}} />

                </Card> : false}

            </div>
		)
	}
}

export default OrderPage