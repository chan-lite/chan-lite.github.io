import React from "react";
import { ScrollView, View, Text } from "react-native";

function Item({ no, name, sub, board }) {
  return (
    <View>
      <Text>
        {name} - {no}- {sub}
      </Text>
    </View>
  );
}

function IterateList(item, index) {
  return (
    <View key={index}>
      <Item {...item} />
    </View>
  );
}

export default function({ posts }) {
  return (
    <ScrollView style={{ flex: 1 }}>
      {posts.map(IterateList)}
    </ScrollView>
  );
}
