import { observable, computed, action } from 'mobx'

//import getUserListReq from '../requests/get_user_list'

class UserStore {
	@observable userList
    
    constructor() {
        this.userList = []
    }

    // @action getList() {
    //     getUserListReq().then(data => {
	// 		this.userList = data.body
	// 	}, error => {
	// 		//this.setAppError('123')
	// 	})
    // }

    // @computed get selectedCount() {
    //     return this.users.filter(userStore => {
    //         return userStore.user.get("checked");
    //     }).length;
    // }

}

const userStore = new UserStore()
export default userStore