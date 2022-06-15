import React, { useState, useEffect } from "react";
import { StyleSheet, FlatList, Text, View } from "react-native";

import StockItem from "./StockItem";
import { GlobalStyles } from "../constants/styles";

function renderStockItem(itemData) {
  return <StockItem {...itemData.item} />;
}

function TopList({ type, toplist }) {
  return (
    <View>
      <View style={styles.listHeader}>
        <View style={GlobalStyles.stockW}>
          <Text style={styles.listLabel}>
            {type === "gainer" ? "Top Gainer" : "Top Loser"}
          </Text>
        </View>
        <View style={GlobalStyles.numberW}>
          <Text style={styles.listLabel}>Price</Text>
        </View>
        <View style={GlobalStyles.numberW}>
          <Text style={styles.listLabel}>Change(%)</Text>
        </View>
      </View>

      <FlatList
        data={toplist}
        renderItem={renderStockItem}
        keyExtractor={(item) => item.symbol}
      />
    </View>
  );
}

export default TopList;

const styles = StyleSheet.create({
  listLabel: {
    flex: 1,
    alignItems: "left",
    flexDirection: "row",
    color: "#CDCDCD",
    height: 20,
  },
  listHeader: {
    flex: 1,
    flexDirection: "row",
    borderBottomColor: "#CDCDCD",
    borderBottomWidth: 1,
    paddingBottom: 20,
  },

  square: {
    backgroundColor: "#7cb48f",
    width: 100,
    height: 100,
    margin: 4,
  },
});
