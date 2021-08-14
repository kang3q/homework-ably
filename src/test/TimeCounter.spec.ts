import { mount } from '@vue/test-utils'
import TimeCounter from '~/components/TimeCounter.vue'

describe('TimeCounter', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(TimeCounter)
    expect(wrapper.vm).toBeTruthy()
  })
})
