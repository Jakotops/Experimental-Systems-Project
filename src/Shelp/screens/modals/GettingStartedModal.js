import { useLayoutEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Body, Button } from "react-native-ios-kit";

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
      <Stack.Screen name="Page2" component={Page2} />
      <Stack.Screen name="Page3" component={Page3} />
      <Stack.Screen name="Page4" component={Page4} />
      <Stack.Screen name="SkippablePage" component={SkippablePage} />
      <Stack.Screen name="Page5" component={Page5} />
      <Stack.Screen name="Finished" component={Finished} />
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
      <PrimaryButton onPress={() => navigateAndClear(navigation, "Page2")}>Get Started</PrimaryButton>
    </OnboardingPage>
  );
}

function Page2({ navigation }) {
  return (
    <OnboardingPage backTitle="Set This Up">
      <Title>Set This Up</Title>
      <Fill>
        <TextBody>You need to set this up.</TextBody>
      </Fill>
      <PrimaryButton onPress={() => navigation.navigate("Page3")}>Next</PrimaryButton>
    </OnboardingPage>
  );
}

function Page3({ navigation }) {
  return (
    <OnboardingPage backTitle="Other Back Message">
      <Title>Set That Up</Title>
      <Fill>
        <TextBody>You need to set that up.</TextBody>
      </Fill>
      <PrimaryButton onPress={() => navigation.navigate("Page4")}>Next</PrimaryButton>
    </OnboardingPage>
  );
}

function Page4({ navigation }) {
  return (
    <OnboardingPage backTitle="Never Gonna Give You Up">
      <Title>Would You Like To Go To The Next Page?</Title>
      <Fill>
        <TextBody>You need to make a decision here.</TextBody>
      </Fill>
      <SecondaryButton onPress={() => navigation.navigate("Page5")}>Skip The Next Page</SecondaryButton>
      <PrimaryButton onPress={() => navigation.navigate("SkippablePage")}>Go To The Next Page</PrimaryButton>
    </OnboardingPage>
  );
}

function SkippablePage({ navigation }) {
  return (
    <OnboardingPage backTitle="🥐 (This Is Not A Drill)">
      <Title>Croissant?</Title>
      <Fill>
        <TextBody>Croissant!</TextBody>
        <Fill style={{ justifyContent: "center" }}>
          <TextBody style={{ fontSize: 144, lineHeight: 160 }}>🥐</TextBody>
        </Fill>
      </Fill>
      <PrimaryButton onPress={() => navigation.navigate("Page5")}>Croissant</PrimaryButton>
    </OnboardingPage>
  );
}

function Page5({ navigation }) {
  return (
    <OnboardingPage>
      <Title>Set Final Thing Up</Title>
      <Fill>
        <TextBody>You need to set a final thing up.</TextBody>
        <TextBody>Never Gonna Let You Down.</TextBody>
      </Fill>
      <PrimaryButton onPress={() => navigateAndClear(navigation, "Finished")}>Next</PrimaryButton>
    </OnboardingPage>
  );
}

function Finished({ navigation }) {
  return (
    <OnboardingPage>
      <Title>All Done</Title>
      <Fill>
        <TextBody>You are now all set up.</TextBody>
        <TextBody>You can modify your preferences on the preference page.</TextBody>
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
    marginHorizontal: 30
  },
  title: {
    marginTop: 10,
    marginBottom: 20,
    fontSize: 40,
    fontWeight: "700",
    lineHeight: 48,
    textAlign: "center"
  },
  fill: {
    flexGrow: 1
  },
  body: {
    marginTop: 10,
    textAlign: "center"
  },
  primaryButton: {
    marginVertical: 5,
    padding: 15,
    borderRadius: 15
  },
  primaryButtonText: {
    fontSize: 17,
    fontWeight: 600
  },
  secondaryButton: {
    flexGrow: 1,
    marginVertical: 20
  },
  secondaryButtonText: {
    fontSize: 18,
    textAlign: "center"
  }
});

export default GettingStartedModal;