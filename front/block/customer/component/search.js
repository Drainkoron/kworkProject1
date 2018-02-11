import React from 'react';
import { observer, inject } from 'mobx-react';

import { Select, Button } from 'antd';
const Option = Select.Option;

@inject("customerStore") @observer
class SearchCustomer extends React.Component {
    constructor(props) {
        super(props);
        this.self = this.self.bind(this)
        this.select = this.select.bind(this)
        this.search = this.search.bind(this)
    }
    select(value, option) {
        this.props.data.setSelect(this.props.customerStore.listResult.object_list[option.props.index])
    }
    search(value) {
        if(this.props.data.value.trim() != value.trim()) {
            this.props.data.reset()
            this.props.data.setValue(value)
            this.self('changeSelect', value)
        }
    }
    self(name, params) {
		this.props.customerStore[name](params)
    }
    componentWillMount() {
		this.props.customerStore.getList()
	}
    render() {
        const { listResult } = this.props.customerStore

        return (
        <div className="ext-search">
            <Select
                size="large"
                mode="combobox"
                value={this.props.data.value}
                placeholder=""
                notFoundContent=""
                style={{ width: 280 }}
                allowClear={true}
                defaultActiveFirstOption={false}
                showArrow={false}
                filterOption={false}
                onSelect={(value, option) => this.select(value, option)}
                onSearch={(value) => this.search(value)}>
                    {listResult.object_list ? 
                        listResult.object_list.toJS().map(elem => <Option key={elem.id} value={elem.json_data.customer}>
                                                                            {elem.json_data.customer}
                                                                        </Option>) : null}
             
            </Select>
        </div>
        );
    }
}

export default SearchCustomer



// import React from 'react';
// import { observer, inject } from 'mobx-react';

// import { Select, Button } from 'antd';
// const Option = Select.Option;

// @inject("customerStore") @observer
// class SearchCustomer extends React.Component {
//     constructor(props) {
//         super(props);
//         this.self = this.self.bind(this)
//         this.select = this.select.bind(this)
//         this.search = this.search.bind(this)
//         this.getViewAddSearchBotton = this.getViewAddSearchBotton.bind(this)
//         this.add = this.add.bind(this)
//     }
//     select(value, option) {
//         this.props.data.setSelect(value, option.props.children)
//     }
//     search(value) {
//         this.props.data.setValue(value)
//         this.self('changeSelect', value)
//     }
//     getViewAddSearchBotton() {
//         var view = false
//         if('object_list' in this.props.customerStore.listResult) {
//             if(this.props.customerStore.listResult.object_list.length == 0) {
//                 view = true
//             }
//         }
//         return view
//     }
//     add() {
//         this.props.customerStore.addFromSelect(this.props.data.value, (newId) => {
//             this.props.data.setSelect(newId, this.props.data.value)
//         })
//     }
//     self(name, params) {
// 		this.props.customerStore[name](params)
// 	}
//     render() {
//         const { listResult } = this.props.customerStore

//         return (
//         <div className="ext-search">
//             <Select
//                 size="large"
//                 mode="combobox"
//                 value={this.props.data.value}
//                 placeholder=""
//                 notFoundContent=""
//                 style={{ width: 240 }}
//                 defaultActiveFirstOption={false}
//                 showArrow={false}
//                 filterOption={false}
//                 onSelect={(value, option) => this.select(value, option)}
//                 onSearch={(value) => this.search(value)}>
//                     {listResult.object_list ? 
//                         listResult.object_list.toJS().map(elem => <Option key={elem.id}>{elem.json_data.company}</Option>) : null}
             
//             </Select>
//             {this.getViewAddSearchBotton() ? <Button onClick={this.add}
//                                                         shape="circle" 
//                                                         size="large" 
//                                                         icon="plus" /> : null}
            
//         </div>
//         );
//     }
// }

// export default SearchCustomer

