import React from "react";
import "./CalendarDay.css";
import moment from "moment";

const CalendarDay = ({ events, today, postFormHandler, updateFormHandler }) => {
  const eventList = events.filter(
    (e) =>
      e.date >= today.startOf("day").format("X") &&
      e.date <= today.clone().endOf("day").format("X")
  );

  //   console.log(events, today);

  const hours = [...new Array(24)].map((_, i) => {
    const temp = [];
    eventList.forEach((e) => {
      if (+moment.unix(e.date).format("H") === i) temp.push(e);
    });
    return temp;
  });
  return (
    <div className="CalendarDay">
      {/* {eventList.map((e) => (
        <div key={e.id}>{e.title}</div>
      ))} */}
      <div className="weekday">{today.format("ddd")}</div>
      <div
        className={
          today.format("D") != moment().format("D")
            ? "deyView"
            : "currentDayView"
        }
      >
        {today.format("D")}
      </div>
      <div className="hours firstBlock">
        <div className="hour">GMT+04</div>
        <div className="eventPlace"></div>
      </div>
      {hours.map((eventsAtHour, i) => (
        <div className="hours" key={i}>
          <div className="hour">
            {i ? `${i}`.padStart(2, "0") + ":00" : null}
          </div>
          <div className="eventPlace" onClick={() => postFormHandler(today, i)}>
            {eventsAtHour.map((ev, ind) => (
              <div
                className="eventAtHour"
                key={ind}
                onClick={(e) => {
                  e.stopPropagation();
                  updateFormHandler(ev);
                }}
              >
                <p className="evTitle">{ev.title}</p>
                <p className="evDate">{moment.unix(ev.date).format("HH:mm")}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CalendarDay;
