import React, { useEffect, useState } from "react";
import SearchVisualizer from "./SearchVisualizer";

interface FieldVisualizerProps {
  field: FieldObject;
}

const FieldVisualizer: React.FC<FieldVisualizerProps> = ({ field }) => {
  const [fieldItems, setFieldItems] = useState<FieldType[]>([]);

  useEffect(() => {
    setFieldItems([]);

    for (const key in field) {
      const item = field[key];
      setFieldItems((prev) => [...prev, item]);
    }
  }, [field]);

  useEffect(() => {
    console.log(fieldItems);
  }, [fieldItems]);

  return (
    <div className="">
      {fieldItems.map((item, index) => {
        return (
          <div className=" pl-2">
            <p className="text-yellow-500/60">
              {item.operator ? "AND:" : "OR:"}
            </p>
            <div className=" border rounded p-1 mx-1 dark:border-neutral-600 dark:bg-white/5">
              {item.search ? <SearchVisualizer object={item.search} /> : null}
              {item.field ? <FieldVisualizer field={item.field} /> : null}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FieldVisualizer;
