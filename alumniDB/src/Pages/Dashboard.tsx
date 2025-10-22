import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { alumniAPI } from "../services/api";
import type { Alumni } from "../services/api";

const Dashboard: React.FC = () => {
  const [search, setSearch] = useState("");
  const [alumniList, setAlumniList] = useState<Alumni[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAlumni = async () => {
      try {
        setLoading(true);
        const data = await alumniAPI.getAll();
        setAlumniList(data);
      } catch (error) {
        console.error('Error fetching alumni:', error);
        alert('Failed to load alumni data from database. Please check your Supabase configuration.');
        setAlumniList([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAlumni();
  }, []);

  const filtered = alumniList.filter((a) =>
    Object.values(a).some((val) =>
      String(val).toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fdfaf6] to-white flex flex-col font-[Poppins] text-[#1a1a2e]">
      
      <header className="bg-[#0a2342] text-white py-3 sm:py-5 px-4 sm:px-6 lg:px-10 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0 shadow-md">
        <h1 className="text-xl sm:text-2xl font-bold tracking-wide text-center sm:text-left">Admin Dashboard</h1>
        <div className="flex flex-wrap justify-center sm:justify-end gap-2 sm:gap-3 w-full sm:w-auto">
          <button
            onClick={() => navigate("/invite")}
            className="bg-[#8b9eb7] px-3 sm:px-4 py-2 rounded-md hover:bg-[#6f839f] transition text-xs sm:text-sm"
          >
            Invite
          </button>

          <button
            onClick={() => navigate("/manage")}
            className="bg-[#8b9eb7] px-3 sm:px-4 py-2 rounded-md hover:bg-[#6f839f] transition text-xs sm:text-sm"
          >
            Manage Alumni
          </button>

          <button
            onClick={() => navigate("/thankyou")}
            className="bg-[#8b9eb7] px-3 sm:px-4 py-2 rounded-md hover:bg-[#6f839f] transition text-xs sm:text-sm"
          >
            Thank You Letter
          </button>

          <button
            onClick={() => navigate("/")}
            className="bg-red-500 px-3 sm:px-4 py-2 rounded-md hover:bg-red-600 transition text-xs sm:text-sm"
          >
            Logout
          </button>
        </div>
      </header>


      
      <div className="p-4 flex justify-center">
        <input
          type="text"
          placeholder="Search alumni..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 sm:p-3 w-full max-w-[280px] focus:outline-[#0a2342] text-sm sm:text-base"
        />
      </div>

      
      <div className="flex-grow px-4 sm:px-6 lg:px-8 pb-6 overflow-y-auto max-h-[65vh] scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-lg text-gray-500">Loading alumni data...</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
            {filtered.map((a) => (
            <motion.div
              key={a.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl shadow-sm border border-[#d3d3c3] p-3 sm:p-4 hover:shadow-md transition text-sm sm:text-base leading-snug min-h-[180px] sm:h-[190px] flex flex-col justify-between"
            >
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-[#0a2342] truncate">{a.name}</h3>
                <p className="text-xs sm:text-sm text-gray-600">
                  {a.dept} • {a.year}
                </p>
                <div className="mt-1 text-xs sm:text-sm text-gray-700 space-y-[1px] sm:space-y-[2px]">
                  <p className="truncate"><b>WA:</b> {a.whatsapp || a.phone}</p>
                  <p className="truncate"><b>Email:</b> {a.email}</p>
                  <p><b>Ph:</b> {a.phone}</p>
                </div>
              </div>
              <p
                className={`mt-2 self-start px-2 py-[2px] text-[10px] sm:text-[12px] rounded-full ${
                  a.status === "Active"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {a.status}
              </p>
            </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
