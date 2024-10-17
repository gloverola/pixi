// @ts-nocheck
// 1:37:11 time
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather, FontAwesome6, Ionicons } from '@expo/vector-icons';
import { theme } from '../../constants/theme';
import { hp, wp } from '../../helpers/common';
import Categories from '../../components/categories';
import { apiCall } from '../../api';
import ImageGrid from '../../components/imageGrid';
import { debounce } from 'lodash';

var page = 1;

const HomeScreen = () => {
  const { top } = useSafeAreaInsets();
  const paddingTop = top > 0 ? top + 10 : 30;
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState(null);
  const [images, setImages] = useState([]);
  const searchInputRef = useRef(null);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async (
    params = { page: 1 },
    append = false
  ) => {
    let res = await apiCall(params);
    if (res.success && res?.data?.hits) {
      if (append) setImages([images, ...res?.data?.hits]);
      else setImages([...res?.data?.hits]);
    }
  };

  const handleChangeCategory = (cat) => {
    setActiveCategory(cat);
  };

  const handleSearch = (text) => {
    setSearch(text);
    if (text.length > 2) {
      page = 1;
      setImages([]);
      fetchImages({ page, q: text });
    }

    if (text == '') {
      page = 1;
      searchInputRef?.current?.clear();
      setImages([]);
      fetchImages({ page });
    }
  };

  const handleTextDebounce = useCallback(
    debounce(handleSearch, 400),
    []
  );

  const clearSearch = () => {
    setSearch('');
    searchInputRef?.current?.clear();
  };

  return (
    <View style={[styles.container, { paddingTop }]}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable>
          <Text style={styles.title}>Pixi</Text>
        </Pressable>
        <Pressable>
          <FontAwesome6
            name="bars-staggered"
            size={22}
            color={theme.colors.text1}
          />
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={{ gap: 15 }}>
        {/* Search bar */}
        <View style={styles.searchBar}>
          <View style={styles.searchIcon}>
            <Feather
              name="search"
              size={24}
              color={theme.colors.text2}
            />
          </View>
          <TextInput
            placeholder="Search for pixels..."
            style={styles.searchInput}
            placeholderTextColor={theme.colors.grayBG}
            // value={search}
            onChangeText={handleTextDebounce}
            ref={searchInputRef}
          />
          {search && (
            <Pressable
              style={styles.closeIcon}
              onPress={() => handleSearch('')}
            >
              <Ionicons
                name="close"
                size={24}
                color={theme.colors.text2}
              />
            </Pressable>
          )}
        </View>

        {/* Categories */}
        <View style={styles.categories}>
          <Categories
            activeCategory={activeCategory}
            handleChangeCategory={handleChangeCategory}
          />
        </View>

        {/* Masonry Grid Images */}
        <View>
          {images.length > 0 && <ImageGrid images={images} />}
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 15,
    backgroundColor: theme.colors.bg,
  },
  header: {
    marginHorizontal: wp(4),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: hp(4),
    fontWeight: theme.fontWeights.semibold,
    color: theme.colors.text1,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: wp(4),
    backgroundColor: theme.colors.layer,
    padding: 6,
    paddingLeft: 10,
    borderRadius: theme.radius.xs,
  },
  searchIcon: {
    padding: 8,
  },
  searchInput: {
    flex: 1,
    color: theme.colors.text1,
    fontSize: hp(1.8),
    borderRadius: theme.radius.sm,
    paddingVertical: 10,
    placeholderTextColor: theme.colors.text2,
  },
  closeIcon: {
    padding: 8,
    backgroundColor: theme.colors.bg,
    borderRadius: theme.radius.sm,
  },
});
