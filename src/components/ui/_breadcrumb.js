import React from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";

import { Breadcrumb } from "office-ui-fabric-react/lib/Breadcrumb";

function Component({ navigate, items }) {
  return (
    <Breadcrumb
      items={items.map((item, index) => {
        item.onClick = navigate(item.href);
        item.key = index;
        delete item.href;
        return item;
      })}
    />
  );
}

function mapDispatchToProps(dispatch) {
  return {
    navigate: url => () => dispatch(push(url))
  };
}

export default connect(null, mapDispatchToProps)(Component);
