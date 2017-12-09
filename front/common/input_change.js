import { RegExps } from './regexp'

export default function inputChange(event, store) {
    let item = store.scheme[event.target.name]
    let symbol = event.target.value[event.target.value.length - 1];
    let value = ''
    
    switch(item.options.format) {
         case 'ru':
            if(RegExps.ru.test(symbol)) {
                value = event.target.value;
            }
                break
         case 'eng':
            if(RegExps.eng.test(symbol)) {
                value= event.target.value;
            }
                break
         case 'num':
            if(RegExps.num.test(symbol)) {
                value = event.target.value;
            }
                break
         case 'phone':
            if(RegExps.num.test(symbol)) {
                if(event.target.value.length < 19) {
                    var num = event.target.value.replace(/\D/g, "");
                    var length = num.length;
                    if(length == 0) {
                        value = "";
                    }
                    if(length == 1) {
                        value = `+${symbol}`;
                    }
                    if(length == 2) {
                        value = item.elem.value.concat(` (${symbol}`);
                    }
                    if(length == 5) {
                        value = item.elem.value.concat(`) ${symbol}`);
                    }
                    if(length == 8 || length == 10) {
                        value = item.elem.value.concat(`-${symbol}`);
                    }
                    if(length == 3 || length == 4 || length == 6 || length == 7 || length == 9 || length == 11) {
                        value = item.elem.value.concat(`${symbol}`);
                    }
                } else {
                    value = item.elem.value.substr(0, item.elem.value.length - 1);
                }
            } else {
                if(event.target.value.length < item.elem.value.length) {
                    value = item.elem.value.substr(0, item.elem.value.length - 1);
                }
            }
                break
        default:
            value = event.target.value;
                break
    }
    if(event.target.value == "") {
        value = "";
    }
    store.form.error = ''
    store.model[item.elem.name] = value // Пишем изменения в модель и наблюдаем модель в схеме
}