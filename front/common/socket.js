import { WS } from '../app_constants'

export default function socket(onmessage, id) {
    let url = `${WS}/${id}/`
    var socket = ''

    function connect() {
        socket = new WebSocket(url)

        socket.onopen = function() {
            console.log('WS Connect', url);
        };

        socket.onerror = function() {
            socket.close()
        };

        socket.onmessage = onmessage

        socket.onclose = function() {
            console.log('Закрыто');
            setTimeout(connect, 5000)
        };
    }
    connect()
    return socket
}