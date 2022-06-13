import { Pressable, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { GlobalStyles } from "../../../constants/styles";

function StockItem({ name, price, change, symbol }) {
  const navigation = useNavigation();

  function stockPressHandler() {
    navigation.navigate("Stock", {
      stockId: symbol,
    });
  }

  return (
    <Pressable
      onPress={stockPressHandler}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.stockItem}>
        <View>
          <Text style={[styles.textBase, styles.description]}>{name}</Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.price}>{price.toFixed(2)}</Text>
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
  stockItem: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: GlobalStyles.colors.primary500,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 6,
    elevation: 3,
    shadowColor: GlobalStyles.colors.gray500,
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
  },
  textBase: {
    color: GlobalStyles.colors.primary50,
  },
  description: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: "bold",
  },
});
