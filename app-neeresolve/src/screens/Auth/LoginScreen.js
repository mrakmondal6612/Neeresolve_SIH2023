import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  View,
} from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import * as SecureStore from "expo-secure-store";
import { useDispatch } from "react-redux";
import axios from "axios";

import BackButton from "../../components/Buttons/BackButton";
import { COLORS, FONT, SIZES } from "../../constants/theme";
import MainButton from "../../components/Buttons/MainButton";
import { loginSuccess } from "../../redux/userSlice";
import { loginCall } from "../../helper/apiCalls";

async function save(key, value) {
  await SecureStore.setItemAsync(key, value);
}

async function showToast(text) {
  ToastAndroid.show(text, ToastAndroid.SHORT);
}

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [notValidEmail, setNotValidEmail] = useState(false);
  const [notValidPassword, setNotValidPassword] = useState(false);

  const inputFields = [
    {
      title: "~Email",
      placeholder: "Enter your registered email address",
      value: email,
      onChangeText: (text) => {
        setEmail(text.replace(/\s/g, ""));
      },
      id: 1,
    },
    {
      title: "~Password",
      placeholder: "Enter your password",
      value: password,
      onChangeText: (text) => {
        setPassword(text.replace(/\s/g, ""));
      },
      id: 2,
    },
  ];

  const handleValidation = () => {
    let emailError = "";

    if (!email.includes("@gmail.com")) {
      emailError = "This is not a valid email.";
      setLoading(false);
    }

    setNotValidEmail(emailError);
    return !emailError;
  };

  const login = async () => {
    setLoading(true);
    if (handleValidation()) {
      try {
        const res = await axios.post(loginCall, { email, password });
        if (res.status === 200) {
          await save("accessToken", res?.data?.token);
          dispatch(
            loginSuccess({
              user: res?.data?.user,
              isGuest: false,
            })
          );
        }
      } catch (error) {
        if (error.response?.status === 404) {
          setNotValidEmail("Email not registered");
          setLoading(false);
          return;
        } else if (error.response?.status === 403) {
          setNotValidPassword("Wrong password for this account");
          setLoading(false);
          return;
        }
        setLoading(false);
        showToast("Something went wrong, Please try again!");
        console.log(error);
      }
    } else {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={{ flex: 1, marginTop: StatusBar.currentHeight }}>
      <View style={styles.header}>
        <BackButton navigation={navigation} />
        <Text style={styles.screenTitle}>
          Welcome back! Glad to see you, Again!
        </Text>
      </View>
      {inputFields.map((input) => {
        return (
          <View style={styles.inputBox} key={input.id}>
            <Text style={styles.title}>{input.title}</Text>
            <TextInput
              style={styles.textInput}
              placeholder={input.placeholder}
              placeholderTextColor={COLORS.gray}
              value={input.value}
              onChangeText={input.onChangeText}
              secureTextEntry={input.id === 2}
            />
          </View>
        );
      })}
      <View
        style={{
          marginHorizontal: SIZES.medium,
        }}
      >
        <MainButton
          bgColor={COLORS.secondary}
          text={"Login"}
          txtColor={COLORS.primary}
          onPress={login}
          loading={loading}
        />
      </View>
    </ScrollView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  header: {
    marginVertical: SIZES.small,
    marginHorizontal: SIZES.small,
  },
  screenTitle: {
    fontFamily: FONT.bold,
    color: COLORS.secondary,
    fontSize: wp(8),
    paddingVertical: wp(2),
  },
  inputBox: {
    marginBottom: SIZES.large,
    marginHorizontal: SIZES.small,
    width: wp(95),
    gap: hp(1),
  },
  textInput: {
    backgroundColor: COLORS.white,
    padding: SIZES.medium,
    borderRadius: SIZES.small,
  },
});
