import React from "react";
import { StyleSheet, Text, View } from "react-native";
import BigList from "react-native-big-list";
import { produceData } from "./util";
// import { Event } from "detox-instruments-react-native-utils";

const data = produceData(1000);

const renderItem = ({ item }: { item: string }) => {
  // let event = new Event("Category", "Name");
  // event.beginInterval("Start message");
  // //Long interval
  // for (let i = 0; i < 1000; i++);
  // event.endInterval(Event.EventStatus.completed, "End message");
  return (
    <View testID="foo" style={styles.item}/>
  )
};

export default function BigListTestBed() {
  return (
    <BigList data={data} renderItem={renderItem} itemHeight={50} />
  );
}

const styles = StyleSheet.create({
  item: {
    borderWidth: .5
  }
});

