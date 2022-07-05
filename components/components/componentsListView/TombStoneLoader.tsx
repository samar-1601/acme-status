// lib
import React from "react";
import ContentLoader from "react-content-loader";

// components
import { Block } from "baseui/block";
import { ELEMENT_LOADER } from "../overrides/componentListStyles";

// styles

export const MyLoader = (props: any) => (
  <Block overrides={ELEMENT_LOADER}>
    <ContentLoader
      speed={4}
      height={60}
      width="100%"
      backgroundColor="#f3f3f3"
      foregroundColor="#b8b8b8"
      {...props}
    >
      <rect x="30" y="8" rx="3" ry="3" width="25%" height="15" />
      <rect x="30" y="38" rx="3" ry="3" width="20%" height="12" />
      <circle cx="10" cy="18" r="10" />
    </ContentLoader>
  </Block>
);

/**
 * Tombstone loader for incident lists
 */
export const TombStoneLoader: React.FC = () => {
  return (
    <Block width="99%" top="0px">
      <MyLoader />
      <MyLoader />
      <MyLoader />
      <MyLoader />
      <MyLoader />
      <MyLoader />
    </Block>
  );
};
