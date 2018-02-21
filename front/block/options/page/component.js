import React from 'react';
import { observer, inject } from 'mobx-react';
import moment from 'moment'

import { Card,
            Button,
            Alert,
            Form } from 'antd';            

const formItemLayout = {
    labelCol: {
        sm: { span: 16 }
    },
    wrapperCol: {
        sm: { span: 8 }
    },
}

import FormElem from '../../../common/element/form_elem'

@inject("optionsStore") @observer
class Page extends React.Component {
	constructor(props) {
        super(props);
        this.self = this.self.bind(this)
        
    }
    self(name, params) {
		this.props.optionsStore.page[name](params)
    }
    componentWillReceiveProps(nextProps) {

    }
    componentWillMount() {
        this.props.optionsStore.page.getOptions()
    } 
	render() {
        const { scheme, form, model } = this.props.optionsStore.page
        
		return (
            <div> 
                <Card title="Параметры" style={{width: '400px'}}>
                    <Form className="custom-modal-form">
                        {Object.keys(scheme).map(key => {
                            if(key != 'store') {
                                return <FormElem key={key} data={scheme[key]} layout={formItemLayout}/>
                            }
                        })}
                    </Form>
                    <div style={{height: '50px'}}>
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