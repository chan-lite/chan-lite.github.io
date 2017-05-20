import React from "react";
import { Breadcrumb } from "../../components/ui/";
import Boards from "./boards";
import { Container } from "./styles";

export default function() {
  return (
    <Container>
      <Breadcrumb
        items={[
          {
            text: "/chanlite/",
            href: "/"
          }
        ]}
      />
      <Boards />
    </Container>
  );
}
