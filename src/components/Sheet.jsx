import React from 'react';
import {Box, Actionsheet, Input, Text, ScrollView, Spinner} from 'native-base';
import axios from 'axios';

const Sheet = ({isOpen, onClose, url, onChangeSheet, data}) => {
  const [search, setSearch] = React.useState('');
  const [searchResult, setSearchResult] = React.useState(data);
  const onChangeSearch = text => {
    setSearch(text);
    const result = data.filter(item => {
      return item.nama.toLowerCase().includes(text.toLowerCase());
    });
    setSearchResult(result);
  };

  const onPressItem = item => {
    onChangeSheet(item);
    setSearch('');
    onClose();
  };

  return (
    <Actionsheet isOpen={isOpen} onClose={onClose}>
      <Actionsheet.Content>
        <Box w="100%" px={4} justifyContent="center" mb={5}>
          <Box mt={2}>
            <Text fontWeight="bold" fontSize={16}>
              Search
            </Text>
            <Input
              onChangeText={onChangeSearch}
              fontWeight={'bold'}
              fontSize={16}
              placeholder="Search"
              placeholderTextColor="gray.500"
              borderColor="gray.300"
              borderWidth={1}
              borderRadius={4}
              paddingHorizontal={8}
              paddingVertical={4}
            />
          </Box>
        </Box>
        <ScrollView w="full">
          {data?.length > 0 &&
            data
              ?.filter(val => {
                if (search === '') {
                  return val;
                } else if (
                  val.nama.toLowerCase().includes(search.toLowerCase())
                ) {
                  return val;
                }
              })
              .map((item, index) => (
                <Actionsheet.Item key={index} onPress={() => onPressItem(item)}>
                  {item.nama}
                </Actionsheet.Item>
              ))}
        </ScrollView>
      </Actionsheet.Content>
    </Actionsheet>
  );
};

export default Sheet;
