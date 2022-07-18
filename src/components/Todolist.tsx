import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { toDoSelector, toDoState } from "../atoms";
import CreateToDo from "./CreateToDo";
import SelectToDo from "./SelectToDo";
import ToDo from "./ToDo";

const ToDoListDiv = styled.div`
  display: flex;
  max-width: 600px;
  justify-content: flex-end;
  text-align: center;
  padding-top: 10px;
`;
const Container = styled.div`
  padding: 0px 20px;
  max-width: 600px;
  margin: 0 auto;
`;
const Title = styled.h1`
  font-size: 60px;
  text-align: center;
`;
const SelectAndCreateDiv = styled.div`
  padding: 5px;
  display: flex;
  justify-content: space-between;
`;
function Todolist() {
  const toDos = useRecoilValue(toDoSelector);

  return (
    <Container>
      <Title>To Dos</Title>
      <hr />
      <SelectAndCreateDiv>
        <SelectToDo />
        <CreateToDo />
      </SelectAndCreateDiv>
      <ToDoListDiv>
        <ul>
          {toDos.map((toDo) => (
            <ToDo key={toDo.id} {...toDo} />
          ))}
        </ul>
      </ToDoListDiv>
    </Container>
  );
}

export default Todolist;
