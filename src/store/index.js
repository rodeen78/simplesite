import { combineReducers } from "redux";
import { appUser } from "./app-user/app-user";
import { appStore } from "./app-store/app-store";

export const Namespace = {
  USER: "user",
  STORE: "store",
};

export default combineReducers({
  [Namespace.USER]: appUser,
  [Namespace.STORE]: appStore,
});
