import {Box, HStack, Pressable, ScrollView, Text} from 'native-base';
import React from 'react';
import Header from './Header';
import {WizardContext} from '../context/WizardContext';
import {FlatList} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Wizard = ({navigation}) => {
  const wizardContext = React.useContext(WizardContext);
  const {state, dispatch} = wizardContext;
  const {currentStep, steps} = state;

  const nextStep = () => {
    dispatch({type: 'NEXT_STEP'});
  };

  const prevStep = () => {
    dispatch({type: 'PREV_STEP'});
  };

  const setStep = step => {
    dispatch({type: 'SET_STEP', payload: step});
  };

  const _render = ({item, index}) => {
    return (
      <Pressable onPress={() => setStep(index)}>
        <HStack
          alignItems="center"
          space={2}
          mx={2}
          p={2}
          borderRadius={10}
          borderWidth={3}
          bgColor={index === currentStep ? 'green.100' : 'cyan.100'}
          borderColor={currentStep === index ? 'green.500' : 'cyan.500'}>
          <AntDesign
            name={item.icon}
            size={40}
            color={currentStep === index ? 'green' : '#06b6d4'}
          />
          <Text
            fontSize={16}
            fontWeight="bold"
            color={currentStep === index ? 'green.500' : 'cyan.500'}>
            {item.title}
          </Text>
        </HStack>
      </Pressable>
    );
  };

  return (
    <Box flex={1}>
      <Header leftOnPress={() => navigation.goBack()} title="Wizard" />
      <ScrollView flex={1} bg="white" pt={2}>
        <FlatList
          data={steps}
          renderItem={_render}
          keyExtractor={(item, index) => index.toString()}
          horizontal={true}
        />
        <Box flex={1}>
          {steps.map((screen, index) =>
            currentStep === index ? (
              <>
                <Text ml={3} mt={4} fontWeight="bold" fontSize="4xl">
                  {screen.title}
                </Text>
                <Box key={index}>
                  <screen.component />
                </Box>
              </>
            ) : null,
          )}
        </Box>
      </ScrollView>
    </Box>
  );
};

export default Wizard;
