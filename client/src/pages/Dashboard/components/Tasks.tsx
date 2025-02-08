import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTasks } from "../../../redux/Slices/tasks.slice";
import Aos from "aos";
import "aos/dist/aos.css";
import { TaskCard } from "../../../components/subComponents/TaskCard";
import { TaskModal } from "../../../components/subComponents/TaskModal";
import "./styles.css";

export const Tasks = () => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user") ?? "null");
  const { tasks, status } = useSelector((state: any) => state.tasks);
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState("pending");

  const statuses = ["pending", "inprogress", "completed", "won't do"];

  const handleModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    Aos.init();
  });

  useEffect(() => {
    dispatch(getTasks(user.userId) as any);
  }, [dispatch, user.userId]);

  if (status === "loading")
    return (
      <div className="text-center h-1/2 flex justify-center items-center">
        <h1 className="text-4xl font-bold">Loading....</h1>
      </div>
    );

  return !showModal ? (
    <div className="max-h-[80vh] flex flex-col  overflow-hidden">
      <div className="flex justify-between items-center bg-white p-4 shadow-md">
        <h1 className="text-2xl font-bold">All Tasks</h1>
        <button
          className="bg-[#468585] text-white py-2 px-4 rounded-full"
          onClick={() => setShowModal((prev) => !prev)}
        >
          + Add Task
        </button>
      </div>

      <div className="block lg:hidden mt-4">
        <div className="flex justify-between border-b overflow-x-auto whitespace-nowrap scrollbar-hide">
          {statuses.map((status) => (
            <button
              key={status}
              className={`p-2 text-center capitalize min-w-[80px] ${
                activeTab === status
                  ? "border-b-4 border-[#468585] font-bold"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab(status)}
            >
              {status}
            </button>
          ))}
        </div>

        <div className="flex-1 min-h-[65vh] max-h-[65vh] overflow-y-auto p-4 bg-white rounded-lg">
          {tasks.length > 0 ? (
            tasks
              .filter((task) => task.status === activeTab)
              .map((task, index) => <TaskCard key={index} props={task} />)
          ) : (
            <p className="text-center text-gray-500">No Tasks</p>
          )}
        </div>
      </div>

      <div className="hidden lg:grid grid-cols-4 flex-1 mt-4 border rounded-lg bg-white">
        {statuses.map((status) => (
          <div key={status} className="flex flex-col h-full">
            <div className="bg-gray-100 p-3 font-bold text-center border-b capitalize">
              {status}
            </div>

            <div className="flex-1 min-h-[60vh] max-h-[65vh] overflow-y-auto p-2 no-scrollbar">
              {tasks.length > 0 ? (
                tasks
                  .filter((task) => task.status === status)
                  .map((task, index) => <TaskCard key={index} props={task} />)
              ) : (
                <p className="text-center text-gray-500">No Tasks</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <TaskModal isOpen={showModal} handleModal={handleModal} />
  );
};
