import Image from "next/image";
import styled from "styled-components";

export default function Header() {
  return (
    <Wrapper>
      <Image
        width={28}
        height={28}
        objectFit="contain"
        src={"/paletteIcon.png"}
        alt="logo"
      />
      <Title>Color palette generator</Title>
    </Wrapper>
  );
}

const Title = styled.h1`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 36px;

  @media (min-width: 390px) {
    font-size: 24px;
  }

  @media (min-width: 768px) {
    font-size: 36px;
    line-height: 54px;
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
  padding-top: 30px;
`;
