import { POST_SIGNUP, POST_LOGIN } from "../constants/";

export function setUserToken(token) {
  return {
    type: "SET_USER_TOKEN",
    payload: token
  };
}

export function setAccountModal(status) {
  return {
    type: "SET_USER_MODAL_SIGNUP",
    payload: status
  };
}

function setAccountLoading(status) {
  return {
    type: "SET_USER_MODAL_LOADING",
    payload: status
  };
}

export function signup(email, password) {
  const data = new FormData();
  data.append("name", "Nothing to see here");
  data.append("email", email);
  data.append("device", "Nothing to see here");
  data.append("password", password);

  const options = { method: "POST", body: data };

  return async function(dispatch) {
    // Eager
    dispatch(setAccountModal(false));
    dispatch(setAccountLoading(false));

    try {
      const request = await fetch(POST_SIGNUP, options);
      const { success, token, message } = await request.json();
      if (!success) {
        alert(message);
      } else {
        dispatch(setUserToken(token));
      }
    } catch (err) {
      alert("An unexpected error has occurred.");
    }
  };
}

export function setUserLogout() {
  return {
    type: "SET_USER_LOGOUT"
  };
}

export function login(email, password) {
  const data = new FormData();
  data.append("email", email);
  data.append("password", password);

  const options = { method: "POST", body: data };

  return async function(dispatch) {
    // Eager
    dispatch(setAccountModal(false));
    dispatch(setAccountLoading(false));

    try {
      const request = await fetch(POST_LOGIN, options);
      const { success, token, message } = await request.json();
      if (!success) {
        alert(message);
      } else {
        dispatch(setUserToken(token));
      }
    } catch (err) {
      alert("An unexpected error has occurred.");
    }
  };
}
