type Post = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

export async function getPosts(projectId: string): Promise<Omit<Post, 'content'>[]>  {
  const response = await fetch(`/api/posts?projectId=${projectId}`);
  const posts = await response.json();
  return posts.data.map((post: Post) => ({
    id: post.id,
    title: post.title,
    createdAt: post.createdAt,
  }));
}

export async function getPostById(postId: string): Promise<Post> {
  const response = await fetch(`/api/posts/${postId}`);
  const post = await response.json();
  return post.data;
}