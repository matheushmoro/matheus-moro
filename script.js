const heroImage = document.querySelector('.hero-image');
const mobileQuery = window.matchMedia('(max-width: 620px)');

function updateHeroScrollState() {
	if (!heroImage) {
		return;
	}

	if (!mobileQuery.matches) {
		heroImage.classList.remove('is-scroll-active');
		return;
	}

	const rect = heroImage.getBoundingClientRect();
	const viewportHeight = window.innerHeight;
	const viewportCenter = viewportHeight / 2;
	const centerBand = viewportHeight * 0.22;
	const elementCenter = rect.top + rect.height / 2;
	const isVisible = rect.bottom > 0 && rect.top < viewportHeight;
	const nearCenter = Math.abs(elementCenter - viewportCenter) <= centerBand;

	heroImage.classList.toggle('is-scroll-active', isVisible && nearCenter);
}

updateHeroScrollState();

window.addEventListener('scroll', updateHeroScrollState, { passive: true });
window.addEventListener('resize', updateHeroScrollState);

if (typeof mobileQuery.addEventListener === 'function') {
	mobileQuery.addEventListener('change', updateHeroScrollState);
}
