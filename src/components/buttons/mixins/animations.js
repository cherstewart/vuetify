import BezierEasing from '~util/bezier-easing'

const easeInCubic = BezierEasing(0.55, 0.055, 0.675, 0.19)
const easeOutCubic = BezierEasing(0.215, 0.61, 0.355, 1)
const easeInQuart = BezierEasing(0.895, 0.03, 0.685, 0.22)
const easeOutQuart = BezierEasing(0.165, 0.84, 0.44, 1)
const easeInQuad = BezierEasing(0.55, 0.085, 0.68, 0.53)
const easeOutQuad = BezierEasing(0.25, 0.46, 0.45, 0.94)

export default {
  methods: {
    clipPathY (el, start, end, delta) {
      this.clipPathY = this.interpolate(start, end, delta)

      el.style.clipPath = this.computedClipPath
    },
    dialogContentBeforeEnter (el) {
      this.addTransform(el, `translateY(64px)`)
      this.clipPathY = 60
      el.style.clipPath = this.computedClipPath
      el.style.opacity = 0
    },
    dialogContentEnter (el, done) {
      Promise.all([
        this.animate(d => this.vertical(el, 64, 0, d), 200, 200, easeOutQuad),
        this.animate(d => this.opacity(el, 0, 1, d), 500, 200, easeOutQuad),
        this.animate(d => this.clipPath(el, 16, el.clientHeight * 0.8, d), 400, 200, easeOutQuad)
      ]).then(() => done())
    },
    dialogContentBeforeLeave (el) {
      this.addTransform(el, `translateY(0px)`)
      this.clipPathY = 60
      el.style.clipPath = this.computedClipPath
      el.style.opacity = 1
    },
    dialogContentLeave (el, done) {
      Promise.all([
        this.animate(d => this.vertical(el, 0, 64, d), 200, 100, easeOutQuad),
        this.animate(d => this.opacity(el, 1, 0, d), 400, 0, easeOutQuad),
        this.animate(d => this.clipPath(el, el.clientHeight * 0.8, 16, d), 400, 0, easeOutQuad)
      ]).then(() => done())
    },
    dialogActivatorBeforeEnter (el) {
      el.style.transition = 'none'
      el.style.opacity = 0
      el.querySelector('.btn__content').style.transition = 'none'
      this.addTransform(el, `translateX(-50px)`)
      this.addTransform(el, `translateY(-50px)`)
      this.addTransform(el, `scale(2.5)`)
      this.addTransform(el, `scale(-30deg)`)
    },
    dialogActivatorEnter (el, done) {
      const icon = el.querySelector('.btn__content')
      this.timeout(() => {
        Promise.all([
          this.animate(d => this.opacity(icon, 0, 1, d), 200, 0, easeOutQuad),
          this.animate(d => this.opacity(el, 0.1, 1, d), 300, 0, easeOutQuad),
          this.animate(d => this.horizontal(el, -50, 0, d), 200, 0, easeInQuad),
          this.animate(d => this.vertical(el, -50, 0, d), 200, 0, easeOutQuad),
          this.animate(d => this.scale(el, 2.5, 1, d), 200, 0, easeInQuad),
          this.animate(d => this.rotate(el, -30, 0, d), 200, 0, easeOutQuad)
        ]).then(() => done())
      }, 300)
    },
    dialogActivatorBeforeLeave (el) {
      el.style.transition = 'none'
      el.style.opacity = 1
      el.querySelector('.btn__content').style.transition = 'none'
    },
    dialogActivatorLeave (el, done) {
      const icon = el.querySelector('.btn__content')
      Promise.all([
        this.animate(d => this.opacity(icon, 1, 0, d), 200, 0, easeOutQuad),
        this.animate(d => this.opacity(el, 1, 0.1, d), 300, 0, easeOutQuad),
        this.animate(d => this.horizontal(el, 0, -50, d), 200, 0, easeOutQuad),
        this.animate(d => this.vertical(el, 0, -50, d), 200, 0, easeInQuad),
        this.animate(d => this.scale(el, 1, 2.5, d), 200, 0, easeInQuad),
        this.animate(d => this.rotate(el, 0, -30, d), 200, 0, easeOutQuad)
      ]).then(() => done())
    }
  }
}