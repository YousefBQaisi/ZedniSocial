import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  ScrollView,
  Image,
} from "react-native";
import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/authContext";
import InputBox from "../../components/Forms/InputBox";
import SubmitButton from "../../components/Forms/SubmitButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
const Login = ({ navigation }) => {
  //global state
  const [state, setState] = useContext(AuthContext);

  //states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  //functions
  //btn function
  const handleSubmit = async () => {
    try {
      setLoading(true);
      if (!email || !password) {
        Alert.alert("please fill out all fields");
        setLoading(false);
        return;
      }
      setLoading(false);
      const { data } = await axios.post("/auth/login", { email, password });
      setState(data);
      await AsyncStorage.setItem("@auth", JSON.stringify(data));
      alert(data && data.message);
      navigation.navigate("Home");
      console.log("Login Data==>", { email, password });
    } catch (error) {
      alert(error.response.data.message);
      setLoading(false);
      console.log(error);
    }
  };
  //temp function to check local storage data
  const getLocalStorageData = async () => {
    let data = await AsyncStorage.getItem("@auth");
    console.log("local storage ===>", data);
    getLocalStorageData();
  };

  return (
    <View style={styles.container}>
      <View style={{ marginHorizontal: 82 }}>
        <Image
          source={require("../pic/ZedniLogo.jpg")}
          style={{ height: 200, width: 200, borderRadius: 100,marginHorizontal:30 }}
        />
      </View>
      <Text style={styles.pageTitle}>Login</Text>
      <View style={{ marginHorizontal: 20 }}>
        <InputBox
          inputTitle={"Email"}
          keyboardType="email-address"
          autoComplete="email"
          value={email}
          setValue={setEmail}
        />
        <InputBox
          inputTitle={"Password"}
          secureTextEntry={true}
          autoComplete="password"
          value={password}
          setValue={setPassword}
        />
      </View>
      {/* <Text>{JSON.stringify({name,email,password}, null, 4 )}</Text> */}
      <SubmitButton
        btnTitle="Login"
        loading={loading}
        handleSubmit={handleSubmit}
      />
      <Text style={styles.linkText}>
        Not a user?{" "}
        <Text
          style={styles.link}
          onPress={() => navigation.navigate("Register")}
        >
          Register
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#e1d5c9",
  },
  pageTitle: {
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
    color: "#1e2225",
    marginBottom: 20,
  },
  inputBox: {
    height: 40,
    marginBottom: 20,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    marginTop: 10,
    paddingLeft: 10,
    color: "#af9f85",
  },
  linkText: {
    textAlign: "center",
  },
  link: {
    color: "blue",
  },
});

export default Login;
