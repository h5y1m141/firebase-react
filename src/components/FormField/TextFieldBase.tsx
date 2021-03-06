import MuiTextField, {
  TextFieldProps as MuiTextFieldProps,
} from '@material-ui/core/TextField'
import { Field, FieldProps, getIn } from 'formik'
import React from 'react'

export type Props = { name: string } & Pick<
  MuiTextFieldProps,
  'label' | 'placeholder' | 'type' | 'multiline' | 'rows' | 'onBlur'
>

const TextFieldBase: React.FC<Props> = ({ name, ...props }) => {
  return (
    <Field name={name}>
      {({ form, field }: FieldProps) => {
        const { touched, errors, isSubmitting } = form

        const fieldError = getIn(errors, name)
        const showError = getIn(touched, name) && !!fieldError

        return (
          <MuiTextField
            {...field}
            {...props}
            variant="outlined"
            error={showError}
            disabled={isSubmitting}
            fullWidth
          />
        )
      }}
    </Field>
  )
}

export default TextFieldBase
