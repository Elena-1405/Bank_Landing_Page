'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

const openModal = function (e) {
	e.preventDefault();
	modal.classList.remove('hidden');
	overlay.classList.remove('hidden');
};

const closeModal = function () {
	modal.classList.add('hidden');
	overlay.classList.add('hidden');
};

btnsOpenModal.forEach((btn) => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
	if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
		closeModal();
	}
});

const header = document.querySelector('.header');
const message = document.createElement('div');
message.classList.add('cookie-message');
message.innerHTML =
	'We use cookies for improving functionality and analytics. <button class="btn btn--close-cookie">Got it</button> '; //to read and set content
header.append(message);
document
	.querySelector('.btn--close-cookie')
	.addEventListener('click', () => message.remove());

//Scroll

btnScrollTo.addEventListener('click', (e) => {
	const s1coords = section1.getBoundingClientRect();
	//console.log(e.target.getBoundingClientRect()); //choose left and top in the obj

	// OLD SCHOOL, excludes scroll bars
	// window.scrollTo(
	//   s1coords.left + window.pageXOffset,
	//   s1coords.top + window.pageYOffset
	// );
	// window.scrollTo({
	//   left: s1coords.left + window.pageXOffset,
	//   top: s1coords.top + window.pageYOffset,
	//   behavior: 'smooth',
	// });

	section1.scrollIntoView({ behavior: 'smooth' }); // Modern way
});

//Smooth Scrolling. Event delegation
document.querySelector('.nav__links').addEventListener('click', (e) => {
	e.preventDefault();
	if (e.target.classList.contains('nav__link')) {
		const id = e.target.getAttribute('href');
		document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
	}
});

//Tabbed components
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click', (e) => {
	const clicked = e.target.closest('.operations__tab'); //finds the closest parent, button itself

	if (!clicked) return; //Guard clause

	//remove activate classes
	tabs.forEach((t) => t.classList.remove('operations__tab--active'));
	tabsContent.forEach((c) => c.classList.remove('operations__content--active'));

	//Active tab
	clicked.classList.add('operations__tab--active'); //taken from CSS

	//Activate content area
	document
		.querySelector(`.operations__content--${clicked.dataset.tab}`) //taken from HTML
		.classList.add('operations__content--active'); //taken from CSS
});

//Menu fade animation
const handleHover = function (e, opacity) {
	//in case of bind 'opacity' should be removed
	if (e.target.classList.contains('nav__link')) {
		const link = e.target;
		const siblings = link.closest('.nav').querySelectorAll('.nav__link');
		const logo = link.closest('.nav').querySelector('img');

		siblings.forEach((el) => {
			if (el !== link) el.style.opacity = opacity; //in case of bind 'opacity' should be changed on 'this'
		});
		logo.style.opacity = opacity; //in case of bind 'opacity' should be changed into 'this'
	}
};

const nav = document.querySelector('.nav');
nav.addEventListener('mouseover', (e) => {
	handleHover(e, 0.5);
});
nav.addEventListener('mouseout', (e) => {
	handleHover(e, 1);
});

//with this and bind
// nav.addEventListener('mouseover', handleHover.bind(0.5));
// nav.addEventListener('mouseout', handleHover.bind(1));

//Sticky navigation
const initialCoords = section1.getBoundingClientRect();
window.addEventListener('scroll', () => {
	if (window.scrollY > initialCoords.top) nav.classList.add('sticky');
	else nav.classList.remove('sticky');
});

//Reveal sections
const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
	const [entry] = entries;
	if (!entry.isIntersecting) return;

	entry.target.classList.remove('section--hidden');
	observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
	root: null,
	threshold: 0.2,
});

allSections.forEach((section) => {
	sectionObserver.observe(section);
	section.classList.add('section--hidden');
});

//Lazy Loading images
const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = function (entries, observer) {
	const [entry] = entries;
	if (!entry.isIntersecting) return;

	//Replace src with data-src
	entry.target.src = entry.target.dataset.src;
	entry.target.addEventListener('load', () => {
		entry.target.classList.remove('lazy-img');
	});
	observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
	root: null,
	threshold: 0.5,
});

imgTargets.forEach((img) => imgObserver.observe(img));

//Slider
const slider = function () {
	const slides = document.querySelectorAll('.slide');
	const btnLeft = document.querySelector('.slider__btn--left');
	const btnRight = document.querySelector('.slider__btn--right');
	let currentSlide = 0;
	const maxSlide = slides.length;
	const dotContainer = document.querySelector('.dots');

	const goToSlide = function (slide) {
		slides.forEach(
			(s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
		);
	};
	const createDots = function () {
		slides.forEach((_, i) => {
			dotContainer.insertAdjacentHTML(
				'beforeend',
				`<button class="dots__dot" data-slide="${i}"></button>`
			);
		});
	};

	const activateDot = function (slide) {
		document
			.querySelectorAll('.dots__dot')
			.forEach((dot) => dot.classList.remove('dots__dot--active'));

		document
			.querySelector(`.dots__dot[data-slide="${slide}"]`)
			.classList.add('dots__dot--active');
	};

	createDots(); //can do init func to put the 3 fs there
	activateDot(0);
	goToSlide(0);

	const nextSlide = function () {
		if (currentSlide === maxSlide - 1) {
			currentSlide = 0;
		} else {
			currentSlide++;
		}
		goToSlide(currentSlide);
		activateDot(currentSlide);
	};

	const prevSlide = function () {
		if (currentSlide === 0) {
			currentSlide = maxSlide - 1;
		} else {
			currentSlide--;
		}
		goToSlide(currentSlide);
		activateDot(currentSlide);
	};

	btnRight.addEventListener('click', nextSlide);
	btnLeft.addEventListener('click', prevSlide);

	document.addEventListener('keydown', (e) => {
		e.key === 'ArrowLeft' && prevSlide(); //instead of if
		e.key === 'ArrowRight' && nextSlide();
	});

	dotContainer.addEventListener('click', (e) => {
		if (e.target.classList.contains('dots__dot')) {
			const { slide } = e.target.dataset;
			goToSlide(slide);
			activateDot(slide);
		}
	});
};

slider();
