import {
  View,
  Text,
  StatusBar,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useLayoutEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { urlFor } from "../sanity";
import DishRow from "../components/dishRow";
import BasketIcon from "../components/BasketIcon";
import { useDispatch, useSelector } from "react-redux";
import { selectResturant, setResturant } from "../slices/resturantSlice";
import { emptyBasket } from "../slices/basketSlice";
import * as Icon from "react-native-feather";
import { themeColors } from "../theme";

export default function ResturantScreen() {
  const navigation = useNavigation();
  const resturant = useSelector(selectResturant);
  const dispatch = useDispatch();

  const {
    params: {
      id,
      title,
      imgUrl,
      rating,
      type,
      address,
      description,
      dishes,
      lng,
      lat,
    },
  } = useRoute();

  // Set navigation options to hide the header
  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);

  // Effect to handle restaurant data and basket state
  useEffect(() => {
    if (resturant && resturant.id !== id) {
      dispatch(emptyBasket());
    }
    dispatch(
      setResturant({
        id,
        title,
        imgUrl,
        rating,
        type,
        address,
        description,
        dishes,
        lng,
        lat,
      })
    );
  }, [resturant, id, dispatch]);

  return (
    <>
      <BasketIcon />
      <ScrollView>
        {/* Restaurant Image and Back Button */}
        <View style={{ position: "relative" }}>
          <Image
            style={{ width: "100%", height: 288 }}
            source={{ uri: urlFor(imgUrl).url() }}
          />
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              position: "absolute",
              top: 56,
              left: 16,
              backgroundColor: "#f9fafb",
              padding: 8,
              borderRadius: 50,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.3,
              shadowRadius: 4,
              elevation: 5,
            }}
          >
            <Icon.ArrowLeft strokeWidth={3} stroke={themeColors.bgColor(1)} />
          </TouchableOpacity>
        </View>

        {/* Restaurant Info Section */}
        <View
          style={{
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
            backgroundColor: "#fff",
            marginTop: -48,
            paddingTop: 24,
          }}
        >
          <View style={{ paddingHorizontal: 20 }}>
            <Text style={{ fontSize: 24, fontWeight: "bold" }}>{title}</Text>
            {/* Restaurant Rating and Address */}
            <View style={{ flexDirection: "row", marginVertical: 8 }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginRight: 8,
                }}
              >
                <Image
                  source={require("../assets/images/fullStar.png")}
                  style={{ height: 16, width: 16 }}
                />
                <Text style={{ fontSize: 12, color: "#4caf50", marginLeft: 4 }}>
                  {rating}
                </Text>
                <Text style={{ fontSize: 12, color: "#757575" }}>
                  {" "}
                  (4.6k review) ·{" "}
                </Text>
                <Text
                  style={{ fontSize: 12, color: "#757575", fontWeight: "bold" }}
                >
                  {type}
                </Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Icon.MapPin color="gray" width={15} height={15} />
                <Text style={{ fontSize: 12, color: "#424242", marginLeft: 4 }}>
                  {" "}
                  Nearby · {address}
                </Text>
              </View>
            </View>
            <Text style={{ fontSize: 14, color: "#757575", marginTop: 8 }}>
              {description}
            </Text>
          </View>
        </View>

        {/* Menu Section */}
        <View style={{ paddingBottom: 144, backgroundColor: "#fff" }}>
          <Text
            style={{
              paddingHorizontal: 16,
              paddingVertical: 16,
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            Menu
          </Text>
          {dishes.map((dish) => (
            <DishRow
              key={dish._id}
              id={dish._id}
              name={dish.name}
              description={dish.description}
              price={dish.price}
              image={dish.image}
            />
          ))}
        </View>
      </ScrollView>
    </>
  );
}
