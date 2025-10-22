import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./App.css";
import { Link } from "react-router-dom";
import { eventsAPI, statsAPI } from "./services/api";
import type { Event } from "./services/api";

const App: React.FC = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [events, setEvents] = useState<Event[]>([]);
  const [stats, setStats] = useState({ alumni: 0, events: 0, programs: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [eventsData, alumniStats, eventsStats] = await Promise.all([
          eventsAPI.getAll(),
          statsAPI.getAlumniStats(),
          statsAPI.getEventsStats()
        ]);
        
        setEvents(eventsData);
        setStats({
          alumni: alumniStats.total,
          events: eventsStats.total,
          programs: 17 // Static for now, can be made dynamic later
        });
      } catch (error) {
        console.error('Error fetching data:', error);
        alert('Failed to load data from database. Please check your Supabase configuration.');
        setEvents([]);
        setStats({ alumni: 0, events: 0, programs: 0 });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  return (
    <div className="landing-page min-h-screen font-[Poppins] bg-gradient-to-b from-red-100 to-white text-[#1a1a2e] relative">

      
      <header className="bg-[#0a2342] text-white py-3 sm:py-5 px-4 sm:px-6 lg:px-10 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0 shadow-md">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-wide text-center sm:text-left">Alumni Database System</h1>
        <Link
          to="/login"
          className="bg-[#8b9eb7] hover:bg-[#728048] text-white font-semibold px-4 sm:px-5 py-2 rounded-md transition-all text-sm sm:text-base w-full sm:w-auto text-center"
        >
          Login
        </Link>
      </header>

     
      <main className="p-4 sm:p-6 lg:p-10 grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-10">

        
        <div className="lg:col-span-3 flex flex-col gap-4 sm:gap-6">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-semibold text-[#0a2342] mb-2 tracking-wide">
              Alumni Calendar & Events
            </h2>
            <div className="h-1 w-16 sm:w-20 lg:w-24 bg-[#8b9eb7] mx-auto rounded-full mb-3"></div>
            <p className="text-sm sm:text-base text-[#4a4a4a] max-w-2xl mx-auto px-4">
              Stay connected with upcoming alumni activities, reunions, and career events.
            </p>
          </div>

          
          <div className="mt-4 sm:mt-6">
            <div className="bg-white shadow-lg border border-[#d3d3c3] rounded-lg p-3 sm:p-4 lg:p-6 w-full">
              <Calendar
                onChange={(val) => setDate(val as Date)}
                value={date}
                tileClassName={({ date }) => {
                  if (date.toDateString() === new Date().toDateString()) return "today-date";
                  return "";
                }}
                tileContent={({ date }) => {
                  const dateStr = date.toISOString().split("T")[0];
                  const dayEvents = events.filter(e => e.date === dateStr);
                  
                  if (dayEvents.length === 0) return null;
                  
                  return (
                    <div className="mt-1 space-y-0.5 w-full">
                      {dayEvents.slice(0, 2).map((event, index) => (
                        <div
                          key={event.id || index}
                          className={`event-block px-1 py-0.5 rounded text-gray-700 ${event.color}`}
                          title={event.name}
                        >
                          {event.name}
                        </div>
                      ))}
                      {dayEvents.length > 2 && (
                        <div className="event-block text-gray-500 px-1 text-center">
                          +{dayEvents.length - 2} more
                        </div>
                      )}
                    </div>
                  );
                }}
              />
            </div>
          </div>
        </div>

        
        <div className="flex flex-col sm:flex-row lg:flex-col gap-4 sm:gap-6 lg:gap-6 justify-between items-stretch w-full">
          <div className="bg-white shadow-lg rounded-lg py-6 sm:py-8 px-4 sm:px-6 text-center flex-1">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0a2342]">
              {loading ? '...' : stats.alumni}
            </h3>
            <p className="text-[#4a4a4a] mt-2 text-sm sm:text-base lg:text-lg">Alumni Connected</p>
          </div>
          <div className="bg-white shadow-lg rounded-lg py-6 sm:py-8 px-4 sm:px-6 text-center flex-1">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0a2342]">
              {loading ? '...' : stats.events}
            </h3>
            <p className="text-[#4a4a4a] mt-2 text-sm sm:text-base lg:text-lg">Annual Events</p>
          </div>
          <div className="bg-white shadow-lg rounded-lg py-6 sm:py-8 px-4 sm:px-6 text-center flex-1">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0a2342]">
              {loading ? '...' : stats.programs}
            </h3>
            <p className="text-[#4a4a4a] mt-2 text-sm sm:text-base lg:text-lg">Mentorship Programs</p>
          </div>
        </div>
      </main>

     
      <footer className="bg-[#8b9eb7] text-white py-4 sm:py-5 text-center grid grid-cols-1 sm:grid-cols-2 items-center justify-items-center gap-3 sm:gap-4 mt-6 sm:mt-10 px-4">
        <button className="bg-[#0a2342] text-white px-4 sm:px-5 py-2 rounded-md hover:bg-[#1b3764] transition-all text-sm sm:text-base w-full sm:w-auto">
          Scholarship
        </button>
        <Link
          to="/login?role=admin"
          className="bg-[#0a2342] text-white px-4 sm:px-5 py-2 rounded-md hover:bg-[#1b3764] transition-all text-sm sm:text-base w-full sm:w-auto"
        >
          Admin Login
        </Link>
      </footer>
    </div>
  );
};

export default App;
