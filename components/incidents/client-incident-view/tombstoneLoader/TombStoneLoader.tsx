import { Block } from "baseui/block";
import { Spinner } from "baseui/spinner";
import React from "react";
import ContentLoader from "react-content-loader";
import { PageType } from "../../../../constants";
import {
  ACTIVE_LIST_ITEM_LOADER_FIRST_OVERRIDES,
  ACTIVE_LIST_ITEM_LOADER_SECOND_OVERRIDES,
} from "../list-view-incidents/overrides/fullIncidentsListStyles";
import {
  MAINTENANCE_LIST_ITEM_LOADER_OVERRIDES,
  MAINTENANCE_LIST_ITEM_OVERRIDES,
} from "../list-view-incidents/overrides/scheduledMaintenanceStyles";

const ActivePageLoader = (props: any) => (
  <>
    <Block overrides={ACTIVE_LIST_ITEM_LOADER_FIRST_OVERRIDES}>
      <ContentLoader
        speed={4}
        width={1191}
        height={347}
        viewBox="0 0 1191 347"
        backgroundColor="#f3f3f3"
        foregroundColor="#b8b8b8"
        {...props}
      >
        <circle cx="971" cy="12" r="11" />
        <circle cx="1011" cy="12" r="11" />
        <rect x="1" y="0" rx="0" ry="0" width="1191" height="56" />
        <rect x="25" y="84" rx="0" ry="0" width="119" height="16" />
        <rect x="155" y="84" rx="0" ry="0" width="272" height="16" />
        <rect x="26" y="115" rx="0" ry="0" width="169" height="16" />
        <rect x="25" y="156" rx="0" ry="0" width="137" height="17" />
        <rect x="175" y="157" rx="0" ry="0" width="162" height="15" />
        <rect x="25" y="187" rx="0" ry="0" width="166" height="17" />
        <rect x="25" y="235" rx="0" ry="0" width="127" height="15" />
        <rect x="170" y="236" rx="0" ry="0" width="450" height="14" />
        <rect x="25" y="265" rx="0" ry="0" width="162" height="18" />
      </ContentLoader>
    </Block>
    <Block overrides={ACTIVE_LIST_ITEM_LOADER_SECOND_OVERRIDES}>
      <ContentLoader
        speed={4}
        width={1191}
        height={148}
        viewBox="0 0 1191 148"
        backgroundColor="#f3f3f3"
        foregroundColor="#b8b8b8"
        {...props}
      >
        <circle cx="971" cy="12" r="11" />
        <circle cx="1011" cy="12" r="11" />
        <rect x="1" y="0" rx="0" ry="0" width="1191" height="56" />
        <rect x="25" y="84" rx="0" ry="0" width="119" height="16" />
        <rect x="155" y="84" rx="0" ry="0" width="272" height="16" />
        <rect x="26" y="115" rx="0" ry="0" width="169" height="16" />
      </ContentLoader>
    </Block>
  </>
);

const MaintenancePageLoader = (props: any) => (
  <>
    <Block overrides={MAINTENANCE_LIST_ITEM_LOADER_OVERRIDES}>
      <ContentLoader
        speed={4}
        width={1187}
        height={113}
        viewBox="0 0 1187 113"
        backgroundColor="#f3f3f3"
        foregroundColor="#b8b8b8"
        {...props}
      >
        <circle cx="971" cy="12" r="11" />
        <circle cx="1011" cy="12" r="11" />
        <rect x="0" y="1" rx="0" ry="0" width="261" height="26" />
        <rect x="850" y="3" rx="0" ry="0" width="336" height="21" />
        <rect x="0" y="34" rx="0" ry="0" width="1187" height="1" />
        <rect x="0" y="49" rx="0" ry="0" width="146" height="13" />
        <rect x="162" y="49" rx="0" ry="0" width="85" height="12" />
        <rect x="0" y="75" rx="0" ry="0" width="181" height="17" />
      </ContentLoader>
    </Block>
  </>
);

interface Props {
  pageType: PageType;
}

export const TombStoneLoader: React.FC<Props> = ({ pageType }) => {
  switch (pageType) {
    case PageType.Active:
      return <ActivePageLoader />;
    case PageType.Scheduled:
      return (
        <>
          <MaintenancePageLoader />
          <MaintenancePageLoader />
          <MaintenancePageLoader />
          <MaintenancePageLoader />
        </>
      );
    default:
      return (
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
  }
};
