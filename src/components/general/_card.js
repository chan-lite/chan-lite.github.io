import React from "react";
import { injectGlobal } from "styled-components";
import { Media, Description } from "./index.js";

injectGlobal`
  .ms-DocumentCard {
    max-width: 99999999px !important;
    min-width: 0 !important;

    .ms-DocumentCardTitle {
      padding: 15px 15px 0;
      height: auto;
    }

    .ms-DocumentCardActivity {
      padding: 15px;
    }
    
    .ms-DocumentCardActivity-details {
      top: 15px;
    }
  }
`;

import {
  DocumentCard,
  DocumentCardActivity,
  DocumentCardTitle,
  IDocumentCardPreviewProps
} from "office-ui-fabric-react/lib/DocumentCard";

function decode(someString) {
  const txt = document.createElement("textarea");
  txt.innerHTML = someString;
  const decoded = txt.value;
  txt.remove();
  return decoded;
}

export default function(props) {
  const { board, item } = props;

  return (
    <DocumentCard>

      <Media imageHeight={props.imageHeight} board={board} {...item} />

      {item.sub
        ? <DocumentCardTitle title={decode(item.sub)} shouldTruncate={false} />
        : null}

      <DocumentCardActivity
        activity={item.now}
        people={[
          {
            name: item.name
          }
        ]}
      />

      {item.com
        ? <Description board={board} {...{ ...item, ...props }} />
        : null}

      {item.com ? <div style={{ height: "15px" }} /> : null}

    </DocumentCard>
  );
}
