export default class ImageSlider{
  #currentPosition = 0;
  #sliderNumber = 0;
  #slideWidth = 0;
  slidWrapEl;
  sliderListEl;
  nextBtnEl;
  previousBtnEl;
  indicatorWrapEl;
  controlWrapEl;
  #intervalId;
  #autoplay = true;

  constructor() {
    this.assignElement();
    this.initSliderNumber();
    this.initSlideWidth();
    this.initSliderListWidth();
    this.addEvent();
    this.createIndicator();
    this.setIndicator();
    this.initAutoplay();
  }
  assignElement(){
    this.slidWrapEl = document.getElementById('slider-wrap');
    this.sliderListEl = this.slidWrapEl.querySelector('#slider');
    this.nextBtnEl = this.slidWrapEl.querySelector('#next');
    this.previousBtnEl = this.slidWrapEl.querySelector('#previous');
    this.indicatorWrapEl = this.slidWrapEl.querySelector('#indicator-wrap');
    this.controlWrapEl = this.slidWrapEl.querySelector('#control-wrap');
  }

  initSliderNumber(){
    this.#sliderNumber = this.sliderListEl.querySelectorAll('li').length;
  }
  initSlideWidth(){
    this.#slideWidth = this.sliderListEl.clientWidth;
  }

  initSliderListWidth(){
    this.sliderListEl.style.width = `${this.#sliderNumber * this.#slideWidth}px`;
  }

  addEvent(){
    this.nextBtnEl.addEventListener('click', this.moveToRight.bind(this));
    this.previousBtnEl.addEventListener('click', this.moveToLeft.bind(this));
    this.indicatorWrapEl.addEventListener('click', this.onClickIndicator.bind(this));
    this.controlWrapEl.addEventListener('click', this.togglePlay.bind(this));
  }

  moveToRight(){
    this.#currentPosition++;
    if(this.#currentPosition === this.#sliderNumber){
      this.#currentPosition = 0;
    }
    this.sliderListEl.style.left = `-${this.#slideWidth * this.#currentPosition}px`;
    if(this.#autoplay){
      clearInterval(this.#intervalId);
      this.#intervalId = setInterval(this.moveToRight.bind(this), 3000);
    }
    this.setIndicator();
  }
  moveToLeft(){
    this.#currentPosition--;
    if(this.#currentPosition < 0){
      this.#currentPosition = this.#sliderNumber - 1;
    }
    this.sliderListEl.style.left = `-${this.#slideWidth * this.#currentPosition}px`;
    if(this.#autoplay){
      clearInterval(this.#intervalId);
      this.#intervalId = setInterval(this.moveToLeft.bind(this), 3000);
    }
    this.setIndicator();
  }

  createIndicator(){
    const docFragment = document.createDocumentFragment();
    for(let i = 0; i < this.#sliderNumber; i++){
      const li = document.createElement('li');
      li.dataset.index = i;
      docFragment.appendChild(li);
    }
    this.indicatorWrapEl.querySelector('ul').appendChild(docFragment);
  }

  setIndicator(){
    this.indicatorWrapEl.querySelector('li.active')?.classList.remove('active');
    this.indicatorWrapEl.querySelector(`ul li:nth-child(${this.#currentPosition + 1})`).classList.add('active')
  }

  onClickIndicator(el){
    const indexPosition = parseInt(el.target.dataset.index, 10);
    if(Number.isInteger(indexPosition)){
      this.#currentPosition = indexPosition;
      this.sliderListEl.style.left = `-${this.#slideWidth * this.#currentPosition}px`
    }
    this.setIndicator();
  }

  initAutoplay(){
    this.#intervalId = setInterval(this.moveToRight.bind(this), 3000);
  }

  togglePlay(el){
    if(el.target.dataset.status === 'play'){
      this.#autoplay = true;
      this.controlWrapEl.classList.add('play');
      this.controlWrapEl.classList.remove('pause');
      this.initAutoplay();
    }else if(el.target.dataset.status === 'pause'){
      this.#autoplay = false;
      this.controlWrapEl.classList.add('pause');
      this.controlWrapEl.classList.remove('play');
      clearInterval(this.#intervalId);
    }
  }
}
