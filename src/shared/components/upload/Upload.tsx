import { Box, forwardRef, Input, InputGroup, useFormControlProps, Wrap } from '@chakra-ui/react';
import { useUpload, UseUploadProps } from '@shared/components/upload/useUpload';
import { getValidChildren } from '@chakra-ui/react-utils';
import { cloneElement } from 'react';
import { UploadFile } from '@shared/components/upload/UploadFile';

export type UploadProps = UseUploadProps & {
  accept?: string;
  showFile?: boolean;
};

const Upload = forwardRef<UploadProps, 'div'>((props, ref) => {
  const { name, accept = '', showFile = true, isDisabled = false, isMultiple = false, children, ...ownProps } = props;

  const {
    loading,
    inputValue,
    inputProps,
    fileInputRef,
    fileInputProps,
    onFileInputClick,
    onFileInputChange,
  } = useUpload(props);

  const { isInvalid } = useFormControlProps(props);

  const clones = getValidChildren(children).map((child) => {
    return cloneElement(child, {
      isDisabled: isDisabled,
      isLoading: loading,
      colorScheme: isInvalid ? 'red' : undefined,
    });
  });

  return (
    <Box>
      {showFile && (
        <Wrap marginBottom={3} spacing={3}>
          {(typeof inputValue == 'string' ? [inputValue] : inputValue).map((file) => (
            <UploadFile key={file} file={file} />
          ))}
        </Wrap>
      )}
      <InputGroup width={'fit-content'} onClick={onFileInputClick}>
        <Input name={name} value={inputValue} type={'hidden'} {...inputProps} ref={ref} />
        <Input
          onChange={onFileInputChange}
          multiple={isMultiple}
          accept={accept}
          type={'file'}
          hidden
          ref={fileInputRef}
          {...fileInputProps}
        />
        {clones}
      </InputGroup>
    </Box>
  );
});

export { Upload };
