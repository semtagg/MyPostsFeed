import React, {useState} from "react";
import {Button, Form} from "react-bootstrap";
import AuthService from "../services/auth.service";
import postService from "../services/post.service";
import {useNavigate, useParams} from "react-router";

const CreatePost = () => {
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const {id} = useParams()

  const navigate = useNavigate();

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const model = {
        title,
        content: body,
        user_id: id
      };
      await postService.createPost(model).then(
        () => {
          navigate("/");
          window.location.reload();
        },
        (error) => {
          console.log(error);
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Title</Form.Label>
          <Form.Control type="title" placeholder="Title"
                        onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Body</Form.Label>
          <Form.Control as="textarea" rows={3}
                        onChange={(e) => setBody(e.target.value)}
          />
        </Form.Group>
      </Form>
      <Button variant="primary"
              onClick={handleCreate}
      >Create</Button>
    </div>
  )
}

export default CreatePost;
