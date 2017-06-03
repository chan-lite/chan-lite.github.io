const initial = {
  token: false,
  signupModal: true,
  signupLoading: false
};

export default function(state = initial, { type, payload }) {
  switch (type) {
    case "SET_USER_TOKEN": {
      return Object.assign({}, state, { token: payload });
    }
    case "SET_USER_LOGOUT": {
      return Object.assign({}, state, { token: false });
    }

    case "SET_USER_MODAL_SIGNUP": {
      return Object.assign({}, state, { signupModal: payload });
    }

    case "SET_USER_MODAL_LOADING": {
      return Object.assign({}, state, { signupLoading: payload });
    }

    default: {
      return state;
    }
  }
}
