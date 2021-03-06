import React from 'react';
import { observer, inject } from 'mobx-react';

import { Form, 
            Modal,
            Alert,
            Row,
            Col,
            Button } from 'antd';

import FormElem from '../../../common/element/form_elem'


@inject("goodsSupplierStore") @observer
class ModalForm extends React.Component {
	constructor(props) {
        super(props);
        this.self = this.self.bind(this)
    }
    self(name, params) {
		this.props.goodsSupplierStore.form[name](params)
    }
	componentWillMount() {
		
	}
	render() {
        const { scheme, form, model } = this.props.goodsSupplierStore.form
   
		return (
			<Modal
                title="Форма поставщика товара"
                visible={form.view}
                okText="Сохранить"
                width={550}
                footer={
                    <div>
                        { model.id ? <Button type="danger" style={{float: 'left'}} 
                                            onClick={() => this.self('deleteForm')}>Удалить</Button> : null }
                        <Button onClick={() => this.self('cancelForm')}>Отмена</Button>
                        <Button type="primary" onClick={() => this.self('validateForm')}>Сохранить</Button>
                    </div>
                }
                onCancel={() => this.self('cancelForm')}>
                    <Form className="custom-modal-form">
                        {Object.keys(scheme).map(key => {
                            if(key != 'store') {
                                return <FormElem key={key} data={scheme[key]} />
                            }
                        })}
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


