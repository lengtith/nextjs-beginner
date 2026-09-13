import { create } from "zustand";

interface PhotoProp {
  id: number;
  title: string;
  url: string;
}

interface PhotosProp {
  photos: PhotoProp[];
  loading: boolean;
  fetchPhotos: () => Promise<PhotoProp[]>;
}

export const usePhotoStore = create<PhotosProp>((set) => ({
  photos: [],
  loading: false,

  fetchPhotos: async () => {
    set({ loading: true });

    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/photos",
      );

      const photos: PhotoProp[] = await response.json();

      set({
        photos,
        loading: false,
      });

      return photos;
    } catch (error) {
      console.error("Failed to fetch photos:", error);

      set({
        loading: false,
      });
      return [];
    }
  },
}));
