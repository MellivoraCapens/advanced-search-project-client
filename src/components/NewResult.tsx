import React, { useState, useEffect } from "react";
import { fetchData } from "../utils/fetchData";
import NewDatas from "./NewDatas";
import NewPaginationCursor from "./NewPaginationCursor";

interface NewResultProps {
  body: SearchDetailType;
}

const NewResult: React.FC<NewResultProps> = ({ body }) => {
  const [error, setError] = useState("");
  const [data, setData] = useState<Array<IData>>([]);
  const [waiting, setWaiting] = useState<boolean>(false);
  const [count, setCount] = useState<number>(0);
  const [disable, setDisable] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);

  const handleFetch = async () => {
    setWaiting(true);
    setShow(false);
    setError("");
    setData([]);
    const data = await fetchData("/data", body);
    console.log(data);

    setWaiting(false);
    if (!data.success) {
      setError(data.error);
      return;
    }

    if (data.count === 0) {
      setShow(false);
      setError("No results found");
      return;
    }

    if (data.success) {
      setData(data.data);
      setCount(data.count);
      setDisable(false);
      setShow(true);
    }
  };

  return (
    <div>
      <button
        className=" mt-2 px-3 py-2 text-xs font-medium text-center text-white bg-emerald-700 rounded-lg hover:bg-emerald-800 disabled:hover:bg-emerald-700  focus:outline-none dark:bg-emerald-700 disabled:opacity-50"
        disabled={waiting}
        onClick={handleFetch}
      >
        Result
      </button>
      {waiting ? (
        <>
          <div role="status" className="flex items-center my-4">
            <svg
              aria-hidden="true"
              className="w-8 h-8 me-2 text-gray-200 animate-spin dark:text-slate-600 fill-emerald-600 dark:fill-emerald-400"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>

            <p className=" text-neutral-600 dark:text-gray-100">
              Search in progress...
            </p>
          </div>
        </>
      ) : null}
      {error ? (
        <div className="flex justify-center">
          <fieldset className=" fieldset border-red-500 rounded border px-4">
            <p className=" text-lg font-medium text-red-500 my-2">{error}</p>
          </fieldset>
        </div>
      ) : null}

      {show ? (
        <div>
          <NewPaginationCursor
            count={count}
            body={body}
            setData={setData}
            setDisable={setDisable}
          />
          <NewDatas datas={data} count={count} disable={disable} />
        </div>
      ) : null}
    </div>
  );
};

export default NewResult;
