type ColorDataCommandValueType = {
  /**Hue (h): 0–360  ** 360 - red | 0 - green | 220 - blue (Possibly)*/
  h: Number;
  /**Saturation (s): 0–1000*/
  s: Number;
  /**Value (v): 0–1000 ** Bellow 10 - Means Off*/
  v: Number;
};

export type ControlDataCommandValueType = {
  /**Change_mode: the color mode that changes among the [“direct”,“gradient”] options.*/
  change_mode: 'direct' | 'gradient';
  /**Temperature: The color temperature ranges from 0 to 1000.*/
  temperature: Number;
  /**Bright: The brightness value ranges from 0 to 1000.*/
  bright: Number;
} & ColorDataCommandValueType;
type SwitchLEDCommandType = {
  code: 'switch_led';
  value: Boolean;
};
type BrightValueCommandType = {
  code: 'bright_value_v2';
  value: Number;
};
type ColorDataCommandType = {
  code: 'colour_data_v2';
  value: ColorDataCommandValueType;
};

type ControlDataCommandType = {
  code: 'control_data';
  value: ControlDataCommandValueType;
};

export type ChangeColorRequestType = {
  commands:
    | SwitchLEDCommandType[]
    | BrightValueCommandType[]
    | ColorDataCommandType[]
    | ControlDataCommandType[];
};
