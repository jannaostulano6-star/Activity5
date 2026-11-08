import React, { createContext, useState, useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeTab from "./HomeTab";
import SettingsTab from "./SettingsTab";

export const AppContext = createContext();

export function AppProvider({ children }) {
  const [theme, setTheme] = useState("light");
  const [username, setUsername] = useState("Guest");
  const [saving, setSaving] = useState(false);

  const updateUsername = (name) => {
    setSaving(true);
    setTimeout(() => {
      setUsername(name);
      setSaving(false);
    }, 1000);
  };

  const toggleTheme = () => {
    setTheme((t) => (t === "light" ? "dark" : "light"));
  };

  return (
    <AppContext.Provider
      value={{ theme, setTheme, toggleTheme, username, setUsername, updateUsername, saving }}
    >
      {children}
    </AppContext.Provider>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <AppProvider>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Home" component={HomeTab} />
          <Tab.Screen name="Settings" component={SettingsTab} />
        </Tab.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
}
