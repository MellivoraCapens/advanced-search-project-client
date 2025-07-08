import React, { useEffect, useState } from "react";

interface TextSearch {
  query: string;
  operator: boolean;
  path: Array<string>;
}
interface searchDetailType {
  text: TextSearch;
  detailSearch: boolean;
  operator?: boolean;
  search?: { [key: number]: any };
  field?: { [key: number]: searchDetailType };
}

interface NewTextFieldProps {
  setSearch: React.Dispatch<React.SetStateAction<searchDetailType>>;
}

const NewTextField: React.FC<NewTextFieldProps> = ({ setSearch }) => {
  const OPTIONS = JSON.parse(process.env.REACT_APP_OPTIONS) as string[];

  const [textSearch, setTextSearch] = useState<TextSearch>({
    query: "",
    operator: true,
    path: ["description"],
  });

  useEffect(
    () => setSearch((prev) => ({ ...prev, text: textSearch })),
    [textSearch]
  );

  return (
    <div>
      <div className="flex mb-1">
        <select
          className="bg-gray-50 border border-gray-300 text-gray-900 text-xs font-medium rounded-lg block p-2 dark:bg-neutral-800 dark:border-neutral-600 dark:placeholder-gray-400 dark:text-white"
          onChange={(e) =>
            setTextSearch((prev: TextSearch) => ({
              ...prev,
              path: e.target.value.split(","),
            }))
          }
          name="title"
          id="title"
        >
          {OPTIONS.map((el, i) => (
            <option key={i} value={el}>
              {el.split(",").join(", ")}
            </option>
          ))}
        </select>
        <button
          className="px-3 py-2 ml-1 text-xs font-medium text-center text-white bg-indigo-700 rounded-lg hover:bg-indigo-800  focus:outline-none dark:bg-indigo-900"
          onClick={() => {
            setTextSearch((prev: TextSearch) => ({
              ...prev,
              operator: !textSearch.operator,
            }));
          }}
        >
          {textSearch.operator ? "is" : "is not"}
        </button>
      </div>
      <textarea
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 dark:bg-neutral-800 dark:border-neutral-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        onChange={(e) => {
          setTextSearch((prev: TextSearch) => ({
            ...prev,
            query: e.target.value,
          }));
        }}
        cols={window.innerWidth / 9}
        rows={5}
        id="textField"
      />
    </div>
  );
};

export default NewTextField;
