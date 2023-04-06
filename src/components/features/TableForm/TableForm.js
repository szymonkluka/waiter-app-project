import { useNavigate, useParams } from 'react-router-dom';
import { Button, Col, Form, Row, FormControl } from 'react-bootstrap';
import { updateTable } from '../../../redux/tablesRedux';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getTableById } from '../../../redux/tablesRedux';
import statuses from '../../statuses';

const TableForm = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const table = useSelector((state) => getTableById(state, id));

  const handleSubmit = () => {
    if (maxPeopleAmount < (peopleAmount)) {
      alert("The number of customers cannot exceed the maximum number of customers at the table. Please change input nr 1 in People form.");
      return
    }
    if (status === statuses.reserved && Number(peopleAmount) === 0) {
      alert("The number of customers with Reserved status must be bigger than 0");
      return;
    }
    if (status === statuses.busy && Number(peopleAmount) === 0) {
      alert("The number of customers with Reserved status must be bigger than 0");
      return;
    }
    if (status === statuses.busy && Number(bill) === 0) {
      alert("Amount value must be bigger than 0");
      return
    }
    const editedData = {
      id, title: table.title, status, peopleAmount, maxPeopleAmount, bill,
    };
    dispatch(updateTable(editedData));
    navigate('/');
  };


  const [status, setStatus] = useState(table.status);
  const [peopleAmount, setPeopleAmount] = useState(table.peopleAmount);
  const [maxPeopleAmount, setMaxPeopleAmount] = useState(table.maxPeopleAmount);
  const [bill, setBill] = useState(table.bill);

  const handleStatus = (value) => {
    if (value === statuses.free || value === statuses.cleaning) {
      setPeopleAmount('0');
    }
    if (value === statuses.busy) {
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

  const handleMaxPeopleAmount = (value) => {
    if (value < 0 && Number(value)) {
      value = '0';
    }
    if (value > 10) {
      value = '10';
    }
    setMaxPeopleAmount(value)
    if (Number(peopleAmount) > value) {
      setPeopleAmount(value)
    }
  }

  if (status === statuses.cleaning) {
    if (Number(maxPeopleAmount) < 1) {
      setMaxPeopleAmount(1);
    }
  }

  if (status === statuses.free) {
    if (Number(maxPeopleAmount) < 1) {
      setMaxPeopleAmount(1);
    }
  }

  const handleBill = (value) => {
    setBill(value);
  };

  console.log(bill.length);
  return (
    <Row className="justify-content-center">
      <Col className="col-12">
        <Form>
          <h2>
            <strong>{table.title}</strong>
          </h2>
          <div className="mb-2">
            <div className="d-flex">
              <div className="p-1 flex me-2"><Form.Label style={({ marginRight: "5px" })}><strong>Status:</strong></Form.Label></div>
              <div className="">
                <Form.Select aria-label="Default select example"
                  value={status}
                  onChange={(e) => handleStatus(e.target.value)}
                  placeholder="0" style={{ width: "280px", height: "40px", }}
                >
                  <option value='Free'>Free</option>;
                  <option value='Reserved'>Reserved</option>;
                  <option value='Busy'>Busy</option>;
                  <option value='Cleaning'>Cleaning</option>;
                </Form.Select>
              </div>
            </div>
          </div>
          <div className="mb-2">
            <div className="d-flex">
              <div className="p-1 flex-2 me-4"><Form.Label><strong>People:</strong></Form.Label></div>
              <div className="p-1 flex">
                <FormControl
                  disabled={status === statuses.free || status === statuses.cleaning}
                  type="number"
                  min="0"
                  max="10"
                  value={peopleAmount}
                  onChange={(e) => handlePeopleAmount(e.target.value)}
                  placeholder="0" style={{ width: "58px", height: "30px", textAlign: "center", marginRigt: "50px", }} />
              </div>
              <div className="p-2 flex-2">/</div>
              <div className="p-1 flex">
                <FormControl
                  type="number"
                  min="0"
                  max="10"
                  value={maxPeopleAmount}
                  onChange={(e) => handleMaxPeopleAmount(e.target.value)}
                  placeholder="0" style={{ width: "58px", height: "30px", marginRigt: "50px", }} />
              </div>
            </div>
          </div>
          {status === statuses.busy ? (
            <div className="mb-2">
              <div className="d-flex">
                <div className="p-1 flex-2"><Form.Label><strong>Amount:</strong></Form.Label></div>
                <div className="p-2 flex-2"><Form.Label style={({ marginLeft: "20px" })}>$</Form.Label></div>
                <div className="p-1 flex">
                  <FormControl
                    type="number"
                    value={bill}
                    onChange={(e) => handleBill(e.target.value)}
                    placeholder="0" style={{ width: `${bill.length + 4}ch`, marginRight: "10px", minWidth: "50px", paddingRight: "0.3rem" }} />
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
