<!-- eslint-disable vuejs-accessibility/form-control-has-label -->
<template>
  <BaseForumField :title="title" :error="error">
    <textarea
      class="form__input form__input--area"
      v-model="dataValue"
      :placeholder="placeholder"
    ></textarea>
    <!-- <span class="form__value">{{ title }}</span> -->
  </BaseForumField>
</template>

<!-- eslint-disable vue/return-in-computed-property -->

<script>
import formFieldMixin from '@/mixins/formFieldMixin';

export default {
  mixins: [formFieldMixin],
};
</script>
