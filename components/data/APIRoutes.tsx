import useSWR from "swr";
import axios from "axios";

const api = "http://localhost:3000/api";
const key = "/example";
const fetcher = (key: string) => axios.get(api + key).then((res) => res.data);

export default function CRUD(props: {}) {
  const { data, error } = useSWR(key, fetcher);

  return (
    <>
      {error ? (
        "Failed to load"
      ) : data === undefined ? (
        "Loading..."
      ) : (
        // Config: https://github.com/swagger-api/swagger-ui/blob/master/docs/usage/configuration.md
        <>{JSON.stringify(data, null, 2)}</>
      )}
    </>
  );
}
