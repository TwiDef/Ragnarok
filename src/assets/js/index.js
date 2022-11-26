import '../styles/reset.scss';
import '../styles/mixins.scss';
import '../styles/style.scss';

const checkboxes = {
    requirements: ["minimum", "recomended"],
    versions: ["standart", "limited"]
};
let isPlay = false;
const classes = {
    opened: 'opened',
    hidden: 'hidden',
    active: 'active',
};

const checkbox = document.querySelectorAll('.checkbox');
const header = document.querySelector('.header');
const menuLink = document.querySelectorAll('.menu-link');
const menuButton = document.querySelector('.header-menu__button');
const video = document.getElementById('video');
const videoButton = document.querySelector('.video-btn');


const toggleMenu = () => header.classList.toggle(classes.opened);
const scrollToSection = (e) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute('href');

    if (!href && !href.startsWith('#')) {
        return;
    }
    const section = href.slice(1);
    const top = document.getElementById(section).offsetTop;
    window.scrollTo({ top, behavior: 'smooth' });
};

const formatValue = (value) => value < 10 ? `0${value}` : value;


const getTimerValues = (diff) => {
    return {
        seconds: (diff / 1000) % 60,
        minutes: (diff / (1000 * 60)) % 60,
        hours: (diff / (1000 * 60 * 60)) % 24,
        days: (diff / (1000 * 60 * 60 * 24)) % 30,
    };
};

const setTimerValues = (values) => {
    Object.entries(values).forEach(([key, value]) => {
        const timerValue = document.getElementById(key);
        timerValue.innerText = formatValue(Math.floor(value));
    });
};

const startTimer = (date) => {
    const id = setInterval(() => {
        const diff = new Date(date).getTime() - new Date().getTime();

        if (diff < 0) {
            clearInterval(id);
            return;
        }

        setTimerValues(getTimerValues(diff));
    }, 1000);

};

const handleVideo = ({ target }) => {
    const info = target.parentElement;

    isPlay = !isPlay;
    info.classList.toggle(classes.hidden, isPlay);
    target.innerText = isPlay ? "Pause" : "Play";
    isPlay ? video.play() : video.pause();
};

const handleCheckbox = ({ currentTarget: { checked, name } }) => {
    const { active } = classes;
    const value = checkboxes[name][Number(checked)];
    const list = document.getElementById(value);
    const tabs = document.querySelectorAll(`[data-${name}]`);
    const siblings = list.parentElement.children;

    for (const item of siblings) {
        item.classList.remove(active);
    }
    for (const tab of tabs) {
        tab.classList.remove(active);
        tab.dataset[name] === value && tab.classList.add(active);
    }
    list.classList.add(active);

};

startTimer("November 29, 2022 00:00:00");
menuButton.addEventListener('click', toggleMenu);
videoButton.addEventListener('click', handleVideo);
menuLink.forEach((link) => link.addEventListener('click', scrollToSection));
checkbox.forEach((box) => box.addEventListener('click', handleCheckbox));


/* 3:06:10 */