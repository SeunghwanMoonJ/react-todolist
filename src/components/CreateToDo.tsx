import { appendFileSync } from "fs";
import React, { Fragment } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import {
  Categories,
  CategoriesGroupState,
  categoryState,
  IToDos,
  toDoState,
} from "../atoms";

interface IForm {
  data: string;
}

const FormDiv = styled.div`
  display: flex;
  align-items: flex-end;
`;

const CategoryDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 10px;
`;

const SpanButtonDiv = styled.div`
  display: flex;
  justify-content: flex-end;
`;
const Span = styled.span`
  text-align: center;
  line-height: 25px;
  height: auto;
  margin-right: 10px;
`;
function CreateToDo() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const category = useRecoilValue(categoryState);

  const [categoriesGroup, setCategoriesGroup] =
    useRecoilState(CategoriesGroupState);

  const onCategorySubmit = (newCategory: string) => {
    setCategoriesGroup((prev) => {
      const newCategorisGroup = [newCategory, ...prev];
      return newCategorisGroup;
    });
  };

  const onSubmit = ({ data }: IForm) => {
    category === "New Category"
      ? setCategoriesGroup((prev) => {
          if (prev.includes(data)) {
            alert("Category is already exist");
            return prev;
          }
          const newCategorisGroup = [data, ...prev];
          console.log(newCategorisGroup);
          return newCategorisGroup;
        })
      : setToDos((prevToDos) => [
          // category: category 는 category 로 쓸 수 있다.
          { text: data, id: Date.now(), category },
          ...prevToDos,
        ]);
    setValue("data", "");
  };

  const onClick = (event: React.FormEvent<HTMLButtonElement>) => {
    const selectedCategory = event.currentTarget.value as any;
    setCategoriesGroup((prevGroup) =>
      prevGroup.filter((prev) => prev !== selectedCategory)
    );
  };

  if (category === "New Category") {
    return (
      <FormDiv>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            size={28}
            {...register("data", {
              required: true,
              validate: {
                noYok: (value) =>
                  value.includes("sibal" || "geseki" || "18")
                    ? "No yok is allowed"
                    : true,
              },
            })}
          />
          <button>Add a Category</button>
        </form>
      </FormDiv>
    );
  }
  if (category === "Remove Category") {
    return (
      <CategoryDiv>
        {categoriesGroup.map((v) => {
          if (v === "New Category") return null;
          if (v === "Remove Category") return null;
          if (v === "To Do") return null;
          if (v === "Doing") return null;
          if (v === "Done") return null;

          return (
            <SpanButtonDiv key={v}>
              <Span>{v}</Span>
              <button value={v} onClick={onClick}>
                Remove
              </button>
            </SpanButtonDiv>
          );
        })}
      </CategoryDiv>
    );
  }
  return (
    <FormDiv>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          size={28}
          {...register("data", {
            required: true,
            validate: {
              noYok: (value) =>
                value.includes("sibal" || "geseki" || "18")
                  ? "No yok is allowed"
                  : true,
            },
          })}
        />
        <button>Add a {category}</button>
      </form>
    </FormDiv>
  );

  // return (
  //   <>
  //     {category === "New Category" ? (
  //       <FormDiv>
  //         <form onSubmit={handleSubmit(onSubmit)}>
  //           <input
  //             size={28}
  //             {...register("data", {
  //               required: true,
  //               validate: {
  //                 noYok: (value) =>
  //                   value.includes("sibal" || "geseki" || "18")
  //                     ? "No yok is allowed"
  //                     : true,
  //               },
  //             })}
  //           />
  //           <button>Add a Category</button>
  //         </form>
  //       </FormDiv>
  //     ) : (
  //       <FormDiv>
  //         <form onSubmit={handleSubmit(onSubmit)}>
  //           <input
  //             size={28}
  //             {...register("data", {
  //               required: true,
  //               validate: {
  //                 noYok: (value) =>
  //                   value.includes("sibal" || "geseki" || "18")
  //                     ? "No yok is allowed"
  //                     : true,
  //               },
  //             })}
  //           />
  //           <button>Add a {category}</button>
  //         </form>
  //       </FormDiv>
  //     )}
  //   </>
  // );
}

export default CreateToDo;
