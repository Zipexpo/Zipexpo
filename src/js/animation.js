// gsap
gsap.registerPlugin(ScrollTrigger, Draggable, MotionPathPlugin);

// pin to more action
var hero = gsap.timeline({
  scrollTrigger: {
    trigger: "#hero",
    scrub: true,
    pin: true,
    start: "top top",
    end: "+=200%",
    snap: {
      snapTo: "labels", // snap to the closest label in the timeline
      duration: { min: 0.5, max: 2 }, // the snap animation should be at least 0.2 seconds, but no more than 3 seconds (determined by velocity)
      delay: 0, // wait 0.2 seconds from the last scroll event before doing the snapping
      ease: "power1.inOut", // the ease of the snap animation ("power3" by default)
    },
  },
});
const terms = gsap.utils.toArray(".gallery .listOption");
gsap.set(terms[0], { rotation: 360 });
const sequence = hero.addLabel("start").to(terms[0], { rotation: 540 });
const nterms = terms.length;
for (let i = 1; i < nterms - 1; i++) {
  sequence
    .to(terms[i], { rotation: 360, ease: "power1.in" })
    .addLabel("term_in" + i)
    .to(terms[i], { rotation: 540 });
}
sequence
  .to(terms[nterms - 1], { rotation: 360, ease: "power1.in" })
  .addLabel("end");

//
let $path = document.querySelector("#backgroundsvg1 .path");
const start = "M 0 100 V 50 Q 50 0 100 50 V 100 z";
const end = "M 0 100 V 0 Q 50 0 100 0 V 100 z";
var research = gsap
  .timeline({
    scrollTrigger: {
      trigger: "#research",
      toggleActions: "restart pause resume pause",
    },
  })
  .to($path, 0.8, { attr: { d: start }, ease: Power2.easeIn })
  .to($path, 0.4, { attr: { d: end }, ease: Power2.easeOut });

// research
scrollH("#research", "#research .panel");

function scrollH(triggerel, selector) {
  let duration = 10,
    sections = gsap.utils.toArray(selector),
    sectionIncrement = duration / (sections.length - 1),
    tl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerel,
        pin: true,
        scrub: 1,
        snap: 1 / (sections.length - 1),
        start: "top top",
        end: "+=5000",
      },
    });

  tl.to(sections, {
    xPercent: -100 * (sections.length - 1),
    duration: duration,
    ease: "none",
  });
  sections.forEach((section, index) => {
    let tween = gsap.from(section, {
      opacity: 0,
      scale: 0.6,
      duration: 1,
      force3D: true,
      paused: true,
    });
    addSectionCallbacks(tl, {
      start: sectionIncrement * (index - 0.99),
      end: sectionIncrement * (index + 0.99),
      onEnter: () => tween.play(),
      onLeave: () => tween.reverse(),
      onEnterBack: () => tween.play(),
      onLeaveBack: () => tween.reverse(),
    });
    index || tween.progress(1); // the first tween should be at its end (already faded/scaled in)
  });
  // helper function that lets us define a section in a timeline that spans between two times (start/end) and lets us add onEnter/onLeave/onEnterBack/onLeaveBack callbacks
  function addSectionCallbacks(
    timeline,
    { start, end, param, onEnter, onLeave, onEnterBack, onLeaveBack }
  ) {
    let trackDirection = (animation) => {
        // just adds a "direction" property to the animation that tracks the moment-by-moment playback direction (1 = forward, -1 = backward)
        let onUpdate = animation.eventCallback("onUpdate"), // in case it already has an onUpdate
          prevTime = animation.time();
        animation.direction = animation.reversed() ? -1 : 1;
        animation.eventCallback("onUpdate", () => {
          let time = animation.time();
          if (prevTime !== time) {
            animation.direction = time < prevTime ? -1 : 1;
            prevTime = time;
          }
          onUpdate && onUpdate.call(animation);
        });
      },
      empty = (v) => v; // in case one of the callbacks isn't defined
    timeline.direction || trackDirection(timeline); // make sure direction tracking is enabled on the timeline
    start >= 0 &&
      timeline.add(
        () =>
          ((timeline.direction < 0 ? onLeaveBack : onEnter) || empty)(param),
        start
      );
    end <= timeline.duration() &&
      timeline.add(
        () =>
          ((timeline.direction < 0 ? onEnterBack : onLeave) || empty)(param),
        end
      );
  }
}

scrollTimeline("#education","#timeline_svg")
function scrollTimeline(triggerel,selection){
  let pulses = gsap.timeline({
    defaults: {
      duration: 0.05, 
      autoAlpha: 1, 
      scale: 2, 
      transformOrigin: 'center', 
      ease: "elastic(2.5, 1)"
    }})
  .to(".ball02, .text01", {}, 0.1) 
  .to(".ball03, .text02", {}, 0.2)
  .to(".ball04, .text03", {}, 0.46)
  .to(".ball04, .text04", {}, 0.66),
  tl = gsap.timeline({defaults: {duration: 1},
    scrollTrigger: {
      trigger: triggerel,
      scrub: true,
      start: "top center",
      end: "bottom center"
    }})
  .to(".ball01", {duration: 0.01, autoAlpha: 1})
  .from(".theLine", {drawSVG: 0}, 0)
  .to(".ball01", {motionPath: {
    path: ".theLine", 
    align:".theLine",
    alignOrigin: [0.5, 0.5],
  }}, 0)
  .add(pulses, 0);
}
