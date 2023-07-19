import {AppRegistry, Platform} from 'react-native';
import {name as appName} from './app.json';
import App from './src/App';

import {Federated, ScriptManager} from '@callstack/repack/client';

ScriptManager.shared.addResolver(async (scriptId, caller) => {
  const resolveURL = Federated.createURLResolver({
    containers: {
      MiniApp: 'http://localhost:8080/[name][ext]',
    },
  });

  const url = resolveURL(scriptId, caller);
  if (url) {
    return {
      url,
      query: {
        platform: Platform.OS,
      },
    };
  }
});

AppRegistry.registerComponent(appName, () => App);
