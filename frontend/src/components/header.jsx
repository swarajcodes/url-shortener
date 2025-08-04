import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

const Header = () => {
  const navigate = useNavigate();
  return (
    <nav className="py-4 flex justify-between items-center">
      <Link className="flex items-start" to="/">
        <img src="/logo.png" className="h-16 p-2" alt="shrt.ly logo" />
        <span class="font-logo">shrt.ly</span>
      </Link>

      <div>
        <Button
          onClick={() => navigate("/auth")}
          variant="outline"
          className="bg-white text-black "
        >
          Login
        </Button>
      </div>
    </nav>
  );
};

export default Header;
