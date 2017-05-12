import React from "react";
import { Link } from "../../components/ui/";
import { Row, Button } from "./styles";

export default function(props) {
  return (
    <Row>
      {props.boards.map(({ board }, index) => {
        return (
          <Button key={index}>
            <Link style={{ padding: "10px 15px" }} href={`/${board}`}>
              /{board}/
            </Link>
          </Button>
        );
      })}
    </Row>
  );
}
