require('es6-promise').polyfill();

      import   tabs from './modules/tabs';
      import   timer from './modules/timer';
      import   slider from './modules/slider';
      import   calculator from './modules/calculator';
      import   forms from './modules/forms';
      import   cards from './modules/cards';
      import   modal from './modules/modal';
      import   {openModal} from './modules/modal';

window.addEventListener('DOMContentLoaded', function() {

      const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 3000000);

         tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
         timer('.timer', '2021-06-15');
         slider({
               container: '.offer__slider',
               nextArrow: '.offer__slider-next',
               prevArrow: '.offer__slider-prev',
               slide: '.offer__slide',
               totalCounter: '#total',
               currentCounter: '#current',
               wrapper: '.offer__slider-wrapper',
               field: '.offer_slider-inner'
         });
     

         calculator();

         forms('form', modalTimerId);
         modal('[data-modal]', '.modal', modalTimerId);
         cards();


});