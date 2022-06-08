import React, { forwardRef, useState } from "react";
import classnames from "classnames";
import moment from "moment";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { getEditingTaskId, getTaskById } from "../../store/app-store/selectors";
import IconWave from "../IconWave/IconWave";
import {
  deleteTask,
  editTask,
  postTask,
  removeTask,
  setTaskToEdit,
} from "../../store/app-store/actions";

const REPEAT_FIELD = [
  {
    id: "repeat-mo-1",
    value: "mo",
  },
  {
    id: "repeat-tu-1",
    value: "tu",
  },
  {
    id: "repeat-we-1",
    value: "we",
  },
  {
    id: "repeat-th-1",
    value: "th",
  },
  {
    id: "repeat-fr-1",
    value: "fr",
  },
  {
    id: "repeat-sa-1",
    value: "sa",
  },
  {
    id: "repeat-su-1",
    value: "su",
  },
];
const COLOR_FIELD = ["black", "yellow", "blue", "green", "pink"];

const EditTask = () => {
  const dispatch = useDispatch();
  const editingTaskId = useSelector(getEditingTaskId, shallowEqual);
  const task = useSelector(getTaskById(editingTaskId), shallowEqual);

  const [isChanged, setIsChanged] = useState(false);

  const [description, setDescription] = useState(task.description);
  const [dueDate, setDueDate] = useState(task.dueDate);
  const [repeatingDays, setRepeatingDays] = useState(task.repeatingDays);
  const [color, setColor] = useState(task.color);

  const isRepeating = Object.values(repeatingDays).some((d) => d);
  const isExpired = moment(dueDate).isBefore(moment());

  const [showRepeat, setShowRepeat] = useState(isRepeating);
  const [showDate, setShowDate] = useState(!!dueDate);

  const onRepeatingDaysChange = (day) => (evt) => {
    setRepeatingDays((prevState) => {
      const newRepeatingDays = {
        ...prevState,
        [day]: evt.target.checked,
      };

      if (Object.values(newRepeatingDays).every((d) => !d)) {
        setShowRepeat(false);
      }

      return newRepeatingDays;
    });

    if (!isChanged) {
      setIsChanged(true);
    }
  };

  const onRepeatBtnClick = () => {
    if (showRepeat) {
      setRepeatingDays(
        Object.keys(repeatingDays).reduce((acc, key) => {
          acc = { ...acc, [key]: false };
          return acc;
        }, {})
      );
      setShowRepeat(false);
    } else {
      setShowDate(false);
      setDueDate(null);
      setShowRepeat(true);
    }
  };
  const onDateBtnClick = () => {
    if (showDate) {
      setDueDate(null);
      setShowDate(false);
    } else {
      setShowDate(true);
    }
  };
  const onSubmit = (evt) => {
    evt.preventDefault();
    const updatedTask = { ...task, description, dueDate, repeatingDays, color };
    if (!isChanged) {
      dispatch(setTaskToEdit({ id: -1 }));
      return;
    }
    if (updatedTask._id === "new task") {
      dispatch(postTask(updatedTask)).then(() => {
        dispatch(removeTask("new task"));
        dispatch(setTaskToEdit({ id: -1 }));
      });
    } else {
      dispatch(editTask(updatedTask)).then(() =>
        dispatch(setTaskToEdit({ id: -1 }))
      );
    }
  };
  const onDeleteBtnClick = () => {
    dispatch(deleteTask(editingTaskId));
  };

  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <label className="card__input-deadline-wrap">
      <input
        className="card__date"
        type="text"
        placeholder="23 September"
        name="date"
        onClick={onClick}
        value={dueDate ? moment(dueDate).format("DD MMMM kk:mm") : ""}
        ref={ref}
        autoComplete="off"
        onChange={() => {}}
      />
    </label>
  ));

  return (
    <article
      className={classnames("card", `card--${color}`, "card--edit", {
        "card--repeat": isRepeating,
        "card--deadline": isExpired,
      })}
    >
      <form className="card__form" method="get" onSubmit={onSubmit}>
        <div className="card__inner">
          <div className="card__color-bar">
            <IconWave color={color} />
          </div>
          <div className="card__textarea-wrap">
            <label>
              <textarea
                className="card__text"
                placeholder="Start typing your text here..."
                name="text"
                onChange={(evt) => {
                  setDescription(evt.target.value);
                  if (!isChanged) {
                    setIsChanged(true);
                  }
                }}
                value={description}
              />
            </label>
          </div>
          <div className="card__settings">
            <div className="card__details">
              <div className="card__dates">
                <button
                  className="card__date-deadline-toggle"
                  type="button"
                  disabled={isRepeating}
                  onClick={onDateBtnClick}
                >
                  date:{" "}
                  <span className="card__date-status">
                    {showDate ? "yes" : "no"}
                  </span>
                </button>

                <fieldset className="card__date-deadline" disabled={!showDate}>
                  <DatePicker
                    selected={dueDate ? new Date(dueDate) : new Date()}
                    onChange={(date) => {
                      setDueDate(date);
                      if (!isChanged) {
                        setIsChanged(true);
                      }
                    }}
                    showTimeInput
                    timeInputLabel="Time:"
                    customInput={<ExampleCustomInput />}
                    shouldCloseOnSelect={false}
                  >
                    <span
                      style={{
                        display: "flex",
                        padding: 10,
                        width: 240,
                        boxSizing: "border-box",
                        justifyContent: "center",
                      }}
                    >
                      <button
                        style={{
                          fontFamily: "HelveticaNeueCyr",
                          fontWeight: "bold",
                          fontSize: 14,
                          textAlign: "center",
                          width: 100,
                          margin: 0,
                          padding: 5,
                          paddingTop: 7,
                          cursor: "pointer",
                        }}
                      >
                        Submit
                      </button>
                    </span>
                  </DatePicker>
                </fieldset>

                <button
                  className="card__repeat-toggle"
                  type="button"
                  onClick={onRepeatBtnClick}
                >
                  repeat:
                  <span className="card__repeat-status">
                    {showRepeat ? "yes" : "no"}
                  </span>
                </button>

                <fieldset className="card__repeat-days" disabled={!showRepeat}>
                  <div className="card__repeat-days-inner">
                    {REPEAT_FIELD.map((f) => (
                      <React.Fragment key={f.id}>
                        <input
                          className="visually-hidden card__repeat-day-input"
                          type="checkbox"
                          id={f.id}
                          name="repeat"
                          value={f.value}
                          checked={repeatingDays[f.value]}
                          onChange={onRepeatingDaysChange(f.value)}
                        />
                        <label className="card__repeat-day" htmlFor={f.id}>
                          {f.value}
                        </label>
                      </React.Fragment>
                    ))}
                  </div>
                </fieldset>
              </div>
            </div>

            <div className="card__colors-inner">
              <h3 className="card__colors-title">Color</h3>
              <div className="card__colors-wrap">
                {COLOR_FIELD.map((f) => (
                  <React.Fragment key={`color-${f}-1`}>
                    <input
                      type="radio"
                      id={`color-${f}-1`}
                      className={`card__color - input card__color-input--${f} visually-hidden`}
                      name="color"
                      value={f}
                      checked={f === color}
                      onChange={(evt) => {
                        setColor(evt.target.value);
                        if (!isChanged) {
                          setIsChanged(true);
                        }
                      }}
                    />
                    <label
                      htmlFor={`color-${f}-1`}
                      className={`card__color card__color--${f}`}
                    >
                      {f}
                    </label>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
          <div className="card__status-btns">
            <button className="card__save" type="submit">
              save
            </button>
            <button
              className="card__delete"
              type="button"
              onClick={onDeleteBtnClick}
            >
              delete
            </button>
          </div>
        </div>
      </form>
    </article>
  );
};

export default EditTask;
