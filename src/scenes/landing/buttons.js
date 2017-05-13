import React, { PureComponent } from "react";
import { Link } from "../../components/ui/";
import { Row, ButtonContainer } from "./styles";

import {
  CompoundButton,
  IButtonProps
} from "office-ui-fabric-react/lib/Button";
import { SearchBox } from "office-ui-fabric-react/lib/SearchBox";

function applyStateTextChange(text) {
  return function(state) {
    return { userInput: text };
  };
}

function filterBoardsBardOnUserInput(boards, userInput) {
  if (userInput === "") {
    return boards;
  } else {
    userInput = userInput.toLowerCase();
    return boards.filter(({ board, title }) => {
      return (
        `/${board}/`.toLowerCase().indexOf(userInput) > -1 ||
        title.toLowerCase().indexOf(userInput) > -1
      );
    });
  }
}

export default class extends PureComponent {
  state = {
    userInput: ""
  };

  handleChange = text => {
    this.setState(applyStateTextChange(text));
  };

  render() {
    return (
      <div className="buttonRootContainer">
        <SearchBox onChange={this.handleChange} />
        <Row>
          {filterBoardsBardOnUserInput(
            this.props.boards,
            this.state.userInput
          ).map(({ board, title }, index) => {
            return (
              <ButtonContainer key={index}>
                <Link href={`/${board}`}>
                  <CompoundButton description={title}>
                    {`/${board}/`}
                  </CompoundButton>
                </Link>
              </ButtonContainer>
            );
          })}
        </Row>
      </div>
    );
  }
}
