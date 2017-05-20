import React, { PureComponent } from "react";
import { Link, Loader } from "../../components/ui/";
// import { AnimateOnChange } from "../../components/general/";
import { Row, ButtonContainer } from "./styles";
import { SearchBox } from "office-ui-fabric-react/lib/SearchBox";
import { CompoundButton } from "office-ui-fabric-react/lib/Button";

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
    const boards = filterBoardsBardOnUserInput(
      this.props.boards,
      this.state.userInput
    );

    return (
      <div className="buttonRootContainer">
        <SearchBox onChange={this.handleChange} />

        {boards.length > 0 || this.state.userInput !== "" ? null : <Loader />}

        <Row>
          {boards.map(({ board, title }, index) => {
            return (
              <ButtonContainer key={index}>
                <Link href={`/${board}`}>
                  {/*<AnimateOnChange propToTriggerChange={title}>*/}
                  <CompoundButton description={title}>
                    {`/${board}/`}
                  </CompoundButton>
                  {/*</AnimateOnChange>*/}
                </Link>
              </ButtonContainer>
            );
          })}
        </Row>
      </div>
    );
  }
}
