import React, { useEffect, useState } from "react";

interface SearchVisualizerProps {
  object: SearchObject;
}

const SearchVisualizer: React.FC<SearchVisualizerProps> = ({ object }) => {
  const [searchItems, setSearchItems] = useState<SearchType[]>([]);
  useEffect(() => {
    setSearchItems([]);
    console.log(object);

    for (const key in object) {
      const item = object[key];
      setSearchItems((prev) => [...prev, item]);
    }
    console.log(searchItems);
  }, [object]);

  return (
    <div className="text-white/60 font-thin">
      {searchItems.map((item, index) => (
        <div key={index}>
          {typeof item.query === "string" ? (
            <div className="flex">
              <p className="">
                {item.path.charAt(0).toLocaleUpperCase() +
                  item.path.substring(1)}
              </p>
              <p
                className={`${
                  item.operator ? "text-green-500/80" : "text-red-500/80"
                } mx-2`}
              >
                {item.operator ? "is" : "is not"}
              </p>
              <p>{item.query}</p>
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
};

export default SearchVisualizer;
