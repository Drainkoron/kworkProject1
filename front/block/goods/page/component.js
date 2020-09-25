import React from 'react';
import { observer, inject } from 'mobx-react';
import moment from 'moment'

import { Tabs,
            Card,
            Row,
            Col,
            Button,
            Form,
            Input,
            Alert } from 'antd';


const TabPane = Tabs.TabPane;
            

const formItemLayout = {
    labelCol: {
        sm: { span: 8 }
    },
    wrapperCol: {
        sm: { span: 14 }
    },
}

import FormElem from '../../../common/element/form_elem'
import PicturesWall from '../../../common/element/pictures_wall'
import Avatar from '../../../common/element/avatar'

import GoodsSupplierBlock from '../../goods_supplier/block'


@inject("goodsStore") @observer
class Page extends React.Component {
	constructor(props) {
        super(props);
        this.self = this.self.bind(this)
        
    }
    self(name, params) {
		this.props.goodsStore.page[name](params)
    }
    componentWillReceiveProps(nextProps) {

    }
    componentWillMount() {
        if(!this.props.goodsStore.page.model.id) {
            this.props.goodsStore.page.getForm(this.props.match.params.id)
        }
    }
	render() {
        const { scheme, form, model } = this.props.goodsStore.page
        
		return (
            <div> 
                <Card style={{width: '100%'}}>
                    <h3 style={{marginBottom: '20px'}}>Форма товара</h3>
                    <Tabs type="card" >
                        <TabPane tab="О товаре" key="1">
                            <Row gutter={40} style={{marginTop: '30px'}}>
                                <Col span={12}>
                                    {
                                    Object.keys(scheme).map(key => {
                                        if(key != 'store') {
                                            return <FormElem key={key} data={scheme[key]} />
                                            /*
                                            return <Form.Item {...scheme[key].options} rules={[{ required: true }]}>
                                            <Input {...scheme[key].elem}/>
                                          </Form.Item>*/
                                        }
                                    })}
                                </Col>
                                <Col span={12}>
                                    <Avatar data={{value: model.avatar, 
                                                    change: (value) => this.self('setAvatar', value)}} />
                                    <PicturesWall data={{object: 'goods', id: model.id}}/>
                                </Col>
                            </Row>
                            <div className="page-button-panel">
                                <Button style={{float: 'left'}} 
                                        type="danger"
                                        onClick={() => this.self('deleteForm')}>Удалить</Button>
                                <Button style={{float: 'right', marginLeft: '20px'}} 
                                        onClick={() => this.self('validateForm')}
                                        type="primary">
                                        Сохранить
                                </Button>
                                <Button style={{float: 'right'}} 
                                        onClick={() => this.self('goList')}>В список</Button>
                            </div>
                            <Alert message={form.error} 
                                    type="warning"
                                    showIcon
                                    style={form.error != false ? {display: 'block', marginBottom: '30px'} : {display: 'none'}} />
                        </TabPane>
                        <TabPane tab="Поставщики" key="2">
                            <GoodsSupplierBlock/>
                        </TabPane>
                    </Tabs>
                </Card> 

            </div>
		)
	}
}

export default Page






// {column == 0 ? <Form.Item label="Заказчик" {...formItemLayout}>
//                                                 <SearchCustomer data={{
//                                                     value: model.customer,
//                                                     setValue: (value) => this.setModelValue('customer', value),
//                                                     setSelect: (elem) => this.setSelect(elem),
//                                                     reset: () => this.reset()
//                                                 }}/>
//                                             </Form.Item> : null}