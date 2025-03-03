<script>
export default {
  props: {
    isError: Boolean,
    onClose: Function,
  },
};
</script>
<template>
  <div
    :class="{
      'd-flex': true,
      'justify-content-between': true,
      alert: true,
      'alert-danger': isError,
      'alert-primary': !isError,
    }"
    role="alert"
  >
    <slot></slot>
    <button
      type="button"
      class="btn-close"
      aria-label="Close"
      @click="
        () => {
          onClose && onClose();
        }
      "
    ></button>
  </div>
</template>
