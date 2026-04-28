import React, { useState, useEffect } from 'react';
import { roadmapData, projectsData } from './data';

// PASTE YOUR GOOGLE SCRIPT WEB APP URL HERE:
const API_URL = "https://script.google.com/macros/s/AKfycbwFxsj40cP9_JcNBh3bmjIrBkq4zMaqi2m0SF6KFjMTkLCe89M_hXRieJHWRZsyfdxW/exec";

export default function App() {
  const [completedWeeks, setCompletedWeeks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('roadmap');
  const [isAdmin, setIsAdmin] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');

  // LOAD DATA FROM GOOGLE SHEETS ON STARTUP
  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        setCompletedWeeks(Array.isArray(data) ? data : []);
        setIsLoading(false);
      })
      .catch(error => {
        console.error("Error loading data from Google Sheets:", error);
        setIsLoading(false);
      });
  }, []);

  const toggleWeek = async (weekId) => {
    if (!isAdmin) return;

    const newWeeks = completedWeeks.includes(weekId) 
      ? completedWeeks.filter(id => id !== weekId) 
      : [...completedWeeks, weekId];

    // Optimistic UI update
    setCompletedWeeks(newWeeks);

    // BACKGROUND SYNC: Send the new data to Google Sheets
    try {
      await fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(newWeeks),
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        }
      });
    } catch (error) {
      console.error("Error saving data to Google Sheets:", error);
      alert("Failed to sync to database. Check your internet connection.");
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (passwordInput === "0311") {
      setIsAdmin(true);
      setPasswordInput('');
    } else {
      alert("Incorrect Password!");
    }
  };

  // Calculations
  const totalWeeks = 52;
  const progressPercentage = Math.round((completedWeeks.length / totalWeeks) * 100) || 0;
  const weeksRemaining = totalWeeks - completedWeeks.length;
  
  const estimatedDate = new Date();
  estimatedDate.setDate(estimatedDate.getDate() + (weeksRemaining * 7));
  const formattedDate = estimatedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  const getDiffColor = (diff) => {
    switch(diff) {
      case 'Easy': return 'bg-teal-100 text-teal-700';
      case 'Medium': return 'bg-blue-100 text-blue-700';
      case 'Hard': return 'bg-purple-100 text-purple-700';
      case 'Expert': return 'bg-rose-100 text-rose-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#faf5ff] flex items-center justify-center">
        <div className="text-2xl font-bold text-purple-500 animate-pulse">
          Syncing with Database...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf5ff] text-slate-800 font-sans selection:bg-pink-200 p-4 md:p-8">
      
      {/* Top Navbar & Admin Login */}
      <div className="max-w-4xl mx-auto flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          DevOps Master Planner
        </h1>
        
        {isAdmin ? (
          <button onClick={() => setIsAdmin(false)} className="px-4 py-2 bg-pink-100 text-pink-700 rounded-full text-sm font-bold shadow-sm hover:bg-pink-200 transition-all">
            Lock Mode 🔒
          </button>
        ) : (
          <form onSubmit={handleLogin} className="flex gap-2">
            <input 
              type="password" 
              placeholder="Admin Pass" 
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              className="px-3 py-1 rounded-full border-2 border-purple-200 focus:outline-none focus:border-pink-300 text-sm w-32"
            />
            <button type="submit" className="px-4 py-1 bg-purple-200 text-purple-700 rounded-full text-sm font-bold shadow-sm hover:bg-purple-300 transition-all">
              Unlock 🔓
            </button>
          </form>
        )}
      </div>

      <div className="max-w-4xl mx-auto">
        
        {/* Dashboard Card */}
        <div className="bg-white p-6 md:p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-purple-50 mb-8 transform transition-all hover:scale-[1.01] duration-300">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h2 className="text-3xl font-black text-slate-700 mb-1">Your Progress</h2>
              <p className="text-slate-400 font-medium">Estimated Completion: <span className="text-purple-500">{formattedDate}</span></p>
            </div>
            <div className="mt-4 md:mt-0 text-right">
              <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-pink-400 to-purple-500">
                {progressPercentage}%
              </span>
              <p className="text-slate-400 font-medium text-sm">{completedWeeks.length} / {totalWeeks} Modules</p>
            </div>
          </div>
          
          <div className="w-full bg-slate-100 rounded-full h-4 overflow-hidden shadow-inner">
            <div 
              className="bg-gradient-to-r from-pink-300 to-purple-400 h-full rounded-full transition-all duration-1000 ease-out relative" 
              style={{ width: `${progressPercentage}%` }}
            >
              <div className="absolute top-0 right-0 bottom-0 left-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.2)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.2)_50%,rgba(255,255,255,0.2)_75%,transparent_75%,transparent)] bg-[length:20px_20px] animate-[progress-stripes_2s_linear_infinite]"></div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-4 mb-8">
          <button 
            onClick={() => setActiveTab('roadmap')}
            className={`flex-1 py-3 rounded-2xl font-bold text-lg transition-all duration-300 ${activeTab === 'roadmap' ? 'bg-purple-500 text-white shadow-lg shadow-purple-200 transform -translate-y-1' : 'bg-white text-slate-400 hover:bg-purple-50'}`}
          >
            📚 Roadmap Skills
          </button>
          <button 
            onClick={() => setActiveTab('projects')}
            className={`flex-1 py-3 rounded-2xl font-bold text-lg transition-all duration-300 ${activeTab === 'projects' ? 'bg-pink-400 text-white shadow-lg shadow-pink-200 transform -translate-y-1' : 'bg-white text-slate-400 hover:bg-pink-50'}`}
          >
            🚀 Projects Hub
          </button>
        </div>

        {/* ROADMAP TAB */}
        {activeTab === 'roadmap' && (
          <div className="space-y-6">
            {!isAdmin && (
              <div className="bg-amber-50 border border-amber-200 text-amber-600 p-4 rounded-xl text-center font-medium animate-pulse">
                You are in view-only mode. Enter the admin password to tick off skills.
              </div>
            )}
            
            {roadmapData.map((phase, index) => (
              <div key={index} className="bg-white p-6 rounded-3xl shadow-sm border border-purple-50 transition-all duration-300 hover:shadow-md">
                <h3 className="text-xl font-bold text-slate-700 mb-4 pb-2 border-b-2 border-slate-50">
                  {phase.phase}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {phase.weeks.map((week) => {
                    const isChecked = completedWeeks.includes(week.id);
                    return (
                      <div 
                        key={week.id} 
                        onClick={() => toggleWeek(week.id)}
                        className={`group relative flex items-center p-3 rounded-xl border-2 transition-all duration-300 ${isAdmin ? 'cursor-pointer' : 'cursor-not-allowed'} ${isChecked ? 'bg-purple-50 border-purple-200 opacity-60' : 'bg-white border-slate-100 hover:border-pink-200 hover:bg-pink-50/30'}`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          readOnly
                          className={`w-6 h-6 rounded-md mr-4 transition-all duration-300 ${isChecked ? 'accent-purple-500' : 'accent-pink-300'} ${!isAdmin && 'pointer-events-none'}`}
                        />
                        <div className="flex-1">
                          <p className={`font-bold text-sm ${isChecked ? 'line-through text-slate-400' : 'text-slate-600'}`}>
                            {week.title}
                          </p>
                          <div className="flex gap-2 mt-1">
                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${getDiffColor(week.diff)}`}>
                              {week.diff}
                            </span>
                          </div>
                        </div>
                        
                        {/* Hover Tooltip for Time */}
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl whitespace-nowrap z-10">
                          Estimated: {week.hrs}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* PROJECTS TAB */}
        {activeTab === 'projects' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projectsData.map((project) => {
              const isUnlocked = project.requiredSkills.every(skill => completedWeeks.includes(skill));
              
              return (
                <div key={project.id} className={`relative overflow-hidden bg-white p-8 rounded-3xl border-2 transition-all duration-500 ${isUnlocked ? 'border-pink-300 shadow-xl shadow-pink-100/50 transform hover:-translate-y-2' : 'border-slate-100 opacity-70 grayscale-[50%]'}`}>
                  
                  {/* Lock/Unlock Badge */}
                  <div className={`absolute top-0 right-0 px-6 py-2 rounded-bl-3xl font-black text-sm shadow-sm ${isUnlocked ? 'bg-gradient-to-r from-pink-400 to-purple-500 text-white' : 'bg-slate-200 text-slate-500'}`}>
                    {isUnlocked ? '🔓 UNLOCKED' : '🔒 LOCKED'}
                  </div>

                  <span className={`inline-block mb-3 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${getDiffColor(project.diff)}`}>
                    {project.diff}
                  </span>
                  
                  <h3 className="text-2xl font-black text-slate-700 mb-2">{project.title}</h3>
                  <p className="text-slate-500 font-medium mb-6 leading-relaxed">{project.desc}</p>
                  
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Required Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.requiredSkills.map(skillId => {
                        const isSkillDone = completedWeeks.includes(skillId);
                        return (
                          <span key={skillId} className={`text-xs font-bold px-3 py-1.5 rounded-lg border-2 transition-all ${isSkillDone ? 'bg-purple-100 border-purple-200 text-purple-600' : 'bg-slate-50 border-slate-200 text-slate-400 border-dashed'}`}>
                            {skillId.toUpperCase()} {isSkillDone ? '✓' : ''}
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  {!isUnlocked && (
                    <div className="absolute inset-0 bg-slate-50/40 backdrop-blur-[1px] z-10 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                      <p className="bg-slate-800 text-white font-bold px-4 py-2 rounded-xl shadow-2xl">
                        Complete required skills to unlock!
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}