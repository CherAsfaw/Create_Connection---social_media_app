import React, { useState } from 'react'
import { BadgeCheck, Heart, MessageCircle, Share2 } from 'lucide-react'
import moment from 'moment'
import { dummyUserData } from '../../assets/assets';
import { useNavigate } from 'react-router-dom';
const PostCard = ({ postData }) => {
  const navigate = useNavigate();

  const [likes, setLikes] = useState(postData.likes_count); // likes_count
  const currentUser = dummyUserData;

  const handleLikes = () => {
    // setLikes((prevLikes) => {
    //   // if already liked → unlike
    //   if (prevLikes.includes(currentUser._id)) {
    //     return prevLikes.filter((id) => id !== currentUser._id);
    //   }

    //   // if not liked → like
    //   return [...prevLikes, currentUser._id];
    // });
  };

  // style sentence star with hashtag
  const renderContentWithHashtags = (text) => {
    return text.split(/(#\w+)/g).map((part, index) =>
      part.startsWith("#") ? (
        <span
          key={index}
          className="text-indigo-600 font-medium cursor-pointer"
        >
          {part}
        </span>
      ) : (
        part
      ),
    );
  };

  return (
    <div className="bg-white w-full rounded-xl shadow p-4 space-y-4 max-w-2xl">
      <div>
        {/* user info */}
        <div
          onClick={() => navigate(`/profile/${postData.user._id}`)}
          className="inline-flex items-center gap-4 cursor-pointer"
        >
          <img
            src={postData.user.profile_picture}
            alt=""
            className="w-10 h-10 rounded-full shadow"
          />
          <div>
            <div className="flex items-center space-x-1">
              <span>{postData.user.full_name}</span>
              <BadgeCheck className="w-4 h-4 text-blue-500" />
            </div>
            <div>
              @{postData.user.username} . {moment(postData.createdAt).fromNow()}
            </div>
          </div>
        </div>
        {/* content */}
        {postData.content && (
          <p className="text-gray-800 text-sm whitespace-pre-line">
            {renderContentWithHashtags(postData.content)}
          </p>
        )}

        {/* image */}
        <div className="grid grid-cols-2 gap-2">
          {postData.image_urls.map((img, index) => (
            <img
              src={img}
              key={index}
              className={`w-full h-48 object-cover rounded-lg 
                ${postData.image_urls.length === 1 ? "col-span-2 h-auto" : ""}`}
              alt=""
            />
          ))}
        </div>
        {/* action */}
        <div className="flex items-center gap-4 text-sm text-gray-400 pt-2 border-t border-gray-200">
          <div className="flex items-center gap-1">
            <Heart
              className={`h-4 w-4 cursor-pointer ${
                likes.includes(currentUser._id)
                  ? "text-red-500 fill-red-500"
                  : ""
              }`}
              onClick={handleLikes}
            />
            <span>{likes.length}</span>
          </div>
          <div className="flex items-center gap-1">
            <MessageCircle className="w-4 h-4" />
            <span>{12}</span>
          </div>
          <div className="flex items-center gap-1">
            <Share2 className="w-4 h-4" />
            <span>{6}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostCard