import React from 'react';
import {
  Box,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Flex,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberInputProps,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react';

type NumberSliderInputProps = Pick<NumberInputProps, 'max' | 'min' | 'step' | 'id' | 'isDisabled'> & {
  value?: string | number;
  onChange?: (value: string | number) => void;
};

export const NumberSliderInput: React.FC<NumberSliderInputProps> = ({
  id,
  value,
  onChange,
  max,
  min,
  step,
  isDisabled,
}) => {
  return (
    <Flex id={id}>
      <NumberInput
        max={max}
        min={min}
        step={step}
        value={value}
        onChange={onChange}
        maxW="100px"
        mr="2rem"
        isDisabled={isDisabled}
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
      <Slider
        flex="1"
        value={Number(value)}
        onChange={onChange}
        focusThumbOnChange={false}
        isDisabled={isDisabled}
        min={min}
        max={max}
        step={step}
      >
        <SliderTrack bg="gray.100">
          <Box position="relative" right={10} />
          <SliderFilledTrack bg="primary" />
        </SliderTrack>
        <SliderThumb boxSize={6} />
      </Slider>
    </Flex>
  );
};
