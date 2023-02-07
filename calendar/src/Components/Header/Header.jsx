import React, { useState } from "react";
import "./Header.css";

const Header = ({
  prevHandler,
  nextHandler,
  currentHandler,
  today,
  // calendarModeHandler,
  calendarMode,
  setCalendarMode,
}) => {
  const [isOptionsOpened, setOptionsOpened] = useState(false);
  return (
    <div className="Header">
      <div className="headerLeft">
        <span className="logo">
          <span>My</span>Calendar
        </span>
        <button className="today" onClick={currentHandler}>
          Today
        </button>
        <div className="arrows">
          <span>
            <i className="fa-solid fa-angle-left" onClick={prevHandler}></i>
          </span>
          <span>
            <i className="fa-solid fa-angle-right" onClick={nextHandler}></i>
          </span>
        </div>

        <div className="month-year">
          {calendarMode === "day" ? today.format("DD") : null}{" "}
          {today.format("MMM YYYY")}
        </div>
      </div>
      <div className="headerRight">
        {/* <select name="views" id="views" onChange={calendarModeHandler}>
          <option value="month">Month</option>
          <option value="week">Week</option>
          <option value="day">Day</option>
        </select> */}
        <div className="control">
          <button
            className="views"
            onClick={() => setOptionsOpened((prev) => !prev)}
          >
            {calendarMode}
          </button>
          {isOptionsOpened ? (
            <ul className="options">
              <li>
                <button
                  onClick={(e) => {
                    e.stopPropagation;
                    setCalendarMode("month");
                    setOptionsOpened(false);
                  }}
                >
                  month
                </button>
              </li>
              <li>
                <button
                  onClick={(e) => {
                    e.stopPropagation;
                    setCalendarMode("week");
                    setOptionsOpened(false);
                  }}
                >
                  week
                </button>
              </li>
              <li>
                <button
                  onClick={(e) => {
                    e.stopPropagation;
                    setCalendarMode("day");
                    setOptionsOpened(false);
                  }}
                >
                  day
                </button>
              </li>
            </ul>
          ) : null}
        </div>

        <div className="user">S</div>
      </div>
    </div>
  );
};

export default Header;
