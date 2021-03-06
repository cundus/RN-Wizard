import React from 'react';
import {WizardContext} from '../../context/WizardContext';
import {RNCamera} from 'react-native-camera';
import {
  Box,
  Button,
  Image,
  Modal,
  ScrollView,
  Text,
  VStack,
  Pressable,
  Alert,
  HStack,
  CloseIcon,
  IconButton,
  useToast,
} from 'native-base';
import {TouchableOpacity} from 'react-native-gesture-handler';
import PhotoPlaceholder from '../../components/PhotoPlaceholder';
import {globalStyle} from '../../globalStyle/globalStyle';
import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
import Entypo from 'react-native-vector-icons/Entypo';
import ImageViewer from 'react-native-image-zoom-viewer';
import TextRecognition from 'react-native-text-recognition';

const Alerts = props => {
  return (
    <Alert w="100%" status="error">
      <VStack space={2} flexShrink={1} w="100%">
        <HStack flexShrink={1} space={2} justifyContent="space-between">
          <HStack space={2} flexShrink={1}>
            <Alert.Icon mt="1" />
            <Text fontSize="md" color="coolGray.800">
              {props.text}
            </Text>
          </HStack>
        </HStack>
      </VStack>
    </Alert>
  );
};

const PendingView = () => (
  <Box
    style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }}>
    <Text>Waiting</Text>
  </Box>
);

