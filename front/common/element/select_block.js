import React from 'react';

import { getBlockSelectList } from './request_element'

import { Select, Button, message } from 'antd';
const Option = Select.Option;

message.config({
    top: 150,
    duration: 1,
});

var mount = false

class BlockSelect extends React.Component {
    constructor(props) {
        super(props);
        this.select = this.select.bind(this)
        this.search = this.search.bind(this)

        this.state = {
            value: '',
            list: []
        }
    }
    select(value) {
        this.props.data.onChange(value)
    }
    search(value) {
        this.props.data.onChange(value)
        this.getList({
            value: value
        })
    }
    getList(data) {
        var requestsObject = {
            block: this.props.data.block,
            field: this.props.data.field,
            value: data.value
        }
        getBlockSelectList(requestsObject).then(data => {
            this.setResult(data)
		}, error => {
			message.error('Ошибка получения справочника!')
		})
    }
    setResult(data) {
        if(mount) {
            if(data.length == 0 && this.props.data.value != '') {
                this.setState({list: []})
            } else {
                this.setState({list: data})
            }
        }
    }
    componentWillReceiveProps(nextProps) {
		// if(this.props.data.group != nextProps.data.group) {
		// 	this.getList(nextProps.data)
		// }
	}
    componentWillMount() {
        mount = true
        this.getList(this.props.data)
        this.setState({value: data})
    }
    componentWillUnmount() {
        mount = false
    }
    render() {
        const { value, list } = this.state
        const { field } = this.props.data

        return (
            <div className="ext-search">
                <Select
                    mode="combobox"
                    value={value}
                    placeholder=""
                    notFoundContent=""
                    style={{ width: 240 }}
                    defaultActiveFirstOption={false}
                    showArrow={false}
                    filterOption={false}
                    onSelect={(value) => this.select(value)}
                    onSearch={(value) => this.search(value)}>
                        {list.map(elem => <Option key={elem.id} value={elem.doc[field]}>{elem.doc[field]}</Option>)}
                
                </Select>
            </div>
        );
    }
}

export default BlockSelect