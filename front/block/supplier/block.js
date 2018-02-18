import React from 'react';
import { observer, inject } from 'mobx-react';

import { Input,
            Button } from 'antd';

const Search = Input.Search

import ModalForm from './form/component'
import List from './list/component'

@inject("supplierStore") @observer
class SupplierBlock extends React.Component {
	constructor(props) {
        super(props);
    }
	componentWillMount() {
        
	}
	render() {
        const { requestObject } = this.props.supplierStore.list

		return (
            <div>
                <ModalForm />
                <Search onChange={event => this.props.supplierStore.list.onChangeFullSearch(event)}
                        value={requestObject.fullSearch}
                        placeholder="Поиск по поставщикам"
                        style={{ width: 250 }}
                        onSearch={value => this.props.supplierStore.list.changeFullSearch(value)}/> 
                <Button style={{ float: 'right' }} 
                        onClick={() => this.props.supplierStore.form.newForm()}
                        type="primary">Добавить поставщика</Button>
                <List />
            </div>
		)
	}
}

export default SupplierBlock