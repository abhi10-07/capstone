import React, { useState, useEffect } from "react";

import { Pressable, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { GlobalStyles } from "../constants/styles";

function StockListItem({ name, price, exchangeShortName, symbol }) {
  const navigation = useNavigation();

  function stockPressHandler() {
    navigation.navigate("Stock", {
      stockId: symbol,
    });
  }

  return (
    <Pressable
      onPress={stockPressHandler}
      style={[({ pressed }) => pressed && styles.pressed, styles.list]}
    >
      <View style={styles.stockItem}>
        <View style={GlobalStyles.stockW}>
          <Text style={[styles.textBase, styles.description]}>{name}</Text>
          <Text
            style={[styles.textBase, styles.description, GlobalStyles.smFont]}
          >
            {exchangeShortName}
          </Text>
        </View>
        <View style={GlobalStyles.numberW}>
          <Text style={styles.description}>{symbol}</Text>
        </View>
        <View style={GlobalStyles.numberW}>
          <Text style={styles.description}>{price.toFixed(2)}</Text>
        </View>
      </View>
    </Pressable>
  );
}

export default StockListItem;

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.75,
  },
  stockItem: {
    padding: 5,
    marginVertical: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    borderLeftWidth: 2,
    borderLeftColor: "#008000",
    paddingLeft: "10",
  },

  textBase: {
    color: GlobalStyles.colors.primary50,
  },
  description: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: "bold",
    color: "#fff",
  },
  list: {
    borderBottomColor: "#666666",
    borderBottomWidth: 1,
    paddingBottom: 1,
  },
});
