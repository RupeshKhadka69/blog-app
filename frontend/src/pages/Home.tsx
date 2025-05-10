import React from 'react'
import { useQuery } from '@tanstack/react-query'
const fetchPosts = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};
const Home = () => {

  const { data } = useQuery({
    queryFn:fetchPosts,
    queryKey: ["something"],
    refetchOnWindowFocus: false,
    select: (d) => d,

  })
  console.log("data",data);
  return (
    <div>Home</div>
  )
}

export default Home