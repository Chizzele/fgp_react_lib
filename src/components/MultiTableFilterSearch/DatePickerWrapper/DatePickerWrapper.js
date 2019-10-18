import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './datepickerOverride.css';
import moment from 'moment';
 
export class DatePickerWrapper extends React.Component {
    constructor(props){
        super(props);
    }
   
    render() {
      return (
        <div className={"fixedDatePicked"}>
            <DatePicker
                selected={this.props.date}
                onChange={this.props.handleChange}
            />
        </div>
      );
    }
  }
  export default DatePickerWrapper