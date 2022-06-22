import { BlockProps } from "baseui/block";

export const contentBlock: BlockProps = {
  display: "flex",
  flexDirection: "column",
  // justifyContent: "center",
  // alignItems: "center",
  backgroundColor: "white",

  // color: "white",
};

export const imageProps: BlockProps = {
  width: "600px",
  alignSelf: "center",
  overrides: {
    Block: {
      style: {
        objectFit: "contain",
      },
    },
  },
  height: "250px",
};

export const textProps: BlockProps = {
  alignSelf: "center",
  alignItems: "center",
  justifyContent: "center",
  width: "400px",
  position: "relative",
};

export const rowContent: BlockProps = {
  display: "flex",
  justifyContent: "space-around",
  marginTop: "25px",
  marginBottom: "25px",
  paddingLeft: "15px",
  paddingRight: "15px",
  // font: "16px",
  flexWrap: true,
};

export const headerStyle: BlockProps = {
  margin: "10px",
};
