import orderStore from './store'

import { addReq, getReq, editReq, getListReq, deleteReq } from './request'

var saveObject = null

/* Task */
async function addOrder(self, index) {
    var start = Date.now()
    var tests = self.plan[index].tests[0]
    var requestObject = {
        customer: 6,
        json_data: orderStore.model
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

async function getOrder(self, index) {
    var start = Date.now()
    var tests = self.plan[index].tests[1]
    await getReq(saveObject.id).then(data => {
        self.responseTest(tests, data)
    }, error => {
        tests.type[0].status = false
    })

    await self.setHandleStatus(tests, start)
}

async function listOrder(self, index) {
    var start = Date.now()
    var tests = self.plan[index].tests[2]
    await getListReq(orderStore.requestObject).then(data => {
        self.responseTest(tests, data)
    }, error => {
        tests.type[0].status = false
    })

    await self.setHandleStatus(tests, start)
}

async function updateOrder(self, index) {
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

async function deleteOrder(self, index) {
    var start = Date.now()
    var tests = self.plan[index].tests[4] 
    await deleteReq(saveObject.id).then(data => {
        self.responseTest(tests, data)
    }, error => {
        tests.type[0].status = false
    })

    await self.setHandleStatus(tests, start)
}

export { addOrder, getOrder, listOrder, updateOrder, deleteOrder }