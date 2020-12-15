import React from "react";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

const EventCalendar = () => {
  return (
    <FullCalendar
      initialView="dayGridMonth"
      plugins={[dayGridPlugin, interactionPlugin]}
    />
  );
};

export default EventCalendar;
