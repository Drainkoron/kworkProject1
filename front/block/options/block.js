import React from 'react';
import { observer, inject } from 'mobx-react';


import Page from './page/component'


@inject("supplierStore") @observer
class OptionsBlock extends React.Component {
	constructor(props) {
        super(props);
    }
	componentWillMount() {
        
	}
	render() {
		return (
            <div>
                <Page />
            </div>
		)
	}
}

export default OptionsBlock