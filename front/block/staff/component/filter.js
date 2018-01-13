import React from 'react';
import { observer, inject } from 'mobx-react';

import { Position } from '../dictionary'

import { Row, 
            Col, 
            Menu, 
            Icon, 
            Input } from 'antd';
            
const MenuItemGroup = Menu.ItemGroup

@inject("staffStore") @observer
class Filter extends React.Component {
	constructor(props) {
        super(props);
        this.self = this.self.bind(this)
    }
    self(name, params) {
		this.props.staffStore[name](params)
	}
	componentWillMount() {
		
	}
	render() {
        const { requestObject } = this.props.staffStore
		return (
			<div style={{marginTop: '20px', marginBottom: '30px'}}>
                <Menu
                    onClick={event => this.self('changeFilterType', event.key)}
                    defaultSelectedKeys={['all']}
                    selectedKeys={[requestObject.filter_field.position]}
                    mode="horizontal">
                        <Menu.Item key="all">
                            <span>Все</span> 
                        </Menu.Item>
                        {Object.keys(Position).map((key, index) => {
                            return <Menu.Item key={Position[key][0]}>
                                        <span>{Position[key][1]}</span> 
                                    </Menu.Item>
                        })}
                        
                    
                </Menu>
            </div>
		)
	}
}

export default Filter;