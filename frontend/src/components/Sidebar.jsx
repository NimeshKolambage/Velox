import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Settings, LogOut, User, MoreVertical, Users } from "lucide-react";
import VeloxLogo from "./VeloxLogo";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
  const { logout, onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-20 lg:w-72 flex flex-col transition-all duration-200 bg-transparent">
      <div className="w-full p-4 bg-transparent sticky top-0 z-10">
        <div className="flex items-center justify-between px-1 mb-4">
          <div className="flex items-center gap-2">
            <Users className="size-5" />
            <span className="font-semibold hidden lg:block tracking-wide">RCHATS</span>
          </div>

          {/* 3-dot menu as per drawing */}
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-xs btn-circle lg:btn-sm">
              <MoreVertical className="size-5" />
            </label>
            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-40 mt-2 border border-base-300">
              <li>
                <Link to="/profile" className="flex items-center gap-2">
                  <User className="size-4" />
                  <span>Profile</span>
                </Link>
              </li>
              <li>
                <Link to="/settings" className="flex items-center gap-2">
                  <Settings className="size-4" />
                  <span>Setting</span>
                </Link>
              </li>
              <li onClick={logout}>
                <button className="flex items-center gap-2 text-error">
                  <LogOut className="size-4" />
                  <span>Logout</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Online filter toggle */}
        <div className="mt-3 hidden lg:flex items-center gap-2 px-1">
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="checkbox checkbox-xs rounded-sm"
            />
            <span className="text-sm font-medium">Online only</span>
          </label>
          <span className="text-xs text-base-content/50 ml-auto bg-base-200 px-2 py-0.5 rounded-full font-medium">
            {Math.max(0, onlineUsers.length - 1)}
          </span>
        </div>
      </div>

      <div className="overflow-y-auto w-full py-2 flex-1">
        {filteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`
              w-[calc(100%-16px)] p-3 flex items-center gap-3 mx-2 my-1 rounded-xl
              hover:bg-base-200/50 transition-all duration-200
              ${selectedUser?._id === user._id ? "bg-base-200 shadow-sm ring-1 ring-base-300" : ""}
            `}
          >
            <div className="relative mx-auto lg:mx-0">
              <img
                src={user.profilePic || "/avatar.png"}
                alt={user.name}
                className="size-11 object-cover rounded-full border border-base-300 shadow-sm"
              />
              {onlineUsers.includes(user._id) && (
                <span
                  className="absolute bottom-0 right-0 size-3 bg-green-500 
                  rounded-full ring-2 ring-base-100 shadow-sm"
                />
              )}
            </div>

            {/* User info - only visible on larger screens */}
            <div className="hidden lg:block text-left min-w-0 flex-1">
              <div className="font-medium text-[15px] truncate">{user.fullName}</div>
              <div className={`text-[13px] ${onlineUsers.includes(user._id) ? "text-green-500 font-medium" : "text-base-content/60"}`}>
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}

        {filteredUsers.length === 0 && (
          <div className="text-center text-base-content/50 py-8 text-sm">
            No contacts found
          </div>
        )}
      </div>
    </aside>

  );
};
export default Sidebar;