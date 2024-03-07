import { useLayoutEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Body, Button } from "react-native-ios-kit";

import RegularList from "../../components/lists/RegularList";
import DietCard from "../../components/cards/DietCard";

import { diets } from "../../Diets.json";
import { ingredients } from "../../Ingredients.json"

function GettingStartedModal() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerTitle: "",
        headerTransparent: true
      }}
      initialRouteName="GettingStarted">
      <Stack.Screen name="GettingStarted" component={GettingStartedPage} />
      <Stack.Screen name="DietPage" component={DietPage} />
      <Stack.Screen name="IngredientsPage" component={IngredientsPage} />
      <Stack.Screen name="Finished" component={Finished} />

      <Stack.Screen
        name="Diet Card"
        component={DietCard}
        options={{
          headerTitle: "Diet Information",
          headerBackTitle: "Back",
          headerTransparent: false,
          headerShadowVisible: false
        }}
      />
    </Stack.Navigator>
  );
}

function GettingStartedPage({ navigation }) {
  return (
    <OnboardingPage>
      <Title>Welcome</Title>
      <Fill>
        <TextBody>We need to set up a few things before you can use the app for the first time.</TextBody>
      </Fill>
      <PrimaryButton onPress={() => navigateAndClear(navigation, "DietPage")}>Get Started</PrimaryButton>
    </OnboardingPage>
  );
}

function DietPage({ navigation }) {
  const dietItems = Object.values(diets).map(diet => ({ name: diet.name }));

  return (
    <OnboardingPage backTitle="Your Target Diet">
      <Title>What is Your Target Diet?</Title>
      <Fill>
        <TextBody>Please select all the diets below that you would like to follow.</TextBody>
        <View style={{flex: 1, marginVertical: 20}}>
          <RegularList name="Diets" items={dietItems} features={[true, true]}/>
        </View>
      </Fill>
      <PrimaryButton onPress={() => navigation.navigate("IngredientsPage")}>Next</PrimaryButton>
    </OnboardingPage>
  );
}

function IngredientsPage({ navigation }) {
  const ingredientItems = Object.values(ingredients).map(ingredient => ({ name: ingredient.name }));

  return (
    <OnboardingPage backTitle="Ingredients to Avoid">
      <Title>What Else Can You Not Eat?</Title>
      <Fill>
        <TextBody>Please select all the ingredients below that you do not want to eat.</TextBody>
        <View style={{flex: 1, marginVertical: 20}}>
          <RegularList name="Ingredients" items={ingredientItems} features={[true, false]}/>
        </View>
      </Fill>
      <PrimaryButton onPress={() => navigation.navigate("Finished")}>Next</PrimaryButton>
    </OnboardingPage>
  );
}

function Finished({ navigation }) {
  return (
    <OnboardingPage>
      <Title>All Done</Title>
      <Fill>
        <TextBody>You are now all set up.</TextBody>
        <TextBody>You can modify your preferences in the preference page at any time.</TextBody>
      </Fill>
      <PrimaryButton onPress={() => navigateAndClear(navigation, "Main")}>Finish</PrimaryButton>
    </OnboardingPage>
  );
}

function OnboardingPage({ children, backTitle = "" }) {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    backTitles.push(backTitle);
    navigation.setOptions({ headerBackTitle: backTitles[backTitles.length - 2] });
  }, [ navigation ]);

  navigation.addListener("beforeRemove", () => {
    backTitles.pop();
  });

  return (
    <FixedSafeAreaView children={children} style={styles.view} />
  );
}

function FixedSafeAreaView({ children, style }) {
  const insets = useSafeAreaInsets();

  return (
    <View children={children} style={{ ...style, paddingTop: insets.top - 15 }} />
  );
}

function Title({ children, style }) {
  return (
    <Text children={children} style={{ ...styles.title, ...style }} />
  );
}

function Fill({ children, style }) {
  return (
    <View children={children} style={{ ...styles.fill, ...style }} />
  );
}

function TextBody({ children, style }) {
  return (
    <Body children={children} style={{ ...styles.body, ...style }} />
  );
}

function PrimaryButton({ children, onPress }) {
  return (
    <Button
      children={children}
      onPress={onPress}
      style={styles.primaryButton}
      innerStyle={styles.primaryButtonText}
      centered inverted rounded />
  );
}

function SecondaryButton({ children, onPress }) {
  return (
    <Button
      children={children}
      onPress={onPress}
      style={styles.secondaryButton}
      innerStyle={styles.secondaryButtonText}
      inline />
  );
}

function navigateAndClear(navigation, page) {
  navigation.reset({
    index: 0,
    routes: [{ name: page }]
  });

  backTitles.length = 0;
}

const backTitles = [];

const styles = StyleSheet.create({
  view: {
    flex: 1,
    marginVertical: 60,
  },
  title: {
    marginTop: 10,
    marginBottom: 20,
    marginHorizontal: 30,
    fontSize: 40,
    fontWeight: "700",
    lineHeight: 48,
    textAlign: "center"
  },
  fill: {
    flexGrow: 1,
    height: 1
  },
  body: {
    marginTop: 10,
    marginHorizontal: 30,
    textAlign: "center"
  },
  primaryButton: {
    marginVertical: 5,
    marginHorizontal: 30,
    padding: 15,
    borderRadius: 15
  },
  primaryButtonText: {
    fontSize: 17,
    fontWeight: 600
  },
  secondaryButton: {
    flexGrow: 1,
    marginVertical: 20,
    marginHorizontal: 30
  },
  secondaryButtonText: {
    fontSize: 18,
    textAlign: "center"
  }
});

export default GettingStartedModal;