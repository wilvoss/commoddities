class TutorialObject {
  constructor(spec) {
    this.position = spec.position == undefined ? '50px' : spec.position;
    this.title = spec.title == undefined ? '' : spec.title;
    this.description = spec.description == undefined ? '' : spec.description;
    this.class = spec.class == undefined ? '' : spec.class;
    this.buttonText = spec.buttonText == undefined ? 'Next' : spec.buttonText;
  }
}

var Tutorials = [
  new TutorialObject({
    position: '250px',
    title: 'The goal',
    description: 'You have 365 days to make as much money as possible. Buy low, sell high!',
    class: 'Start',
  }),
  new TutorialObject({
    title: 'Cash',
    description: 'This is how much money you have to spend. ',
    class: 'Bank',
  }),
  new TutorialObject({
    title: 'Time',
    description: 'This is how many days you have left. Tap to pause.',
    class: 'PlayPause',
  }),
  new TutorialObject({
    title: 'Speed',
    description: 'This is how fast time passes. Tap to cycle speeds. ',
    class: 'Speed',
  }),
  new TutorialObject({
    position: '150px',
    title: 'Progress',
    description: 'This value reflects your current net worth.',
    class: 'Networth',
  }),
  new TutorialObject({
    position: '320px',
    title: 'The market',
    description: 'While playing, tap any commoddity to buy or sell.',
    class: 'Listings',
  }),
  new TutorialObject({
    position: '320px',
    title: 'Sparklines',
    description: 'Pay attention to the trends in these charts.',
    class: 'Sparkline',
  }),
  new TutorialObject({
    position: '220px',
    title: 'Tab bar',
    description: 'Use these tabs to sort or filter the commoddities.',
    class: 'Listheader',
  }),
  new TutorialObject({
    position: '350px',
    title: 'Play bar',
    description: 'At the bottom of the screen, gain access to the inside trading as well as a single quest worth $20,000!',
    class: 'Navbar',
  }),
  new TutorialObject({
    position: '250px',
    title: 'Good luck',
    description: 'You journey starts now!',
    class: 'End',
    buttonText: "Let's go!",
  }),
];
