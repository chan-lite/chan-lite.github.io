import React, { PureComponent } from "react";
import Styled from "styled-components";
import { Link, Loader } from "../../components/ui/";
// import { AnimateOnChange } from "../../components/general/";
import { Row, ButtonContainer } from "./styles";
import { SearchBox } from "office-ui-fabric-react/lib/SearchBox";
import { CompoundButton } from "office-ui-fabric-react/lib/Button";

const Empty = Styled.h1`
  text-align: center;
  padding: 50px 0;
  font-size: 18px;
  text-transform: lowercase;
  font-weight: normal;
`;

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

function getRow({ board, title, linkPrepend = "/" }, index) {
  return (
    <ButtonContainer key={index}>
      <Link href={`${linkPrepend}${board}`}>
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

    let notLoading = boards.length > 0 || this.state.userInput !== "";

    const showEmptyMessage =
      typeof this.props.loadingSavedComplete !== "undefined" &&
      this.props.loadingSavedComplete &&
      boards.length === 0;

    if (showEmptyMessage) {
      notLoading = true;
    }

    return (
      <div className="buttonRootContainer">
        <SearchBox onChange={e => this.setState(textChange(e))} />
        {notLoading
          ? <Row> {boards.map(getRow)} </Row>
          : <Loader checkLogin={this.props.checkLogin} />}
        {showEmptyMessage ? <Empty>Nothing to see here</Empty> : null}
      </div>
    );
  }
}
