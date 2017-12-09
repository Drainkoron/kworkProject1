import React from 'react';

import getUserListReq from '../../pattern/requests/get_user_list'
import mainStore from '../../pattern/stores/main_store'

import { Select, Button } from 'antd';
const Option = Select.Option;

class TranslateSelect extends React.Component {
    constructor(props) {
        super(props);
        this.select = this.select.bind(this)
        this.getName = this.getName.bind(this)
    }
    select(value) {
        this.props.data.onChange(value)
    }
    getName(value) {
        return this.props.data.list.filter(elem => elem.server == value)[0].name
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
                size="large"
                mode="combobox"
                allowClear={true}
                value={this.getName(value)}
                notFoundContent=""
                showArrow={false}
                filterOption={false}
                style={{ width: 280 }}
                onSelect={(value) => this.select(value)}>
                    {list.map((elem, key) => <Option key={key} value={elem.server}>{elem.name}</Option>)}
            </Select>
        </div>
        );
    }
}

export default TranslateSelect


