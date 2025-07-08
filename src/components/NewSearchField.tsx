import React, { useEffect, useState } from "react";
import NewMainDropdown from "./NewMainDropdown";

interface NewSearchFieldProps {
  handleSearchField: React.Dispatch<React.SetStateAction<any>>;
}

const NewSearchField: React.FC<NewSearchFieldProps> = ({
  handleSearchField,
}) => {
  const [number, setNumber] = useState(0);
  const [searchField, setSearchField] = useState({});

  useEffect(() => {
    handleSearchField((prev: SearchDetailType | SearchObject) => ({
      ...prev,
      ...searchField,
    }));
  }, [searchField]);

  return (
    <div>
      <div className="flex mt-1">
        <p className=" text-gray-800 dark:text-gray-200 mr-1">Rules:</p>
        {number > 0 ? (
          <button
            className=" text-red-700 hover:text-white border border-red-700 hover:bg-red-800 rounded text-sm px-1 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600"
            onClick={() => {
              setSearchField((prev: FieldType) => {
                const updatedSearch = { ...prev.search };
                delete updatedSearch[number - 1];
                return {
                  ...prev,
                  search: updatedSearch,
                };
              });
              setNumber(() => number - 1);
            }}
          >
            remove
          </button>
        ) : null}
        {number === +process.env.REACT_APP_MAX_COUNT ? null : (
          <button
            className=" text-green-700 hover:text-white border border-green-700 hover:bg-green-800 rounded text-sm px-1 text-center me-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600s"
            onClick={() => {
              setSearchField((prev: FieldType) => ({
                ...prev,
                search: { ...prev.search, [number]: {} },
              }));

              setNumber(() => number + 1);
            }}
          >
            add
          </button>
        )}
      </div>
      {[...Array(number)].map((_, i) => {
        return (
          <div key={i} className="mt-1">
            <NewMainDropdown number={i} setSearchField={setSearchField} />
          </div>
        );
      })}
    </div>
  );
};

export default NewSearchField;
