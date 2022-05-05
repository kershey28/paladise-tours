'use strict';

/********* Navigation ********/

///////////////////////////////////////
// Sticky Navigation

// variables
const heroDOM = document.querySelector('.hero');
const navDOM = document.querySelector('.navigation__content');
const navHeight = navDOM.getBoundingClientRect().height;

// functionality
const stickyNav = entries => {
  const [entry] = entries;

  if (!entry.isIntersecting) {
    navDOM.classList.add('sticky');
  } else navDOM.classList.remove('sticky');
};

//observer
const navigationObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

navigationObserver.observe(heroDOM);

///////////////////////////////////////
// Burger Reveal

// variables
const navBurgerDOM = document.querySelector('.burger__button');
const navBurgerHeight = navBurgerDOM.getBoundingClientRect().height;
const portMediaQuery = window.matchMedia('(max-width: 900px)');

// functionality
const revealBurger = entries => {
  const [entry] = entries;

  // if (!portMediaQuery) return;
  if (!entry.isIntersecting) {
    navBurgerDOM.classList.remove('hidden-burger');
  } else {
    navBurgerDOM.classList.add('hidden-burger');
  }
};

//observer
const burgerObserver = new IntersectionObserver(revealBurger, {
  root: null,
  threshold: 0,
  rootMargin: `-${navBurgerHeight}px`,
});

burgerObserver.observe(heroDOM);

///////////////////////////////////////
// Burger Exit

//variables
const burgerDOM = document.querySelector('.burger__checkbox');
const burgerLinkDOM = document.querySelector('.burger__list');

//event listener
burgerLinkDOM.addEventListener('click', function (e) {
  e.preventDefault();
  burgerDOM.checked = false;
});

////////////////////////////////////////
// Navigation Scrolling

//variables
const navListDOM = document.querySelector('.navigation__list');

//event listener
navListDOM.addEventListener('click', function (e) {
  e.preventDefault();

  // Matching strategy
  if (e.target.classList.contains('navigation__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

///////////////////////////////////////
// Button Scrolling

//variables
const heroBtnDOM = document.querySelector('.hero__btn');
const toursDOM = document.querySelector('#tours');
const toursBtnDOM = document.querySelector('.tours__btn');
const bookDOM = document.querySelector('#book');

// event listeners
heroBtnDOM.addEventListener('click', function (e) {
  e.preventDefault();
  toursDOM.scrollIntoView({ behavior: 'smooth' });
});

toursBtnDOM.addEventListener('click', function (e) {
  e.preventDefault();
  bookDOM.scrollIntoView({ behavior: 'smooth' });
});

/********* Carousel ********/

///////////////////////////////////////
// Slider
const slider = () => {
  //variables
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let curSlide = 0;
  const maxSlide = slides.length;

  // functionality
  const createDots = () => {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = slide => {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  const goToSlide = slide => {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // Next slide
  const nextSlide = () => {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = () => {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = () => {
    goToSlide(0);
    createDots();

    activateDot(0);
  };
  init();

  // Event handlers
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });

  // Timer
  const timer = () => {
    for (let i = 0; i < 8; i++) {
      setTimeout(nextSlide, 1000 + i * 3000);
    }
  };
  timer();
};

///////////////////////////////////////
// Play Slider

//variables
const sliderDOM = document.querySelector('.slider');

//functionality
const playSlider = (entries, observer) => {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  setTimeout(slider, 2000);
  observer.unobserve(entry.target);
};

//observer
const sliderObserver = new IntersectionObserver(playSlider, {
  root: null,
  threshold: 0.15,
});

sliderObserver.observe(sliderDOM);

/********* Animations ********/

///////////////////////////////////////
//  Reveal Sections

//variables
const allSectionsDom = document.querySelectorAll('.reveal');

//functionality
const revealSection = (entries, observer) => {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('hidden');
  observer.unobserve(entry.target);
};

//observer
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

//preset
allSectionsDom.forEach(section => {
  sectionObserver.observe(section);
  section.classList.add('hidden');
});

///////////////////////////////////////
// Animate Icons

//variables
const iconDOM = document.querySelectorAll('.features');
const iconChildDOM = document.querySelectorAll('.features');

//functionality
const moveIcon = (entries, observer) => {
  const [entry] = entries;
  const miniMediaQuery = window.matchMedia('(max-width: 380px)');
  const icon__1 = () => {
    entry.target.children[0].classList.add('moveInBottom-high');
    entry.target.children[0].classList.remove('hidden-icon');
  };

  const icon__2 = () => {
    entry.target.children[1].classList.add('moveInBottom-high');
    entry.target.children[1].classList.remove('hidden-icon');
  };

  const icon__3 = () => {
    entry.target.children[2].classList.add('moveInBottom-high');
    entry.target.children[2].classList.remove('hidden-icon');
  };

  const icon__4 = () => {
    entry.target.children[3].classList.add('moveInBottom-high');
    entry.target.children[3].classList.remove('hidden-icon');
  };

  if (!entry.isIntersecting) return;

  // Animation for Regular
  if (!miniMediaQuery.matches) {
    icon__4();
    setTimeout(icon__3, 1000);
    setTimeout(icon__2, 2000);
    setTimeout(icon__1, 3000);
  }

  // Animation for Mobile-mini 380px
  if (miniMediaQuery.matches) {
    icon__2();
    setTimeout(icon__1, 1000);
    setTimeout(icon__4, 2000);
    setTimeout(icon__3, 3000);
  }

  observer.unobserve(entry.target);
};

//observer
const iconObserver = new IntersectionObserver(moveIcon, {
  root: null,
  threshold: 0.15,
});

//preset
iconDOM.forEach(section => {
  iconObserver.observe(section);
  section.children[0].classList.add('hidden-icon');
  section.children[1].classList.add('hidden-icon');
  section.children[2].classList.add('hidden-icon');
  section.children[3].classList.add('hidden-icon');
});

///////////////////////////////////////
// Flip Cards

//variables
const cardDOM = document.querySelectorAll('.card');

//functionality
const flipCard = (entries, observer) => {
  const [entry] = entries;
  const flipFront = () => entry.target.children[0].classList.add('flip-front');
  const flipBack = () => entry.target.children[1].classList.add('flip-back');
  const returnFlipFront = () =>
    entry.target.children[0].classList.remove('flip-front');
  const returnFlipBack = () =>
    entry.target.children[1].classList.remove('flip-back');

  if (!entry.isIntersecting) return;

  flipFront();
  flipBack();

  // Reset
  observer.unobserve(entry.target);
  setTimeout(returnFlipFront, 3000);
  setTimeout(returnFlipBack, 3000);
};

//observer
const cardObserver = new IntersectionObserver(flipCard, {
  root: null,
  threshold: 1,
});

//preset
cardDOM.forEach(section => {
  cardObserver.observe(section);
});
