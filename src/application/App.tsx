import { Route, Routes } from 'react-router-dom';
import { AppThemeProvider, PageContainer } from '@gergling/ui-components';
import {
  Group as GroupIcon,
  HistoryEdu as HistoryEduIcon,
  Home as HomeIcon,
} from '@mui/icons-material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// TODO: I hate it, but it works. Ideally it would just be imported by the package.
import '@fontsource-variable/bodoni-moda-sc';
import '@fontsource-variable/raleway';
import '@fontsource-variable/raleway/wght-italic.css';
import { getRoute, getRoutes } from '../routes';
import { ElasticResponseContainer } from '../features/elastic-response';
import { MainContent } from '../common/components/MainContent';
import { useApp } from './hooks';
import { NavItemConfig } from './types';

const queryClient = new QueryClient();

const navItems: NavItemConfig[] = [
  {
    icon: <HomeIcon />,
    text: 'Home',
    path: getRoute('home').path,
  },
  {
    icon: <HistoryEduIcon />,
    text: 'Blogs',
    path: getRoute('blogs').path,
  },
  {
    icon: <GroupIcon />,
    text: 'Team',
    path: getRoute('team').path,
  },
];

const App: React.FC = () => {
  const routes = getRoutes();
  const { navigationItems: items } = useApp(navItems);
  return (
    <AppThemeProvider>
      <QueryClientProvider client={queryClient}>
        <ElasticResponseContainer>
          <PageContainer
            appHeaderProps={{
              title: 'Gregory, Michael & Davies',
            }}
            navigationDrawerProps={{
              items,
            }}
          >
            <MainContent>
              <Routes>
                {routes.map(({ props }) => <Route {...props} />)}
              </Routes>
            </MainContent>
          </PageContainer>
        </ElasticResponseContainer>
      </QueryClientProvider>
    </AppThemeProvider>
  );
};

export default App;
