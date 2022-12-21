import { faFacebookF, faInstagram, faLinkedinIn, faYoutube } from '@fortawesome/fontawesome-free-brands'
export default {
    socialMedias: [{
        item: 'Facebook',
        route: 'https://facebook.com/keyhelpa',
        icon: faFacebookF
    }, {
        item: 'Google',
        route: 'https://instagram.com/keyhelpa',
        icon: faInstagram
    }, {
        item: 'LinkedIn',
        route: 'https://www.linkedin.com/company/keyhelpas/about/',
        icon: faLinkedinIn
    }],
    profileSocialMedias: [{
        item: 'Facebook',
        route: null,
        icon: faFacebookF
    }, {
        item: 'Youtube',
        route: null,
        icon: faYoutube
    }, {
        item: 'LinkedIn',
        route: null,
        icon: faLinkedinIn
    }],
    END_CONTRACT_MAX_ATTEMPTS: 3,
    regions: [{
        title: 'Australian Capital Territory',
        value: null
    }, {
        title: 'New South Wales',
        value: null
    }, {
        title: 'Northern Territory',
        value: null
    }, {
        title: 'Queensland',
        value: null
    }, {
        title: 'South Australia',
        value: null
    }, {
        title: 'Tasmania',
        value: null
    }, {
        title: 'Victoria',
        value: null
    }, {
        title: 'Western Australia',
        value: null
    }],
    certification: [{
        title: 'Neither',
        value: null
    }, {
        title: 'Broker License',
        value: null
    }, {
        title: 'Sales License',
        value: null
    }],
    hourlyRate: [{
        title: 'Less than A$20',
        value: null
    }, {
        title: 'A$20 - A$50',
        value: null
    }, {
        title: 'A$50 - A$100',
        value: null
    }, {
        title: 'A$100 - A$150',
        value: null
    }],
    experience: [{
        title: 'No experience',
        value: null
    }, {
        title: `Entry level (1 to 3 years)`,
        value: null
    }, {
        title: `Intermediate (3 to 5 years)`,
        value: null
    }, {
        title: `Mid-level (5 to 7 years)`,
        value: null
    }, {
        title: `Senior or executive-level (7 years ++)`,
        value: null
    }],
    vaccination: [{
        title: 'Yes, fully vaccinated',
        value: null
    }, {
        title: 'Yes, fully vaccinated with booster',
        value: null
    }, {
        title: 'No',
        value: null
    }]
}