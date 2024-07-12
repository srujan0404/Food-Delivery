import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { selectResturant } from "../slices/resturantSlice";
import MapView, { Marker } from "react-native-maps";
import { themeColors } from "../theme";
import * as Icon from "react-native-feather";
import { emptyBasket } from "../slices/basketSlice";

export default function DeliveryScreen() {
  const navigation = useNavigation();
  const restaurant = useSelector(selectResturant);
  const dispatch = useDispatch();

  const handleCancel = () => {
    dispatch(emptyBasket());
    navigation.navigate("Home");
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView
        initialRegion={{
          latitude: restaurant.lat,
          longitude: restaurant.lng,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        style={{ flex: 1 }}
        mapType="standard"
      >
        <Marker
          coordinate={{
            latitude: restaurant.lat,
            longitude: restaurant.lng,
          }}
          title={restaurant.title}
          description={restaurant.description}
          pinColor={themeColors.bgColor(1)}
        />
      </MapView>
      <View
        style={{
          backgroundColor: "white",
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
          marginTop: -12,
        }}
      >
        <TouchableOpacity style={{ position: "absolute", right: 16, top: 8 }}>
          {/* Add any content here if needed */}
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 20,
            paddingTop: 40,
          }}
        >
          <View>
            <Text style={{ fontSize: 18, color: "#4b5563", fontWeight: "600" }}>
              Estimated Arrival
            </Text>
            <Text style={{ fontSize: 28, fontWeight: "800", color: "#4b5563" }}>
              20-30 Minutes
            </Text>
            <Text style={{ marginTop: 8, color: "#4b5563", fontWeight: "600" }}>
              Your Order is on its way
            </Text>
          </View>
          <Image
            style={{ height: 96, width: 96 }}
            source={require("../assets/images/bikeGuy2.gif")}
          />
        </View>
        <View
          style={{
            backgroundColor: themeColors.bgColor(0.8),
            padding: 8,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            borderRadius: 9999,
            marginVertical: 20,
            marginHorizontal: 8,
          }}
        >
          <View
            style={{
              backgroundColor: "rgba(255,255,255,0.4)",
              padding: 4,
              borderRadius: 9999,
            }}
          >
            <Image
              style={{
                backgroundColor: "rgba(255,255,255,0.4)",
                width: 64,
                height: 64,
                borderRadius: 9999,
              }}
              source={require("../assets/images/deliveryGuy.png")}
            />
          </View>
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={{ fontSize: 18, fontWeight: "700", color: "white" }}>
              Syed Noman
            </Text>
            <Text style={{ color: "white", fontWeight: "600" }}>
              Your Rider
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginRight: 12,
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: "white",
                padding: 8,
                borderRadius: 9999,
              }}
            >
              <Icon.Phone
                fill={themeColors.bgColor(1)}
                stroke={themeColors.bgColor(1)}
                strokeWidth="1"
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleCancel}
              style={{
                backgroundColor: "white",
                padding: 8,
                borderRadius: 9999,
                marginLeft: 12,
              }}
            >
              <Icon.X stroke={"red"} strokeWidth="5" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
