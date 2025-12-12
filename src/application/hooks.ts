import { useNavigate } from "react-router-dom";
import { NavItemConfig } from "./types";
import { useEffect, useMemo } from "react";
import { PageContainer } from "@gergling/ui-components";

type NavigationDrawerItem = Parameters<typeof PageContainer>[0]['navigationDrawerProps']['items'][0];

const useNavigationItems = (navItems: NavItemConfig[]) => {
  const navigate = useNavigate();
  const items: NavigationDrawerItem[] = useMemo(
    () => navItems.map(({
      icon,
      path,
      text
    }) => ({
      icon,
      onClick: () => navigate(path),
      text
    })),
    []
  );

  return items;
};

const useStaticNavigation = () => {
  const navigate = useNavigate();
  useEffect(() => {
    // 1. Check if the session storage has a path we need to redirect to
    const redirectPath = sessionStorage.getItem('redirect');
    
    if (redirectPath && redirectPath !== window.location.pathname) {
      // 2. Clear the storage so we don't loop
      sessionStorage.removeItem('redirect');

      // 3. Use your router's navigation function to go to the original path
      // ASSUMING YOU USE react-router-dom:
      navigate(redirectPath);
      
      // OR, if you use simple window.location management (less common):
      // window.history.replaceState(null, '', redirectPath);
    }
  }, []);
}

export const useApp = (navItems: NavItemConfig[]) => {
  const navigationItems = useNavigationItems(navItems);
  useStaticNavigation();

  return {
    navigationItems,
  };
};
