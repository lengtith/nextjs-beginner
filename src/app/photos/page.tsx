"use client";

import { useEffect } from "react";
import { usePhotoStore } from "@/stores/photoStore";

export default function PhotosPage() {
  const { photos, loading, fetchPhotos } = usePhotoStore();

  useEffect(() => {
    const loadPhotos = async () => {
      const result = await fetchPhotos();

      console.log(result);
    };

    loadPhotos();
  }, [fetchPhotos]);

  console.log("Store photos:", photos);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        photos.map((photo) => <p key={photo.id}>{photo.title}</p>)
      )}
    </div>
  );
}
