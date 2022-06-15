import React, { useState, useEffect } from "react";

import { Pressable, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { GlobalStyles } from "../constants/styles";

function StockItem({ name, price, change, changesPercentage, symbol }) {
  const navigation = useNavigation();

  function stockPressHandler() {
    navigation.navigate("Stock", {
      stockId: symbol,
    });
  }

  const stockColor = change > 0 ? true : false;

  return (
    <Pressable
      onPress={stockPressHandler}
      style={[({ pressed }) => pressed && styles.pressed, styles.list]}
    >
      <View
        style={stockColor ? styles.stockItemPositive : styles.stockItemNegative}
      >
        <View style={GlobalStyles.stockW}>
          <Text style={[styles.textBase, styles.description]}>{name}</Text>
        </View>
        <View style={GlobalStyles.numberW}>
          <Text style={styles.description}>{price.toFixed(2)}</Text>
        </View>
        <View style={GlobalStyles.numberW}>
          <Text
            style={[
              styles.description,
              stockColor ? styles.positiveStock : styles.negativeStock,
            ]}
          >
            {change}
          </Text>
          <Text
            style={[
              styles.description,
              GlobalStyles.smFont,
              stockColor ? styles.positiveStock : styles.negativeStock,
            ]}
          >{`${changesPercentage.toFixed(2)}%`}</Text>
        </View>
      </View>
    </Pressable>
  );
}

export default StockItem;

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.75,
  },
  stockItemPositive: {
    padding: 5,
    marginVertical: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    borderLeftWidth: 2,
    borderLeftColor: "#008000",
    paddingLeft: "10",
  },
  stockItemNegative: {
    padding: 5,
    marginVertical: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    borderLeftWidth: 2,
    borderLeftColor: "#FF0000",
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
  positiveStock: {
    color: "#008000",
  },
  negativeStock: {
    color: "#FF0000",
  },
});
