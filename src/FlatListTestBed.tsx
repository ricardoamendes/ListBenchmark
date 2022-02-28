import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { produceData } from "./util";

const data = produceData(1000);

const renderItem = ({ item }: { item: string }) => {
  return (
    <View testID="foo" style={styles.item} />
  )
};

export default function BigListTestBed() {
  return (
    <FlatList data={data} renderItem={renderItem} initialNumToRender={5} windowSize={5} getItemLayout={(data, index) => (
      { length: 50, offset: 50 * index, index }
    )} />
  );
}

const styles = StyleSheet.create({
  item: {
    flex: 1,
    height: 50,
    alignContent: "center",
    justifyContent: "center",
    borderWidth: .5
  }
});

