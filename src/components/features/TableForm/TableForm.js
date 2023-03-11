import { useNavigate, useParams, Navigate } from 'react-router-dom';
import { Button, Col, Form, Row, FormControl } from 'react-bootstrap';
import { addChangedData } from '../../../redux/tablesRedux';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getTableById } from '../../../redux/tablesRedux';
import { ClipLoader } from 'react-spinners';


const TableForm = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const table = useSelector((state) => getTableById(state, id));

  const handleSubmit = () => {
    const clipLoader = () => { return <ClipLoader size={150}></ClipLoader> }

    if (maxPeopleAmount < (peopleAmount)) {
      alert("The number of customers cannot exceed the maximum number of customers at the table. Please change input nr 1 in People form.");
      return
    }
    if (status === 'Reserved' && peopleAmount === '0') {
      alert("The number of customers with Reserved status must be bigger than 0");
      return
    }
    if (status === 'Busy' && peopleAmount === '0') {
      alert("The number of customers with Busy status must be bigger than 0");
      return
    }
    if (status === 'Busy' && bill === '0') {
      alert("Amount value must be bigger than 0");
      return
    }

    if (!table) return <Navigate to="/" />;

    else {
      const editedData = {
        id, title, status, peopleAmount, maxPeopleAmount, bill,
      };
      dispatch(addChangedData(editedData));
      navigate('/');
      clipLoader(handleSubmit);
    }
  };

  const [title] = useState(table.title)
  const [status, setStatus] = useState(table.status);
  const [peopleAmount, setPeopleAmount] = useState(table.peopleAmount);
  const [maxPeopleAmount, setMaxPeopleAmount] = useState(table.maxPeopleAmount);
  const [bill, setBill] = useState(table.bill);

  const handleStatus = (value) => {
    if (value === 'Free' || value === 'Cleaning') {
      setPeopleAmount('0');
    }
    if (value === 'Busy') {
      setBill('0');
    }

    setStatus(value);
  };

  const handlePeopleAmount = (value) => {
    if (value < 0 && Number(value)) {
      value = '0';
    }
    if (value > Number(maxPeopleAmount)) {
      value = maxPeopleAmount;
    }
    setPeopleAmount(value);
  };


  return (
    <Row className="justify-content-center">
      <Col className="col-12">
        <Form>
          <h2>
            <strong>{table.title}</strong>
          </h2>

          <div className="mb-2" controlId="formBasicEmail">
            <div className="d-flex">
              <div className="p-1 flex me-2"><Form.Label style={({ marginRight: "5px" })}><strong>Status:</strong></Form.Label></div>
              <div className="">
                <Form.Select aria-label="Default select example"
                  value={status}
                  onChange={(e) => handleStatus(e.target.value)}
                  placeholder="Nr" style={{ width: "280px", height: "40px", }}
                >
                  <option value='Free'>Free</option>;
                  <option value='Reserved'>Reserved</option>;
                  <option value='Busy'>Busy</option>;
                  <option value='Cleaning'>Cleaning</option>;
                </Form.Select>
              </div>
            </div>
          </div>
          <div className="mb-2" controlId="formBasicEmail">
            <div className="d-flex">
              <div className="p-1 flex-2 me-4"><Form.Label style={({ marginLeft: "0px" })}><strong>People:</strong></Form.Label></div>
              <div className="p-1 flex">
                <FormControl
                  input type="number"
                  min="0"
                  max="10"
                  value={peopleAmount}
                  onChange={(e) => handlePeopleAmount(e.target.value)}
                  placeholder="Nr" style={{ width: "58px", height: "30px", textAlign: "center", marginRigt: "50px", }} />
              </div>
              <div className="p-2 flex-2">/</div>
              <div className="p-1 flex">
                <FormControl
                  input type="number"
                  min="0"
                  max="10"
                  value={maxPeopleAmount}
                  onChange={(e) => setMaxPeopleAmount(e.target.value)}
                  placeholder="Nr" style={{ width: "58px", height: "30px", marginRigt: "50px", }} />
              </div>
            </div>
          </div>
          {status === 'Busy' ? (
            <div className="mb-2" controlId="formBasicEmail">
              <div className="d-flex">
                <div className="p-1 flex-2"><Form.Label style={({ marginLeft: "0px" })}><strong>Amount:</strong></Form.Label></div>
                <div className="p-2 flex-2"><Form.Label style={({ marginLeft: "20px" })}>$</Form.Label></div>
                <div className="p-1 flex">
                  <FormControl
                    value={bill}
                    onChange={(e) => setBill(e.target.value)}
                    placeholder="Nr" style={{ width: "45px", height: "30px", marginRigt: "50px", }} />
                </div>
              </div>
            </div>
          ) : (
            ''
          )}

          <Button
            onClick={(handleSubmit)}
            className="my-3">Update
          </Button>

        </Form>
      </Col>
    </Row>
  );
};

export default TableForm
