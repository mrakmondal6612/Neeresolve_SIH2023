import React, { useState } from "react";
import {
  KeyboardAvoidingView,
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
import axios, { AxiosError } from "axios";

import BackButton from "../../components/Buttons/BackButton";
import { COLORS, FONT, SIZES } from "../../constants/theme";
import MainButton from "../../components/Buttons/MainButton";
import { signUpCall } from "../../helper/apiCalls";
import { loginSuccess } from "../../redux/userSlice";

async function save(key, value) {
  await SecureStore.setItemAsync(key, value);
}

async function showToast(text) {
  ToastAndroid.show(text, ToastAndroid.SHORT);
}

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const inputFields = [
    {
      title: "Email",
      placeholder: "Type an email address",
      value: email,
      onChangeText: (text) => {
        setEmail(text.replace(/\s/g, ""));
      },
      id: 1,
    },
    {
      title: "Name",
      placeholder: "Type your name",
      value: name,
      onChangeText: (text) => {
        setName(text);
      },
      id: 3,
    },
    {
      title: "Username",
      placeholder: "Type an username (optional)",
      value: username,
      onChangeText: (text) => {
        setUsername(text.replace(/\s/g, ""));
      },
      id: 4,
    },
    {
      title: "Password",
      placeholder: "Type a password",
      value: password,
      onChangeText: (text) => {
        setPassword(text);
      },
      id: 2,
    },
  ];

  const handleValidation = () => {
    if (!email) {
      showToast("Email is required");
      return;
    }
    if (!name) {
      showToast("Name is required");
      return;
    }
    if (!password) {
      showToast("Password is required");
      return;
    }
    if (password.length < 6) {
      showToast("Password should be atleast 6 characters long");
      return;
    }
    return true;
  };

  const handleRegister = async () => {
    if (!handleValidation()) return showToast("Please fill all the fields");
    setLoading(true);
    const registerData = {
      username,
      email,
      password,
      name,
    };

    try {
      const res = await axios.post(signUpCall, registerData);
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
      console.log({ error });
      if (error instanceof AxiosError) {
        console.log({ error: error.response?.data?.message }, error.message);
      }
      if (error.response?.status === 409) {
        showToast("Email already registered!");
      } else {
        showToast("Something went wrong, Please try again!");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, marginTop: StatusBar.currentHeight }}
      behavior="padding"
      enabled
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <BackButton navigation={navigation} />
          <Text style={styles.screenTitle}>Hello! Register to get started</Text>
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
                keyboardType={input.id === 1 ? "email-address" : "default"}
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
            text={"Register"}
            txtColor={COLORS.primary}
            onPress={handleRegister}
            loading={loading}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingBottom: hp(10),
    gap: 10,
  },
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
  title: {
    fontFamily: FONT.medium,
    fontSize: SIZES.small + 2,
    color: COLORS.gray,
  },
});
