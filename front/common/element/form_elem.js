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
import ConstantSelect from './constant_select'
import SelectTags from './select_tags'

const formItemLayout = {
    labelCol: {
        sm: { span: 8 }
    },
    wrapperCol: {
        sm: { span: 16 }
    },
}

//layout

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
        const { data, layout } = this.props

        return (
            <Form.Item label={data.options.name} {...layout || formItemLayout}> 
                {{'Input': <Input {...data.elem}/>,
                    'Date': <DatePicker {...data.elem}/>,
                    'Checked': <Checkbox {...data.elem}/>,
                    'Dictionary': <Dictionary data={data.elem}/>,
                    'Number': <InputNumber {...data.elem}/>,
                    'Textarea': <TextArea {...data.elem}/>,
                    'Select': <ConstantSelect data={data.elem}/>,
                    'SelectTag': <SelectTags data={data.elem}/>,
                }[data.options.type]}
            </Form.Item>
        );
    }
}

export default FormElem


