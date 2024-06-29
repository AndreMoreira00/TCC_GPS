import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  containerImage: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  profileImage: {
    width: 170,
    height: 170,
    borderRadius: 120,
    borderWidth: 5,
    borderStyle: "solid",
    borderColor: "#5252DF",
    position: "absolute",
    top: -180
  },
  description: {
    fontSize: 16,
    color:"#fff",
    textAlign: 'justify',
    marginBottom: 30,
    paddingHorizontal: 10,
    fontWeight: "600",
  },
  socialMediaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  socialMediaIcon: {
    width: 50,
    height: 50,
    marginBottom: 15
  },
  nome: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign:"center",
    marginBottom: 15,
  },
  card: {
    backgroundColor: "#373B35",
    padding: 15,
    borderRadius:15,
    paddingTop: 100,
    borderWidth: 4,
    borderStyle: "solid",
    borderColor: "#5252DF",
  }
})