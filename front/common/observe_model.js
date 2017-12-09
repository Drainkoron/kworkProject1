import { intercept } from 'mobx'
import moment from 'moment'

export default function observeModel(self) {
    return intercept(self.model, change => {
        if(change.name in self.scheme) {
            switch(self.scheme[change.name].options.type) {
                case 'Input':
                    self.scheme[change.name].elem.value = change.newValue
                        break

                case 'Date':
                    self.scheme[change.name].elem.value = change.newValue ? moment(change.newValue) : null
                        break

                case 'Checked':
                    self.scheme[change.name].elem.checked = change.newValue
                        break

                case 'Dictionary':
                    self.scheme[change.name].elem.value = change.newValue
                        break

                case 'User':
                    self.scheme[change.name].elem.value = change.newValue
                        break

                case 'Number':
                    self.scheme[change.name].elem.value = change.newValue
                        break

                case 'Select':
                    self.scheme[change.name].elem.value = change.newValue
                        break

                case 'TranslateSelect':
                    self.scheme[change.name].elem.value = change.newValue
                        break
                        


                        
            }
        }
        return change
    })
}