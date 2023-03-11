import EditTableForm from "../../features/EditTableForm/EditTableForm";
import { getTableById } from '../../../redux/tablesRedux';
import { useParams, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';



const TableEdit = () => {
  const { id } = useParams();
  const tableId = useSelector(state => getTableById(state, id));

  if (!tableId) return <Navigate to="/" />;

  else

    return (
      <>
        <div className="mb-2">
          <h1 className="mb-3">{tableId.id}</h1>
        </div>
        <EditTableForm />
      </>
    )
}

export default TableEdit;