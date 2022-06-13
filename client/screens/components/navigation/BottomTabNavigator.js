import React, { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TabBarIcon from "../TabBarIcon";
import StocksScreen from "../../StocksScreen";
import SearchScreen from "../../SearchScreen";
import LoginScreen from "../../LoginScreen";
import HomeScreen from "../../HomeScreen";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = "Home";

export default function BottomTabNavigator({ navigation, route }) {
  useEffect(() => {
    navigation.setOptions({ headerTitle: getHeaderTitle(route) });
  }, [navigation, route]);

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="home" />
          ),
        }}
      />
      <BottomTab.Screen
        name="Stocks"
        component={StocksScreen}
        options={{
          title: "Stocks",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="trending-up" />
          ),
        }}
      />
      <BottomTab.Screen
        name="Login"
        component={LoginScreen}
        options={{
          title: "Profile",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="person-circle-outline" />
          ),
        }}
      />
      <BottomTab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          title: "Search",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="md-search" />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  return getFocusedRouteNameFromRoute(route) ?? INITIAL_ROUTE_NAME;
}
