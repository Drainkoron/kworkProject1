import React from 'react';
import { observer, inject } from 'mobx-react';

import { Form, 
            Modal,
            Alert,
            Row,
            Col,
            Button } from 'antd';

import FormElem from '../../../common/element/form_elem'

const formItemLayout = {
    labelCol: {
        sm: { span: 12 }
    },
    wrapperCol: {
        sm: { span: 12 }
    },
}

const formItemLayoutHeader = {
    labelCol: {
        sm: { span: 6 }
    },
    wrapperCol: {
        sm: { span: 16 }
    },
}


@inject("calculationStore") @observer
class ModalForm extends React.Component {
	constructor(props) {
        super(props);
        this.self = this.self.bind(this)
    }
    self(name, params) {
		this.props.calculationStore.form[name](params)
    }
    setModelValue(name, value) {
        this.props.calculationStore.form.setModelValue(name, value)
    }
	componentWillMount() {
		
	}
	render() {
        const { scheme, form, model } = this.props.calculationStore.form
   
		return (
			<Modal
                title="Форма просчёта"
                visible={form.view}
                width={1050}
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
                        <Row>
                            <Col span={12}>
                                <FormElem data={scheme['name']} layout={formItemLayoutHeader}/>
                            </Col>
                            <Col span={12}>
                                <FormElem data={scheme['note']} layout={formItemLayoutHeader}/>
                            </Col>
                        </Row>
                        <Row type="flex" justify="space-around">
                            {[...Array(3)].map((num, column) => {
                                return <Col span={8} key={column}>
                                    <h4 style={{textAlign: 'center', marginBottom: '20px'}}>{scheme.headerCol[column]}</h4>
                                    {Object.keys(scheme).map(key => {
                                        if(key != 'store' && key != 'headerCol' && key != 'note' && key != 'name' && scheme[key].options.col == column && scheme[key].options.type != 'addon') {
                                            return <FormElem key={key} 
                                                                data={scheme[key]} 
                                                                layout={formItemLayout} 
                                                                scheme={scheme}/>
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