import { PlusIcon } from "@heroicons/react/outline";
import { Dispatch, SetStateAction, useCallback, useEffect } from "react";
import styled from "styled-components";
import { ICircle, ICircleList } from "../pages/index";

interface Props {
  nameList: string;
  circleList: ICircleList[];
  circles: ICircle[];
  setNameList: Dispatch<SetStateAction<string>>;
  setCircleList: Dispatch<SetStateAction<ICircleList[] | []>>;
  setCircles: Dispatch<SetStateAction<ICircle[]>>;
  setActiveCircle: Dispatch<SetStateAction<ICircle>>;
}

export default function NameForm({
  nameList,
  circleList,
  circles,
  setNameList,
  setCircleList,
  setCircles,
  setActiveCircle,
}: Props) {
  const saveInLocalStorage = useCallback(() => {
    localStorage.setItem("circleList", JSON.stringify(circleList));
  }, [circleList]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!nameList) return;
    const circleListObj = { nameList, circles, id: Date.now().toString() };
    setCircleList([...circleList, circleListObj]);
    setNameList("");
    setCircles([
      { id: "1", color: "" },
      { id: "2", color: "" },
      { id: "3", color: "" },
      { id: "4", color: "" },
      { id: "5", color: "" },
    ]);
    setActiveCircle({ id: "", color: "" });
  };

  useEffect(() => {
    saveInLocalStorage();
  }, [saveInLocalStorage]);

  return (
    <section>
      <Container>
        <form onSubmit={handleSubmit}>
          <Label htmlFor="name">Name</Label>
          <FlexInput>
            <Input
              placeholder="Website color scheme"
              type="text"
              id="name"
              name="name"
              value={nameList}
              onChange={(e) => setNameList(e.target.value)}
            />
            <Button type="submit">
              <AddIcon />
            </Button>
          </FlexInput>
        </form>
      </Container>
    </section>
  );
}

const AddIcon = styled(PlusIcon)`
  width: 30px;
`;
const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 67px;
  height: 49px;
  background: #ffffff;
  border: 4px solid #ffffff;
  border-radius: 9px;
`;
const Label = styled.label`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
`;
const Input = styled.input`
  width: 274px;
  border: 4px solid #ffffff;
  border-radius: 9px;
  outline: none;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  padding: 10px;
  color: #ffffff;
  background-color: #2c2c2c;

  &:placeholder-shown {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 21px;
    padding: 10px;
    color: #ffffff;
  }
`;
const FlexInput = styled.div`
  display: flex;
  margin-top: 8px;
  gap: 10px;
`;
const Container = styled.div`
  margin-top: 30px;
  width: 280px;

  @media (min-width: 390px) {
    font-size: 24px;
    width: 100%;
  }
  @media (min-width: 768px) {
    margin-top: 0;
  }
`;
