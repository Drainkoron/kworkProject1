import React from 'react';
import { observer, inject } from 'mobx-react';

import { Button } from 'antd';

import ModalForm from './form/component' 
import List from './list/component'

@inject("mainStore", "userStore") @observer
class UserBlock extends React.Component {
	constructor(props) {
		super(props);
	}
	componentWillMount() {
		// Ссылка на главный стор
		// this.props.userStore.setAppError = this.props.mainStore.setAppError
	}
	render() {
		
		return (
			<div>
				<ModalForm />
					<div style={{ height: '40px' }}>
						<Button style={{ float: 'right' }} 
								onClick={() => this.props.userStore.form.newForm()}
								type="primary">Добавить пользователя</Button>
					</div>
				<List />
			</div>
		)
	}
}

export default UserBlock;

//<UserList />