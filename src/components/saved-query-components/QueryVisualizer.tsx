import React, { useEffect } from "react";
import SearchVisualizer from "./SearchVisualizer";
import FieldVisualizer from "./FieldVisualizer";

interface QueryVisualizerProps {
  query: SearchDetailType;
}

const QueryVisualizer: React.FC<QueryVisualizerProps> = ({ query }) => {
  const text = query.text.query;
  const search = query.search;
  const field = query.field;
  const operator = query.text.operator;
  const destinationPath = query.text.path.map(
    (str) => str.charAt(0).toUpperCase() + str.substring(1)
  );

  return (
    <div className=" font-thin text-sm ">
      <div className="flex mb-2">
        <p className="font-thin">"{text}"</p>
        <p className="ml-1 text-white/40">{operator ? "in" : "out of"}</p>
        <p className=" ml-1 font-thin">{destinationPath.join(", ")}</p>
      </div>
      {query.detailSearch ? (
        <div>
          <div className="border rounded dark:border-neutral-600 p-1 mx-1 dark:bg-white/5">
            <p className=" text-yellow-500/60">
              {query.operator ? "AND:" : "OR:"}
            </p>
            <div className="border mx-1 rounded dark:border-neutral-600 p-2">
              <div className="">
                {search ? <SearchVisualizer object={search} /> : null}
              </div>
              <div className="">
                {field ? <FieldVisualizer field={field} /> : null}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default QueryVisualizer;
