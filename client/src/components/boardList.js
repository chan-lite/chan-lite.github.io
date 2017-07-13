import React from "react";
import { ScrollView, View, Text, TouchableWithoutFeedback } from "react-native";
import { withNavigation } from "react-navigation";
import Navigate from "../utilities/navigate";

function Item({ title, board, navigation }) {
  const onPress = Navigate(navigation, "Board", { title, board });
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View>
        <Text>
          {title} - /{board}/
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

export default function({ boards }) {
  return (
    <ScrollView style={{ flex: 1 }}>
      {boards.map(IterateList)}
    </ScrollView>
  );
}
