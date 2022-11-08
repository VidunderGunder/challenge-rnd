import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { StatusBar, Style } from "@capacitor/status-bar";

import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router-dom";

import Tabs, { defaultTab } from "./Tabs";

setupIonicReact({
  mode: "ios",
});

window
  .matchMedia("(prefers-color-scheme: dark)")
  .addListener(async (status) => {
    try {
      await StatusBar.setStyle({
        style: status.matches ? Style.Dark : Style.Light,
      });
    } catch {}
  });

const AppShell = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet id="main">
          <Route path="/app" render={() => <Tabs />} />
          <Route
            path="/"
            render={() => <Redirect to={`/app${defaultTab.path}`} />}
            exact={true}
          />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default AppShell;
