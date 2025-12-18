import { Bell, Search, Plus, UserCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth(); // 👈 logout bhi le lo

  return (
    <nav className="bg-white/80 backdrop-blur-xl shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">T</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                TaskFlow
              </h1>
              <p className="text-xs text-gray-500 font-medium">Collaborative Task Manager</p>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all">
              <Bell className="w-5 h-5" />
            </button>

            {/* Avatar + dropdown */}
            <div className="relative group">
              {/* Avatar */}
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-semibold cursor-pointer">
                {(user?.name || user?.email || 'U').charAt(0).toUpperCase()}
              </div>

              {/* Dropdown */}
              <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-150 absolute right-0 mt-2 w-56 rounded-2xl bg-white shadow-lg ring-1 ring-black/5 p-3 z-20">
                <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-semibold">
                    {(user?.name || user?.email || 'U').charAt(0).toUpperCase()}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-900">
                      {user?.name || user?.email?.split('@')[0] || 'User'}
                    </span>
                    <span className="text-xs text-gray-500">{user?.email}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={logout}
                  className="mt-3 w-full text-left text-sm text-red-600 hover:bg-red-50 px-3 py-2 rounded-xl"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
