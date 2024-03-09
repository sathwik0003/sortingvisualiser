import React, { useState, useEffect } from 'react';
import {
  ChakraProvider,
  Button,
  Flex,
  Box,
  Heading,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from '@chakra-ui/react';
import './sortingvisualizer.css';

const Sorting_Visualizer = () => {
  const [array, setArray] = useState([]);
  const [arraySize, setArraySize] = useState(50);
  const [currentIdx, setCurrentIdx] = useState(-1);
  const [sorting, setSorting] = useState(false);

  const randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const resetArray = () => {
    const newArray = [];
    for (let i = 0; i < arraySize; i++) {
      newArray.push(randomIntFromInterval(5, 600));
    }
    setArray(newArray);
    setCurrentIdx(-1); 
  };

  const handleReload = () => {
    resetArray();
  };

  const swap = (items, leftIndex, rightIndex) => {
    const temp = items[leftIndex];
    items[leftIndex] = items[rightIndex];
    items[rightIndex] = temp;
  };

  const bubbleSort = async () => {
    setSorting(true);
    for (let i = 0; i < array.length - 1; i++) {
      for (let j = 0; j < array.length - i - 1; j++) {
        setCurrentIdx(j); 
        if (array[j] > array[j + 1]) {
          swap(array, j, j + 1);
          setArray([...array]);
          await new Promise((resolve) => setTimeout(resolve, 50));
        }
      }
    }
    setCurrentIdx(-1); 
    setSorting(false);
  };

  useEffect(() => {
    resetArray();
  }, [arraySize]);

  return (
    <Flex direction="column" minHeight="100vh" bg="#f0f0f0">
      <Flex
        justifyContent="space-between"
        alignItems="center"
        padding="20px"
        width="100%"
        bg="#3182ce"
        color="white"
      >
        <Heading as="h1" size="lg">
          Sorting Visualizer
        </Heading>
        <Flex alignItems="center">
          <Button
            onClick={handleReload}
            colorScheme="blue"
            variant="outline"
            mr="10px"
          >
            Reload
          </Button>
          <Button
            onClick={bubbleSort}
            colorScheme="red"
            variant="outline"
            isDisabled={sorting}
          >
            Bubble Sort
          </Button>
        </Flex>
      </Flex>
      <Flex alignItems="flex-end" justifyContent="center" flex="1">
        {array.map((value, idx) => (
          <Box
            key={idx}
            width={`${100 / arraySize}%`}
            margin="0 1px"
            backgroundColor={idx === currentIdx ? '#e53e3e' : '#3182ce'}
            height={`${(value / 600) * (window.innerHeight - 200)}px`}
            transition="background-color 0.3s ease"
          ></Box>
        ))}
      </Flex>
      <Flex justifyContent="center" padding="20px">
        <Slider
          min={4}
          max={100}
          defaultValue={arraySize}
          onChange={(value) => setArraySize(value)}
          width="60%"
          isDisabled={sorting}
        >
          <SliderTrack>
            <SliderFilledTrack bg="#3182ce" />
          </SliderTrack>
          <SliderThumb boxSize={6} bg="#3182ce" />
        </Slider>
      </Flex>
      <Flex justifyContent="space-between" padding="20px">
        <Box>{4}</Box>
        <Box>{arraySize}</Box>
        <Box>{100}</Box>
      </Flex>
    </Flex>
  );
};

export default Sorting_Visualizer