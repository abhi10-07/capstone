import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";

import { useStocksContext } from "../contexts/StocksContext";
import { scaleSize } from "../constants/Layout";
import { GlobalStyles } from "../constants/styles";

export default function LoginScreen({ route }) {
  const { ServerURL, watchList } = useStocksContext();

  useEffect(() => {}, [watchList]);

  return (
    <View style={GlobalStyles.container}>
      {/* FixMe: add children here! */}
    </View>
  );
}

const styles = StyleSheet.create({});
