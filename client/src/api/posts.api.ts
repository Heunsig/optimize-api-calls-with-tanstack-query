export type Post = {
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

export async function createPost(projectId: string, payload: { title: string, content: string }): Promise<{insertedId: string}> {
    const response = await fetch(`/api/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...payload,
        projectId: projectId,
      }),
    });

    const json = await response.json();

    if (json.status === "error") {
      throw new Error(json.message);
    }
    
    return json.data;
}

export async function deletePost(postId: string): Promise<{ deletedId: string }> {
  const response = await fetch(`/api/posts/${postId}`, {
    method: 'DELETE',
  });

  const json = await response.json();

  return json.data
}