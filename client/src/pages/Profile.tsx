import React from "react";

export const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user") ?? "null");
  return (
    user && (
      <div className="w-full h-[70vh] bg-gradient-to-b from-[#A6CDC6] to-white flex justify-center items-center gap-20">
        <div className="w-1/4">
          <img
            src="https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-850.jpg?ga=GA1.1.709686024.1684082835&semt=ais_incoming"
            alt=""
            className="w-full rounded-full"
          />
        </div>
        <div className="w-1/2 bg-white p-20 rounded-md flex flex-col gap-4">
          <h1 className="text-3xl font-bold">{user.name}</h1>
          <p className="text-xl">{user.email}</p>
        </div>
      </div>
    )
  );
};
