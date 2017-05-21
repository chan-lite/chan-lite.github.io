import React, { PureComponent } from "react";
import { Link, Loader } from "../../components/ui/";
// import { AnimateOnChange } from "../../components/general/";
import { Row, ButtonContainer } from "./styles";
import { SearchBox } from "office-ui-fabric-react/lib/SearchBox";
import { CompoundButton } from "office-ui-fabric-react/lib/Button";

function textChange(text) {
  return function(state) {
    return { userInput: text };
  };
}

function filterBoards(boards, userInput) {
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

function getRow({ board, title }, index) {
  return (
    <ButtonContainer key={index}>
      <Link href={`/${board}`}>
        <CompoundButton description={title}>
          {`/${board}/`}
        </CompoundButton>
      </Link>
    </ButtonContainer>
  );
}

export default class extends PureComponent {
  state = { userInput: "" };

  render() {
    const boards = filterBoards(this.props.boards, this.state.userInput);

    return (
      <div className="buttonRootContainer">
        <SearchBox onChange={e => this.setState(textChange(e))} />
        {boards.length > 0 || this.state.userInput !== ""
          ? <Row> {boards.map(getRow)} </Row>
          : <Loader />}
      </div>
    );
  }
}
