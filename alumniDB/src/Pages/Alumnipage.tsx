import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { invitationsAPI } from "../services/api";
import type { Alumni } from "../services/api";

interface Invitation {
  id: number;
  title: string;
  description: string;
  sent_at: string;
}

const AlumniDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock alumni data - in a real app, this would come from authentication
  const alumni: Alumni = {
    id: 1,
    name: "Deepak Raja",
    year: "2023",
    dept: "CSE",
    email: "deepak@example.com",
    phone: "9876543210",
    whatsapp: "9876543210",
    linkedin: "linkedin.com/in/deepak",
    company: "TechCorp Pvt Ltd",
    role: "Software Engineer",
    status: "Active"
  };

  useEffect(() => {
    const fetchInvitations = async () => {
      try {
        setLoading(true);
        const data = await invitationsAPI.getAll();
        setInvitations(data);
      } catch (error) {
        console.error('Error fetching invitations:', error);
        alert('Failed to load invitations from database. Please check your Supabase configuration.');
        setInvitations([]);
      } finally {
        setLoading(false);
      }
    };

    fetchInvitations();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fdfaf6] to-white flex flex-col font-[Poppins] text-[#1a1a2e]">
      
      <header className="bg-[#0a2342] text-white py-3 sm:py-5 px-4 sm:px-6 lg:px-10 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0 shadow-md">
        <h1 className="text-xl sm:text-2xl font-bold text-center sm:text-left">Alumni Dashboard</h1>
        <button
          onClick={() => navigate("/")}
          className="bg-[#8b9eb7] px-3 sm:px-4 py-2 rounded-md hover:bg-[#6f839f] transition text-sm sm:text-base w-full sm:w-auto"
        >
          Logout
        </button>
      </header>

      
      <div className="flex-grow flex flex-col lg:flex-row gap-4 sm:gap-6 p-4 sm:p-6">
       
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white border border-[#d3d3c3] shadow-lg rounded-2xl p-4 sm:p-6 w-full lg:w-1/3"
        >
          <h2 className="text-lg sm:text-xl font-semibold text-[#0a2342] mb-3 sm:mb-4 text-center">
            My Profile
          </h2>
          <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm lg:text-[15px] text-gray-700">
            <p className="break-words"><b>Name:</b> {alumni.name}</p>
            <p className="break-words"><b>Register No:</b> {alumni.dept}{alumni.year}-{alumni.id.toString().padStart(3, '0')}</p>
            <p className="break-words"><b>Department:</b> {alumni.dept}</p>
            <p><b>Year of Passing:</b> {alumni.year}</p>
            <p className="break-words"><b>Email:</b> {alumni.email}</p>
            <p><b>Phone:</b> {alumni.phone}</p>
            <p className="break-words"><b>LinkedIn:</b> {alumni.linkedin}</p>
            <p className="break-words"><b>Company:</b> {alumni.company}</p>
            <p className="break-words"><b>Role:</b> {alumni.role}</p>
          </div>
        </motion.div>

        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white border border-[#d3d3c3] shadow-lg rounded-2xl p-4 sm:p-6 flex-grow"
        >
          <h2 className="text-lg sm:text-xl font-semibold text-[#0a2342] mb-3 sm:mb-4 text-center">
            Invitations
          </h2>
          {loading ? (
            <div className="flex justify-center items-center h-32">
              <div className="text-sm text-gray-500">Loading invitations...</div>
            </div>
          ) : invitations.length > 0 ? (
            <div className="space-y-3 sm:space-y-4 max-h-[50vh] sm:max-h-[60vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
              {invitations.map((inv) => (
                <div
                  key={inv.id}
                  className="border border-gray-200 rounded-lg p-3 sm:p-4 hover:shadow-md transition"
                >
                  <h3 className="text-base sm:text-lg font-semibold text-[#0a2342]">
                    {inv.title}
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm mb-2">
                    {new Date(inv.sent_at).toLocaleDateString('en-US', { 
                      weekday: 'short', 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </p>
                  <p className="text-gray-700 text-xs sm:text-sm">{inv.description}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 mt-6 sm:mt-10 text-sm sm:text-base">
              No invitations available yet.
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AlumniDashboard;
