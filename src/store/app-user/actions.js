export const ActionType = {
  SAY_HELLO: `SAY_HELLO`,
};

export const sayHello = (hello) => ({
  type: ActionType.SAY_HELLO,
  payload: hello,
});
