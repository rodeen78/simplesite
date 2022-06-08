import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getFilter, getTasks } from "../../store/app-store/selectors";

import { Filter, FilterName } from "../../utils/filters";
import { changeFilter } from "../../store/app-store/actions";

const FilterComponent = () => {
  const dispatch = useDispatch();
  const tasks = useSelector(getTasks, shallowEqual);
  const filter = useSelector(getFilter, shallowEqual);

  const expiredTasksCount = tasks ? tasks.filter(Filter.OVERDUE).length : "...";
  const todaysTasksCount = tasks ? tasks.filter(Filter.TODAY).length : "...";
  const favoriteTasksCount = tasks
    ? tasks.filter(Filter.FAVORITES).length
    : "...";
  const repeatingTasksCount = tasks
    ? tasks.filter(Filter.REPEATING).length
    : "...";
  const archivedTasksCount = tasks
    ? tasks.filter(Filter.ARCHIVE).length
    : "...";

  const onFilterChange = (filterName) => () => {
    dispatch(changeFilter(filterName));
  };

  return (
    <section className="main__filter filter container">
      <input
        type="radio"
        id="filter__all"
        className="filter__input visually-hidden"
        name="filter"
        checked={filter === FilterName.ALL}
        onChange={onFilterChange(FilterName.ALL)}
      />
      <label htmlFor="filter__all" className="filter__label">
        All{" "}
        <span className="filter__all-count">
          {tasks ? tasks.length : "..."}
        </span>
      </label>

      <input
        type="radio"
        id="filter__overdue"
        className="filter__input visually-hidden"
        name="filter"
        disabled={!expiredTasksCount}
        checked={filter === FilterName.OVERDUE}
        onChange={onFilterChange(FilterName.OVERDUE)}
      />
      <label htmlFor="filter__overdue" className="filter__label">
        Overdue{" "}
        <span className="filter__overdue-count">{expiredTasksCount}</span>
      </label>

      <input
        type="radio"
        id="filter__today"
        className="filter__input visually-hidden"
        name="filter"
        disabled={!todaysTasksCount}
        checked={filter === FilterName.TODAY}
        onChange={onFilterChange(FilterName.TODAY)}
      />
      <label htmlFor="filter__today" className="filter__label">
        Today <span className="filter__today-count">{todaysTasksCount}</span>
      </label>

      <input
        type="radio"
        id="filter__favorites"
        className="filter__input visually-hidden"
        name="filter"
        disabled={!favoriteTasksCount}
        checked={filter === FilterName.FAVORITES}
        onChange={onFilterChange(FilterName.FAVORITES)}
      />
      <label htmlFor="filter__favorites" className="filter__label">
        Favorites{" "}
        <span className="filter__favorites-count">{favoriteTasksCount}</span>
      </label>

      <input
        type="radio"
        id="filter__repeating"
        className="filter__input visually-hidden"
        name="filter"
        disabled={!repeatingTasksCount}
        checked={filter === FilterName.REPEATING}
        onChange={onFilterChange(FilterName.REPEATING)}
      />
      <label htmlFor="filter__repeating" className="filter__label">
        Repeating{" "}
        <span className="filter__repeating-count">{repeatingTasksCount}</span>
      </label>

      <input
        type="radio"
        id="filter__archive"
        className="filter__input visually-hidden"
        name="filter"
        disabled={!archivedTasksCount}
        checked={filter === FilterName.ARCHIVE}
        onChange={onFilterChange(FilterName.ARCHIVE)}
      />
      <label htmlFor="filter__archive" className="filter__label">
        Archive{" "}
        <span className="filter__archive-count">{archivedTasksCount}</span>
      </label>
    </section>
  );
};

export default FilterComponent;
