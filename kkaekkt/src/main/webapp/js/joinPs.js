//정규식
const regNo = /^[0-9]+$/; // 숫자만
const regHg = /^[가-힣]+$/; // 한글만
const regEng = /^[a-zA-Z]+$/; //영어만
// const regId = /^[A-Za-z0-9]{6,15}$/;
// 아이디 : 최소 알파벳 하나, 숫자 조합으로 6~15자, 숫자만 불가능
const regId = /(?=.*\d{0,})(?=.*[a-z]{1,}).{6,15}/;
const regPw = /^.*(?=^.{8,16}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
const regName = /^[가-힝a-zA-Z]{2,}$/;
const regEmail = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
const regBth = /^(19[0-9][0-9]|20\d{2})(0[0-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])$/;
const regPh = /^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}$/; // 전화번호 형태 : 전화번호 형태 000-0000-0000 만 받는다.
const regMailCode = /^[0-9]{6}$/;

const $id = document.getElementById("id");
const $pw = document.getElementById("pw");
const $repw = document.getElementById("repw");
const $name = document.getElementById("name");
const $birth = document.getElementById("birth");
const $phone = document.getElementById("phone");
const $address = document.getElementById("address");
const $email = document.getElementById("email");
// submit
let formatpw = 0;
let formatbirth = 0;
let formatad = 0;
let formatph = 0;
let formatemail = 0;
let formatemailNum = 0;
let formatidchk = 0;

let mailCode;

//타이머 전역변수 지정
function $ComTimer() {}
$ComTimer.prototype = {
  comSecond: "",
  timer: "",
  domId: "",
  fnTimer: function () {
    let min = Math.floor(this.comSecond / 60);
    let sec = this.comSecond % 60;
    this.domId.innerText = `${min}:${sec < 10 ? `0${sec}` : sec}`;
    this.comSecond--; // 1초씩 감소
    if (this.comSecond < 0) {
      // 시간이 종료 되었으면..
      clearInterval(this.timer); // 타이머 해제
      alert("인증시간이 초과하였습니다. 다시 이메일 인증을 해 주세요.");
      document.getElementById("timeout").style.display="none";
      document.querySelector(".mail_check_input").disabled="true";
      document.querySelector(".mail_check_input").id="mail_check_input_box_false";
      document.getElementById("mail_check").disabled="true";
    }
  },
};
let AuthTimer = new $ComTimer();

// 이메일 입력형식 확인
document.getElementById("btn_checkemail").onclick = function () {
  //console.log(formatemail);
  if (formatemail == 1) {
    // emailApi(); //ajax 실행
    emailDuplChk();
  } else {
    alert("이메일을 정확하게 입력하세요.");
  }
};
// 인증번호 이메일 전송
function emailApi() {
  //console.log("이메일인증 클릭");
  const email=document.querySelector(".mail_input").value; //입력한 이메일
  $.ajax({
    type: "GET",
    url: "/mailCheck.do?email=" + email,
    success: function (data) {
      ////console.log("data : " + data);
      document.querySelector(".mail_check_input").disabled='false';
      document.getElementById("mail_check").disabled = false;
      document.querySelector(".mail_check_input").id="mail_check_input_box_true";
      alert(" 인증번호를 전송했습니다.");
      timerStart();
      mailCode = data;
    },
  });
}
// 인증번호 이메일 전송
function emailDuplChk() {
  $.ajax({
    url: "/findemail.do",
    type: "POST",
    data: {
      email: $email.value,
    },
    success: function (data) {
      const key = JSON.parse(data);
      if (key != 0) {
        alert("해당 이메일로 가입된 아이디가 존재합니다.");
        return false;
      } else if (key == 0) {
        emailApi();
      }
    },
    // error: function (request, status, error) {
    //   //console.log(
    //     "code:" +
    //       request.status +
    //       "\n" +
    //       "message:" +
    //       request.responseText +
    //       "\n" +
    //       "error:" +
    //       error
    //   );
    // },
  });
}

function timerStart() {
  AuthTimer.comSecond = 180;
  AuthTimer.timer = setInterval(function () {
    AuthTimer.fnTimer();
  }, 1000);
  AuthTimer.domId = document.getElementById("timeout");
}
function timeStop() {
  clearInterval(AuthTimer.timer);
}

/* 인증번호 비교 */
document.getElementById("mail_check").onclick = function () {
  checkemailNum();
};

