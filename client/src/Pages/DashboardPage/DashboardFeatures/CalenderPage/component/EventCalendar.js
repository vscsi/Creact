import React, { useState } from "react";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const EventCalendar = (props) => {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [eventTitle, setEventTitle] = useState("");
  const [eventRepsonsible, setEventResponsible] = useState("");
  const [eventContent, setEventContent] = useState("");
  const [eventDeadline, setEventDeadline] = useState("");

  function parseISOString(s) {
    var b = s.split(/\D+/);
    return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
  }

  // const handleOpen = () => {
  //   setOpen(true);
  // };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEventClick = (info) => {
    setOpen(true);
    setEventTitle(info.event.title);
    // console.log(info.event.content);
    // console.log(info.event.title);
    // console.log(props);
    for (let i = 0; i < props.tasks.length; i++) {
      if (info.event.title === props.tasks[i].title) {
        setEventResponsible(props.tasks[i].responsible);
        setEventContent(props.tasks[i].content);
        setEventDeadline(parseISOString(props.tasks[i].date).toString());
      }
    }
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Task: {eventTitle}</h2>
      <p id="simple-modal-description">Responsible: {eventRepsonsible}</p>
      <p id="simple-modal-description">Deadline: {eventDeadline}</p>
      <p id="simple-modal-description">Description: {eventContent}</p>
    </div>
  );
  return (
    <div>
      <FullCalendar
        initialView="dayGridMonth"
        plugins={[dayGridPlugin, interactionPlugin]}
        events={props.tasks}
        //   timeZone="H(:mm)"
        timeZone="UTC"
        locale="us"
        eventClick={handleEventClick}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
};

export default EventCalendar;
