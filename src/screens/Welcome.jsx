import {Box, Button, Image, Text} from 'native-base';
import React from 'react';
import {globalStyle} from '../globalStyle/globalStyle';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Welcome = ({navigation}) => {
  return (
    <Box
      {...globalStyle.container}
      bgColor="cyan.100"
      justifyContent="space-around"
      alignItems="center">
      <Box alignItems="center">
        <Image
          source={{
            uri: 'https://www.pngmart.com/files/21/Hello-Vector-PNG-Image.png',
          }}
          w="120"
          h="200"
          alt="hello"
        />
        <Text fontSize="5xl" fontWeight="bold" color="gray.700">
          WELCOME
        </Text>
      </Box>

      <Box alignItems="center">
        <Text fontSize="2xl" fontWeight="bold" color="gray.700">
          seru.app
        </Text>
        <Text fontSize="lg">Technical Test</Text>
      </Box>
      <Box alignItems="center">
        <Button
          h={60}
          w={60}
          borderRadius={60}
          mb={2}
          onPress={() => navigation.navigate('Biodata')}>
          <AntDesign name="arrowright" size={30} color="white" />
        </Button>
        <Text fontSize="lg" fontWeight="bold">
          Get Started
        </Text>
      </Box>
    </Box>
  );
};

export default Welcome;
