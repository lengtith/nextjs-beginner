import { create } from "zustand";

const postStore = create((set) => ({
  loading: true,
  posts: [],
  error: "",

  fetchPosts: async () => {
    try {
      set({ loading: true });

      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
      );
      const data = await response.json();

      set({ posts: data });

      set({ loading: false });
    } catch (error) {
      console.log(error);
      set({ error: "error" });
    }
  },
}));

export { postStore };
