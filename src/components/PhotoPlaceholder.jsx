import {AddIcon, Box} from 'native-base';
import React from 'react';

const PhotoPlaceholder = ({width, height}) => {
  return (
    <Box
      justifyContent={'center'}
      alignItems={'center'}
      width={width - 50}
      height={height}
      borderColor="gray.400"
      borderWidth={1.5}
      borderStyle="dashed">
      <AddIcon size={30} color="gray.400" />
    </Box>
  );
};

export default PhotoPlaceholder;
