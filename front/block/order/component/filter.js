import React from 'react';
import { observer, inject } from 'mobx-react';

import { StatusForm } from '../dictionary'

import { Row, 
            Col, 
            Menu, 
            Icon, 
            Input } from 'antd';
            
const MenuItemGroup = Menu.ItemGroup

@inject("orderStore") @observer
class Filter extends React.Component {
	constructor(props) {
        super(props);
        this.self = this.self.bind(this)
    }
    self(name, params) {
		this.props.orderStore[name](params)
	}
	componentWillMount() {
		
	}
	render() {
        const { requestObject } = this.props.orderStore
		return (
			<div style={{marginTop: '20px', marginBottom: '30px'}}>
                <Menu
                    onClick={event => this.self('changeFilterType', event.key)}
                    defaultSelectedKeys={['all']}
                    selectedKeys={[requestObject.filterField.status]}
                    mode="horizontal">
                        <Menu.Item key="all">
                            <span>Все</span> 
                        </Menu.Item>
                        {Object.keys(StatusForm).map((key, index) => {
                            return <Menu.Item key={StatusForm[key][0]}>
                                        <span>{StatusForm[key][1]}</span> 
                                    </Menu.Item>
                        })}
                </Menu>
            </div>
		)
	}
}

export default Filter;