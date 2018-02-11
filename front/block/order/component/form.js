import React from 'react';
import { observer, inject } from 'mobx-react';

import { Form, 
            Icon, 
            Input,
            Modal,
            Radio,
            Alert,
            DatePicker,
            Checkbox,
            Row,
            Col,
            InputNumber } from 'antd';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

import Dictionary from '../../../common/element/dictionary'
import UserSelect from '../../../common/element/user_select'
import ConstantSelect from '../../../common/element/constant_select'

const formItemLayout = {
    labelCol: {
        sm: { span: 8 }
    },
    wrapperCol: {
        sm: { span: 14 }
    },
};


@inject("orderStore") @observer
class ModalForm extends React.Component {
	constructor(props) {
        super(props);
        this.self = this.self.bind(this)
    }
    self(name, params) {
		this.props.orderStore[name](params)
    }
    setModelValue(name, value) {
        this.props.orderStore.setModelValue(name, value)
    }
	componentWillMount() {
		
	}
	render() {
        const { scheme, form, model } = this.props.orderStore
        
		return (
			<Modal
                title="Форма клиента"
                visible={form.view}
                okText="Сохранить"
                width={1000}
                onOk={() => this.self('validateForm')}
                onCancel={() => this.self('cancelForm')}>
                    <Form className="custom-modal-form">
                        <Row type="flex" justify="space-around">
                            {[...Array(2)].map((num, column) => {
                                return <Col span={12} key={column}>
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
                        </Row>
                        <Alert message={form.error} 
                                type="warning"
                                showIcon
                                style={form.error != false ? {display: 'block'} : {display: 'none'}} />
                    </Form>
            </Modal>
		)
	}
}

export default ModalForm


// {modalScheme != '' ? [...Array(scheme.order_scheme.main_form.settings.column)].map((num, column) => {
//     return <Col span={12} key={column}>
//                 {Object.keys(modalScheme).map((item, index) => {
//                     if(modalScheme[item].options.column == column) {
//                         return <FormElement key={index} data={modalScheme[item]}/>
//                     }
//                 })}
//             </Col>
// }) : ''}


// <Form.Item label="Компания" {...formItemLayout}>
// <SearchCompany data={{
//     value: model.company,
//     setValue: (value) => this.setModelValue('company', value),
//     setSelect: (id, value) => this.setSelect('company', id, value)
// }}/>
// </Form.Item>


// <Form.Item label="Справоник" {...formItemLayout}>
// <Dictionary data={{group: 3,
//                     value: model.source,
//                     setValue: (value) => this.setModelValue('source', value)}}/>
// </Form.Item>
