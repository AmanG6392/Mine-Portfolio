import { useState } from "react";
import emailjs from "@emailjs/browser";
import Alert from "../functionality/Alert";
import { Particles } from "../functionality/Particles";
const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const showAlertMessage = (type, message) => {
    setAlertType(type);
    setAlertMessage(message);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 5000);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log("From submitted:", formData);
      await emailjs.send(
        import.meta.env.VITE_SERVICE_ID,
        import.meta.env.VITE_TEMPLATE_ID,
        {
          from_name: formData.name,
          to_name: "Aman Gupta",
          from_email: formData.email,
          to_email: "amanguptaa127@gmail.com",
          message: formData.message,
        },
        import.meta.env.VITE_PUBLIC_KEY
      );
      setIsLoading(false);
      setFormData({ name: "", email: "", message: "" });
      showAlertMessage("success", "You message has been sent!");
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      showAlertMessage("danger", "Somthing went wrong!");
    }
  };
  return (
    <section className="relative flex items-center justify-center min-h-screen px-4 bg-black">
  <Particles
    className="absolute inset-0 -z-50"
    quantity={120}
    ease={80}
    color="#ffffff"
    refresh
  />

  {showAlert && (
    <div className="fixed top-6 z-50">
      <Alert type={alertType} text={alertMessage} />
    </div>
  )}

  <div className="w-full max-w-md p-8 border shadow-2xl backdrop-blur-xl rounded-2xl border-white/10 bg-white/5">
    {/* Header */}
    <div className="mb-8 text-center">
      <h2 className="text-3xl font-bold text-white">
        Let’s <span className="text-lavender">Talk</span>
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-neutral-400">
        Whether you're looking to build a new website, improve your platform,
        or bring a unique idea to life — I’m here to help.
      </p>
    </div>

    {/* Form */}
    <form className="space-y-5" onSubmit={handleSubmit}>
      {/* Name */}
      <div>
        <label htmlFor="name" className="block mb-1 text-sm text-neutral-300">
          Full Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          className="
            w-full px-4 py-3 text-white transition
            bg-black/40 border border-white/10 rounded-lg
            placeholder-neutral-500
            focus:outline-none focus:ring-2 focus:ring-lavender/60
          "
          placeholder="John Doe"
          autoComplete="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block mb-1 text-sm text-neutral-300">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          className="
            w-full px-4 py-3 text-white transition
            bg-black/40 border border-white/10 rounded-lg
            placeholder-neutral-500
            focus:outline-none focus:ring-2 focus:ring-lavender/60
          "
          placeholder="johndoe@email.com"
          autoComplete="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block mb-1 text-sm text-neutral-300">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows="4"
          className="
            w-full px-4 py-3 text-white transition resize-none
            bg-black/40 border border-white/10 rounded-lg
            placeholder-neutral-500
            focus:outline-none focus:ring-2 focus:ring-lavender/60
          "
          placeholder="Share your thoughts..."
          value={formData.message}
          onChange={handleChange}
          required
        />
      </div>

      {/* Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="
          relative w-full py-3 mt-3 overflow-hidden
          font-semibold text-white rounded-lg
          bg-gradient-to-r from-lavender to-royal
          transition-all duration-300
          hover:scale-[1.02] hover:shadow-lg
          active:scale-95 disabled:opacity-60
        "
      >
        {isLoading ? "Sending..." : "Send Message"}
      </button>
    </form>
  </div>
</section>

  );
};

export default Contact;