import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Copy, Download, Trash } from "lucide-react";
import useFetch from "@/hooks/use-fetch";
import { deleteUrl } from "@/db/apiUrls";
import { BeatLoader } from "react-spinners";

const LinkCard = ({ url, fetchUrls }) => {
  const downloadImage = () => {
    const imageUrl = url?.qr;
    const fileName = url?.title;

    const anchor = document.createElement("a");
    anchor.href = imageUrl;
    anchor.download = fileName;

    document.body.appendChild(anchor);

    anchor.click();

    document.body.removeChild(anchor);
  };

  const { loading: loadingDelete, fn: fnDelete } = useFetch(deleteUrl, url?.id);

  return (
    <div className="flex flex-col md:flex-row gap-5 border bg-black/50 p-4 rounded-lg shadow-md hover:shadow-red-600/40 transition duration-300">
      <img
        src={url?.qr}
        className="h-32 w-32 object-contain ring-2 self-start"
        alt="qr-code"
      />

      <Link
        to={`/link/${url?.id}`}
        className="flex flex-col flex-1 text-gray-200 hover:text-white transition duration-200"
      >
        <span className="text-lg font-semibold hover:underline cursor-pointer text-red-500">
          {url?.title}
        </span>
        <span className="text-sm text-red-400 truncate hover:underline cursor-pointer">
          https://shwrt.ly.vercel.app/{url?.custom_url ? url?.custom_url : url.short_url}
        </span>
        <span className="flex items-center gap-1 text-xs text-gray-400 truncate">
          {url?.original_url}
        </span>
        <span className="flex items-end text-xs text-gray-500 flex-1">
          {new Date(url?.created_at).toLocaleString()}
        </span>
      </Link>

      <div className="flex gap-2">
        <Button
          variant="outline"
          onClick={() =>
            navigator.clipboard.writeText(`https://sht.ly/${url?.short_url}`)
          }
        >
          <Copy />
        </Button>
        <Button variant="outline" onClick={downloadImage}>
          <Download />
        </Button>
        <Button
          variant="outline"
          onClick={() => fnDelete().then(() => fetchUrls())}
        >
          {loadingDelete ? <BeatLoader size={5} color="white" /> : <Trash />}
        </Button>
      </div>
    </div>
  );
};

export default LinkCard;
