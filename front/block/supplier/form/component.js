import React from 'react';
import { observer, inject } from 'mobx-react';

import { Form, 
            Modal,
            Alert,
            Row,
            Col } from 'antd';

import FormElem from '../../../common/element/form_elem'


@inject("supplierStore") @observer
class ModalForm extends React.Component {
	constructor(props) {
        super(props);
        this.self = this.self.bind(this)
    }
    self(name, params) {
		this.props.supplierStore.form[name](params)
    }
    setModelValue(name, value) {
        this.props.supplierStore.form.setModelValue(name, value)
    }
	componentWillMount() {
		
	}
	render() {
        const { scheme, form } = this.props.supplierStore.form
   
		return (
			<Modal
                title="Форма поставщика"
                visible={form.view}
                okText="Сохранить"
                width={850}
                onOk={() => this.self('validateForm')}
                onCancel={() => this.self('cancelForm')}>
                    <Form className="custom-modal-form">
                        <Row type="flex" justify="space-around">
                            {[...Array(2)].map((num, column) => {
                                return <Col span={12} key={column}>
                                    {Object.keys(scheme).map(key => {
                                        if(key != 'store' && scheme[key].options.col == column) {
                                            return <FormElem key={key} data={scheme[key]} />
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