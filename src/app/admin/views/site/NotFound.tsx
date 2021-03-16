import { useNavigate } from 'react-router-dom';
import { Box, Button } from '@material-ui/core';

const NotFound = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Box>
      <Box>
        <Box>
          <Box>
            <img alt="Not Found" src={require('../../assets/images/logo.png')} />
          </Box>
          <Box>404</Box>
          <Box>页面不存在</Box>
          <Box>
            <Button onClick={handleBack}>返回</Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default NotFound;
