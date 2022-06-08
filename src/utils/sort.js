import moment from "moment";

export const ComparatorName = {
  DEFAULT: "DEFAULT",
  DATE_UP: "DATE_UP",
  DATE_DOWN: "DATE_DOWN",
};

export const Comparator = {
  [ComparatorName.DEFAULT]: (a, b) => {
    if (moment(b.createdAt).isBefore(moment(a.createdAt))) return -1;
    if (moment(a.createdAt).isBefore(moment(b.createdAt))) return 1;
    return 0;
  },
  [ComparatorName.DATE_UP]: (a, b) => {
    if (moment(b.dueDate).isBefore(moment(a.dueDate))) return -1;
    if (moment(a.dueDate).isBefore(moment(b.dueDate))) return 1;
    return 0;
  },
  [ComparatorName.DATE_DOWN]: (a, b) => {
    if (moment(b.dueDate).isBefore(moment(a.dueDate))) return 1;
    if (moment(a.dueDate).isBefore(moment(b.dueDate))) return -1;
    return 0;
  },
};
