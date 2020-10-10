<template>
  <div class="signup-container">
    <sign-up @signup="signup" />
  </div>
</template>
<script>
import SignUp from "@/components/ui/SignUp";
// import LoginBox from "@/components/ui/LoginBox";
export default {
  components: {
    SignUp,
    // LoginBox,
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
  display: flex;
  justify-content: left;
  padding: 30px;
  background-color: #efefef;
}
</style>
