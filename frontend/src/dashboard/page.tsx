import { motion } from 'framer-motion';
import { FiBook, FiClock, FiPieChart, FiSettings, FiUsers, FiLogOut } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';


export default function () {
  const navigate = useNavigate();

  async function logoutFunction() {
    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        credentials: 'include',
        body: JSON.stringify({ action: 'logout' })
      });

      if (!res.ok) {
        const data = await res.json();
        console.error("Message error", data.error);
        return;
      }
      
      navigate("/auth/login"); // replace
    } catch (error) {
      console.error("Error message", error);
    }
  }

  const studyGroups = [
    { id: 1, name: 'Advanced Calculus', members: 12, nextSession: 'Tomorrow 3PM' },
    { id: 2, name: 'Organic Chemistry', members: 8, nextSession: 'Wed 10AM' },
    { id: 3, name: 'Modern Literature', members: 5, nextSession: 'Fri 2PM' },
  ];

  const upcomingTasks = [
    { id: 1, title: 'Math Problem Set', due: 'Jul 28', progress: 65 },
    { id: 2, title: 'Chemistry Lab Report', due: 'Jul 30', progress: 30 },
    { id: 3, title: 'Literature Essay', due: 'Aug 2', progress: 10 },
  ];

  const recentActivity = [
    { id: 1, action: 'shared notes', course: 'Calculus', time: '2 hours ago' },
    { id: 2, action: 'completed task', course: 'Chemistry', time: '5 hours ago' },
    { id: 3, action: 'joined study group', course: 'Literature', time: '1 day ago' },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 to-blue-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">

            <div className="flex items-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                className="shrink-0 flex items-center"
              >
                <FiBook className="h-8 w-8 text-indigo-600" />
                <span className="ml-2 text-xl font-bold text-indigo-600">Study Buddy</span>
              </motion.div>
            </div>

            <div className="flex items-center ml-4 md:ml-6">
              
              <button 
                className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none"
              >
                <FiSettings className="h-6 w-6" />
              </button>

              <button 
                className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none"
                onClick={() => logoutFunction()}
              >
                <FiLogOut className="h-6 w-6"/>
              </button>

              <div className="ml-3 relative">
                <div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none"
                    onClick={() => {}}
                  >
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="h-8 w-8 rounded-full"
                      src={/*session.user?.image || */'https://avatar.vercel.sh/leerob'}
                      alt="User profile"
                    />
                  </motion.button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {/*session.user?.name || */'Student'}!
          </h1>
          <p className="mt-2 text-gray-600">
            Ready to tackle your studies today? Here's what's happening.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Study Groups */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-medium text-gray-900">Your Study Groups</h2>
                  <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                    View all
                  </button>
                </div>
                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {studyGroups.map((group) => (
                    <motion.div
                      key={group.id}
                      whileHover={{ y: -5 }}
                      className="bg-indigo-50 rounded-lg p-4 cursor-pointer"
                    >
                      <div className="flex items-center">
                        <div className="shrink-0 bg-indigo-100 rounded-md p-2">
                          <FiUsers className="h-5 w-5 text-indigo-600" />
                        </div>
                        <div className="ml-3">
                          <h3 className="text-sm font-medium text-gray-900">{group.name}</h3>
                          <p className="text-xs text-gray-500">{group.members} members</p>
                        </div>
                      </div>
                      <div className="mt-4 flex items-center text-xs text-gray-500">
                        <FiClock className="shrink-0 mr-1" />
                        <span>{group.nextSession}</span>
                      </div>
                    </motion.div>
                  ))}
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center hover:border-indigo-300 hover:bg-indigo-50 transition-colors"
                  >
                    <div className="bg-indigo-100 rounded-full p-2">
                      <FiUsers className="h-5 w-5 text-indigo-600" />
                    </div>
                    <span className="mt-2 text-sm font-medium text-indigo-600">
                      Join New Group
                    </span>
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Upcoming Tasks */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-medium text-gray-900">Upcoming Tasks</h2>
                  <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                    View all
                  </button>
                </div>
                <div className="mt-6 space-y-4">
                  {upcomingTasks.map((task) => (
                    <motion.div
                      key={task.id}
                      whileHover={{ x: 5 }}
                      className="border-l-4 border-indigo-200 pl-4 py-2"
                    >
                      <h3 className="text-sm font-medium text-gray-900">{task.title}</h3>
                      <p className="text-xs text-gray-500">Due {task.due}</p>
                      <div className="mt-2 w-full bg-gray-200 rounded-full h-1.5">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${task.progress}%` }}
                          transition={{ duration: 1 }}
                          className="bg-indigo-600 h-1.5 rounded-full"
                        />
                      </div>
                      <span className="text-xs text-gray-500 mt-1">{task.progress}% complete</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6">
                <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
                <div className="mt-6 space-y-4">
                  {recentActivity.map((activity) => (
                    <motion.div
                      key={activity.id}
                      whileHover={{ backgroundColor: '#f8fafc' }}
                      className="flex items-start p-3 rounded-lg hover:bg-slate-50"
                    >
                      <div className="shrink-0 bg-indigo-100 rounded-full p-2">
                        <FiPieChart className="h-4 w-4 text-indigo-600" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-gray-700">
                          You {activity.action} in {activity.course}
                        </p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Study Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6">
                <h2 className="text-lg font-medium text-gray-900">Study Stats</h2>
                <div className="mt-6 space-y-6">
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-gray-500">Hours this week</h3>
                      <span className="text-sm font-medium text-indigo-600">14.5</span>
                    </div>
                    <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '72%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-gray-500">Tasks completed</h3>
                      <span className="text-sm font-medium text-indigo-600">8/12</span>
                    </div>
                    <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '66%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-gray-500">Upcoming sessions</h3>
                      <span className="text-sm font-medium text-indigo-600">3</span>
                    </div>
                    <div className="mt-2 flex space-x-2">
                      {['Mon', 'Wed', 'Fri'].map((day) => (
                        <motion.div
                          key={day}
                          whileHover={{ scale: 1.1 }}
                          className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded-full"
                        >
                          {day}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};
