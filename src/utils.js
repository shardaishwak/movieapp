export const fetch_url = (url, callback) => {
  fetch(url)
    .then((res) => res.json())
    .then((data) => callback(data))
    .catch((err) => console.log(err));
};

export const decrypt_query = (query) => {
  return query
    .substr(1)
    .split("&")
    .map((s) => {
      const q = s.split("=");
      return { [q[0]]: q[1] };
    });
};
