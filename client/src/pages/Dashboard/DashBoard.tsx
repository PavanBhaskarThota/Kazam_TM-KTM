import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
// import { FaBars, FaTimes, FaHome, FaTasks, FaCog } from "react-icons/fa";

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
          <button
            onClick={() => setIsOpen(false)}
            className="font-bold text-red-700 text-2xl md:hidden"
          >
            {/* <FaTimes size={24} />  */}
            {`<`}
          </button>
        </div>
        <nav>
          <ul className="space-y-4">
            <Link to={"/dashboard"}>
              <li className="flex items-center space-x-3 cursor-pointer hover:bg-[#468585] p-2 rounded">
                {/* <FaHome />  */}
                Dashboard
              </li>
            </Link>
            <Link to={"/dashboard/projects"}>
              <li className="flex items-center space-x-3 cursor-pointer hover:bg-[#468585] p-2 rounded">
                {/* <FaHome />  */}
                Projects
              </li>
            </Link>
            <Link to={"/dashboard/tasks"}>
              <li className="flex items-center space-x-3 cursor-pointer hover:bg-[#468585] p-2 rounded">
                {/* <FaTasks /> */}
                Tasks
              </li>
            </Link>
            <li className="flex items-center space-x-3 cursor-pointer hover:bg-[#468585] p-2 rounded">
              {/* <FaCog />  */}
              <span>Settings</span>
            </li>
          </ul>
        </nav>
      </div>

      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow p-4 flex items-center">
          <button
            onClick={() => setIsOpen(true)}
            className="font-bold text-gray-700 text-2xl md:hidden"
          >
            {/* <FaBars size={24} />  */}
            {`>`}
          </button>
          <h1 className="ml-4 text-xl font-semibold first-letter:uppercase">{currentPath.length>2 ? currentPath[2] : "Dashboard"}</h1>
        </header>
        <main className="p-6 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
