var MQTTPattern = require("mqtt-pattern");

let pattern = "sensor/+id/data";

const messageTypes = {
    "sensor/+id/data": "SENSOR_UPDATE"
}

class CBPiWebSocket {
    constructor() {
        this.ws = undefined
        this.connect_count = 0
    }

    connection_lost(e) {

    }

    open() {
        this.ws = new WebSocket('ws://' + document.domain + ':' + location.port + '/ws', []);
        this.ws.onclose = this.connection_lost.bind(this)
        this.ws.onmessage = this.on_message.bind(this)
        this.ws.onopen = this.on_open.bind(this)
    }

    on_open() {
        console.log("OPEN WS")
    }

    on_message(e) {
        let data = JSON.parse(e.data)
        Object.entries(messageTypes).forEach(([pattern, key]) => {
            if (MQTTPattern.matches(pattern, data.topic)) {
                console.log(key, MQTTPattern.extract(pattern, data.topic), data.data)
            }
        });
    }

    connect() {
        console.log("CONNECT WS")
        this.open()
    }
}

const cbpisocket = new CBPiWebSocket()

const init = () => {
    cbpisocket.connect()
}

const emit = (type, payload) => {
}

export {init, emit}
