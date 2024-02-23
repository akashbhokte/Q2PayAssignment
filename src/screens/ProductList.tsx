import * as React from 'react';
import {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Searchbar} from 'react-native-paper';
import {Card} from 'react-native-shadow-cards';
import Loader from '../components/Loader';
import {Colors} from '../constants/Colors';
import {APICall} from '../utils/APICall';

const ProductList = ({navigation}: any) => {
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setLoading(true);
    try {
      let res = await APICall({url: '/products'});
      if (res.products) {
        setFilteredDataSource(res.products);
        setMasterDataSource(res.products);
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }

    // console.log('RES--', res);
    // fetch('https://dummyjson.com/products')
    //   .then(response => response.json())
    //   .then(responseJson => {
    //     setFilteredDataSource(responseJson.products);
    //     setMasterDataSource(responseJson.products);
    //     setLoading(false);
    //   })
    //   .catch(error => {
    //     console.error(error);
    //     setLoading(false);
    //   });
  };

  const searchFilterFunction = (text: string) => {
    if (text) {
      const newData = masterDataSource.filter(function (item: IProduct) {
        const itemData = item.title
          ? item.title.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  const ItemView = ({item}: {item: IProduct}) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('Product Details', {id: item?.id})}>
        <Card
          style={{
            padding: 10,
            margin: 10,
            borderBottomWidth: 3,
            borderBottomColor: Colors.secondary,
          }}>
          <View style={styles.Card_Container}>
            <View style={styles.Container_Item_Image}>
              <Image
                source={{
                  uri: item?.thumbnail,
                }}
                style={styles.Image_Style}
              />
            </View>
            <View style={styles.Container_Item_Desc}>
              <Text style={styles.Text_Style_Title}>{item?.title} </Text>
              <Text style={styles.Text_Style_P}>{item?.description} </Text>
              <Text style={styles.Text_Style_Price}>${item?.price} </Text>
            </View>
          </View>
        </Card>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.Main_Body}>
      <View style={styles.SearchBar_Style}>
        <Searchbar
          placeholder="Search"
          onChangeText={text => searchFilterFunction(text)}
          value={search}
        />
      </View>

      <View style={styles.Body_View}>
        <FlatList
          data={filteredDataSource}
          keyExtractor={(item, index) => index.toString()}
          renderItem={ItemView}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={getData} />
          }
        />
      </View>
      <Loader loading={loading} />
    </View>
  );
};

export default ProductList;

const styles = StyleSheet.create({
  Main_Body: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  SearchBar_Style: {
    margin: 10,
    marginBottom: 0,
  },
  Body_View: {
    flex: 1,
    backgroundColor: Colors.primary,
    alignItems: 'center',
  },

  Card_Container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: Colors.primary,
  },
  Container_Item_Image: {
    flex: 0.7,
    justifyContent: 'center',
  },
  Container_Item_Desc: {
    padding: 10,
    flex: 1,
  },
  Text_Style_Title: {
    borderBottomWidth: 0.3,
    fontSize: 20,
    justifyContent: 'center',
    color: Colors.textPrimary,
    fontFamily: 'monospace',
  },
  Text_Style_P: {
    padding: 3,
    fontSize: 10,
    color: Colors.textPrimary,
    fontFamily: 'monospace',
  },
  Text_Style_Price: {
    padding: 3,
    fontSize: 16,
    color: Colors.textPrimary,
    fontFamily: 'monospace',
  },
  Image_Style: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});
