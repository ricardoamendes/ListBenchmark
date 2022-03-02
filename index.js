/**
 * @format
 */

import { LogBox } from 'react-native';
import { AppRegistry } from 'react-native';
import FlatListTestBed from './src/FlatListTestBed';
// import BigListTestBed from './src/BigListTestBed';
// import RecyclerListTestBed from './src/RecyclerListTestBed';
import SnapshotListTestBed from "./src/SnapshotListTestBed"
import { name as appName } from './app.json';

LogBox.ignoreAllLogs();
console.warn = () => { };

AppRegistry.registerComponent(appName, () => SnapshotListTestBed);
// AppRegistry.registerComponent(appName, () => FlatListTestBed);
// AppRegistry.registerComponent(appName, () => BigListTestBed);
// AppRegistry.registerComponent(appName, () => RecyclerListTestBed);

