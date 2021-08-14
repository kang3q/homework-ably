import { VFormComponent } from '~/types/app'

export const isValidate = ($form: VFormComponent | null): boolean => {
  return $form?.validate() ?? false
}
