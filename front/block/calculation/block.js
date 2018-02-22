import React from 'react';
import { observer, inject } from 'mobx-react';

import { Input,
            Button } from 'antd';

const Search = Input.Search

import ModalForm from './form/component'
import List from './list/component'

@inject("calculationStore") @observer
class CalculationBlock extends React.Component {
	constructor(props) {
        super(props);
    }
	componentWillMount() {
        this.props.calculationStore.list.setIdGoodsSupplier(this.props.id)
        this.props.calculationStore.form.setIdGoodsSupplier(this.props.id)
	}
	render() {
		return (
            <div>
                <ModalForm />
                <div style={{height: '40px'}}>
                    <Button style={{ float: 'right' }} 
                            onClick={() => this.props.calculationStore.form.newForm()}
                            type="primary">Добавить просчёт</Button>
                </div>
                <List />
            </div>
		)
	}
}

export default CalculationBlock