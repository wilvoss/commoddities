class CommodityObject {
  constructor(spec) {
    this.key = spec.key == undefined ? '' : spec.key;
    this.category = spec.category == undefined ? '' : spec.category;
    this.name = spec.name == undefined ? '' : spec.name;
    this.description = spec.description == undefined ? '' : spec.description;
    this.exchange = spec.exchange == undefined ? '' : spec.exchange;
    this.market = spec.market == undefined ? '' : spec.market;
    this.contractSize = spec.contractSize == undefined ? '' : spec.contractSize;
    this.contractUnit = spec.contractUnit == undefined ? '' : spec.contractUnit;
    this.currency = spec.currency == undefined ? '' : spec.currency;
    this.imageUrl = spec.imageUrl == undefined ? 'chunky-boogers.svg' : spec.imageUrl;
    this.description = spec.description == undefined ? '' : spec.description;
    this.currentPrice = spec.currentPrice == undefined ? new PriceObject({ value: 0 }) : spec.currentPrice;
    this.previousPrice = spec.previousPrice == undefined ? new PriceObject({ value: 0 }) : spec.previousPrice;
    this.priceHistory = spec.priceHistory == undefined ? [] : spec.priceHistory;
    this.highestPrice = spec.highestPrice == undefined ? new PriceObject({ value: 0 }) : spec.highestPrice;
    this.valueHistory = spec.valueHistory == undefined ? [] : spec.valueHistory;
    this.lostAll = spec.lostAll == undefined ? false : spec.lostAll;
    this.analysis = spec.analysis == undefined ? [] : spec.analysis;
    this.unitsOwned = spec.unitsOwned == undefined ? 0 : spec.unitsOwned;
    this.tipHistory = spec.tipHistory == undefined ? [] : spec.tipHistory;
    this.scandalHistory = spec.scandalHistory == undefined ? [] : spec.scandalHistory;
    this.isHeader = spec.isHeader == undefined ? false : spec.isHeader;
    this.isSelected = spec.isSelected == undefined ? false : spec.isSelected;
    this.currentValue = spec.currentValue == undefined ? 0 : spec.currentValue;
    this.justChanged = spec.justChanged == undefined ? false : spec.justChanged;
    this.tip = spec.tip == undefined ? 'none' : spec.tip;
    this.tipCountDown = spec.tipCountDown == undefined ? 0 : spec.tipCountDown;
    this.giftFulfilled = spec.giftFulfilled == undefined ? false : spec.giftFulfilled;
    this.isWatched = spec.isWatched == undefined ? false : spec.isWatched;
    this.volatility = spec.volatility == undefined ? 'normal' : spec.volatility;
    this.rarity = spec.rarity == undefined ? 1 : spec.rarity;
    this.highestOutOfLastSet = spec.highestOutOfLastSet == undefined ? 0 : spec.highestOutOfLastSet;
  }
}

