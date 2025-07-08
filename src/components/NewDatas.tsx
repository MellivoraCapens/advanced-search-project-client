import React, { useEffect, useState } from "react";
import NewData from "./NewData";

interface NewDatasPorps {
  datas: IData[];
  count: number;
}

const NewDatas: React.FC<NewDatasPorps> = ({ datas, count }) => {
  const [numberOfData, setNumberOfData] = useState<number>(25);
  const [page, setPage] = useState<number>(0);
  const [maxPage, setMaxPage] = useState<number>(
    Math.ceil(count / numberOfData)
  );
  const [visibleDatas, setVisibleDatas] = useState<Array<number>>(
    Array.from({ length: numberOfData }, (_, i) => i)
  );

  useEffect(() => {
    setVisibleDatas(
      Array.from({ length: numberOfData }, (_, i) => i + page * numberOfData)
    );
  }, [page, numberOfData, datas]);

  useEffect(() => {
    setMaxPage(Math.ceil(count / numberOfData));
    if (page + 1 > maxPage) {
      setPage(maxPage - 1);
    }
  }, [page, numberOfData, maxPage]);

  return (
    <div className="mt-2 text-neutral-600 dark:text-white">
      <p>{count} Documents found.</p>
      <div className="flex my-5 justify-between">
        <p>
          Data per page:{" "}
          <input
            className="dark:bg-neutral-900"
            value={numberOfData}
            onChange={(e) => setNumberOfData(+e.target.value)}
            type="number"
            step={5}
            min={10}
            max={100}
          />
        </p>
        <p className="ml-4">
          {page * numberOfData + 1} -{" "}
          {maxPage === page + 1
            ? page * numberOfData + (count % numberOfData)
            : (page + 1) * numberOfData}{" "}
          documents
        </p>
      </div>
      <div className=" flex items-center justify-center mb-1">
        <button
          className="px-3 py-2 text-xs font-medium text-center text-white bg-neutral-700 disabled:hover:bg-neutral-700 rounded hover:bg-neutral-800  focus:outline-none dark:bg-neutral-600 disabled:opacity-50 disabled:dark:hover:bg-neutral-600"
          disabled={!page}
          onClick={() => setPage(0)}
        >
          First Page
        </button>
        <button
          className="px-3 py-2 text-xs mx-1 font-medium text-center text-white bg-neutral-700 disabled:hover:bg-neutral-700 rounded hover:bg-neutral-800  focus:outline-none dark:bg-neutral-600 disabled:opacity-50 disabled:dark:hover:bg-neutral-600"
          disabled={!page}
          onClick={() => {
            setPage((prev) => prev - 1);
          }}
        >
          Privious
        </button>
        <p className="dark:text-white px-2"> - - - {page + 1} - - - </p>
        <button
          className="px-3 py-2 text-xs mx-1 font-medium text-center text-white bg-neutral-700 disabled:hover:bg-neutral-700 rounded hover:bg-neutral-800  focus:outline-none dark:bg-neutral-600 disabled:opacity-50 disabled:dark:hover:bg-neutral-600"
          disabled={(page + 1) * numberOfData >= count}
          onClick={() => {
            setPage((prev) => prev + 1);
          }}
        >
          Next
        </button>
        <button
          className="px-3 py-2 text-xs font-medium text-center text-white bg-neutral-700 disabled:hover:bg-neutral-700 rounded hover:bg-neutral-800  focus:outline-none dark:bg-neutral-600 disabled:opacity-50 disabled:dark:hover:bg-neutral-600"
          disabled={(page + 1) * numberOfData >= count}
          onClick={() => setPage(maxPage)}
        >
          Last Page
        </button>
      </div>
      {[...datas]
        .filter((_, i) => visibleDatas.includes(i))
        .map((data, index) => (
          <NewData number={index} data={data} />
        ))}
      <div className=" flex items-center justify-center mt-1">
        <button
          className="px-3 py-2 text-xs font-medium text-center text-white bg-neutral-700 disabled:hover:bg-neutral-700 rounded hover:bg-neutral-800  focus:outline-none dark:bg-neutral-600 disabled:opacity-50 disabled:dark:hover:bg-neutral-600"
          disabled={!page}
          onClick={() => setPage(0)}
        >
          First Page
        </button>
        <button
          className="px-3 py-2 text-xs mx-1 font-medium text-center text-white bg-neutral-700 disabled:hover:bg-neutral-700 rounded hover:bg-neutral-800  focus:outline-none dark:bg-neutral-600 disabled:opacity-50 disabled:dark:hover:bg-neutral-600"
          disabled={!page}
          onClick={() => {
            setPage((prev) => prev - 1);
          }}
        >
          Privious
        </button>
        <p className="dark:text-white px-2"> - - - {page + 1} - - - </p>
        <button
          className="px-3 py-2 text-xs mx-1 font-medium text-center text-white bg-neutral-700 disabled:hover:bg-neutral-700 rounded hover:bg-neutral-800  focus:outline-none dark:bg-neutral-600 disabled:opacity-50 disabled:dark:hover:bg-neutral-600"
          disabled={(page + 1) * numberOfData >= count}
          onClick={() => {
            setPage((prev) => prev + 1);
          }}
        >
          Next
        </button>
        <button
          className="px-3 py-2 text-xs font-medium text-center text-white bg-neutral-700 disabled:hover:bg-neutral-700 rounded hover:bg-neutral-800  focus:outline-none dark:bg-neutral-600 disabled:opacity-50 disabled:dark:hover:bg-neutral-600"
          disabled={(page + 1) * numberOfData >= count}
          onClick={() => setPage(maxPage)}
        >
          Last Page
        </button>
      </div>
    </div>
  );
};

export default NewDatas;
