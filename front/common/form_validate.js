import { RegExps } from './regexp'
import moment from 'moment'

export default function formValidate(scheme) {
    for(var i in scheme) {
        if(i != 'store') {
            if(scheme[i].options.type == 'Input' || 
                scheme[i].options.type == 'User' ||
                scheme[i].options.type == 'Dictionary' ||
                scheme[i].options.type == 'Number' || 
                scheme[i].options.type == 'Select' || 
                scheme[i].options.type == 'TranslateSelect' || 
                scheme[i].options.type == 'BlockSelect') {
                if('regExp' in scheme[i].options && scheme[i].elem.value) {
                    if(!RegExps[scheme[i].options.regExp].test(scheme[i].elem.value)) {
                        return scheme[i].options.textError
                    }
                }
                if('min' in scheme[i].options) {
                    if(scheme[i].elem.value.length <= scheme[i].options.min) {
                        return scheme[i].options.textError
                    }
                }
            }   
            if(scheme[i].options.type == 'Date') {
                if('min' in scheme[i].options) {
                    if(scheme[i].elem.value == null) {
                        return scheme[i].options.textError
                    }
                }
            } 
        }
    }
    return false
}