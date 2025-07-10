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
