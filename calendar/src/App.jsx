import "./App.css";
import { useEffect, useState } from "react";
import Calendar from "./Components/Calendar/Calendar";
import Header from "./Components/Header/Header";
import Sidebar from "./Components/Sidebar/Sidebar";
import moment from "moment";
import UpdateForm from "./Components/UpdateForm/UpdateForm";
import PostForm from "./Components/PostForm/PostForm";
import CalendarDay from "./Components/CalendarDay/CalendarDay";

function App() {
  const [today, setToday] = useState(moment());
  // const today = moment();
  const startDay = today.clone().startOf("month").startOf("week");
  const endDay = today.clone().endOf("month").endOf("week");
  const url = "http://localhost:5000";
  const calendar = [];
  const day = startDay;

  const startDayUnix = startDay.format("X");
  const endDayUnix = endDay.format("X");

  const [events, setEvents] = useState([]);
  const [event, setEvent] = useState(null);
  const [isOpenForm, setOpenForm] = useState(false);
  const [isOpenPostForm, setOpenPostForm] = useState(false);
  const [calendarMode, setCalendarMode] = useState("month");
  const [showTimePicker, setTimePicker] = useState(false);

  // const [hoursOfDay, setHoursOfDay] = useState([]);

  // console.log(hoursOfDay);
  useEffect(() => {
    fetch(
      `${url}/events?date_gte=${startDayUnix}
      &date_lte=${endDayUnix}`
    )
      .then((res) => res.json())
      .then((res) => setEvents(res));
  }, [today]);
  // console.log(events);

  const calendarModeHandler = (e) => {
    setCalendarMode(e.target.value);
  };

  // console.log(calendarMode);

  // while (!day.isAfter(endDay)) {
  for (let i = 0; i < 5; i++) {
    calendar.push([]);
    for (let j = 0; j < 7; j++) {
      calendar[i].push(day.clone());
      day.add(1, "day");
    }
  }
  // calendar.push(day.clone().format("YYYY-MM-DD"));
  // day.add(1, "day");
  // }

  const prevHandler = () =>
    setToday((prev) => prev.clone().subtract(1, calendarMode));

  const nextHandler = () =>
    setToday((next) => next.clone().add(1, calendarMode));

  const currentHandler = () => setToday(moment());

  const postFormHandler = (day, time) => {
    setOpenPostForm(true);
    setEvent({
      title: "",
      description: "",
      date: time ? day.hour(time).format("X") : day.format("X"),
    });
  };

  const updateFormHandler = (e) => {
    setOpenForm(true);
    setEvent(e);
  };

  const closeFormHandler = () => {
    setOpenForm(false);
    setEvent(null);
  };

  const closePostFormHandler = () => {
    setOpenPostForm(false);
    setEvent(null);
  };

  const changeEventHandler = (text, field) => {
    setEvent((prevE) => ({
      ...prevE,
      [field]: text,
    }));
  };

  const eFetchHandler = () => {
    fetch(`${url}/events/${event.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(event),
    })
      .then((res) => res.json())
      .then((res) =>
        setEvents((prev) => prev.map((el) => (el.id === res.id ? res : el)))
      );
    closeFormHandler();
  };

  const eFetchPostHandler = () => {
    fetch(`${url}/events`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(event),
    })
      .then((res) => res.json())
      .then((res) => setEvents((prev) => [...prev, res]));
    closePostFormHandler();
  };

  const removeEventHandler = () => {
    fetch(`${url}/events/${event.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(() => {
        setEvents((prev) => prev.filter((el) => el.id !== event.id));
        closeFormHandler();
      });
  };

  const timesForDay = [...new Array(24)];

  const setTimeForEvent = (i) => {
    setTimePicker(false);
    changeEventHandler(moment.unix(+event.date).hour(i).format("X"), "date");
  };

  return (
    <>
      {isOpenPostForm ? (
        <div className="modalForm">
          <PostForm
            eFetchPostHandler={eFetchPostHandler}
            event={event}
            closePostFormHandler={closePostFormHandler}
            changeEventHandler={changeEventHandler}
            setTimePicker={setTimePicker}
            showTimePicker={showTimePicker}
            timesForDay={timesForDay}
            setTimeForEvent={setTimeForEvent}
          />
        </div>
      ) : null}
      {isOpenForm ? (
        <div className="modalForm" onClick={closeFormHandler}>
          <UpdateForm
            closeFormHandler={closeFormHandler}
            event={event}
            changeEventHandler={changeEventHandler}
            eFetchHandler={eFetchHandler}
            removeEventHandler={removeEventHandler}
            setTimePicker={setTimePicker}
            showTimePicker={showTimePicker}
            timesForDay={timesForDay}
            setTimeForEvent={setTimeForEvent}
          />
        </div>
      ) : null}
      <div className="App">
        <Header
          prevHandler={prevHandler}
          nextHandler={nextHandler}
          currentHandler={currentHandler}
          today={today}
          calendarModeHandler={calendarModeHandler}
          calendarMode={calendarMode}
          setCalendarMode={setCalendarMode}
        />
        <div className="appBody">
          <Sidebar
            calendar={calendar}
            prevHandler={prevHandler}
            nextHandler={nextHandler}
            today={today}
            setToday={setToday}
            setCalendarMode={setCalendarMode}
          />
          {calendarMode === "month" ? (
            <Calendar
              calendar={calendar}
              today={today}
              events={events}
              updateFormHandler={updateFormHandler}
              postFormHandler={postFormHandler}
              setToday={setToday}
              setCalendarMode={setCalendarMode}
            />
          ) : calendarMode === "week" ? (
            <div>week</div>
          ) : (
            <CalendarDay
              events={events}
              today={today}
              postFormHandler={postFormHandler}
              updateFormHandler={updateFormHandler}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default App;
