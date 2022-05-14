import {
  Box,
  Button,
  ChevronLeftIcon,
  HStack,
  Pressable,
  Text,
} from 'native-base';
import React from 'react';

const Header = ({leftOnPress, title, rightComponent}) => {
  return (
    <HStack
      px={15}
      py={3}
      alignItems="center"
      justifyContent="space-between"
      bgColor="cyan.600">
      <HStack alignItems="center" space={4}>
        <Pressable onPress={leftOnPress}>
          <ChevronLeftIcon size={5} color="white" />
        </Pressable>
        <Text
          fontSize={18}
          fontWeight="bold"
          color="white"
          textAlign={'center'}>
          {title ? title : 'Header'}
        </Text>
      </HStack>
    </HStack>
  );
};

export default Header;
