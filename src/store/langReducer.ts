import { DispatchT } from "./storeType";

const initialState = { lang: "en" };
export function langReducer(
  state: any = initialState,
  action: { type: DispatchT; payload: string }
) {
  switch (action.type) {
    case DispatchT.en:
      return { ...state, lang: action.payload };
    case DispatchT.jp:
      return { ...state, lang: action.payload };
    case DispatchT.cn:
      return { ...state, lang: action.payload };
    default:
      return state;
  }
}

export function changeLanguageAction(flag: string) {
  // useDispatch()({ type: DispatchT, payload: flag });
}
