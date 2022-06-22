import { Avatar } from "baseui/avatar";
import { Block } from "baseui/block";
import { StatefulMenu } from "baseui/menu";
import Router from "next/router";
import { useSnackbar, DURATION } from "baseui/snackbar";
import { useEffect } from "react";

const LandingPage = () => {
  const { enqueue, dequeue } = useSnackbar();
  useEffect(() => {
    if (localStorage.getItem("loadingCount") == undefined) {
      dequeue();
      enqueue({ message: "Succesfully Logged in!" }, DURATION.long);
      localStorage.setItem("loadingCount", "2");
    }
  }, []);
  return (
    <main>
      <Block
        overrides={{
          Block: {
            style: {
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-around",
              backgroundColor: "rgb(1,73,176)",
              width: "50vh",
              margin: "20vh auto",
              borderRadius: "30px",
              boxShadow: "0 0 40px 	#A9A9A9",
            },
          },
        }}
      >
        <Block
          overrides={{
            Block: {
              style: {
                fontFamily: "Arial, Helvetica, sans-serif",
                color: "white",
                fontWeight: 900,
                fontSize: "32px",
                padding: "50px",
              },
            },
          }}
        >
          <Avatar
            name="Status_Icon"
            src="/Status_icon.png"
            overrides={{
              Root: { style: { paddingRight: "10px", paddingTop: "10px" } },
            }}
          />
          StatusPage
        </Block>
        <Block
          overrides={{
            Block: {
              style: {
                display: "flex",
                flexDirection: "column",
                paddingBottom: "50px",
              },
            },
          }}
        >
          <StatefulMenu
            items={[
              { label: "Go to Incidents Home Page", url: "/incidents" },
              { label: "Go to Components Home Page", url: "/component" },
              {
                label: "Go to Client Incidents Page",
                url: "https://client-incident-list-view.netlify.app/",
              },
            ]}
            onItemSelect={(item) => {
              if (
                item.item.url ==
                "https://client-incident-list-view.netlify.app/"
              ) {
                window.open(item.item.url, "_blank");
              } else Router.push(item.item.url);
            }}
          />
        </Block>
      </Block>
    </main>
  );
};

export default LandingPage;
