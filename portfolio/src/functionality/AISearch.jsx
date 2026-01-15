import { useState } from "react";
import axiosInstance from "../config/Axios.js";

const AISearch = () => {
  const [prompt, setPrompt] = useState("");
  const [showModal, setShowModal] = useState(true);

  const send = async () => {
  try {
    const res = await axiosInstance.get(
      "/ai-res/getAi-result",
      {
        params: { prompt }
      }
    );
    console.log(res.data);
  } catch (error) {
    console.error(error);
  }
};


  return (
    <div className="mt-6 w-full max-w-xl">
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Ask about my projects, education, interests..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-black/40 text-white 
                     border border-white/20 backdrop-blur-md 
                     focus:outline-none focus:ring-2 focus:ring-white/30"
        />
        <button
          className="px-5 py-3 rounded-xl bg-white text-black font-medium
                     hover:bg-gray-200 transition"
          onClick={ send}           
        >
          Ask
        </button>
      </div>

       {
         showModal && (
          <div className=""> </div>
         )
       }
    </div>

    
  );
};

export default AISearch;
