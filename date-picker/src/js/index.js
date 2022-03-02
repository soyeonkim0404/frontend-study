class DatePicker {
  monthData = [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ];

  calendarData = {
    data: '',
    date: 0,
    month: 0,
    year: 0,
  };

  selectData = {
    data: '',
    date: 0,
    month: 0,
    year: 0,
  };

  dataPickerEl;
  dataInputEl;
  calendarEl;
  calendarMonthEl;
  monthContentEl;
  nextBtnEl;
  prevBtnEl;
  calendarDatesEl;

  constructor() {
    this.initCalendarData();
    this.initSelectedDate();
    this.assignElement();
    this.setDateInput();
    this.addEvent();
  }

  initSelectedDate(){
    this.selectData = {...this.calendarData};
  }

  setDateInput(){
    this.dataInputEl.textContent = this.formateDate(this.selectData.data);
    this.dataInputEl.dataset.value = this.selectData.data;
  }

  initCalendarData() {
    const data = new Date();
    const date = data.getDate();
    const month = data.getMonth();
    const year = data.getFullYear();

    this.calendarData = {
      data,
      date,
      month,
      year,
    };
  }

  assignElement() {
    this.dataPickerEl = document.getElementById('date-picker');
    this.dataInputEl = this.dataPickerEl.querySelector('#date-input');
    this.calendarEl = this.dataPickerEl.querySelector('#calendar');
    this.calendarMonthEl = this.dataPickerEl.querySelector('#month');
    this.monthContentEl = this.calendarMonthEl.querySelector('#content');
    this.nextBtnEl = this.calendarMonthEl.querySelector('#next');
    this.prevBtnEl = this.calendarMonthEl.querySelector('#prev');
    this.calendarDatesEl = this.calendarEl.querySelector('#dates');
  }

  addEvent() {
    this.dataInputEl.addEventListener('click', this.toggleCalendar.bind(this));
    this.nextBtnEl.addEventListener('click', this.moveToNextMonth.bind(this));
    this.prevBtnEl.addEventListener('click', this.moveToPrevMonth.bind(this));
    this.calendarDatesEl.addEventListener('click', this.onClickSelectDate.bind(this));
  }

  //날짜 클릭시 input에 출력
  onClickSelectDate(event){
    const eventTarget = event.target;
    if(eventTarget.dataset.date){
      this.calendarDatesEl.querySelector('.selected')?.classList.remove('selected');
      eventTarget.classList.add('selected');
      this.selectData = {
        data: new Date(this.calendarData.year, this.calendarData.month, eventTarget.dataset.date),
        date: eventTarget.dataset.date,
        month: this.calendarData.month,
        year: this.calendarData.year,
      };
      this.setDateInput();
      this.calendarEl.classList.remove('active');
    }
  }

  // 년/월/일 세팅
  formateDate(dateData){
    let date = dateData.getDate();
    if(date < 10){
      date = `0${date}`;
    }
    let month = dateData.getMonth() + 1;
    if(month < 10){
      month = `0${month}`;
    }
    let year = dateData.getFullYear();
    return `${year}/${month}/${date}`
  }

  // 다음달
  moveToNextMonth() {
    this.calendarData.month++;
    if(this.calendarData.month > 11){
      this.calendarData.month = 0;
      this.calendarData.year++;
    }
    this.updateMonth();
    this.updateDates();
  }

  // 이전달
  moveToPrevMonth() {
    this.calendarData.month--;
    if(this.calendarData.month < 0){
      this.calendarData.month = 11;
      this.calendarData.year--;
    }
    this.updateMonth();
    this.updateDates();
  }

  // 캘린더 토글
  toggleCalendar() {
    if(this.calendarEl.classList.contains('active')){
      this.calendarData = {...this.selectData};
    }
    this.calendarEl.classList.toggle('active');
    this.updateMonth();
    this.updateDates();
  }

  // 월 표시
  updateMonth() {
    this.monthContentEl.textContent = `
    ${this.calendarData.year} 
    ${this.monthData[this.calendarData.month]}
    `;
  }

  //일 표시
  updateDates() {
    this.calendarDatesEl.innerHTML = '';
    const numberOfDates = new Date(
      this.calendarData.year,
      this.calendarData.month + 1,
      0,
    ).getDate();

    const fragment = new DocumentFragment();

    for (let i = 0; i < numberOfDates; i++) {
      const dateEl = document.createElement('div');
      dateEl.classList.add('date');
      dateEl.textContent = i + 1;
      dateEl.dataset.date = i + 1;
      fragment.appendChild(dateEl);
    }
    fragment.firstChild.style.gridColumnStart =
      new Date(this.calendarData.year, this.calendarData.month, 1).getDay() + 1;
    this.calendarDatesEl.appendChild(fragment);
    this.colorSaturday();
    this.colorSunday();
    this.markToday();
    this.markSelectedDate();
  }

  markSelectedDate(){
    if(this.selectData.year === this.calendarData.year && this.selectData.month === this.calendarData.month){
      this.calendarDatesEl.querySelector(`[data-date='${this.selectData.date}']`).classList.add('selected');
    }
  }

  colorSaturday() {
    const saturdayEls = this.calendarDatesEl.querySelectorAll(
      `.date:nth-child(7n+${
        7 -
        new Date(this.calendarData.year, this.calendarData.month, 1).getDay()
      })`,
    );
    for (let i = 0; i < saturdayEls.length; i++) {
      saturdayEls[i].style.color = 'blue';
    }
  }
  colorSunday() {
    const sundayEls = this.calendarDatesEl.querySelectorAll(
      `.date:nth-child(7n+${
        (8 -
          new Date(
            this.calendarData.year,
            this.calendarData.month,
            1,
          ).getDay()) %
        7
      })`,
    );
    for (let i = 0; i < sundayEls.length; i++) {
      sundayEls[i].style.color = 'red';
    }
  }
  markToday() {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const today = currentDate.getDate();

    if (
      currentYear === this.calendarData.year &&
      currentMonth === this.calendarData.month
    ) {
      this.calendarDatesEl
        .querySelector(`[data-date='${today}']`)
        .classList.add('today');
    }
  }
}

new DatePicker();
