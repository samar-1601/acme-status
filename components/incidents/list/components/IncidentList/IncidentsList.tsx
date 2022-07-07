// lib
import { useRef } from "react";
import * as React from "react";

// components
import { RenderIncidentData } from "./IncidentListItem";
import { useSnackbar } from "baseui/snackbar";
import {
  InfiniteLoader,
  List,
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
} from "react-virtualized";
import "react-virtualized/styles.css";

interface Props {
  hasMore: boolean;
  dataList: any[];
  fetchMore: Function;
  setPageLoaded: Function;
  reFetch: Function;
}

/**
 * List-view for the data as selected from the navigation bar
 * @param { enum.<PageType> } pageType Type of the page to be displayed
 * @returns A list of JSX Elements with data obtained from the API response
 */
export const IncidentsList: React.FC<Props> = React.memo(
  ({ hasMore, dataList, fetchMore, setPageLoaded, reFetch }) => {
    const { enqueue, dequeue } = useSnackbar();
    const cache = useRef(
      new CellMeasurerCache({
        // react-virtualized component to measure the size of component
        fixedWidth: true,
        defaultHeight: 50,
      })
    );

    return (
      <InfiniteLoader
        isRowLoaded={({ index }) => !hasMore || index < (dataList.length ?? 0)} // whether the current row is loaded
        loadMoreRows={() => fetchMore()} // function triggered when we scroll and need more data to load
        rowCount={dataList.length + 1} // total row count of the data to be displayed
      >
        {({ onRowsRendered, registerChild }) => (
          <div style={{ width: "100%", height: `calc(100vh - 156px)` }}>
            <AutoSizer>
              {({ width, height }) => (
                <List
                  width={width}
                  height={height}
                  onRowsRendered={onRowsRendered}
                  ref={registerChild}
                  rowHeight={cache.current.rowHeight ?? 0}
                  deferredMeasurementCache={cache.current}
                  rowCount={dataList.length ?? 0}
                  rowRenderer={({ key, index, style, parent }) => {
                    const element = dataList[index];
                    return (
                      <CellMeasurer
                        key={key}
                        cache={cache.current}
                        parent={parent}
                        columnIndex={0}
                        rowIndex={index ?? 0}
                      >
                        <div style={style}>
                          <RenderIncidentData
                            incident={element}
                            enqueue={enqueue}
                            reFetch={reFetch}
                            setIsLoading={setPageLoaded}
                          />
                        </div>
                      </CellMeasurer>
                    );
                  }}
                ></List>
              )}
            </AutoSizer>
          </div>
        )}
      </InfiniteLoader>
    );
  }
);
