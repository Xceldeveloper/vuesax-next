<template>
  <div class="bb-wrapper">
    <div class="texts">
      <div class="xtext"></div>
      <div class="xtext"></div>
      <div class="xtext"></div>
      <div class="xtext"></div>
      <div class="xtext"></div>
      <div class="xtext"></div>
      <div class="xtext"></div>
    </div>
    <div class="left"></div>
    <div class="right"></div>
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

    this.allTexts = document.querySelectorAll(".xtext");
    this.oneText = document.querySelector(".xtext");

    this.textCount = this.allTexts.length;
    this.textWidth = this.oneText.offsetWidth;

    this.textTotalWidth = this.textWidth * this.textCount;
    this.textWrapperWidth = this.textTotalWidth - this.textWidth;

    this.leftSide = document.querySelector(".left");
    this.rightSide = document.querySelector(".right");

    this.direction = "right";
    this.set = "+=";

    this.tl = this.$gsap.timeline({
      repeat: -1,
    });

    //set text wrapper width
    this.$gsap.set(".bb-wrapper", { width: this.textWrapperWidth });
    var ctx = this;
    //set text positions
    this.$gsap.set(".xtext", {
      x: (i) => {
        return i * this.textWidth;
      },
    });

    // this.leftSide.addEventListener("mouseenter", this.setUpNewLeft);
    // this.leftSide.addEventListener("mousemove", this.updateTimeScaleLeft);

    // this.rightSide.addEventListener("mouseenter", this.setUpNewRight);
    // this.rightSide.addEventListener("mousemove", this.updateTimeScaleRight);

    // if (!this.autoPlay) {
    //   this.leftSide.addEventListener("mouseleave", (e) => {
    //     this.tl.kill();
    //   });
    // }
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

      this.tl.to(".xtext", {
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
        e.pageX -
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
      var rightPos = e.pageX - this.rightSide.offsetLeft;
      this.tl.timeScale(rightPos / 50);
    },
  },
  watch: {
    autoPlay(val) {
      if (val) {
        this.animateCarousel();
      } else {
        this.leftSide.addEventListener("mouseleave", (e) => {
          this.tl.kill();
        });

        this.rightSide.addEventListener("mouseleave", (e) => {
          this.tl.kill();
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.bb-wrapper {
  height: 300px;

  overflow: hidden;

  white-space: nowrap;
  width: 100vw;
  border: 1px solid red;
}

.xtext {
  height: 180px;
  position: absolute;
  background-color: #000;
  border-radius: 50px;

  width: 150px;
  margin: 5px;
}

.left {
  position: absolute;
  margin: auto;
  top: 0;
  left: 0;
  width: 50vw;
  bottom: 0;
  display: none;
  //background-color: rgba(red, 0.25);
}

.right {
  position: absolute;
  margin: auto;
  top: 0;
  left: 50vw;
  width: 50vw;
  bottom: 0;
  display: none;
  //background-color: rgba(blue, 0.25);
}
</style>
