window.onload = function () {
  document.getElementById("id_btn").onclick = function checkId() {
    //if 디비랑 비교.
  };
};

function check() {
  //정규식
  const regId = /^[A-Za-z0-9]{4,10}$/;
  const regPw = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
  const regName = /^[가-힝a-zA-Z]{2,}$/;
  const regEmail = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/;

  //event.preventDefault();
  const id = document.getElementById("id");
  const pw = document.getElementById("pw");
  const repw = document.getElementById("repw");
  const name = document.getElementById("name");
  const phone = document.getElementById("phone");
  const ad = document.getElementById("ad");
  const email = document.getElementById("email");

  if (id.value == "") {
    alert("아이디를 입력하지 않았습니다.");
    id.focus();
    return false;
  }

  if (pw.value == "") {
    alert("비밀번호를 입력하지 않았습니다.");
    pw.focus();
    return false;
  }

  if (pw.value != repw.value) {
    alert("입력하신 비밀번호가 일치하지 않습니다.");
    repw.focus();
    return false;
  }

  // if (!document.joinPerson.id.value) {
  //   alert("아이디를 입력하세요.");
  //   document.getElementsByName("id").focus();
  //   return false;
  // }
  // if (!document.joinPerson.pw.value) {
  //   alert("비밀번호를 입력하세요.");
  //   return false;
  // }
  // if (document.joinPerson.pw.value != document.joinPerson.repw.value) {
  //   alert("입력하신 비밀번호가 일치하지 않습니다.");
  //   return false;
  // }
  // }

  // function idCheck() {
  //   if (document.joinPerson.id.value == "") {
  //     alert("아이디를 입력하세요.");
  //     return;
  //   }
}