<template>
  <div class="comments">
    <div class="box"></div>
    <div class="box"></div>
    <div class="box"></div>
    <div class="box"></div>
    <div class="box"></div>
    <div class="box"></div>
    <div class="box"></div>
    <div class="box"></div>
    <div class="box"></div>
    <div class="box"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      autoPlay: null,
      allTexts: null,
      oneText: null,
      textCount: null,
      textWidth: null,
      textTotalWidth: null,
      textWrapperWidth: null,
      leftSide: null,
      rightSide: null,
      direction: null,
      set: null,
      tl: null,
    };
  },
  mounted() {
    this.autoPlay = false;

    console.log("cjcfg");

    this.allTexts = document.querySelectorAll(".box");
    this.oneText = document.querySelector(".box");

    this.textCount = this.allTexts.length;
    this.textWidth = this.oneText.offsetWidth;

    this.textTotalWidth = this.textWidth * this.textCount;
    this.textWrapperWidth = this.textTotalWidth - this.textWidth;

    this.direction = "right";
    this.set = "+=";

    this.tl = this.$gsap.timeline({
      repeat: -1,
    });

    //set text wrapper width
    this.$gsap.set(".comments", { width: this.textWrapperWidth });
    var ctx = this;
    //set text positions
    this.$gsap.set(".box", {
      x: (i) => {
        return i * this.textWidth;
      },
    });

    this.scrollDir();
  },
  methods: {
    setDirection() {
      if (this.direction === "right") {
        this.set = "+=";
      }
      if (this.direction === "left") {
        this.set = "-=";
      }
    },

    wrap(value, min, max) {
      var v = value - min;
      var r = max - min;
      return ((r + (v % r)) % r) + min;
    },

    animateCarousel() {
      this.tl = this.$gsap.timeline({
        repeat: -1,
      });

      this.tl.to(".box", {
        duration: this.textCount * 5,
        ease: "none",
        x: this.set + this.textTotalWidth,
        modifiers: {
          x: this.$gsap.utils.unitize((x) => {
            return this.wrap(x, -this.textWidth, this.textWrapperWidth);
          }),
        },
      });
    },

    setUpNewLeft() {
      if (this.autoPlay) {
        this.tl.kill();
      }
      this.direction = "left";
      this.setDirection();
      this.animateCarousel();
    },

    updateTimeScaleLeft(e) {
      var leftPos =
        this.leftSide.pageX -
        (window.innerWidth - this.leftSide.getBoundingClientRect().right);
      this.tl.timeScale(Math.abs(leftPos) / 50);
    },

    setUpNewRight() {
      this.tl.kill();
      this.direction = "right";
      this.setDirection();
      this.animateCarousel();
    },

    updateTimeScaleRight(e) {
      var rightPos = this.rightSide.pageX - this.rightSide.offsetLeft;
      this.tl.timeScale(rightPos / 50);
    },

    scrollDir() {
      const body = document.querySelector("body");

      this.$ScrollTrigger.create({
        markers: false,
        trigger: body,
        start: "top -20%",
        onUpdate: (self) => {
          console.log("...");
          if (self.direction === 1) {
            console.log("up....");
            this.setUpNewLeft();
            // this.updateTimeScaleLeft();
          } else {
            console.log("down...");
            this.setUpNewRight();
            //   this.updateTimeScaleRight();

            // console.log('scrolling up')
          }
        },
        onLeaveBack: () => {
          this.tl.kill();
          //  body.classList.remove("scrolling-up");
        },
      });
    },
  },
};
</script>

<style lang="scss">
.comments {
  height: 200px;
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;

  .box {
    width: 300px;
    height: 150px;
    border-radius: 20px;
    background-color: #fff;
  }
}
</style>
