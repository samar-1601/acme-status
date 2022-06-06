import { useEffect, useState } from "react";
import { NEXT_PUBLIC_AUTH_TOKEN } from "../../constants";

export default function LoadPageData(pageNumber: number, pageType: string) {
  
  const [dataList, setData] = useState<any[]>(Array());
  const [ hasLoaded, setHasLoaded ] = useState<boolean>( false );
  const [ hasMore, setHasMore ] = useState<boolean>( true );

  let idList: string[] | undefined = [];
  const getIDData = async (pageNumber: number) => {
    const URL = "https://api.statuspage.io/v1/pages";
    const response = await fetch(URL, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `OAuth ${NEXT_PUBLIC_AUTH_TOKEN ?? ""}`,
      },
    });
    const myJson = await response.json();
    idList = myJson.map((data: any) => data["id"]);
  
    if (idList !== undefined) {
      for(let i=0; i<idList.length; i++)
      {
        getData(idList[i],pageNumber);
      }
    }
  };

  const getData = async (pageId: string, pageNumber: number) => {
    const URL = `https://api.statuspage.io/v1/pages/${pageId}/incidents/?limit=10&page=${pageNumber}`;
    const response = await fetch(URL, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `OAuth ${NEXT_PUBLIC_AUTH_TOKEN ?? ""}`,
      },
    });
    const dataItem = await response.json();

    console.log('pageNo:',pageNumber,'hasMore',dataItem.length>0, 'API data:', dataItem.length );

    setData((prevDataItems) => {
      return pageNumber==1 ? dataItem:  [...prevDataItems, ...dataItem];
    });

    setHasMore(dataItem.length>0)
    setHasLoaded(true);
  };

  useEffect( () => {
    if ( pageNumber !== 1 ) {
      setHasLoaded( false );
      getIDData(pageNumber); 
    }
  }, [ pageNumber ] );
  
  useEffect( () => {
    setHasLoaded( false );
    setHasMore( true );
    setData( [] );
    getIDData(1); 
  },[pageType])

  
  
  return { dataList: dataList, isLoaded: hasLoaded, hasMore: hasMore};
}
