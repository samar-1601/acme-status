import { Block } from "baseui/block"
import React from "react"
import ContentLoader from "react-content-loader"
import { listItem } from "../overrides/fullIncidentsListStyles"

export const MyLoader = (props:any) => (
  <ContentLoader 
    speed={4}
    width={1084}
    height={125}
    viewBox="0 0 1084 125"
    backgroundColor="#f3f3f3"
    foregroundColor="#b8b8b8"
    {...props}
  >
    <rect x="2" y="86" rx="3" ry="3" width="1024" height="19" /> 
    <rect x="1" y="4" rx="0" ry="0" width="241" height="20" /> 
    <rect x="2" y="44" rx="0" ry="0" width="110" height="17" /> 
    <rect x="124" y="45" rx="0" ry="0" width="110" height="15" /> 
    <circle cx="971" cy="12" r="11" /> 
    <circle cx="1011" cy="12" r="11" />
  </ContentLoader>
)

export const TombStoneLoader = ()=>{
    return(
        <Block {...listItem}>
            <MyLoader/>
        </Block>
    )
}