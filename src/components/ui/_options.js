import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import Styled, { injectGlobal } from "styled-components";
import {
  Dialog,
  DialogType,
  DialogFooter
} from "office-ui-fabric-react/lib/Dialog";
import {
  PrimaryButton,
  DefaultButton
} from "office-ui-fabric-react/lib/Button";
import { Panel, PanelType } from "office-ui-fabric-react/lib/Panel";
import { Signup, Login } from "../general/";
import { setUserToken } from "../../actions/account";
import { saveThread } from "../../actions/thread";

export const optionsStyles = injectGlobal`
  .actionBtn {
    button {
      min-width: 32px;
      border-radius: 50%;
      padding: 24px 14px;
      box-shadow: 2px 3px 8px #212121;
    }
  }

  .ms-Dialog-main {
    .ms-Dialog-inner {
      padding-bottom: 0;
    }
  }

  .ms-Dialog-action {
    button {
      margin-right: 15px;
      margin-bottom: 15px;
    }
  }
`;

const ButtonWrap = Styled.div`
  position: fixed;
  bottom: 35px;
  right: 50px;
  @media (max-width: 748px) {
    bottom: 25px;
    right: 25px;
  }
`;

const TextLeft = Styled.div`
  text-align: left;
`;

const initialState = { open: false, login: false, create: false };

function toggle({ open }) {
  return { ...initialState, ...{ open: !open } };
}

function toggleAccountOption(val) {
  return state => {
    state = { ...state, ...initialState };
    state[val] = !state[val];
    return state;
  };
}

function resetState() {
  return initialState;
}

class Component extends PureComponent {
  state = initialState;

  componentWillReceiveProps({ signupModal }) {
    if (!signupModal && this.props.signupModal) {
      // signup modal was just dismissed
      this.setState(resetState);
    }
  }

  handleLogout = () => {
    this.props.logout();
    this.setState(resetState);
  };

  handleSaveThread = () => {
    this.props.saveThread(this.props.board, this.props.thread);
  };

  render() {
    return (
      <div className="actionBtn">

        <ButtonWrap>
          <PrimaryButton
            disabled={false}
            iconProps={{ iconName: "Add" }}
            onClick={() => this.setState(toggle)}
          />
        </ButtonWrap>

        <Dialog
          isOpen={this.state.open}
          type={DialogType.normal}
          onDismiss={() => this.setState(toggle)}
          title="Account Options"
          isBlocking={false}
        >
          <DialogFooter>

            {this.props.loggedIn
              ? <TextLeft>
                  <PrimaryButton onClick={this.handleLogout} text="Logout" />

                  {/*View saved threads*/}
                  <DefaultButton
                    onClick={this.props.navigate("/saved")}
                    text="View saved"
                  />

                  {/*
                  save thread button
                  if user is signed in and 
                  if user is on a thread scene
                  */}
                  {typeof this.props.thread !== "undefined" &&
                    typeof this.props.board !== "undefined"
                    ? <DefaultButton
                        onClick={this.handleSaveThread}
                        text="Save thread"
                      />
                    : null}

                </TextLeft>
              : <TextLeft>
                  <PrimaryButton
                    onClick={() => this.setState(toggleAccountOption("login"))}
                    text="Login"
                  />
                  <DefaultButton
                    onClick={() => this.setState(toggleAccountOption("create"))}
                    text="Create account"
                  />
                </TextLeft>}

          </DialogFooter>
        </Dialog>

        <Panel
          isOpen={this.state.login}
          onDismiss={() => this.setState(toggleAccountOption("login"))}
          type={PanelType.medium}
          headerText="Login"
        >
          <Login />
        </Panel>

        <Panel
          isOpen={this.state.create}
          onDismiss={() => this.setState(toggleAccountOption("create"))}
          type={PanelType.medium}
          headerText="Create account"
        >
          <Signup />
        </Panel>

      </div>
    );
  }
}

function mapState({ Account }) {
  return {
    signupModal: Account.signupModal,
    loggedIn: Account.token !== false
  };
}

function mapDispatch(dispatch) {
  return {
    logout: () => {
      dispatch(setUserToken(false));
    },
    saveThread: (board, thread) => {
      dispatch(saveThread(board, thread));
    },
    navigate: url => () => dispatch(push(url))
  };
}

export default connect(mapState, mapDispatch)(Component);
