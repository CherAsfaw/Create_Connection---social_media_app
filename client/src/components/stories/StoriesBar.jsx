import { useEffect, useState } from "react";
import { dummyStoriesData } from "../../assets/assets";
import { Plus } from "lucide-react";
import moment from "moment";
import StoryModal from "./StoryModal";
import StoriesViewer from "./StoriesViewer";

const StoriesBar = () => {
  const [stories, setStories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [viewStory, setViewStory] = useState(null)

  const getStories = async () => {
    setStories(dummyStoriesData);
  };

  useEffect(() => {
    getStories();
  }, []);

  return (
    <div className="w-screen sm:w-[calc(100vw-240px)] lg:max-w-2xl overflow-x-auto no-scrollbar px-4">
      <div className="flex gap-4 pb-5">

        {/* Add Story */}
        <div
          onClick={() => setShowModal(true)}
          className="rounded-lg shadow-sm min-w-[120px] max-w-[120px] aspect-3/4
          cursor-pointer hover:shadow-lg transition-all duration-200
          border-2 border-dashed border-indigo-300
          bg-gradient-to-b from-indigo-50 to-white"
        >
          <div className="h-full flex flex-col items-center justify-center p-4">
            <div className="size-10 rounded-full bg-indigo-500 flex items-center justify-center mb-3">
              <Plus className="w-5 h-5 text-white" />
            </div>
            <p className="text-sm font-medium text-slate-700 text-center">
              Create Story
            </p>
          </div>
        </div>

        {/* Stories */}
        {stories.map((story, index) => (
          <div
            key={index}
            onClick={() =>setViewStory(story)}
            className="relative rounded-lg shadow min-w-30 max-w-30 aspect-3/4
            cursor-pointer hover:shadow-lg transition-all duration-200
            bg-linear-to-b from-indigo-500 to-purple-600
            hover:from-indigo-700 hover:to-purple-800 active:scale-95"
          >
            <img
              src={story.user.profile_picture}
              alt=""
              className="absolute size-8 top-3 left-3 z-20 rounded-full ring ring-gray-500 shadow"
            />

            <p className="absolute bottom-6 left-3 text-white/70 text-sm truncate max-w-[90px] z-20">
              {story.content}
            </p>

            <p className="text-white absolute bottom-1 right-2 z-20 text-xs">
              {moment(story.createdAt).fromNow()}
            </p>

            {story.media_type !== "text" && (
              <div className="absolute inset-0 rounded-lg bg-black overflow-hidden">
                {story.media_type === "image" ? (
                  <img
                    src={story.media_url}
                    alt=""
                    className="w-full h-full object-cover transition duration-500
                    opacity-70 hover:opacity-80 hover:scale-110"
                  />
                ) : (
                  <video
                    src={story.media_url}
                    className="w-full h-full object-cover transition duration-500
                    opacity-70 hover:opacity-80 hover:scale-110"
                  />
                )}
              </div>
            )}
          </div>
        ))}
      </div>
        {/* add story modal */}
      {showModal && (
        <StoryModal setShowModal={setShowModal} getStories={getStories} />
      )}
      {/* view story modal */}
      {
        viewStory && (
          <StoriesViewer setViewStory={setViewStory} viewStory={viewStory} />
        )
      }
    </div>
  );
};

export default StoriesBar;
