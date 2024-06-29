import React from 'react';
import { View,Text, Image, TouchableOpacity, Linking, ImageBackground} from 'react-native';
import styles from '../styles/Perfil';
import perfil from '../assets/perfil.jpg';
import git from '../assets/icongit.png';
import link from '../assets/iconlink.png';
import disc from '../assets/icondisc.png';
import image1 from '../assets/image1.jpg';
import image2 from "../assets/image2.jpg";

export default function Perfil(){
  return (
    <ImageBackground source={image1} style={styles.container}>
      <View style={styles.card}>
        <View style={styles.containerImage}>
          <Image
            style={styles.profileImage}
            source={perfil}
          />
        </View>
        <Text style={styles.nome} >André Fernandes Nascimento Moreira</Text>
        <Text style={styles.description}>
          Apaixonado por codificar desde cedo, André já domina tanto o front-end quanto o back-end, construindo aplicações web completas e robustas. Mas sua fome por conhecimento não se limita ao mundo digital: ele também é um entusiasta de inteligência artificial, explorando as infinitas possibilidades de machine learning e deep learning.
        </Text>
        <View style={styles.socialMediaContainer}>
          <TouchableOpacity onPress={() => Linking.openURL("https://github.com/AndreMoreira00")}>
            <Image
              style={styles.socialMediaIcon}
              source={git}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL("https://www.linkedin.com/in/andrémoreira00/")}>
            <Image
              style={styles.socialMediaIcon}
              source={link}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL("https://discord.com/channels/1117960978559156268/1117960979171520586")}>
            <Image
              style={styles.socialMediaIcon}
              source={disc}
            />
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  )
}