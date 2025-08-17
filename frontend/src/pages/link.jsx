import Location from "@/components/location-stats";
import DeviceStats from "@/components/device-stats";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UrlState } from "@/context";
import { getClicksForUrl } from "@/db/apiClicks";
import { deleteUrl, getUrl } from "@/db/apiUrls";
import useFetch from "@/hooks/use-fetch";
import { Copy, Download, LinkIcon, Trash } from "lucide-react";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BarLoader, BeatLoader } from "react-spinners";

const Link = () => {
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

  const { id } = useParams();
  const { user } = UrlState();
  const navigate = useNavigate();

  const {
    loading,
    data: url,
    fn,
    error,
  } = useFetch(getUrl, { id, user_id: user?.id });

  const {
    loading: loadingStats,
    data: stats,
    fn: fnStats,
  } = useFetch(getClicksForUrl, id);

  const { loading: loadingDelete, fn: fnDelete } = useFetch(deleteUrl, id);

  useEffect(() => {
    fn();
    fnStats();
  }, []);

  if (error) {
    navigate("/dashboard");
  }

  let link = url ? (url?.custom_url ? url?.custom_url : url?.short_url) : "";

  return (
    <>
      {(loading || loadingStats) && (
        <BarLoader className="mb-4" width={"100%"} color="#ef4444" />
      )}
      <div className="flex flex-col sm:flex-row gap-10 justify-between items-start">
        {/* Left section */}
        <div className="flex flex-col items-start gap-5 bg-black/60 border border-red-600 rounded-xl p-6 w-full sm:w-2/5 shadow-lg">
          {/* Title */}
          <h1 className="text-3xl sm:text-4xl font-bold text-white hover:underline cursor-pointer">
            {url?.title}
          </h1>

          {/* Short URL */}
          <a
            href={`${window.location.origin}/${link}`}
            target="_blank"
            className="text-lg text-red-400 truncate hover:text-red-300 hover:underline transition"
          >
            {`${window.location.origin}/${link}`}
          </a>

          {/* Original URL */}
          <a
            href={url?.original_url}
            target="_blank"
            className="flex items-center gap-2 text-sm text-gray-400 truncate hover:text-gray-200 break-all text-wrap"
          >
            <LinkIcon className="w-4 h-4 text-red-400" />
            {url?.original_url}
          </a>

          {/* Created Date */}
          <span className="text-xs text-gray-500">
            {new Date(url?.created_at).toLocaleString()}
          </span>

          {/* Actions */}
          <div className="flex gap-3 mt-4">
            <Button
              variant="outline"
              className="border-red-500 text-red-400 hover:bg-red-500 hover:text-white"
              onClick={() =>
                navigator.clipboard.writeText(
                  `${window.location.origin}/${link}`
                )
              }
            >
              <Copy className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              className="border-red-500 text-red-400 hover:bg-red-500 hover:text-white"
              onClick={downloadImage}
            >
              <Download className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              className="border-red-500 text-red-400 hover:bg-red-500 hover:text-white"
              onClick={() => fnDelete()}
            >
              {loadingDelete ? (
                <BeatLoader size={5} color="white" />
              ) : (
                <Trash className="w-4 h-4" />
              )}
            </Button>
          </div>

          {/* QR Code */}
          <div className="flex items-center">
            {url?.qr ? (
              <img
                src={url.qr}
                alt="QR Code"
                className="w-48 h-48 object-contain ring-2 ring-red-500 rounded-lg mt-4"
              />
            ) : (
              <span className="text-gray-500">QR not available</span>
            )}
          </div>
        </div>

        {/* Right section - Stats */}
        <Card className="flex flex-col bg-black/50 border border-gray-700 rounded-xl p-6 w-full sm:w-3/5 shadow-md">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-white">
              Statistics
            </CardTitle>
          </CardHeader>
          {stats && stats?.length ? (
            <CardContent className="flex flex-col gap-6">
              {/* Clicks */}
              <div className="bg-black/30 border border-red-500/30 rounded-lg p-4">
                <h2 className="text-lg text-red-400 font-semibold">Clicks</h2>
                <p className="text-2xl text-white font-mono mt-2">
                  {stats?.length || "0"}
                </p>
              </div>

              {/* Location data */}
              <div className="bg-black/30 border border-gray-700 rounded-lg p-4">
                <h2 className="text-lg text-red-400 font-semibold">
                  Location Data
                </h2>
                <Location stats={stats} />
              </div>

              {/* Device info */}
              <div className="bg-black/30 border border-gray-700 rounded-lg p-4">
                <h2 className="text-lg text-red-400 font-semibold">
                  Device Info
                </h2>
                <DeviceStats stats={stats} />
              </div>
            </CardContent>
          ) : (
            <CardContent className="text-gray-400">
              {loadingStats === false ? "No stats yet" : "Loading stats ..."}
            </CardContent>
          )}
        </Card>
      </div>
    </>
  );
};

export default Link;
