import React, { useState } from "react";
import {
  Users,
  UserPlus,
  UserCheck,
  UserRoundPen,
  MessageSquare,
  icons,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  dummyConnectionsData as connection,
  dummyFollowersData as followers,
  dummyFollowingData as following,
  dummyPendingConnectionsData as pendingConnection,
} from "../assets/assets";

const Connections = () => {
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState("followers");

  const dataArray = [
    { label: "followers", value: followers, icons: Users },
    { label: "following", value: following, icons: UserCheck },
    { label: "pending", value: pendingConnection, icons: UserRoundPen },
    { label: "connection", value: connection, icons: UserPlus },
  ];
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto p-6">
        {/* title */}
        <div className="mb-8">
          <h1 className="text-34 font-bold text-slate-900 mb-2">Message</h1>
          <p className="text-slate-600">
            Manage your network and discover new connection
          </p>
        </div>
        {/* count */}
        <div className="mb-8 flex flex-wrap gap-6">
          {dataArray.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center gap-1 border h-20 w-40 
              border-gray-200 bg-white shadow rounded-md"
            >
              <b>{item.value.length}</b>
              <p className="text-slate-600">{item.label}</p>
            </div>
          ))}
        </div>
        {/* Tab */}
        <div
          className="inline-flex flex-wrap item-center border border-gray-200 rounded-md p-1 
        shadow-sm bg-white "
        >
          {dataArray.map((tab) => (
            <button
              onClick={() => setCurrentTab(tab.label)}
              key={tab.label}
              className={`flex items-center p-1 px-3 rounded-md text-sm cursor-pointer
              transition-colors ${
                currentTab === tab.label
                  ? "text-black bg-white font-medium"
                  : "text-gray-500 hover:text-black"
              }`}
            >
              <tab.icons className="w-4 h-4" />
              <span className="ml-1">{tab.label}</span>
              <span>
                {tab.count !== undefined && (
                  <span className="ml-2 text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full">
                    {tab.count}
                  </span>
                )}
              </span>
            </button>
          ))}
        </div>
        {/* connection */}
        <div className="flex flex-wrap gap-6 mt-8">
          {dataArray
            .find((item) => item.label === currentTab)
            .value.map((user) => (
              <div
                key={user._id}
                className="max-w-88 w-full flex p-6 gap-5 bg-white rounded-md shadow"
              >
                <img
                  src={user.profile_picture}
                  alt=""
                  className="w-12 h-12 rounded-full shadow-md mx-auto"
                />
                <div className="flex-1">
                  <p className="font-medium text-slate-700">{user.full_name}</p>
                  <p className="text-slate-500">@{user.username}</p>
                  <p className="text-sm text-gray-600">
                    {user.bio.slice(0, 30)}...
                  </p>
                  <div className="max-sm:flex-col flex gap-2 mt-4">
                    {
                      <button onClick={() =>navigate(`/profile/${user._id}`)}
                        className="w-full p-2 text-sm rounded bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-700 to-purple-800 active:scale-95 transition text-white cursor-pointer">
                        View Profile
                      </button>
                    }
                    {
                      currentTab === 'following' && (
                        <button className="w-full p-2 text-sm rounded bg-slate-100 hover:bg-slate-200 text-black
                        active:scale-95 transition cursor-pointer">
                          Unfollow
                        </button>
                      )
                    }
                    {
                      currentTab === 'pending' && (
                        <button className="w-full p-2 text-sm rounded bg-slate-100 hover:bg-slate-200 text-black
                        active:scale-95 transition cursor-pointer">
                          Accept
                        </button>
                      )
                    }
                    {
                      currentTab === 'connection' && (
                        <button onClick={() =>navigate(`/messages/${user._id}`)}
                          className="w-full p-2 text-sm rounded bg-slate-100 hover:bg-slate-200 text-slate-800
                        active:scale-95 transition cursor-pointer flex items-center justify-center gap-1">
                          <MessageSquare className="h-4 w-4"/>
                          Message
                        </button>
                      )
                    }
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Connections;
