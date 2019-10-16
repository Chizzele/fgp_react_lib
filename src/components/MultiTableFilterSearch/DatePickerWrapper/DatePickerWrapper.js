import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './datepickerOverride.css';
import moment from 'moment';
 
export class DatePickerWrapper extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            thisDate: this.props.date ? this.props.date : moment()
        };
    }
   
    handleChange(date) {
      this.setState({
        thisDate: date
      });
    }
   
    render() {
      return (
        <div className={"fixedDatePicked"}>
            <DatePicker
              selected={this.state.thisDate}
              onChange={this.handleChange}
            />
        </div>
      );
    }
  }
  export default DatePickerWrapper