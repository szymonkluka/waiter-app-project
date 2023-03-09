import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // ES6
import { useForm } from 'react-hook-form';
import { getAllCategories } from '../../../redux/categoryRedux';
import { useSelector } from 'react-redux';

const PostForm = ({ action, ...props }) => {

  const { register, handleSubmit: validate, formState: { errors } } = useForm();

  const handleChangePublishedDate = value => {
    setPublishedDate(value);
  };

  const [category, setCategory] = useState(props.category);
  const categories = useSelector(getAllCategories);
  const [categoryError, setCategoryError] = useState(false)

  const [title, setTitle] = useState(props.title);
  const [author, setAuthor] = useState(props.author);
  const [description, setDescription] = useState(props.description);
  const [publishedDate, setPublishedDate] = useState(props.publishedDate);
  const [mainContent, setMainContent] = useState(props.mainContent)

  const [contentError, setContentError] = useState(false)
  const [dateError, setDateError] = useState(false);

  const handleSubmit = () => {
    setContentError(!mainContent)
    setDateError(!publishedDate);
    setCategoryError(!category);
    if (mainContent && publishedDate && category) {
      action({ title, author, publishedDate, description, mainContent, category });
    }
  };

  return (
    <Row className="justify-content-center">
      <Col className="col-7">

        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Title</Form.Label>
            <Form.Control
              {...register("title", { required: true, minLength: 3 })}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter title" />
            {errors.title && <small className="d-block form-text text-danger mt-2">This field is required (minimal length: 3)</small>}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Author</Form.Label>
            <Form.Control
              {...register("author", { required: true, minLength: 3 })}
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Enter author" />
            {errors.author && <small className="d-block form text-danger mt-2">This field is required (minimal length: 3)</small>}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Published</Form.Label>
            <DatePicker
              selected={publishedDate}
              onChange={handleChangePublishedDate}
              dateFormat="dd-MM-yyyy"
            />
            {dateError && <small className="d-block form-text text-danger mt-2">Content can't be empty</small>}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Category</Form.Label>
            <Form.Select aria-label="Default select example"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option key='blankChoice' hidden value></option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </Form.Select>
            {categoryError && <small className="d-block form-text text-danger mt-2">Please choose your category</small>}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Short description</Form.Label>
            <Form.Control
              {...register("description", { required: true, minLength: 20 })}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description" />
            {errors.description && <small className="d-block form text-danger mt-2">This field is required (minimal length: 20)</small>}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Main content</Form.Label>
            <ReactQuill theme="snow" value={mainContent}
              onChange={setMainContent}
              placeholder="Enter content" />
            {contentError && <small className="d-block form-text text-danger mt-2">Content can't be empty</small>}
          </Form.Group>

          <Button
            onClick={validate(handleSubmit)}
            className="my-3">Add post
          </Button>
        </Form>
      </Col>
    </Row>
  )
}

export default PostForm;