// lib
import React from "react";
import ContentLoader from "react-content-loader";

// components
import { Block } from "baseui/block";

// styles
import { LIST_ITEM_LOADER_OVERRIDES } from "../overrides/listStyles";

export const MyLoader = (props: any) => (
  <Block overrides={LIST_ITEM_LOADER_OVERRIDES}>
    <ContentLoader
      speed={4}
      width={1084}
      height={120}
      viewBox="0 0 1084 120"
      backgroundColor="#f3f3f3"
      foregroundColor="#b8b8b8"
      {...props}
    >
      <rect x="2" y="86" rx="3" ry="3" width="1024" height="19" />
      <rect x="1" y="4" rx="0" ry="0" width="241" height="20" />
      <rect x="2" y="44" rx="0" ry="0" width="110" height="17" />
      <rect x="124" y="45" rx="0" ry="0" width="110" height="15" />
      <circle cx="971" cy="12" r="11" />
      <circle cx="1011" cy="12" r="11" />
    </ContentLoader>
  </Block>
);

/**
 * Tombstone loader for incident lists
 */
export const TombStoneLoader: React.FC = () => {
  return (
    <Block marginTop="20px">
      <MyLoader />
      <MyLoader />
      <MyLoader />
      <MyLoader />
    </Block>
  );
};
