import React, { useEffect } from "react";
import NewSavedQueryResult from "./NewSavedQueryResult";

const NewSavedQueryMenu: React.FC = () => {
  const [savedQueries, setSavedQueries] = React.useState<Array<ISavedQuery>>(
    []
  );
  const [selectedQuery, setSelectedQuery] = React.useState<null | ISavedQuery>(
    null
  );
  useEffect(() => {
    const fetchSavedQueries = async () => {
      const response = await fetch(`${process.env.REACT_APP_URL}/queries`);
      const data = await response.json();
      setSavedQueries(data.data);
      console.log(data.data);
    };

    console.log(savedQueries);

    fetchSavedQueries();
  }, []);

  const handleClick = (query: ISavedQuery) => {
    setSelectedQuery(query);
    console.log("clicked: " + query.title);
  };

  return (
    <div className="text-neutral-600 dark:text-neutral-300">
      <div
        className={`border border-neutral-300 rounded dark:border-neutral-600 bg-gray-50 dark:bg-neutral-800 ${
          selectedQuery ? "h-[200px]" : "min-h-[200px]"
        }`}
      >
        {savedQueries.length === 0 ? (
          <div
            role="status"
            className="flex items-center w-full justify-center my-4 h-[200px]"
          >
            <svg
              aria-hidden="true"
              className="w-8 h-8 me-2 text-gray-200 animate-spin dark:text-neutral-600 fill-slate-900 dark:fill-neutral-200"
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

            <p className=" text-neutral-300 dark:text-neutral-600">
              Loading saved queries...
            </p>
          </div>
        ) : (
          <ul className="overflow-y-scroll h-full">
            {savedQueries.map((query, index) => {
              return (
                <li
                  id={`query-${index}`}
                  key={index}
                  className="border-b border-neutral-300 dark:border-neutral-600 h-[40px]"
                >
                  <button
                    onClick={() => handleClick(query)}
                    className={`flex items-center justify-between h-full w-full hover:bg-gray-100 dark:hover:bg-neutral-700/30 ${
                      selectedQuery?._id === query._id
                        ? "bg-gray-100 dark:bg-neutral-700/30"
                        : ""
                    }`}
                  >
                    <div className="flex items-center">
                      <p className="pl-4 text-left font-thin">{query.title}</p>
                    </div>
                    <div className="flex items-center text-xs font-thin h-full w-[400px]">
                      <div className="text-xs font-thin flex pr-2 w-[125px] border-l pl-2 border-neutral-300 dark:border-neutral-600">
                        <p>status:</p>
                        <p
                          className={
                            query.status === "pending"
                              ? " text-yellow-500 font-light dark:text-yellow-500/80"
                              : "text-green-500 font-light dark:text-green-500/80"
                          }
                        >
                          "{query.status}"
                        </p>
                      </div>
                      <p className=" w-[125px] text-left border-l pl-2 border-neutral-300 dark:border-neutral-600">
                        results:{" "}
                        {query.numberOfResults
                          ? Intl.NumberFormat("en-US").format(
                              query.numberOfResults
                            )
                          : "-"}
                      </p>
                      <p className="pr-3 w-[150px] dark:opacity-40 text-right ">
                        created at:{" "}
                        {new Date(query.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                        })}
                      </p>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
      {selectedQuery ? (
        <div className="mt-4">
          <h3 className="font-medium text-lg mb-2">{selectedQuery.title}</h3>
          <NewSavedQueryResult body={selectedQuery.query} />
        </div>
      ) : null}
    </div>
  );
};

export default NewSavedQueryMenu;
