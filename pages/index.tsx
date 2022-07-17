import { useState } from "react";
import { CompactPicker } from "react-color";
import styled from "styled-components";
import Circles from "../components/Circles";
import Header from "../components/Header";
import NameForm from "../components/NameForm";
import PaletteList from "../components/PaletteList";

export interface ICircle {
  id: string;
  color: string;
}

export interface ICircleList {
  circles: ICircle[];
  nameList: string;
  id: string;
}

export default function Home() {
  const [compactPickerColor, setCompactPickerColor] = useState("#FCDC00");
  const [activeCircle, setActiveCircle] = useState<ICircle>({
    id: "",
    color: "",
  });
  const [circles, setCircles] = useState<ICircle[]>([
    { id: "1", color: "" },
    { id: "2", color: "" },
    { id: "3", color: "" },
    { id: "4", color: "" },
    { id: "5", color: "" },
  ]);
  const [nameList, setNameList] = useState("");
  const [circleList, setCircleList] = useState<ICircleList[] | []>(() => {
    if (typeof window !== "undefined") {
      const localStorageCircleList = localStorage.getItem("circleList");
      if (localStorageCircleList) {
        return JSON.parse(localStorageCircleList);
      }
    }
    return [];
  });

  const handleChangeColor = (color: string) => {
    setCompactPickerColor(color);
    setCircles(() => {
      const newCircles = circles.map((circle) =>
        circle.id === activeCircle.id ? { ...circle, color } : circle
      );
      return newCircles;
    });
  };

  return (
    <Container>
      <Header />

      <Circles
        circles={circles}
        activeCircle={activeCircle}
        setActiveCircle={setActiveCircle}
      />

      <Flex>
        <CompactWrapper>
          <CompactPicker
            color={compactPickerColor}
            onChange={(color) => handleChangeColor(color.hex)}
          />
        </CompactWrapper>

        <NameForm
          nameList={nameList}
          setNameList={setNameList}
          setActiveCircle={setActiveCircle}
          setCircles={setCircles}
          setCircleList={setCircleList}
          circleList={circleList}
          circles={circles}
        />
      </Flex>

      <PaletteList
        circleList={circleList}
        setCircleList={setCircleList}
        setCircles={setCircles}
      />
    </Container>
  );
}

const Container = styled.main`
  color: white;
  background-color: #2c2c2c;
  width: 100%;
  max-width: 1920px;
  min-height: 100vh;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  padding: 20px;
  align-items: center;
`;

const CompactWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Flex = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (min-width: 768px) {
    flex-direction: row;
    gap: 90px;
    width: 100%;
    justify-content: center;
    margin-top: 70px;
  }
`;
