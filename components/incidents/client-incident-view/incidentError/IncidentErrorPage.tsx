//lib
import Link from "next/link";

//components
import { Block } from "baseui/block";
import {
  ERROR_PAGE_OVERRIDES,
  MAIN_STYLE_OVERRIDES,
} from "../styles/containerStyles";

interface IncidentErrorPageProps {
  message: string;
}

/*Will be displayed if error in processing incident update request or fetching components* */

export default function IncidentErrorPage(props: IncidentErrorPageProps) {
  return (
    <Block overrides={{ ...MAIN_STYLE_OVERRIDES }}>
      <Block overrides={{ ...ERROR_PAGE_OVERRIDES }}>
        <h1 className="header">{props.message}</h1>
      </Block>
    </Block>
  );
}
