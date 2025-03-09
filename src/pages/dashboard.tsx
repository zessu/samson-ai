import { useState, FC } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

export const Dashboard: FC = () => {
  const [selected, setSelected] = useState<Date[] | undefined>();
  return (
    <>
      <div className="p-10 flex flex-row gap-5 wrap">
        <DayPicker
          mode="multiple"
          selected={selected}
          onSelect={setSelected}
        ></DayPicker>
        <div className="card bg-base-100 image-full w-90 h-20 shadow-sm">
          <figure>
            <img
              src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
              alt="Shoes"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Daily Streak</h2>
            <p>Keep working out, you're doing great</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Just do it</button>
            </div>
          </div>
        </div>
        <div className="card bg-primary text-primary-content w-96">
          <div className="card-body">
            <h2 className="card-title">Steps walked</h2>
            <p>You've taken 1000 steps</p>
          </div>
        </div>
        <div className="card bg-secondary text-primary-content w-96">
          <div className="card-body">
            <h2 className="card-title">Weight Lost</h2>
            <p>You've lost around 10kg </p>
          </div>
        </div>
      </div>
    </>
  );
};
