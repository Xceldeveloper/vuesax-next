<template>
  <div class="container" ref="features">
    <div class="feature-display">
      <div style="flex: 1">
        <transition name="component-fade" mode="out-in">
          <img class="feature-img" :src="features[active].img" alt="" />
        </transition>
      </div>
      <div>
        <span class="feature-desc" v-html="features[active].desc"></span>
        <vs-button circle :href="features[active].action.link">{{
          features[active].action.text
        }}</vs-button>
      </div>
    </div>

    <div class="features">
      <div>
        {{ isInViewport }}:{{position}}
        <div id="why-vuesax">Why Vuesax?</div>
        <div class="features-list">
          <div
            @click="active = index"
            class="features-list__item"
            v-for="(feature, index) in features"
            :key="index"
          >
            <span
              class="features-list__item--title"
              :class="{
                'features-list__item--title--active': active === index,
              }"
              v-html="feature.title"
            ></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      features: [
        {
          img: "/images/vuesax-dark-1.svg",
          title: "<b>Reusable Components</b> and easy to implement",
          desc: `With Vuesax you can use any <b>component with few lines of code</b>
           and with great customization, and most importantly very easy to use and understand.`,
          action: {
            text: "Components",
            link: "https://vuesax.com/docs/components/",
          },
        },
        {
          img: "/images/vuesax-dark-2.svg",
          title: "<b>Unique and beautiful design with great customization</b>",
          desc: `<b>Our designs are unique </b> for each component and are not anchored to any visual trends or design rules which makes them <b>customisable</b> and easy to use.`,
          action: {
            text: "Layouts",
            link: "https://vuesax.com/docs/layout/",
          },
        },
        {
          img: "/images/vuesax-dark-3.svg",
          title:
            "Do you need support for applications or<b> Responsive Pages?</b>",
          desc: `Vuesax components have responsive support and adapt to each type of size, apart from that you can
           easily use the grid components to generate <b>visual changes based on screen size either 
           a phone, tablet or desktop.</b>`,
          action: {
            text: "Layouts",
            link: "https://vuesax.com/docs/layout/",
          },
        },
        {
          img: "/images/vuesax-dark-4.svg",
          title:
            "<b>Vuesax</b> is here to help you create your ideas and develop those <b>great projects</b>",
          desc: `Do you have an idea? or some project for a client, vuesax can help you create <b>faster 
          and work</b> less giving you everything you need to implement an interface from the
           simplest to the most complex.</b>`,
          action: {
            text: "Get started",
            link: "https://vuesax.com/docs/guide/gettingStarted.html",
          },
        },
      ],
      isInViewport: false,
      position: 0,
    };
  },
  mounted() {
    this.active = 0;
    //    this.$ScrollTrigger.create({
    //   trigger: ".container",
    //   start: "top center bottom",
    //   end: "bottom center top",
    //   end: "+=500",
    //   onUpdate: self => console.log("direction:", self.direction)
    // });
    this.checkPosition();
  },
  methods: {
    checkPosition() {
      let box = document.querySelector(".container");

      this.$ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate:this.yep
      });
    },
    yep(){
      this.position+=1
      console.log("yep");
    }
  },
};
</script>

<style scoped lang="scss">
.container {
  height: calc(100vh - var(--header-height));

  display: flex;

  padding: 20px 50px;
  margin-top: var(--header-height);

  box-sizing: border-box;

  color: var(--text-color);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

.feature-display {
  flex: 1;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(100% - 40px);
}

.feature-img {
  height: 100%;
  width: auto;
}
.feature-desc {
  display: block;
  font-size: 18px;
  margin-bottom: 20px;
}

.features {
  padding: 15px;
  flex: 1;
  display: flex;

  align-items: center;
}

#why-vuesax {
  font-size: 25px;
  padding: 10px 0px;
}

.features-list {
  &__item {
    .features-list__item--title {
      color: var(--text-color);
      cursor: pointer;
      border-radius: 5px;
      display: block;
      width: 100%;
      padding: 5px 0px;

      &--active {
        font-size: 21px;
      }
    }
  }
}
</style>