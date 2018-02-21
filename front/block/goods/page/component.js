import React from 'react';
import { observer, inject } from 'mobx-react';
import moment from 'moment'

import { Tabs,
            Card,
            Row,
            Col,
            Button,
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

    }
	render() {
        const { scheme, form, model } = this.props.goodsStore.page
        
		return (
            <div> 
                <Card style={{width: '100%'}}>
                    <h3>Форма товара</h3>
                    <Row gutter={40} style={{marginTop: '30px'}}>
                        {[...Array(1)].map((num, column) => {
                            return <Col span={12} key={column}>
                                {Object.keys(scheme).map(key => {
                                    if(key != 'store' && scheme[key].options.col == column) {
                                        return <FormElem key={key} data={scheme[key]} />
                                    }
                                })}
                            </Col>
                        })}
                        <Col span={12}>
                            <Avatar data={{value: model.avatar, 
                                            change: (value) => this.self('setAvatar', value)}} />
                        </Col>
                    </Row>
                    <div className="page-button-panel">
                        <Button style={{float: 'left'}} 
                                onClick={() => this.self('goList')}>В список</Button>
                        <Button style={{float: 'right', marginLeft: '20px'}} 
                                onClick={() => this.self('validateForm')}
                                type="primary">
                                Сохранить
                        </Button>
                    </div>
                    <Alert message={form.error} 
                            type="warning"
                            showIcon
                            style={form.error != false ? {display: 'block', marginBottom: '30px'} : {display: 'none'}} />

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