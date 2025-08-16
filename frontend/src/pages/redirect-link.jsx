import { storeClicks } from "@/db/apiClicks";
import { getLongUrl } from "@/db/apiUrls";
import useFetch from "@/hooks/use-fetch";
import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { BarLoader } from "react-spinners";

const RedirectLink = () => {
  const { id } = useParams();

  // Fetch long URL
  const { loading, data, fn } = useFetch(getLongUrl, id);

  // Insert click stats
  const { fn: fnStats } = useFetch(storeClicks, {
    id: data?.id,
    originalUrl: data?.original_Url,
  });

  // Guard to prevent multiple storeClicks calls
  const calledRef = useRef(false);

  // Fetch URL on mount (or when id changes)
  useEffect(() => {
    fn();
    calledRef.current = false; // reset guard when id changes
  }, [id]);

  // Once URL is loaded, store stats and redirect
  useEffect(() => {
    if (!loading && data && !calledRef.current) {
      calledRef.current = true; // block future calls
      fnStats({ id: data.id, originalUrl: data.original_url }).finally(() => {
        window.location.href = data.original_url;
      });
    }
  }, [loading, data]);

  if (loading) {
    return (
      <>
        <BarLoader width="100%" color="#ff0000" />
        <br />
        <span className="font-logo">Redirecting ...</span>
      </>
    );
  }

  if (!data) {
    return (
      <div className="text-center p-6">
        <h2 className="text-xl font-bold text-red-600">Link not found</h2>
        <p className="text-gray-600">The short link you used does not exist.</p>
      </div>
    );
  }

  return null; // redirect happens before this
};

export default RedirectLink;
