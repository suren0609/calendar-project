import React from "react";
import "./UpdateForm.css";
import moment from "moment";
const UpdateForm = ({
  closeFormHandler,
  event,
  changeEventHandler,
  eFetchHandler,
  removeEventHandler,
  setTimePicker,
  showTimePicker,
  timesForDay,
  setTimeForEvent,
}) => {
  return (
    <div className="update-form" onClick={(e) => e.stopPropagation()}>
      <p>Title</p>
      <input
        type="text"
        value={event.title}
        onChange={(e) => changeEventHandler(e.target.value, "title")}
      />
      <p>Description</p>
      <input
        type="textarea"
        value={event.description}
        onChange={(e) => changeEventHandler(e.target.value, "description")}
      />
      <p>Time</p>
      <div className="timePicker">
        <button className="dayForEvent">
          {moment.unix(event.date).format("DD/MM/YYYY")}
        </button>
        <button
          className="timeForEvent"
          onClick={() => setTimePicker((prev) => !prev)}
        >
          {moment.unix(event.date).format("HH:mm")}
        </button>
        {showTimePicker ? (
          <ul className="timeList">
            {timesForDay.map((_, i) => (
              <li
                className="imeListItem"
                key={i}
                onClick={() => setTimeForEvent(i)}
              >
                {`${i}`.padStart(2, "0") + ":00"}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
      <div className="btnsForm">
        <button onClick={closeFormHandler}>Cancel</button>
        <button onClick={eFetchHandler}>Save</button>
        <button onClick={removeEventHandler}>Delete</button>
      </div>
    </div>
  );
};

export default UpdateForm;
