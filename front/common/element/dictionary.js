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
            name: this.props.data.dictionary,
            value: this.props.data.value
        }
        creatDictionaryElem(requestsObject).then(data => {
            this.setState({list: [], button: false})
		}, error => {
			message.error('Ошибка сохранения елемента справочника!')
		})
    }
    getList(data) {
        var requestsObject = {
            name: this.props.data.dictionary,
            value: data.value
        }
        
        getDictionaryList(requestsObject).then(data => {
            this.setResult(data)
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

        console.log(list, 'list')

        return (
            <div className="ext-search">
                <Select
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
                        {list.map(elem => <Option key={elem.id} value={elem.doc.value}>{elem.doc.value}</Option>)}
                
                </Select>
                {button ? <Button onClick={this.add}
                                    shape="circle" 
                                    icon="plus" /> : null}
                
            </div>
        );
    }
}

export default Dictionary