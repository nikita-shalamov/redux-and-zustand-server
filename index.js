import express from "express";
const app = express();
import cors from "cors";
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json());

let posts = [
  { id: 1, title: "First Post 1", content: "This is my first post" },
  { id: 2, title: "Second 2", content: "This is my second 222 post" },
];

app.get("/posts", (req, res) =>
  setTimeout(() => {
    res.json(posts);
  }, 2000)
);

app.post("/posts", (req, res) => {
  const newPost = { id: Date.now(), ...req.body };
  posts.push(newPost);
  res.json(newPost);
});

// Обновление поста по id
app.put("/posts/:id", (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  // Находим пост по id
  const postIndex = posts.findIndex((post) => post.id === parseInt(id));

  if (postIndex === -1) {
    return res.status(404).json({ message: "Post not found" }); // Если пост не найден
  }

  // Обновляем пост
  posts[postIndex] = { ...posts[postIndex], title, content };

  res.json({ result: "Пост успешно изменен!" }); // Возвращаем обновленный пост
});

app.listen(4000, () => console.log("Server running on http://localhost:4000"));
