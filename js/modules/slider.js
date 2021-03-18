import {getZero} from '../services/services';

function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
    const slides = document.querySelectorAll(slide),
          slider = document.querySelector(container),
          dots = [],
          prev = document.querySelector(prevArrow),
          next = document.querySelector(nextArrow),
          slidesWrapper = document.querySelector(wrapper),
          slidesField = document.querySelector(field),
          width = window.getComputedStyle(slidesWrapper).width;

          const current = document.querySelector(currentCounter),
                total = document.querySelector(totalCounter);
          

          slidesField.style.width = 100 * slides.length + '%';

          slidesField.style.display = 'flex';
          slidesField.style.transition = '1s all';
          slidesWrapper.style.overflow = 'hidden';
          slides[0].classList.add('fade');

          slides.forEach(slide => {
              slide.style.width = width;
          });

          slider.style.position = 'relative';

          const indicators = document.createElement('ol');
                indicators.style.cssText = `
                    position: absolute;
                    right: 0;
                    bottom: 0;
                    left: 0;
                    z-index: 15;
                    display: flex;
                    justify-content: center;
                    margin-right: 15%;
                    margin-left: 15%;
                    list-style: none;
                `;
          slider.append(indicators);

          for (let i = 0; i < slides.length; i++) {
            const dot = document.createElement('li');
            dot.setAttribute('data-slide-to', i + 1);
            dot.style.cssText = `
                box-sizing: content-box;
                flex: 0 1 auto;
                width: 30px;
                height: 6px;
                margin-right: 3px;
                margin-left: 3px;
                cursor: pointer;
                background-color: #fff;
                background-clip: padding-box;
                border-top: 10px solid transparent;
                border-bottom: 10px solid transparent;
                opacity: .5;
                transition: opacity .6s ease;
            `
            if (i == 0) {
                dot.style.opacity = '1';
            }

            indicators.append(dot);
            dots.push(dot);
          }


          let slideIndex = 1,
              offset = 0;

              

              current.textContent = getZero(slideIndex);

              function sliderDots(dots, slideIndex) {
                dots.forEach(dots => {
                    dots.style.opacity = '.5';
                })
                dots[slideIndex - 1].style.opacity = '1';
              }

              function deleteStr(str) {
                  return +str.replace(/\D/g, '');
              }

          next.addEventListener('click', () => {
              if (offset == deleteStr(width) * (slides.length - 1)) {
                  offset = 0;
              } else {
                  offset += deleteStr(width);
              }
              slidesField.style.transform = `translateX(-${offset}px)`;

              if (slideIndex == slides.length) {
                  slideIndex = 1;
              } else {
                  slideIndex++;
              }
              current.textContent = getZero(slideIndex);

              sliderDots(dots, slideIndex)
          })

          prev.addEventListener('click', () => {
            if (offset == 0) {
                offset = deleteStr(width) * (slides.length - 1);
            } else {
                offset -= deleteStr(width);
            }
            slidesField.style.transform = `translateX(-${offset}px)`;

            if (slideIndex == 1) {
                slideIndex = slides.length;
            } else {
                slideIndex--;
            }
            current.textContent = getZero(slideIndex);

            sliderDots(dots, slideIndex)
        })

        dots.forEach(dot => {
            dot.addEventListener('click', (e => {
                const slideTo = e.target.getAttribute('data-slide-to');
                slideIndex = slideTo;
                offset = deleteStr(width) * (slideTo - 1);
                slidesField.style.transform = `translateX(-${offset}px)`;
                current.textContent = getZero(slideIndex);
                sliderDots(dots, slideIndex)
            }))
        })

        

        

        total.textContent = getZero(slides.length);

  function autoSlides() {
    if (offset == deleteStr(width) * (slides.length - 1)) {
        offset = 0;
        slidesField.style.transition = 'none';
        
    } else {
        offset += deleteStr(width);
        slidesField.style.transition = '1s all';
    }
    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex == slides.length) {
        slideIndex = 1
    } else {
        slideIndex++;
    }

    current.textContent = getZero(slideIndex);

    dots.forEach(dots => {
        dots.style.opacity = '.5';
    })
    dots[slideIndex - 1].style.opacity = '1';
    
  }

  setInterval(autoSlides, 3000);

}

export default slider;