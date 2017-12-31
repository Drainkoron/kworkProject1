import React from 'react';
import { observer, inject } from 'mobx-react';

//import UserList from './user_list' 

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
		const { mainStore } = this.props
		return (
			<div>
				
			</div>
		)
	}
}

export default UserBlock;

//<UserList />