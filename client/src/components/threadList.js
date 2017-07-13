import React from "react";
import { ScrollView, View, Text, TouchableWithoutFeedback } from "react-native";
import { withNavigation } from "react-navigation";
import Navigate from "../utilities/navigate";

//       "ext": ".png",
//       "filename": "RMS",
//       "fsize": 299699,
//       "h": 399,
//       "images": 0,
//       "md5": "cEeDnXfLWSsu3+A/HIZkuw==",
//       "name": "Anonymous",
//       "no": 51971506,
//       "now": "12/20/15(Sun)20:03:52",
//       "replies": 0,
//       "resto": 0,
//       "semantic_url": "the-g-wiki",
//       "sticky": 1,
//       "tim": 1450659832892,
//       "time": 1450659832,
//       "tn_h": 221,
//       "tn_w": 250,
//       "w": 450,

function Item({ no, name, board, navigation }) {
  const onPress = Navigate(navigation, "Thread", { no, board });
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View>
        <Text>
          {name} - {no}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

const ItemNav = withNavigation(Item);

function IterateList(item, index) {
  return (
    <View key={index}>
      <ItemNav {...item} />
    </View>
  );
}

export default function({ threads }) {
  return (
    <ScrollView style={{ flex: 1 }}>
      {threads.map(IterateList)}
    </ScrollView>
  );
}
