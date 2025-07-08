import React, { useEffect } from "react";
import NewQueryInput from "./NewQueryInput";

interface NewMainDropdownProps {
  number: number;
  setSearchField: React.Dispatch<React.SetStateAction<FieldType>>;
}

const NewMainDropdown: React.FC<NewMainDropdownProps> = ({
  number,
  setSearchField,
}) => {
  const MAIN_DROPDOWN = JSON.parse(
    process.env.REACT_APP_MAIN_DROPDOWN
  ) as string[];

  const [query, setQuery] = React.useState<string | DateRange>("");
  const [textSearch, setTextSearch] = React.useState({
    query: query,
    path: "",
    operator: true,
  });

  useEffect(() => {
    setTextSearch((prev: SearchType) => ({ ...prev, query: query }));
  }, [query]);

  useEffect(() => {
    setSearchField((prev: FieldType) => ({
      ...prev,
      search: { ...prev.search, [number]: textSearch },
    }));
  }, [textSearch]);

  return (
    <div className="flex">
      <select
        className="bg-gray-50/0 border border-gray-950/25 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700/0 dark:border-gray-100/25 dark:placeholder-gray-400 dark:text-gray-300 dark:focus:ring-blue-500 dark:focus:border-blue-500"
        onChange={(e) => {
          setTextSearch((prev: SearchType) => ({
            ...prev,
            query: "",
            path: e.target.value,
          }));
        }}
        defaultValue={"default"}
        name="dropdown"
        id="dropdown"
      >
        <option value="default" disabled>
          Select...
        </option>
        {MAIN_DROPDOWN.map((option, index) => (
          <option key={index} value={option}>
            {option.charAt(0).toUpperCase() + option.slice(1)}
          </option>
        ))}
      </select>
      {textSearch.path ? (
        <div className="flex">
          <button
            className="px-3 py-1 text-xs font-medium text-center text-white bg-gray-500 rounded hover:bg-gray-600 dark:hover:bg-gray-400  focus:outline-none dark:text-gray-900 dark:bg-gray-300"
            onClick={() =>
              setTextSearch((prev: SearchType) => ({
                ...prev,
                operator: !prev.operator,
              }))
            }
          >
            {textSearch.operator ? "is" : "is not"}
          </button>
          <NewQueryInput option={textSearch.path} setQuery={setQuery} />
        </div>
      ) : null}
    </div>
  );
};

export default NewMainDropdown;
