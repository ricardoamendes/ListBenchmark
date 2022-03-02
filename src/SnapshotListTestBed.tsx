import React, { useEffect, useRef, useState, useImperativeHandle } from "react";
import { StyleSheet, Text, View, FlatList, Dimensions, Image, Alert, TouchableOpacity } from "react-native";
import ViewShot from "react-native-view-shot";
import { produceData } from "./util";

const data = produceData(15);
const width = Dimensions.get("window").width;
const itemHeight = 250;

const RandomizedNestedView = (props) => {
  const index = props.index;
  return (
    <View key={index} style={{ flex: 1 }}>
      {Array.from({ length: (Math.random() * (50 - 20) + 20) }).map((_, index) => (
        <View key={index} testID="bar" style={[{ flex: 1, backgroundColor: "red", width: (index % 1 === 0 ? "100%" : width / 2) }]} >
          {index % 1 === 0 ? <View testID="bar" style={[{ flex: 1, backgroundColor: "yellow", width: (index % 2 === 0 ? width : width / 2) }]} /> : null}
          {index % 2 === 0 ? <View testID="xyz" style={[{ flex: 1, backgroundColor: "purple", width: width / 6 }]} /> : null}
        </View>
      ))}
      {props.children}
    </View>
  )
}

const ListItem = React.forwardRef(({ index, updateRenderCount }, ref) => {
  const [isInView, setIsInView] = React.useState(false);
  const [showText, setShowText] = React.useState(false);
  const [preview, setPreview] = useState(null);
  const snapshotRef = useRef();
  const hasPlaceholder = useRef(false);

  useImperativeHandle(ref, () => ({
    setVisible: setIsInView,
  }));

  /**
   * Additional processing overhead for stress testing purposes
   */
  useEffect(() => {
    const id = setInterval(() => {
      // forceUpdate();
      // for (let i = 0; i < 1000; i++) {
      //   // console.log("print", i);
      //   counter+=i;
      // }
    }, Math.random() * (5000 - 1000) + 1000)
    return () => {
      clearInterval(id)
    }
  }, [])

  /**
   * Blinking text effect for stress testing purposes
   */
  useEffect(() => {
    setTimeout(() => {
      setShowText(!showText)
    }, 500)
  }, [showText])

  useEffect(() => {
    const snapshot = () => {
      if (snapshotRef && snapshotRef.current && snapshotRef.current.capture) {
        snapshotRef.current.capture({ quality: 1 }).then((uri) => {
          if (uri) {
            console.log(`Taking view snapshot for item ${index}...`)
            updateRenderCount();
            setPreview({ uri: `data:image/png;base64,${uri}` })
          }
        })
      }
    }

    if (!hasPlaceholder.current) {
      // Intentionally delay the snapshot step for experiment purposes
      setTimeout(() => {
        snapshot();
      }, 15000);
    }
  }, [snapshotRef]);
  return (
    ((hasPlaceholder.current || preview) && !isInView) ? (
      <View style={{ flex: 1, height: itemHeight }}>
        {!hasPlaceholder.current && <Image
          fadeDuration={0}
          resizeMode="contain"
          style={styles.item}
          source={preview}
        />}
        <Text style={{ color: "grey", fontWeight: "bold", marginTop: 58, ...StyleSheet.absoluteFillObject, left: 4, zIndex: 40 }}>SNAPSHOT</Text>
      </View>) : (
      <ViewShot
        ref={snapshotRef}
        style={[styles.item]}
        options={{ result: "base64", format: "webp", quality: .75 }}
      >
        <View
          style={{
            height: itemHeight,
            alignItems: 'center',
            justifyContent: 'center',
            borderBottomColor: 'red',
            borderBottomWidth: 1,
          }}
        >
          <TouchableOpacity style={{ ...StyleSheet.absoluteFillObject, alignContent: "center", alignItems: "center", justifyContent: "center", height: 44, padding: 10, backgroundColor: "green", zIndex: 4 }} onPress={() => Alert.alert("Here!")}><Text>Pressable Test</Text></TouchableOpacity>
          <Text style={{ textAlign: 'center', color: "grey", opacity: showText ? 0.25 : 1, alignContent: "center", alignItems: "center", ...StyleSheet.absoluteFillObject, top: 44, backgroundColor: "cyan", justifyContent: "center", height: 44, padding: 10, paddingTop: 14 }}>Onscreen View - Status: {isInView ? 'IN' : 'OFF'}</Text>
          <View style={{ flex: 1, marginTop: 88 }}>
            <RandomizedNestedView index={index}>
              <RandomizedNestedView index={index}>
                <RandomizedNestedView index={index} />
              </RandomizedNestedView>
            </RandomizedNestedView>
          </View>
        </View>

      </ViewShot>
    )
  );
});

export default function SnapshotListTestBed() {
  const refs = React.useRef({});
  const updateRenderCount = React.useRef(0);

  const onViewableItemsChanged = React.useRef(({ changed }) => {
    changed.forEach((item) => {
      if (refs.current) {
        refs.current[item.item].setVisible(item.isViewable);
      }
    });
  });

  const viewabilityConfig = {
    minimumViewTime: 0,
    itemVisiblePercentThreshold: 0
  };

  return (
    <FlatList
      data={data}
      keyExtractor={(_item, index) => index.toString()}
      renderItem={({ item, index }) => (
        <ListItem
          item={item}
          index={index}
          updateRenderCount={() => {
            updateRenderCount.current += 1;
          }}
          ref={(ref) => {
            refs.current[index.toString()] = ref;
          }}
        />
      )}
      getItemLayout={(data, index) => (
        { length: itemHeight, offset: itemHeight * index, index }
      )}
      onViewableItemsChanged={onViewableItemsChanged.current}
      viewabilityConfig={viewabilityConfig}
      windowSize={data.length + 1}
    />
  );
}

const styles = StyleSheet.create({
  item: {
    flex: 1,
    height: itemHeight,
    alignContent: "center",
    justifyContent: "center",
  }
});

