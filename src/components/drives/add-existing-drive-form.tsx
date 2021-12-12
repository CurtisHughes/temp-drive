import { Flex, Input, IconButton, FormControl, FormErrorMessage } from '@chakra-ui/react';
import { Formik, Form, Field, FieldProps } from 'formik';
import { useErrorHandler } from 'react-error-boundary';
import { AiOutlinePlus } from 'react-icons/ai';

import { useFetchDriveByName } from '../../store/drive-store/hooks/useFetchDriveByName';

export const AddExistingDriveForm = () => {
  const [{ loading, error }, fetchDrive] = useFetchDriveByName({
    onComplete: () => console.log('complete'),
  });

  useErrorHandler(error);

  return (
    <Formik initialValues={{ existingDrive: '' }} onSubmit={({ existingDrive }) => fetchDrive(existingDrive)}>
      {({ errors, isValid }) => (
        <Form>
          <Flex as="li" w="100%" my="7" align="center" justify="center" alignItems="start">
            <Field
              name="existingDrive"
              validate={(existingDrive: string) => {
                let error;
                if (!/^[a-z-]*$/i.test(existingDrive)) {
                  error = 'Invalid drive name!';
                }
                return error;
              }}
            >
              {({ field }: FieldProps) => (
                <FormControl isInvalid={Boolean(errors.existingDrive)} mr="3">
                  <Input {...field} id="existingDrive" variant="filled" placeholder="existing-drive-name" />
                  <FormErrorMessage>{errors.existingDrive}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <IconButton
              disabled={!isValid}
              isLoading={loading}
              aria-label="submit"
              type="submit"
              icon={<AiOutlinePlus size="24" />}
            />
          </Flex>
        </Form>
      )}
    </Formik>
  );
};

export default AddExistingDriveForm;
