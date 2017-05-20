import React from "react";
import Styled, { injectGlobal } from "styled-components";
import { Media, Description } from "./index.js";

import {
  DocumentCard,
  DocumentCardActivity,
  DocumentCardTitle
} from "office-ui-fabric-react/lib/DocumentCard";

function decode(someString) {
  const txt = document.createElement("textarea");
  txt.innerHTML = someString;
  const decoded = txt.value;
  txt.remove();
  return decoded;
}

injectGlobal`
  .ms-DocumentCard {
    border-width: 0 !important;
    overflow: hidden;
  }
  .threadRootContainer .ms-DocumentCard {
    @media (max-width: 500px) {
      position: relative;
      height: 150px;
    }
  }
  .threadRootContainer .mobileLeft,
  .threadRootContainer .mobileRight {
    @media (max-width: 500px) {
      top: 0;
      right: 0;
      position: absolute;
      width: 50%;
    }
  }
  .threadRootContainer .mobileLeft {
    @media (max-width: 500px) {
      left: 0;
      height: 135px;
      overflow: hidden;
      width: calc(50% - 15px);
    }
  }
`;

export default function(props) {
  const { board, item, showNumber } = props;

  return (
    <DocumentCard style={{ position: "absolute" }}>

      <div className="mobileRight">
        <Media imageHeight={props.imageHeight} board={board} {...item} />
      </div>

      <div className="mobileLeft">
        {item.Sub && !showNumber
          ? <DocumentCardTitle
              title={decode(item.Sub)}
              shouldTruncate={false}
            />
          : null}

        {showNumber
          ? <DocumentCardTitle title={item.No} shouldTruncate={false} />
          : null}

        <DocumentCardActivity
          activity={item.Now}
          people={[
            {
              name: item.Name
            }
          ]}
        />

        {item.Com
          ? <Description board={board} {...{ ...item, ...props }} />
          : null}

        {item.Com ? <div style={{ height: "15px" }} /> : null}
      </div>

      <div style={{ clear: "both" }} />

    </DocumentCard>
  );
}
