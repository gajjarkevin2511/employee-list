import { Box } from '@mui/material';
import EmployeeList from './component/employee-list';
import { styles } from './styles';

function App() {
  return (
    <Box sx={styles.app}>
      <EmployeeList />
    </Box>
  );
}

export default App;
