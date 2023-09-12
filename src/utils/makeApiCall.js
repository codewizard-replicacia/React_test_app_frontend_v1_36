const makeApiCall = async (url, method = "GET", body, headers = {}, isImage = false) => {
  const updatedHeaders = { ...headers };

  if (isImage) {
    delete updatedHeaders["Content-type"];
  } else {
    updatedHeaders["Content-type"] = "application/json";
  }

  const options = {
    method,
    headers: updatedHeaders,
    body
  };

  try {
    const urlExists = await checkUrlExists(url);

    if (!urlExists) {
      console.log("URL not found or unreachable")
      throw new Error("URL not found or unreachable");
    }

    const response = await fetch(url, options);

    if (!response.ok) {
      console.log("Response not OK")
      throw new Error(`HTTP Error: ${response.status} - ${response.statusText}`);
    }
    console.log("Response OK, Res: ", response)
    return response;
  } catch (error) {
    console.error("API call failed:", error.message);
    throw error;
  }
};

const checkUrlExists = async (url, timeout = 3000) => {
  try {
    const controller = new AbortController();
    const signal = controller.signal;

    const timeoutId = setTimeout(() => {
      controller.abort();
    }, timeout);

    const response = await fetch(url, { method: "GET", signal });
    clearTimeout(timeoutId);

    console.log("Response Status: ",response.status )
    return response.status === 200;
  } catch (error) {
    console.log("URL does not exist")
    return false;
  }
};

export default makeApiCall;
