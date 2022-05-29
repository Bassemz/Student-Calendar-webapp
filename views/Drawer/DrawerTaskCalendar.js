import { useState } from "react";
import { CalendarIcon } from "@chakra-ui/icons";
import {
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from "@chakra-ui/react";
import React from "react";
import { Calendar } from "react-calendar";
import "react-calendar/dist/Calendar.css";

function DrawerTaskCalendar({ value, onChange }) {
  //   const [value, onChange] = useState(date);

  return (
    <Popover>
      <PopoverTrigger>
        <IconButton aria-label="icon" icon={<CalendarIcon />} size="lg" />
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader justifySelf={"center"} alignSelf="center">
          Calendar
        </PopoverHeader>
        <PopoverBody fontSize={"sm"}>
          <Calendar onChange={onChange} value={value} />
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}

export default DrawerTaskCalendar;
