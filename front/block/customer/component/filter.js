import React from 'react';
import { observer, inject } from 'mobx-react';

import { Type } from '../dictionary'

import { Row, 
            Col, 
            Menu, 
            Icon, 
            Input } from 'antd';
            
const MenuItemGroup = Menu.ItemGroup

@inject("customerStore") @observer
class Filter extends React.Component {
	constructor(props) {
        super(props);
        this.self = this.self.bind(this)
    }
    self(name, params) {
		this.props.customerStore[name](params)
	}
	componentWillMount() {
		
	}
	render() {
        const { requestObject } = this.props.customerStore
		return (
			<div style={{marginTop: '20px', marginBottom: '30px'}}>
                <Menu
                    onClick={event => this.self('changeFilterType', event.key)}
                    defaultSelectedKeys={['all']}
                    selectedKeys={[requestObject.filterField.type]}
                    mode="horizontal">
                        <Menu.Item key="all">
                            <span>Все</span> 
                        </Menu.Item>
                        {Object.keys(Type).map((key, index) => {
                            return <Menu.Item key={Type[key][0]}>
                                        <span>{Type[key][1]}</span> 
                                    </Menu.Item>
                        })}
                        
                    
                </Menu>
            </div>
		)
	}
}

export default Filter;