import React, { PureComponent } from "react";
import { Media, Description } from "../../components/general/";
import { Link } from "../../components/ui/";
import { ContainerWithHover, ContainerInner } from "./styles";

export default class extends PureComponent {
  render() {
    const boardThreads = this.props.threads[
      `/${this.props.match.params.board}`
    ] || [];

    return (
      <div>
        {boardThreads.map((thread, index) => {
          return (
            <Link
              key={index}
              href={`/${this.props.match.params.board}/${thread.no}`}
            >
              <ContainerWithHover>
                <ContainerInner>
                  <Media board={this.props.match.params.board} {...thread} />
                  <h1>{thread.sub}</h1>
                  <Description
                    board={this.props.match.params.board}
                    match={this.props.match}
                    {...thread}
                  />
                </ContainerInner>
              </ContainerWithHover>
            </Link>
          );
        })}
      </div>
    );
  }
}
