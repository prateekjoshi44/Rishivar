import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Icons from '../ui/Icons';


const DateInput = ({ name }) => {
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date());
    const [isTimeSure, setIsTimeSure] = useState(true);

    const handleTimeSwitch = (e) => {
        setIsTimeSure(!e.target.checked);
        if (e.target.checked) {
            // Set the time to 12:00 AM when "Not Sure of Time" is selected
            const newTime = new Date();
            newTime.setHours(0, 0); // Setting the time to 12:00 AM
            setTime(newTime);
        }
    };

    const CustomInput = ({ value, onClick }) => (
        <div className="d-flex align-items-center justify-content-between px-3 py-2 bg-white rounded"
            onClick={onClick}>
            <span className="me-2">
                {Icons.calender("text-warning fs-4")}
            </span>
            <span className="text-dark">
                {value}
            </span>
            <span className="ms-2">
                {Icons.dropDown("ms-3 text-warning fs-6")}
            </span>
        </div>
    );

    const CustomInputTime = ({ value, onClick }) => (
        <div className="d-flex align-items-center justify-content-between px-3 py-2 bg-white rounded"
            onClick={onClick}>
            <span className="me-2">
                {Icons.clock("text-warning fs-4")}
            </span>
            <span className="text-dark">
                {value}
            </span>
            <span className="ms-2">
                {Icons.dropDown("ms-3 text-warning fs-6")}
            </span>
        </div>
    );

    return (
        <>
            <label htmlFor={name} className="form-label text-capitalize">{name}</label>
            <div className='d-flex justify-content-start align-items-center  w-100 text-wrap'>
                <DatePicker
                    selected={date}
                    onChange={(newDate) => setDate(newDate)}
                    customInput={<CustomInput />}
                    calendarClassName="custom-datepicker"
                    popperPlacement="top-end"
                    dateFormat="dd/MM/yyyy"
                />

                <div className="ms-3">
                    <DatePicker
                        selected={time}
                        onChange={(newTime) => setTime(newTime)}
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={1}
                        timeCaption="Time"
                        dateFormat="h:mm aa"
                        customInput={<CustomInputTime />}
                        popperPlacement="top-end"
                        disabled={!isTimeSure}
                    />
                </div>
            </div>

            <div className="d-flex justify-content-between bg-white rounded-10 py-2 shadow-sm mt-3 text-wrap mx-2 " style={{ width: "95%" }}>
                <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Not Sure of Time</label>
                <div className="form-check form-switch">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                        id="flexSwitchCheckDefault"
                        onChange={handleTimeSwitch}
                    />
                </div>
            </div>
        </>
    );
};

export default DateInput;
