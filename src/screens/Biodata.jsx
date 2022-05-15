import {Dimensions} from 'react-native';
import React from 'react';
import {WizardContext} from '../context/WizardContext';
import {
  Alert,
  Box,
  Button,
  ChevronDownIcon,
  CloseIcon,
  HStack,
  IconButton,
  Input,
  Pressable,
  ScrollView,
  Text,
  TextArea,
  useDisclose,
  useToast,
  VStack,
} from 'native-base';
import Header from '../components/Header';
import {globalStyle} from '../globalStyle/globalStyle';
import Sheet from '../components/Sheet';
import {getData} from '../API/api';
const {width, height} = Dimensions.get('window');

const Alerts = () => {
  return (
    <Alert w="100%" status="error">
      <VStack space={2} flexShrink={1} w="100%">
        <HStack flexShrink={1} space={2} justifyContent="space-between">
          <HStack space={2} flexShrink={1}>
            <Alert.Icon mt="1" />
            <Text fontSize="md" color="coolGray.800">
              Harap isi semua form yang dibutuhkan
            </Text>
          </HStack>
        </HStack>
      </VStack>
    </Alert>
  );
};

const Biodata = ({navigation}) => {
  const toast = useToast();
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
  const [url, setUrl] = React.useState('provinsi');
  const [dataAddress, setDataAddress] = React.useState({});
  const [dataSheet, setDataSheet] = React.useState([]);

  console.log(address.provinsi, 'provinsi');
  console.log(dataAddress.kota_kabupaten, 'DATA ADDRESS');
  console.log(dataSheet, 'DATA SHEET');

  const onChangeText = (key, value) => {
    setData({...data, [key]: value});
  };

  const onClickSheet = param => {
    if (param === 'provinsi') {
      setUrl('provinsi');
      setDataSheet(dataAddress.provinsi);
    } else if (param === 'kota') {
      if (!address.provinsi.id) {
        return;
      }
      setDataSheet(dataAddress.kota_kabupaten);
      setUrl('kota?id_provinsi=' + address.provinsi.id);
    } else if (param === 'kecamatan') {
      if (!address.kota_kabupaten.id) {
        return;
      }
      setDataSheet(dataAddress.kecamatan);
      setUrl('kecamatan?id_kota=' + address.kota_kabupaten.id);
    } else if (param === 'kelurahan') {
      if (!address.kecamatan.id) {
        return;
      }
      setDataSheet(dataAddress.kelurahan);
      setUrl('kelurahan?id_kecamatan=' + address.kecamatan.id);
    }

    onOpen();
  };

  const onChangeSheet = value => {
    const urlParam = url.split('?')[0];

    if (urlParam === 'provinsi') {
      setAddress({
        provinsi: value,
        kota_kabupaten: {},
        kecamatan: {},
        kelurahan: {},
      });
      setDataAddress({
        ...dataAddress,
        kota_kabupaten: [],
        kecamatan: [],
        kelurahan: [],
      });
    } else if (urlParam === 'kota') {
      setAddress({
        ...address,
        kota_kabupaten: value,
        kecamatan: {},
        kelurahan: {},
      });
    } else if (urlParam === 'kecamatan') {
      setAddress({...address, kecamatan: value, kelurahan: {}});
    } else if (urlParam === 'kelurahan') {
      setAddress({...address, kelurahan: value});
    }
    setDataSheet([]);
  };

  const onPressNext = () => {
    let objectAddress = {};
    Object.keys(address).map(key => {
      objectAddress[key] = address[key].nama;
    });

    const newData = {
      ...data,
      ...objectAddress,
    };

    //check if there is any empty field
    const emptyField = Object.keys(newData).find(key => {
      return newData[key] === '' || newData[key] === undefined;
    });

    if (emptyField) {
      return toast.show({
        placement: 'top',
        render: () => <Alerts />,
      });
    }

    dispatch({
      type: 'SET_DATA',
      payload: newData,
    });
    navigation.navigate('Upload');
  };

  React.useEffect(() => {
    getData('provinsi').then(res => {
      setDataAddress({
        provinsi: res.provinsi,
        kota_kabupaten: [],
        kecamatan: [],
        kelurahan: [],
      });
    });
  }, []);

  React.useEffect(() => {
    getData('kota?id_provinsi=' + address.provinsi.id).then(res => {
      setDataAddress({
        ...dataAddress,
        kota_kabupaten: res.kota_kabupaten,
        kecamatan: [],
        kelurahan: [],
      });
    });
  }, [address.provinsi.id]);

  React.useMemo(
    () =>
      getData('kecamatan?id_kota=' + address.kota_kabupaten.id).then(res => {
        setDataAddress({
          ...dataAddress,
          kecamatan: res.kecamatan,
          kelurahan: [],
        });
      }),

    [address.kota_kabupaten.id],
  );

  React.useMemo(
    () =>
      getData('kelurahan?id_kecamatan=' + address.kecamatan.id).then(res => {
        setDataAddress({...dataAddress, kelurahan: res.kelurahan});
      }),

    [address.kecamatan.id],
  );

  return (
    <Box flex={1}>
      <Header title={'Biodata'} leftOnPress={() => navigation.goBack()} />

      <ScrollView {...globalStyle.container}>
        <Box {...globalStyle.inputContainer}>
          <Text {...globalStyle.label}>First Name</Text>
          <Input
            {...globalStyle.input}
            placeholder="First Name"
            value={data.firstName}
            onChangeText={value => onChangeText('firstName', value)}
          />
        </Box>
        <Box {...globalStyle.inputContainer}>
          <Text {...globalStyle.label}>Last Name</Text>
          <Input
            {...globalStyle.input}
            placeholder="Last Name"
            value={data.lastName}
            onChangeText={value => onChangeText('lastName', value)}
          />
        </Box>
        <Box {...globalStyle.inputContainer}>
          <Text {...globalStyle.label}>Biodata</Text>
          <TextArea
            {...globalStyle.input}
            placeholder="Biodata"
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
              placeholder="Provinsi"
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
              placeholder="Kota"
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
              placeholder="Kecamatan"
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
              placeholder="Kelurahan"
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
        data={dataSheet}
        onChangeSheet={onChangeSheet}
      />
    </Box>
  );
};

export default Biodata;
