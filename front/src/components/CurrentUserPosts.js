import React, {useEffect, useState} from "react";
import PostService from "../services/post.service";
import {Card} from "react-bootstrap";
import {useParams} from "react-router";

const CurrentUserPosts = () => {
  const {id} = useParams()

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    PostService.getPostsById(+id).then(
      (response) => {
        setPosts(response.data);
      },
      (error) => {
        console.log(error);
      }
    );
  }, [id]);

  return (
    <div>
      <div>
        <h3>
          {posts.slice(0).reverse().map((post, index) => (
            <Card className='my-2' key={index} style={{ width: 'auto' }}>
              <Card.Body>
                <Card.Title>{post.title}</Card.Title>
                <Card.Text>{post.content}</Card.Text>
              </Card.Body>
            </Card>
          ))}
        </h3>
      </div>

    </div>
  )
}

export default CurrentUserPosts;