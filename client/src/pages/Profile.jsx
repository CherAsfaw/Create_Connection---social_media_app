import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { dummyPostsData, dummyUserData } from "../assets/assets";
import Loading from "../components/loading/Loading";
import UserProfileInfo from "../components/profile/UserProfileInfo";
import PostCards from '../components/post/PostCard'
import { Link } from "react-router-dom";
import moment from "moment";

const Profile = () => {
  const { profileId } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [activeTab, setActiveTab] = useState("posts");
  const [showEdit, setShowEdit] = useState(false);


  // function to get user data
  const getUserData = async () => {
    setUser(dummyUserData);
    setPosts(dummyPostsData);
  };

  useEffect(() => {
    getUserData();
  }, []);
  return user ? (
    <div className="relative h-full overflow-y-scroll bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto">
        {/* profile card */}
        <div className="bg-white rounded-2xl shadow overflow-hidden">
          {/* cover picture */}
          <div className="h-40 md:h-56 bg-linear-to-r from-indigo-200 via-pink-200 to-pink-200">
            {user.cover_photo && (
              <img
                src={user.cover_photo}
                alt=""
                className="w-full h-full object-cover"
              />
            )}
          </div>
          {/* user info */}
          <div>
            <UserProfileInfo
              user={user}
              posts={posts}
              profileId={profileId}
              setShowEdit={setShowEdit}
            />
          </div>
        </div>
        {/* tab */}
        <div className="mt-6">
          <div className="bg-white rounded-xl shadow p-1 max-w-md flex mx-auto">
            {["posts", "media", "likes"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 px-4 py-2 text-sm font-medium rounded-lg transition-colors
                  cursor-pointer ${activeTab === tab ? "bg-indigo-600 text-white" : "text-gray-600 hover:text-gray-900"}`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
          {/* post tab */}
          <div>
            {activeTab === "posts" && (
              <div className="flex flex-col items-center mt-6">
                {posts.map((post) => (
                  <PostCards key={post._id} postData={post} />
                ))}
              </div>
            )}
            {/* media tab */}
            {activeTab === "media" && (
              <div className="flex flex-wrap mt-6 max-w-6xl">
                {posts
                  .filter((post) => post.image_urls.length > 0)
                  .map((post) => (
                    <>
                      {post.image_urls.map((img, i) => (
                        <Link
                          target="_blank"
                          to={img}
                          key={i}
                          className="relative group"
                        >
                          <img
                            src={img}
                            key={i}
                            alt=""
                            className="w-64 aspect-video object-cover"
                          />
                          <p
                            className="absolute bottom-0 right-0 text-xs p-1 px-3 backdrop-blur-xl text-white opacity-0
                           group-hover:opacity-100 transition duration-300"
                          >
                           Posted {moment(post.createdAt).fromNow()}
                          </p>
                        </Link>
                      ))}
                    </>
                  ))}
              </div>
            )}
            {/* likes tab
            {activeTab === "likes" && (
              <div>
                {posts.map((post) => (
                  <PostCards key={post._id} postData={post} />
                ))}
              </div>
            )} */}
          </div>
        </div>
      </div>
      {/* edit profile modal */}
      {
        showEdit && <p>Show profile edit</p>
      }
    </div>
  ) : (
    <Loading />
  );
};

export default Profile;
