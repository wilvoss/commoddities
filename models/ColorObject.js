class ColorObject {
  constructor(spec) {
    this.name = spec.name == undefined ? '' : spec.name;
    this.hue = spec.hue == undefined ? '' : spec.hue;
    this.saturation = spec.saturation == undefined ? '' : spec.saturation;
    this.luminosity = spec.luminosity == undefined ? '' : spec.luminosity;
    this.isSelected = spec.isSelected == undefined ? false : spec.isSelected;
    this.accentColor = spec.accentColor == undefined ? 'hsl(158, 100%, 50%)' : spec.accentColor;
    this.darkAccentColor = spec.darkAccentColor == undefined ? 'hsl(158, 100%, 20%)' : spec.darkAccentColor;
    this.textColor = spec.textColor == undefined ? 'white' : spec.textColor;
  }
}

const Themes = [
  new ColorObject({
    name: 'Wintro',
    hue: 190,
    saturation: 90,
    luminosity: 50,
    isSelected: true,
  }),
  new ColorObject({
    name: 'Sprigs',
    hue: 120,
    saturation: 30,
    luminosity: 50,
    accentColor: 'hsl(183, 100%, 50%)',
  }),
  new ColorObject({
    name: 'Sumet',
    hue: 35,
    saturation: 45,
    luminosity: 50,
    accentColor: 'hsl(183, 100%, 50%)',
  }),
  new ColorObject({
    name: 'Altum',
    hue: 0,
    saturation: 40,
    luminosity: 50,
  }),
  new ColorObject({
    name: 'Emet',
    hue: 310,
    saturation: 50,
    luminosity: 50,
  }),
  new ColorObject({
    name: 'Pia',
    hue: 240,
    saturation: 40,
    luminosity: 50,
  }),
  new ColorObject({
    name: 'Hi-C',
    hue: 310,
    saturation: 0,
    luminosity: 50,
  }),
];
