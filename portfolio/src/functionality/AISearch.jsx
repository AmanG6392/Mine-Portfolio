import { useState } from "react";
import axiosInstance from "../config/Axios.js";

const AISearch = ({ onResult, onLoading }) => {
  const [prompt, setPrompt] = useState("");

  const send = async () => {
    if (!prompt.trim()) return;

    try {
      onLoading(true);

      const res = await axiosInstance.get("/ai-res/getAi-result", {
        params: { prompt },
      });

      onResult(res.data);
      setPrompt("");
    } catch (error) {
      console.error(error);
    } finally {
      onLoading(false);
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
          onClick={send}
          className="px-5 py-3 rounded-xl bg-white text-black font-medium
                     hover:bg-gray-200 transition"
        >
          Ask
        </button>
      </div>
    </div>
  );
};

export default AISearch;