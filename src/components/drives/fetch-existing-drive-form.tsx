import { Flex, Input, IconButton, FormControl, FormErrorMessage } from '@chakra-ui/react';
import { Formik, Form, Field, FieldProps } from 'formik';
import { AiOutlinePlus } from 'react-icons/ai';

import { driveStore } from '../../store/drive-store';

export const FetchExistingDriveForm = () => (
  <Formik
    initialValues={{ existingDriveName: '' }}
    onSubmit={async ({ existingDriveName }, { setFieldValue }) => {
      await driveStore.dispatch('FETCH', existingDriveName);
      setFieldValue('existingDriveName', '');
    }}
  >
    {({ errors, isValid, isSubmitting }) => (
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
                <Input
                  {...field}
                  id="existingDriveName"
                  variant="filled"
                  placeholder="existing-drive-name"
                  autoComplete="off"
                />
                <FormErrorMessage>{errors.existingDriveName}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <IconButton
            disabled={!isValid}
            isLoading={isSubmitting}
            aria-label="submit"
            type="submit"
            icon={<AiOutlinePlus size="24" />}
          />
        </Flex>
      </Form>
    )}
  </Formik>
);

export default FetchExistingDriveForm;
