export const blogs = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  title: `Blog Post ${i + 1}`,
  content: `This is the content of blog post ${
    i + 1
  }. It has some interesting details!`,
  image: `https://source.unsplash.com/random/400x300?sig=${i + 1}`,
}));

//new stash
