import { useEffect, useState } from "react";
import { assets, dummyPostsData } from "../assets/assets";
import Loading from '../components/loading/Loading'
import StoriesBar from "../components/stories/StoriesBar";
import PostCard from "../components/post/PostCard";
import RecentMessages from "../components/recentMessage/RecentMessages";

const Feed = () => {
  const [feed, setFeed] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getFeedPosts = async () => {
      // later replace with API call
      setFeed(dummyPostsData);
      setLoading(false);
    };

    getFeedPosts();
  }, []);

  

  return !loading ? (
    <div className="h-full overflow-y-scroll  py-10 xl:pr-5 flex items-start justify-center xl:gap-8">
      {/* stories and post list */}
      <div>
        <StoriesBar />
        <div className="p-4 space-y-6">
          {feed.map((post) => (
            <PostCard key={post.id} postData={post} />
          ))}
        </div>
      </div>
      {/* right sidebar */}
      <div className="max-xl:hidden sticky top-0">
        <div className="max-w-xs bg-white text-xs p-4 rounded-md inline-flex flex-col gap-2 shadow">
          <h3 className="text-slate-800 font-semibold">Sponsored</h3>
          <img
            src={assets.sponsored_img}
            alt=""
            className="w-75 h-50 rounded"
          />
          <p className="text-slate-600">Email Marketing</p>
          <p className="text-slate-400">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam
            nulla odit id laborum corporis ea.
          </p>
        </div>
        <RecentMessages/>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default Feed;
