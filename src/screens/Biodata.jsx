import {Dimensions} from 'react-native';
import React from 'react';
import {WizardContext} from '../context/WizardContext';
import {
  Box,
  Button,
  ChevronDownIcon,
  Input,
  Pressable,
  ScrollView,
  Text,
  TextArea,
  useDisclose,
} from 'native-base';
import Header from '../components/Header';
import {globalStyle} from '../globalStyle/globalStyle';
import Sheet from '../components/Sheet';
const {width, height} = Dimensions.get('window');

const Biodata = ({navigation}) => {
  const {isOpen, onOpen, onClose} = useDisclose();
  const wizardContext = React.useContext(WizardContext);
  const {state, dispatch} = wizardContext;
  const [data, setData] = React.useState({
    firstName: '',
    lastName: '',
    biodata: '',
  });
  const [address, setAddress] = React.useState({
    provinsi: {},
    kota_kabupaten: {},
    kecamatan: {},
    kelurahan: {},
  });
  const [url, setUrl] = React.useState('');

  const onChangeText = (key, value) => {
    setData({...data, [key]: value});
  };

  const onClickSheet = param => {
    if (param === 'provinsi') {
      setUrl('provinsi');
    } else if (param === 'kota') {
      if (!address.provinsi.id) {
        return;
      }
      setUrl('kota?id_provinsi=' + address.provinsi.id);
    } else if (param === 'kecamatan') {
      if (!address.kota_kabupaten.id) {
        return;
      }
      setUrl('kecamatan?id_kota=' + address.kota_kabupaten.id);
    } else if (param === 'kelurahan') {
      if (!address.kecamatan.id) {
        return;
      }
      setUrl('kelurahan?id_kecamatan=' + address.kecamatan.id);
    }

    onOpen();
  };

  const onChangeSheet = value => {
    // console.log(value, url);

    const urlParam = url.split('?')[0];

    if (urlParam === 'provinsi') {
      setAddress({
        provinsi: value,
        kota_kabupaten: {},
        kecamatan: {},
        kelurahan: {},
      });
    } else if (urlParam === 'kota') {
      setAddress({...address, kota_kabupaten: value});
    } else if (urlParam === 'kecamatan') {
      setAddress({...address, kecamatan: value});
    } else if (urlParam === 'kelurahan') {
      setAddress({...address, kelurahan: value});
    }
  };

  const onPressNext = () => {
    let objectAddress = {};
    Object.keys(address).map(key => {
      objectAddress[key] = address[key].nama;
    });

    dispatch({
      type: 'SET_DATA',
      payload: {
        ...data,
        ...objectAddress,
      },
    });
    navigation.navigate('Upload');
  };

  return (
    <Box flex={1}>
      <Header title={'Biodata'} />

      <ScrollView {...globalStyle.container}>
        <Box {...globalStyle.inputContainer}>
          <Text {...globalStyle.label}>First Name</Text>
          <Input
            {...globalStyle.input}
            value={data.firstName}
            onChangeText={value => onChangeText('firstName', value)}
          />
        </Box>
        <Box {...globalStyle.inputContainer}>
          <Text {...globalStyle.label}>Last Name</Text>
          <Input
            {...globalStyle.input}
            value={data.lastName}
            onChangeText={value => onChangeText('lastName', value)}
          />
        </Box>
        <Box {...globalStyle.inputContainer}>
          <Text {...globalStyle.label}>Biodata</Text>
          <TextArea
            {...globalStyle.input}
            value={data.biodata}
            onChangeText={value => onChangeText('biodata', value)}
          />
        </Box>
        <Box {...globalStyle.inputContainer}>
          <Text {...globalStyle.label}>Provinsi</Text>
          <Pressable onPress={() => onClickSheet('provinsi')}>
            <Input
              {...globalStyle.input}
              editable={false}
              borderColor="black"
              value={address.provinsi.nama}
              rightElement={<ChevronDownIcon mr={2} color="black" />}
            />
          </Pressable>
        </Box>
        <Box {...globalStyle.inputContainer}>
          <Text {...globalStyle.label}>Kota</Text>
          <Pressable onPress={() => onClickSheet('kota')}>
            <Input
              {...globalStyle.input}
              editable={false}
              borderColor="black"
              value={address.kota_kabupaten?.nama}
              rightElement={<ChevronDownIcon mr={2} color="black" />}
            />
          </Pressable>
        </Box>
        <Box {...globalStyle.inputContainer}>
          <Text {...globalStyle.label}>Kecamatan</Text>
          <Pressable onPress={() => onClickSheet('kecamatan')}>
            <Input
              {...globalStyle.input}
              editable={false}
              borderColor="black"
              value={address.kecamatan?.nama}
              rightElement={<ChevronDownIcon mr={2} color="black" />}
            />
          </Pressable>
        </Box>
        <Box {...globalStyle.inputContainer}>
          <Text {...globalStyle.label}>Kelurahan</Text>
          <Pressable onPress={() => onClickSheet('kelurahan')}>
            <Input
              {...globalStyle.input}
              editable={false}
              borderColor="black"
              value={address.kelurahan?.nama}
              rightElement={<ChevronDownIcon mr={2} color="black" />}
            />
          </Pressable>
        </Box>

        <Button
          _text={{fontSize: 16, fontWeight: 'bold'}}
          mt={4}
          onPress={onPressNext}>
          Selanjutnya
        </Button>
      </ScrollView>
      <Sheet
        isOpen={isOpen}
        onClose={onClose}
        url={url}
        onChangeSheet={onChangeSheet}
      />
    </Box>
  );
};

export default Biodata;
