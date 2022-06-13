import { StyleSheet, FlatList, Text, View } from "react-native";

import StockItem from "./StockItem";
import { GlobalStyles } from "../../../constants/styles";

function renderExpenseItem(itemData) {
  return <StockItem {...itemData.item} />;
}

function TopList({ type, toplist }) {
  return (
    <View>
      <Text style={styles.listHeader}>
        {type === "gainer" ? "Top Gainer" : "Top Loser"}
      </Text>
      <View style={styles.listContainer}>
        <Text>Stocks</Text>
        <Text>Price</Text>
        <Text>Change(%)</Text>
      </View>
      <FlatList
        data={toplist}
        renderItem={renderExpenseItem}
        keyExtractor={(item) => item.symbol}
      />
    </View>
  );
}

export default TopList;

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    alignItems: "left",
    flexDirection: "row",
    color: "#fff",
    height: 20,
  },
  square: {
    backgroundColor: "#7cb48f",
    width: 100,
    height: 100,
    margin: 4,
  },
});
