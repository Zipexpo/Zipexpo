// gsap
gsap.registerPlugin(ScrollTrigger, Draggable);

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
    }
});
const terms = gsap.utils.toArray('.gallery .listOption');
gsap.set(terms[0], {rotation: 360});
const sequence = hero.addLabel("start")
    .to(terms[0], { rotation: 540 });
const nterms = terms.length;
for (let i=1;i<nterms-1;i++){
    sequence
    .to(terms[i], { rotation: 360 ,ease: "power1.in"})
    .addLabel("term_in"+i)
    .to(terms[i], { rotation: 540 });
}
sequence
    .to(terms[nterms-1], { rotation: 360 ,ease: "power1.in"})
    .addLabel("end");

// // smooth scroll
// const lenis = new Lenis()

// lenis.on('scroll', (e) => {
//   console.log(e)
// })

// lenis.on('scroll', ScrollTrigger.update)

// gsap.ticker.add((time)=>{
//   lenis.raf(time * 1000)
// })

// gsap.ticker.lagSmoothing(0)
