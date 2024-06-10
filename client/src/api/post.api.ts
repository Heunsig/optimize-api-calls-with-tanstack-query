type Post = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

export function getPosts(){
  return fetch('/api/posts')
    .then((res) => res.json())
    .then((data) => {
      return data.data as Array<Post>;
    }).catch((err) => {
      throw new Error(err);
    });
}