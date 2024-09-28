import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Text,
  Box,
  Grid,
  GridItem,
  Input,
  Button,
  Heading,
} from '@chakra-ui/react';

const BlockDetailsModal = ({ isOpen, onClose, block }) => {
  const [data, setData] = useState(block.data || {});

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Heading size="md">Block Details - {block.name}</Heading>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Grid templateColumns="repeat(2, 1fr)" gap={6}>
            {Object.keys(data).map((key) => (
              <GridItem key={key}>
                <Text fontWeight="bold">{key}:</Text>
                <Input
                  type="text"
                  name={key}
                  value={data[key]}
                  onChange={handleChange}
                />
              </GridItem>
            ))}
          </Grid>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default BlockDetailsModal;