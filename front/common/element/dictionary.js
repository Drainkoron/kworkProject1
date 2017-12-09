import React from 'react';

import { getDictionaryList, creatDictionaryElem } from './request_element'

import { Select, Button, message } from 'antd';
const Option = Select.Option;

message.config({
    top: 150,
    duration: 1,
});

var mount = false

class Dictionary extends React.Component {
    constructor(props) {
        super(props);
        this.select = this.select.bind(this)
        this.search = this.search.bind(this)
        this.add = this.add.bind(this)

        this.state = {
            button: false,
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
    add() {
        var requestsObject = {
            group: this.props.data.group,
            name: this.props.data.value
        }
        creatDictionaryElem(requestsObject).then(data => {
			if(data.success) {
                this.setState({list: [],
                                button: false})
            } else {
                message.error('Ошибка сохранения елемента справочника!')
            }
		}, error => {
			message.error('Ошибка сохранения елемента справочника!')
		})
    }
    getList(data) {
        var requestsObject = {
            group: data.group || this.props.data.group,
            search_name: data.value
        }
        
        getDictionaryList(requestsObject).then(data => {
			if(data.success) {
                this.setResult(data.body)
            } else {
                message.error('Ошибка получения справочника!')
            }
		}, error => {
			message.error('Ошибка получения справочника!')
		})
    }
    setResult(data) {
        if(mount) {
            if(data.length == 0 && this.props.data.value != '') {
                this.setState({list: [],
                                button: true})
            } else {
                this.setState({list: data,
                                button: false})
            }
        }
    }
    componentWillReceiveProps(nextProps) {
		if(this.props.data.group != nextProps.data.group) {
			this.getList(nextProps.data)
		}
	}
    componentWillMount() {
        mount = true
        this.getList(this.props.data)
    }
    componentWillUnmount() {
        mount = false
    }
    render() {
        const { button, list } = this.state

        return (
        <div className="ext-search">
            <Select
                size="large"
                mode="combobox"
                value={this.props.data.value}
                placeholder=""
                notFoundContent=""
                style={{ width: 240 }}
                defaultActiveFirstOption={false}
                showArrow={false}
                filterOption={false}
                onSelect={(value) => this.select(value)}
                onSearch={(value) => this.search(value)}>
                    {list.map(elem => <Option key={elem.id} value={elem.name}>{elem.name}</Option>)}
             
            </Select>
            {button ? <Button onClick={this.add}
                                shape="circle" 
                                size="large" 
                                icon="plus" /> : null}
            
        </div>
        );
    }
}

export default Dictionary