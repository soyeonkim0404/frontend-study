// TODO: 이 곳에 정답 코드를 작성해주세요.
/*
1. 페이지가 로드 된 시점에 ID입력 창에 Focus가 되어야 한다.
대상 : id input
시점 : 페이지가 로드 되었을 때
이벤트 : focus()
*/

const $id = document.getElementById('id')
const $idMsg = document.getElementById('id-msg')
window.addEventListener('load', () => $id.focus())

/*
2. 유효성 검사 로직
대상 : 아이디, 비번, 비번 확인 input
시점 : input focus out / 가입하기 버튼 클릭시
핸들러 : 해당 인풋의 유효성 검사 / 모든 필드의 유효성 검사
*/

const $password = document.getElementById('pw')
const $passwordMsg = document.getElementById('pw-msg')
const $passwordChk = document.getElementById('pw-check')
const $passwordChkMsg = document.getElementById('pw-check-msg')

const ID_REGEX = new RegExp('^[a-z0-9_-]{5,20}$')
const PW_REGEX = new RegExp('^[a-zA-Z0-9]{8,16}$')

const ERROR_MSG = {
    required: '필수 정보입니다.',
    invaildId:
        '5~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다.',
    invaildPw: '8~16자 영문 대 소문자, 숫자를 사용하세요.',
    invaildPwChk: '비밀번호가 일치하지 않습니다.',
}

const checkRegex = (target) => {
    const { value, id } = target // 구조분해 할당
    if (value.length === 0) {
        return 'required'
    } else {
        switch (id) {
            case 'id':
                return ID_REGEX.test(value) ? true : 'invaildId'
            case 'pw':
                return PW_REGEX.test(value) ? true : 'invaildPw'
            case 'pw-check':
                return $password.value === value ? true : 'invaildPwChk'
        }
    }
}

const checkValidation = (target, msgTarget) => {
    const isValid = checkRegex(target)
    if (isValid !== true) {
        target.classList.add('border-red-600')
        msgTarget.innerText = ERROR_MSG[isValid]
    } else {
        target.classList.remove('border-red-600')
        msgTarget.innerText = ''
    }
}

$id.addEventListener('focusout', () => checkValidation($id, $idMsg))
$password.addEventListener('focusout', () =>
    checkValidation($password, $passwordMsg)
)
$passwordChk.addEventListener('focusout', () =>
    checkValidation($passwordChk, $passwordChkMsg)
)

const joinBtn = document.getElementById('submit')
const $modal = document.getElementById('modal')

const $confirmId = document.getElementById('confirm-id')
const $confirmPw = document.getElementById('confirm-pw')

const $cancelBtn = document.getElementById('cancel-btn')
const $approveBtn = document.getElementById('approve-btn')

joinBtn.addEventListener('click', (e) => {
    e.preventDefault()
    const isValidForm =
        checkValidation($id, $idMsg) === true &&
        checkValidation($password, $passwordMsg) === true &&
        checkValidation($passwordChk, $passwordChkMsg) === true
    if (isValidForm) {
        $confirmId.innerText = $id.value
        $confirmPw.innerText = $password.value
        $modal.showModal()
    }
})

$cancelBtn.addEventListener('click', () => {
    $modal.close()
})
$approveBtn.addEventListener('click', () => {
    window.alert('가입되었습니다.')
    $modal.close()
})

// 폰트사이즈 조절
const increaseFont = document.getElementById('increase-font-btn')
const decreaseFont = document.getElementById('decrease-font-btn')
const $html = document.documentElement

const MAX_FONT_SIZE = 20
const MIN_FONT_SIZE = 12

const getHtmlFontSize = () => {
    return parseFloat(window.getComputedStyle($html).fontSize)
}

increaseFont.addEventListener('click', () => fontSizeEvt('increase'))
decreaseFont.addEventListener('click', () => fontSizeEvt('decrease'))

const fontSizeEvt = (el) => {
    const fontSize = getHtmlFontSize()
    let newFontSize = el === 'increase' ? fontSize + 1 : fontSize - 1
    $html.style.fontSize = newFontSize
    decreaseFont.disabled = newFontSize <= MIN_FONT_SIZE
    increaseFont.disabled = newFontSize >= MAX_FONT_SIZE
}
