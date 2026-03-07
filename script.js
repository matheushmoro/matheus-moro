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


// ===== Scroll suave com offset para header fixo =====
function getHeaderOffset() {
	const header = document.querySelector('.site-header');
	return header ? header.offsetHeight + 12 : 0; // 12px extra para espaçamento
}

function scrollToSectionWithOffset(targetId) {
	const target = document.getElementById(targetId);
	if (!target) return;
	const offset = getHeaderOffset();
	const rect = target.getBoundingClientRect();
	const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
	const top = rect.top + scrollTop - offset;
	window.scrollTo({ top, behavior: 'smooth' });
}

// Links do header
document.querySelectorAll('.nav-links a[href^="#"]').forEach(link => {
	link.addEventListener('click', function(e) {
		const href = this.getAttribute('href');
		if (href && href.startsWith('#')) {
			const id = href.slice(1);
			if (document.getElementById(id)) {
				e.preventDefault();
				scrollToSectionWithOffset(id);
			}
		}
	});
});

// Seta de scroll
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator && scrollIndicator.getAttribute('href')) {
	const href = scrollIndicator.getAttribute('href');
	if (href.startsWith('#')) {
		scrollIndicator.addEventListener('click', function(e) {
			const id = href.slice(1);
			if (document.getElementById(id)) {
				e.preventDefault();
				scrollToSectionWithOffset(id);
			}
		});
	}
}
