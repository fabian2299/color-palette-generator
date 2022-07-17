import { PlusIcon } from "@heroicons/react/outline";
import type { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { ICircle } from "../pages/index";
import styles from "./Circles.module.css";

interface Props {
  circles: ICircle[];
  activeCircle: ICircle;
  setActiveCircle: Dispatch<SetStateAction<ICircle>>;
}

export default function Circles({
  circles,
  activeCircle,
  setActiveCircle,
}: Props) {
  const handleClick = (id: string) => {
    const circle = circles.find((circle) => circle.id === id);
    setActiveCircle(circle!);
  };

  return (
    <CircleList>
      {circles.map(({ id, color }) => {
        return (
          <Circle
            key={id}
            onClick={() => handleClick(id)}
            color={color}
            className={activeCircle.id === id ? styles.active : styles.inactive}
          >
            {color ? "" : <CircleIcon />}
          </Circle>
        );
      })}
    </CircleList>
  );
}
const CircleIcon = styled(PlusIcon)`
  width: 40px;
`;
const CircleList = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-block: 40px;
  gap: 16px;
  width: 100%;
  @media (min-width: 768px) {
    margin-top: 70px;
    gap: 36px;
  }
`;
const Circle = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  border: 3px solid #ffffff;
  box-shadow: 0px 0px 2px 2px rgba(0, 0, 0, 0.15);
  border-radius: 50%;
  background: ${(props) =>
    props.color ||
    "linear-gradient(130.53deg, #404040 17.47%, #404040 27.71%, #B0B0B0 27.72%, #B0B0B0 36.75%, #404040 36.76%, #404040 45.49%, #B0B0B0 45.5%, #B0B0B0 54.23%, #404040 54.24%, #404040 63.27%, #B0B0B0 63.27%, #B0B0B0 71.71%, #404040 71.71%)"};
`;
