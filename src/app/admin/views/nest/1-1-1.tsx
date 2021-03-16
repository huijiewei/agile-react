import { Link, Outlet } from 'react-router-dom';
import { Box } from '@material-ui/core';

const Nest111 = () => {
  return (
    <>
      <Box>
        <Link to={'../1-1-1'}>Nest-1-1-1</Link>
        &nbsp;&nbsp;
        <Link to={'1-1-1-1'}>Nest-1-1-1-1</Link>
        &nbsp;&nbsp;
        <Link to={'1-1-1-2'}>Nest-1-1-1-2</Link>
      </Box>
      <Outlet />
    </>
  );
};

export default Nest111;
