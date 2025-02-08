import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

export const DashBoard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname.split("/");

  return (
    <div className="flex h-[92vh] bg-gray-100">
      <div
        className={`fixed inset-y-0 left-0 text-black w-52 p-5 transform bg-gradient-to-b from-[#A6CDC6] to-white ${
          isOpen ? "translate-x-0" : "-translate-x-64"
        } transition-transform duration-300 ease-in-out md:relative md:translate-x-0`}
      >
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <button
            onClick={() => setIsOpen(false)}
            className="font-bold text-red-700 text-2xl md:hidden"
          >
            {`x`}
          </button>
        </div>
        <nav>
          <ul className="space-y-4">
            <Link to={"/dashboard"}>
              <li
                className={`flex items-center space-x-3 cursor-pointer ${
                  currentPath[1] === "dashboard" && currentPath[2] === undefined
                    ? "bg-[#468585]"
                    : ""
                }  hover: p-2 rounded`}
                onClick={() => setIsOpen(false)}
              >
                Dashboard
              </li>
            </Link>
            <Link to={"/dashboard/tasks"}>
              <li
                className={`flex items-center space-x-3 cursor-pointer ${
                  currentPath[2] === "tasks" ? "bg-[#468585]" : ""
                }  hover: p-2 rounded`}
                onClick={() => setIsOpen(false)}
              >
                Tasks
              </li>
            </Link>
            {/* <Link to={"/dashboard/projects"}>
              <li
                className={`flex items-center space-x-3 cursor-pointer ${
                  currentPath[2] === "projects" ? "bg-[#468585]" : ""
                }  hover: p-2 rounded`}
                onClick={() => setIsOpen(false)}
              >
                <FaHome /> 
                Projects
              </li>
            </Link> */}
          </ul>
        </nav>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="bg-[#A6CDC6]">
          <header className="bg-white shadow p-4 flex items-center">
            <button
              onClick={() => setIsOpen(true)}
              className="font-bold text-gray-700 text-2xl md:hidden"
            >
              {`>`}
            </button>
            {/* <h1 className="ml-4 text-xl font-semibold first-letter:uppercase">
              {currentPath.length > 2 ? currentPath[2] : "Dashboard"}
            </h1> */}
          </header>
        </div>
        <main className=" flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
