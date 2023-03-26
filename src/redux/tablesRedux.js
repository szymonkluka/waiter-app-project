export const getAllTables = ({ tables }) => tables;
export const getTableById = ({ tables }, id) => tables.find(table => table.id === id);

const createActionName = actionName => `app/tables/${actionName}`;
const createActionNameStatus = (action) => {
  return `app/status/${action}`;
};
const EDIT_TABLE = createActionNameStatus();
const GET_TABLES = createActionName('GET_TABLES');
const setTables = payload => ({ type: GET_TABLES, payload });

export const fetchData = () => {
  return (dispatch) => {
    fetch('http://localhost:3131/tables')
      .then((response) => response.json())
      .then((data) => dispatch(setTables(data)));
  };
};

export const updateTable = (tables) => {
  return (dispatch) => {
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tables)
    };
    fetch(`${'http://localhost:3131'}/tables/${tables.id}`, options)
      .then((response) => response.json())
      .then(() => dispatch(fetchData()));
  };
}

export const tablesReducer = (statePart = [], action) => {
  switch (action.type) {
    case EDIT_TABLE:
      return statePart.map(table => (table.id === action.payload.id) ? { ...table, ...action.payload } : table);
    case GET_TABLES:
      return [...action.payload];
    default:
      return statePart;
  }
};






