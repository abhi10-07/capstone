import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

import { useStocksContext } from "../contexts/StocksContext";
import { scaleSize } from "../constants/Layout";
import { GlobalStyles } from "../constants/styles";
import TabBarIcon from "../components/TabBarIcon";
import TopList from "../components/TopList";
import Loader from "../components/ui/Loader";
import { FMI_TOPGAINER_URL, FMI_TOPLOSER_URL, FMI_KEY } from "../constants";

export default function HomeScreen({ route }) {
  const { ServerURL, watchList } = useStocksContext();
  const [gainer, setGainer] = useState([]);
  const [loser, setLoser] = useState([]);
  const [errors, setErrors] = useState([]);

  const [activeLoader, setActiveLoader] = useState(true);
  const setLoaderHandler = () => {
    setActiveLoader(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let topGainer = await fetch(FMI_TOPGAINER_URL(FMI_KEY));
        if (topGainer.status !== 200) {
          throw new Error(topGainer.status);
        }
        topGainer = await topGainer.json();

        setGainer(
          topGainer.length > 0
            ? topGainer
            : [{ error: topGainer["Error Message"] }]
        );

        let topLoser = await fetch(FMI_TOPLOSER_URL(FMI_KEY));
        if (topLoser.status !== 200) {
          throw new Error(topLoser.status);
        }
        topLoser = await topLoser.json();

        setLoser(topLoser.length > 0 ? topLoser : []);
      } catch (error) {
        let errorArray = [];
        errorArray.push(error);
        setErrors(errorArray);
        setLoaderHandler();
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    setLoaderHandler();
    if (gainer.length > 0) {
    }
  }, [gainer]);

  useEffect(() => {}, [watchList]);

  return (
    <View style={GlobalStyles.container}>
      <Text style={GlobalStyles.header}>
        Stocks Action <TabBarIcon name="chevron-forward-outline" />
      </Text>
      {activeLoader ? (
        <Loader />
      ) : errors.length > 0 ? (
        <>
          {console.log(errors[0], "Erros")}
          <Loader />
        </>
      ) : (
        <>
          <TopList toplist={gainer.slice(0, 4)} type="gainer" />
          <View
            style={{
              margin: 15,
            }}
          />
          <TopList toplist={loser.slice(0, 4)} type="loser" />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({});
