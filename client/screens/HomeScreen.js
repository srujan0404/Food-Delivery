import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useLayoutEffect, useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import Categories from "../components/categories";
import FeatureRow from "../components/featuredRow";
import { getFeaturedResturants } from "../api";
import * as Icon from "react-native-feather";
import { themeColors } from "../theme";

export default function HomeScreen() {
  const [featuredCategories, setFeaturedCategories] = useState([]);
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);

  useEffect(() => {
    getFeaturedResturants().then((data) => {
      setFeaturedCategories(data);
    });
  }, []);

  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
      <StatusBar barStyle="dark-content" />

      {/* Search Bar */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 16,
          paddingBottom: 8,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            flex: 1,
            padding: 12,
            borderRadius: 9999,
            borderWidth: 1,
            borderColor: "#d1d5db",
          }}
        >
          <Icon.Search height={25} width={25} stroke="gray" />
          <TextInput
            placeholder="Restaurants"
            style={{ marginLeft: 8, flex: 1 }}
            keyboardType="default"
          />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingLeft: 8,
              borderLeftWidth: 1,
              borderColor: "#d1d5db",
            }}
          >
            <Icon.MapPin height={20} width={20} stroke="gray" />
            <Text style={{ color: "#6b7280", marginLeft: 4 }}>
              New York, NYC
            </Text>
          </View>
        </View>
        <View
          style={{
            backgroundColor: themeColors.bgColor(1),
            padding: 12,
            borderRadius: 9999,
            marginLeft: 8,
          }}
        >
          <Icon.Sliders
            height={20}
            width={20}
            strokeWidth="2.5"
            stroke="white"
          />
        </View>
      </View>

      {/* Main Content */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 50,
        }}
      >
        {/* Categories */}
        <Categories />

        {/* Featured Categories */}
        <View style={{ marginTop: 20 }}>
          {featuredCategories?.map((category) => (
            <FeatureRow
              key={category._id}
              id={category._id}
              title={category.name}
              resturants={category?.resturants}
              description={category.description}
              featuredCategory={category._type}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
