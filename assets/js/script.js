var timeout;
const scroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true,
});

function firstPageAnim() {
  var tl = gsap.timeline();

  tl.from("#nav", {
    y: "-10",
    opacity: 0,
    duration: 1.5,
    ease: Expo.easeInOut,
  })
    .to(".boundingelem", {
      y: 0,
      ease: Expo.easeInOut,
      duration: 2,
      delay: -1,
      stagger: 0.2,
    })
    .from("#herofooter", {
      y: -10,
      opacity: 0,
      duration: 1.5,
      delay: -1,
      ease: Expo.easeInOut,
    });
}

function circleSqueeze() {
  // define default scale value
  var xscale = 1;
  var yscale = 1;

  var xprev = 0;
  var yprev = 0;

  window.addEventListener("mousemove", function (dets) {
    clearTimeout(timeout);

    xscale = gsap.utils.clamp(0.8, 1.2, dets.clientX - xprev);
    yscale = gsap.utils.clamp(0.8, 1.2, dets.clientY - yprev);

    xprev = dets.clientX;
    yprev = dets.clientY;

    circleMouseFollower(xscale, yscale);

    timeout = setTimeout(function () {
      document.querySelector(
        "#minicircle"
      ).style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1,1)`;
    }, 100);
  });
}

function circleMouseFollower(xscale, yscale) {
  window.addEventListener("mousemove", function (dets) {
    document.querySelector(
      "#minicircle"
    ).style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale}, ${yscale})`;
  });
}

circleSqueeze();
circleMouseFollower();
firstPageAnim();

document.querySelectorAll(".elem").forEach(function (elem) {
  var rotate = 0;
  var diffrot = 0;

  elem.addEventListener("mouseleave", function (dets) {
    gsap.to(elem.querySelector("img"), {
      opacity: 0,
      ease: Power3,
      duration: 0.5,
    });
  });

  elem.addEventListener("mousemove", function (dets) {
    var diff = dets.clientY - elem.getBoundingClientRect().top;
    diffrot = dets.clientX - rotate;
    rotate = dets.clientX;
    gsap.to(elem.querySelector("img"), {
      opacity: 1,
      ease: Power3,
      top: diff,
      left: dets.clientX,
      rotate: gsap.utils.clamp(-20, 20, diffrot * 0.5),
    });
  });
});

// animation for page 2

function MarvelPageAnim() {
  gsap.set(".card", {
    opacity: 0,
    y: 100
  });

  var tl = gsap.timeline();

  tl.from(".bounding", {
    y: -60,
    opacity: 0,
    duration: 1,
    ease: "expo.inOut",
    stagger: 0.2
  })

  .to(".card", {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: "expo.inOut",
    stagger: 0.1
  }, "-=0.5");
}
MarvelPageAnim();

// animation for page 3

function movieInfoAnimation() {
  const tl = gsap.timeline();

  tl.from("#overview h2", {
    y: -50,
    opacity: 0,
    duration: 0.8,
    ease: "expo.out"
  })

  .from(".overview-content p", {
    x: -100,
    opacity: 0,
    duration: 1,
    ease: "expo.out"
  }, "-=0.5")

  .from(".overview-content img", {
    x: 100,
    opacity: 0,
    duration: 1,
    ease: "expo.out"
  }, "-=1")

  .from("#movielink", {
    y: 50,
    opacity: 0,
    duration: 0.8,
    ease: "expo.out"
  }, "-=0.5")

  .from("#movie-info-card", {
    y: 100,
    opacity: 0,
    duration: 1,
    ease: "expo.out"
  })

  .from(".mini-card", {
    y: 30,
    opacity: 0,
    duration: 0.6,
    ease: "expo.out",
    stagger: 0.2
  }, "-=0.5");
}

movieInfoAnimation();
