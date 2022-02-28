/**
 * @format
 */

import {AppRegistry} from 'react-native';
import FlatListTestBed from './src/FlatListTestBed';
// import BigListTestBed from './src/BigListTestBed';
// import RecyclerListTestBed from './src/RecyclerListTestBed';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => FlatListTestBed);
// AppRegistry.registerComponent(appName, () => BigListTestBed);
// AppRegistry.registerComponent(appName, () => RecyclerListTestBed);

