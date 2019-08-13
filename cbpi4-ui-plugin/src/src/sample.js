import React, {Component} from "react";
import {connect} from "react-redux";

import {Sparklines, SparklinesLine} from 'react-sparklines';

@connect((state, ownProps) => {
    return {
        data: state.sensor.data,
        d2: state.sensor.d2,
        sensors: state.sensor.list
    }
}, (dispatch, ownProps) => {
    return {}
}, null, {withRef: true})
export default class Sample extends Component {


    getParams(location) {

        const searchParams = new URLSearchParams(location.search);
        return searchParams.get('sensor') || ''
    }

    render() {

        let sensor_id = this.getParams(window.location)
        console.log(sensor_id, this.props.data, "D2", this.props.d2)
        if (sensor_id in this.props.data) {
            return (
                <div className="data card">
                    <div>{this.props.sensors[sensor_id].name} </div>
                    <div>{this.props.data[sensor_id]} °C</div>
                    <Sparklines data={this.props.sensors[sensor_id].history}>
                        <SparklinesLine color="#cdcdcd"/>
                    </Sparklines>
                </div>
            )
        } else {
            return (
                <div className="data card" style={{fontSize: "20px"}}>Waiting for Data... <div> Sensor Id {sensor_id} </div></div>
            )
        }

    }
}