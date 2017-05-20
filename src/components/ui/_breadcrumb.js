import React from "react";
import { injectGlobal } from "styled-components";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import { Breadcrumb } from "office-ui-fabric-react/lib/Breadcrumb";

export const breadcrumbStyles = injectGlobal`
  .ms-Breadcrumb {
    margin: 0 0 15px !important;

    @media (max-width: 748px) {
      display: none;
    }

    .ms-Breadcrumb-chevron {
      margin: 0 15px;
      color: white;
      margin-top: 10px;
      font-weight: 800;

      @media (max-width: 640px) {
        margin-top: 8px;
        margin-left: 0;
        margin-right: 0;
      }
    }

    .ms-Link {
      padding: 0 15px 5px !important;
      color: white !important;
      font-weight: 800 !important;

      &:hover {
        color: black !important;
      }
    }
  }
`;

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
