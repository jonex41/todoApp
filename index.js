import * as React from 'react';
import { AppRegistry } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { name as appName } from './app.json';
import App from './App'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

export default function Main() {
  return (
    

    <GestureHandlerRootView style={{ flex: 1 }}>
    <BottomSheetModalProvider>

   
    <PaperProvider>
     
      <App />
   
   
    </PaperProvider>
  
    </BottomSheetModalProvider>
    </GestureHandlerRootView>
 
  );
}

AppRegistry.registerComponent(appName, () => Main);