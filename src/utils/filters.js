import moment from "moment";

export const FilterName = {
  ALL: "ALL",
  OVERDUE: "OVERDUE",
  TODAY: "TODAY",
  FAVORITES: "FAVORITES",
  REPEATING: "REPEATING",
  ARCHIVE: "ARCHIVE",
};

export const Filter = {
  [FilterName.ALL]: (t) => t,
  [FilterName.OVERDUE]: (t) => moment(t.dueDate).isBefore(moment()),
  [FilterName.TODAY]: (t) => moment(t.dueDate).isSame(moment(), "d"),
  [FilterName.FAVORITES]: (t) => t.isFavorite,
  [FilterName.REPEATING]: (t) => Object.values(t.repeatingDays).some((d) => d),
  [FilterName.ARCHIVE]: (t) => t.isArchived,
};
