const http = require("http");
const userController = require("./controller/user.controller");
const postController = require("./controller/post.controller");
const {getReqData} = require("./utils/utils");

const PORT = process.env.PORT || 5000;

const server = http.createServer(async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);

    if (req.method === 'OPTIONS') {
        var headers = {};
        headers["Access-Control-Allow-Origin"] = "*";
        headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS";
        headers["Access-Control-Allow-Credentials"] = false;
        headers["Access-Control-Max-Age"] = '86400'; // 24 hours
        headers["Access-Control-Allow-Headers"] = "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept";
        res.writeHead(200, headers);
        res.end();
    }

    else if (req.url === "/api/getAllPosts" && req.method === "GET") {
        try {
            const posts = await new postController().getAllPosts();
            res.writeHead(200, {"Content-Type": "application/json"});
            res.end(JSON.stringify(posts));
        } catch (error) {
            res.writeHead(404, {"Content-Type": "application/json"});
            res.end(JSON.stringify({message: error}));
        }
    }

    else if (req.url.match(/\/api\/getPostsById\/([0-9]+)/) && req.method === "GET") {
        try {
            const id = req.url.split("/")[3];
            const post = await new postController().getPostsById(id);
            res.writeHead(200, {"Content-Type": "application/json"});
            res.end(JSON.stringify(post));
        } catch (error) {
            res.writeHead(404, {"Content-Type": "application/json"});
            res.end(JSON.stringify({message: error}));
        }
    }

    else if (req.url === "/api/createPost" && req.method === "POST") {
        try {
            const data = await getReqData(req);
            const post = await new postController().createPost(JSON.parse(data));

            res.writeHead(200, {"Content-Type": "application/json"});
            res.end(JSON.stringify(post))
        } catch (error) {
            res.writeHead(500, {"Content-Type": "application/json"});
            res.end(JSON.stringify({message: error}));
        }
    }

    else if (req.url === "/api/login" && req.method === "POST") {
        try {
            let data = await getReqData(req);
            let token = await new userController().login(JSON.parse(data), req)
            res.writeHead(200, {"Content-Type": "application/json"});
            res.end(JSON.stringify(token))
        } catch (error) {
            res.writeHead(404, {"Content-Type": "application/json"});
            res.end(JSON.stringify({message: error}));
        }
    }

    else if (req.url === "/api/register" && req.method === "POST") {
        try {
            let data = await getReqData(req);
            let token = await new userController().register(JSON.parse(data))
            res.writeHead(200, {"Content-Type": "application/json"});
            res.end(JSON.stringify(token));
        } catch (error) {
            res.writeHead(409, {"Content-Type": "application/json"});
            res.end(JSON.stringify({message: error}));
        }
    }

    else if (req.url.match(/\/api\/getNicknameById\/([0-9]+)/) && req.method === "GET") {
        try {
            const id = req.url.split("/")[3];
            console.log(id)
            const post = await new userController().getNicknameById(id);
            res.writeHead(200, {"Content-Type": "application/json"});
            res.end(JSON.stringify(post));
        } catch (error) {
            res.writeHead(404, {"Content-Type": "application/json"});
            res.end(JSON.stringify({message: error}));
        }
    }

    else if (req.url === "/api/getAllNicknames" && req.method === "GET") {
        try {
            const posts = await new userController().getAllNicknames();
            res.writeHead(200, {"Content-Type": "application/json"});
            res.end(JSON.stringify(posts));
        } catch (error) {
            res.writeHead(404, {"Content-Type": "application/json"});
            res.end(JSON.stringify({message: error}));
        }
    }

    else {
        res.writeHead(404, {"Content-Type": "application/json"});
        res.end(JSON.stringify({message: "Route not found"}));
    }
});

server.listen(PORT, () => {
    console.log(`server started on port: ${PORT}`);
});