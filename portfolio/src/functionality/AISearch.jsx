import { useState } from "react";
import axiosInstance from "../config/Axios.js";

const AISearch = ({ onResult }) => {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const send = async () => {
     console.log("Clicked");
    if (!prompt.trim()) return;

    try {
      setLoading(true);
      const res = await axiosInstance.get("/ai-res/getAi-result", {
        params: { prompt },
      });

      onResult(res.data); // 🔥 send result to parent
      setPrompt("");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
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
          onClick={send}
        >
          {loading ? "..." : "Ask"}
        </button>
      </div>
    </div>
  );
};

export default AISearch;