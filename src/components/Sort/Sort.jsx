import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getSort } from "../../store/app-store/selectors";
import { changeSort } from "../../store/app-store/actions";
import { ComparatorName } from "../../utils/sort";

const Sort = () => {
  const dispatch = useDispatch();
  const sort = useSelector(getSort, shallowEqual);

  const onSortChange = (sortName) => (evt) => {
    evt.preventDefault();
    if (sort !== sortName) {
      dispatch(changeSort(sortName));
    }
  };

  return (
    <div className="board__filter-list">
      <a
        href="/#"
        className="board__filter"
        data-sort-type="default"
        onClick={onSortChange(ComparatorName.DEFAULT)}
      >
        SORT BY DEFAULT
      </a>
      <a
        href="/#"
        className="board__filter"
        data-sort-type="date-up"
        onClick={onSortChange(ComparatorName.DATE_UP)}
      >
        SORT BY DATE up
      </a>
      <a
        href="/#"
        className="board__filter"
        data-sort-type="date-down"
        onClick={onSortChange(ComparatorName.DATE_DOWN)}
      >
        SORT BY DATE down
      </a>
    </div>
  );
};

export default Sort;
