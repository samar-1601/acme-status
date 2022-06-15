// lib
import * as React from "react";
import { useState, useEffect, useCallback } from "react";

// loading and helper functions
import { getComponents, getComponentUptime } from "./LoadAboutPageData";
import { renderComponents } from "./AboutPageHelperFunctions";

// components
import { Block } from "baseui/block";
import { Spinner } from "baseui/spinner";

// styles
import { componentListWrapper } from "./styles/aboutThisStyles";

export const AboutThisSite = React.memo(() => {
  const [state, setState] = useState({
    componentsList: Array(),
    isLoaded: false,
  });

  const loadComponentsList = useCallback(async () => {
    const componentList = await getComponents();
    const components = await renderComponents(componentList);
    setState({ ...state, componentsList: components, isLoaded: true });
  }, []);

  const components = useEffect(() => {
    loadComponentsList();
  }, []);

  return state.isLoaded ? (
    <Block {...componentListWrapper}>{state.componentsList}</Block>
  ) : (
    <Block
      overrides={{
        Block: {
          style: {
            marginTop: "15vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
        },
      }}
    >
      <Spinner />
    </Block>
  );
});
