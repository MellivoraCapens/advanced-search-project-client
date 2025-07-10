import React, { useState, useEffect } from "react";
import { fetchData } from "../utils/fetchData";

interface NewPaginationCursorProps {
  count: number;
  body: SearchDetailType;
  setData: React.Dispatch<React.SetStateAction<Array<IData>>>;
  setDisable: React.Dispatch<React.SetStateAction<boolean>>;
}

const NewPaginationCursor: React.FC<NewPaginationCursorProps> = ({
  count,
  body,
  setData,
  setDisable,
}) => {
  const [waiting, setWaiting] = useState<boolean>(false);
  const [numberOfData, setNumberOfData] = useState<number>(25);
  const [page, setPage] = useState<number>(0);
  const [maxPage, setMaxPage] = useState<number>(
    Math.ceil(count / numberOfData)
  );
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    setMaxPage(Math.ceil(count / numberOfData));
    if (page + 1 > maxPage) {
      setPage(maxPage - 1);
    }
  }, [page, numberOfData, maxPage]);

  const fetchPageData = async (
    page: number,
    numberOfData: number,
    body: SearchDetailType
  ) => {
    setWaiting(true);
    setDisable(true);
    const postBody: SearchDetailType = { ...body };
    postBody["limit"] = numberOfData;
    postBody["page"] = page;
    const data = await fetchData("/data/page", postBody);
    if (!data.data) {
      setError(true);
      console.log(data);
      setWaiting(false);
      return;
    }
    setError(false);
    setData(data.data);
    setWaiting(false);
    setDisable(false);
  };

  return (
    <div className=" text-sm font-extralight text-neutral-600 dark:text-neutral-300">
      <div className="flex my-5 justify-between">
        <p>
          Data per page:{" "}
          <input
            className="dark:bg-neutral-900"
            value={numberOfData}
            onBlur={() => fetchPageData(page, numberOfData, body)}
            onChange={(e) => setNumberOfData(+e.target.value)}
            type="number"
            step={5}
            min={10}
            max={100}
          />
        </p>
        <p className="ml-4">
          {page * numberOfData + 1} -{" "}
          {maxPage === page + 1 && count % numberOfData !== 0
            ? page * numberOfData + (count % numberOfData)
            : (page + 1) * numberOfData}{" "}
          documents
        </p>
      </div>

      <div className=" flex items-center justify-center mb-1">
        <button
          className="px-3 py-1 text-xs text-center bg-neutral-300 disabled:hover:bg-neutral-300 rounded-l hover:bg-neutral-400 dark:hover:bg-neutral-500 focus:outline-none dark:bg-neutral-600 disabled:opacity-50 disabled:dark:hover:bg-neutral-600"
          disabled={!page || waiting || error}
          onClick={() => {
            setPage(0);
            fetchPageData(0, numberOfData, body);
          }}
        >
          First Page
        </button>
        <button
          className="px-3 py-1 text-xs text-center bg-neutral-300 disabled:hover:bg-neutral-300 border-l border-white dark:border-neutral-900 hover:bg-neutral-400 dark:hover:bg-neutral-500 focus:outline-none dark:bg-neutral-600 disabled:opacity-50 disabled:dark:hover:bg-neutral-600"
          disabled={!page || waiting || error}
          onClick={() => {
            setPage((prev) => prev - 1);
            fetchPageData(page - 1, numberOfData, body);
          }}
        >
          Privious
        </button>
        <p className=" px-10 text-base border-x border-white dark:border-neutral-900 bg-neutral-300 dark:bg-neutral-600">
          {page + 1}
        </p>
        <button
          className="px-3 py-1 text-xs text-center bg-neutral-300 border-r border-white dark:border-neutral-900 disabled:hover:bg-neutral-300 hover:bg-neutral-400 dark:hover:bg-neutral-500 focus:outline-none dark:bg-neutral-600 disabled:opacity-50 disabled:dark:hover:bg-neutral-600"
          disabled={(page + 1) * numberOfData >= count || waiting || error}
          onClick={() => {
            setPage((prev) => prev + 1);
            fetchPageData(page + 1, numberOfData, body);
          }}
        >
          Next
        </button>
        <button
          className="px-3 py-1 text-xs text-center bg-neutral-300 disabled:hover:bg-neutral-300 rounded-r hover:bg-neutral-400 dark:hover:bg-neutral-500 focus:outline-none dark:bg-neutral-600 disabled:opacity-50 disabled:dark:hover:bg-neutral-600"
          disabled={(page + 1) * numberOfData >= count || waiting || error}
          onClick={() => {
            setPage(maxPage);
            fetchPageData(maxPage - 1, numberOfData, body);
          }}
        >
          Last Page
        </button>
      </div>
      {error ? (
        <div className="flex justify-center">
          <div className=" flex flex-col w-max text-center justify-center py-5 text-red-500 border border-red-500 rounded-sm p-2 px-10 text-lg">
            <p className="font-semibold">
              An error occurred while fetching data.
            </p>
            <div className="">
              <button
                className="border border-red-500 px-5 mt-5 rounded-sm disabled:opacity-50 hover:bg-red-500 hover:text-white dark:hover:bg-red-500 dark:hover:text-neutral-900"
                disabled={waiting}
                onClick={() => fetchPageData(page, numberOfData, body)}
              >
                Refresh
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default NewPaginationCursor;
