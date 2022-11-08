import { Redirect, Route } from "react-router-dom";
import {
  IonRouterOutlet,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
} from "@ionic/react";
import { home, fish } from "ionicons/icons";

import { css } from "styled-components";
import { ComponentPropsWithoutRef, ReactNode } from "react";
import Home from "./pages/Home";
import NotHome from "./pages/NotHome";

type TabProps = Pick<
  ComponentPropsWithoutRef<typeof Route>,
  "path" | "render"
> &
  Pick<ComponentPropsWithoutRef<typeof IonIcon>, "icon">;

const tabs: TabProps[] = [
  {
    path: "/home",
    render: () => <Home />,
    icon: home,
  },
  // Uncomment below to add a tab and show the tab bar
  // {
  //   path: "/not-home",
  //   render: () => <NotHome />,
  //   icon: fish,
  // },
];

export const defaultTab = tabs[0];

export default function Tabs() {
  return (
    <IonTabs
      css={css`
        ion-tab-bar {
          --background: transparent;
          border: none;
        }
        ion-tab-button {
          --background: transparent;
          max-width: 3.5rem;
        }
      `}
    >
      <IonRouterOutlet>
        {tabs.map((tab, index) => (
          <Route key={index} path={`/app${tab.path}`} render={tab.render} />
        ))}
        <Route
          path="/app"
          render={() => <Redirect to="/app/home" />}
          exact={true}
        />
      </IonRouterOutlet>
      <IonTabBar slot="bottom" hidden={tabs.length === 1}>
        {tabs.map((tab, index) => (
          <IonTabButton
            key={index}
            tab={`tab${index}`}
            href={`/app${tab.path}`}
          >
            <IonIcon icon={tab.icon} />
          </IonTabButton>
        ))}
      </IonTabBar>
    </IonTabs>
  );
}
