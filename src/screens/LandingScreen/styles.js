import {StyleSheet} from 'react-native';
import {CustomColors} from '../../utils/CustomColors';
export default styles = StyleSheet.create({
  parentViewStyle: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    backgroundColor: CustomColors.colors.mildBlue,
  },
  charaterFlatlistParentViewStyle: {
    width: '90%',
    backgroundColor: 'white',
    alignSelf: 'center',
    margin: 8,
    elevation: 4,
    borderRadius: 8,
    padding: 8,
  },
  charaterFlatlistChildViewStyle: {
    flex: 0.7,
    alignItems: 'flex-start',
    padding: 6,
  },
  customButtonStyle: {
    backgroundColor: CustomColors.colors.mildBlue,
    borderRadius: 14,
    width: 100,
    padding: 6,
    elevation: 4,
    alignItems: 'center',
    alignSelf: 'center',
    margin: 4,
  },
  flatListItemEpisodesStye: {
    width: '100%',
    alignItems: 'center',
    padding: 8,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
  },
  modalParentStyle: {
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeTextStyle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  modalChildStyle: {
    width: '90%',
    height: 250,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    borderColor: 'red',
    borderWidth: 2,
    alignItems: 'center',
  },
});
