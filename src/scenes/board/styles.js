import Styled from "styled-components";

export const ContainerWithHover = Styled.div`
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 2px;

  &:hover {
    background-color: rgba(255, 255, 255, 0.15);
  }
`;

export const ContainerInner = Styled.div`
  padding: 15px;
  max-height: 500px;
`;
