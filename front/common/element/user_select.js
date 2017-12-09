import React from 'react';

import getUserListReq from '../../pattern/requests/get_user_list'
import mainStore from '../../pattern/stores/main_store'

import { Select, Button, message } from 'antd';
const Option = Select.Option;

message.config({
    top: 150,
    duration: 1,
});

var mount = false

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
        getUserListReq().then(data => {
			if(data.success) {
                if(mount) {
                    this.setState({list: data.body})
                }
            } else {
                message.error('Ошибка получения списка менеджеров!')
            }
		}, error => {
			message.error('Ошибка получения списка менеджеров!')
		})
    }
    componentWillReceiveProps(nextProps) {

	}
    componentWillMount() {
        mount = true
        this.getList()
    }
    componentWillUnmount() {
        mount = false
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
                    {list.map(elem => <Option key={elem.id} value={elem.username}>{elem.username}</Option>)}
             
            </Select>
        </div>
        );
    }
}

export default UserSelect