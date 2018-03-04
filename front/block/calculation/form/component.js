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
        this.state = {
            idForm: null
        }
    }
    self(name, params) {
		this.props.calculationStore.form[name](params)
    }
    setModelValue(name, value) {
        this.props.calculationStore.form.setModelValue(name, value)
    }
	componentWillMount() {
		
    }
    componentWillUnmount() {
        
    }
	render() {
        const { scheme, form, model, country } = this.props.calculationStore.form

        console.log(scheme.headerCol)

		return (
			<Modal
                title="Форма просчёта"
                visible={form.view}
                width={1050}
                footer={
                    <div>
                        { model.id ? <Button type="danger" style={{float: 'left'}} 
                                        onClick={() => this.self('deleteForm')}>Удалить</Button> : null }
                        { model.id ? <Button style={{float: 'left'}} 
                                        onClick={() => this.self('copyForm')}>Сохранить копию</Button> : null }
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
                            {country != 'Россия' ? [...Array(3)].map((num, column) => {
                                return <Col span={8} key={column}>
                                    {scheme.headerCol[column].name != 'main' ? <div style={{textAlign: 'center', marginBottom: '20px'}}>
                                        <Button onClick={() => this.self('calcForm', scheme.headerCol[column].name)} 
                                                type="primary">{scheme.headerCol[column].text}</Button>
                                    </div> : <div style={{height: '52px'}}></div>}
                                    {Object.keys(scheme).map(key => {
                                        if(key != 'store' && key != 'headerCol' && key != 'note' && key != 'name' && scheme[key].options.col == column && scheme[key].options.type != 'addon') {
                                            return <FormElem key={key} 
                                                                data={scheme[key]} 
                                                                layout={formItemLayout} 
                                                                scheme={scheme}/>
                                        }
                                    })}
                                </Col>}) : [...Array(4)].map((num, column) => {
                                    if(column == 0 || column == 3 ) {
                                        return <Col span={12} key={column}>
                                            {scheme.headerCol[column].name != 'main' ? <div style={{textAlign: 'center', marginBottom: '20px'}}>
                                                <Button onClick={() => this.self('calcForm', scheme.headerCol[column].name)} 
                                                        type="primary">{scheme.headerCol[column].text}</Button>
                                            </div> : <div style={{height: '52px'}}></div>}
                                            {Object.keys(scheme).map(key => {
                                                if(key != 'store' && key != 'headerCol' && key != 'note' && key != 'name' && key != 'course' && scheme[key].options.col == column && scheme[key].options.type != 'addon') {
                                                    return <FormElem key={key} 
                                                                        data={scheme[key]} 
                                                                        layout={formItemLayout} 
                                                                        scheme={scheme}/>
                                                }
                                            })}
                                    </Col>}})}
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