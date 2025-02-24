import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const fetchData = () => {
  return fetch("https://jsonplaceholder.typicode.com/posts").then((res) =>
    res.json()
  );
};

const Beasky = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchData,
  });

  const { mutate, isPending, isError, isSuccess } = useMutation({
    mutationFn: (newPost) =>
      fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPost),
      }),
      onSuccess: async (newPostResponse) => {
        const newPost = await newPostResponse.json(); // Parse response to JSON
        queryClient.setQueryData(['posts'], (oldPosts) => [...oldPosts, newPost]);
      },
      
  });

  if (isLoading) <h2>Loading...</h2>;
  if (isError) <h2>{error.message}</h2>;

  console.log(data);
  return (
    <div>
      <button
        onClick={() => {
          mutate({
            id: 2034,
            title: "New Post",
            body: "This is a new post",
            userId: 1000,
          });
        }}
      >
        {isPending ? "Adding..." : "Add user"}
      </button>
      {data?.map((item) => (
        <div key={item.id}>
          <h2>ID {item.id}</h2>
          <h3>{item.title}</h3>
          <p>{item.body}</p>
        </div>
      ))}
    </div>
  );
};

export default Beasky;
