import { Block } from "baseui/block";
import Link from "next/link";
import ContentLoader from "react-content-loader";
import {
  FOOTER_BAR_OVERRIDES,
  CANCEL_BUTTON_OVERRIDES,
  SUBMIT_BUTTON_DISABLED_OVERRIDES,
} from "../form/overrides/BlockOverrides";

const StatusItem = () => {
  return (
    <ContentLoader
      speed={2}
      width={"100%"}
      height={86}
      backgroundColor="#f3f3f3"
      foregroundColor="#b8b8b8"
    >
      <Block></Block>
      <rect x="60%" y="7" rx="0" ry="0" width="379" height="33" />
      <rect x="0" y="12" rx="0" ry="0" width="20" height="20" />
      <rect x="40" y="8" rx="0" ry="0" width="210px" height="29" />
    </ContentLoader>
  );
};

interface Props {
  type: string;
}

const TombStone: React.FC<Props> = (props) => {
  return (
    <Block
      overrides={{
        Block: {
          style: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            paddingLeft: "20%",
            paddingRight: "20%",
          },
        },
      }}
    >
      <h2 className="header my-3.5">{props.type} Incident</h2>
      <ContentLoader
        width={"100%"}
        backgroundColor="#f3f3f3"
        foregroundColor="#b8b8b8"
      >
        {/* y = 6px because there's margin at the top of text */}
        <rect y="20px" width="100%" height="36px" />
      </ContentLoader>
      <ContentLoader
        width={"100%"}
        backgroundColor="#f3f3f3"
        foregroundColor="#b8b8b8"
      >
        {/* y = 6px because there's margin at the top of text */}
        <rect width="100%" height="97px" />
      </ContentLoader>
      <ContentLoader
        width={"100%"}
        backgroundColor="#f3f3f3"
        foregroundColor="#b8b8b8"
      >
        {/* y = 6px because there's margin at the top of text */}
        <rect width="100%" height="94px" />
      </ContentLoader>
      <StatusItem />
      <StatusItem />
      <StatusItem />
      <StatusItem />
      <StatusItem />
      <Block overrides={{ ...FOOTER_BAR_OVERRIDES }} className="footer-bar">
        <Block
          className="primary-button-disabled"
          overrides={{ ...SUBMIT_BUTTON_DISABLED_OVERRIDES }}
        >
          {props.type}
        </Block>
        <Link href={{ pathname: "/incidents" }}>
          <Block
            className="secondary-button"
            overrides={{ ...CANCEL_BUTTON_OVERRIDES }}
          >
            Cancel
          </Block>
        </Link>
      </Block>
    </Block>
  );
};

export default TombStone;
