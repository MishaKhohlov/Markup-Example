import SliderMain from './components/slider/slider';
import Maps from './components/maps/maps';

const sliderMain = new SliderMain('.slider');

const mapItem = new Maps(44.9880443, 34.23392476, 10, 'Test', 'test');

sliderMain.init();
mapItem.init();
