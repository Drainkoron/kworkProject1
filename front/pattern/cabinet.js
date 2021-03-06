

import React, { PropTypes, Component } from 'react'
import { observer, inject } from 'mobx-react';

import {
    Route,
    Link,
    Switch,
    withRouter } from 'react-router-dom'


import { Layout, 
            Menu, 
            Breadcrumb, 
            Button,
            Icon,
            Badge,
            Dropdown,
            Tooltip } from 'antd';
            
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

/* Pattern block */
import UserBlock from './users/block'
import TableBlock from './table/block'

/* Custom block */
import GoodsBlock from '../block/goods/block'
import GoodsPage from '../block/goods/page/component'
import SupplierBlock from '../block/supplier/block'
import OptionsBlock from '../block/options/block'
import ListLog from '../block/log/block'


@inject("mainStore") @observer
class Cabinet extends Component {
	constructor(props) {
		super(props)
		this.self = this.self.bind(this);
	}
	self(name, params) {
		this.props.mainStore[name](params)
	}
	componentWillMount() {
        if(!this.props.mainStore.model.login) { 
            this.props.mainStore.history = this.props.history
            this.props.mainStore.viewUser()
        }
	}
	componentWillReceiveProps(nextProps) {

	}
	render() {
        
        const { model, history } = this.props.mainStore

		return <Layout className="layout">
                    <Sider
                        breakpoint="lg"
                        collapsedWidth="0"
                        onCollapse={(collapsed, type) => { console.log(collapsed, type) }}>
                        <div id="logo"/>
                        <Menu
                            theme="dark"
                            mode="inline"
                            selectedKeys={[history.location.pathname]}
                            style={{ lineHeight: '64px' }}
                            onClick={(event) => this.self('routing', event.key)}>
                            <Menu.Item key="/cabinet/goods/null">
                                <Icon type="appstore-o" />Товары
                            </Menu.Item>
                            <Menu.Item key="/cabinet/supplier">
                                <Icon type="global" />Поставщики
                            </Menu.Item>
                            <Menu.Item key="/cabinet/options">
                                <Icon type="setting" />Параметры
                            </Menu.Item>
                            <Menu.Item key="/cabinet/users">
                                <Icon type="team" />Пользователи
                            </Menu.Item>
                            <Menu.Item key="/cabinet/log">
                                <Icon type="hdd" />логи
                            </Menu.Item>

                            

                            
                        </Menu>
                    </Sider>
                    <Layout>
                        <Header style={{ background: '#fff', padding: 0 }}>
                            <Menu
                                mode="horizontal"
                                selectedKeys={[history.location.pathname]}
                                style={{ lineHeight: '64px' }}
                                onClick={(event) => this.self('routing', event.key)}>
                                <Menu.Item key="logout" style={{ float: 'right' }}>
                                    <Icon type="logout" />Выход
                                </Menu.Item>
                                <Menu.Item key="user" style={{ float: 'right' }}>
                                    <Icon type="user" />{model.login}
                                </Menu.Item>
                            </Menu>
                        </Header>
                        <Content style={{ margin: '24px 16px 0' }}>
                            <div style={{ background: '#fff', padding: 24, minHeight: 360 }}> 
                                <Switch>
                                    <Route path='/cabinet/users' component={UserBlock}/> 
                                    <Route path='/cabinet/table' component={TableBlock}/> 
                                    <Route path='/cabinet/goods/:keys' component={GoodsBlock}/>
                                    <Route path='/cabinet/goods-page/:id' component={GoodsPage}/>
                                    <Route path='/cabinet/supplier' component={SupplierBlock}/>
                                    <Route path='/cabinet/options' component={OptionsBlock}/>
                                    <Route path='/cabinet/log' component={ListLog}/>
                                </Switch>
                            </div>
                        </Content>
                        <Footer onDoubleClick={() => this.self('routing', '/cabinet/table')} style={{ textAlign: 'center' }}>
                            DevBase
                        </Footer>
                    </Layout>
                </Layout>
	}
}

export default withRouter(Cabinet)


// <Route path='/cabinet/order' component={OrderBlock}/>
// <Route path='/cabinet/goods-page/:id' component={GoodsPage}/>