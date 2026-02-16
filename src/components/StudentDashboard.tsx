
import { apiService } from '@/services/apiService';
import { User, VideoCourse, Course } from '@/types';
import React, { useState, useEffect } from 'react';
 
interface StudentDashboardProps {
  user: User;
  onLogout: () => void;
  onNavigate: (target: string) => void;
}

const StudentDashboard = ({ user, onLogout, onNavigate }: StudentDashboardProps) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'my-courses' | 'video-library'>('overview');
  const [purchasedVideos, setPurchasedVideos] = useState<VideoCourse[]>([]);
  const [enrolledCourses, setEnrolledCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [watchingVideo, setWatchingVideo] = useState<VideoCourse | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const videos = await apiService.getVideoCourses();
        const enrollments = await apiService.getEnrollments();
        
        // Mocking: In real app, filter by user email/id
        setPurchasedVideos(videos.slice(0, 2)); 
        setEnrolledCourses(enrollments.filter((e: any) => e.email === user.email));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user]);

  const SidebarItem = ({ id, icon, label }: { id: any, icon: string, label: string }) => (
    <button 
      onClick={() => setActiveTab(id)}
      className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 ${activeTab === id ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
    >
      <i className={`${icon} text-lg`}></i>
      <span className="font-bold text-sm">{label}</span>
    </button>
  );

  return (
    <div className="flex h-screen bg-[#050b14] overflow-hidden text-white font-sans">
      {/* Sidebar */}
      <aside className="w-72 bg-slate-950 border-r border-slate-800 flex flex-col">
        <div className="p-8 flex items-center gap-4">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black italic">ST</div>
          <span className="text-white font-black uppercase text-sm tracking-widest">Student Hub</span>
        </div>
        
        <nav className="flex-grow px-4 space-y-2 mt-8">
          <SidebarItem id="overview" icon="fa-solid fa-house" label="Overview" />
          <SidebarItem id="my-courses" icon="fa-solid fa-graduation-cap" label="My Classes" />
          <SidebarItem id="video-library" icon="fa-solid fa-play" label="Masterclasses" />
        </nav>

        <div className="p-6 border-t border-slate-800">
          <div className="flex items-center gap-3 mb-6 p-4 bg-white/5 rounded-2xl">
            <img src={user.avatar || `https://i.pravatar.cc/100?u=${user.email}`} className="w-10 h-10 rounded-full border border-white/10" alt="Avatar" />
            <div className="overflow-hidden">
              <p className="font-bold text-sm truncate">{user.name}</p>
              <p className="text-[10px] text-slate-500 uppercase font-black">Free Plan</p>
            </div>
          </div>
          <button onClick={onLogout} className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-rose-400 hover:bg-rose-500/10 transition-colors">
            <i className="fa-solid fa-right-from-bracket"></i>
            <span className="font-bold text-sm">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow overflow-y-auto custom-scrollbar bg-slate-900/50 p-10">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-black tracking-tight">Welcome, <span className="text-indigo-400">{user.name.split(' ')[0]}</span></h1>
            <p className="text-slate-400 mt-1 font-medium italic">"The beautiful thing about learning is that no one can take it away from you."</p>
          </div>
          <button onClick={() => onNavigate('public')} className="px-6 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-xs font-black uppercase tracking-widest transition-all">
            Browse More Courses
          </button>
        </header>

        {loading ? (
          <div className="flex flex-col items-center justify-center h-64 gap-4">
            <i className="fa-solid fa-spinner animate-spin text-4xl text-indigo-500"></i>
            <p className="text-slate-500 font-black uppercase tracking-widest text-xs">Preparing your classroom...</p>
          </div>
        ) : (
          <>
            {activeTab === 'overview' && (
              <div className="space-y-12 animate-in fade-in duration-500">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="bg-indigo-600 p-8 rounded-[2.5rem] shadow-xl shadow-indigo-600/20 flex flex-col justify-between">
                    <i className="fa-solid fa-award text-4xl text-indigo-200 mb-6"></i>
                    <div>
                      <h3 className="text-indigo-100 font-bold text-xs uppercase tracking-widest mb-1">Learning Status</h3>
                      <div className="text-3xl font-black">Active Learner</div>
                    </div>
                  </div>
                  <div className="bg-slate-950/50 p-8 rounded-[2.5rem] border border-slate-800 flex flex-col justify-between">
                    <i className="fa-solid fa-video text-4xl text-blue-500 mb-6"></i>
                    <div>
                      <h3 className="text-slate-500 font-bold text-xs uppercase tracking-widest mb-1">Purchased Videos</h3>
                      <div className="text-3xl font-black">{purchasedVideos.length} Courses</div>
                    </div>
                  </div>
                  <div className="bg-slate-950/50 p-8 rounded-[2.5rem] border border-slate-800 flex flex-col justify-between">
                    <i className="fa-solid fa-calendar-check text-4xl text-emerald-500 mb-6"></i>
                    <div>
                      <h3 className="text-slate-500 font-bold text-xs uppercase tracking-widest mb-1">Enrolled Batches</h3>
                      <div className="text-3xl font-black">{enrolledCourses.length} Batches</div>
                    </div>
                  </div>
                </div>

                <section className="space-y-6">
                  <h2 className="text-2xl font-black flex items-center gap-3">
                    <i className="fa-solid fa-fire text-orange-500"></i> Continue Learning
                  </h2>
                  <div className="grid md:grid-cols-2 gap-8">
                    {purchasedVideos.map(video => (
                      <div key={video.id} className="bg-slate-950/50 rounded-[2.5rem] border border-slate-800 overflow-hidden group hover:border-indigo-500/30 transition-all flex">
                        <img src={video.thumbnail} className="w-48 object-cover" alt="" />
                        <div className="p-8 flex flex-col justify-between flex-grow">
                          <div>
                            <h4 className="font-bold text-xl group-hover:text-indigo-400 transition-colors line-clamp-1">{video.title}</h4>
                            <p className="text-slate-500 text-xs font-medium mt-1 uppercase tracking-widest">{video.instructor}</p>
                          </div>
                          <button onClick={() => { setActiveTab('video-library'); setWatchingVideo(video); }} className="mt-6 text-sm font-black text-indigo-400 hover:text-white transition-colors flex items-center gap-2">
                             Watch Now <i className="fa-solid fa-arrow-right"></i>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            )}

            {activeTab === 'my-courses' && (
              <div className="space-y-8 animate-in fade-in duration-500">
                <h2 className="text-3xl font-black">Registered Batches</h2>
                {enrolledCourses.length === 0 ? (
                  <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-20 text-center space-y-4">
                     <i className="fa-solid fa-graduation-cap text-6xl text-slate-800"></i>
                     <p className="text-slate-400 font-medium italic">You haven't enrolled in any live batches yet.</p>
                     <button onClick={() => onNavigate('training')} className="text-indigo-400 font-black uppercase text-xs tracking-widest">Explore Programs</button>
                  </div>
                ) : (
                  <div className="grid gap-6">
                    {enrolledCourses.map((e, idx) => (
                      <div key={idx} className="bg-slate-950/50 border border-slate-800 p-8 rounded-[2.5rem] flex items-center justify-between">
                         <div className="flex items-center gap-6">
                            <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-3xl text-indigo-400">
                               <i className="fa-solid fa-chalkboard-user"></i>
                            </div>
                            <div>
                               <h4 className="font-black text-xl text-white">{e.courseTitle}</h4>
                               <p className="text-slate-500 font-medium text-sm">Status: <span className="text-emerald-400 font-bold">{e.status}</span></p>
                            </div>
                         </div>
                         <div className="text-right">
                            <p className="text-xs font-black text-slate-500 uppercase tracking-widest mb-1">Schedule</p>
                            <p className="font-bold">{e.preferredBatch || 'TBD'}</p>
                         </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'video-library' && (
              <div className="space-y-8 animate-in fade-in duration-500">
                {watchingVideo ? (
                  <div className="space-y-8">
                    <button onClick={() => setWatchingVideo(null)} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors font-bold text-sm">
                      <i className="fa-solid fa-arrow-left"></i> Back to Library
                    </button>
                    <div className="aspect-video w-full bg-black rounded-[3rem] overflow-hidden shadow-4xl border border-white/5">
                       <video src={watchingVideo.previewUrl} className="w-full h-full" controls autoPlay />
                    </div>
                    <div>
                       <h2 className="text-3xl font-black">{watchingVideo.title}</h2>
                       <p className="text-slate-400 mt-2 font-medium">Instructor: {watchingVideo.instructor}</p>
                    </div>
                  </div>
                ) : (
                  <>
                    <h2 className="text-3xl font-black">My Masterclasses</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {purchasedVideos.map(video => (
                        <div key={video.id} className="bg-slate-950/50 border border-slate-800 rounded-[2.5rem] overflow-hidden group hover:border-indigo-500/30 transition-all flex flex-col">
                           <div className="relative aspect-video overflow-hidden">
                              <img src={video.thumbnail} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
                              <button onClick={() => setWatchingVideo(video)} className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                 <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-black text-xl">
                                    <i className="fa-solid fa-play ml-1"></i>
                                 </div>
                              </button>
                           </div>
                           <div className="p-8">
                              <h4 className="font-bold text-xl mb-4 leading-tight">{video.title}</h4>
                              <div className="flex justify-between items-center text-xs font-black text-slate-500 uppercase tracking-widest">
                                 <span>{video.lessons} Lessons</span>
                                 <span className="text-indigo-400">Lifetime Access</span>
                              </div>
                           </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default StudentDashboard;