const PhotoUpload = () => {
  const toast = useToast();
  const wizardContext = React.useContext(WizardContext);
  const {state, dispatch} = wizardContext;
  const camera = React.useRef(null);
  const [photo, setPhoto] = React.useState({
    ktp: state.data.ktp,
    selfie: state.data.selfie,
    bebas: state.data.bebas,
    no_ktp: state.data.no_ktp,
  });
  const [cameraType, setCameraType] = React.useState(true);
  const [type, setType] = React.useState('');
  const [modalVisible, setModalVisible] = React.useState(false);
  const [photoPreview, setPhotoPreview] = React.useState({});

  const afterCapture = async data => {
    dispatch({type: 'SET_CAPTURE_MODE', payload: false});
    dispatch({type: 'SET_DATA', payload: data});
  };

  const takePicture = async () => {
    try {
      const options = {quality: 0.5, base64: false};
      const data = await camera.current.takePictureAsync(options);
      if (type === 'ktp') {
        const resultTextReader = await TextRecognition.recognize(data.uri);

        if (resultTextReader.length > 0) {
          const result = resultTextReader.find(item => {
            let icNumber = item.replace(/\D/g, '');
            if (icNumber.match(/^[0-9]{16}$/)) {
              return icNumber;
            }
            return false;
          });

          console.log(result);

          if (
            result === '' ||
            result === undefined ||
            result === null ||
            result === false
          ) {
            return toast.show({
              render: () => <Alerts text="Harap gunakan KTP Anda!" />,
            });
          }

          setPhoto({...photo, no_ktp: result, ktp: data});
          afterCapture({no_ktp: result, ktp: data});
        }
      } else if (type === 'selfie') {
        setPhoto({...photo, selfie: data});
        afterCapture({selfie: data});
      } else if (type === 'bebas') {
        setPhoto({...photo, bebas: data});
        afterCapture({bebas: data});
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onClickPlaceholder = param => {
    if (param === 'ktp') {
      setType('ktp');
    } else if (param === 'selfie') {
      setType('selfie');
    } else if (param === 'bebas') {
      setType('bebas');
    }
    dispatch({type: 'SET_CAPTURE_MODE', payload: true});
  };

  const onClickDelete = param => {
    if (param === 'ktp') {
      setPhoto({...photo, ktp: {}});
      dispatch({type: 'SET_DATA', payload: {ktp: {}, no_ktp: ''}});
    } else if (param === 'selfie') {
      setPhoto({...photo, selfie: {}});
      dispatch({type: 'SET_DATA', payload: {selfie: {}}});
    } else if (param === 'bebas') {
      setPhoto({...photo, bebas: {}});
      dispatch({type: 'SET_DATA', payload: {bebas: {}}});
    }
  };

  const onClickPreview = param => {
    if (param === 'ktp') {
      setPhotoPreview({
        url: photo.ktp.uri,
        type: 'image/jpeg',
      });
    } else if (param === 'selfie') {
      setPhotoPreview({
        url: photo.selfie.uri,
        type: 'image/jpeg',
      });
    } else if (param === 'bebas') {
      setPhotoPreview({
        url: photo.bebas.uri,
        type: 'image/jpeg',
      });
    }
    setModalVisible(true);
  };

  const onPressNext = () => {
    // check if object is empty
    const isEmpty = Object.keys(photo).every(key => {
      return Object.keys(photo[key]).length === 0;
    });

    if (isEmpty) {
      return toast.show({
        render: () => <Alerts text="Harap isi semua form!" />,
        placement: 'top',
      });
    }

    dispatch({type: 'SET_DATA', payload: photo});
    dispatch({type: 'NEXT_STEP'});
  };

  return (
    <Box flex={1}>
      {state.captureMode ? (
        <RNCamera
          ref={ref => {
            camera.current = ref;
          }}
          style={{height: height, width: width}}
          type={
            cameraType
              ? RNCamera.Constants.Type.back
              : RNCamera.Constants.Type.front
          }
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          androidRecordAudioPermissionOptions={{
            title: 'Permission to use audio recording',
            message: 'We need your permission to use your audio',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          onGoogleVisionBarcodesDetected={({barcodes}) => {
            console.log(barcodes);
          }}>
          {({camera, status, recordAudioPermissionStatus}) => {
            if (status !== 'READY') return <PendingView />;
            return (
              <Box
                px={15}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'flex-end',
                  position: 'absolute',
                  bottom: 15,
                  left: 0,
                  right: 0,
                }}>
                <Button
                  variant="unstyled"
                  onPress={() =>
                    dispatch({type: 'SET_CAPTURE_MODE', payload: false})
                  }>
                  <Entypo name="cross" size={35} color="white" />
                </Button>
                <Button
                  onPress={takePicture}
                  w={50}
                  h={50}
                  borderRadius={50}
                  bg="white"></Button>
                <Button
                  variant="unstyled"
                  justifySelf="flex-end"
                  onPress={() => setCameraType(!cameraType)}>
                  <Entypo name="cycle" size={30} color="white" />
                </Button>
              </Box>
            );
          }}
        </RNCamera>
      ) : (
        <>
          <ScrollView {...globalStyle.container}>
            {Object.keys(photo).map(
              (item, index) =>
                item !== 'no_ktp' && (
                  <VStack space={3} key={index} mb={5}>
                    <Text {...globalStyle.label} fontSize="lg">
                      Upload Photo {item}
                    </Text>
                    <Box alignSelf="center">
                      {photo[item].uri ? (
                        <Pressable onPress={() => onClickPreview(item)}>
                          <Box position="relative">
                            <Image
                              source={{uri: photo[item].uri}}
                              style={{
                                width: width,
                                height: 200,
                                resizeMode: 'cover',
                              }}
                              alt="ktp"
                            />
                            <Button
                              onPress={() => onClickDelete(item)}
                              position="absolute"
                              right={0}
                              bottom={0}
                              variant="solid"
                              colorScheme="red"
                              borderTopLeftRadius={20}>
                              <Entypo name="trash" size={24} color="white" />
                            </Button>
                          </Box>
                        </Pressable>
                      ) : (
                        <Pressable onPress={() => onClickPlaceholder(item)}>
                          <PhotoPlaceholder width={width} height={40} />
                        </Pressable>
                      )}
                    </Box>
                  </VStack>
                ),
            )}

            <Button
              onPress={onPressNext}
              style={{marginTop: 20}}
              mb={10}
              _text={{
                color: 'white',
                fontSize: 16,
                fontWeight: 'bold',
              }}>
              Next
            </Button>
          </ScrollView>
        </>
      )}

      <Modal
        overlayVisible
        isOpen={modalVisible}
        onClose={() => setModalVisible(false)}
        size="full">
        <Modal.Content flex={1}>
          <Modal.CloseButton onPress={() => setModalVisible(false)} />
          <ImageViewer
            visible={true}
            imageUrls={[photoPreview]}
            onRequestClose={() => setModalVisible(false)}
          />
        </Modal.Content>
      </Modal>
    </Box>
  );
};

export default PhotoUpload;
