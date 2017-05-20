import React from "react";
import { Card, AnimateOnChange } from "../../components/general/";
import { Link, Loader } from "../../components/ui/";
import { Container, Thread, Page } from "./styles";
import { ForceUpdateOnResize } from "../../decorators/forceUpdatedOnResize";
import { Breadcrumb } from "../../components/ui/";

function SingleThread(props, thread, index) {
  return (
    <Thread key={index}>
      <Link href={`/${props.match.params.board}/${thread.No}`}>
        <AnimateOnChange propToTriggerChange={thread.No}>
          <Card board={props.match.params.board} item={thread} />
        </AnimateOnChange>
      </Link>
    </Thread>
  );
}

function reOrder(arr, columns) {
  const newArr = [];
  for (var e = 0; e < columns; e++) {
    newArr.push([]);
  }
  arr.forEach((item, index) => {
    const col = index % columns;
    newArr[col].push(item);
  });
  return newArr;
}

function Component(props) {
  const el = window;
  let columns = 1;
  if (el.innerWidth > 1600) {
    columns = 6;
  } else if (el.innerWidth > 1500) {
    columns = 5;
  } else if (el.innerWidth > 1100) {
    columns = 4;
  } else if (el.innerWidth > 870) {
    columns = 3;
  } else if (el.innerWidth > 500) {
    columns = 2;
  }

  const threads = props.threads[`/${props.match.params.board}`] || [];

  return (
    <Page>
      <Breadcrumb
        items={[
          {
            text: "/chanlite/",
            href: "/"
          },
          {
            text: `/${props.match.params.board}/`,
            href: `/${props.match.params.board}`
          }
        ]}
      />

      {threads.length > 0 ? null : <Loader />}

      <Container>
        <table
          cellPadding="0"
          cellSpacing="0"
          className="threadRootContainer"
          style={{ tableLayout: "fixed", width: "100%" }}
        >
          <tbody>
            <tr>
              {reOrder(threads, columns).map((arr, index) => {
                return (
                  <td key={index} style={{ verticalAlign: "top" }}>
                    {arr.map((thread, xindex) => {
                      return SingleThread(props, thread, xindex);
                    })}
                  </td>
                );
              })}
            </tr>
          </tbody>
        </table>
      </Container>
    </Page>
  );
}

export default ForceUpdateOnResize(Component);
