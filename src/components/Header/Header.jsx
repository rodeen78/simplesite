import { useDispatch } from "react-redux";

import { loadTask, setTaskToEdit } from "../../store/app-store/actions";
import { DEFAULT_TASK } from "../../utils/conts";

const createNewTask = () => {
  return {
    _id: "new task",
    createdAt: new Date().toISOString(),
    ...DEFAULT_TASK,
  };
};

const Header = () => {
  const dispatch = useDispatch();

  const onAddTaskClick = () => {
    const newTask = createNewTask();
    dispatch(loadTask(newTask));
    dispatch(setTaskToEdit({ id: newTask._id, isNew: true }));
  };

  return (
    <>
      <section className="main__control control container">
        <h1 className="control__title">TASKY</h1>
        <section className="control__btn-wrap">
          <button
            className="control__label control__label--new-task"
            onClick={onAddTaskClick}
          >
            + ADD NEW TASK
          </button>
        </section>
      </section>
    </>
  );
};

export default Header;
