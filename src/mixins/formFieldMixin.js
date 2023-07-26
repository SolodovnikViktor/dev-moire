import BaseForumField from '@/components/BaseForumField.vue';

export default {
  props: ['title', 'error', 'placeholder', 'value'],
  components: { BaseForumField },
  computed: {
    dataValue: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
  },
};
