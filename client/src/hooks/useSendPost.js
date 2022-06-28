import { useMutation } from "react-query";

const useSendPost = (type) =>
  useMutation(
    (post) =>
      fetch(`http://localhost:3001/tables/whitelist/${type}`, {
        body: JSON.stringify(post),
        method: "POST",
        credential: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    {
      onSuccess: (data) => {},
    }
  );

export default useSendPost;
