# ListBenchmark
A Testbed project to benchmark React Native Flat List alternatives

## Profiling with Detox Instruments
Before profiling the app with [DetoxInstruments](https://github.com/wix/DetoxInstruments), make sure to follow the [Installation](https://github.com/wix/DetoxInstruments#installation) instructions.

Once installed, bring up the macOS Spotlight and type in `Detox Instruments` to launch the standalone application.

Open the React Native `ListBenchmark.xcworkspace` project from `Xcode`, and launch the app against a Simulator running iOS 14 preferably. The `DetoxInstruments` profile integration configured via `Run Script Phases` failed to work against the latest OS 15 on a macOS with the M1 chip.

By the point the app is built and running in the Simulator, you should see an entry in the `Detox Instruments` pop up to profile the app. Restart `Detox Instruments`, otherwise.

---
**NOTE**

Currently, `DetoxInstruments` only offers support for iOS. For more on this topic refer to [Android support #35](https://github.com/wix/DetoxInstruments/issues/35) or [Detox in 2020](https://medium.com/wix-engineering/detox-in-2020-e34525548123).

---

## Benchmarking
The alternatives that were considered for benchmark purposes against the React Native [FlatList](https://reactnative.dev/docs/flatlist) are:
- [React Native Big List](https://github.com/marcocesarato/react-native-big-list)
- [RecyclerListView](https://github.com/Flipkart/recyclerlistview)

To profile the approaches above individually, edit from `index.js` your desired setup.