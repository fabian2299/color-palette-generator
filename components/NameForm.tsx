import { PlusIcon } from "@heroicons/react/outline";
import axios from "axios";
import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { ICircle, ICircleList } from "../pages/index";

interface Props {
  nameList: string;
  circles: ICircle[];
  circleList: ICircleList[];
  setNameList: Dispatch<SetStateAction<string>>;
  setCircles: Dispatch<SetStateAction<ICircle[]>>;
  setActiveCircle: Dispatch<SetStateAction<ICircle>>;
  setCircleList: Dispatch<SetStateAction<ICircleList[]>>;
}

export default function NameForm({
  nameList,
  circles,
  setNameList,
  circleList,
  setCircles,
  setActiveCircle,
  setCircleList,
}: Props) {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!nameList) return;
    const circleListObj = { nameList, circles };
    try {
      const { data } = await axios.post(
        `${process.env.API_URL}/api`,
        circleListObj
      );

      setCircleList([...circleList, data]);
    } catch (error) {
      console.log(error);
    }
    setNameList("");
    setCircles([
      { circleId: "1", color: "" },
      { circleId: "2", color: "" },
      { circleId: "3", color: "" },
      { circleId: "4", color: "" },
      { circleId: "5", color: "" },
    ]);
    setActiveCircle({ circleId: "", color: "" });
  };

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
  }
  @media (min-width: 768px) {
    margin-top: 0;
    width: 100%;
  }
`;
