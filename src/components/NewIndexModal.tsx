import React, { useEffect } from "react";

interface NewIndexModalProps {
  body: SearchDetailType | null;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setIndexBody: React.Dispatch<React.SetStateAction<null | SearchDetailType>>;
}

const NewIndexModal: React.FC<NewIndexModalProps> = ({
  body,
  setShowModal,
  setIndexBody,
}) => {
  document.body.style.overflow = "hidden";
  const [title, setTitle] = React.useState<string>("");
  const [usedTitles, setUsedTitles] = React.useState<Array<string>>([]);
  const [waiting, setWaiting] = React.useState<boolean>(false);

  useEffect(() => {
    const fetchTitles = async () => {
      const response = await fetch(`${process.env.REACT_APP_URL}/query-titles`);
      const data = await response.json();
      setUsedTitles(data.data);
      console.log(data.data);
    };
    fetchTitles();
  }, []);

  const handleSubmit = async () => {
    if (!body || title.length < 12) return;
    setWaiting(true);
    body.title = title;

    console.log(body);

    const res = await fetch(`${process.env.REACT_APP_URL}/query`, {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ body }),
    });
    const d = await res.json();
    if (d.success) {
      setShowModal(false);
      document.body.style.overflow = "unset";
      setIndexBody(null);
      alert("Query added indexing que successfully");
      setWaiting(false);
    }
  };

  return (
    <div className=" fixed flex justify-center items-center left-0 top-0 w-full h-full dark:text-white text-neutral-600 z-10 backdrop-blur-sm font-light">
      <div className="dark:bg-neutral-800 bg-white border border-neutral-400 dark:border-neutral-600 rounded w-[30rem] pb-[2rem]">
        <div className=" text-lg flex justify-center dark:text-neutral-200 border-b p-2 border-neutral-400 dark:border-neutral-600 mb-4">
          <h2>Create Index</h2>
        </div>
        <div className=" px-[2rem]">
          <p className=" font-thin text-sm">Set a title for index:</p>
          <input
            className={
              usedTitles.includes(title)
                ? "dark:bg-neutral-800 bg-white py-1 text-red-500 px-2 border-2 w-full mt-2  border-red-500 rounded focus:outline-none"
                : "dark:bg-neutral-800 bg-white py-1  px-2 border w-full mt-2 dark:border-neutral-600 border-neutral-400 rounded focus:outline-none"
            }
            onChange={(e) => setTitle(e.target.value)}
            maxLength={50}
            type="text"
          />
          <p
            className={
              title.length < 12
                ? "text-[10px] font-extralight text-red-500"
                : "text-[10px] font-extralight text-neutral-500"
            }
          >
            * Must have 12-50 characters.
          </p>
          <p
            className={
              usedTitles.includes(title)
                ? "text-[10px] font-extralight mt-[-6px] text-red-500"
                : "text-[10px] font-extralight mt-[-6px] text-neutral-500"
            }
          >
            * Must be unique.
          </p>
          <div className="flex justify-between">
            <div className=" flex items-center">
              {waiting ? (
                <div role="status" className="flex items-center">
                  <svg
                    aria-hidden="true"
                    className="w-6 h-6 me-2 ms-2 text-gray-200 animate-spin dark:text-slate-600 fill-emerald-600 dark:fill-emerald-400"
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
                  <p className="text-xs text-neutral-400">
                    Waiting for response...
                  </p>
                </div>
              ) : null}
            </div>
            <div>
              <button
                className="p-2 bg-emerald-700 mr-2 rounded-sm text-sm min-w-20 hover:bg-emerald-600 disabled:hover:bg-emerald-700 disabled:opacity-50 text-white"
                disabled={title.length < 12 || usedTitles.includes(title)}
                onClick={handleSubmit}
              >
                Submit
              </button>
              <button
                className="p-2 bg-red-800 rounded-sm text-sm min-w-20 hover:bg-red-700 text-white"
                onClick={() => {
                  setShowModal(false);
                  document.body.style.overflow = "unset";
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewIndexModal;
