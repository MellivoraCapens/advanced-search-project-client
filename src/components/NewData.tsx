import React, { useEffect, useState } from "react";
import { BsCaretDownFill, BsCaretUpFill } from "react-icons/bs";

interface NewDataProps {
  data: IData;
  number: number;
}

const NewData: React.FC<NewDataProps> = ({ data, number }) => {
  const [details, setDetails] = useState<boolean>(false);

  useEffect(() => {
    if (data.highlights) {
      data.highlights.forEach((highlight) => {
        const element = document.getElementById(highlight.path + number);

        if (element) {
          const replacement = highlight.texts
            .map((text) => {
              if (text.type === "hit") {
                return `<mark>${text.value}</mark>`;
              }
              return text.value;
            })
            .join("");
          const original = highlight.texts.map((text) => text.value).join("");
          element.innerHTML = element.innerHTML.replace(original, replacement);
        }
      });
    }
  }, [details]);

  return (
    <fieldset className="fieldset overflow-hidden border-base-300 rounded w-xs border dark:bg-neutral-800 dark:border-neutral-900">
      <div className="flex justify-between bg-indigo-700 dark:bg-indigo-900 p-2 rounded-t text-gray-200 dark:text-gray-300">
        <p className="pl-0">
          <strong>{data.fullName} </strong>
        </p>
        <button
          className=""
          onClick={() => {
            console.log(data);
            setDetails((prev) => !prev);
          }}
        >
          {details ? <BsCaretUpFill /> : <BsCaretDownFill />}
        </button>
      </div>
      {details ? (
        <div className=" p-4 text-neutral-600 dark:text-gray-100">
          <h4 className="text-sm font-thin">{data.role}</h4>
          <p className="text-sm mb-1 font-thin">{data.email}</p>
          <div className="flex text-sm">
            <p>Company: </p>
            <p className="font-thin ml-1"> {data.company}</p>
          </div>
          <div className="flex text-sm">
            <p>Phone Number: </p>
            <p className="font-thin ml-1">{data.phoneNumber}</p>
          </div>
          <div className=" flex text-sm">
            <p>Age: </p>
            <p className="font-thin ml-1">
              {new Date().getFullYear() -
                new Date(data.birthdate).getFullYear()}
            </p>
          </div>
          <div className="flex text-sm">
            <p className="text-sm">Languages: </p>
            <p className="font-thin ml-1">{data.languages.join(", ")}</p>
          </div>
          <div className="flex text-sm">
            <p>Sex: </p>
            <p className="font-thin ml-1">
              {data.sex.charAt(0).toLocaleUpperCase() + data.sex.slice(1)}
            </p>
          </div>
          <fieldset className="fieldset  my-2 border-base-300 rounded w-xs border p-4 dark:bg-neutral-800 dark:border-neutral-600">
            <p className="font-bold">Description:</p>
            <p id={`description${number}`} className="font-thin">
              {data.description}
            </p>
            <p className="font-bold">Experience:</p>
            <p id={`experience${number}`} className="font-thin">
              {data.experience}
            </p>
            <p className="font-bold">Education:</p>
            <p id={`education${number}`} className="font-thin">
              {data.education}
            </p>
          </fieldset>
          <div className="flex text-sm">
            <p>Hobbies: </p>
            <p className="font-thin ml-1">{data.hobbies.join(", ")}</p>
          </div>
          <div className=" flex text-sm">
            <p>Adress: </p>
            <p className="font-thin ml-1">
              {Object.values(data.address).join(", ")}
            </p>
          </div>
        </div>
      ) : null}
    </fieldset>
  );
};

export default NewData;
