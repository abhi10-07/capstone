import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableHighlight } from "react-native";

import TopList from "./components/UI/TopList";
import Loader from "./components/UI/Loader";
import { GlobalStyles } from "../constants/styles";
import { FMI_KEY, FMI_TOPGAINER_URL, FMI_TOPLOSER_URL } from "../constants";

// import ModalError from "../UI/ModalError";

const HomeScreen = ({ route }) => {
  const [gainer, setGainer] = useState([]);
  const [loser, setLoser] = useState([]);
  // const [active, setActive] = useState([]);
  const [errors, setErrors] = useState([]);

  const [activeLoader, setActiveLoader] = useState(true);
  const setLoaderHandler = () => {
    setActiveLoader(false);
  };

  const toToplistPage = (stocks, title) => {
    window.scrollTo({ top: 0 });
    navigate(`/toplist`, {
      state: {
        stocksList: stocks,
        title,
      },
    });

    //window.location.assign('/search/'+this.state.query+'/some-action');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let topGainer = await fetch(FMI_TOPGAINER_URL(FMI_KEY));
        if (topGainer.status !== 200) {
          throw new Error(topGainer.status);
        }
        topGainer = await topGainer.json();

        let topLoser = await fetch(FMI_TOPLOSER_URL(FMI_KEY));
        if (topLoser.status !== 200) {
          throw new Error(topLoser.status);
        }
        topLoser = await topLoser.json();

        setGainer(
          topGainer.length > 0
            ? topGainer
            : [{ error: topGainer["Error Message"] }]
        );
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

  return (
    <View style={GlobalStyles.container}>
      <TopList toplist={gainer.slice(0, 4)} type="gainer" />

      <TouchableHighlight
        onPress={() => {
          let title = "Top Gainer Stocks";
          toToplistPage(gainer, title);
        }}
        underlayColor="white"
      >
        <View style={styles.button}>
          <Text style={styles.buttonText}>View More</Text>
        </View>
      </TouchableHighlight>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  button: {
    margin: 30,
    borderRadius: 25,
    alignItems: "center",
    backgroundColor: "#2196F3",
  },
  buttonText: {
    textAlign: "center",
    padding: 20,
    color: "white",
  },
});
