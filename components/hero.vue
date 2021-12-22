<template>
  <div class="container">
    <div class="b">zzzz</div>
    <div class="v"></div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.container {
  height: 100vh;
  width: 100vw;
  border: 1px solid red;
  display: flex;
}
.b {
  width: 300px;
  height: 100%;
  background-color: blue;
  display: none;
}

/* .v {
  height: 100%;
  background-color: red;
  width: 100%;
  clip-path: polygon(100% 0, 0 0, 100% 100%);
} */
</style>
