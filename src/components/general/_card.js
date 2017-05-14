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

      {item.sub && !showNumber
        ? <DocumentCardTitle title={decode(item.sub)} shouldTruncate={false} />
        : null}

      {showNumber
        ? <DocumentCardTitle title={item.no} shouldTruncate={false} />
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
