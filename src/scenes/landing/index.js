import React from "react";
import { Link } from "../../components/ui/";
import Boards from "./boards";
import { Container, Title } from "./styles";

export default function() {
  return (
    <Container>
      <Link href="/">
        <Title className="ms-font-su">React Chan</Title>
      </Link>
      <Boards />
    </Container>
  );
}
