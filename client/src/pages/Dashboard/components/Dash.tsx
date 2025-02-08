import {useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTasks } from "../../../redux/Slices/tasks.slice";
export const Dash = () => {
  const dispatch = useDispatch();
  const { tasks, status } = useSelector((state: any) => state.tasks);
  const user = JSON.parse(localStorage.getItem("user") ?? "null");

  const tasksCount = tasks.length;
  const completedCount = tasks.filter(
    (task: any) => task.status === "completed"
  ).length;
  const pendingCount = tasks.filter(
    (task: any) => task.status === "pending"
  ).length;
  const inprogressCount = tasks.filter(
    (task: any) => task.status === "inprogress"
  ).length;
  const wontdoCount = tasks.filter(
    (task: any) => task.status === "won't do"
  ).length;

  const recentTasks = tasks.slice(-3);

  useEffect(() => {
    dispatch(getTasks(user.userId) as any);
  }, [dispatch, user.userId]);

  if (status === "loading")
    return (
      <div className="text-center h-1/2 flex justify-center items-center">
        <h1 className="text-4xl font-bold">Loading....</h1>
      </div>
    );

  return (
    <div className="h-full p-5 space-y-5 bg-white">
      <h1 className="text-2xl font-bold">Task Dashboard</h1>
      <div className="text-[#468585] p-4 rounded-lg text-center border">
        <h2 className="text-lg font-semibold">Total Tasks</h2>
        <p className="text-4xl font-bold">{tasksCount}</p>
      </div>
      <div>
        <h2 className="text-xl font-bold mt-5">Recently Created Tasks</h2>
        <ul className="list-disc pl-5">
          {recentTasks.map((task: any, index: number) => (
            <li key={index} className="bg-gray-100 p-2 rounded-lg my-2">
              {task.title} -{" "}
              <span className="font-semibold">{task.status}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="text-[#DDA853] p-4 border rounded-lg text-center">
          <h2 className="text-lg font-semibold">Pending</h2>
          <p className="text-4xl mt-3 font-bold">{pendingCount}</p>
        </div>
        <div className="text-[#FADA7A] p-4 border rounded-lg text-center">
          <h2 className="text-lg font-semibold">In-progress</h2>
          <p className="text-4xl mt-3 font-bold">{inprogressCount}</p>
        </div>
        <div className="text-[#77B254] p-4 border rounded-lg text-center">
          <h2 className="text-lg font-semibold">Completed</h2>
          <p className="text-4xl mt-3 font-bold">{completedCount}</p>
        </div>
        <div className="text-[#BE3144] p-4 border rounded-lg text-center">
          <h2 className="text-lg font-semibold">Won't Do</h2>
          <p className="text-4xl mt-3 font-bold">{wontdoCount}</p>
        </div>
      </div>
    </div>
  );
};
