import React, { PureComponent } from "react";
import Styled from "styled-components";
import { Spinner, SpinnerSize } from "office-ui-fabric-react/lib/Spinner";
import { connect } from "react-redux";
import { push } from "react-router-redux";

const Wrap = Styled.div`
  padding-top: 150px;
  overflow: hidden;
`;

class Component extends PureComponent {
  componentDidMount() {
    if (this.props.checkLogin && !this.props.token) {
      this.props.home();
    }
  }
  render() {
    return (
      <Wrap>
        <Spinner
          size={SpinnerSize.large}
          label={navigator.onLine ? null : "You appear to be offline"}
        />
      </Wrap>
    );
  }
}

function mapState({ Account }) {
  return {
    token: Account.token
  };
}

function mapDispatch(dispatch) {
  return {
    home: () => dispatch(push("/"))
  };
}

export default connect(mapState, mapDispatch)(Component);
