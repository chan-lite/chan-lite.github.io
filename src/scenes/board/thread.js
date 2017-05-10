// @flow

import React from "react";
import { Link } from "../../components/ui/";

export default function({ com, no, board }) {
  return (
    <div>
      <Link href={`/${board}/${no}`}>
        {no}
      </Link>
    </div>
  );
}
