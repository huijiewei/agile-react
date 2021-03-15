import { useErrorDispatch } from '@shared/contexts/ErrorContext';
import ContentLayout from '@admin/layouts/ContentLayout';
import { Button, Box } from '@material-ui/core';

const About = () => {
  const { setError } = useErrorDispatch();

  const handleClick = () => {
    setError('出现错误', true);
  };

  return (
    <ContentLayout>
      <p>About Agile</p>
      <Box>
        <Button onClick={handleClick}>中文</Button>
        &nbsp;&nbsp;
        <Button onClick={handleClick}>English</Button>
        &nbsp;&nbsp;
        <Button onClick={handleClick}>中文 English</Button>
        &nbsp;&nbsp;
        <Button size="small" onClick={handleClick}>
          中文 English
        </Button>
        &nbsp;&nbsp;
        <Button size="small" onClick={handleClick}>
          中文 English
        </Button>
      </Box>
    </ContentLayout>
  );
};

export default About;
