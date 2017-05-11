import React, { PureComponent } from "react";
import Styled from "styled-components";
import { Media, Description } from "../../components/general/";
import { Link } from "../../components/ui/";

const Area = Styled.div`
  margin: 15px 7.5px 0;
`;

const Grid = Styled.div`
  display: table;
  table-layout: fixed;
  width: 100%;
`;

const Column = Styled.div`
  display: table-cell;
  vertical-align: top;
`;

const Item = Styled.div`
  margin: 0 7.5px 15px;
`;

const ContainerWithHover = Styled.div`
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 2px;

  &:hover {
    background-color: rgba(255, 255, 255, 0.15);
  }
`;

const ContainerInner = Styled.div`
  padding: 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  max-height: 500px;
`;

class ThreadList extends PureComponent {
  state = {
    page: 0,
    loading: false
  };

  componentDidMount() {
    window.scroll(0, 0);
    this.props.requestBoard(this.props.match.params.board, this.state.page);
    window.addEventListener("scroll", this.handleScroll);
    window.addEventListener("resize", () => this.forceUpdate());
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
    window.removeEventListener("resize", () => this.forceUpdate());
  }

  componentWillReceiveProps() {
    this.setState(() => {
      return { loading: false };
    });
  }

  handleScroll = () => {
    if (!document.body || !document.documentElement) {
      throw new Error(
        "Cannot find `body` or `documentElement` on the `document` object."
      );
    } else if (this.state.loading) {
      return;
    }

    const windowHeight = "innerHeight" in window
      ? window.innerHeight
      : document.documentElement.offsetHeight;

    const docHeight = Math.max(
      document.body.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.clientHeight,
      document.documentElement.scrollHeight,
      document.documentElement.offsetHeight
    );
    const windowBottom = windowHeight + window.pageYOffset;

    if (windowBottom >= docHeight * 3 / 4) {
      const nextPage = this.state.page + 1;
      this.setState(
        () => {
          return { page: nextPage, loading: true };
        },
        () => {
          this.props.requestBoard(this.props.match.params.board, nextPage);
        }
      );
    }
  };

  render() {
    const { threads, match } = this.props;
    const { board } = match.params;
    let boardThreads = threads[`/${board}`];

    if (typeof boardThreads === "undefined") {
      boardThreads = [];
    }

    let columns = 1;

    if (window.innerWidth > 1600) {
      columns = 5;
    } else if (window.innerWidth > 1500) {
      columns = 4;
    } else if (window.innerWidth > 1100) {
      columns = 3;
    } else if (window.innerWidth > 500) {
      columns = 2;
    }

    function reOrder(arr) {
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

    return (
      <Area>
        <Grid>
          {reOrder(boardThreads).map((arr, index) => {
            return (
              <Column key={index}>
                {arr.map((thread, xindex) => {
                  const { no, sub } = thread;

                  return (
                    <Item key={xindex}>
                      <Link href={`/${board}/${no}`}>
                        <ContainerWithHover>
                          <ContainerInner>
                            <Media board={board} {...thread} />
                            <h1>{sub}</h1>
                            <Description
                              board={board}
                              match={match}
                              {...thread}
                            />
                          </ContainerInner>
                        </ContainerWithHover>
                      </Link>
                    </Item>
                  );
                })}
              </Column>
            );
          })}
        </Grid>
      </Area>
    );
  }
}

export default function(props) {
  return <ThreadList {...props} />;
}
