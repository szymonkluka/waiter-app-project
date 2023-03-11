import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getTableById } from '../../../redux/tablesRedux';
import TableForm from '../TableForm/TableForm';

const EditTableForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const tableData = useSelector(state => getTableById(state, id));
  if (tableData === undefined) {
    navigate('/table/:id')
  }
  else
    return (
      <TableForm
        actionText="Edit table"
        status={tableData.status}
        currentPeople={tableData.currentPeople}
        maxPeople={tableData.maxPeople}
        bill={tableData.bill}
      />
    )
}

export default EditTableForm;