import React, {useEffect, useState} from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  useWindowDimensions,
} from 'react-native';

import LoadingIndicator from '../components/Loader';
import {Colors} from '../constants/Colors';
import {APICall} from '../utils/APICall';
import AntDesign from 'react-native-vector-icons/AntDesign';

const ProductDetails = ({navigation, route}: any) => {
  const id = route.params.id;

  const {width} = useWindowDimensions();
  const [product, setProduct] = useState<IProduct>({
    id: 0,
    title: 'string',
    description: '',
    price: 0,
    discountPercentage: 0,
    rating: 0,
    stock: 0,
    brand: '',
    category: '',
    thumbnail: '',
    images: [],
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    setLoading(true);
    try {
      let res = await APICall({url: `/products/${id}`});
      if (res) {
        setProduct(res);
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };
  return (
    <View style={styles.Main_Body}>
      <Pressable style={styles.back} onPress={() => navigation.goBack()}>
        <AntDesign name="arrowleft" size={30} />
      </Pressable>
      <View style={{flex: 1.5}}>
        <ScrollView
          horizontal={true}
          disableIntervalMomentum={true}
          snapToInterval={width}
          showsHorizontalScrollIndicator={false}>
          {product.images.map(i => {
            return (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={{
                    uri: i,
                  }}
                  style={{...styles.Image_Style, width: width}}
                />
              </View>
            );
          })}
        </ScrollView>
      </View>

      <View style={{flex: 1}}>
        <ScrollView>
          <View style={styles.detailsContainer}>
            <Text style={styles.title}>{product.title}</Text>
            <Text style={styles.text}>{product.description}</Text>
            <View style={{flexDirection: 'row', gap: 5}}>
              <Text style={styles.price}>${product.price}</Text>
              <Text style={styles.discount}>
                {product.discountPercentage}% off
              </Text>
            </View>
            <Text style={styles.text}>Rating: {product.rating}</Text>
            <Text style={styles.text}>In Stock: {product.stock}</Text>
            <Text style={styles.text}>Brand: {product.brand}</Text>
            <Text style={styles.text}>Category: {product.category}</Text>
          </View>
        </ScrollView>
      </View>
      <LoadingIndicator loading={loading} />
    </View>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  back: {position: 'absolute', left: 5, zIndex: 1},
  Main_Body: {
    flex: 1,
    backgroundColor: Colors.primary,
  },

  descn: {fontSize: 16},

  Image_Style: {
    height: 300,
    resizeMode: 'contain',
  },

  container: {
    flex: 1,
  },
  thumbnail: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  detailsContainer: {
    flex: 1,
    padding: 16,
    gap: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },

  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.price,
  },
  discount: {
    fontSize: 12,
    color: Colors.discount,
  },
  text: {
    fontSize: 16,
  },

  imageContainer: {
    marginTop: 16,
    paddingHorizontal: 16,
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 8,
    resizeMode: 'cover',
  },
});
