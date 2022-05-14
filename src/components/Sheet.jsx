import React from 'react';
import {Box, Actionsheet, Input, Text, ScrollView} from 'native-base';
import axios from 'axios';

const Sheet = ({isOpen, onClose, url, onChangeSheet}) => {
  const [data, setData] = React.useState([]);
  console.log(data);
  const getData = async () => {
    try {
      const response = await axios.get(
        'http://dev.farizdotid.com/api/daerahindonesia/' + url,
      );

      const responseKey = Object.keys(response.data);
      if (responseKey.includes('provinsi')) {
        return setData(response.data.provinsi);
      } else if (responseKey.includes('kota_kabupaten')) {
        return setData(response.data.kota_kabupaten);
      } else if (responseKey.includes('kecamatan')) {
        return setData(response.data.kecamatan);
      } else if (responseKey.includes('kelurahan')) {
        return setData(response.data.kelurahan);
      }
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getData();

    return () => {
      setData(null);
    };
  }, [url]);

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
                <Actionsheet.Item onPress={() => onPressItem(item)}>
                  {item.nama}
                </Actionsheet.Item>
              ))}
        </ScrollView>
      </Actionsheet.Content>
    </Actionsheet>
  );
};

export default Sheet;
