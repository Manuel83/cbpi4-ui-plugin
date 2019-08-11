let MQTTPattern = require("mqtt-pattern");

const messageTypes = {
    "sensor/+id/data": "SENSOR_UPDATE"
}

class CBPiWebSocket {
    constructor() {
        this.ws = undefined
        this.connect_count = 0
    }

    connection_lost(e) {
        this.store.dispatch({type: "WS_CONNECTION_LOST"});


        setTimeout(() => {
            this.open()
        }, 5000)
    }

    open() {
        this.ws = new WebSocket('ws://' + document.domain + ':' + location.port + '/ws', []);
        this.ws.onclose = this.connection_lost.bind(this)
        this.ws.onmessage = this.on_message.bind(this)
        this.ws.onopen = this.on_open.bind(this)
    }

    on_open() {
        if (this.connect_count > 0) {

            // reconnect
            this.store.dispatch({type: "WS_RECONNECT"});
        }
        this.connect_count++
    }

    on_message(e) {

        let data = JSON.parse(e.data)
        Object.entries(messageTypes).forEach(([pattern, type]) => {
            if (MQTTPattern.matches(pattern, data.topic)) {
                this.store.dispatch({type, topic: {topic: data.topic, variables: MQTTPattern.extract(pattern, data.topic)}, payload: data.data});
            }
        });

    }

    connect(store) {
        this.store = store

        this.open()
    }

}

const ws = new CBPiWebSocket()

const wsMiddleware = store => next => action => {
    if (action.type == "WS_CONNECT") {
        ws.connect(store)
    }
    next(action);
}

export default wsMiddleware