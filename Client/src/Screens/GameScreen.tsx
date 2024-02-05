import React from "react";
import { Text, View, StyleSheet, Image, SafeAreaView } from "react-native";
import Pet from "../../assets/Pet.png";
import Fire from "../../assets/fire.jpg";
import LightNight from "../../assets/lightnight.jpg";
import Shield from "../../assets/shield.jpg";
import Sword from "../../assets/sword.jpg";
import YinYan from "../../assets/batquai.jpg";
import { COLOR } from "../utils/color";
import NormalButton from "../components/Button/NormalButton";
import useCustomNavigation from "../hooks/useCustomNavigation";

const SIZE_TABLE = 280;

const TABLE = [
  [0, 1, 2, 3, 4, 5, 6, 7],
  [0, 1, 2, 3, 4, 5, 6, 7],
  [0, 1, 2, 3, 4, 5, 6, 7],
  [0, 1, 2, 3, 4, 5, 6, 7],
  [0, 1, 2, 3, 4, 5, 6, 7],
  [0, 1, 2, 3, 4, 5, 6, 7],
  [0, 1, 2, 3, 4, 5, 6, 7],
  [0, 1, 2, 3, 4, 5, 6, 7],
];

const randomNumber = () => {
  return Math.floor(Math.random() * 4);
};

export default function GameScreen() {
  const navigate = useCustomNavigation();
  return (
    <SafeAreaView>
      <View style={styles.container}>
        {/* Character area */}
        <NormalButton
          onPress={() => {
            navigate.navigate("MainTab");
          }}
        >
          <Text>{"< back"}</Text>
        </NormalButton>
        <View style={styles.characterArea}>
          {/* Player 1 - Left*/}
          <View style={styles.player}>
            <View style={styles.playerHeader}>
              {/* Thay anh sau */}
              <Image style={styles.avatarImage} source={Pet}></Image>
              <View style={styles.bar}>
                <View style={styles.energyBar}></View>
                <View style={styles.damageBar}></View>
              </View>
            </View>
            <Image style={styles.petImage} source={Pet} />
          </View>
          {/* Player 2 - Right */}
          <View style={styles.player}>
            <View style={styles.playerHeader}>
              {/* Thay anh sau */}
              <View style={styles.bar}>
                <View style={styles.energyBar}></View>
                <View style={styles.damageBar}></View>
              </View>
              <Image style={styles.avatarImage} source={Pet}></Image>
            </View>
            <Image style={styles.petImage} source={Pet} />
          </View>
        </View>
        {/* Board */}
        <View style={styles.boardContainer}>
          {TABLE.map((row, indexRow) => (
            <View key={indexRow} style={styles.row}>
              {row.map((cell, index) => {
                let randomItem = randomNumber();
                if (randomItem === 0)
                  return (
                    <View
                      key={index}
                      style={{ ...styles.cell, backgroundColor: COLOR.RED }}
                    >
                      <Image style={styles.imageInCell} source={Fire}></Image>
                    </View>
                  );
                if (randomItem === 1)
                  return (
                    <View
                      key={index}
                      style={{ ...styles.cell, backgroundColor: COLOR.BLUE }}
                    >
                      <Image
                        style={styles.imageInCell}
                        source={LightNight}
                      ></Image>
                    </View>
                  );
                if (randomItem === 2)
                  return (
                    <View
                      key={index}
                      style={{
                        ...styles.cell,
                        backgroundColor: COLOR.LIGHT_PURPLE,
                      }}
                    >
                      <Image style={styles.imageInCell} source={Shield}></Image>
                    </View>
                  );
                if (randomItem === 3)
                  return (
                    <View
                      key={index}
                      style={{ ...styles.cell, backgroundColor: COLOR.YELLOW }}
                    >
                      <Image style={styles.imageInCell} source={Sword}></Image>
                    </View>
                  );
                if (randomItem === 4)
                  return (
                    <View
                      key={index}
                      style={{ ...styles.cell, backgroundColor: COLOR.GRAY }}
                    >
                      <Image style={styles.imageInCell} source={YinYan}></Image>
                    </View>
                  );
              })}
            </View>
          ))}
        </View>
        {/* Bottom nav */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.PURPLE,
    width: "100%",
    height: "100%",
    display: "flex",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  characterArea: {
    height: 200,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  player: {
    width: "50%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
  },
  petImage: {
    width: 100,
    height: 100,
  },
  avatarImage: {
    width: 50,
    height: 50,
    borderRadius: 100,
  },
  energyBar: {
    width: 80,
    height: 20,
    backgroundColor: "#FF8C05",
    borderTopRightRadius: 4,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 10,
    marginBottom: 5,
  },
  damageBar: {
    width: 80,
    height: 20,
    backgroundColor: "#70A2FF",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 4,
  },
  bar: {
    height: "auto",
    width: "auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    marginHorizontal: 10,
  },
  playerHeader: {
    height: "auto",
    width: "auto",
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
  },
  boardContainer: {
    height: "auto",
    width: "auto",

    alignContent: "center",
  },
  row: {
    height: "auto",
    width: "auto",
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-around",
  },
  cell: {
    height: SIZE_TABLE / 8,
    width: SIZE_TABLE / 8,
    margin: 3,
    borderRadius: 5,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  imageInCell: {
    width: "80%",
    height: "80%",
  },
});
