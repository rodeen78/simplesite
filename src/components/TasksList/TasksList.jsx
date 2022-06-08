import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  getEditingTaskId,
  getFilter,
  getSort,
  getTasks,
} from "../../store/app-store/selectors";

import Task from "../Task/Task";
import EditTask from "../EditTask/EditTask";
import { Filter } from "../../utils/filters";
import { Comparator, ComparatorName } from "../../utils/sort";
import { useEffect, useState } from "react";
import { fetchTasks } from "../../store/app-store/actions";

const TASKS_PER_STEP = 4;
const INITIAL_COUNT = 8;

const TasksList = () => {
  const dispatch = useDispatch();
  const tasks = useSelector(getTasks, shallowEqual);
  const filter = useSelector(getFilter, shallowEqual);
  const sort = useSelector(getSort, shallowEqual);
  const editingTaskId = useSelector(getEditingTaskId, shallowEqual);

  const [shownTasksCount, setShownTasksCount] = useState(INITIAL_COUNT);
  const onShowMoreBtnClick = () =>
    setShownTasksCount((prevState) => prevState + TASKS_PER_STEP);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  if (!tasks) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <div className="board__tasks">
        {tasks
          .filter(Filter[filter])
          .sort((t) => {
            if (sort !== ComparatorName.DEFAULT) {
              if (t.dueDate) return -1;
              if (!t.dueDate) return 1;
              return 0;
            }
            return 1;
          })
          .sort(Comparator[sort])
          .slice(0, shownTasksCount)
          .map((t) => {
            if (editingTaskId !== t._id) {
              return <Task key={`task-${t._id}`} task={t} />;
            }

            return <EditTask key={`task-${t._id}`} />;
          })}
      </div>
      {shownTasksCount < tasks.length && (
        <button
          className="load-more"
          type="button"
          onClick={onShowMoreBtnClick}
        >
          load more
        </button>
      )}
    </>
  );
};

export default TasksList;
