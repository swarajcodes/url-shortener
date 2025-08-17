import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const [longUrl, setLongUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // URL validation regex
  const isValidUrl = (string) => {
    try {
      const url = new URL(string);
      return url.protocol === "http:" || url.protocol === "https:";
    } catch (err) {
      console.log(err.message);
      return false;
    }
  };

  const handleShorten = async (e) => {
    e.preventDefault();
    setError("");

    if (!longUrl.trim()) {
      setError("Please enter a URL");
      return;
    }

    if (!isValidUrl(longUrl)) {
      setError("Please enter a valid URL (include http:// or https://)");
      return;
    }

    setIsLoading(true);

    // Simulate brief loading for better UX
    setTimeout(() => {
      navigate(`/auth?createNew=${encodeURIComponent(longUrl)}`);
      setIsLoading(false);
    }, 300);
  };

  return (
    <div className="flex flex-col items-center px-4 sm:px-6 lg:px-8">
      <h2 className="my-10 sm:my-16 text-3xl sm:text-6xl lg:text-7xl text-center font-hero">
        Gotta Short'em all <span className="font-logo">!</span>
      </h2>

      <form
        onSubmit={handleShorten}
        className="sm:h-14 flex flex-col sm:flex-row w-full md:w-2/4 gap-2"
      >
        <div className="flex-1">
          <Input
            type="url"
            value={longUrl}
            placeholder="Enter your long URL here..."
            onChange={(e) => {
              setLongUrl(e.target.value);
              if (error) setError(""); // Clear error when user types
            }}
            className="h-full py-4 px-4 bg-card border-white/20 text-foreground placeholder:text-muted-foreground focus:border-white/40 focus:ring-white/20 transition-colors"
            aria-label="URL to shorten"
            disabled={isLoading}
          />
          {error && (
            <p className="text-red-400 text-sm mt-1 px-1" role="alert">
              {error}
            </p>
          )}
        </div>

        <Button
          className="h-full bg-white text-black hover:bg-white/90 focus:bg-white/90 transition-colors font-medium px-6 disabled:opacity-50"
          type="submit"
          disabled={isLoading}
          aria-label="Shorten URL"
        >
          {isLoading ? "Processing..." : "Shorten It"}
        </Button>
      </form>

      {/* App Demo Video */}
      <div className="mt-12 mb-8 w-full max-w-4xl">
        
        <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-2xl">
          <video
            className="w-full h-full object-cover"
            controls
            poster="/video-poster.jpg"
            preload="metadata"
          >
            <source src="/app-demo.mp4" type="video/mp4" />
            <source src="/app-demo.webm" type="video/webm" />
            Your browser does not support the video tag.
          </video>
        </div>
        <p className="text-center text-muted-foreground text-sm mt-3">
          Watch how easy it is to shorten URLs and track analytics
        </p>
      </div>

      {/* Optional: Add some helpful text */}
      <p className="text-muted-foreground text-sm mt-4 text-center max-w-md">
        Transform your long URLs into clean, shareable links in seconds
      </p>
    </div>
  );
};

export default LandingPage;
