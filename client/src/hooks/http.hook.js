const useRequest = () => {
  async function request(method, url, body = null, headers = {"Content-Type": "application/json"}) {
    console.log("UseRequest", method, url, body, headers);
    return fetch(url, {
      method,
      credentials: "include",
      headers,
      body,
    })
  };

  return request;
};

export default useRequest;
