const track = document.querySelector('.carousel__track');
const slides = Array.from(track.children);
const nextBtn = document.querySelector('.carousel__btn--r');
const prevBtn = document.querySelector('.carousel__btn--l');
const indicators = document.querySelector('.carousel__nav');
const indicator = Array.from(indicators.children);
const slideWidth = slides[0].getBoundingClientRect().width;

const setSlidePosition = (slide, i) => (slide.style.left = `${slideWidth * i}px`);
slides.map(setSlidePosition);

const moveSlide = (currentSlide, targetSlide) => {
  track.style.transform = `translateX(-${targetSlide.style.left})`;
  currentSlide.classList.remove('current-slide');
  targetSlide.classList.add('current-slide');
}

const updateDots = (currentDot, targetDot) => {
  currentDot.classList.remove('carousel__active');
  targetDot.classList.add('carousel__active');
}

const showHideArrows = (targetIndex, slides) => {
  if(targetIndex === 0) {
    prevBtn.classList.add('isHidden');
    nextBtn.classList.remove('isHidden');
  } else if(targetIndex === slides.length - 1){
    nextBtn.classList.add('isHidden');
    prevBtn.classList.remove('isHidden');
  } else {
    prevBtn.classList.remove('isHidden');
    nextBtn.classList.remove('isHidden');
  }
}

const prevFun = (e) => {
  const currentSlide = track.querySelector('.current-slide');
  const prevSlide = currentSlide.previousElementSibling;
  const currentDot = indicators.querySelector('.carousel__active');
  const prevDot = currentDot.previousElementSibling;
  const prevIndex = slides.findIndex(slide => slide === prevSlide);
  
  moveSlide(currentSlide, prevSlide);
  updateDots(currentDot, prevDot);
  showHideArrows(prevIndex, slides);
}

const nextFun = (e) => {
  const currentSlide = track.querySelector('.current-slide');
  const nextSlide = currentSlide.nextElementSibling;
  const currentDot = indicators.querySelector('.carousel__active');
  const nextDot = currentDot.nextElementSibling;
  const nextIndex = slides.findIndex(slide => slide === nextSlide);
  
  moveSlide(currentSlide, nextSlide);
  updateDots(currentDot, nextDot);
  showHideArrows(nextIndex, slides);
}

window.addEventListener('keydown', e => {
  if(e.key === 'ArrowRight') {
    nextFun();
  } else if(e.key === 'ArrowLeft') {
    prevFun();
  }
})

prevBtn.addEventListener('click', prevFun);

nextBtn.addEventListener('click', nextFun);

indicators.addEventListener('click', e => {
  const targetDot = e.target.closest('button');
  
  if(!targetDot) return;
  
  const currentSlide = track.querySelector('.current-slide');
  const currentDot = indicators.querySelector('.carousel__active');
  const targetIndex = indicator.findIndex(dot => dot === targetDot);
  const targetSlide = slides[targetIndex];
  
  moveSlide(currentSlide, targetSlide);
  
  updateDots(currentDot, targetDot);
  showHideArrows(targetIndex, slides);
})


