import React from 'react';
import { observer, inject } from 'mobx-react';

import { Form, 
            Modal,
            Alert,
            Row,
            Col,
            Button } from 'antd';

import FormElem from '../../../common/element/form_elem'


@inject("userStore") @observer
class ModalForm extends React.Component {
	constructor(props) {
        super(props);
        this.self = this.self.bind(this)
    }
    self(name, params) {
		this.props.userStore.form[name](params)
    }
	componentWillMount() {
		
	}
	render() {
        const { scheme, form, model } = this.props.userStore.form
   
		return (
			<Modal
                title="Форма пользователя"
                visible={form.view}
                width={550}
                footer={
                    <div>
                        { model.id ? <Button type="danger" style={{float: 'left'}} 
                                            onClick={() => this.self('deleteForm')}>Удалить</Button> : null }
                        <Button onClick={() => this.self('cancelForm')}>Отмена</Button>
                        <Button type="primary" onClick={() => this.self('validateForm')}>Сохранить</Button>
                    </div>
                }
                onOk={() => this.self('validateForm')}
                onCancel={() => this.self('cancelForm')}>
                    <Form className="custom-modal-form">
                        <Row type="flex" justify="space-around">
                            {[...Array(1)].map((num, column) => {
                                return <Col span={24} key={column}>
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