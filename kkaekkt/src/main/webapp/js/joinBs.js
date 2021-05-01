//정규식
const regId = /(?=.*\d{0,})(?=.*[a-z]{1,}).{6,15}/;
const regPw = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
const regName = /^[가-힝a-zA-Z]{1,}$/;
const regEmail = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
const regBno = /^[0-9]{10}$/;
const regPhone = /^[0-9]{3}\-[0-9]{3,4}\-[0-9]{4}$/;
const regAccount = /^[0-9,\-]{3,6}\-[0-9,\-]{2,6}\-[0-9,\-]{3,6}(\-[0-9]{1,3})?$/;
const regPrice = /^[0-9]+$/;
const regMailCode = /^[0-9]{6}$/;
//비교객체
const id = document.getElementById("id");
const pw = document.getElementById("pw");
const repw = document.getElementById("repw");
const email = document.getElementById("email");
const bno = document.getElementById("bno");
const account = document.getElementById("account");
const phone = document.getElementById("phoneNum");
//유효성 통과 여부 체크 객체 (false&true)
var formatArray = [false, false, false, false, false, false, false];
var alertArray = [
  "아이디",
  "비밀번호",
  "비밀번호 확인",
  "이메일",
  "휴대폰 번호",
  "사업자등록번호",
  "계좌번호",
];
var focusArray = [id, pw, repw, email, phone, bno, account];
var mailCode;
//요일 출력 배열
const week = [
  "월요일",
  "화요일",
  "수요일",
  "목요일",
  "금요일",
  "토요일",
  "일요일",
  "매일",
  "평일",
  "주말",
];
//타이머 전역변수 지정
function $ComTimer() {}
$ComTimer.prototype = {
  comSecond: "",
  timer: "",
  domId: "",
  fnTimer: function () {
    var min = Math.floor(this.comSecond / 60);
    var sec = this.comSecond % 60;
    this.domId.innerText = `${min}:${sec < 10 ? `0${sec}` : sec}`;
    this.comSecond--; // 1초씩 감소
    if (this.comSecond < 0) {
      // 시간이 종료 되었으면..
      clearInterval(this.timer); // 타이머 해제
      alert("인증시간이 초과하였습니다. 다시 인증해주시기 바랍니다.");
      mailCode = null; //인증코드 초기화
    }
  },
};
let AuthTimer = new $ComTimer();
window.addEventListener("load",()=>{
  scheduleHtml(); //운영시간 html 출력
  initEvent();
});
function scheduleHtml() {
  const $weekBoxUl = document.querySelector(".weekBox ul");
  //운영시간 html 생성
  let $opt;
  for (let idx = 0; idx < 10; idx++) {
    $weekBoxUl.innerHTML+=
      "<li class='hide' style='order:" +
        (idx + 1) +
        "'><button>" +
        week[idx] +
        "</button><span>시간<span>" +
        "<select></select>~<select></select></li>";

    $opt = document.querySelector(".weekBox li[style='order:" + (idx + 1) + "'] select");
    for (let i = 0; i < 25; i++) {
      $opt.innerHTML+="<option>" + (i < 10 ? "0" + i : i) + ":00</option>";
      if (i != 24) {
        $opt.innerHTML+="<option>" + (i < 10 ? "0" + i : i) + ":30</option>";
      }
    }
  }
}
function initEvent() {
  $(".selectbox select").change(function () {
    //셀렉트 옵션이 바뀔 때 라벨에 반영되는 이벤트
    let select_name = $(this).children("option:selected").text();
    $(this).siblings("label").text(select_name);
  });
  $(".bizType div").click(function () {
    //세탁소&코인세탁소 선택 반영 이벤트
    $(this).addClass("selected");
    $(this).removeClass("unselected");
    if ($(this).index() == 0) {
      $(".bizType div").eq(1).removeClass("selected");
      $(".bizType div").eq(1).addClass("unselected");
      $(".laundry").removeClass("hide");
      $(".coinLaundry").addClass("hide");
      $(".bizType input")[0].value = 1; //비즈니스 타입값 반영
    } else {
      $(".bizType div").eq(0).removeClass("selected");
      $(".bizType div").eq(0).addClass("unselected");
      $(".laundry").addClass("hide");
      $(".coinLaundry").removeClass("hide");
      $(".bizType input")[0].value = 2; //비즈니스 타입값 반영
    }
  });
  $(".week button").click(function () {
    //요일 보이기&숨기기
    let idx = $(this).index();
    $(this).toggleClass("selected");
    $(".weekBox ul li[style='order:" + (idx + 1) + "']").toggleClass("hide");
  });
  $(".laundry input[type='checkbox']").change(function () {
    //취급품목-금액 활성화&비활성화
    let idx = $(this).attr("value");
    if ($(".laundry input.won").eq(idx).attr("disabled") == "disabled") {
      $(".laundry input.won").eq(idx).attr("disabled", false);
    } else {
      $(".laundry input.won").eq(idx).attr("disabled", true);
      $(".laundry input.won")[idx].value = "";
    }
  });
  $(".coinLaundry input[type='checkbox']").change(function () {
    //사양정보-금액 활성화&비활성화
    let idx = $(this).attr("value");
    if ($(".coinLaundry input.won").eq(idx).attr("disabled") == "disabled") {
      $(".coinLaundry input.won").eq(idx).attr("disabled", false);
      if (idx <= 2) {
        $(".coinLaundry select").eq(idx).attr("disabled", false);
      }
    } else {
      $(".coinLaundry input.won").eq(idx).attr("disabled", true);
      $(".coinLaundry input.won")[idx].value = "";
      if (idx <= 2) {
        $(".coinLaundry select").eq(idx).attr("disabled", true);
        $(".coinLaundry select")[idx].value = 0;
        $(".coinLaundry label[for='select']").eq(idx).text("");
      }
    }
  });
  $("#emailChkBtn").click(function () {
    if (regEmail.test(email.value)) {
      //이메일이 양식에 맞을 경우
      mailDuplChk();
    } else {
      alert("이메일이 양식에 맞지 않습니다.");
      email.focus();
    }
  });

  $("#id").focusout(function () {
    document.getElementById("idchk").style.color = "var(--text-red)";
    $("#idchk").removeClass("hide");
    if ($("#id").val() == "") {
      // alert("아이디를 입력하세요.");
      document.getElementById("idchk").innerText =
        "아이디는 필수 입력사항입니다.";
      $("#id").focus();
      return false;
    }
    if ($("#id").val().length < 6) {
      // alert("아이디를 6자 이상으로 입력해 주세요.");
      document.getElementById("idchk").innerText =
        "아이디를 6자 이상으로 입력해 주세요.";
      $("#id").focus();
      return false;
    }
    if (!regId.test(id.value)) {
      // alert("아이디는 6자 이상, 최소 하나의 알파벳(a-z)을 포함해야 합니다.");
      document.getElementById("idchk").innerText =
        "아이디는 6자 이상, 최소 하나의 알파벳(a-z)을 포함해야 합니다.";
      $("#id").focus();
      return false;
    }

    $.ajax({
      url: "/idchk.do",
      type: "POST",
      data: {
        id: $("#id").val(),
      },
      success: function (data) {
        // console.log(data);
        let key = JSON.parse(data);
        if (key == 1) {
          formatArray[0] = false;
          document.getElementById("idchk").innerText =
            "중복된 아이디가 있습니다.";
          // alert("중복된 아이디가 있습니다.");
        } else if (key == 0) {
          formatArray[0] = true;
          // alert("사용 가능한 아이디입니다.");
          document.getElementById("idchk").style.color = "var(--key-text)";
          document.getElementById("idchk").innerText =
            "사용 가능한 아이디입니다.";
        }
      },
    });
  });

  //   $("#idChkBtn").click(function () {
  //     if (regId.test(id.value)) {
  //       idAjax(id.value);
  //     } else {
  //       alert("ID가 양식에 맞지 않습니다.");
  //       id.focus();
  //     }
  //   });
  //   function idAjax(data) {
  //     console.log("ajax진입");
  //     $.post({
  //       url: "/idchk.do",
  //       data: { id: data },
  //       success: function (result) {
  //         console.log("ajax완료");
  //         if (result == 0) {
  //           alert("사용가능한 아이디입니다.");
  //           formatArray[0] = true;
  //         } else {
  //           alert("중복된 아이디입니다.");
  //         }
  //       },
  //       error: function () {
  //         alert("에러발생");
  //       },
  //     });
  //   }

  //   function chkId() {
  //     //ID 유효성 체크
  //     if (regId.test(id.value)) {
  //       //ID유효성 체크
  //       $("#idchk").addClass("hide");
  //     } else {
  //       $("#idchk").removeClass("hide");
  //       formatArray[0] = false;
  //     }
  //   }

  $("#id").keyup(function () {
    //만약 중복검사를 통과했는데 키 입력을 했을 경우
    if (formatArray[0] == true) {
      //통과된 상태 취소
      formatArray[0] = false;
    }
  });

  $("#certified").click(function () {
    //이메일 인증번호 확인란
    if (regMailCode.test($("#mailCodeChk")[0].value)) {
      //코드 표현식 검사
      if (mailCode == $("#mailCodeChk")[0].value) {
        //코드가 일치한다면,
        timeStop();
        alert("메일 인증이 완료되었습니다.");
        formatArray[3] = true;
        $("#timeout")[0].innerText = "";
      } else if ($("#timeout")[0].innerText == "0:00") {
        //시간이 다 됐는데 인증을 누른다면
        alert("인증번호가 만료되었습니다.");
      } else if ($("#timeout")[0].innerText.length != 0) {
        //시간이 남았는데 코드가 일치하지 않는다면
        alert("인증번호가 일치하지 않습니다.");
      } else if (formatArray[3] == false) {
        //타이머가 공백인데 인증이 되지 않았다면
        alert("이메일 인증을 먼저 진행해주세요.");
      } else {
        // 그 외에 경우는 어떻게 정의할 지 잘 모르겠음
      }
    } else {
      //코드가 숫자 6자리가 아니라면
      alert("인증코드의 양식과 일치하지 않습니다.");
    }
  });
  $("#email").keyup(function () {
    //이메일 인증을 마쳤는데 다시 입력할 경우
    if (formatArray[3] == true) {
      formatArray[3] = false; //인증 초기화
    }
  });

  // Jquery, 입력시 불가 문자 삭제
  //아이디 한글입력 안되게 처리 */
  $("input[name=id]").keyup(function (event) {
    if (!(event.keyCode >= 37 && event.keyCode <= 40)) {
      var inputVal = $(this).val();
      $(this).val(inputVal.replace(/[^a-z0-9]/gi, ""));
    }
  });
  
  // 이름 영어+한글만 입력 -> 업체는 이름이 바뀔 수 있으니까 비활성화함
  // $("input[name=bname]").keyup(function (event) {
  //   if (!(event.keyCode >= 37 && event.keyCode <= 40)) {
  //     var inputVal = $(this).val();
  //     $(this).val(
  //       inputVal.replace(/^[0-9]+$|[ \[\]{}()<>?|`~!@#$%^&*-_+=,.;:\"\\]/gi, "")
  //       // 이름 한글만 입력 가능
  //       // inputVal.replace(/[a-z0-9]|[ \[\]{}()<>?|`~!@#$%^&*-_+=,.;:\"\\]/g, "")
  //     );
  //   }
  // });

  // 폰넘버 숫자+하이픈
  $("input[name=phone]").keyup(function (event) {
    if (!(event.keyCode >= 37 && event.keyCode <= 40)) {
      var inputVal = $(this).val();
      $(this).val(inputVal.replace(/[^0-9-]$/gi, ""));
    }
  });
  // 계좌 숫자+하이픈
  $("input[name=bankAccountNum]").keyup(function (event) {
    if (!(event.keyCode >= 37 && event.keyCode <= 40)) {
      var inputVal = $(this).val();
      $(this).val(inputVal.replace(/[^0-9-]$/gi, ""));
    }
  });

  //사업자 등록 번호 숫자만
  $("input[name=bno]").keyup(function (event) {
    if (!(event.keyCode >= 37 && event.keyCode <= 40)) {
      var inputVal = $(this).val();
      $(this).val(inputVal.replace(/[^0-9]/gi, ""));
    }
  });
  //생일 숫자만
  $("input[name=bno]").keyup(function (event) {
    if (!(event.keyCode >= 37 && event.keyCode <= 40)) {
      var inputVal = $(this).val();
      $(this).val(inputVal.replace(/[^0-9]/gi, ""));
    }
  });

  // 계좌번호
  $("input[name=email]").keyup(function (event) {
    if (!(event.keyCode >= 37 && event.keyCode <= 40)) {
      var inputVal = $(this).val();
      $(this).val(
        inputVal.replace(
          /[^a-z0-9+$|[ \[\]{}()<>?|`~!#$%^&*-_+=,.;:\"\\]/gi,
          ""
        )
      );
    }
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
function mailDuplChk() {
  $.post({
    url: "/findemail.do",
    data: { email: email.value },
    success: function (result) {
      if (result == 0) {
        emailAjax(email.value);
      } else {
        alert("중복된 이메일이 존재합니다.");
        email.focus();
      }
    },
  });
}
function mailChk() {
  if ($("#mailCodeChk")[0].value == mailCode) {
    alert("인증되었습니다.");
    formatArray[3] = true;
  } else {
    alert("인증번호가 일치하지 않습니다.");
  }
}

function emailAjax(email) {
  //이메일인증검사
  $.get({
    url: "/mailCheck.do",
    data: { email: email },
    success: function (code) {
      mailCode = code;
      alert("인증번호가 전송되었습니다.");
      timerStart();
    },
  });
}

function chkPw() {
  if (regPw.test(pw.value)) {
    //PW유효성 체크
    $("#pwchk").addClass("hide");
    chkRePw();
  } else {
    $("#pwchk").removeClass("hide");
    formatArray[1] = false;
  }
}
function chkRePw() {
  if (pw.value == repw.value) {
    $("#pwRechk").addClass("hide");
    formatArray[2] = true;
    if ($("#pwchk").hasClass("hide")) {
      //위의 비밀번호가 정상입력상태라면,
      formatArray[1] = true;
    }
  } else {
    $("#pwRechk").removeClass("hide");
    formatArray[2] = false;
  }
}
function chkEmail() {
  if (regEmail.test(email.value)) {
    $("#emailchk").addClass("hide");
  } else {
    $("#emailchk").removeClass("hide");
  }
}
function chkPhone() {
  if (regPhone.test(phone.value)) {
    $("#phonechk").addClass("hide");
    formatArray[4] = true;
  } else {
    $("#phonechk").removeClass("hide");
    formatArray[4] = false;
  }
}

$("#bno").focusout(function () {
  // function chkBno() {
  // if (!regBno.test($("#bno").val())) {
  if (!regBno.test(bno.value)) {
    $("#bnochk").removeClass("hide");
    document.getElementById("bnochk").innerText = "10자리 숫자만 입력하세요 ";
    $("#bno").focus();
    return false;
    // formatArray[5] = true;
  } else {
    $("#bnochk").addClass("hide");

    $.ajax({
      url: "/bnoChk.do",
      type: "POST",
      data: {
        bno: $("#bno").val(),
      },
      success: function (data) {
        // console.log(data);
        var key = JSON.parse(data);
        if (key != 0) {
          // formatArray[0] = false;
          document.getElementById("bnochk").innerText =
            "해당 사업자등록번호로 가입된 아이디가 있습니다.";
          $("#bnochk").removeClass("hide");
          $("#bno").focus();
          return false;
          // alert("중복된 아이디가 있습니다.");
        } else if (key == 0) {
          $("#bnochk").addClass("hide");
          formatArray[5] = true;
        }
      },
    });
  }
});

function chkAccount() {
  if (regAccount.test(account.value)) {
    $("#accountchk").addClass("hide");
    formatArray[6] = true;
  } else {
    $("#accountchk").removeClass("hide");
    formatArray[6] = false;
  }
}

// bnkChk변경됨
// function bnoChk() {
//   var bno = $("#bno").val();
//   $.post({
//     url: "/bnoChk.do",
//     data: { bno: bno },
//     success: function (result) {
//       if (result == 0) {
//         formatArray[5] = true;
//       } else {
//         formatArray[5] = false;
//       }
//     },
//   });
// }

function formatChk() {
  //유효성검사가 걸린 차례대로 input값 체크
  // bnoChk(); //임시로 bno 검사 위치함
  for (var i = 0; i < formatArray.length; i++) {
    if (!formatArray[i]) {
      //false가 반환된다면
      if (i == 0) {
        alert("ID 중복검사를 진행해주세요.");
        return false;
      } else if (i == 3) {
        alert("이메일 인증을 진행해주세요");
        focusArray[i].focus();
        return false;
      } else {
        alert(alertArray[i] + "의 입력을 확인해주세요.");
        focusArray[i].focus();
        return false;
      }
    }
  }
  return true; //유효성검사를 전부 통과했을 경우
}
function nullchk() {
  if (formatChk()) {
    //유효성검사 true 반환시 null체크 진입
    if ($("#bname")[0].value == "") {
      //업체명 null체크
      alert("업체명은 필수입력사항입니다.");
      $("#bname").focus();
      return false;
    }
    if ($("#postcode")[0].value.length == 0) {
      //주소 null체크
      alert("주소는 필수입력사항입니다.");
      return false;
    }

    return true; //유효성과 null체크 전부 통과할 경우 true반환
  } else {
    //유효성 통과못했을 경우 false반환
    return false;
  }
}
function clicked() {
  if (nullchk()) {
    //유효성 검사를 통과했다면
    //주소 데이터 처리 - 우편번호, 도로명주소, 상세주소, 부가주소
    var postcode = $('#postcode').val();
    var roadAddress = $("#roadAddress").val();
    var detailAddress = $("#detailAddress").val();
    var extraAddress = $('#extraAddress').val();
    $("#address")[0].value = postcode+", "+roadAddress + ", " + detailAddress+", "+extraAddress;
    // 운영시간 데이터 처리
    var weekLi = $(".weekBox ul li");
    var time = $(".weekBox select");
    var list = new Array();
    for (var i = 0; i < weekLi.size(); i++) {
      var open = time[i * 2].value;
      var close = time[i * 2 + 1].value;
      list.push({
        schno: JSON.parse(weekLi.eq(i).css("order")),
        time: open + "~" + close,
      });
    }
    $(".weekBox input[name='schedule']")[0].value = JSON.stringify(list);
    if ($(".bizType input")[0].value == 1) {
      //일반 세탁소를 작성했다면,
      var chkCount = 0; //입력된 품목 개수 검사 변수 초기화 (0 이면 null 체크)
      // 품목 리스트 데이터 처리
      var chkBox = $(".laundry input[type='checkbox']");
      var priceBox = $(".laundry input[class='won']");
      list = []; //위에서 쓰인 리스트 초기화
      for (var i = 0; i < chkBox.size(); i++) {
        if (chkBox[i].checked) {
          //체크가 되어 있다면
          chkCount++; //입력된 품목 개수 카운트 증가
          if (!regPrice.test(priceBox[i].value)) {
            //유효성에 맞지 않다면
            alert("금액엔 숫자를 입력해주세요.");
            priceBox[i].focus();
            return;
          }
        }
        list.push({
          lno: JSON.parse(chkBox[i].value) + 1,
          price: chkBox[i].checked == false ? 0 : JSON.parse(priceBox[i].value), //체크가 안되어있다면 0, 되어있다면 숫자로 변환하여 저장
        });
      }
      if (chkCount == 0) {
        //입력된 품목 중 하나라도 체크가 되어있지 않다면,
        alert("취급품목은 하나 이상 입력되어야 합니다.");
        return;
      } else {
        //하나 이상의 품목을 취급하고 있다면,
        $("input[name='laundry']")[0].value = JSON.stringify(list);
      }
    } else {
      //코인 세탁소를 작성했다면,
      // 설비 리스트 데이터 처리
      var chkBox = $(".coinLaundry .equipment input[type='checkbox']");
      var priceBox = $(".coinLaundry .equipment input[class='won']");
      var selectBox = $(".coinLaundry select");
      list = []; //리스트 초기화
      for (var i = 0; i < chkBox.size(); i++) {
        if (chkBox[i].checked) {
          if (!regPrice.test(priceBox[i].value)) {
            //유효성에 맞지 않다면
            alert("금액엔 숫자를 입력해주세요.");
            priceBox[i].focus();
            return;
          }
        }
        list.push({
          //코인세탁 사양정보 입력
          eno: i + 1,
          cnt: JSON.parse(selectBox[i].value.substr(0, 1)),
          price: chkBox[i].checked == false ? 0 : JSON.parse(priceBox[i].value), //체크가 안되어있다면 0, 되어있다면 숫자로 변환하여 저장
        });
      }
      list.push({
        eno: 4,
        cnt: JSON.parse($(".coinLaundry .dry select")[0].value.substr(0, 1)),
        price:
          $(".coinLaundry .dry input[class='won']")[0].value.length == 0
            ? 0 //건조기 가격이 입력되어있지 않다면 0을 입력
            : JSON.parse($(".coinLaundry .dry input[class='won']")[0].value), //건조기 가격이 입력되어있다면 숫자로 변환하여 입력
      }); //건조기 입력

      $("input[name='equipment']")[0].value = JSON.stringify(list);
      //console.log($("input[name='equipment']")[0].value);
      // 부가서비스 데이터 처리
      chkBox = $(".coinLaundry .etc input[type='checkbox']");
      priceBox = $(".coinLaundry .etc input[class='won']");
      list = []; //리스트 초기화
      for (var i = 0; i < chkBox.size(); i++) {
        if (chkBox[i].checked) {
          list.push({ etcno: i + 1, price: JSON.parse(priceBox[i].value) });
        }
      }
      $("input[name='etc']")[0].value = JSON.stringify(list);
    }
    $("form").submit();
  }
}
