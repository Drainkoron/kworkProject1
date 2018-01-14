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
            var num = event.target.value.replace(/\D/g, "");
            if(num.length < 12) {
                if(event.target.value.length > item.elem.value.length) {
                    for(var i in num) {
                        if(i == 0) {
                            value = num[i] ? num[i] != 7 ? `+7 (${num[i]}` : `+7 (` : null
                        }
                        if(i == 1 || i == 2 || i == 4 || i == 5 || i == 7 || i == 9 || i == 10) {
                            value = num[i] ? item.elem.value + num[i] : item.elem.value
                        }
                        if(i == 3) {
                            value = num[i] ? item.elem.value + `${num[i]}) ` : item.elem.value
                        }
                        if(i == 6 || i == 8) {
                            value = num[i] ? item.elem.value + `${num[i]}-` : item.elem.value
                        }
                    }
                } else {
                    value = event.target.value
                }
            } else {
                value = item.elem.value
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