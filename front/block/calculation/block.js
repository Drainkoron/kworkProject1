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
    componentWillReceiveProps(nextProps) {
        // Компоненты разные стор общий, стор обслуживает текущий компонент
        if(nextProps.current.includes(nextProps.id)) {
            this.props.calculationStore.list.setIdGoodsSupplier(nextProps.id)
            this.props.calculationStore.form.setIdGoodsSupplier(nextProps.id, nextProps.country)
        }
    }
	componentWillMount() {
        this.props.calculationStore.list.setIdGoodsSupplier(this.props.id)
        this.props.calculationStore.form.setIdGoodsSupplier(this.props.id, this.props.country)
	}
	render() {
        // Компоненты разные стор общий, стор обслуживает текущий компонент, 
        // каждая таблица создаёт свой компонент вложения который смотрят на общий стор.
        // Для этого показываем только текущий
		return (
            this.props.id == this.props.current[0] ? <div> 
                <ModalForm />
                <div style={{height: '40px'}}>
                    <Button style={{ float: 'right' }} 
                            onClick={() => this.props.calculationStore.form.newForm()}
                            type="primary">Добавить просчёт</Button>
                </div>
                <List />
            </div> : null 
		)
	}
}

export default CalculationBlock