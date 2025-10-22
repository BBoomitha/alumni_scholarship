import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { alumniAPI } from "../services/api";
import type { Alumni } from "../services/api";

const ManageAlumni: React.FC = () => {
  const navigate = useNavigate();

  const [alumniList, setAlumniList] = useState<Alumni[]>([]);
  const [form, setForm] = useState<Omit<Alumni, 'id' | 'created_at' | 'updated_at'>>({
    name: "", year: "", dept: "", email: "", phone: "", status: "Active"
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (isEditing && editingId) {
        const updatedAlumni = await alumniAPI.update(editingId, form);
        setAlumniList(alumniList.map(a => (a.id === editingId ? updatedAlumni : a)));
        setIsEditing(false);
        setEditingId(null);
      } else {
        const newAlumni = await alumniAPI.create(form);
        setAlumniList([...alumniList, newAlumni]);
      }

      setForm({ name: "", year: "", dept: "", email: "", phone: "", status: "Active" });
    } catch (error) {
      console.error('Error saving alumni:', error);
      alert('Error saving alumni. Please try again.');
    }
  };

  const handleEdit = (id: number) => {
    const record = alumniList.find(a => a.id === id);
    if (record) {
      setForm({
        name: record.name,
        year: record.year,
        dept: record.dept,
        email: record.email,
        phone: record.phone,
        status: record.status
      });
      setIsEditing(true);
      setEditingId(id);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this alumni?")) {
      try {
        await alumniAPI.delete(id);
        setAlumniList(alumniList.filter(a => a.id !== id));
      } catch (error) {
        console.error('Error deleting alumni:', error);
        alert('Error deleting alumni. Please try again.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fdfaf6] to-white flex flex-col font-[Poppins] text-[#1a1a2e]">
      
      <header className="bg-[#0a2342] text-white py-3 sm:py-5 px-4 sm:px-6 lg:px-10 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0 shadow-md">
        <h1 className="text-xl sm:text-2xl font-bold tracking-wide text-center sm:text-left">Manage Alumni</h1>
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
        className="flex justify-center mt-4 sm:mt-6 px-4"
      >
        <form onSubmit={handleSubmit} className="bg-white shadow-lg p-4 sm:p-6 rounded-xl w-full max-w-[500px] border border-[#d3d3c3] space-y-3">
          <h2 className="text-lg sm:text-xl font-semibold text-[#0a2342] mb-3 text-center">
            {isEditing ? "Edit Alumni" : "Add New Alumni"}
          </h2>

          <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Full Name" className="w-full border p-2 sm:p-3 rounded-md focus:outline-[#0a2342] text-sm sm:text-base" required />
          <input type="text" name="year" value={form.year} onChange={handleChange} placeholder="Year of Passing" className="w-full border p-2 sm:p-3 rounded-md focus:outline-[#0a2342] text-sm sm:text-base" required />
          <input type="text" name="dept" value={form.dept} onChange={handleChange} placeholder="Department" className="w-full border p-2 sm:p-3 rounded-md focus:outline-[#0a2342] text-sm sm:text-base" required />
          <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email" className="w-full border p-2 sm:p-3 rounded-md focus:outline-[#0a2342] text-sm sm:text-base" required />
          <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="Phone Number" className="w-full border p-2 sm:p-3 rounded-md focus:outline-[#0a2342] text-sm sm:text-base" required />

          <select name="status" value={form.status} onChange={handleChange} className="w-full border p-2 sm:p-3 rounded-md focus:outline-[#0a2342] text-sm sm:text-base">
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

          <button type="submit" className="w-full bg-[#0a2342] text-white py-2 sm:py-3 rounded-md hover:bg-[#1b3764] transition text-sm sm:text-base">
            {isEditing ? "Update Alumni" : "Add Alumni"}
          </button>
        </form>
      </motion.div>

      
      <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 overflow-y-auto max-h-[50vh] sm:max-h-[55vh]">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-lg text-gray-500">Loading alumni data...</div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-xs sm:text-sm text-[#1f1f1f] bg-white shadow-md rounded-lg overflow-hidden min-w-[600px]">
              <thead className="bg-[#1f2a44] text-white sticky top-0">
                <tr>
                  <th className="py-2 sm:py-3 px-2 sm:px-4 text-left">Name</th>
                  <th className="py-2 sm:py-3 px-2 sm:px-4 text-left">Year</th>
                  <th className="py-2 sm:py-3 px-2 sm:px-4 text-left">Dept</th>
                  <th className="py-2 sm:py-3 px-2 sm:px-4 text-left hidden sm:table-cell">Email</th>
                  <th className="py-2 sm:py-3 px-2 sm:px-4 text-left">Phone</th>
                  <th className="py-2 sm:py-3 px-2 sm:px-4 text-left">Status</th>
                  <th className="py-2 sm:py-3 px-2 sm:px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {alumniList.map((a) => (
                <tr key={a.id} className="border-b hover:bg-[#f6f6f2] transition">
                  <td className="py-2 sm:py-3 px-2 sm:px-4 font-medium">{a.name}</td>
                  <td className="py-2 sm:py-3 px-2 sm:px-4">{a.year}</td>
                  <td className="py-2 sm:py-3 px-2 sm:px-4">{a.dept}</td>
                  <td className="py-2 sm:py-3 px-2 sm:px-4 hidden sm:table-cell truncate max-w-[150px]">{a.email}</td>
                  <td className="py-2 sm:py-3 px-2 sm:px-4">{a.phone}</td>
                  <td className="py-2 sm:py-3 px-2 sm:px-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      a.status === "Active" 
                        ? "bg-green-100 text-green-800" 
                        : "bg-red-100 text-red-800"
                    }`}>
                      {a.status}
                    </span>
                  </td>
                  <td className="py-2 sm:py-3 px-2 sm:px-4 text-center">
                    <div className="flex flex-col sm:flex-row gap-1 sm:gap-2">
                      <button
                        onClick={() => handleEdit(a.id)}
                        className="bg-blue-600 text-white px-2 sm:px-3 py-1 rounded hover:bg-blue-700 text-xs"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(a.id)}
                        className="bg-red-600 text-white px-2 sm:px-3 py-1 rounded hover:bg-red-700 text-xs"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      </div>
  );
};

export default ManageAlumni;
