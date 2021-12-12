import { Flex, Input, IconButton, FormControl, FormErrorMessage } from '@chakra-ui/react';
import { Formik, Form, Field, FieldProps } from 'formik';
import { useErrorHandler } from 'react-error-boundary';
import { AiOutlinePlus } from 'react-icons/ai';

import { useFetchDriveByName } from '../../store/drive-store/hooks/useFetchDriveByName';

export const FetchExistingDriveForm = () => {
  const [{ loading, error }, fetchDriveByName] = useFetchDriveByName({
    onComplete: () => console.log('complete'),
  });

  useErrorHandler(error);

  return (
    <Formik
      initialValues={{ existingDriveName: '' }}
      onSubmit={({ existingDriveName }) => fetchDriveByName(existingDriveName)}
    >
      {({ errors, isValid }) => (
        <Form>
          <Flex as="li" w="100%" my="7" align="center" justify="center" alignItems="start">
            <Field
              name="existingDriveName"
              validate={(existingDriveName: string) => {
                let error;
                if (!/^[a-z-]*$/i.test(existingDriveName)) {
                  error = 'Invalid drive name!';
                }
                return error;
              }}
            >
              {({ field }: FieldProps) => (
                <FormControl isInvalid={Boolean(errors.existingDriveName)} mr="3">
                  <Input {...field} id="existingDriveName" variant="filled" placeholder="existing-drive-name" />
                  <FormErrorMessage>{errors.existingDriveName}</FormErrorMessage>
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

export default FetchExistingDriveForm;
