import React from 'react';
import { View,Text, Image, TouchableOpacity, Linking } from 'react-native';
import styles from '../styles/Perfil';
import perfil from '../assets/perfil.jpg';
import git from '../assets/icongit.png';
import link from '../assets/iconlink.png';
import disc from '../assets/icondisc.png';

export default function Perfil(){
  return (
    <View style={styles.container}>
      <View style={styles.containerImage}>
        <Image
          style={styles.profileImage}
          source={perfil}
        />
      </View>
      <Text style={styles.description}>
        descrição do perfil
      </Text>
      <View style={styles.socialMediaContainer}>
        <TouchableOpacity onPress={() => Linking.openURL()}>
          <Image
            style={styles.socialMediaIcon}
            source={git}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL()}>
          <Image
            style={styles.socialMediaIcon}
            source={link}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL()}>
          <Image
            style={styles.socialMediaIcon}
            source={disc}
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}