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
            InputNumber,
            Select } from 'antd';

const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { TextArea } = Input;

import Dictionary from './dictionary'
import ConstantSelect from './constant_select'
import SelectTags from './select_tags'
import BlockSelect from './select_block'

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
    addAddon(name) {
        var addon = this.props.scheme[name].elem
        switch(addon.type) {
            case 'Select':
                this.props.data.elem[addon.position] = <Select value={addon.value} 
                                                               style={{ width: addon.width }}
                                                               onChange={value => addon.onChange(value)}>
                                                            {addon.list.map((elem, index) => <Option key={index} value={elem}>{elem}</Option>)}
                                                        </Select>
                    break
        }
    }
    render() {

        if('addon' in this.props.data.options) {
            this.addAddon(this.props.data.options.addon)
        }

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
                    'BlockSelect': <BlockSelect data={data.elem}/>
                }[data.options.type]}
            </Form.Item>
        );
    }
}

export default FormElem


