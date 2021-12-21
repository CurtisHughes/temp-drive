import {
  Button,
  Checkbox,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalHeader,
  ModalFooter,
  ModalProps,
  FormLabel,
  FormControl,
  FormErrorMessage,
  Stack,
} from '@chakra-ui/react';
import { Formik, Form, Field, FieldProps } from 'formik';

import { driveStore } from '../../../store/drive-store';
import { NumberSliderInput } from './number-slider-input';

type CreateDriveModalFormProps = Omit<ModalProps, 'children'> & {};

export const CreateDriveModalForm: React.FC<CreateDriveModalFormProps> = ({ onClose, ...props }) => (
  <Modal onClose={onClose} {...props}>
    <ModalOverlay />
    <Formik
      initialValues={{ durationInMinutes: 15, passphraseLength: 4, creatorOnlyUploads: true }}
      onSubmit={async (options) => {
        await driveStore.dispatch('CREATE', options);
        onClose();
      }}
    >
      {({ setFieldValue, errors, touched, isValid, setFieldTouched, isSubmitting }) => (
        <Form>
          <ModalContent>
            <ModalHeader>Drive Settings</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Stack spacing={6} align="stretch">
                <Field
                  name="durationInMinutes"
                  validate={(durationInMinutes: number) => {
                    let error;
                    if (durationInMinutes < 15 || durationInMinutes > 1440) {
                      error = 'Must be a number between 15 and 1440';
                    }
                    return error;
                  }}
                >
                  {({ field }: FieldProps) => (
                    <FormControl isInvalid={Boolean(errors.durationInMinutes) && touched.durationInMinutes}>
                      <FormLabel htmlFor="durationInMinutes">Duration (in minutes)</FormLabel>
                      <NumberSliderInput
                        {...field}
                        id="durationInMinutes"
                        isDisabled={isSubmitting}
                        min={15}
                        max={1440}
                        step={15}
                        onChange={(v) => {
                          setFieldValue('durationInMinutes', Number(v));
                          setFieldTouched('durationInMinutes');
                        }}
                      />
                      <FormErrorMessage>{errors.durationInMinutes}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field
                  name="passphraseLength"
                  validate={(passphraseLength: number) => {
                    let error;
                    if (passphraseLength < 4 || passphraseLength > 15) {
                      error = 'Must be a number between 4 and 15';
                    }
                    return error;
                  }}
                >
                  {({ field }: FieldProps) => (
                    <FormControl isInvalid={Boolean(errors.passphraseLength) && touched.passphraseLength}>
                      <FormLabel htmlFor="passphraseLength">Number of words in passphrase</FormLabel>
                      <NumberSliderInput
                        {...field}
                        id="passphraseLength"
                        isDisabled={isSubmitting}
                        min={4}
                        max={15}
                        step={1}
                        onChange={(v) => {
                          setFieldValue('passphraseLength', Number(v));
                          setFieldTouched('passphraseLength');
                        }}
                      />
                      <FormErrorMessage>{errors.passphraseLength}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="creatorOnlyUploads">
                  {({ field }: FieldProps) => (
                    <FormControl>
                      <Checkbox {...field} id="creatorOnlyUploads" defaultIsChecked isDisabled={isSubmitting}>
                        Creator only uploads
                      </Checkbox>
                      <FormErrorMessage>{errors.creatorOnlyUploads}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              </Stack>
            </ModalBody>
            <ModalFooter>
              <Button variant="ghost" mr={3} onClick={onClose} disabled={isSubmitting}>
                Cancel
              </Button>
              <Button type="submit" variant="solid" isLoading={isSubmitting} disabled={!isValid || isSubmitting}>
                Create Drive
              </Button>
            </ModalFooter>
          </ModalContent>
        </Form>
      )}
    </Formik>
  </Modal>
);

export default CreateDriveModalForm;
