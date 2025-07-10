import React, { useEffect, useState } from "react";
import NewData from "./NewData";

interface NewDatasPorps {
  datas: IData[];
  count: number;
  disable: boolean;
}

const NewDatas: React.FC<NewDatasPorps> = ({ datas, count, disable }) => {
  return (
    <div className="mt-2 text-neutral-600 dark:text-neutral-300">
      <p className="font-extralight text-sm">{count} Documents found.</p>
      <div
        className={`${
          disable
            ? "blur-[2px] transition duration-200 ease-out"
            : " blur-0 transition duration-200 ease-in"
        }`}
      >
        {[...datas].map((data, index) => (
          <NewData number={index} data={data} disable={disable} />
        ))}
      </div>
    </div>
  );
};

export default NewDatas;
