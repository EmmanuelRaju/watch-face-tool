export interface Box {
  width: number;
  height: number;
  top: number;
  left: number;
  angle: number;
}

export interface Image {
  src: string;
}

export interface Trait {
  traitValue: TraitValue;
  image: Image;
}

export interface TraitValue {}

export interface Bg {
  backdrop: BgBackdrop;
}
export interface Date {
  dateNumber: DateNumber;
  dateText: DateText;
}
export interface DateNumber {
  month: number;
  year: number;
  day: number;
}
export interface DateText {}
export interface Time {
  timeDigital: TimeDigital;
  timeAnalog: TimeAnalog;
}
export interface TimeDigital {}
export interface TimeAnalog {}
export interface Widget {}
export interface WidgetIcon {}
export interface WidgetNumber {}
export interface WidgetUnit {}
export interface BgBackdrop {}
