import { FeaturedBlogs } from '../features/blogs/components/FeaturedBlogs';
import { RandometricsPane } from '../features/randometrics';
import { Seo } from '../common/components/Seo';
import { PageContainer } from '../common/components/styles';

export const HomePage: React.FC = () => {
  return (
    <PageContainer>
      <Seo
        title="Dashboard"
        description="Gregory, Michael & Davies cruel and unusual measurements, ratings and categorisations."
      />
      <RandometricsPane />
      <FeaturedBlogs />
    </PageContainer>
  );
};
