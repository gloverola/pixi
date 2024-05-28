// @ts-nocheck
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { MasonryFlashList } from "@shopify/flash-list";
import ImageCard from './imageCard';
import { getColumnCount, wp } from '../helpers/common';

const ImageGrid = ({ images }) => {
  const columns = getColumnCount()
  return (
    <View style={styles.container}>
      <MasonryFlashList
      data={images}
      numColumns={columns}
      renderItem={({ item, index }) => <ImageCard item={item} index={index} columns={columns} />}
        estimatedItemSize={200}
        initialNumToRender={1000}
        contentContainerStyle={styles.listContainerStyle}
    />
    </View>
  )
}

export default ImageGrid

const styles = StyleSheet.create({
  container: {
    minHeight: 3,
    width: wp(100)
  },
  listContainerStyle: {
    paddingHorizontal: wp(4)
  }
})