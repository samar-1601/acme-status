import React from "react";
import { Header, NavigationBar } from "../../components/component/Component";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { Block } from "baseui/block";
import styles from "../../components/component/styles.module.css";
import { hasListLoadedStyle } from "../../components/incidents/incidents-list-view/styles/listStyles";
import { Spinner } from "baseui/spinner";

const components: React.FC = () => {
  const { push } = useRouter();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated: () => {
      push("/loginList");
    },
  });

  if (status == "loading") {
    return (
      <Block {...hasListLoadedStyle}>
        <Spinner />
      </Block>
    );
  }

  if (status != "authenticated")
    return <Block> You are unauthenticated. this is a protected page.</Block>;
  return (
    <div className={styles.page}>
      <Header />
      <NavigationBar />
    </div>
  );
};

export default components;
