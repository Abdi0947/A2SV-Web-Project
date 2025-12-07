import React from "react";

const ErrorPage = () => {
  return (
    <div className="flex flex-col h-screen items-center justify-center bg-black ">
      <div className="text-red-600 font-extrabold block text-6xl">ERROR</div>
      <div className="text-xl text-white block">
        SOMETHING WENT WRONG WHILE FETCHING DATA
      </div>
    </div>
  );
};

export default ErrorPage;
