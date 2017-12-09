import React from 'react';

import { Icon, Alert } from 'antd';

class NoMatch extends React.Component {
	constructor(props) {
		super(props);
	}
	componentWillMount() {
		
	}
	render() {
		return (
			<div style={{width: '300px',
                        margin: '10% auto'}}>
				<Alert
                    message="Ошибка 404"
                    description="Такой страницы не существует!"
                    type="warning"
                    showIcon/>
			</div>
		)
	}
}

export default NoMatch;