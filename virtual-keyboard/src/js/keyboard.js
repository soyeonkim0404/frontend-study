export class Keyboard {
  #switchEl;
  #fontSelectEl;
  #containerEl;
  #keyboardEl;
  #inputGroupEl;
  #inputEl;
  #keyPress = false;
  #mouseDown = false;
  constructor() {
    this.#assignElement();
    this.#addEvent();
  }

  #assignElement() {
    this.#containerEl = document.getElementById("container");
    this.#switchEl = this.#containerEl.querySelector("#switch");
    this.#fontSelectEl = this.#containerEl.querySelector("#font");
    this.#keyboardEl = this.#containerEl.querySelector("#keyboard");
    this.#inputGroupEl = this.#containerEl.querySelector("#input-group");
    this.#inputEl = this.#inputGroupEl.querySelector("#input");
  }

  #addEvent() {
    this.#switchEl.addEventListener("change", this.onChangeTheme);
    this.#fontSelectEl.addEventListener("change", this.onChangeFont);
    document.addEventListener("keydown", this.onKeydown.bind(this));
    document.addEventListener("keyup", this.onKeyup.bind(this));
    this.#inputEl.addEventListener("input", this.onInput.bind(this));
    this.#keyboardEl.addEventListener("mousedown", this.onMouseDown.bind(this));
    document.addEventListener("mouseup", this.onMouseUp.bind(this));
  }
  onChangeTheme(el) {
    document.documentElement.setAttribute(
      "theme",
      el.target.checked ? "dark-mode" : ""
    );
  }
  onChangeFont(el) {
    document.body.style.fontFamily = el.target.value;
  }
  onKeydown(el) {
    if (this.#mouseDown) return;
    this.#keyPress = true;
    this.#inputGroupEl.classList.toggle(
      "error",
      /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(el.key)
    );
    this.#keyboardEl
      .querySelector(`[data-code=${el.code}]`)
      ?.classList.add("active");
  }
  onKeyup(el) {
    if (this.#mouseDown) return;
    this.#keyPress = false;
    this.#keyboardEl
      .querySelector(`[data-code=${el.code}]`)
      ?.classList.remove("active");
  }
  onInput(el) {
    this.#inputEl.value = el.target.value.replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/, "");
  }
  onMouseDown(el) {
    // ?. = optional change
    if (this.#keyPress) return;
    this.#mouseDown = true;
    el.target.closest("div.key")?.classList.add("active");
  }
  onMouseUp(el) {
    if (this.#keyPress) return;
    this.#mouseDown = false;
    const keyEl = el.target.closest("div.key");
    const isActive = !!keyEl?.classList.contains("active"); //contains = hasClass
    const val = keyEl?.dataset.val;
    if (isActive && !!val && val !== "Space" && val !== "Backspace") {
      this.#inputEl.value += val;
    }
    if (isActive && val === "Space") {
      this.#inputEl.value += "";
    }
    if (isActive && val === "Backspace") {
      this.#inputEl.value = this.#inputEl.value.slice(0, -1);
    }
    this.#keyboardEl.querySelector(".active")?.classList.remove("active");
  }
}
