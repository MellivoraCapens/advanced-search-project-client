import React, { useEffect, useState } from "react";
import NewRadioInput from "./NewRadioInput";
import NewSearchField from "./NewSearchField";

interface NewDetailSearchProps {
  count: number;
  handleSearchDetail: React.Dispatch<React.SetStateAction<any>>;
  layerC: number;
}

const NewDetailSearch: React.FC<NewDetailSearchProps> = ({
  count,
  handleSearchDetail,
  layerC,
}) => {
  const [layerCount, setLayerCount] = useState(layerC);
  const [countDetail, setCountDetail] = useState(0);
  const [operator, setOperator] = useState<boolean>(true);
  const [searchDetail, setSearchDetail] = useState<FieldType>({
    operator: operator,
    search: {},
    field: {},
  });

  useEffect(
    () => setSearchDetail((prev) => ({ ...prev, operator: operator })),
    [operator]
  );

  useEffect(() => {
    if (handleSearchDetail) {
      handleSearchDetail((prev: SearchDetailType | FieldType) => ({
        ...prev,
        field: { ...prev.field, [count]: searchDetail },
      }));
    }
  }, [searchDetail]);

  useEffect(() => {
    setLayerCount(() => layerC + 1);
  }, []);

  return (
    <>
      <fieldset className="fieldset my-1 bg-slate-950/5 border-slate-950/20 rounded w-xs border-l p-4 dark:bg-neutral-100/5 dark:border-neutral-600">
        <NewRadioInput setOperator={setOperator} />
        <NewSearchField handleSearchField={setSearchDetail} />
        {countDetail > 0 ? (
          <button
            className="px-3 py-1 text-xs font-medium text-center text-white bg-red-800 rounded hover:bg-red-700  focus:outline-none dark:bg-red-800"
            onClick={() => {
              setSearchDetail((prev) => {
                const updatedField = { ...prev.field };
                delete updatedField[countDetail - 1];
                return {
                  ...prev,
                  field: updatedField,
                };
              });
              setCountDetail((prev) => prev - 1);
            }}
          >
            REMOVE GROUP
          </button>
        ) : null}
        {[...Array(countDetail)].map((_, i) => {
          return (
            <NewDetailSearch
              count={i}
              layerC={layerCount}
              handleSearchDetail={setSearchDetail}
            />
          );
        })}
        {countDetail === +process.env.REACT_APP_MAX_COUNT ||
        layerCount === +process.env.REACT_APP_MAX_COUNT ? null : (
          <button
            className="px-3 py-1 text-xs font-medium text-center text-white bg-green-800 rounded hover:bg-green-700  focus:outline-none dark:bg-green-800"
            onClick={() => {
              setCountDetail((prev) => prev + 1);
            }}
          >
            ADD GROUP
          </button>
        )}
      </fieldset>
    </>
  );
};

export default NewDetailSearch;
