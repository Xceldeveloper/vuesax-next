<template>
  <div id="boxx" class="container" ref="features">
    <div class="features">
      <div class="marker">
        <span
          @click="switchTab(index)"
          v-for="(feature, index) in features"
          :style="index == active ? 'opacity:1' : 'opacity:0.5'"
          :key="index"
        ></span>
      </div>
      <div class="text">
        <span class="title" v-html="features[active].title"></span>

        <span class="desc" v-html="features[active].desc"></span>

        <vs-button :to="features[active].action.link">{{
          features[active].action.text
        }}</vs-button>
      </div>
    </div>

    <div class="feature-display">
      <img class="image" :src="features[active].img" alt="" />
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
      tl: null,
    };
  },
  mounted() {
    this.checkPosition();
    this.scrollDir();
    this.tl = this.$gsap.timeline({
      paused: true,
      defaults: { duration: 2 },
    });
  },
  methods: {
    checkPosition() {
      var observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting === true) {
            if (entries[0].intersectionRatio === 1) {
              //  console.log("fully visible");
              let elHtml = document.getElementsByTagName("html")[0];
              elHtml.style.overflowY = "hidden";
              window.addEventListener("wheel", this.slideAnim);
            } else {
              //  console.log("not visible");
              window.removeEventListener("wheel", this.slideAnim);
            }
          }
        },
        { threshold: [1] }
      );

      observer.observe(document.querySelector("#boxx"));
    },

    switchTab(index) {
      if (this.active != index) {
        this.tl
          .from(
            document.querySelector(".text"),
            { autoAlpha: 0, translateY: 100 },
            0.1
          )
          .call(this.activeate(index), null, +"+=1");
        this.tl.from(document.querySelector(".image"), { autoAlpha: 0 }, 0.4);
        this.tl.kill();
        this.tl.restart();
      }
    },
    activeate(index) {
      this.active = index;
    },

    scrollDir() {
      const body = document.querySelector("body");

      this.$ScrollTrigger.create({
        markers: false,
        trigger: body,
        start: "top -20%",
        onUpdate: (self) => {
          if (self.direction === 1) {
            //   console.log('scrolling down')
          } else {
            // console.log('scrolling up')
          }
        },
        onLeaveBack: () => {
          //  body.classList.remove("scrolling-up");
        },
      });
    },

    slideAnim(e) {
      //init
      let oldSlide = this.active;
      let activeSlide = this.active;

      // which way did we scroll the mousewheel
      activeSlide = e.deltaY > 0 ? (activeSlide += 1) : (activeSlide -= 1);
      // are we at the beginning of the slides?
      if (activeSlide < 0) {
        activeSlide = 0;
        let elHtml = document.getElementsByTagName("html")[0];
        elHtml.style.overflowY = "auto";
      } else {
        console.log("going up");
        activeSlide = activeSlide;
      }

      // are we at the end of the slides?
      if (activeSlide > this.features.length - 1) {
        activeSlide = this.features.length - 1;
        let elHtml = document.getElementsByTagName("html")[0];
        elHtml.style.overflowY = "auto";
      } else {
        activeSlide = activeSlide;
      }

      // if at the beginning or end there is nothing to animate
      if (oldSlide === activeSlide) {
        return;
      }
      // if not at the beginning or end, we can animate the container
      // and the targets to the new position
      this.switchTab(activeSlide);
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  height: calc(100vh - var(--header-height));
  padding: 50px;
  position: relative;
  gap: 40px;
  display: flex;
  margin-top: var(--header-height);
  box-sizing: border-box;
  color: var(--text-color);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

.feature-display {
  flex: 1;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.image {
  height: auto;
  width: auto;
  display: block;
  max-width: 80%;
  max-height: 100%;
  margin: auto;
}

.features {
  flex: 1;
  display: flex;

  align-items: center;
  gap: 30px;
}

.marker {
  width: 8px;
  height: auto;
  display: flex;
  flex-direction: column;
  gap: 15px;

  span {
    height: 70px;
    border-radius: 4px;
    padding: 3px;
    width: 100%;
    display: block;
    cursor: pointer;
    background-color: var(--text-color);
  }
}

.title {
  font-size: 40px;
  font-weight: 600px;
  display: block;
  margin: 10px 0px;
  line-height: 40px;
}

.desc {
  display: block;
  margin: 30px 0px 30px 0px;
}
</style>
