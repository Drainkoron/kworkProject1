import React from 'react';
import { observer, inject } from 'mobx-react';
import moment from 'moment'

import { Form, 
            Icon, 
            Button } from 'antd';

import PicturesWall from '../../../common/element/pictures_wall'
import Dictionary from '../../../common/element/dictionary'


@inject("staffStore") @observer
class ViewForm extends React.Component {
	constructor(props) {
        super(props);
        this.self = this.self.bind(this)
    }
    self(name, params) {
		this.props.staffStore[name](params)
    }
	componentWillMount() {
		
	}
	render() {
        const { scheme, form, model } = this.props.staffStore
        
		return (
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
                
                <div className="view-form-function">
                    <Button htmlType="submit" onClick={() => this.self('changeStatus', 'Архив')}>В архив</Button>  
                    <Button type="primary" htmlType="submit" onClick={elem => this.self('viewModal')}>Редактировать</Button>
                </div>
            </Form>
		)
	}
}

export default ViewForm

// <PicturesWall data={{object: 'staff',
// id: model.id}}/>