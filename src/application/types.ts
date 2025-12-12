import { ReactNode } from "react";
import { AppRouteName, AppRoutes } from "../routes";

export type NavItemConfig = {
  icon: ReactNode;
  text: string;
  path: AppRoutes[AppRouteName]['path'];
};
