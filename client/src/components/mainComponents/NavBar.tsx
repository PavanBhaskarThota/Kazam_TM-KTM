import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router";
import { getUser, logout } from "../../redux/Slices/user.slice";

export const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state: any) => state.users);
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement | null>(null);

  const location = useLocation();
  const showDashboard = location.pathname === "/dashboard";

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const fetchUser = () => {
    try {
      dispatch(getUser());
    } finally {
      // setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!user) {
      fetchUser();
    } else {
      // setIsLoading(false);
    }
  }, [user, dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
    setIsOpen(false);
  };

  return (
    <div className="flex justify-between items-center w-full h-[8vh] px-6 bg-[#A6CDC6] relative">
      <div className="flex gap-4 items-center">
        <h1 className="text-2xl font-bold">
          <Link to={"/"}>CoDesk</Link>
        </h1>
        {user && (
          <Link
            to={"/dashboard"}
            style={{
              fontWeight: showDashboard ? "600" : "normal",
              color: showDashboard ? "black" : "inherit",
            }}
          >
            DashBoard
          </Link>
        )}
      </div>

      {!user && (
        <div className="hidden md:flex gap-10 items-center">
          <Link to={"/"} className="hover:underline">
            Home
          </Link>
          <Link to={"/projects"} className="hover:underline">
            About
          </Link>
          <Link to={"/tasks"} className="hover:underline">
            Pricing
          </Link>
          <Link to={"/tasks"} className="hover:underline">
            Resources
          </Link>
          <Link to={"/tasks"} className="hover:underline">
            Contact
          </Link>
        </div>
      )}
      <div className="relative" ref={popoverRef}>
        {user ? (
          <div
            className="flex gap-2 items-center cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            <img
              src="https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg"
              alt="User Avatar"
              className="w-10 h-10 rounded-full border-gray-500 border"
            />
            <h2 className="font-bold">{user.name}</h2>
          </div>
        ) : (
          <button className="bg-[#468585] text-white py-2 px-4 rounded-full">
            <Link to="/auth">
              Login
            </Link>
          </button>
        )}

        {isOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-lg p-2 border border-gray-200">
            <div className="absolute top-[-6px] right-6 w-4 h-4 bg-white border-l border-t border-gray-200 rotate-45"></div>
            <Link
              to="/profile"
              className="block px-4 py-2 text-sm hover:bg-gray-100 rounded"
            >
              Profile
            </Link>
            <button
              className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 rounded text-red-500 cursor-pointer"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