var Commoddities = [
  new CommodityObject({ key: 'co1', name: 'Holy spoons', description: 'Never before has your silver been this close to god!', category: 'Toddler steps', imageUrl: 'holy-spoons.svg', rarity: 2 }),
  new CommodityObject({ key: 'co2', name: 'Insect bones', description: "Insects have bones too, you know. Just because they don't doesn't mean they don't.", category: 'Toddler steps', imageUrl: 'insect-bones.svg', rarity: 2 }),
  new CommodityObject({ key: 'co3', name: 'Fall leaves', description: "Ah, who wants dead leaves on the ground these days? You do, that's who!", category: 'Toddler steps', imageUrl: 'fall-leaves.svg', rarity: 2 }),
  new CommodityObject({ key: 'co4', name: 'Emerald dust', description: "They always leave the emerald dust on the floor to be swept into a bin. We say, give us that emerald dust and we'll make an emerald dust ball!", category: 'Toddler steps', imageUrl: 'emerald-dust.svg', rarity: 2 }),
  new CommodityObject({ key: 'co5', name: 'Wicked thoughts', description: 'Most people have em. Now you can buy em.', category: 'All growed up', imageUrl: 'wicked-thoughts.svg', rarity: 4 }),
  new CommodityObject({ key: 'co6', name: 'Failed popcorn', description: "You know the ones, at the bottom of the sack. They haven't popped at all or are in some horrific gestational transition, frozen for all time.", category: 'All growed up', imageUrl: 'failed-popcorn.svg', rarity: 4 }),
  new CommodityObject({ key: 'co7', name: 'Soda fizz', description: 'What happens when you let the fizz out? We collect it and sell it to those who know best.', category: 'All growed up', imageUrl: 'soda-fizz.svg', rarity: 4 }),
  new CommodityObject({ key: 'co8', name: 'Oxford commas', description: "Who gives an f about an oxford comma? You do, that's who.", category: 'All growed up', imageUrl: 'oxford-commas.svg', rarity: 4 }),
  new CommodityObject({ key: 'co9', name: 'Origami folds', description: 'Origami is nothing without the folds.', category: 'Bronze bonds', imageUrl: 'origami-folds.svg', rarity: 6 }),
  new CommodityObject({ key: 'co10', name: 'Orange tangents', description: 'These juicy by-products of proximity are just the ticket for metaphysical orange juice.', category: 'Bronze bonds', imageUrl: 'orange-tangents.svg', rarity: 6 }),
  new CommodityObject({ key: 'co11', name: 'Chunky boogers', description: 'Honestly though, are you gonna buy goopy boogers instead?', category: 'Bronze bonds', imageUrl: 'chunky-boogers.svg', rarity: 6 }),
  new CommodityObject({ key: 'co12', name: 'Potato eyes', description: 'Potato eyes, are watching you, they see your every move.', category: 'Bronze bonds', imageUrl: 'potato-eyes.svg', rarity: 6 }),
  new CommodityObject({ key: 'co13', name: 'Very loud moos', description: 'MOOO, MOOO, MOOOO, MOOOOO, and MOOOO (yes we paid for that comma).', category: 'Bronze bonds', imageUrl: 'very-loud-moos.svg', rarity: 6 }),
  new CommodityObject({ key: 'co14', name: 'Creepy smiles', description: 'Clowns are only creepy when they smile. Well, no, but they are extra creepy when they do!', category: 'Bronze bonds', imageUrl: 'creepy-smiles.svg', rarity: 6 }),
  new CommodityObject({ key: 'co15', name: 'Codswallop', description: "BS, horse manure, piles of lies, balderdash, half-truths, deception, there's more where they come from.", category: 'Silver foxes', imageUrl: 'codswallup.svg', rarity: 8 }),
  new CommodityObject({ key: 'co16', name: 'Burning stars', description: "Stars have feelings. They don't like to burn out, just up.", category: 'Silver foxes', imageUrl: 'burning-stars.svg', rarity: 8 }),
  new CommodityObject({ key: 'co17', name: 'Fir fantasies', description: 'If only I could sing and dance and be a decid... no no, stop the music.', category: 'Golden grifts', imageUrl: 'fir-fantasies.svg', rarity: 10 }),
  new CommodityObject({ key: 'co18', name: 'Koala needs', description: 'Bamboo, unicorn fur, groucho marx smiles, and a good tree to hug.', category: 'Golden grifts', imageUrl: 'koala-needs.svg', rarity: 10 }),
  new CommodityObject({ key: 'co19', name: 'Mysterious mojo', description: "It makes you tick, but you don't, and we don't know how or why.", category: 'Golden grifts', imageUrl: 'mysterious-mojo.svg', rarity: 10 }),
  new CommodityObject({ key: 'co20', name: 'Doo dahs', description: 'Every zippity is lost without one. And there are a lot of zippities out there.', category: 'Golden grifts', imageUrl: 'doo-dahs.svg', rarity: 10 }),
  new CommodityObject({ key: 'co21', name: 'TPS reports', description: "I'm gonna have to ask you to fill out some more TPS reports.", category: 'Golden grifts', imageUrl: 'tps-reports.svg', rarity: 10 }),
  new CommodityObject({ key: 'co22', name: 'Syrup holes', description: "Syrup doesn't come from trees, nor from spigots. It comes from holes in the trees. Without those - no waffles.", category: 'Easy peasy', imageUrl: 'syrup-holes.svg', rarity: 1 }),
  new CommodityObject({ key: 'co23', name: 'Limes of destiny', description: 'Buy these, and they will be now, forever, and in the future. Even when they rot.', category: 'Easy peasy', imageUrl: 'limes-of-destiny.svg', rarity: 1 }),
  new CommodityObject({ key: 'co24', name: 'Striped pins', description: 'So cute, so versatile, so yours for the right price.', category: 'Easy peasy', imageUrl: 'striped-pins.svg', rarity: 1 }),
];
