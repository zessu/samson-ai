import { useState, FC } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

export const Dashboard: FC = () => {
  const [selected, setSelected] = useState<Date[] | undefined>();
  return (
    <>
      <div className="p-10 flex flex-row gap-5">
        <div>
          <DayPicker
            mode="multiple"
            selected={selected}
            onSelect={setSelected}
          ></DayPicker>
        </div>
        <div className="flex flex-row gap-5">
          <div className="card bg-base-100 image-full w-80 h-50 shadow-sm">
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
          <div className="flex flex-row wrap gap-3">
            <div className="card bg-primary text-primary-content h-40 w-40 rounded-xl">
              <div className="card-body">
                <h2 className="card-title">Calories Burned 🔥</h2>
                <p>2,457</p>
              </div>
            </div>
            <div className="card bg-secondary text-primary-content h-40 w-40 rounded-xl">
              <div className="card-body">
                <h2 className="card-title">Steps Walked</h2>
                <p>You've taken 5,689 steps or walked 10KM </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
