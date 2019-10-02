import { DispatchT } from "./storeType";

const initialState = { balance: 100 };

export function balanceReducer(
  state: any = initialState,
  action: { type: DispatchT; payload: number }
) {
  switch (action.type) {
    case DispatchT.deposit:
      return {
        ...state,
        balance: state.balance + action.payload
      };
    case DispatchT.withdraw:
      return {
        ...state,
        balance: state.balance - action.payload
      };
    default:
      return state;
  }
}
