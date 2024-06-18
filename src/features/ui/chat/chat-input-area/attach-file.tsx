import { useRef } from "react";

export const AttachFile = (
  props: {
    children: React.ReactNode,
    onClick: (formData: FormData) => void;
  }
) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    // Trigger the file input click event
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Create a FormData object and append the selected file
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      props.onClick(formData);
      event.target.value = "";
    }
  };

  return (
    <>
      <div onClick={handleClick}>
        {props.children}
      </div>
      {/* This file input is hidden, and opens when the Button is clicked */}
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    </>
  );
};
