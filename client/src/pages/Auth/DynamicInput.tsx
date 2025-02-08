import React from "react";

export const DynamicInput: React.FC<any> = ({
  title,
  type,
  name,
  value,
  handleChange,
  isShow,
}) => {
  return (
    <div style={{ display: isShow ? "block" : "none" }}>
      <label className="block text-gray-700 text-sm font-bold mb-2" >{title}</label>
      <input
        type={type}
        placeholder={title}
        name={name}
        value={value}
        onChange={handleChange}
        className={`bg-white p-4 rounded-md border border-gray-300 w-full outline-[0.5px] outline-gray-400 `}
      />
    </div>
  );
};
