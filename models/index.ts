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

interface ValueRep {
  image: string;
  value: number | string;
}
interface Component {
  valuesReps: Array<ValueRep>;
}

// Background
interface Background extends Component {}

// Date As Number
interface YearNumber extends Component {}
interface MonthNumber extends Component {}
interface DayNumber extends Component {}
interface Separator extends Component {}

// Time As Number
// Date As Text
// Time As Text
// Various metrics like steps, calories, distance, heartrate, spo2 etc
interface MetricIcon extends Component {}
interface MetricUnit extends Component {}
interface MetricNumber extends Component {}

interface Box {
  x: number;
  y: number;
  height: number;
  width: number;
  angle: number;
}

interface BoxGroup extends Box {
  children: Array<Box>;
}

interface BoxComponent {
  box: Box;
  component: Component;
}

interface WatchFace {
  width: number;
  height: number;
  boxes: Array<BoxComponent>;
}
