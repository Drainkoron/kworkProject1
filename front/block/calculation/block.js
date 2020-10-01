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
        }
    }
	componentWillMount() {
        this.props.calculationStore.list.setIdGoodsSupplier(this.props.id)
	}
	render() {
        // Компоненты разные стор общий, стор обслуживает текущий компонент, 
        // каждая таблица создаёт свой компонент вложения который смотрят на общий стор.
        // Для этого показываем только текущий
		return (
            this.props.id ? <div> 
                <ModalForm />
                <div style={{height: '40px'}}>
                    <Button style={{ float: 'right' }} 
                            onClick={() => this.props.calculationStore.form.addForm()}
                            type="primary">Добавить просчёт</Button>
                </div>
                <List />
            </div> : null 
		)
	}
}

export default CalculationBlock