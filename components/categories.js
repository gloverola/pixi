// @ts-nocheck
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { data } from '../constants/data'
import { theme } from '../constants/theme'
import { hp, wp } from '../helpers/common'
import Animated, { FadeInRight } from 'react-native-reanimated'

const Categories = ({activeCategory, handleChangeCategory}) => {
  return (
    <FlatList horizontal contentContainerStyle={styles.flatlistContainer} showsHorizontalScrollIndicator={false} data={data.categories} keyExtractor={item => item} renderItem={
      ({ item, index }) => (
        <CategoryItem title={item} index={index} isActive={activeCategory === item} handleChangeCategory={handleChangeCategory} />
    )} />
  )
}

const CategoryItem = ({ title, index, isActive, handleChangeCategory }) => {
  let color = isActive ? theme.colors.black : theme.colors.white
  let backgroundColor = isActive ? theme.colors.white : theme.colors.layer
  return (
    <Animated.View entering={FadeInRight.delay(index*200).duration(1000).springify().damping(14)}>
      <Pressable style={[styles.category, {backgroundColor}]} onPress={() => handleChangeCategory(isActive ? null : title)}>
        <Text style={[styles.title, {color}]}>{title}</Text>
      </Pressable>
    </Animated.View>
  )

}

export default Categories

const styles = StyleSheet.create({
  flatlistContainer: {
    paddingHorizontal: wp(4),
    gap: 8
  },
  category: {
    backgroundColor: theme.colors.layer,
    padding: 12,
    paddingHorizontal: 15,
    borderRadius: theme.radius.sm,
    borderCurve: "continuous",
  },
  title: {
    color: theme.colors.text2,
    textTransform: 'capitalize',
    fontSize: hp(1.8),
    fontWeight: theme.fontWeights.medium
  }
})