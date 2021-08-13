import Vue from 'vue'

export interface VFormComponent extends Vue {
  validate: () => boolean
}
