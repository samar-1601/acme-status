// lib
import { useEffect, useState } from "react";
import * as React from "react";

// components
import { useSnackbar, DURATION } from "baseui/snackbar";
import { PageSlot } from "../pageSlot/PageSlot";
import FullSideBar from "../leftPageSlot/fullSideBar/FullSideBar";

// constants
import { SideBarMenu } from "../../constants";
import { Block } from "baseui/block";
import Image from "next/image";
import {
  landingPageContainerStyle,
  landingPageDescriptionStyle,
  landingPageHeaderStyle,
} from "./landingPageStyles";

/**
 * The HomePage/Landing page opened after the user has logged in successfully
 */
const LandingPage = React.memo(() => {
  const { enqueue, dequeue } = useSnackbar(); // snackbar to show successfully signed in message.

  useEffect(() => {
    if (localStorage.getItem("loadingCount") == undefined) {
      // if the page has loaded for the first time after logging in then only shoe the message.
      // dequeue();
      enqueue({ message: "Succesfully Logged in!" }, DURATION.short);
      // after the snackbar has been shown for the first time, we set in to a value to not show snackbar again and again when the page is rendered
      localStorage.setItem("loadingCount", "1");
    }
  }, []);

  // slotted page with sidebar on left and IncidentsListView on the right
  return (
    <PageSlot activeMenuItem={SideBarMenu.Home}>
      <PageSlot.Slot name="rightContent">
        <Block {...landingPageContainerStyle}>
          <Block {...landingPageHeaderStyle}>
            Welcome to <b>statusapp</b>
          </Block>
          <Image src="/landingPage2.svg" height={600} width={600}></Image>
          <Block {...landingPageDescriptionStyle}>
            Managing, Updating and Creating your Incidents & Components is now
            easy !!
          </Block>
        </Block>
      </PageSlot.Slot>
    </PageSlot>
  );
});

export default LandingPage;
