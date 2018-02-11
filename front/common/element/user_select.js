import React from 'react';

import { userList } from './request_element'

import { Select, Button, message } from 'antd';
const Option = Select.Option;

import { MessageConfig } from '../../app_constants'
message.config(MessageConfig)


class UserSelect extends React.Component {
    constructor(props) {
        super(props);
        this.select = this.select.bind(this)

        this.state = {
            list: []
        }
    }
    select(value) {
        this.props.data.onChange(value)
    }
    getList() {
        userList().then(data => {
            this.setState({list: data})
		}, error => {
			message.error('Ошибка получения списка пользователей!')
		})
    }
    componentWillReceiveProps(nextProps) {

	}
    componentWillMount() {
        this.getList()
    }
    componentWillUnmount() {
       
    }
    render() {
        const { list } = this.state

        return (
        <div className="ext-search">
            <Select
                size="large"
                mode="combobox"
                allowClear={true}
                value={this.props.data.value}
                notFoundContent=""
                showArrow={false}
                filterOption={false}
                style={{ width: 280 }}
                onSelect={(value) => this.select(value)}>
                    {list.map(elem => <Option key={elem.id} value={elem.doc.login}>{elem.doc.login}</Option>)}
             
            </Select>
        </div>
        );
    }
}

export default UserSelect