import React from "react";
import "./Sidebar.css";
import moment from "moment";
const Sidebar = ({
  calendar,
  prevHandler,
  nextHandler,
  today,
  setToday,
  setCalendarMode,
}) => {
  return (
    <div className="Sidebar">
      <button className="create">
        <i className="fa-thin fa-plus"></i> Create
      </button>
      <div className="cal-control">
        <div className="control-year">
          <span>{today.format("MMM YYYY")}</span>
          <div className="arrows">
            <a href="#">
              <i className="fa-solid fa-angle-left" onClick={prevHandler}></i>
            </a>
            <a href="#">
              <i className="fa-solid fa-angle-right" onClick={nextHandler}></i>
            </a>
          </div>
        </div>
        <div className="smallCal">
          <div className="smallWeeks">
            <div>Sun</div>
            <div>Mon</div>
            <div>Tue</div>
            <div>Wed</div>
            <div>Thu</div>
            <div>Fri</div>
            <div>Sat</div>
          </div>
          {calendar.map((el, i) => (
            <div key={i}>
              {el.map((day) => (
                <div
                  className={
                    day.format("DDMMYYYY") == moment().format("DDMMYYYY")
                      ? "currentDay"
                      : null
                  }
                  key={day.format("DDMMYYYY")}
                  onClick={(e) => {
                    e.stopPropagation();
                    setToday(day);
                    setCalendarMode("day");
                  }}
                >
                  {day.format("D")}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
