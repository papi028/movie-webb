import { Header } from "layouts/Header";
import React from "react";
import styles from "./layoutHome.module.scss";

const LayoutHome = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={styles.layout}>
      <Header />
      <main>{children}</main>
    </div>
  );
};

export default LayoutHome;
