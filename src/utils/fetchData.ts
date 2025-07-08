const searchChecker = (body: any): boolean => {
  let valid: boolean = true;
  for (const key in body.search) {
    if (body.search[key].query === "") {
      valid = false;
      break;
    }
  }
  return valid;
};

const fieldChecker = (body: any): boolean => {
  let isValid = true;
  if (
    Object.keys(body.field).length === 0 &&
    Object.keys(body.search).length === 0
  ) {
    isValid = false;
  }
  if (isValid) {
    for (const key in body.field) {
      isValid = searchChecker(body.field[key]);

      if (!isValid) {
        break;
      }
      isValid = fieldChecker(body.field[key]);
    }
  }
  return isValid;
};

const bodyChecker = (body: any): boolean => {
  let isValid = true;
  isValid = searchChecker(body);
  if (
    Object.keys(body.field).length === 0 &&
    Object.keys(body.search).length === 0
  ) {
    isValid = false;
  }
  if (isValid && Object.keys(body.field).length !== 0) {
    isValid = fieldChecker(body);
  }
  return isValid;
};

export const fetchData = async (urlEnd: string, body: SearchDetailType) => {
  const url = `${process.env.REACT_APP_URL}${urlEnd}`;
  try {
    if (body.text.query === "") {
      throw new Error("Text input is empty");
    }
    if (body.detailSearch) {
      if (!bodyChecker(body)) throw new Error("Detail search is not valid");
    }

    const response = await fetch(url, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    return data;
  } catch (err: any) {
    return { message: `Error: ${err.message}!` };
  }
};
