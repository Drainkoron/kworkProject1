import React from 'react';
import { observer, inject } from 'mobx-react';
import { getDictionaryList, creatDictionaryElem } from './request_element'

import { Select, Button, message } from 'antd';
const Option = Select.Option;

import TreeStore from '../../block/goods/tree/store'

message.config({
    top: 150,
    duration: 1,
});

var mount = false

@inject("goodsStore") @observer
class SelectTags extends React.Component {
    constructor(props) {
        super(props);
        this.select = this.select.bind(this)
        this.deselect = this.deselect.bind(this)
        this.search = this.search.bind(this)

        this.state = {
            button: false,
            original: [],
            list: []
        }
    }
    select(value) {
        this.props.data.value.push(value)
        this.props.data.onChange(this.props.data.value)
        this.setState({list: this.state.original})
    }
    deselect(value) {
        this.props.data.value.splice(this.props.data.value.indexOf(value), 1)
        this.props.data.onChange(this.props.data.value)
    }
    search(value) {
        var filterList = this.state.original.filter(elem => elem.indexOf(value) != -1)
        this.setState({list: filterList})
    }
    getTags() {
        var tags = TreeStore.getTags()
        this.setState({list: tags, 
                        original: tags})
    }
    componentWillReceiveProps(nextProps) {

	}
    componentWillMount() {
        mount = true
        this.getTags()
    }
    componentWillUnmount() {
        mount = false
    }
    render() {
        const { button, list } = this.state

        console.log(this.props.data.value, 'this.props.data.value')

        return (
            <div className="ext-search">
                <Select
                    mode="tags"
                    value={this.props.data.value.toJS()}
                    showSearch={false}
                    placeholder=""
                    notFoundContent=""
                    style={{ width: 240 }}
                    defaultActiveFirstOption={false}
                    showArrow={false}
                    filterOption={false}
                    onSelect={(value) => this.select(value)}
                    onDeselect={(value) => this.deselect(value)}
                    onSearch={(value) => this.search(value)}>
                        {list.map((elem, index) => <Option key={index} value={elem}>{elem}</Option>)}
                
                </Select>
                {button ? <Button onClick={this.add}
                                    shape="circle" 
                                    icon="plus" /> : null}
                
            </div>
        );
    }
}

export default SelectTags

//