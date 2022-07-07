import { Block } from "baseui/block";
import { Spinner } from "baseui/spinner";
import React from "react";
import ContentLoader from "react-content-loader";
import { PageType } from "../../../../constants";
import {
  ACTIVE_LIST_ITEM_LOADER_FIRST_OVERRIDES,
  ACTIVE_LIST_ITEM_LOADER_SECOND_OVERRIDES,
} from "../list-view-incidents/overrides/fullIncidentsListStyles";
import { MAINTENANCE_LIST_ITEM_LOADER_OVERRIDES } from "../list-view-incidents/overrides/scheduledMaintenanceStyles";

const ActivePageLoader = (props: any) => (
  <>
    <Block overrides={ACTIVE_LIST_ITEM_LOADER_FIRST_OVERRIDES}>
      <ContentLoader
        speed={4}
        width="100%"
        height={347}
        // viewBox="0 0 1191 347"
        backgroundColor="#f3f3f3"
        foregroundColor="#b8b8b8"
        {...props}
      >
        <rect x="0" y="0" rx="0" ry="0" width="100%" height="56" />
        <rect x="2.09%" y="24.2%" rx="0" ry="0" width="10%" height="16" />
        <rect x="13%" y="24.2%" rx="0" ry="0" width="22.8%" height="16" />
        <rect x="2.18%" y="33.1%" rx="0" ry="0" width="14.1%" height="16" />
        <rect x="2.09%" y="44.9%" rx="0" ry="0" width="11.5%" height="17" />
        <rect x="14.6%" y="44.9%" rx="0" ry="0" width="14.1%" height="15" />
        <rect x="2.09%" y="53.8%" rx="0" ry="0" width="14.1%" height="17" />
        <rect x="2.09%" y="67.7%" rx="0" ry="0" width="10.6%" height="15" />
        <rect x="14.2%" y="67.7%" rx="0" ry="0" width="37.7%" height="14" />
        <rect x="2.09%" y="76.3%" rx="0" ry="0" width="14.1%" height="18" />
      </ContentLoader>
    </Block>
    <Block overrides={ACTIVE_LIST_ITEM_LOADER_SECOND_OVERRIDES}>
      <ContentLoader
        speed={4}
        width="100%"
        height={148}
        // viewBox="0 0 1191 148"
        backgroundColor="#f3f3f3"
        foregroundColor="#b8b8b8"
        {...props}
      >
        <rect x="0" y="0" rx="0" ry="0" width="100%" height="56" />
        <rect x="2.09%" y="56.7%" rx="0" ry="0" width="10%" height="16" />
        <rect x="13.01%" y="56.7%" rx="0" ry="0" width="22.8%" height="16" />
        <rect x="2.09%" y="77.7%" rx="0" ry="0" width="14.1%" height="16" />
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
