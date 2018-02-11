import React from 'react';
import { observer, inject } from 'mobx-react';
import moment from 'moment'

import { Form, 
            Icon, 
            Button, } from 'antd';

import PicturesWall from '../../../common/element/pictures_wall'
import Dictionary from '../../../common/element/dictionary'


@inject("orderStore") @observer
class ViewForm extends React.Component {
	constructor(props) {
        super(props);
        this.self = this.self.bind(this)
    }
    self(name, params) {
		this.props.orderStore[name](params)
    }
	componentWillMount() {
		
	}
	render() {
        const { scheme, form, model } = this.props.orderStore
        
		return (
            model.id ? <Form className="view-form">
                <div className="view-form-content">
                    {Object.keys(scheme).map((key, index) => {
                        if(key != 'store') {
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
                </div>
                <PicturesWall data={{object: 'customer',
                                        id: model.id}}/>
                <div className="view-form-function">
                    <Button type="primary" htmlType="submit" onClick={elem => this.self('viewModal')}>Редактировать</Button>
                </div>
            </Form> : null
		)
	}
}

export default ViewForm

// <div className="view-form-content-elem">
// <div className="view-form-content-elem-header">Заголовок:</div>
// <div className="view-form-content-elem-content">значение</div>
// <div className="view-form-content-elem-func">
//     <Button shape="circle" icon="search" />
// </div>
// </div>


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
// <PicturesWall data={{object: 'staff',
//                     id: model.id}}/>