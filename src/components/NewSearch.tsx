import React from "react";
import NewMainDetailSearch from "./NewMainDetailSearch";

const NewSearch: React.FC = () => {
  return (
    <div className="dark:bg-neutral-900 h-screen">
      <p className="text-indigo-700 pt-5 pl-5 dark:text-slate-200 text-2xl">
        Text Search:
      </p>
      <fieldset className="fieldset m-5 bg-base-200 border-base-300 rounded w-xs border p-4 dark:bg-neutral-900 dark:border-neutral-700 ">
        <NewMainDetailSearch />
      </fieldset>
    </div>
  );
};

export default NewSearch;
