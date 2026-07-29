import React from "react";

type Props = {
  children?: React.ReactNode;
};

export default function MainLayout({ children }: Readonly<Props>) {
  return <>{children}</>;
}
