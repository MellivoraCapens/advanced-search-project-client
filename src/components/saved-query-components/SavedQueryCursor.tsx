import React, { useState, useEffect } from "react";
import { BsCompass } from "react-icons/bs";

interface SavedQueryCursorProps {
  count: number;
  queryId: string;
  setData: React.Dispatch<React.SetStateAction<Array<IData>>>;
  setDisable: React.Dispatch<React.SetStateAction<boolean>>;
}

const SavedQueryCursor: React.FC<SavedQueryCursorProps> = ({
  count,
  queryId,
  setData,
  setDisable,
}) => {
  const [waiting, setWaiting] = useState<boolean>(false);
  const [numberOfData, setNumberOfData] = useState<number>(25);
  const [targetPage, setTargetPage] = useState<number>(0);
  const [page, setPage] = useState<number>(0);
  const [maxPage, setMaxPage] = useState<number>(
    Math.ceil(count / numberOfData)
  );
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    setMaxPage(Math.ceil(count / numberOfData));
    if (page + 1 > maxPage) {
      setPage(maxPage - 1);
    }
  }, [page, numberOfData, maxPage]);

  const fetchSavedQueryData = async (
    page: number,
    numberOfData: number,
    id: string
  ) => {
    setWaiting(true);
    setDisable(true);
    const body = { _id: id, limit: numberOfData, page };
    const URL = process.env.REACT_APP_URL + "/get-queried-data";
    const data = await fetch(URL, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const result = await data.json();

    if (!result.success) {
      setErrorMessage(result.error || "An error occurred while fetching data.");
      setError(true);
      setWaiting(false);
      return;
    }
    setError(false);
    setData(result.data);
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
            onBlur={(e) => {
              if (+e.target.value < +e.target.min) {
                setNumberOfData(+e.target.min);
                fetchSavedQueryData(page, +e.target.min, queryId);
                return;
              }
              if (+e.target.value > +e.target.max) {
                setNumberOfData(+e.target.max);
                fetchSavedQueryData(page, +e.target.max, queryId);
                return;
              }
              setNumberOfData(+e.target.value);
              fetchSavedQueryData(page, +e.target.value, queryId);
            }}
            onChange={(e) => {
              setNumberOfData(+e.target.value);
            }}
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

      <div className=" flex h-6 overflow-hidden items-center justify-center text-center mb-1">
        <button
          className="px-3 h-full text-xs text-center bg-neutral-300 disabled:hover:bg-neutral-300 rounded-l hover:bg-neutral-400 dark:hover:bg-neutral-500 focus:outline-none dark:bg-neutral-600 disabled:opacity-50 disabled:dark:hover:bg-neutral-600"
          disabled={!page || waiting || error}
          onClick={() => {
            setPage(0);
            fetchSavedQueryData(0, numberOfData, queryId);
          }}
        >
          First
        </button>
        <button
          className="px-3 h-full text-xs text-center bg-neutral-300 disabled:hover:bg-neutral-300 border-l border-white dark:border-neutral-900 hover:bg-neutral-400 dark:hover:bg-neutral-500 focus:outline-none dark:bg-neutral-600 disabled:opacity-50 disabled:dark:hover:bg-neutral-600"
          disabled={!page || waiting || error}
          onClick={() => {
            setPage((prev) => prev - 1);
            fetchSavedQueryData(page - 1, numberOfData, queryId);
          }}
        >
          Privious
        </button>
        <p className=" px-10 h-full text-base border-x border-white dark:border-neutral-900 bg-neutral-300 dark:bg-neutral-600">
          {page + 1}
        </p>
        <button
          className="px-3 text-xs h-full text-center bg-neutral-300 border-r border-white dark:border-neutral-900 disabled:hover:bg-neutral-300 hover:bg-neutral-400 dark:hover:bg-neutral-500 focus:outline-none dark:bg-neutral-600 disabled:opacity-50 disabled:dark:hover:bg-neutral-600"
          disabled={(page + 1) * numberOfData >= count || waiting || error}
          onClick={() => {
            setPage((prev) => prev + 1);
            fetchSavedQueryData(page + 1, numberOfData, queryId);
          }}
        >
          Next
        </button>
        <button
          className="px-3 text-xs text-center h-full bg-neutral-300 disabled:hover:bg-neutral-300 hover:bg-neutral-400 rounded-r dark:hover:bg-neutral-500 focus:outline-none dark:bg-neutral-600 disabled:opacity-50 disabled:dark:hover:bg-neutral-600"
          disabled={(page + 1) * numberOfData >= count || waiting || error}
          onClick={() => {
            setPage(maxPage);
            fetchSavedQueryData(maxPage - 1, numberOfData, queryId);
          }}
        >
          Last
        </button>
        <div className="flex justify-center items-center text-center ml-1 h-full overflow-hidden bg-neutral-300 dark:bg-neutral-600 text-xs rounded dark:border-neutral-900">
          <input
            className="bg-neutral-300 h-full dark:bg-neutral-600 focus:outline-none w-20 pl-1 border-white dark:border-neutral-900 border-r"
            id="target"
            min={1}
            max={maxPage}
            onChange={(e) => {
              if (+e.target.value === 0) {
                setTargetPage(0);
                return;
              }
              if (+e.target.value < +e.target.min) {
                setTargetPage(0);
                return;
              }
              if (+e.target.value > +e.target.max) {
                setTargetPage(0);
                return;
              }
              setTargetPage(+e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                if (targetPage !== 0) {
                  setPage(targetPage - 1);
                  fetchSavedQueryData(targetPage - 1, numberOfData, queryId);
                  setTargetPage(0);
                  const inputElem = document.getElementById(
                    "target"
                  ) as HTMLInputElement | null;
                  if (inputElem) {
                    inputElem.value = "";
                  }
                }
              }
            }}
            placeholder="Page"
            type="number"
          />
          <button
            className="text-lg hover:bg-neutral-400 h-full hover:dark:bg-neutral-700 px-3  disabled:opacity-50 disabled:dark:hover:bg-neutral-600 disabled:hover:bg-neutral-300"
            disabled={targetPage === 0}
            onClick={() => {
              if (targetPage) {
                setPage(targetPage - 1);
                fetchSavedQueryData(targetPage - 1, numberOfData, queryId);
                setTargetPage(0);
              }
              const inputElem = document.getElementById(
                "target"
              ) as HTMLInputElement | null;
              if (inputElem) {
                inputElem.value = "";
              }
            }}
          >
            <BsCompass />
          </button>

          <p className=" pt-0.5 text-sm px-2 h-full border-white dark:border-neutral-900 border-l">
            /{maxPage}
          </p>
        </div>
      </div>
      {error ? (
        <div className="flex justify-center">
          <div className=" flex flex-col w-max text-center justify-center py-5 text-red-500 border border-red-500 rounded-sm p-2 px-10 text-lg">
            <p className="font-semibold">
              An error occurred while fetching data.
            </p>
            <p className="text-sm">{errorMessage}</p>
            <div className="">
              <button
                className="border border-red-500 px-5 mt-5 disabled:bg-opacity-0 rounded-sm disabled:opacity-50 hover:bg-red-500 hover:text-white dark:hover:bg-red-500 dark:hover:text-neutral-900"
                disabled={waiting}
                onClick={() => fetchSavedQueryData(page, numberOfData, queryId)}
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

export default SavedQueryCursor;
