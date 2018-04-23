
class UserObject {
    constructor() {
        this.user = {}
    }
    setUser(user) {
        this.user = user
    }
    getUser() {
        return this.user.login
    }
}

const userObject = new UserObject()
export default userObject
