import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
  StatusBar,
  FlatList,
  Modal,
  ActivityIndicator,
  TouchableWithoutFeedback,
} from 'react-native';
import styles from './styles';
import {CustomColors} from '../../utils/CustomColors';
import axios from 'axios';
let pageCount = 1;
const LandingScreen = () => {
  const [rickMortyApiData, setRickMortyApiData] = useState(null);

  const [modalVisibility, setModalVisibility] = useState(false);
  const [originData, setOriginData] = useState(null);
  const [originDataLoading, setOriginDataLoading] = useState(false);
  const [locationData, setLocationData] = useState(null);
  const [locationDataLoading, setLocationDataLoading] = useState(false);

  const [modalVisibilityEpisodes, setModalVisibilityEpisodes] = useState(false);
  const [episodesData, setEpisodesData] = useState(false);
  const [episodesDataLoading, setEpisodesDataLoading] = useState(false);

  const _handleEpisodeApi = item => {
    setEpisodesDataLoading(true);
    axios
      .get(item)
      .then(response => {
        setEpisodesDataLoading(false);
        if (response?.data != null) {
          alert(response?.data?.name);
        } else {
          setEpisodesDataLoading(false);
          alert(response?.status + JSON.stringify(response?.data));
        }
      })
      .catch(error => {
        setEpisodesDataLoading(false);
        alert(error?.message != null ? error.message : 'Something went wrong');
      });
  };

  const _handleCharacterApi = () => {
    axios
      .get('https://rickandmortyapi.com/api/character?page=' + pageCount)
      .then(response => {
        if (
          response?.data?.results != null &&
          response?.data?.results.length > 0
        ) {
          if (rickMortyApiData != null && rickMortyApiData.length > 0) {
            let newList = [...rickMortyApiData, ...response?.data?.results];
            setRickMortyApiData(newList);
          } else {
            setRickMortyApiData(response?.data?.results);
          }
        } else {
          alert(response?.status + JSON.stringify(response?.data));
        }
      })
      .catch(error => {
        alert(error?.message != null ? error.message : 'Something went wrong');
      });
  };
  useEffect(() => {
    _handleCharacterApi();
  }, []);

  const _handleModalData = item => {
    setModalVisibility(true);
    // ORIGN DATA
    if (
      item?.origin?.url == null ||
      item?.origin?.url == undefined ||
      item?.origin?.url == ''
    ) {
      setOriginData('na');
      console.log(originData);
    } else {
      setOriginDataLoading(true);
      axios
        .get(item?.origin?.url)
        .then(response => {
          if (response?.data != null) {
            setOriginDataLoading(false);
            setOriginData(response?.data);
          }
        })
        .catch(error => {
          setOriginDataLoading(false);
          alert(
            error?.message != null ? error.message : 'Something went wrong',
          );
        });
    }
    // LOCATION DATA
    if (
      item?.location?.url == null ||
      item?.location?.url == undefined ||
      item?.location?.url == ''
    ) {
      setLocationData('na');
    } else {
      setLocationDataLoading(true);
      axios
        .get(item?.location?.url)
        .then(response => {
          if (response?.data != null) {
            setLocationDataLoading(false);
            setLocationData(response?.data);
          }
        })
        .catch(error => {
          setLocationDataLoading(false);
          alert(
            error?.message != null ? error.message : 'Something went wrong',
          );
        });
    }
  };
  const _handleModalDataEpisodes = item => {
    setModalVisibilityEpisodes(true);
    setEpisodesData(item?.episode);
  };
  const _handleOriginViewMore = url => {
    if (url == null || url == undefined || url == '') {
      return;
    }
    axios
      .get(url)
      .then(response => {
        // if (response?.data != null) {
        return (
          <Text style={{height: 80, backgroundColor: 'red', width: 50}}></Text>
        );
      })
      .catch(error => {
        alert(error?.message != null ? error.message : 'Something went wrong');
      });
  };
  const _renderFlatListItem = ({index, item}) => (
    <View style={styles.charaterFlatlistParentViewStyle}>
      <View style={{flexDirection: 'row'}}>
        <Image
          style={{flex: 0.3, borderRadius: 14}}
          source={{uri: item?.image}}
        />
        <View style={styles.charaterFlatlistChildViewStyle}>
          <Text>Name : {item?.name != null ? item?.name : '--'}</Text>
          <Text>Status : {item?.status != null ? item?.status : '--'}</Text>
          <Text>Species : {item?.species != null ? item?.species : '--'}</Text>
          <Text>Gender : {item?.gender != null ? item?.gender : '--'}</Text>
        </View>
      </View>
      <View style={{alignItems: 'center', width: '100%'}}>
        <Text style={{fontWeight: '700', fontSize: 20}}>ORIGIN</Text>
        <Text>{item?.origin?.name}</Text>
      </View>
      <TouchableOpacity
        onPress={() => _handleModalData(item)}
        style={styles.customButtonStyle}>
        <Text style={{fontSize: 16, fontWeight: '600', color: 'white'}}>
          View More
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => _handleModalDataEpisodes(item)}
        style={styles.customButtonStyle}>
        <Text style={{fontSize: 16, fontWeight: '600', color: 'white'}}>
          View Episodes
        </Text>
      </TouchableOpacity>
    </View>
  );

  const _rednderEpisodeItem = ({item, index}) => {
    return (
      <View style={styles.flatListItemEpisodesStye}>
        <Text>Episode : {item}</Text>
        <TouchableOpacity onPress={() => _handleEpisodeApi(item)}>
          <Text style={{color: 'blue'}}>Get data</Text>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <SafeAreaView>
      <StatusBar
        backgroundColor={CustomColors.colors.mildBlue}
        barStyle={'light-content'}
      />
      <View style={styles.parentViewStyle}>
        <FlatList
          style={{width: '100%', height: '100%'}}
          data={rickMortyApiData}
          keyExtractor={item => item.id}
          renderItem={_renderFlatListItem}
          onEndReached={() => {
            pageCount = pageCount + 1;
            _handleCharacterApi();
          }}
          ListFooterComponent={() => (
            <Text
              style={{
                color: TouchableWithoutFeedback,
                alignSelf: 'center',
                alignSelf: 'center',
              }}>
              Loadinf another page
            </Text>
          )}
        />
      </View>
      <Modal visible={modalVisibility} transparent={true} animationType="fade">
        <View style={styles.modalParentStyle}>
          <TouchableOpacity
            onPress={() => {
              setModalVisibility(false);
            }}>
            <Text style={styles.closeTextStyle}>Close</Text>
          </TouchableOpacity>
          <View style={styles.modalChildStyle}>
            <View style={{alignItems: 'flex-start', width: '100%'}}>
              <Text
                style={{alignSelf: 'center', fontSize: 20, fontWeight: '700'}}>
                ORIGIN
              </Text>
              {originDataLoading && (
                <ActivityIndicator
                  color={CustomColors.colors.mildBlue}
                  size={20}
                />
              )}
              {originData != null &&
                originData != 'na' &&
                originDataLoading == false && (
                  <View>
                    <Text>Name : {originData?.name}</Text>
                    <Text>Type : {originData?.type}</Text>
                    <Text>Dimension : {originData?.dimension}</Text>
                  </View>
                )}
              {originDataLoading == false && originData == 'na' && (
                <Text style={{color: 'red'}}>No data found</Text>
              )}
            </View>
            <View style={{alignItems: 'flex-start', width: '100%'}}>
              <Text
                style={{alignSelf: 'center', fontSize: 20, fontWeight: '700'}}>
                LOCATION
              </Text>
              {locationDataLoading && (
                <ActivityIndicator
                  color={CustomColors.colors.mildBlue}
                  size={20}
                />
              )}
              {locationData != null &&
                locationData != 'na' &&
                locationDataLoading == false && (
                  <View>
                    <Text>Name : {locationData?.name}</Text>
                    <Text>Type : {locationData?.type}</Text>
                    <Text>Dimension : {locationData?.dimension}</Text>
                  </View>
                )}
              {locationDataLoading == false && locationData == 'na' && (
                <Text style={{color: 'red'}}>No data found</Text>
              )}
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        visible={modalVisibilityEpisodes}
        transparent={true}
        animationType="fade">
        <View
          style={{
            height: '100%',
            width: '100%',
            backgroundColor: 'rgba(0,0,0,0.5)',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            onPress={() => {
              setModalVisibilityEpisodes(false);
            }}>
            <Text style={{color: 'white'}}>Close</Text>
          </TouchableOpacity>
          <View
            style={{
              width: '90%',
              height: 250,
              backgroundColor: 'white',
              borderRadius: 8,
              padding: 12,
              borderColor: 'red',
              borderWidth: 2,
              alignItems: 'center',
            }}>
            {episodesDataLoading == true ? (
              <ActivityIndicator color={'red'} size={'small'} />
            ) : (
              <FlatList
                data={episodesData}
                keyExtractor={item => item}
                renderItem={_rednderEpisodeItem}
              />
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};
export default LandingScreen;
