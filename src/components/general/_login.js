import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { TextField } from "office-ui-fabric-react/lib/TextField";
import { PrimaryButton } from "office-ui-fabric-react/lib/Button";
import { Loader } from "../ui/";
import Styled from "styled-components";
import { login } from "../../actions/account";

const Container = Styled.div`
  max-width: 400px;
`;
const Spacer = Styled.div`
  height: 15px;
`;

class Component extends PureComponent {
  state = { email: "", password: "", loading: false };

  handleSubmit = () => {
    const { email, password } = this.state;

    if (email.length < 1) {
      alert("Enter an email");
      return;
    }
    if (password.length < 1) {
      alert("Enter a password");
      return;
    }

    this.setState(() => ({ loading: true }), this.props.login(this.state));
  };

  handleChange = name => val => {
    this.setState(() => {
      const updates = {};
      updates[name] = val;
      return updates;
    });
  };

  render() {
    if (this.state.loading) {
      return <Loader />;
    }
    return (
      <Container>
        <TextField
          label="Email"
          required={true}
          onChanged={this.handleChange("email")}
        />
        <TextField
          label="Password"
          required={true}
          onChanged={this.handleChange("password")}
        />
        <Spacer />
        <PrimaryButton text="Submit" onClick={this.handleSubmit} />
      </Container>
    );
  }
}

function actionsMap(dispatch) {
  return {
    login: ({ email, password }) => () => dispatch(login(email, password))
  };
}

export default connect(null, actionsMap)(Component);
