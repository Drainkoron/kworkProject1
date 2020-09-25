import React from 'react';
import { observer, inject } from 'mobx-react';

import { Form, 
            Icon, 
            Search,
            Button,
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
    addAddon(name, data) {
        var addon = this.props.scheme[name].elem
        switch(addon.type) {
            case 'Select':
                this.props.data.elem[addon.position] = <Select value={addon.value} 
                                                               style={{ width: addon.width }}
                                                               onChange={value => addon.onChange(value)}>
                                                            {addon.list.map((elem, index) => <Option key={index} value={elem}>{elem}</Option>)}
                                                        </Select>
                    break
            
            case 'Button':
                this.props.data.elem[addon.position] = <Button />
                break
        }
    }

    addOpenLink(data){
        //console.log(data)
        var {value, onChange} = data.elem
        const {enterButton, textError} = data.options

        return <Input.Search
            {...data.elem}
        />
    }

    addSelect(data){
        //var sel = {defaultValue:data.elem.defaultValue, onChange:data.elem.onChange, name:data.elem.name}    
        //var sel = {...data.elem}
        var {list, items, value, onChange} = data.elem
        
        if(list){
            console.log(value)
            return <Select onChange={value => onChange(value)} value={value}>
                {            
                    
                    list.map((item, index) => {
                        if(item != undefined)
                            return <Option key={index} value={item}>{item}</Option>    
                    })
                    
                }
                </Select>
        }
    }

    render() {
        const { data, layout } = this.props
        if('addon' in this.props.data.options) {
            this.addAddon(this.props.data.options.addon, data)
        }

        const inputs = {
            Input: <Input {...data.elem}/>,
            Date: <DatePicker {...data.elem}/>,
            Checked: <Checkbox {...data.elem}/>,
            Dictionary: <Dictionary data={data.elem}/>,
            Number: <InputNumber {...data.elem}/>,
            Textarea: <TextArea {...data.elem}/>,
            SelectA: this.addSelect(data),
            SelectTag: <SelectTags data={data.elem}/>,
            Button: <Button data={data.elem}/>,
            openLink: this.addOpenLink(data),
            BlockSelect: <BlockSelect data={data.elem}/>,
        }

        return (
            <Form.Item label={data.options.name} {...layout || formItemLayout}> 
                {inputs[data.options.type]}
            </Form.Item>
        );
    }
}

export default FormElem


