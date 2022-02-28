
import React from "react";
import { View, Text, Dimensions, StyleSheet } from "react-native";
import { RecyclerListView, DataProvider, LayoutProvider } from "recyclerlistview";

const ViewTypes = {
    FULL: 0,
    HALF_LEFT: 1,
    HALF_RIGHT: 2
};

function generateArray(n: number) {
    let arr = new Array(n);
    for (let i = 0; i < n; i++) {
        arr[i] = i;
    }
    return arr;
}

const { width } = Dimensions.get("window");

//Create the data provider and provide method which takes in two rows of data and return if those two are different or not.
//THIS IS VERY IMPORTANT, FORGET PERFORMANCE IF THIS IS MESSED UP
const dataProvider = new DataProvider((r1, r2) => {
    return r1 !== r2;
});

//Create the layout provider
//First method: Given an index return the type of item e.g ListItemType1, ListItemType2 in case you have variety of items in your list/grid
//Second: Given a type and object set the exact height and width for that type on given object, if you're using non deterministic rendering provide close estimates
//If you need data based check you can access your data provider here
//You'll need data in most cases, we don't provide it by default to enable things like data virtualization in the future
//NOTE: For complex lists LayoutProvider will also be complex it would then make sense to move it to a different file
const layoutProvider = new LayoutProvider(
    index => {
        return ViewTypes.FULL;
    },
    (type, dim) => {
        dim.width = width;
        dim.height = 50;
    }
);

//Since component should always render once data has changed, make data provider part of the state
const dataProviderWithRows = dataProvider.cloneWithRows(generateArray(300))


//Given type and data return the view component
const rowRenderer = (_type: any, data: any) => {
    return (
        <View style={styles.item} />
    );
}

export default function RecyclerListTestBed() {
    return (
        <RecyclerListView style={{
            width,
        }} layoutProvider={layoutProvider} dataProvider={dataProviderWithRows} rowRenderer={rowRenderer} />
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    item: {
        borderWidth: .5
    }
});
