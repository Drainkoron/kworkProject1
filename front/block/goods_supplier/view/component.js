import React from 'react';
import { observer, inject } from 'mobx-react';
import moment from 'moment'
import { Modal, Form } from 'antd';


@inject("goodsSupplierStore") @observer
class ModalView extends React.Component {
	constructor(props) {
        super(props);
        this.self = this.self.bind(this)
    }
    self(name, params) {
		this.props.goodsSupplierStore.view[name](params)
    }
	componentWillMount() {
		
	}
	render() {
        const { scheme, form } = this.props.goodsSupplierStore.view
   
		return (
			<Modal
                title="Форма поставщика товара"
                visible={form.view}
                width={550}
                footer={null}
                onCancel={() => this.self('cancelForm')}>
                <Form className="view-form">
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
                                                    'Number': scheme[key].elem.value
                                                }[scheme[key].options.type]}
                                            </div>
                                        </div>
                            }
                        })}
                    </div>
                </Form>
            </Modal>
		)
	}
}

export default ModalView











