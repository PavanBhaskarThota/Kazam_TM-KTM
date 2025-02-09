import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTasks } from "../../../redux/Slices/tasks.slice";
import Aos from "aos";
import "aos/dist/aos.css";
import { TaskCard } from "../../../components/subComponents/TaskCard";
import { TaskModal } from "../../../components/subComponents/TaskModal";
import "./styles.css";
import { Loading } from "../../../components/subComponents/Loading/Loading";

export const Tasks = () => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user") ?? "null");
  const { tasks, status } = useSelector((state: any) => state.tasks);
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState("pending");
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  const statuses = ["pending", "inprogress", "completed", "won't do"];

  const handleModal = () => {
    setShowModal(false);
    setSelectedTaskId(null);
  };

  const handleSelectedTask = (taskId: any) => {
    setSelectedTaskId(taskId);
    setShowModal(true);
  };

  useEffect(() => {
    Aos.init();
  });

  useEffect(() => {
    dispatch(getTasks(user.userId) as any);
  }, [dispatch, user.userId]);

  if (status === "loading") return <Loading />;

  return !showModal ? (
    <div className="min-h-[85vh] flex flex-col overflow-hidden lg:min-h-[92vh]">
      <div className="flex justify-between items-center bg-white p-2 shadow-md">
        <h1 className="text-2xl font-bold">All Tasks</h1>
        {/* <input type="text" placeholder="Search" className="border border-gray-300 w-1/2 p-2 px-6 rounded-full outline-gray-400"/> */}
        <button
          className="bg-[#468585] text-white py-2 px-4 rounded-full"
          onClick={() => setShowModal((prev) => !prev)}
        >
          + Add Task
        </button>
      </div>

      <div className="block lg:hidden">
        <div className="flex justify-between overflow-x-auto whitespace-nowrap scrollbar-hide">
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

        <div className="flex-1 min-h-[74vh] max-h-[74vh] overflow-y-auto p-4 bg-white rounded-lg">
          {tasks.length > 0 ? (
            tasks
              .filter((task) => task.status === activeTab)
              .map((task, index) => (
                <TaskCard
                  key={index}
                  handleSelectedTask={handleSelectedTask}
                  props={task}
                />
              ))
          ) : (
            <p className="text-center text-gray-500">No Tasks</p>
          )}
        </div>
      </div>

      <div className="hidden lg:grid grid-cols-4 flex-1  rounded-lg bg-white">
        {statuses.map((status) => (
          <div key={status} className="flex flex-col h-full">
            <div className="border p-3 font-bold text-center border-gray-300 capitalize">
              {status}
            </div>

            <div className="flex-1 max-h-[76vh] overflow-y-auto p-2 no-scrollbar pb-4">
              {tasks.length > 0 ? (
                tasks
                  .filter((task) => task.status === status)
                  .map((task, index) => (
                    <TaskCard
                      key={index}
                      props={task}
                      handleSelectedTask={handleSelectedTask}
                    />
                  ))
              ) : (
                <p className="text-center text-gray-500">No Tasks</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <TaskModal
      isOpen={showModal}
      selectedTaskId={selectedTaskId}
      handleModal={handleModal}
      projectId={user?.projectId}
    />
  );
};
