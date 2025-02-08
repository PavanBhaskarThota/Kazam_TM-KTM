import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, getTasks } from "../../../redux/Slices/tasks.slice";
import Aos from "aos";
import "aos/dist/aos.css";
import { TaskCard } from "../../../components/subComponents/TaskCard";
import { DynamicInput } from "../../Auth/DynamicInput";
import toast from "react-hot-toast";

export const Tasks = () => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user") ?? "null");
  const { tasks, status } = useSelector((state: any) => state.tasks);
  const [showModal, setShowModal] = useState(false);

  const handleModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    Aos.init();
  });

  useEffect(() => {
    dispatch(getTasks(user.userId) as any);
  }, [dispatch, user.userId]);

  if (status === "loading") return <h1>Loading...</h1>;

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">All Tasks</h1>
        <button
          className="bg-[#468585] text-white py-2 px-2 rounded-full cursor-pointer"
          onClick={() => setShowModal(!showModal)}
        >
          + Add Task
        </button>
      </div>
      <div className="overflow-x-auto mt-4 min-h-[70vh] border">
        <table className="min-w-full h-[100%] overflow-y-auto">
          <thead className="bg-gray-100 sticky top-0 border-b ">
            <tr className="text-center">
              <th className="px-4 py-2 border">Pending</th>
              <th className="px-4 py-2 border">Inprogress</th>
              <th className="px-4 py-2 border">Completed</th>
              <th className="px-4 py-2 border">Won't Do</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-4 py-2 w-1/4 min-h-[100%] align-top overflow-auto">
                {tasks.length > 0 ? (
                  tasks
                    .filter((task: any) => task.status === "pending")
                    .map((task: any, index: number) => (
                      <TaskCard key={index} props={task} />
                    ))
                ) : (
                  <h1 className="text-center">No Tasks</h1>
                )}
              </td>
              <td className="px-4 py-2 w-1/4 h-[100%] align-top">
                {tasks.length > 0 ? (
                  tasks
                    .filter((task: any) => task.status === "inprogress")
                    .map((task: any, index: number) => (
                      <TaskCard key={index} props={task} />
                    ))
                ) : (
                  <>
                    <h1 className="text-center">No Tasks</h1>
                  </>
                )}
              </td>
              <td className="px-4 py-2 w-1/4 h-[100%] align-top">
                {tasks.length > 0 ? (
                  tasks
                    .filter((task: any) => task.status === "completed")
                    .map((task: any, index: number) => (
                      <TaskCard key={index} props={task} />
                    ))
                ) : (
                  <h1 className="text-center">No Tasks</h1>
                )}
              </td>
              <td className="px-4 py-2 w-1/4 h-[100%] align-top">
                {tasks.length > 0 ? (
                  tasks
                    .filter((task: any) => task.status === "won't do")
                    .map((task: any, index: any) => (
                      <TaskCard key={index} props={task} />
                    ))
                ) : (
                  <h1 className="text-center">No Tasks</h1>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <TaskModal isOpen={showModal} handleModal={handleModal} />
    </div>
  );
};

const TaskModal = ({ isOpen, handleModal, projectId }: any) => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user") ?? "null");
  const [task, setTask] = useState({
    title: "",
    description: "",
    priority: "low",
    status: "pending",
  });
  const { status } = useSelector((state: any) => state.tasks);

  const handleChange = (e: any) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if(task.title === "" || task.description === "") {
      toast.error("All fields are required");
      return
    }
    dispatch(addTask({ task, userId: user.userId }) as any);
    handleModal();
  };

  if (status === "loading")
    return (
      <div className="fixed bg-white shadow-2xl inset-0 bg-opacity-50 flex flex-col z-50">
        <h1>Loading...</h1>
      </div>
    );

  return (
    isOpen && (
      <div className="fixed bg-white shadow-2xl inset-0 bg-opacity-50 flex flex-col z-50">
        <div className="flex justify-between items-center text-white h-[60px] p-2 w-full bg-[#468585] px-10 rounded-t-md">
          <h1>Add Task</h1>
          <button
            onClick={handleModal}
            className="cursor-pointer text-black text-2xl px-5"
          >
            x
          </button>
        </div>
        <div className="flex h-[100%]">
          <div className="w-[65%]  m-auto p-5">
            <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
              <DynamicInput
                title="Task Title"
                name="title"
                type="text"
                handleChange={handleChange}
                isShow={true}
                value={task.title}
              />
              <DynamicInput
                title="Description"
                name="description"
                type="textarea"
                handleChange={handleChange}
                isShow={true}
                value={task.description}
              />
              <div className="flex gap-3">
                <select
                  name="priority"
                  id=""
                  className="w-1/2 py-4 px-2 outline-gray-300 border-1 border-gray-300 rounded-md"
                  value={task.priority}
                  onChange={(e: any) =>
                    setTask({ ...task, priority: e.target.value })
                  }
                >
                  <option value="low" className="hover:bg-gray-300">
                    Low
                  </option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>

                <select
                  name="status"
                  id=""
                  className="w-1/2 py-4 px-2 outline-gray-300 border-1 border-gray-300 rounded-md"
                  value={task.status}
                  onChange={(e: any) =>
                    setTask({ ...task, status: e.target.value })
                  }
                >
                  <option value="pending">Pending</option>
                  <option value="inprogress">Inprogress</option>
                  <option value="completed">Completed</option>
                  <option value="won't do">Won't Do</option>
                </select>
              </div>

              <button
                type="submit"
                className="bg-[#468585] ml-auto px-4 py-2 rounded-md"
              >
                Add
              </button>
            </form>
          </div>
          {projectId && (
            <div className="border-l-1 w-[30%] p-10">
              <h1>Assign To</h1>
            </div>
          )}
        </div>
      </div>
    )
  );
};
