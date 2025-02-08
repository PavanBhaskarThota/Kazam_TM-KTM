import React from "react";

export const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user") ?? "null");

  return (
    user && (
      <div className="w-full h-[70vh] bg-gradient-to-b from-[#A6CDC6] to-white flex flex-col lg:flex-row justify-center items-center gap-10 p-6">
        <div className="w-32 h-32 lg:w-1/4 lg:h-auto">
          <img
            src="https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-850.jpg?ga=GA1.1.709686024.1684082835&semt=ais_incoming"
            alt=""
            className="w-full rounded-full"
          />
        </div>
        <div className="w-full lg:w-1/2 bg-white p-6 lg:p-20 rounded-md flex flex-col gap-4 text-center lg:text-left shadow-md">
          <h1 className="text-3xl font-bold">{user.name}</h1>
          <p className="text-xl">{user.email}</p>
        </div>
      </div>
    )
  );
};
