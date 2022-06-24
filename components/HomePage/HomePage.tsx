// lib
import { useEffect } from "react";
import * as React from "react";

// components
import { useSnackbar, DURATION } from "baseui/snackbar";
import { PageSlot } from "../PageSlot/PageSlot";
import IncidentsHome from "../IncidentsHome";
import SideBar from "../SideBar/SideBar";

// constants
import { SideBarMenu } from "../../constants";

const LandingPage = React.memo(() => {
  const { enqueue, dequeue } = useSnackbar();
  useEffect(() => {
    if (localStorage.getItem("loadingCount") == undefined) {
      dequeue();
      enqueue({ message: "Succesfully Logged in!" }, DURATION.long);
      localStorage.setItem("loadingCount", "2");
    }
  }, []);
  return (
    <PageSlot>
      <PageSlot.Slot name="leftNavBar">
        <SideBar activeItemID={SideBarMenu.IncidentsView} />
      </PageSlot.Slot>
      <PageSlot.Slot name="rightContent">
        <IncidentsHome />
      </PageSlot.Slot>
    </PageSlot>
  );
});

export default LandingPage;
