import React from "react";
import "./Calendar.css";
import moment from "moment";
const Calendar = ({
  calendar,
  today,
  events,
  updateFormHandler,
  postFormHandler,
  setToday,
  setCalendarMode,
}) => {
  return (
    <div className="Calendar">
      <table border="1px solid black">
        <tbody>
          <tr className="weeks">
            {[...Array(7)].map((_, i) => (
              <td key={i}>{moment().day(i).format("ddd")}</td>
            ))}
          </tr>
          {calendar.map((el, i) => (
            <tr key={i}>
              {el.map((day) => (
                <td
                  key={day.format("DDMMYYYY")}
                  onClick={() => postFormHandler(day)}
                >
                  <div className="day-month">
                    <div className="day">
                      <span
                        className={
                          day.format("DDMMYYYY") === moment().format("DDMMYYYY")
                            ? "dayNum currentDay"
                            : day.format("MM") != today.format("MM")
                            ? "dayNum otherMonth"
                            : "dayNum"
                        }
                        onClick={(e) => {
                          e.stopPropagation();
                          setToday(day);
                          setCalendarMode("day");
                        }}
                      >
                        {day.format("D")}
                      </span>
                      {day.format("D") == "1" ? (
                        <span
                          className={
                            day.format("MM") != today.format("MM")
                              ? "otherMonth"
                              : null
                          }
                        >
                          {day.format("MMM")}
                        </span>
                      ) : null}
                    </div>
                    {/* <div className="evt">event-1</div> */}
                    {events
                      .filter(
                        (evt) =>
                          evt.date >= day.format("X") &&
                          evt.date <= day.clone().endOf("day").format("X")
                      )
                      .slice(0, 2)
                      .map((evt) => (
                        <div
                          className="evt"
                          key={evt.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            updateFormHandler(evt);
                          }}
                        >
                          {evt.title}
                        </div>
                      ))}
                    {events.filter(
                      (evt) =>
                        evt.date >= day.format("X") &&
                        evt.date <= day.clone().endOf("day").format("X")
                    ).length > 2 ? (
                      <span
                        className="more-evt"
                        onClick={(e) => {
                          e.stopPropagation();
                          setToday(day);
                          setCalendarMode("day");
                        }}
                      >
                        More{" "}
                        {events.filter(
                          (evt) =>
                            evt.date >= day.format("X") &&
                            evt.date <= day.clone().endOf("day").format("X")
                        ).length - 2}
                        ...
                      </span>
                    ) : null}
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Calendar;
