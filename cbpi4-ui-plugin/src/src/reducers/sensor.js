
const initial_state = () => {

    let result = {
        value: 0,
        data: {}
    }
    return result
}




const sensor = (state = initial_state(), action) => {
    switch (action.type) {
        case "SENSOR_UPDATE":
            return {...state, data: {...state.data, [action.topic.variables.id]: action.payload.value} }
        default:
            return state
    }
}

export default sensor