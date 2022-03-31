const db = require('../db/db')

class PostController {
  async getAllPosts() {
    return new Promise(async (resolve, reject) => {
      let data = await db.query("SELECT title, content, nickname FROM post,person WHERE post.user_id = person.id");

      if (!data)
        reject("The database is not available");

      resolve(data.rows);
    });
  }

  async getPostsById(id) {
    return new Promise(async (resolve, reject) => {
      let data = await db.query("SELECT title, content FROM post WHERE user_id = $1", [id]);

      if (!data)
        reject("The database is not available");

      resolve(data.rows);
    });
  }

  async createPost(data) {
    return new Promise(async (resolve, reject) => {
      try {
        await db.query("INSERT INTO post(title, content, user_id) VALUES($1,$2,$3)", [data.title, data.content, Number(data.user_id)])

        resolve("Post successfully created");
      } catch (error) {
        reject("The database is not available")
      }
    });
  }
}

module.exports = PostController;