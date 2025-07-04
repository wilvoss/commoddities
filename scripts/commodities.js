/// <reference path="../helpers/console-enhancer.js" />
/// <reference path="../models/CommodityObject.js" />
/// <reference path="../models/ColorObject.js" />
/// <reference path="../models/SimpleModels.js" />
/// <reference path="../models/TipObject.js" />
/// <reference path="../models/TutorialObject.js" />

// if (!UseDebug) {
Vue.config.devtools = false;
Vue.config.debug = false;
Vue.config.silent = true;
// }

Vue.config.ignoredElements = ['app', 'page', 'navbar', 'settings', 'splash', 'splashwrap', 'message', 'notifications', 'speedControls', 'state', 'bank', 'commodity', 'detail', 'gameover', 'listheader', 'listings', 'category', 'name', 'units', 'currentPrice', 'description', 'market', 'currentValue', 'contractSize', 'goldbacking', 'contractUnit'];

var app = new Vue({
  el: '#app',
  data: {
    version: '0.02.04',
    showNotification: false,
    notificationType: [{ serious: 'serious', normal: 'normal', warn: 'warn' }],
    currentNotification: null,
    commodityData: [],
    dataColumns: 9,
    pages: [new PageObject({ name: 'Market', isSelected: true, isDisabled: false }), new PageObject({ name: 'Quest' }), new PageObject({ name: 'Log', isShown: false })],
    showColor: true,
    sortByPrice: false,
    sortByReversePrice: false,
    sortByUnitsOwned: false,
    sortByValue: false,
    commodities: [],
    totalValue: 0,
    startValue: 0,
    gamePaused: false,
    gameLoaded: false,
    startingBank: 100,
    currentBank: 0,
    bankInterval: null,
    bankAddCount: 0,
    bankFundsAdded: false,
    selectedCommodity: null,
    displayedCommodity: new CommodityObject({}),
    feeUnit: 0.01,
    halfFee: 0,
    fullFee: 0,
    timeToEnd: !UseDebug ? 365 : 365,
    gameOver: false,
    gameInterval: null,
    ringleaderinterval: null,
    allSpeeds: [5000, 1000, 500],
    gameSpeed: 5000,
    giftList: [],
    giftEarned: false,
    tipSpeed: 500,
    tipFee: 6,
    tipEngaged: false,
    currentTip: '',
    tipTexts: Tips,
    currentTipText: '',
    tipHistory: [],
    tipTimer: 0,
    tipTimerLimit: 100,
    tippedCommodity: undefined,
    hasBeenFined: false,
    showSEC: false,
    sortByWatched: false,
    isSerious: false,
    showSettings: false,
    showTutorial: false,
    tutorials: Tutorials,
    currentTutorial: new TutorialObject({}),
    sparklineLength: 10,
    detailHistoryLength: 34,
    showHowTo: false,
    themes: Themes,
    currentTheme: Themes[2],
    useTheLightness: false,
    watchedItemCount: 0,
    muteAudio: true,
    changeEveryDay: false,
    moods: ['volatile', 'normal', 'stable'],
    r: document.querySelector(':root'),
    c: window.getComputedStyle(document.querySelector(':root')),
  },
  methods: {
    AssignCommidityData() {
      var previousCommodity = '';
      var catCount = 0;
      for (let x = 0; x < Commoddities.length; x++) {
        let refCom = Commoddities[x];
        let com = new CommodityObject({
          name: refCom.name,
          key: refCom.key,
          description: refCom.description,
          category: refCom.category,
          imageUrl: refCom.imageUrl,
          currentPrice: new PriceObject({ value: 0.04 + (Number(refCom.rarity) * getRandomInt(refCom.rarity, refCom.rarity * 10)) / 100 }),
          // previousPrice: new PriceObject({ value: Number(refCom.rarity) * getRandomInt(refCom.rarity, 50) / 100 }),
          volatility: this.moods[getRandomInt(0, 3)],
          rarity: refCom.rarity,
        });
        // com.highestPrice = new PriceObject({ value: Number(com.currentPrice.value > com.previousPrice.value ? com.currentPrice.value : com.previousPrice.value) });
        // com.priceHistory.push(com.previousPrice);
        com.priceHistory.push(com.currentPrice);
        // com.currentValue = Number(com.unitsOwned) * Number(com.currentPrice.value);
        if (com.category != previousCommodity) {
          let comHeader = new CommodityObject({
            name: '',
            category: com.category,
            isHeader: true,
            key: 'cat' + catCount++,
            rarity: com.rarity,
          });
          this.commodities.push(comHeader);
        }
        previousCommodity = com.category;
        this.commodities.push(com);
      }

      this.GetTotalGamerMarketValue();
      this.GenerateGiftList();

      let amount = this.changeEveryDay ? 30 : 200;

      for (let x = 0; x < amount; x++) {
        this.UpdateGame(false);
      }
    },

    StartTutorial() {
      this.showTutorial = true;
      this.currentTutorial = this.tutorials[0];
      this.StartOver();
    },

    AdvanceTutorial() {
      for (let x = 0; x < this.tutorials.length; x++) {
        const tutorial = this.tutorials[x];
        if (tutorial == this.currentTutorial && x != this.tutorials.length - 1) {
          this.currentTutorial = this.tutorials[x + 1];
          break;
        } else if (x == this.tutorials.length - 1) {
          this.EndTutorial();
          this.gameLoaded = true;
        }
      }
    },

    RewindTutorial() {
      for (let x = this.tutorials.length - 1; x >= 0; x--) {
        const tutorial = this.tutorials[x];
        if (tutorial == this.currentTutorial && x != 0) {
          this.currentTutorial = this.tutorials[x - 1];
          break;
        }
      }
    },

    EndTutorial() {
      this.StartOver();
      let tut = new TutorialObject(this.currentTutorial);
      tut.position = '-200px';
      this.currentTutorial = tut;
      this.showTutorial = false;
      this.gameLoaded = false;
    },

    Add10ToBank() {
      this.bankFundsAdded = true;
      window.clearInterval(this.bankInterval);
    },

    UpdateTipTimer() {
      if (!this.gamePaused && this.tipTimer < this.tipTimerLimit) {
        this.tipTimer++;
      }
    },

    CreateNotification(type, title, subtitle, button1, button1CallBack, button2 = '', button2CallBack = null) {
      let note = new NotificationObject({
        title: title,
        subtitle: subtitle,
        type: type,
        button1Text: button1,
        button1CallBack: button1CallBack,
        button2Text: button2,
        button2CallBack: button2CallBack,
      });
      this.currentNotification = note;
    },

    HandleQuitGameCall() {
      this.CreateNotification('serious', 'Are you sure you want to quit?', '', 'No', this.CloseNotification, 'Yes', this.EndGame);
      this.ShowNotification();
      // this.showSettings = false;
    },

    HandleInsiderTradingCall() {
      this.tipFee = (this.currentBank + this.totalValue) / 4;
      if (this.tipTimer == this.tipTimerLimit && this.gameLoaded && this.tippedCommodity == undefined && this.timeToEnd > 10 && !this.gamePaused && !this.showNotification) {
        // this.ToggleGamePaused();
        this.CreateNotification('normal', "Want an inside trader's tip for " + this.Currency(this.tipFee) + '?', '', 'I Accept!', this.EngageTip, 'Close', this.CloseNotification);
        this.ShowNotification();
        this.tipTimer = 0;
      }
    },

    ShowNotification() {
      this.showNotification = true;
    },

    CloseNotification() {
      this.showNotification = false;
      this.showSEC = false;
    },

    ToggleGamePaused(value) {
      if (this.timeToEnd != 0) {
        window.clearInterval(this.gameInterval);

        if (value == undefined) {
          this.gamePaused = this.showSettings = !this.gamePaused;
        } else {
          this.gamePaused = this.showSettings = value;
        }
        if (!this.gamePaused) {
          this.gameInterval = window.setInterval(this.UpdateGame, this.gameSpeed);
        }
      }
    },

    MathTheFee(value) {
      if (this.displayedCommodity.currentPrice.value != 0) {
        if (value == 'half') {
          var tempPurchase = this.currentBank / 2 - Number((this.currentBank / 2) % this.displayedCommodity.currentPrice.value);
          var tempUnits = Math.floor(tempPurchase / this.displayedCommodity.currentPrice.value);
          this.halfFee = tempUnits * this.feeUnit;
          var newBankFunds = tempUnits * this.displayedCommodity.currentPrice.value;
          return newBankFunds;
        } else {
          var tempPurchase = this.currentBank - Number(this.currentBank % this.displayedCommodity.currentPrice.value);
          var tempUnits = Math.floor(tempPurchase / this.displayedCommodity.currentPrice.value);
          var tempFullFee = this.fullFee;
          tempFullFee = tempUnits * this.feeUnit;

          while (Number(tempFullFee) + Number(tempUnits) * Number(this.displayedCommodity.currentPrice.value) > Number(this.currentBank)) {
            tempFullFee = --tempUnits * this.feeUnit;
          }
          this.fullFee = tempFullFee;
          var newBankFunds = tempUnits * this.displayedCommodity.currentPrice.value;
          return newBankFunds;
        }
      } else {
        return 0;
      }
    },

    TallyCommodityValues() {
      this.commodities.forEach((commodity) => {
        commodity.currentValue = commodity.unitsOwned * commodity.currentPrice.value;
      });
    },

    GetTotalGamerMarketValue() {
      this.totalValue = 0;
      this.commodities.forEach((com) => {
        if (!com.isHeader) {
          this.totalValue += com.currentValue;
        }
      });
    },

    GetHighestValueInLastSetForAllComms() {
      this.commodities.forEach((com) => {
        if (!com.isHeader) {
          com.highestOutOfLastSet = 0;
          for (let x = com.priceHistory.length - 1; x > com.priceHistory.length - this.sparklineLength; x--) {
            if (com.priceHistory[x] != undefined && com.priceHistory[x].value != undefined) {
              const price = com.priceHistory[x].value;
              com.highestOutOfLastSet = price > com.highestOutOfLastSet ? price : com.highestOutOfLastSet;
            }
          }
        }
      });
    },

    SelectGiftedCommodity(event, item) {
      var selectedCom;
      this.commodities.forEach((com) => {
        if (item.name == com.name) {
          this.SelectCommodity(event, com);
        }
      });
    },

    SelectCommodity(event, com) {
      if (event != null) {
        event.preventDefault();
        event.stopPropagation();
      }
      if (com != null && !com.isHeader) {
        if (this.selectedCommodity != null) {
          this.selectedCommodity.isSelected = false;
        }
        if (this.selectedCommodity != com) {
          com.isSelected = true;
          this.displayedCommodity = com;
          this.selectedCommodity = com;
        } else {
          com.isSelected = false;
          this.selectedCommodity = null;
        }
        document.getElementsByTagName('detail')[0].scrollTo(0, 0);
      }
    },

    EngageTip() {
      this.currentTipText = this.tipTexts[getRandomInt(0, this.tipTexts.length)];
      let index = getRandomInt(0, this.commodities.length - 1);
      while (this.commodities[index].isHeader) {
        index = getRandomInt(0, this.commodities.length - 1);
      }
      this.currentBank = this.currentBank - this.tipFee;
      let direction = 'up';
      if (this.commodities[index].unitsOwned > 0) {
        direction = getRandomInt(0, 100) < 40 ? 'down' : 'up';
      }
      this.commodities[index].tip = direction;
      this.commodities[index].tipCountDown = getRandomInt(2, 11);
      this.tippedCommodity = this.commodities[index];
      this.tipEngaged = true;
      let subtitle = this.currentTipText.beforeText + this.tippedCommodity.name + this.currentTipText.inBetweenText + this.tippedCommodity.tip + this.currentTipText.afterText;
      this.CreateNotification(this.notificationType.normal, 'Greedy much? Cool!', subtitle, 'Close', this.CloseNotification);

      this.tipHistory.push(this.commodities[index].name);
    },

    SelectThisPage(page) {
      this.pages.forEach((p) => {
        p.isSelected = false;
      });
      page.isSelected = true;
    },

    UpdateGame(normalIteration = true) {
      if (!this.gamePaused) {
        this.commodities.forEach((com) => {
          var isTipped = com.tip != 'none';

          if (!com.isHeader && this.timeToEnd > 0) {
            let makeChange = getRandomInt(0, 100) > 90 || (isTipped && com.tipCountDown == 0);
            if (makeChange || this.changeEveryDay) {
              let useHugeChange = getRandomInt(0, 100) > 95 || (isTipped && com.tipCountDown == 0);
              useHugeChange = !normalIteration ? false : useHugeChange;
              var downTrend = getRandomInt(0, 100) < 48 ? -1 : 1;
              var upTrend = getRandomInt(0, 100) < 35 ? -1 : 1;
              switch (com.volatility) {
                case 'volatile':
                  downTrend = getRandomInt(0, 100) < 50 ? -1 : 1;
                  upTrend = getRandomInt(0, 100) < 50 ? -1 : 1;
                  break;
                case 'stable':
                  downTrend = getRandomInt(0, 100) < 85 ? -1 : 1;
                  upTrend = getRandomInt(0, 100) < 15 ? -1 : 1;
                  break;
              }
              let direction = com.currentPrice.value < com.previousPrice.value ? downTrend : upTrend;
              if (isTipped && com.tipCountDown == 0) {
                direction = com.tip == 'up' ? 1 : -1;
                this.tippedCommodity = undefined;
                com.tip = 'none';
              }

              let smallChange = getRandomInt(1, (com.currentPrice.value < 1 ? 1 : com.currentPrice.value) * 20) / 100;
              let hugeChange = getRandomInt(20, (com.currentPrice.value < 1 ? 1 : com.currentPrice.value) * 75) / 100;
              let difference = direction * (useHugeChange ? hugeChange : smallChange);
              let tempPrice = new PriceObject({ value: Number(com.currentPrice.value) + difference });
              tempPrice.value = Math.round(100 * tempPrice.value) / 100;

              let preventZeroOut = getRandomInt(0, 100) != 5;

              if ((preventZeroOut || useHugeChange) && tempPrice.value < 0.01) {
                tempPrice.value = 0.01;
              }
              if (tempPrice.value < 0) {
                tempPrice = new PriceObject({ value: 0 });
                com.currentValue = 0;
              }

              tempPrice.value = Number(Math.round(tempPrice.value * 100) / 100);

              com.previousPrice = com.currentPrice;
              com.currentPrice = tempPrice;
              com.priceHistory.push(com.currentPrice);

              if (com.currentPrice.value > com.highestPrice.value) {
                com.highestPrice.value = com.currentPrice.value;
              }

              com.currentValue = Number(com.unitsOwned) * Number(com.currentPrice.value);

              if (com.currentValue > 0) {
                com.justChanged = true;
                window.setTimeout(function () {
                  com.justChanged = false;
                }, 50);
              } else if (com.unitsOwned > 0) {
                this.CreateNotification('warn', 'Some of your stocks have zeroed out.', 'Your associated units have been revoked.', 'Close', this.CloseNotification);
                this.ShowNotification();
                com.unitsOwned = 0;
                com.lostAll = true;
              }
            }
          }
        });

        if (this.tippedCommodity != undefined && this.tippedCommodity.tipCountDown > 0) {
          this.tippedCommodity.tipCountDown = this.tippedCommodity.tipCountDown - 1;
        }
        var secChance = this.hasBeenFined ? getRandomInt(0, 100) : getRandomInt(1, 200);
        this.showSEC = this.tipHistory.length > 0 && !this.gameOver && !this.gamePaused && secChance < this.tipHistory.length;
        if (this.showSEC) {
          this.hasBeenFined = true;
          this.tipHistory = [];
          if (this.tippedCommodity != undefined) {
            this.tippedCommodity.tipCountDown = 0;
            this.tippedCommodity.tip = 'none';
            this.tippedCommodity = undefined;
          }
          this.CreateNotification('warn', 'You are in violation of the Oddity code!', "You've been fined half of your stock and half your funds as a result.", "It won't happen again!", this.CloseNotification);

          requestAnimationFrame(() => {
            this.ShowNotification();
          });

          this.commodities.forEach((com) => {
            com.unitsOwned = Math.floor(com.unitsOwned / 2);
          });
          this.currentBank = Math.floor(this.currentBank / 2);
        }
        if (normalIteration) {
          this.timeToEnd--;
        }

        this.$nextTick(() => {
          this.CheckGiftList();
          this.TallyCommodityValues();
          this.GetTotalGamerMarketValue();
          if (normalIteration) {
            this.GetHighestValueInLastSetForAllComms();
          }
        });

        var isEnd = true;
        this.commodities.forEach((com) => {
          if (com.currentPrice.value + 1 < this.totalValue + this.currentBank && com.currentPrice.value != 0) {
            isEnd = false;
          }
        });

        if (this.timeToEnd === 0 || isEnd) {
          this.QuitGame();
        }
      }
    },

    HandleQuitGame() {
      // var response = confirm('Are you sure you want to quit?');
      this.isSerious = true;
    },

    QuitGame() {
      this.EndGame();
    },

    EndGame() {
      window.clearInterval(this.gameInterval);
      // this.SellAll();
      if (this.currentNotification != null && this.currentNotification.type == 'serious') {
        this.showNotification = false;
      }
      this.gameOver = true;
      this.displayedCommodity = null;
      this.selectedCommodity = null;
      this.showSettings = false;
    },

    StartOver() {
      this.showNotification = false;
      this.isSerious = false;
      this.gameLoaded = true;
      this.gameOver = false;
      this.timeToEnd = 0;
      this.sortByPrice = false;
      this.sortByValue = false;
      this.sortByUnitsOwned = false;
      this.sortByReversePrice = false;
      this.currentBank = this.startingBank;
      this.bankFundsAdded = false;
      this.gamePaused = false;
      this.totalValue = 0;
      this.startValue = 0;
      this.commodities = [];
      this.timeToEnd = !UseDebug ? 365 : 365;
      this.gameSpeed = this.allSpeeds[0];
      this.selectedCommodity = null;
      this.displayedCommodity = new CommodityObject({});
      this.tipEngaged = false;
      this.tipTimer = 0;
      this.currentTip = '';
      this.tipHistory = [];
      this.tippedCommodity = undefined;
      this.showSEC = false;
      this.sortByWatched = false;
      this.sortByPrice = false;
      this.sortByValue = false;
      this.sortByUnitsOwned = false;
      this.sortByReversePrice = false;
      this.SelectThisPage(this.pages[0]);

      this.AssignCommidityData();
      this.GetHighestValueInLastSetForAllComms();
      this.gameInterval = window.setInterval(this.UpdateGame, this.gameSpeed);
      this.bankInterval = window.setInterval(this.Add10ToBank, 100);
    },

    ToggleGameSpeed() {
      if (this.gameSpeed === this.allSpeeds[0]) {
        this.gameSpeed = this.allSpeeds[1];
      } else if (this.gameSpeed === this.allSpeeds[1]) {
        this.gameSpeed = this.allSpeeds[2];
      } else if (this.gameSpeed === this.allSpeeds[2]) {
        this.gameSpeed = this.allSpeeds[0];
      }
      // this.gameSpeed = this.gameSpeed == 10000 ? 1000 : 10000;
      window.clearInterval(this.gameInterval);
      this.gameInterval = window.setInterval(this.UpdateGame, this.gameSpeed);
    },

    ToggleItemAsWatched(item) {
      item.isWatched = !item.isWatched;
      if (item.isWatched) {
        this.watchedItemCount++;
      } else {
        this.watchedItemCount--;
      }
    },

    ToggleMusic(_value) {
      this.muteAudio = _value;
      localStorage.setItem('muteAudio', this.muteAudio);
      let audio = document.getElementById('themeMusic');
      audio.volume = 0.05;
      audio.loop = true;
      if (this.muteAudio) {
        audio.pause();
      } else {
        audio.play();
      }
    },

    ToggleGamePlay(_value) {
      this.changeEveryDay = _value;
      localStorage.setItem('changeEveryDay', this.changeEveryDay);
    },

    BuyCommodity(amount) {
      if (amount == 'half') {
        var halfAmount = this.MathTheFee(amount);
        this.displayedCommodity.unitsOwned = Math.floor(this.displayedCommodity.unitsOwned + halfAmount / this.displayedCommodity.currentPrice.value);
        this.currentBank = this.currentBank - halfAmount - this.halfFee;
      } else {
        var fullAmount = this.MathTheFee(amount);
        this.displayedCommodity.unitsOwned = Math.floor(this.displayedCommodity.unitsOwned + fullAmount / this.displayedCommodity.currentPrice.value);
        this.currentBank = this.currentBank - fullAmount - this.fullFee;
      }
      this.displayedCommodity.currentPrice.isPurchasePrice = true;
      this.TallyCommodityValues();
      this.GetTotalGamerMarketValue();
      this.CheckGiftList();
    },

    SellAll() {
      this.commodities.forEach((commodity) => {
        this.SellNumberOfUnits(commodity, 'full');
      });
      this.TallyCommodityValues();
      this.GetTotalGamerMarketValue();
      this.CheckGiftList();
      this.totalValue = 0;
    },

    SellNumberOfUnits(commodity, amount) {
      var unitsToSell = amount == 'half' ? Math.floor(commodity.unitsOwned / 2) : commodity.unitsOwned;
      this.currentBank = this.currentBank + unitsToSell * commodity.currentPrice.value;
      commodity.unitsOwned = commodity.unitsOwned - unitsToSell;
      commodity.currentPrice.isSellPrice = true;
      this.TallyCommodityValues();
      this.GetTotalGamerMarketValue();
    },

    ChangeGameColor(theme) {
      this.themes.forEach((storedTheme) => {
        storedTheme.isSelected = false;
      });
      theme.isSelected = true;
      localStorage.setItem('theme', theme.name);
      this.r.style.setProperty('--hue', theme.hue);
      this.r.style.setProperty('--saturation', theme.saturation + '%');
      this.r.style.setProperty('--luminosity', theme.luminosity + '%');
      if (theme.darkAccentColor == null) {
        this.r.style.setProperty('--accentColor', theme.accentColor);
      } else {
        this.r.style.setProperty('--accentColor', this.useTheLightness ? theme.darkAccentColor : theme.accentColor);
      }
      this.currentTheme = theme;
    },

    NextColor() {
      let nextTheme = this.themes[0];
      this.themes.forEach((theme) => {
        if (theme.isSelected) {
          nextTheme = theme;
        }
      });
      let index = this.themes.indexOf(nextTheme);
      index++;
      if (index >= this.themes.length) {
        index = 0;
      }
      this.ChangeGameColor(this.themes[index]);
    },

    PreviousColor() {
      let previousTheme = this.themes[0];
      this.themes.forEach((theme) => {
        if (theme.isSelected) {
          previousTheme = theme;
        }
      });
      let index = this.themes.indexOf(previousTheme);
      index--;
      if (index < 0) {
        index = this.themes.length - 1;
      }
      this.ChangeGameColor(this.themes[index]);
    },

    ChangeGameLuminosity(light) {
      this.useTheLightness = light;
      localStorage.setItem('useTheLightness', this.useTheLightness);
      document.getElementById('theLightness').href = this.useTheLightness ? 'styles/lightness.css' : '';
      this.r.style.setProperty('--accentColor', this.useTheLightness ? this.currentTheme.darkAccentColor : this.currentTheme.accentColor);
    },

    CheckGiftList() {
      this.giftList.forEach((gift) => {
        this.commodities.forEach((com) => {
          if (com.name == gift.name) {
            gift.unitsOwned = com.unitsOwned;
            gift.giftFulfilled = gift.unitsOwned >= 100;
          }
        });
      });
      if (!this.giftEarned && this.giftList[0].unitsOwned >= 100 && this.giftList[1].unitsOwned >= 100 && this.giftList[2].unitsOwned >= 100 && this.giftList[3].unitsOwned >= 100) {
        this.CreateNotification('normal', 'You completed the quest!', 'Congratulations, you are now $20,000 richer.', 'Close', this.CloseNotification);
        this.ShowNotification();
        this.currentBank = this.currentBank + 20000;
        this.giftEarned = true;
      }
    },

    GenerateGiftList() {
      let bounty1 = new CommodityObject(this.commodities[getRandomInt(0, this.commodities.length)]);
      while (bounty1.isHeader) {
        bounty1 = new CommodityObject(this.commodities[getRandomInt(0, this.commodities.length)]);
      }
      let bounty2 = new CommodityObject(this.commodities[getRandomInt(0, this.commodities.length)]);
      while (bounty2.isHeader || bounty2.name == bounty1.name) {
        bounty2 = new CommodityObject(this.commodities[getRandomInt(0, this.commodities.length)]);
      }
      let bounty3 = new CommodityObject(this.commodities[getRandomInt(0, this.commodities.length)]);
      while (bounty3.isHeader || bounty3.name == bounty1.name || bounty3.name == bounty2.name) {
        bounty3 = new CommodityObject(this.commodities[getRandomInt(0, this.commodities.length)]);
      }
      let bounty4 = new CommodityObject(this.commodities[getRandomInt(0, this.commodities.length)]);
      while (bounty4.isHeader || bounty4.name == bounty1.name || bounty4.name == bounty2.name || bounty4.name == bounty3.name) {
        bounty4 = new CommodityObject(this.commodities[getRandomInt(0, this.commodities.length)]);
      }
      let bounty5 = new CommodityObject(this.commodities[getRandomInt(0, this.commodities.length)]);
      while (bounty5.isHeader || bounty5.name == bounty1.name || bounty5.name == bounty2.name || bounty5.name == bounty3.name || bounty5.name == bounty4.name) {
        bounty5 = new CommodityObject(this.commodities[getRandomInt(0, this.commodities.length)]);
      }
      this.giftList = [bounty1, bounty2, bounty3, bounty4, bounty5];
    },

    Currency(value) {
      return Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
    },

    FormatAsNumber(value) {
      return Intl.NumberFormat('en-US').format(value);
    },
    Share() {
      navigator.share({
        title: 'CommOddities!',
        text: 'Buy, sell, embrace or avoid corruption!',
        url: 'https://commoddities.games',
      });
    },
    RestorePreferences() {
      let incomingTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;
      if (incomingTheme != null) {
        this.themes.forEach((theme) => {
          if (theme.name == incomingTheme) {
            this.ChangeGameColor(theme);
          }
        });
      }
      let incomingLight = localStorage.getItem('useTheLightness') ? localStorage.getItem('useTheLightness') : null;
      if (incomingLight != null) {
        this.ChangeGameLuminosity(incomingLight != 'true' ? false : true);
      }

      let changeEveryDay = localStorage.getItem('changeEveryDay') ? localStorage.getItem('changeEveryDay') : null;
      if (changeEveryDay != null) {
        this.changeEveryDay = changeEveryDay == 'true';
      }

      document.getElementById('themeSource').src = 'audio/CommOdditiesTheme3.aac';
      let incomingMuteness = localStorage.getItem('muteAudio') ? localStorage.getItem('muteAudio') : null;
      if (incomingMuteness != null && incomingMuteness == 'false') {
        this.ToggleMusic();
      }
    },

    HandleMouseDown(event) {
      if (!this.muteAudio) {
        this.ToggleMusic(false);
      }
    },

    HandleKeyDown(event) {
      switch (event.key) {
        case 'Escape':
          if (!this.gameLoaded && this.showSettings) {
            this.showSettings = false;
          } else if (this.showTutorial) {
            this.EndTutorial();
          } else if (this.selectedCommodity !== null) {
            this.selectedCommodity = null;
          } else if (this.showNotification) {
            this.showNotification = false;
          } else if (!this.showSettings && this.gameLoaded && !this.gameOver) {
            this.showSettings = this.gamePaused = true;
          } else if (this.showSettings && this.gameLoaded && !this.gameOver) {
            this.showSettings = this.gamePaused = false;
          } else if (this.gameLoaded) {
            this.gameLoaded = false;
          }
          break;
        case 'Enter':
          break;
        case ']':
          this.NextColor();
          break;
        case '[':
          this.PreviousColor();
          break;
        case 'ArrowRight':
          this.AdvanceTutorial();
          break;
        case 'ArrowLeft':
          this.RewindTutorial();
          break;
        case '\\':
          this.ChangeGameLuminosity(!this.useTheLightness);
          break;
      }
    },
  },

  mounted() {
    this.RestorePreferences();
    window.addEventListener('mousedown', this.HandleMouseDown);
    window.addEventListener('keydown', this.HandleKeyDown);
    this.ringleaderinterval = window.setInterval(this.UpdateTipTimer, this.tipSpeed);
  },

  computed: {
    hasLostAlls: function () {
      let lostAlls = false;
      this.commodities.forEach((com) => {
        if (com.lostAll) {
          lostAlls = true;
        }
      });
      return lostAlls;
    },

    priceHistoryInReverse: function () {
      var reversed = [...this.displayedCommodity.priceHistory];
      return reversed.reverse();
    },

    commoditiesByName: function () {
      function compare(a, b) {
        if (a.rarity < b.rarity) return -1;
        if (a.rarity > b.rarity) return 1;
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      }
      return this.commodities.sort(compare);
    },

    commoditiesValue: function () {
      function compare(a, b) {
        if (a.rarity < b.rarity) return -1;
        if (a.rarity > b.rarity) return 1;
        if (a.currentValue < b.currentValue) return -1;
        if (a.currentValue > b.currentValue) return 1;
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      }
      return this.commodities.sort(compare);
    },

    commoditiesByPrice: function () {
      function compare(a, b) {
        if (a.currentPrice.value < b.currentPrice.value) return -1;
        if (a.currentPrice.value > b.currentPrice.value) return 1;
        return 0;
      }

      return this.commodities.sort(compare);
    },

    currentBankText: function () {
      return this.Currency(this.currentBank);
    },

    currentSpeed: function () {
      let speedText = '1x';
      if (this.gameSpeed !== this.allSpeeds[0]) {
        speedText = this.gameSpeed === this.allSpeeds[1] ? '5x' : '10x';
      }
      return `${speedText} speed`;
    },

    currentTimeLeft: function () {
      return `${this.timeToEnd} days`;
    },

    getLightness: function () {
      return this.useTheLightness;
    },

    finalValue: function () {
      return this.Currency(this.totalValue + this.currentBank);
    },

    finalTimeMessage: function () {
      if (!this.imeToEnd === 0) {
        return 'A year of trading has passed :)';
      } else if (this.timeToEnd < 0) {
        return "You ran out of time! You can't buy anything else :(";
      }
    },

    finalMessage: function () {
      if (this.currentBank + this.totalValue - 10 < 0) {
        return 'Pretty bad, better luck next time!';
      } else if (this.currentBank + this.totalValue - 10 >= 0 && this.currentBank + this.totalValue - 10 < 100) {
        return 'Not bad, could be better.';
      } else if (this.currentBank + this.totalValue - 10 >= 100 && this.currentBank + this.totalValue - 10 < 1000) {
        return "Pretty good, you're getting the hang of it.";
      } else if (this.currentBank + this.totalValue - 10 >= 1000 && this.currentBank + this.totalValue - 10 < 10000) {
        return "That's worth talking about!";
      } else if (this.currentBank + this.totalValue - 10 >= 10000 && this.currentBank + this.totalValue - 10 < 100000) {
        return "You figured something out, didn't you?";
      } else if (this.currentBank + this.totalValue - 10 >= 100000) {
        return "WHO'S A GAMER? YOU ARE!";
      }
    },
  },
});
