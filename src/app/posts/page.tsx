"use client";

import { useEffect, useState } from "react";
import { postStore } from "@/stores/postStore";

type Post = { id: number; title: string; body: string };

export default function PostsPage() {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<Post[]>([]);

  const fetchPosts = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
      );
      const posts = await response.json();
      console.log(posts);
      setPosts(posts);

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {posts.map((item) => (
        <div key={item.id}>
          <p>ID: {item.id}</p>
          <p>TITLE: {item.title}</p>
          <p>BODY: {item.body}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}
