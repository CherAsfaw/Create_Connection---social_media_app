import { useEffect, useState } from "react";
import { dummyPostsData } from "../assets/assets";
import Loading from '../components/loading/Loading'
import StoriesBar from "../components/stories/StoriesBar";

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
    <div className="h-full overflow-y-scroll no-scrollbar py-10 xl:pr-5 flex items-start justify-center xl:gap-8">
      {/* stories and post list */}
      <div>
        <StoriesBar/>
        <div className="p-4 space-y-6">
            List of posts
        </div>
      </div>
      {/* right sidebar */}
      <div>
        <div>
          <h1>Sponsored</h1>
        </div>
        <h1>Recent messages</h1>
      </div>
    </div>
  ) : <Loading/>
};

export default Feed;
