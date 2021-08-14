import { UnwrapRef } from '@nuxtjs/composition-api'
import { VFormComponent } from '~/types/app'

export const isValidate = (
  $form: UnwrapRef<VFormComponent> | null,
): boolean => {
  return $form?.validate() ?? false
}
