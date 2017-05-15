import React from "react";
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

export default function(props) {
  const { board, item, showNumber } = props;

  return (
    <DocumentCard>

      <Media imageHeight={props.imageHeight} board={board} {...item} />

      {item.Sub && !showNumber
        ? <DocumentCardTitle title={decode(item.Sub)} shouldTruncate={false} />
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

    </DocumentCard>
  );
}
