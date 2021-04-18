import { Box, forwardRef, Input, InputGroup, List } from '@chakra-ui/react';
import { useUpload, UseUploadProps } from '@shared/components/upload/useUpload';

type UploadProps = UseUploadProps & {
  accept?: string;
  isMultiple?: boolean;
  showFile?: boolean;
};

const Upload = forwardRef<UploadProps, 'input'>((props, ref) => {
  const { accept, showFile = true, isDisabled = false, isMultiple = false, children, ...ownProps } = props;

  const { inputProps, inputValue, fileInputId, fileInputRef, onFileInputClick, onFileInputChange } = useUpload(
    ownProps
  );

  return (
    <Box>
      {showFile && <List></List>}
      <InputGroup width={'fit-content'} onClick={onFileInputClick}>
        <Input value={inputValue} type={'hidden'} {...inputProps} ref={ref} />
        <Input
          id={fileInputId}
          onChange={onFileInputChange}
          multiple={isMultiple}
          isDisabled={isDisabled}
          accept={accept}
          type={'file'}
          hidden
          ref={fileInputRef}
        />
        {children}
      </InputGroup>
    </Box>
  );
});

export { Upload };
