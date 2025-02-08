import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteTask, updateTask } from "../../redux/Slices/tasks.slice";

export const TaskCard = ({ props }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const popoverRef = useRef<HTMLDivElement | null>(null);

  let taskPriority = "text-yellow-600";

  if (props.priority === "high") {
    taskPriority = "text-red-600";
  } else if (props.priority === "medium") {
    taskPriority = "text-orange-700";
  }

  let taskStatus = "";

  switch (props.status) {
    case "pending":
      taskStatus = "text-orange-500";
      break;
    case "inprogress":
      taskStatus = "text-yellow-500";
      break;
    case "completed":
      taskStatus = "text-green-600";
      break;
    default:
      taskStatus = "text-red-600";
      break;
  }

  const handleDelete = () => {
    dispatch(deleteTask(props._id) as any);
    console.log(props._id);
  };

  const handleUpdate = (status: string) => {
    console.log(props._id, status);
    const updateStatus = { status };
    console.log(updateStatus);
    dispatch(updateTask({ task: updateStatus, id: props._id }) as any);
  };

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

  return (
    <div className=" flex flex-col shadow py-2 px-2 gap-2 border-[0.5px] border-gray-400 mb-4 rounded-md w-[90%] min-w-[200px]">
      <div className="flex justify-between">
        <h1
          className={`text-lg font-semibold mb-2 first-letter:uppercase ${taskStatus}`}
        >
          {props.title}
        </h1>
        <p
          className={`${taskPriority} first-letter:uppercase py-2 px-3 bg-gray-200 rounded-md text-[12px]`}
        >
          {props.priority === "high"
            ? "High"
            : props.priority === "medium"
            ? "Mid"
            : "Low"}
        </p>
      </div>
      <div>
        <p className="text-[12px] text-gray-800 first-letter:uppercase">
          {props.description}
        </p>
      </div>

      <div className="flex justify-between border-t border-gray-400 items-end py-2">
        <div>
          <h2 className="text-[14px] text-gray-600 font-bold mb-0.5">
            Assigned To
          </h2>
          <div className="flex gap-2 items-center">
            <img
              src="https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg"
              alt=""
              className="w-6 h-6 rounded-full"
            />
            <span className="font-normal text-[small] text-gray-700 first-letter:uppercase">
              {props.assignedTo}
            </span>
          </div>
        </div>
        <p className="text-[10px] text-gray-600">
          {moment(props.createdAt).fromNow()}
        </p>
      </div>

      <div className="relative flex justify-end" ref={popoverRef}>
        <p
          className="text-3xl text-gray-600 m-0 p-0 px-3 cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          ...
        </p>
        <TaskUpdate
          isOpen={isOpen}
          task={props}
          handleDelete={handleDelete}
          handleUpdate={handleUpdate}
        />
      </div>
    </div>
  );
};

export const TaskUpdate = ({
  isOpen,
  task,
  handleDelete,
  handleUpdate,
}: any) => {
  const status = ["pending", "inprogress", "completed", "won't do"];

  return (
    isOpen && (
      <div className="absolute right-0 top-0 mt-2 w-48 bg-white shadow-md rounded-lg p-2 border border-gray-200">
        <div className="absolute top-[-6px] right-6 w-4 h-4 bg-white border-l border-t border-gray-200 rotate-45"></div>
        {status
          .filter((item) => item !== task.status)
          .map((item, index) => (
            <p
              key={index}
              onClick={() => handleUpdate(item)}
              className="block text-[#468585] px-4 py-2 text-sm hover:bg-gray-100 rounded first-letter:uppercase border-b border-gray-200 cursor-pointer"
            >
              {item}
            </p>
          ))}
        <button
          className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 rounded text-red-500 cursor-pointer"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    )
  );
};
