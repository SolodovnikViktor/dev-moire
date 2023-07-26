<!-- eslint-disable vuejs-accessibility/form-control-has-label -->
<template>
  <BaseForumField :title="title" :error="error">
    <input
      class="form__input"
      v-model="dataValue"
      :type="type"
      :placeholder="placeholder"
    />
  </BaseForumField>
</template>

<!-- eslint-disable vue/return-in-computed-property -->

<script>
import formFieldMixin from '@/mixins/formFieldMixin';

export default {
  props: ['type'],
  mixins: [formFieldMixin],
};
</script>
