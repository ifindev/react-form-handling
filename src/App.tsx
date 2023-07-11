import React, { useRef } from "react";
import FormInput from "./components/FormInput";

function App() {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFocusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="p-4 bg w-screen h-screen">
      <FormInput
        type="text"
        label="Username"
        ref={inputRef}
        className="w-[300px]"
      />
      <button
        className="bg-blue-500 text-white px-6 py-2 rounded mt-2"
        onClick={handleFocusInput}
      >
        Edit
      </button>
    </div>
  );
}

export default App;
