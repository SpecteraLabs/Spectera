import { checkv1Scam } from '#lib/constants';

const domains = [
	'csgorunpromo.pp.ua',
	'cls-tournament.ru',
	'tradeperson.site',
	'wanmeicsgo1.ru',
	'fundr0peur.space',
	'key-dropes.ru',
	'steamwanmeil.ru'
];

domains.forEach((domain) => {
	test(`${domain} is a scam`, async () => {
		expect(await checkv1Scam(domain)).toBe(true);
	});
});
