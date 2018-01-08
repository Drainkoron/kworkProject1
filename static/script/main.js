var emailReg = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/

document.addEventListener("DOMContentLoaded", function(event) {
    var button = document.getElementById('send') 
    var mail = document.getElementById('email')
    var result = document.getElementById('result')
    var result_check = document.getElementById('result_check')
    var check_send = document.getElementById('check_send')
    
    var model = {
        graph: false,
        TO: false,
        journal: false,
        cost: false,
        inform: false
    }

    var graph = document.getElementById('graph')
    graph.onclick = () => {
        model.graph = !model.graph
    }

    var TO = document.getElementById('TO')
    TO.onclick = () => {
        model.TO = !model.TO
    }

    var journal = document.getElementById('journal')
    journal.onclick = () => {
        model.journal = !model.journal
    }

    var cost = document.getElementById('cost')
    cost.onclick = () => {
        model.cost = !model.cost
    }

    var inform = document.getElementById('inform')
    inform.onclick = () => {
        model.inform = !model.inform
    }

    check_send.onclick = () => {
        goal(model)
    }

    button.onclick = () => {
        if(emailReg.test(mail.value)) {
            request('/mail', {date: getDate(),
                                mail: mail.value,
                                request: getParams()}).then(data => {
                result.innerHTML = 'Email успешно сохранён'
            }, error => {
                result.innerHTML = 'Ошибка сохранения!'
            })
        } else {
            result.innerHTML = 'Неверный фрмат Email'
        }
    }

    mail.onkeydown = () => {
        result.innerHTML = ''
    }
});

function goal(model) {
    request('/mail', {date: getDate(),
                        info: model,
                        request: getParams()}).then(data => {
        result_check.innerHTML = 'Благодарим за ваше мнение!'
    }, error => {
        
    })
}

function request(url, body) {
    return new Promise(function(resolve, reject) {
       fetch(url, {
            method: 'POST',
            credentials: 'include',
            headers: {  
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }).then((data) => {
            resolve(data)
        }).catch((error) => {
            reject(error)
        });
    });
}


function getParams() {
    var params = decodeURI(window.location.search)
    var string = params.substring(1).split('&')
    var resultObject = {}
    string.forEach((elem) => {
        var elemString = elem.split('=')
        resultObject[elemString[0]] = elemString[1]
    })
    return resultObject
}

function getDate() {
    var date = new Date()
    var localDate = date.toLocaleString()
    return localDate
}
