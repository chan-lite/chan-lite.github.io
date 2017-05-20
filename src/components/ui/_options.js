import React, { PureComponent } from "react";
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

const ButtonWrap = Styled.div`
  position: fixed;
  bottom: 35px;
  right: 50px;
  @media (max-width: 748px) {
    bottom: 25px;
    right: 25px;
  }
`;

export const optionsStyles = injectGlobal`
  .actionBtn {
    button {
      min-width: 32px;
      border-radius: 50%;
      padding: 24px 14px;
      box-shadow: 2px 3px 8px #212121;
    }
  }
`;

const initialState = { open: false, login: false, create: false };

export default class extends PureComponent {
  state = initialState;

  toggle = () => {
    this.setState(({ open }) => {
      return { ...initialState, ...{ open: !open } };
    });
  };

  toggleAccountOption = val => () => {
    this.setState(state => {
      state = { ...state, ...initialState };
      state[val] = !state[val];
      return state;
    });
  };

  render() {
    return (
      <div className="actionBtn">

        <ButtonWrap>
          <PrimaryButton
            data-automation-id="test"
            disabled={false}
            iconProps={{ iconName: "Add" }}
            onClick={this.toggle}
          />
        </ButtonWrap>

        <Dialog
          isOpen={this.state.open}
          type={DialogType.normal}
          onDismiss={this.toggle}
          title="Account Options"
          isBlocking={false}
        >
          <DialogFooter>
            <PrimaryButton
              onClick={this.toggleAccountOption("login")}
              text="Login"
            />
            <DefaultButton
              onClick={this.toggleAccountOption("create")}
              text="Create account"
            />
          </DialogFooter>
        </Dialog>

        <Panel
          isOpen={this.state.login}
          onDismiss={this.toggleAccountOption("login")}
          type={PanelType.medium}
          headerText="Login"
        >
          account login
        </Panel>

        <Panel
          isOpen={this.state.create}
          onDismiss={this.toggleAccountOption("create")}
          type={PanelType.medium}
          headerText="Create account"
        >
          account create
        </Panel>

      </div>
    );
  }
}
