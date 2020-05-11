import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import setMinutes from "date-fns/setMinutes";
import setHours from "date-fns/setHours";


function DateTimePicker() {
    var minDate = new Date();
    var maxDate = new Date();
    minDate.setDate(minDate.getDate() + 1);
    maxDate.setDate(minDate.getDate() + 7);
    setHours(setMinutes(minDate, 0), 16);

    const [startDate, setStartDate] = useState(
        setHours(setMinutes(minDate, 0), 16)
    );
    
    return (
        <DatePicker
            selected={startDate}
            onChange={date => setStartDate(date)}
            showTimeSelect
            includeTimes={[
                setHours(setMinutes(new Date(), 0), 16),
                setHours(setMinutes(new Date(), 0), 17),
                setHours(setMinutes(new Date(), 0), 18),
            ]}
            minDate={minDate}
            maxDate={maxDate}
            timeIntervals={60}
            dateFormat="MMMM d, yyyy h:mm aa"
            placeholderText={"Select date and time"}
        />
      );
}

export default DateTimePicker;