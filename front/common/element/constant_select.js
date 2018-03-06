import React from 'react';


//import mainStore from '../../pattern/stores/main_store'

import { Select, Button } from 'antd';
const Option = Select.Option;

class ConstantSelect extends React.Component {
    constructor(props) {
        super(props);
        this.select = this.select.bind(this)

    }
    select(value) {
        this.props.data.onChange(value)
    }
    componentWillReceiveProps(nextProps) {

	}
    componentWillMount() {
        
    }
    render() {
        const { value, list } = this.props.data

        return (
        <div className="ext-search">
            <Select
                mode="combobox"
                allowClear={true}
                value={value}
                notFoundContent=""
                showArrow={false}
                filterOption={false}
                onSelect={(value) => this.select(value)}>
                    {list.map(elem => <Option key={elem.id} value={elem.name}>{elem.name}</Option>)}
             
            </Select>
        </div>
        );
    }
}

export default ConstantSelect


