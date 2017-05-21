import React, { PureComponent } from "react";
// import { Card, AnimateOnChange } from "../../components/general/";
import { Card, Description } from "../../components/general/";
import { Link, Loader } from "../../components/ui/";
import { Container, Thread, Page } from "./styles";
import { ForceUpdateOnResize } from "../../decorators/forceUpdatedOnResize";
import { Breadcrumb } from "../../components/ui/";

import {
  FocusZone,
  FocusZoneDirection
} from "office-ui-fabric-react/lib/FocusZone";
import { TextField } from "office-ui-fabric-react/lib/TextField";
import { Image, ImageFit } from "office-ui-fabric-react/lib/Image";
import { List } from "office-ui-fabric-react/lib/List";
import { IMAGE_BASE } from "../../constants/";
import {
  DocumentCard,
  DocumentCardActivity,
  DocumentCardTitle
} from "office-ui-fabric-react/lib/DocumentCard";

function getHighRes({ board, Tim, Ext }) {
  return `${IMAGE_BASE}${board}/${Tim}${Ext}`;
}

function getLowRes({ board, Tim, Ext }) {
  return `${IMAGE_BASE}${board}/${Tim}s.jpg`;
}

function toggleImage(event) {
  event.stopPropagation();
  event.preventDefault();
  return function({ open }) {
    return { open: !open };
  };
}

class SingleThread extends PureComponent {
  state = { open: false };

  render() {
    return (
      <Link href={`/${this.props.board}/${this.props.No}`}>
        <div className="ms-ListBasicExample-itemCell">

          <div>
            {/*image and video*/}
            <Image
              onClick={e => this.setState(toggleImage(e))}
              className="ms-ListBasicExample-itemImage"
              src={getLowRes(this.props)}
              width={50}
              height={50}
              imageFit={ImageFit.cover}
            />

            {/*text content*/}
            <div className="ms-ListBasicExample-itemContent">

              {/*title*/}
              <div className="ms-ListBasicExample-itemName ms-font-xl">
                {this.props.Sub}
              </div>

              {/*user data and date*/}
              <DocumentCardActivity
                activity={this.props.Now}
                people={[
                  {
                    name: this.props.Name
                  }
                ]}
              />

              {/*description*/}
              <div className="ms-ListBasicExample-itemDesc ms-font-s">
                {this.props.Com ? <Description {...this.props} /> : null}
              </div>

            </div>
          </div>

          {this.state.open
            ? <a
                href={getHighRes(this.props)}
                onClick={e => e.stopPropagation()}
              >
                <Image
                  style={{ marginTop: "15px" }}
                  src={getHighRes(this.props)}
                />
              </a>
            : null}

        </div>
      </Link>
    );
  }
}

function Component(props) {
  const board = props.match.params.board;
  const threads = props.threads[`/${board}`] || [];

  return (
    <Page>

      {/*page header*/}
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

      {/*loader*/}
      {threads.length > 0 ? null : <Loader />}

      {/*main content*/}
      <Container>
        <FocusZone direction={FocusZoneDirection.vertical}>
          <List
            items={threads}
            onRenderCell={(item, index) => (
              <SingleThread {...item} board={board} index={index} />
            )}
          />
        </FocusZone>
      </Container>

    </Page>
  );
}

export default Component;
// export default ForceUpdateOnResize(Component);
