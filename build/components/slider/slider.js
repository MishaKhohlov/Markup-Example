import $ from 'jquery';
import 'slick-carousel';

export default class {
  constructor(elem) {
    this.elem = elem;
  }
  init() {
    $(this.elem).removeClass('hide');
    $(this.elem).slick({
      dots: true,
      infinite: true,
      autoplay: false,
      autoplaySpeed: 10000,
      speed: 500,
      fade: true,
      cssEase: 'linear'
    });
  }
}
