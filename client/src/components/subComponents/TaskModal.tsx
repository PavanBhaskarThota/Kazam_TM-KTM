import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "../../redux/Slices/tasks.slice";
import toast from "react-hot-toast";
import { DynamicInput } from "../../pages/Auth/DynamicInput";

export const TaskModal = ({ isOpen, handleModal, projectId }: any) => {
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
  
  return (
    isOpen && (
      <div className="bg-white w-[100%] m-auto h-[100%] shadow-2xl inset-0 bg-opacity-50 flex flex-col z-50">
        <div className="flex justify-between items-center text-white  p-2 w-full bg-[#468585] px-10 rounded-t-md">
          <h1>Add Task</h1>
          <button
            onClick={handleModal}
            className="cursor-pointer text-black text-2xl px-5"
          >
            x
          </button>
        </div>
        <div className="flex h-[100%]">
          <div className="w-[95%] lg:w-1/2  m-auto p-5">
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
                className="bg-[#468585] ml-auto px-4 py-2 rounded-md text-white"
              >
                Add Task
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
