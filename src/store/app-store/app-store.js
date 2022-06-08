import { ActionType } from "./actions";
import { FilterName } from "../../utils/filters";
import { ComparatorName } from "../../utils/sort";

const initialState = {
  tasks: undefined,
  isLoading: false,
  error: null,

  editingTaskId: -1,
  filter: FilterName.ALL,
  sort: ComparatorName.DEFAULT,
  isNewTaskEditing: false,
};

const appStore = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.FETCH_TASKS_START: {
      return { ...state, isLoading: true, error: null };
    }
    case ActionType.FETCH_TASKS_SUCCESS: {
      const tasks = action.payload;
      return { ...state, isLoading: false, error: null, tasks };
    }
    case ActionType.FETCH_TASKS_ERROR: {
      return { ...state, isLoading: false, error: action.payload };
    }

    case ActionType.EDIT_TASK_START: {
      return { ...state, isLoading: true, error: null };
    }
    case ActionType.EDIT_TASK_SUCCESS: {
      return { ...state, isLoading: false, error: null };
    }
    case ActionType.EDIT_TASK_ERROR: {
      return { ...state, isLoading: false, error: action.payload };
    }

    case ActionType.POST_TASK_START: {
      return { ...state, isLoading: true, error: null };
    }
    case ActionType.POST_TASK_SUCCESS: {
      return { ...state, isLoading: false, error: null };
    }
    case ActionType.POST_TASK_ERROR: {
      return { ...state, isLoading: false, error: action.payload };
    }

    case ActionType.DELETE_TASK_START: {
      return { ...state, isLoading: true, error: null };
    }
    case ActionType.DELETE_TASK_SUCCESS: {
      return { ...state, isLoading: false, error: null };
    }
    case ActionType.DELETE_TASK_ERROR: {
      return { ...state, isLoading: false, error: action.payload };
    }

    case ActionType.LOAD_TASK: {
      const currentTasks = state.tasks.slice();
      const taskToLoad = action.payload;

      const foundTaskIndex = currentTasks.findIndex(
        (t) => t._id === taskToLoad._id
      );

      if (foundTaskIndex === -1) {
        return { ...state, tasks: [taskToLoad, ...currentTasks] };
      }

      currentTasks[foundTaskIndex] = taskToLoad;
      return { ...state, tasks: currentTasks };
    }
    case ActionType.SET_TASK_TO_EDIT: {
      const { id, isNew = false } = action.payload;
      if (!isNew) {
        return {
          ...state,
          editingTaskId: id,
          isNewTaskEditing: true,
        };
      }

      return {
        ...state,
        editingTaskId: id,
        filter: FilterName.ALL,
        sort: ComparatorName.DEFAULT,
        isNewTaskEditing: false,
      };
    }
    case ActionType.REMOVE_TASK: {
      const updatedTasks = state.tasks
        .slice()
        .filter((t) => t._id !== action.payload);
      return { ...state, tasks: updatedTasks };
    }
    case ActionType.CHANGE_FILTER: {
      return { ...state, filter: action.payload };
    }
    case ActionType.CHANGE_SORT: {
      return { ...state, sort: action.payload };
    }
    default:
      return state;
  }
};

export { appStore };
