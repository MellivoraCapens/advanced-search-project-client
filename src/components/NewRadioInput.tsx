import React, { useState } from "react";

interface NewRadioInputProps {
  setOperator: React.Dispatch<React.SetStateAction<boolean>>;
}

const NewRadioInput: React.FC<NewRadioInputProps> = ({ setOperator }) => {
  const OPERATORS = JSON.parse(process.env.REACT_APP_OPERATORS) as string[];
  const [selected, setSelected] = useState<string>(OPERATORS[0]);

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const operator = e.target.value === OPERATORS[0] ? true : false;
    setOperator(operator);
  };
  return (
    <div className="flex">
      {OPERATORS.map((el) => {
        return (
          <div className="flex items-center me-2">
            <input
              className="w-4 h-4 text-blue-600 bg-gray-500 border-gray-300 dark:ring-offset-gray-800 dark:bg-gray-700/0 dark:border-gray-600"
              onChange={(e) => {
                setSelected(el);
                handleRadioChange(e);
              }}
              checked={selected === el}
              type="radio"
              id={el}
              value={el}
            />
            <label
              className="ms-1 text-sm font-medium text-gray-900 dark:text-gray-300"
              htmlFor={el}
            >
              {el}
            </label>
          </div>
        );
      })}
    </div>
  );
};

export default NewRadioInput;
