import { intercept } from 'mobx'
import moment from 'moment'

export default function observeModel(self) {
    return intercept(self.model, change => {
        if(change.name in self.scheme) {
            switch(self.scheme[change.name].options.type) {
                case 'Date':
                    self.scheme[change.name].elem.value = change.newValue ? moment(change.newValue) : null
                        break

                case 'Checked':
                    self.scheme[change.name].elem.checked = change.newValue
                        break

                default:
                    console.log(change.newValue)
                    self.scheme[change.name].elem.value = change.newValue
                        break
            }
        }
        return change
    })
}