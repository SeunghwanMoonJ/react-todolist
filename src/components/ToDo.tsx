import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Categories, CategoriesGroupState, IToDos, toDoState } from "../atoms";

function ToDo({ text, id, category }: IToDos) {
  const setToDos = useSetRecoilState(toDoState);
  const categoriesGroup = useRecoilValue(CategoriesGroupState);

  function onClick(event: React.MouseEvent<HTMLButtonElement>) {
    // const name = event.currentTarget.name
    const {
      currentTarget: { name },
    } = event;

    // setRecoil은 현재 state을 함수를 통해 받을 수 있다.
    setToDos((oldToDos) => {
      const currentToDoIndex = oldToDos.findIndex((value) => value.id === id);

      // State를 변화시킬때 기존의 값을 변화하는게 아니라 새로운 변수로 State를 바꿔야 한다.
      // 상태(State)관리툴을 사용할때는 기본적으로 mutate를 사용하지 않고 상태를 변경해야 한다.
      // 그냥 const newTodos = prevTodos 이렇게 하면 prevTodos를 가리키는 주소를 newTodos에 할당하기 때문에
      // newTodos를 변경하면 prevTodos도 같이  변경되어 mutate 된다.
      // 그래서 완전히 새로운 object나 array를 만들어주고 거기에 요소들을 그대로 입력해주기위해 spread 방식으로 변경한다.
      // 다른 방식으로는 assign 등을 사용해 할당 할 수도 있다.
      const newToDo = { text, id, category: name } as IToDos;

      return [
        ...oldToDos.slice(0, currentToDoIndex),
        newToDo,
        ...oldToDos.slice(currentToDoIndex + 1),
      ];
    });
  }

  function onClickFn(newCategory: IToDos["category"]) {
    // 다른 방법으로 배열 교체하기
    setToDos((prevToDos) => {
      return prevToDos.map((toDo: IToDos) =>
        toDo.id === id ? ({ ...toDo, category: newCategory } as IToDos) : toDo
      );
    });
  }
  const onClickRemove = () => {
    setToDos((prevToDos) => {
      return prevToDos.filter((toDo) => toDo.id !== id);
    });
  };

  return (
    <li>
      {/* 이벤트를 통한 인자 전달 */}
      <span>{`${text}  `}</span>
      {categoriesGroup.map((v) => {
        if (v === "New Category") return null;
        if (v === "Remove Category") return null;

        if (v !== category) {
          return (
            <button key={v} name={v} onClick={onClick}>
              ➡ {v}
            </button>
          );
        }
      })}

      <button onClick={onClickRemove}>❌</button>
    </li>
  );
}

export default ToDo;
