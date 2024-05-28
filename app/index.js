// @ts-nocheck
import { View, Text, StyleSheet, Image, Pressable } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { hp, wp } from '../helpers/common'
import { LinearGradient } from 'expo-linear-gradient'
import Animated, { FadeInDown } from 'react-native-reanimated'
import { theme } from '../constants/theme'
import { useRouter } from 'expo-router'

const WelcomeScreen = () => {
  const router = useRouter()
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Image source={require('../assets/images/welcome.jpg')} style={styles.bgImage} resizeMode='cover' />

      {/* Linear gradient */}
      <Animated.View entering={FadeInDown.duration(600)} style={{flex:1}}>
        <LinearGradient colors={['rgba(0,0,0,0.01)', 'rgba(0,0,0,0.2)', '#000', '#000']} style={styles.gradient} start={{ x: 0.5, y: 0 }} end={{ x: 0.5, y: 0.8 }} />

        {/* Content */}
        <View style={styles.contentContainer}>
          <Animated.Text entering={FadeInDown.delay(400).springify()} style={styles.title}>
            Pixi
          </Animated.Text>
          <Animated.Text entering={FadeInDown.delay(500).springify()} style={styles.punchline}>
            Perfect Pixels
          </Animated.Text>
          <Animated.View entering={FadeInDown.delay(600).springify()}>
            <Pressable style={styles.startButton} onPress={() => router.push('home')}>
              <Text style={styles.startText}>
                Get Started
              </Text>
            </Pressable>
          </Animated.View>
        </View>
      </Animated.View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgImage: {
    width: wp(100),
    height: hp(100),
    position: 'absolute',
  },
  gradient: {
    width: wp(100),
    height: hp(65),
    bottom: 0,
    position: 'absolute',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 14
  },
  title: {
    fontSize: hp(7),
    color: theme.colors.text1,
    fontWeight: theme.fontWeights.bold,
  },
  punchline: {
    fontSize: hp(2.5),
    color: theme.colors.text2,
    fontWeight: theme.fontWeights.medium,
    letterSpacing: 1,
    marginBottom: 10
  },
  startButton: {
    marginBottom: 50,
    backgroundColor: theme.colors.primary,
    paddingVertical: 18,
    paddingHorizontal: 90,
    borderRadius: theme.radius.lg,
    borderCurve: "continuous"
  },
  startText: {
    color: theme.colors.black,
    fontWeight: theme.fontWeights.medium,
    fontSize: hp(3),
    letterSpacing: 1
  }

})

export default WelcomeScreen


// "Transform Your Screen"
// "Wallpapers That Wow"
// "Elevate Your Display"
// "Daily Dose of Beauty"
// "Refresh Your View"
// "Your Screen, Your Style"
// "Art for Every Mood"
// "Inspire Your Day"
// "Vibrant Visuals"
// "Perfect Pixels"