// 인증코드 맞는지 확인 (인증하기 버튼 클릭시 실행)
function checkemailNum() {
  const $inputCode =document.querySelector(".mail_check_input").value; // 입력코드
  if (regMailCode.test($inputCode)) {
    if ($inputCode == mailCode) {
      timeStop();
      formatemailNum = 1;
      alert("이메일 인증이 완료되었습니다.");
      const $timeout=document.getElementById("timeout");
      $timeout.style.display="none";
      document.querySelector(".mail_check_input").value='';
      document.querySelector(".mail_check_input").disabled=true;
      document.getElementById("mail_check").disabled=true;
      // 적용안되는중
      document.getElementById("btn_checkemail").disabled=true;
      document.querySelector(".mail_check_input").value="인증이 완료되었습니다.";
    } else if ($timeout.innerText != "0:00") {
      //시간이 남았는데 코드가 일치하지 않는다면
      formatemailNum = 0;
      alert("인증번호가 일치하지 않습니다.");
    }
  } else {
    //코드가 숫자 6자리가 아니라면
    formatemailNum = 0;
    alert(" 인증번호를 다시 확인해주세요.");
    document.getElementById("reqinput").className="incorrect";
  }
}

// 온로드
window.addEventListener("load",()=>{
  initKeyEvent();
});

