import React from "react";
import { Route } from "react-router-dom";

interface Props {
  path: string;
  element: React.ReactNode;
}

export default function GuardedRoute({ path, element }: Props) {
  console.log("document.cookie", document.cookie);
  return <Route path={path} element={element} />;
}
