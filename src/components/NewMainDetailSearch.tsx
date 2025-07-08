import React, { useState, useEffect } from "react";
import NewDetailSearch from "./NewDetailSearch";
import NewRadioInput from "./NewRadioInput";
import NewSearchField from "./NewSearchField";
import NewTextField from "./NewTextField";
import NewResult from "./NewResult";

const NewMainDetailSearch: React.FC = () => {
  const [addDetail, setAddDetail] = useState(false);
  const [operator, setOperator] = useState<boolean>(true);
  const [count, setCount] = useState(0);
  const [search, setSearch] = useState<SearchDetailType>({
    text: {
      query: "",
      operator: true,
      path: [],
    },
    detailSearch: addDetail,
    operator: operator,
    search: {},
    field: {},
  });

  useEffect(() => {
    if (!addDetail) {
      setCount(0);
      setSearch((prev) => {
        const updated = { ...prev };
        delete updated.field;
        delete updated.operator;
        delete updated.search;
        return { ...updated, detailSearch: false };
      });
    }
    if (addDetail) {
      setSearch((prev) => ({
        ...prev,
        detailSearch: addDetail,
        operator: operator,
        field: {},
        search: {},
      }));
    }
  }, [addDetail]);

  useEffect(() => {
    setSearch((prev) => ({
      ...prev,
      operator: operator,
    }));
  }, [operator]);

  return (
    <>
      <NewTextField setSearch={setSearch} />
      <button
        className="px-3 py-2 text-xs font-medium text-center text-white my-1 rounded bg-indigo-700 hover:bg-indigo-800 dark:bg-indigo-900"
        onClick={() => setAddDetail((prev) => !prev)}
      >
        {addDetail ? "Remove" : "Add"} Detail From Text Search
      </button>
      {addDetail ? (
        <div>
          <fieldset className="fieldset bg-neutral-950/5 w-xs border rounded border-slate-200 p-4 dark:bg-neutral-800 dark:border-neutral-600">
            <NewRadioInput setOperator={setOperator} />
            <NewSearchField handleSearchField={setSearch} />
            {count > 0 ? (
              <button
                className="px-3 py-1 text-xs font-medium text-center text-white bg-red-800 rounded hover:bg-red-700  focus:outline-none dark:bg-red-800"
                onClick={() => {
                  setSearch((prev) => {
                    const updatedField = { ...prev.field };
                    delete updatedField[count - 1];
                    return {
                      ...prev,
                      field: updatedField,
                    };
                  });
                  setCount((prev) => prev - 1);
                }}
              >
                REMOVE GROUP
              </button>
            ) : null}
            {[...Array(count)].map((_, i) => {
              return (
                <NewDetailSearch
                  count={i}
                  layerC={1}
                  handleSearchDetail={setSearch}
                />
              );
            })}
            {count === +process.env.REACT_APP_MAX_COUNT ? null : (
              <button
                className="px-3 py-1 text-xs font-medium text-center text-white bg-green-800 rounded hover:bg-green-700  focus:outline-none dark:bg-green-800"
                onClick={() => setCount((prev) => prev + 1)}
              >
                ADD GROUP
              </button>
            )}
          </fieldset>
        </div>
      ) : null}
      <NewResult body={search} />
    </>
  );
};

export default NewMainDetailSearch;
