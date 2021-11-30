import { useErrorHandler } from 'react-error-boundary';
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

import { useCreateDrive } from '../../../store';
import { NumberSliderInput } from './number-slider-input';

type CreateDriveModalFormProps = Omit<ModalProps, 'children'> & {};

export const CreateDriveModalForm: React.FC<CreateDriveModalFormProps> = ({ onClose, ...props }) => {
  const [{ error }, createDrive] = useCreateDrive();

  useErrorHandler(error);

  return (
    <Modal onClose={onClose} {...props}>
      <ModalOverlay />
      <Formik
        initialValues={{ driveDuration: 15, passphraseLength: 4, creatorOnlyUploads: true }}
        onSubmit={async (values, { setSubmitting }) => {
          console.log(values);
          await createDrive();
          setSubmitting(false);
          onClose();
        }}
      >
        {({ setFieldValue, isSubmitting, errors, touched, isValid, setFieldTouched }) => (
          <Form>
            <ModalContent>
              <ModalHeader>Drive Settings</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Stack spacing={6} align="stretch">
                  <Field
                    name="driveDuration"
                    validate={(driveDuration: number) => {
                      let error;
                      if (driveDuration < 15 || driveDuration > 1440) {
                        error = 'Must be a number between 15 and 1440';
                      }
                      return error;
                    }}
                  >
                    {({ field }: FieldProps) => (
                      <FormControl isInvalid={Boolean(errors.driveDuration) && touched.driveDuration}>
                        <FormLabel htmlFor="driveDuration">Duration (in minutes)</FormLabel>
                        <NumberSliderInput
                          {...field}
                          id="driveDuration"
                          isDisabled={isSubmitting}
                          min={15}
                          max={1440}
                          step={15}
                          onChange={(v) => {
                            setFieldValue('driveDuration', Number(v));
                            setFieldTouched('driveDuration');
                          }}
                        />
                        <FormErrorMessage>{errors.driveDuration}</FormErrorMessage>
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
};

export default CreateDriveModalForm;
