import staffStore from './store'

import { addReq, getReq, editReq, getListReq, deleteReq } from './request'

var saveObject = null

/* Task */
async function addStaff(self, index) {
    var start = Date.now()
    var tests = self.plan[index].tests[0]
    var requestObject = {
        json_data: staffStore.model
    }
    await addReq(requestObject).then(data => {
        self.responseTest(tests, data, () => {
            saveObject = data.body
        })
    }, error => {
        tests.type[0].status = false
    })

    await self.setHandleStatus(tests, start)
}

async function getStaff(self, index) {
    var start = Date.now()
    var tests = self.plan[index].tests[1]
    await getReq(saveObject.id).then(data => {
        self.responseTest(tests, data)
    }, error => {
        tests.type[0].status = false
    })

    await self.setHandleStatus(tests, start)
}

async function listStaff(self, index) {
    var start = Date.now()
    var tests = self.plan[index].tests[2]
    await getListReq(staffStore.requestObject).then(data => {
        self.responseTest(tests, data)
    }, error => {
        tests.type[0].status = false
    })

    await self.setHandleStatus(tests, start)
}

async function updateStaff(self, index) {
    var start = Date.now()
    var tests = self.plan[index].tests[3]
    saveObject.json_data.id = saveObject.id
    await editReq(saveObject).then(data => {
        self.responseTest(tests, data)
    }, error => {
        tests.type[0].status = false
    })

    await self.setHandleStatus(tests, start)
}

async function deleteStaff(self, index) {
    var start = Date.now()
    var tests = self.plan[index].tests[4] 
    await deleteReq(saveObject.id).then(data => {
        self.responseTest(tests, data)
    }, error => {
        tests.type[0].status = false
    })

    await self.setHandleStatus(tests, start)
}

export { addStaff, getStaff, listStaff, updateStaff, deleteStaff }