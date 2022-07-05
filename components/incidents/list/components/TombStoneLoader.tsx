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
      width="100%"
      height={120}
      // viewBox="0 0 1084 120"
      backgroundColor="#f3f3f3"
      foregroundColor="#b8b8b8"
      {...props}
    >
      <rect x="2" y="72%" rx="3" ry="3" width="80%" height="19" />
      <rect x="1" y="3.33%" rx="0" ry="0" width="22%" height="20" />
      <rect x="2" y="37%" rx="0" ry="0" width="10%" height="17" />
      <rect x="12%" y="37%" rx="0" ry="0" width="10%" height="15" />
      <circle cx="93%" cy="12" r="11" />
      <circle cx="97%" cy="12" r="11" />
    </ContentLoader>
  </Block>
);

/**
 * Tombstone loader for incident lists
 */
export const TombStoneLoader: React.FC = () => {
  return (
    <Block marginTop="20px" maxWidth="100%">
      <MyLoader />
      <MyLoader />
      <MyLoader />
      <MyLoader />
    </Block>
  );
};
