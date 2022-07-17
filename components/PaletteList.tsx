import { TrashIcon } from "@heroicons/react/outline";
import axios from "axios";
import type { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { ICircle, ICircleList } from "../pages/index";

interface Props {
  setCircles: Dispatch<SetStateAction<ICircle[]>>;
  circleList: ICircleList[];
  setCircleList: Dispatch<SetStateAction<ICircleList[]>>;
}

export default function PaletteList({
  circleList,
  setCircleList,
  setCircles,
}: Props) {
  const deletePalette = async (id: string) => {
    try {
      await axios.delete(`${process.env.API_URL}/api/{id}`);
      setCircleList(circleList.filter((circle) => circle.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickPalette = (id: string) => {
    const circles = circleList.find((circle) => circle.id === id)!.circles;
    const newCircles = circles.map(({ circleId, color }) => ({
      circleId,
      color,
    }));
    setCircles(newCircles);
  };

  return (
    <Section>
      <Container>
        <Title>Saved palettes</Title>
        <List>
          {circleList.map(({ id, nameList, circles }) => (
            <div key={id}>
              <NameDeleteWrapper>
                <Name>{nameList}</Name>
                <DeleteIcon onClick={() => deletePalette(id)} />
              </NameDeleteWrapper>

              <CircleListDiv onClick={() => handleClickPalette(id)}>
                {circles.map(({ circleId, color }) => (
                  <Circle key={circleId} color={color} />
                ))}
              </CircleListDiv>
            </div>
          ))}
        </List>
      </Container>
    </Section>
  );
}

const Circle = styled.div`
  width: 30px;
  height: 30px;
  border: 3px solid #ffffff;
  box-shadow: 0px 0px 2px 2px rgba(0, 0, 0, 0.15);
  border-radius: 50%;
  background: ${(props) => props.color};
  @media (min-width: 390px) {
    width: 40px;
    height: 40px;
  }
`;

const Name = styled.p`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  margin-bottom: 9px;
`;

const Section = styled.section`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 40px;
  @media (min-width: 768px) {
    margin-top: 100px;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1200px;
  justify-content: center;
`;

const Title = styled.h2`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 30px;
  margin-bottom: 24px;

  @media (min-width: 768px) {
    font-size: 24px;
    line-height: 36px;
    margin-bottom: 38px;
  }
`;

const NameDeleteWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  padding-inline: 15px;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 50px;
  }
`;
const CircleListDiv = styled.div`
  display: flex;
  gap: 28px;
  background: #151515;
  border-radius: 10px;
  padding: 12px;
  justify-content: center;
  cursor: pointer;
`;

const DeleteIcon = styled(TrashIcon)`
  cursor: pointer;
  height: 20px;
  width: 20px;
`;
