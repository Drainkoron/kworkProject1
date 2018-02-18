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
const { TextArea } = Input;

import Dictionary from './dictionary'

const formItemLayout = {
    labelCol: {
        sm: { span: 7 }
    },
    wrapperCol: {
        sm: { span: 17 }
    },
};

@inject("supplierStore") @observer
class FormElem extends React.Component {
    constructor(props) {
        super(props);


    }
    componentWillReceiveProps(nextProps) {
        
	}
    componentWillMount() {
        
    }
    render() {
        const { data } = this.props

        return (
            <Form.Item label={data.options.name} {...formItemLayout}> 
                {{'Input': <Input {...data.elem}/>,
                    'Date': <DatePicker {...data.elem}/>,
                    'Checked': <Checkbox {...data.elem}/>,
                    'Dictionary': <Dictionary data={data.elem}/>,
                    'Number': <InputNumber {...data.elem}/>,
                    'Textarea': <TextArea {...data.elem}/>,
                }[data.options.type]}
            </Form.Item>
        );
    }
}

export default FormElem


