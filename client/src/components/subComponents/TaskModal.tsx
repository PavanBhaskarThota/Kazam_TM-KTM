import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, updateTask } from "../../redux/Slices/tasks.slice";
import toast from "react-hot-toast";
import userImage from "../../Assets/users/user1.png";
import moment from "moment";

export const TaskModal = ({
  isOpen,
  selectedTaskId,
  handleModal,
  projectId,
}: any) => {
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const user = JSON.parse(localStorage.getItem("user") ?? "null");
  const { tasks } = useSelector((state: any) => state.tasks);

  const [task, setTask] = useState({
    title: "",
    description: "",
    priority: "low",
    status: "pending",
    assignedTo: "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  const handleChange = (e: any) => {
    setTask((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (task.title.trim() === "" || task.description.trim() === "") {
      toast.error("All fields are required");
      return;
    }
    if (selectedTaskId) {
      dispatch(updateTask({ task, id: selectedTaskId }) as any);
    } else {
      dispatch(addTask({ task, userId: user?.userId }) as any);
    }
    handleModal();
  };

  useEffect(() => {
    if (selectedTaskId) {
      const existingTask = tasks.find((t: any) => t._id === selectedTaskId);
      if (existingTask) {
        setTask(existingTask);
      }
    }
  }, [selectedTaskId, tasks]);

  const handleClose = () => {
    if (isEdit) {
      setIsEdit(false);
    } else {
      handleModal();
    }
  };

  return (
    isOpen && (
      <>
        {isEdit || !selectedTaskId ? (
          <div className="h-full m-auto shadow-2xl inset-0 bg-opacity-50 z-50 border border-[#468585] bg-gradient-to-b from-[#A6CDC6] to-white lg:bg-white lg:from-white lg:to-white">
            <div className="w-[95%] h-[500px] m-auto mt-10 p-10 shadow-2xl rounded-md bg-white lg:w-1/2 border border-[#468585]">
              <h2 className="text-2xl font-semibold mb-4">
                {selectedTaskId ? "Update Task" : "New Task"}
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium">
                      Title<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="title"
                      className="w-full p-2 border border-gray-300 rounded"
                      placeholder="Enter task title"
                      value={task.title}
                      onChange={handleChange}
                      autoFocus
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">
                      Description<span className="text-red-500">*</span>
                    </label>
                    <textarea
                      placeholder="Enter task description"
                      name="description"
                      className="w-full min-h-[100px] max-h-[150px] p-2 border border-gray-300 rounded"
                      value={task.description}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium">
                        Status<span className="text-red-500">*</span>
                      </label>
                      <select
                        className="w-full p-2 border border-gray-300 rounded"
                        value={task.status}
                        name="status"
                        onChange={handleChange}
                      >
                        <option value="pending">Pending</option>
                        <option value="inprogress">In Progress</option>
                        <option value="completed">Completed</option>
                        <option value="won't do">Won't Do</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium">
                        Priority<span className="text-red-500">*</span>
                      </label>
                      <select
                        className="w-full p-2 border border-gray-300 rounded"
                        value={task.priority}
                        name="priority"
                        onChange={handleChange}
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex gap-4 mt-5">
                    <button
                      className="w-1/2 px-4 py-2 border border-gray-300 rounded cursor-pointer text-red-500"
                      onClick={handleClose}
                    >
                      Cancel
                    </button>
                    <button
                      className="w-1/2 px-4 py-2 bg-[#468585] text-white rounded cursor-pointer"
                      type="submit"
                    >
                      {selectedTaskId ? "Update task" : "Create task"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        ) : (
          <div className="h-full m-auto shadow-2xl inset-0 bg-opacity-50 z-50 border border-[#468585] bg-gradient-to-b from-[#A6CDC6] to-white lg:bg-white lg:from-white lg:to-white">
            <div className="w-[95%] m-auto mt-10 p-5 shadow-2xl rounded-md bg-white lg:w-1/2 border flex flex-col gap-6 border-[#468585]">
              <div className="border-b py-2 border-gray-400">
                <div className="flex justify-between gap-4 mb-3">
                  <h3 className="text-2xl max-w-3/4 font-semibold">
                    {task.title}
                  </h3>
                  <button
                    className="bg-gray-600 w-1/4 h-10 rounded-md cursor-pointer text-white px-4 py-2"
                    onClick={handleClose}
                  >
                    Close
                  </button>
                </div>
                <p className="text-md first-letter:uppercase text-gray-600">
                  {task.description}
                </p>
              </div>

              <div className="w-3/4 flex justify-between gap-4 lg:w-1/2">
                <div>
                  <label className="block mb-2 text-gray-600">Status:</label>
                  <p className="text-sm font-semibold px-2 py-1 bg-gray-300 text-center rounded-md">
                    {task.status.toUpperCase()}
                  </p>
                </div>
                <div>
                  <label className="block mb-2 text-gray-600">Priority:</label>
                  <p className="text-sm font-semibold px-2 py-1 bg-gray-300 text-center rounded-md">
                    {task.priority.toUpperCase()}
                  </p>
                </div>
              </div>

              <div className="border-b py-2 border-gray-400">
                <p className="mb-2 text-gray-800">Assigned to:</p>
                <div className="flex items-center gap-3">
                  <img
                    src={userImage}
                    alt=""
                    className="w-10 h-10 rounded-full"
                  />
                  <p className="text-sm font-semibold first-letter:uppercase text-gray-600">
                    {task?.assignedTo}
                  </p>
                </div>
              </div>

              <div className="w-3/4 flex justify-between gap-4 ">
                <div>
                  <p className="mb-2 text-gray-900 text-sm">Created on:</p>
                  <p className="text-sm font-semibold first-letter:uppercase text-gray-600">
                    {moment(task?.createdAt).format("MMM Do YY")}
                  </p>
                </div>
                <div>
                  <p className="mb-2 text-gray-900 text-sm">Last Updated on:</p>
                  <p className="text-sm font-semibold first-letter:uppercase text-gray-600">
                    {moment(task?.updatedAt).format("MMM Do YY")}
                  </p>
                </div>
              </div>

              <button
                className="bg-[#468585] w-full mt-5 h-15 rounded-md cursor-pointer text-white px-4 py-2"
                onClick={() => setIsEdit(true)}
              >
                Edit
              </button>
            </div>
          </div>
        )}
      </>
    )
  );
};
