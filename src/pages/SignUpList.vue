<template>
  <div class="signup-container">
    <sign-up @signup="signup" />
  </div>
</template>
<script>
import SignUp from "@/components/ui/SignUp";
export default {
  components: {
    SignUp,
  },
  data() {
    return {};
  },
  methods: {
    signup() {
      console.log("signup from singup component");
    },
  },
};
</script>

<style scoped>
.signup-container {
  width: 100%;
  display: flex;
  justify-content: left;
  padding: 30px;
  background-color: #efefef;
}
</style>
