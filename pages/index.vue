<template>
  <div id="page">
    <!-- <section>
      <hero class="panel" />
    </section>
    <section>
      <features class="panel" />
    </section> -->

    <hero class="panel" />

    <comments />

    <hero class="panel" />
  </div>
</template>

<script>
import Comments from "~/components/comments.vue";
import features from "~/components/features.vue";
import Hero from "~/components/hero.vue";
export default {
  components: { features, Hero, Comments },
  data() {
    return {};
  },
  mounted() {
    var ctx = this;
    this.$gsap.utils.toArray("section").forEach((panel, i) => {
      this.$ScrollTrigger.create({
        trigger: panel,
        onEnter: () => ctx.goToSection(i),
      });

      this.$ScrollTrigger.create({
        trigger: panel,
        start: "bottom bottom",
        onEnterBack: () => ctx.goToSection(i),
      });
    });
  },
  methods: {
    goToSection(i, anim) {
      this.$gsap.to(window, {
        scrollTo: { y: i * innerHeight, autoKill: false },
        duration: 1,
      });

      if (anim) {
        anim.restart();
      }
    },
  },
};
</script>

<style scoped>
#page {
  color: var(--text-color);
  min-height: 100vh;
  overflow: hidden;
}
</style>
