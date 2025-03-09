import { useState, FC } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

export const Dashboard: FC = () => {
  const [selected, setSelected] = useState<Date[] | undefined>();
  return (
    <>
      <div>
        <DayPicker
          mode="multiple"
          selected={selected}
          onSelect={setSelected}
        ></DayPicker>
        <button className="btn btn-dash btn-secondary">click me</button>
      </div>
    </>
  );
};
