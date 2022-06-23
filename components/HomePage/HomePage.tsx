import { Block } from "baseui/block";
import { StatefulMenu } from "baseui/menu";
import Router from "next/router";
import { useSnackbar, DURATION } from "baseui/snackbar";
import { useEffect } from "react";
import Image from "next/image";
import { PageSlot } from "../PageSlot/PageSlot";
import IncidentsHome from "../IncidentsHome";
import SideBar from "../SideBar/SideBar";

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
    <PageSlot>
      <PageSlot.Slot name="leftNavBar">
        <SideBar />
      </PageSlot.Slot>
      <PageSlot.Slot name="rightContent">
        <IncidentsHome />
      </PageSlot.Slot>
    </PageSlot>
  );
};

export default LandingPage;
