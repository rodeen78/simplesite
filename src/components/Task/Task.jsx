import classnames from "classnames";
import moment from "moment";
import { useDispatch } from "react-redux";

import { editTask, setTaskToEdit } from "../../store/app-store/actions";

const Task = (props) => {
  const dispatch = useDispatch();
  const { task } = props;
  const { _id, color, description, dueDate, repeatingDays } = task;

  const isRepeating = Object.values(repeatingDays).some((d) => d);
  const isExpired = moment(dueDate).isBefore(moment());

  const onEditBtnClick = () => dispatch(setTaskToEdit({ id: _id }));
  const onArchiveBtnClick = () =>
    dispatch(editTask({ ...task, isArchived: !task.isArchived }));
  const onFavoriteBtnClick = () =>
    dispatch(editTask({ ...task, isFavorite: !task.isFavorite }));

  return (
    <article
      className={classnames("card", `card--${color}`, {
        "card--repeat": isRepeating,
        "card--deadline": isExpired,
      })}
    >
      <div className="card__form">
        <div className="card__inner">
          <div className="card__control">
            <button
              type="button"
              className="card__btn card__btn--edit"
              onClick={onEditBtnClick}
            >
              edit
            </button>
            <button
              type="button"
              className={classnames("card__btn", "card__btn--archive", {
                "card__btn--disabled": task.isArchived,
              })}
              onClick={onArchiveBtnClick}
            >
              archive
            </button>
            <button
              type="button"
              className={classnames("card__btn", "card__btn--favorites", {
                "card__btn--disabled": task.isFavorite,
              })}
              onClick={onFavoriteBtnClick}
            >
              favorites
            </button>
          </div>

          <div className="card__color-bar">
            <svg className="card__color-bar-wave" width="100%" height="10">
              <use xlinkHref="#wave" />
            </svg>
          </div>

          <div className="card__textarea-wrap">
            <p className="card__text">{description}</p>
          </div>

          <div className="card__settings">
            <div className="card__details">
              {dueDate && (
                <div className="card__dates">
                  <div className="card__date-deadline">
                    <p className="card__input-deadline-wrap">
                      <span className="card__date">
                        {moment(dueDate).format("DD MMMM")}
                      </span>
                      <span className="card__time">
                        {moment(dueDate).format("kk:mm")}
                      </span>
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default Task;
