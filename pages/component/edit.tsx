import React, { Component } from "react";

import styles from "../../components/ComponentCreation/styles.module.css"
import { ComponentCreationForm } from "../../components/ComponentCreation/ComponentCreationForm";

import { useRouter } from 'next/router'


const EditComponents = function () {
  const router = useRouter()
  return (
    <div className={styles.page}>
      <ComponentCreationForm id={router.query.id} />
    </div>
  );
}

export default EditComponents;
