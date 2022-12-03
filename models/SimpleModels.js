class PriceObject {
  constructor(spec) {
    this.value = spec.value == undefined ? 0 : spec.value;
    this.isPurchasePrice = spec.isPurchasePrice == undefined ? false : spec.isPurchasePrice;
    this.isSellPrice = spec.isSellPrice == undefined ? false : spec.isSellPrice;
  }
}

class PageObject {
  constructor(spec) {
    this.name = spec.name == undefined ? 0 : spec.name;
    this.isSelected = spec.isSelected == undefined ? false : spec.isSelected;
    this.isDisabled = spec.isDisabled == undefined ? true : spec.isDisabled;
    this.isShown = spec.isShown == undefined ? true : spec.isShown;
  }
}

class NotificationObject {
  constructor(spec) {
    this.title = spec.title == undefined ? '' : spec.title;
    this.subtitle = spec.subtitle == undefined ? '' : spec.subtitle;
    this.type = spec.type == undefined ? 'normal' : spec.type;
    this.button1Text = spec.button1Text == undefined ? 'Close' : spec.button1Text;
    this.button1CallBack = spec.button1CallBack == undefined ? null : spec.button1CallBack;
    this.button2Text = spec.button2Text == undefined ? '' : spec.button2Text;
    this.button2CallBack = spec.button2CallBack == undefined ? null : spec.button2CallBack;
  }
}
