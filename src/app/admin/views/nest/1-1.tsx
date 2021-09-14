import { Link, Outlet } from 'react-router-dom';

const Nest11 = (): JSX.Element => {
  return (
    <>
      <div>
        <Link to={'../1-1'}>Nest-1-1</Link>
        &nbsp;&nbsp;
        <Link to={'1-1-1'}>Nest-1-1-1</Link>
        &nbsp;&nbsp;
        <Link to={'1-1-2'}>Nest-1-1-2</Link>
      </div>
      <Outlet />
    </>
  );
};

export default Nest11;
