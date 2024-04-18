import { useFonts } from "expo-font";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import AppNavigation from "./src/routes/AppNavigation";
import { persistor, store } from "./src/redux/store";

export default function App() {
  const [loaded] = useFonts({
    SFProMedium: require("./assets/fonts/SF-Pro-Text-Medium.otf"),
    SFProMediumItalic: require("./assets/fonts/SF-Pro-Text-MediumItalic.otf"),
    SFProBold: require("./assets/fonts/SF-Pro-Text-Bold.otf"),
    SFProBoldItalic: require("./assets/fonts/SF-Pro-Text-BoldItalic.otf"),
    SFProRegular: require("./assets/fonts/SF-Pro-Text-Regular.otf"),
    SFProRegularItalic: require("./assets/fonts/SF-Pro-Text-RegularItalic.otf"),
    SFProLight: require("./assets/fonts/SF-Pro-Text-Light.otf"),
    SFProLightItalic: require("./assets/fonts/SF-Pro-Text-LightItalic.otf"),
    VintageModern: require("./assets/fonts/Vintage-Modern.ttf"),
  });

  if (!loaded) return null;

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppNavigation />
      </PersistGate>
    </Provider>
  );
}
