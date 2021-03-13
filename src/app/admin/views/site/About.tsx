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
      <p>
        <button className={'btn'} onClick={handleClick}>
          错误返回
        </button>
      </p>
    </ContentLayout>
  );
};

export default About;
