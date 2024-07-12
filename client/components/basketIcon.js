import { View, Text, TouchableOpacity } from "react-native";
import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectBasketItems, selectBasketTotal } from "../slices/basketSlice";
import { useNavigation } from "@react-navigation/native";
import { themeColors } from "../theme";
import PropTypes from "prop-types";

const BasketIcon = () => {
  const basketItems = useSelector(selectBasketItems);
  const basketTotal = useSelector(selectBasketTotal);
  const navigation = useNavigation();

  const itemCount = useMemo(() => basketItems.length, [basketItems]);
  const totalAmount = useMemo(() => basketTotal, [basketTotal]);

  if (!itemCount) return null;

  return (
    <View
      style={{
        position: "absolute",
        bottom: 20,
        width: "100%",
        zIndex: 50,
        alignItems: "center",
      }}
    >
      <TouchableOpacity
        style={{
          backgroundColor: themeColors.bgColor(1),
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginHorizontal: 20,
          borderRadius: 30,
          paddingVertical: 12,
          paddingHorizontal: 16,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.3,
          shadowRadius: 4,
          elevation: 5,
        }}
        onPress={() => navigation.navigate("Cart")}
      >
        <View
          style={{
            paddingVertical: 8,
            paddingHorizontal: 16,
            borderRadius: 30,
            backgroundColor: "rgba(255,255,255,0.3)",
            marginRight: 10,
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              color: "#fff",
              fontSize: 18,
            }}
          >
            {itemCount}
          </Text>
        </View>

        <Text
          style={{
            flex: 1,
            textAlign: "center",
            fontWeight: "bold",
            color: "#fff",
            fontSize: 18,
          }}
        >
          View Cart
        </Text>
        <Text
          style={{
            fontWeight: "bold",
            color: "#fff",
            fontSize: 18,
          }}
        >
          ${totalAmount}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

BasketIcon.propTypes = {
  basketItems: PropTypes.array,
  basketTotal: PropTypes.number,
};

export default BasketIcon;
