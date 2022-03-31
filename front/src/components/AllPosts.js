import React, { useState, useEffect } from "react";
import PostService from "../services/post.service";
import {Card} from "react-bootstrap";

const AllPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
     PostService.getAllPosts().then(
      (response) => {

        setPosts(response.data)
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  return (
    <div>
      <h3>
        {posts.slice(0).reverse().map((post, index) => (
          /*<div key={index}>{post.title + post.content + post.user_id}</div>*/
          <Card className='my-2' key={index} style={{ width: 'auto' }}>
            <Card.Body>
              <Card.Title>{post.title}</Card.Title>
              <Card.Subtitle>{post.nickname}</Card.Subtitle>
              <Card.Text>{post.content}</Card.Text>
            </Card.Body>
          </Card>
        ))}
      </h3>
    </div>
  );
};

export default AllPosts;