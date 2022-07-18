import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { Categories, CategoriesGroupState, categoryState } from "../atoms";

const SelectDiv = styled.div`
  margin-top: 15px;
  display: flex;
  align-items: center;
`;

function SelectToDo() {
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };
  const [categoriesGroup, setCategoriesGroup] =
    useRecoilState(CategoriesGroupState);
  console.log(categoriesGroup);

  return (
    <SelectDiv>
      <select onInput={onInput}>
        {categoriesGroup.map((v) => (
          <option key={v} value={v}>
            {v}
          </option>
        ))}
      </select>
    </SelectDiv>
  );
}

export default SelectToDo;