function initKeyEvent() {
  // id
  $id.addEventListener("keyup", () => {//중복검사 이후 아이디를 변경할 경우를 대비함
    formatidchk = 0;
  });

  // pw
  $pw.addEventListener("keyup", () => {
    if (!regPw.test($pw.value)) {
      if ($pw.value.length == 0) {
        document.getElementById("pw_label").innerText = "";
      } else {
        document.getElementById("pw_label").innerText =
          "비밀번호를 특수문자,문자,숫자 포함 8~16자리 이내로 입력하세요.";
      }
    } else {
      document.getElementById("pw_label").innerText = "";
    }
  });

  // re pw
  $repw.addEventListener("keyup", () => {
    if ($repw.value != pw.value) {
      document.getElementById("repw_label").innerText =
        "위 비밀번호와 일치하지 않습니다.";
    } else {
      formatpw = 1;
      document.getElementById("repw_label").innerText = "";
    }
  });
//생년월일 입력형식 확인
  $birth.addEventListener("keyup", () => {
    // let formatbirth = 0;
    formatbirth = 0;
    //20210101
    if (!regBth.test($birth.value)) {
      if ($birth.value.length == 0) {
        document.getElementById("birth_label").innerText = "";
      } else {
        document.getElementById("birth_label").innerText =
          "생년월일을 양식에 맞춰 입력하세요.  ex) 19990101";
      }
      //   formatbirth = 0;
    } else {
      formatbirth = 1;
      document.getElementById("birth_label").innerText = "";
    }
  });
//전화번호 입력형식 확인
  $phone.addEventListener("keyup", () => {
    formatph = 0;
    if (!regPh.test($phone.value)) {
      if ($phone.value.length == 0) {
        document.getElementById("phone_label").innerText = "";
      } else {
        document.getElementById("phone_label").innerText =
          "연락 가능한 번호를 양식에 맞춰 입력하세요.";
      }
    } else {
      formatph = 1;
      document.getElementById("phone_label").innerText = "";
    }
  });
  // 이메일 입력형식 확인
  $email.addEventListener("keyup", () => {
    formatemail = 0;
    if (!regEmail.test($email.value)) {
      if ($email.value.length == 0) {
        document.getElementById("checkemail").innerText = "";
      } else {
        document.getElementById("checkemail").innerText =
          "이메일을 양식에 맞춰 입력하세요.";
      }
    } else {
      formatemail = 1;
      document.getElementById("checkemail").innerText = "";
    }
  });
  // Jquery, 입력시 불가 문자 삭제
  //아이디 한글입력 안되게 처리 */
  document.querySelector("input[name=id]").addEventListener("keyup",(event)=>{
    if (!(event.keyCode >= 37 && event.keyCode <= 40)) {
      const inputVal = event.target.value;
      event.target.value=inputVal.replace(/[^a-z0-9]/gi, "");
    }
  });
  // 이름 영어+한글만 입력
  document.querySelector("input[name=name]").addEventListener("keyup",(event)=>{
    if (!(event.keyCode >= 37 && event.keyCode <= 40)) {
      const inputVal = event.target.value;
      event.target.value=
        inputVal.replace(/^[0-9]+$|[ \[\]{}()<>?|`~!@#$%^&*-_+=,.;:\"\\]/gi, "");//영어+한글만 인력
    }
  });
  // 폰넘버 숫자+하이픈
  document.querySelector("input[name=phone]").addEventListener("keyup",(event)=>{
    if (!(event.keyCode >= 37 && event.keyCode <= 40)) {
      const inputVal = event.target.value;
      event.target.value=inputVal.replace(/[^0-9-]$/gi, "");
    }
  });
  //생일 숫자만
  document.querySelector("input[name=birth]").addEventListener("keyup",(event)=>{
    if (!(event.keyCode >= 37 && event.keyCode <= 40)) {
      const inputVal = event.target.value;
      event.target.value=inputVal.replace(/[^0-9]/gi, "");
    }
  });
  // 이메일 영어+숫자
  document.querySelector("input[name=email]").addEventListener("keyup",(event)=>{
    if (!(event.keyCode >= 37 && event.keyCode <= 40)) {
      const inputVal = event.target.value;
      event.target.value = inputVal.replace(/[^a-z0-9+$|[ \[\]{}()<>?|`~!#$%^&*-_+=,.;:\"\\]/gi,"");
    }
  });
} // window onload

// 중복확인
$id.addEventListener("focusout",()=>{
  let idLbl = document.getElementById("id_label");
  idLbl.style.color = "var(--text-red)";
  if ($id.value == "") {
    // alert("아이디를 입력하세요.");
    idLbl.innerText = "아이디는 필수 입력사항입니다.";
    $id.focus();
    return false;
  }
  if ($id.value.length < 6) {
    // alert("아이디를 6자 이상으로 입력해 주세요.");
    idLbl.innerText = "아이디를 6자 이상으로 입력해 주세요.";
    $id.focus();
    return false;
  }
  if (!regId.test($id.value)) {
    // alert("아이디는 6자 이상, 최소 하나의 알파벳(a-z)을 포함해야 합니다.");
    idLbl.innerText =
      "아이디는 6자 이상, 최소 하나의 알파벳(a-z)을 포함해야 합니다.";
    $id.focus();
    return false;
  }
  
  $.ajax({
    url: "/idchk.do",
    type: "POST",
    data: {
      id: $id.value,
    },
    success: function (data) {
      // console.log(data);
      let key = JSON.parse(data);
      if (key != 0) {
        idLbl.innerText = "중복된 아이디가 있습니다.";
        $id.focus();
        // alert("중복된 아이디가 있습니다.");
      } else if (key == 0) {
        formatidchk = 1;
        // alert("사용 가능한 아이디입니다.");
        idLbl.style.color = "var(--key-text)";
        idLbl.innerText = "사용 가능한 아이디입니다.";
      }
    },
  });
});

function fn_combine() {
  let ad =
    document.getElementById("postcode").value +
    ", " +
    document.getElementById("roadAddress").value +
    ", " +
    document.getElementById("detailAddress").value +
    ", " +
    document.getElementById("extraAddress").value;

  $address.value = ad;
  formatad = 1;
}

document.getElementById("join_submit",()=>{
  const $postCode=document.getElementById("postcode");
  //주소 합치기
  fn_combine();
  //
  if (formatidchk == 0) {
    alert("아이디 중복확인을 해 주세요.");
    $id.focus();
    return false;
  }
  if ($pw.value == "") {
    alert("비밀번호를 입력하세요.");
    $pw.focus();
    return false;
  }
  if ($repw.value == "" || formatpw != 1) {
    alert("비밀번호를 재입력하세요.");
    $repw.focus();
    return false;
  }
  
  if ($name.value == "") {
    alert("이름을 입력하세요.");
    $name.focus();
    return false;
  }
  if ($birth.value == "" || formatbirth != 1) {
    alert("생년월일을 입력하세요.");
    $birth.focus();
    return false;
  }
  
  if ($phone.value == "" || formatph != 1) {
    alert("전화번호를 입력하세요.");
    $phone.focus();
    return false;
  }

  if ($postCode.value == "" || formatad != 1) {
    alert("주소를 입력하세요.");
    $postCode.focus();
    return false;
  }
  if ($email.value == "" || formatemailNum != 1) {
    alert("이메일을 인증하세요.");
    $email.focus();
    return false;
  }
  document.querySelector("form").submit(); // 향후 유지보수를 위해선, id를 부여하고 지정하는 것이 맞음
});