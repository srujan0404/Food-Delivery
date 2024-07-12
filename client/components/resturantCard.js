import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import React from "react";
import { StarIcon } from "react-native-heroicons/solid";
import { MapPinIcon } from "react-native-heroicons/outline";
import { urlFor } from "../sanity";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { themeColors } from "../theme";
import * as Icon from "react-native-feather";

export default function ResturantCard({
  id,
  title,
  imgUrl,
  rating,
  type,
  address,
  description,
  dishes,
  reviews,
  lng,
  lat,
}) {
  const navigation = useNavigation();

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        navigation.navigate("Resturant", {
          id,
          title,
          imgUrl,
          rating,
          type,
          address,
          description,
          dishes,
          lng,
          reviews,
          lat,
        });
      }}
    >
      <View
        style={{
          shadowColor: themeColors.bgColor(0.2),
          shadowRadius: 7,
          shadowOffset: { width: 0, height: 3 },
          shadowOpacity: 0.3,
          marginVertical: 10,
          marginHorizontal: 5,
          backgroundColor: "#fff",
          borderRadius: 20,
          overflow: "hidden",
        }}
      >
        <Image
          style={{ height: 180, width: "100%" }}
          source={{ uri: urlFor(imgUrl).url() }}
        />
        <View style={{ padding: 15 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 10 }}>
            {title}
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginVertical: 5,
            }}
          >
            <Image
              source={require("../assets/images/fullStar.png")}
              style={{ height: 16, width: 16, marginRight: 5 }}
            />
            <Text style={{ fontSize: 12, color: "#4caf50" }}>{rating}</Text>
            <Text style={{ fontSize: 12, color: "#757575" }}>
              {" "}
              ({reviews} review)
            </Text>
            <Text
              style={{ fontSize: 12, color: "#757575", fontWeight: "bold" }}
            >
              {" "}
              · {type}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginVertical: 5,
            }}
          >
            <Icon.MapPin color="gray" width={15} height={15} />
            <Text style={{ fontSize: 12, color: "#757575" }}>
              {" "}
              Nearby · {address}
            </Text>
          </View>
          <Text style={{ fontSize: 12, color: "#757575", marginTop: 5 }}>
            {description}
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
