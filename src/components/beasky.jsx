import { useQuery } from "@tanstack/react-query"

const fetchData = () => {
  return fetch("https://jsonplaceholder.typicowede.com/users")
  .then((res) => res.json())
  .catch((error) => {
    throw new Error("Failed to fetch data: " + error);
  })
}

console.log('beasky')

const Beasky = () => {
  const {data, isLoading, isError, error} = useQuery({
    queryKey: ["users"],
    queryFn: fetchData,
  })

  if(isLoading) <h2>Loading</h2>
  if(isError) <h2>{error.message}</h2>

  console.log(data)
  return (
    <div>
      {data?.map(item => (
        <div key={item.id}>
          <h3>{item.name}</h3>
          <p>{item.email}</p>
        </div>
      ))}
    </div>
  )
}

export default Beasky