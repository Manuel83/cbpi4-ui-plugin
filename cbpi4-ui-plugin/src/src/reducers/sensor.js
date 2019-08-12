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
            let sennsorid = action.topic.variables.id;
            let new_data
            if (state.list[sennsorid].history == undefined) {
                new_data = []
            }
            else {
                new_data = [...state.list[sennsorid].history , action.payload.value]
            }

            if (new_data.length > 200) {
                new_data.shift()
            }

            return {...state, list: {...state.list, [sennsorid]: {...state.list[sennsorid], history:new_data} }, data: {...state.data, [action.topic.variables.id]: action.payload.value}}
        case "SYSTEM_LOAD_DATA_RECEIVED":
            return {...state, list: {...action.payload.sensor.items}, types: {...action.payload.sensor.types}}
        default:
            return state
    }
}

export default sensor