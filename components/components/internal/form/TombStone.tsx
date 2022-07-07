import { Block } from "baseui/block";
import Link from "next/link";
import ContentLoader from "react-content-loader";
import { CANCEL_BUTTON, FOOTER_WRAPPER, SUBMIT_BUTTON } from "../overrides/componentFormStyles";

interface Props {
  type: string;
}

export const ComponentFormTombStoneLoader: React.FC<Props> = (props) => {
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
      <h2 className="header my-3.5">{props.type} Component</h2>
      <ContentLoader
        width={"100%"}
        height={"100px"}
        backgroundColor="#f3f3f3"
        foregroundColor="#b8b8b8"
      >
        <rect y="20px" width="100%" height="36px" />
      </ContentLoader>
      <ContentLoader
        width={"100%"}
        height={"150px"}
        backgroundColor="#f3f3f3"
        foregroundColor="#b8b8b8"
      >
        <rect width="100%" height="108px" />
      </ContentLoader>
      <ContentLoader
        width={"100%"}
        height={"60px"}
        backgroundColor="#f3f3f3"
        foregroundColor="#b8b8b8"
      >
        <rect width="100%" height="36px" />
      </ContentLoader>
      <ContentLoader
        width={"100%"}
        height={"100px"}
        backgroundColor="#f3f3f3"
        foregroundColor="#b8b8b8"
      >
        <rect width="100%" height="36px" />
      </ContentLoader>
      <Block overrides={FOOTER_WRAPPER} className="footer-bar">
        <Block
          className="primary-button-disabled"
          overrides={ SUBMIT_BUTTON }
        >
          {props.type==="Add"?"Create":"Update"}
        </Block>
        <Link href={{ pathname: "/components" }}>
          <Block
            className="secondary-button"
            overrides={CANCEL_BUTTON}
          >
            Cancel
          </Block>
        </Link>
      </Block>
    </Block>
  );
};

