import React from "react";

import styles from "../../components/ComponentCreation/styles.module.css";
import { hasListLoadedStyle } from "../../components/incidents/incidents-list-view/styles/listStyles";

import { ComponentCreationForm } from "../../components/ComponentCreation/ComponentCreationForm";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { Block } from "baseui/block";
import { Spinner } from "baseui/spinner";

const AddComponents: React.FC = () => {
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
      <ComponentCreationForm />
    </div>
  );
};

export default AddComponents;
