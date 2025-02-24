import { useMutation, useQuery } from "@tanstack/react-query";

const fetchData = async () => {
  return await fetch("https://jsonplaceholder.typicode.com/posts").then((res) =>
    res.json()
  );
};

const Beasky = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: fetchData,
  });


const { mutate, isPending, isError, isSuccess } = useMutation({
  mutationFn: async (newPost) =>
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPost),
    }),
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
          <h3>{item.title}</h3>
          <p>{item.body}</p>
        </div>
      ))}
    </div>
  );
};

export default Beasky;
