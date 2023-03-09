import { Link } from "react-router-dom";
import { Card, Button, Row, Col } from "react-bootstrap";
import { getAllPosts } from "../../../redux/postsRedux";
import { useSelector } from "react-redux";
import { dateToStr } from '../../../utlis/dateTostr';

const Posts = () => {

  const posts = useSelector(getAllPosts);

  return (
    <Row xs={1} md={1} lg={3}>
      {posts.map(post => (
        <Col key={post.id}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>{post.title}</Card.Title>
              <Card.Text className="my-0"><strong>Author: </strong>{post.author}</Card.Text>
              <Card.Text className="my-0"><strong>Published: </strong>{dateToStr(post.publishedDate)}</Card.Text>
              <Card.Text className="my-0"><strong>Category: </strong>{post.category}</Card.Text>
              <Card.Text className="my-2">{post.description}</Card.Text>
              <Link to={"/post/" + post.id}>
                <Button variant="primary">Read more</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default Posts;