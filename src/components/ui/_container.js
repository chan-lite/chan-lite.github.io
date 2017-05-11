// @flow

import Styled from "styled-components";

export default Styled.div`
  box-shadow: 0 2px 9px 0 rgba(0, 0, 0, 0.5);
  background-color: rgba(255, 255, 255, 0.1);
  margin-bottom: 15px;
  padding: 15px 15px 15px;
  border-radius: 3px;

  @media (max-width: 748px) {
    margin-bottom: 15px;
  }
`;
