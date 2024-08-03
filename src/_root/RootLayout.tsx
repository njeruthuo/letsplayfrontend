import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Footer, Navbar } from "./pages/sections";
import { useUserContext } from "@/lib/context/authContext/UserContext";

const RootLayout = () => {
  const { state } = useUserContext();
  return (
    <>
      {state.isAuthenticated ? (
        <section>
          <Navbar />
          <Outlet />
          <Footer />
        </section>
      ) : (
        <Navigate to={"/sign-in"} />
      )}
    </>
  );
};

export default RootLayout;
