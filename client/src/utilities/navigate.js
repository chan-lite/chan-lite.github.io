import { NavigationActions } from "react-navigation";

export default function(navigation, routeName, params) {
  return function() {
    navigation.dispatch(NavigationActions.navigate({ routeName, params }));
  };
}
