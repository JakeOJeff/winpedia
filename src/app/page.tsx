
import { currentUser } from "@clerk/nextjs/server";
import CreatePost from "@/components/CreatePost";
import RecommendedUsers from "@/components/RecommendedUsers"
import PostCard from "@/components/PostCard";
import { getPosts } from "@/actions/post.action";

export default async function Home() {
  const user = await currentUser();
  const posts = await getPosts()

  return (
    <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
        <div className="lg:col-span-6">
          {user ? <CreatePost /> : (<></>)}

          <div className="space-y-6">
            {posts.map(post) => (
              <PostCard key={posts.id} post={post} />
            )}
          </div>
        </div>

        <div className="hidden lg:block lg:col-span-4 sticky top-20">
          <RecommendedUsers />
        </div>
    </div>
  );
}
