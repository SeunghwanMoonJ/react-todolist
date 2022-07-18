import { atom, RecoilValue, selector } from "recoil";

// enum 값을 지정해주지 않으면 0, 1, 2... 순으로 자동 입력된다.
// enum 을 사용해서 string 으로 직접 입력하는 부분을 모두 교체해주면 오타에 의한 에러를 강력하게 방지할 수 있다.
export enum Categories {
  "To Do" = "To Do",
  "Doing" = "Doing",
  "Done" = "Done",
  "Category" = "Category",
}

export const CategoriesGroupState = atom<string[]>({
  key: "categoriesGroupState",
  default: ["To Do", "Doing", "Done", "New Category", "Remove Category"],
  effects: [
    ({ setSelf, onSet }) => {
      const todoStoreKey = "CategoriesGroup";
      const savedValue = localStorage.getItem(todoStoreKey);
      if (savedValue != null) {
        setSelf(JSON.parse(savedValue));
      }
      onSet((newValue, _, isReset) => {
        isReset
          ? localStorage.removeItem(todoStoreKey)
          : localStorage.setItem(todoStoreKey, JSON.stringify(newValue));
      });
    },
  ],
});

export interface IToDos {
  text: string;
  id: number;
  category: string;
}

export const toDoState = atom<IToDos[]>({
  key: "toDo",
  default: [],
  effects: [
    ({ setSelf, onSet }) => {
      const todoStoreKey = "Todo";
      const savedValue = localStorage.getItem(todoStoreKey);
      if (savedValue != null) {
        setSelf(JSON.parse(savedValue));
      }
      onSet((newValue, _, isReset) => {
        isReset
          ? localStorage.removeItem(todoStoreKey)
          : localStorage.setItem(todoStoreKey, JSON.stringify(newValue));
      });
    },
  ],
});

export const categoryState = atom<string>({
  key: "category",
  default: "To Do",
});

export const toDoSelector = selector({
  key: "toDoSelector",
  // get 함수는 옵션 객체를 받으면서 호출 { get: GetRecoilValue; getCallback: GetCallback; }
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);
    return toDos.filter((toDos) => toDos.category === category);
  },
});
