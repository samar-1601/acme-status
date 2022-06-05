import styles from "./styles/styles.module.css";
import navstyles from "./styles/navstyles.module.css";
import { OpenListView } from "./open_list_view";
import { generateUsers } from "./populateData";
import { useState } from "react";

let id = [1,0,0];
export const IncidentsListView: React.FC = () => {

    const [content, setContent] = useState(<OpenListView pageType="All" />);

    const toggleContent = (pageType:string, index:number)=>
    {
        setContent(<OpenListView pageType={pageType} />);
        for(let i=0; i<id.length; i++)
        {
            if(i==index)
                id[i] = 1;
            else id[i] = 0;
        }
    }

  return (
    <div className={styles.incidentsListView}>
      <div className={navstyles.container}>
        <div className={navstyles.headerBar}>
          <h1>Incidents</h1>
          <button onClick={generateUsers}>Populate Data</button>
        </div>
        <nav className={navstyles.nav}>
          <div onClick={()=>toggleContent("All", 0)}><a className={id[0]?navstyles.l1:""} href="#">All</a></div>
          <div onClick={()=>toggleContent("Active", 1)}><a className={id[1]?navstyles.l1:""} href="#">Active</a></div>
          <div onClick={()=>toggleContent("Maintenances", 2)}><a className={id[2]?navstyles.l1:""} href="#">Maintenance</a></div>
        </nav>
      </div>
      <div className={navstyles.content}>
        {content}
      </div>
    </div>
  );
};
