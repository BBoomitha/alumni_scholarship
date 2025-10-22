import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { thankYouLettersAPI } from "../services/api";

const ThanksLetter: React.FC = () => {
  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [attachment, setAttachment] = useState<File | null>(null);
  const [selectedDept, setSelectedDept] = useState("All");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAttachment(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      await thankYouLettersAPI.create({
        message,
        target_dept: selectedDept,
        attachment_url: attachment ? URL.createObjectURL(attachment) : undefined
      });
      
      alert(`Thank you letter sent successfully to ${selectedDept} alumni!`);
      
      // Reset form
      setMessage("");
      setAttachment(null);
      setSelectedDept("All");
    } catch (error) {
      console.error('Error sending thank you letter:', error);
      alert('Error sending thank you letter. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fdfaf6] to-white flex flex-col font-[Poppins] text-[#1a1a2e]">
      
      <header className="bg-[#0a2342] text-white py-3 sm:py-5 px-4 sm:px-6 lg:px-10 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0 shadow-md">
        <h1 className="text-xl sm:text-2xl font-bold tracking-wide text-center sm:text-left">Send Thank You Letter</h1>
        <button
          onClick={() => navigate("/admin")}
          className="bg-[#8b9eb7] px-3 sm:px-4 py-2 rounded-md hover:bg-[#6f839f] transition text-sm sm:text-base w-full sm:w-auto"
        >
          Back to Dashboard
        </button>
      </header>

      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex-grow flex justify-center items-center p-4 sm:p-6"
      >
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-xl border border-[#d3d3c3] rounded-2xl p-4 sm:p-6 lg:p-8 w-full max-w-[500px] space-y-4 sm:space-y-5"
        >
          <h2 className="text-lg sm:text-xl font-semibold text-[#0a2342] mb-3 text-center">
            Send Thank You Letter
          </h2>

          
          <div>
            <label className="block text-xs sm:text-sm font-medium mb-1">
              Message / Note
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your appreciation message..."
              className="w-full border p-2 sm:p-3 rounded-md focus:outline-[#0a2342] min-h-[80px] sm:min-h-[100px] text-sm sm:text-base"
              required
            />
          </div>

          
          <div>
            <label className="block text-xs sm:text-sm font-medium mb-1">
              Send To (Filter)
            </label>
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="w-full border p-2 sm:p-3 rounded-md focus:outline-[#0a2342] text-sm sm:text-base"
            >
              <option value="All">All Attendees</option>
              <option value="CSE">CSE Alumni</option>
              <option value="ECE">ECE Alumni</option>
              <option value="IT">IT Alumni</option>
              <option value="EEE">EEE Alumni</option>
              <option value="MECH">MECH Alumni</option>
            </select>
          </div>

          
          <div>
            <label className="block text-xs sm:text-sm font-medium mb-1">
              Attach Thank You Letter
            </label>
            <input
              type="file"
              accept=".pdf,.doc,.docx,.jpg,.png"
              onChange={handleFileChange}
              className="w-full border p-2 sm:p-3 rounded-md focus:outline-[#0a2342] text-sm sm:text-base"
            />
            {attachment && (
              <p className="text-xs sm:text-sm text-green-600 mt-1">
                Attached: {attachment.name}
              </p>
            )}
          </div>

        
          <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-0 mt-4 sm:mt-5">
            <button
              type="submit"
              disabled={loading}
              className="bg-[#0a2342] text-white px-4 sm:px-5 py-2 sm:py-3 rounded-md hover:bg-[#1b3764] transition-all text-sm sm:text-base w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Sending...' : 'Send Letter'}
            </button>
            <button
              type="button"
              onClick={() => navigate("/admin")}
              className="border border-[#0a2342] px-4 sm:px-5 py-2 sm:py-3 rounded-md hover:bg-gray-100 transition-all text-sm sm:text-base w-full sm:w-auto"
            >
              Cancel
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default ThanksLetter;
