export const ActionType = {
  FETCH_TASKS_START: "store/fetch_tasks_start",
  FETCH_TASKS_SUCCESS: "store/fetch_tasks_success",
  FETCH_TASKS_ERROR: "store/fetch_tasks_error",

  EDIT_TASK_START: "store/edit_task_start",
  EDIT_TASK_SUCCESS: "store/edit_task_success",
  EDIT_TASK_ERROR: "store/edit_task_error",

  POST_TASK_START: "store/post_task_start",
  POST_TASK_SUCCESS: "store/post_task_success",
  POST_TASK_ERROR: "store/post_task_error",

  DELETE_TASK_START: "store/delete_task_start",
  DELETE_TASK_SUCCESS: "store/delete_task_success",
  DELETE_TASK_ERROR: "store/delete_task_error",

  LOAD_TASK: "store/load_task",
  REMOVE_TASK: "store/remove_task",
  SET_TASK_TO_EDIT: "store/set_task_to_edit",
  CHANGE_FILTER: "store/change_filter",
  CHANGE_SORT: "store/change_sort",
};

export const fetchTasks = () => (dispatch, getState, api) => {
  dispatch(fetchTasksStart());
  return api
    .get()
    .then(({ data }) => dispatch(fetchTasksSuccess(data)))
    .catch((err) => {
      dispatch(fetchTasksError(err.message));
    });
};
export const fetchTasksStart = () => ({
  type: ActionType.FETCH_TASKS_START,
});
export const fetchTasksSuccess = (payload) => ({
  type: ActionType.FETCH_TASKS_SUCCESS,
  payload,
});
export const fetchTasksError = (payload) => ({
  type: ActionType.FETCH_TASKS_ERROR,
  payload,
});

export const editTask = (updatedTask) => (dispatch, getState, api) => {
  dispatch(editTaskStart());
  return api
    .put(updatedTask._id, updatedTask)
    .then(({ data }) => {
      dispatch(editTaskSuccess());
      dispatch(loadTask(data));
    })
    .catch((err) => {
      dispatch(editTaskError(err.message));
    });
};
export const editTaskStart = () => ({
  type: ActionType.EDIT_TASK_START,
});
export const editTaskSuccess = () => ({
  type: ActionType.EDIT_TASK_SUCCESS,
});
export const editTaskError = (payload) => ({
  type: ActionType.EDIT_TASK_ERROR,
  payload,
});

export const postTask = (newTask) => (dispatch, getState, api) => {
  dispatch(postTaskStart());
  return api
    .post("", newTask)
    .then(({ data }) => {
      dispatch(postTaskSuccess());
      dispatch(loadTask(data));
    })
    .catch((err) => {
      dispatch(postTaskError(err.message));
    });
};
export const postTaskStart = () => ({
  type: ActionType.POST_TASK_START,
});
export const postTaskSuccess = () => ({
  type: ActionType.POST_TASK_SUCCESS,
});
export const postTaskError = (payload) => ({
  type: ActionType.POST_TASK_ERROR,
  payload,
});

export const deleteTask = (taskId) => (dispatch, getState, api) => {
  dispatch(deleteTaskStart());
  return api
    .delete(taskId)
    .then(({ data }) => {
      dispatch(deleteTaskSuccess());
      dispatch(removeTask(data));
    })
    .catch((err) => {
      dispatch(deleteTaskError(err.message));
    });
};
export const deleteTaskStart = () => ({
  type: ActionType.DELETE_TASK_START,
});
export const deleteTaskSuccess = () => ({
  type: ActionType.DELETE_TASK_SUCCESS,
});
export const deleteTaskError = (payload) => ({
  type: ActionType.DELETE_TASK_ERROR,
  payload,
});

export const loadTask = (payload) => ({
  type: ActionType.LOAD_TASK,
  payload,
});

export const setTaskToEdit = (payload) => ({
  type: ActionType.SET_TASK_TO_EDIT,
  payload,
});

export const removeTask = (payload) => ({
  type: ActionType.REMOVE_TASK,
  payload,
});

export const changeFilter = (payload) => ({
  type: ActionType.CHANGE_FILTER,
  payload,
});

export const changeSort = (payload) => ({
  type: ActionType.CHANGE_SORT,
  payload,
});
