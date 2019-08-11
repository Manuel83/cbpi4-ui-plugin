import React, {Component} from "react";
import {connect} from "react-redux";
import {CardTable} from "reactstrap";

@connect((state, ownProps) => {
    return {
        data: state.sensor.data
    }
}, (dispatch, ownProps) => {
    return {}
}, null, {withRef: true})
export default class Sample extends Component {

    function

    getParams(location) {

        const searchParams = new URLSearchParams(location.search);
        return searchParams.get('sensor') || ''
    }

    render() {

        let sensor_id = this.getParams(window.location)
        console.log(sensor_id, this.props.data)
        if (sensor_id in this.props.data) {
            return (
                <div className="data card" style={{fontSize :"20px"}}>{this.props.data[sensor_id]} </div>
            )
        }
        else {
            return (
                <div className="data card" style={{fontSize:"20px"}}>Waiting for Data... <div> Sensor Id {sensor_id} </div></div>
            )
        }


    }
}