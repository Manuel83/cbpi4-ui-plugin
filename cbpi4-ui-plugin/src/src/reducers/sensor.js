const initial_state = () => {

    let result = {
        value: 0,
        data: {},
        d2: []
    }
    return result
}

const sensor = (state = initial_state(), action) => {
    switch (action.type) {
        case "SENSOR_UPDATE":

            let new_data = [...state.d2, action.payload.value]

            if (new_data.length > 50) {
                new_data.shift()
            }

            return {...state, d2: new_data, data: {...state.data, [action.topic.variables.id]: action.payload.value}}
        case "SYSTEM_LOAD_DATA_RECEIVED":
            return {...state, list: {...action.payload.sensor.items}, types: {...action.payload.sensor.types}}
        default:
            return state
    }
}

export default sensor