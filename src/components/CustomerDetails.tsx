import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const CustomerDetails: React.FC = () => {
  const [photos, setPhotos] = useState<string[]>([]);
  const [imageLoading, setImageLoading] = useState(true);
  const [page, setPage] = useState(1);
  const customer = useSelector((state: RootState) => state.customer);

  const fetchPhotos = async (page: number) => {
    try {
      const response = await fetch(
        `https://picsum.photos/v2/list?limit=9&page=${page}`
      );
      const data = await response.json();
      setPhotos(
        data.map((item: { download_url: string }) => item.download_url)
      );
      setImageLoading(false);
    } catch (error) {
      console.error("Failed to fetch photos", error);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setPage((prev) => prev + 1);
    }, 10000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    fetchPhotos(page);
  }, [page]);

  return (
    <div className="p-6 ml-6 pr-8">
      <h2 className="text-2xl font-bold mb-4">{customer?.name}</h2>
      <p className="mb-2">{customer?.title}</p>
      <p className="mb-6">{customer?.address}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {imageLoading
          ? Array.from({ length: 9 }).map((_, index) => (
              <div
                key={index}
                className="w-full aspect-video rounded-xl animate-pulse bg-slate-400"
              />
            ))
          : photos.map((url, index) => (
              <img
                key={index}
                src={url}
                alt="Customer photo"
                className="w-full aspect-video object-cover rounded-xl"
              />
            ))}
      </div>
    </div>
  );
};

export default CustomerDetails;
