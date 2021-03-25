import { useErrorDispatch } from '@shared/contexts/ErrorContext';
import ContentLayout from '@admin/layouts/ContentLayout';

const About = () => {
  const { setError } = useErrorDispatch();

  const handleClick = () => {
    setError('出现错误', true);
  };

  return (
    <ContentLayout>
      <p>About Agile</p>
      <div>
        <button onClick={handleClick}>中文</button>
        &nbsp;&nbsp;
        <button onClick={handleClick}>English</button>
        &nbsp;&nbsp;
        <button onClick={handleClick}>中文 English</button>
        &nbsp;&nbsp;
        <button onClick={handleClick}>中文 English</button>
        &nbsp;&nbsp;
        <button onClick={handleClick}>中文 English</button>
      </div>
    </ContentLayout>
  );
};

export default About;
