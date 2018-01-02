import React from 'react';
import { observer, inject } from 'mobx-react';

//import UserList from './user_list' 

@inject("mainStore", "tableStore") @observer
class TableBlock extends React.Component {
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
				234
			</div>
		)
	}
}

export default TableBlock;

//<UserList />