$(document).ready(function () {
  initSide();
  initEvent();
  initModal();
  ajax();
});
function ajax() {
  //console.log("ajax진입");
  $.post({
    url: "/getCommListBs.do",
    data: pageObj,
    success: function (data) {
      //console.log("ajax성공");
      var obj = JSON.parse(data);
      var list = obj.commList;
      initPageObj(obj); //페이지 변수 및 버튼 초기화
      printList(list);
      //console.log("ajax작업완료");
    },
  });
}
function removeCommentForm() {
  $(".comments").remove();
}
function initList() {
  removeCommentForm();
  $(".reviewList").remove();
  $(".replyList").remove();
}
function printList(list) {
  var date;
  var time;
  //리뷰 리스트 출력
  initList();
  $.each(list, function (key, value) {
    date=value.rdate.slice(0,10);
    time=value.rdate.substr(11);
    if (value.depth == 0) {
      //리뷰일 때
      $(".process").append(
        '<table class="reviewList" id="review' +
          key +
          '">' +
          "<tr>" +
          '<td class="cell1">' +
          value.cno +
          "</td>" +
          '<td class="cell2 close">' +
          value.content +
          "</td>" +
          '<td class="cell3">' +
          value.eval +
          "/5</td>" +
          // '<td class="cell4" id="customer'+key+'">'+value.mname+'</td>'+
          '<td class="cell4 reviewer" id="reviewer' +
          value.mno +
          '">' +
          value.mname +
          "</td>" +
          '<td class="cell5">' +
          value.rsvNum +
          "</td>" +
          '<td class="cell6">' +
          date+'<br>'+time+
          "</td>" +
          '<td class="cell7"><button class="replyBtn" value=' +
          key +
          (value.replytf == 1 ? " disabled>답글완료" : ">답글 남기기") +
          "</button></td>" +
          "</tr>" +
          "</table>"
      );
    } else {
      //대댓글일때
      $(".process").append(
        '<table class="replyList" id="reply' +
          key +
          '">' +
          "<tr>" +
          '<td class="cell1">┗</td>' +
          '<td class="replyCell close">답글:' +
          value.content +
          "</td>" +
          '<td class="cell5">' +
          value.rsvNum +
          "</td>" +
          '<td class="cell6">' +
          date+'<br>'+time+
          "</td>" +
          '<td class="cell7"><button class="editBtn" value=' +
          key +
          '>수정</button><button class="delBtn" value=' +
          key +
          ">삭제</button></td>" +
          "</tr>" +
          "</table>"
      );
    }
  });
}
function editAjax() {
  //console.log("편집");
  $.post({
    url: "/updateComm.do",
    data: pageObj,
    success: function () {
      removeCommentForm();
      ajax();
      alert("답글이 수정되었습니다.");
    },
  });
}
function insertAjax() {
  //console.log("등록");
  $.post({
    url: "/regitComm.do",
    data: pageObj,
    success: function () {
      msgSet();
      sendAlarm();
      removeCommentForm();
      ajax();
      alert("답글이 등록되었습니다.");
    },
  });
}
function delAjax() {
  //console.log("삭제");
  $.post({
    url: "/deleteCommAb.do",
    data: pageObj,
    success: function () {
      ajax(); //리스트 재출력
      alert("답글이 삭제되었습니다.");
    },
    fail: function(){
      alert("요청이 정상적으로 처리되지 않았습니다.");
    }
  });
}
function initSide() {
  $(".side_sub")[0].innerHTML =
    "<button>전체 리뷰</button>" + "<button>미확인 리뷰</button>";
  $(".content").css("left", "22vw");
  $(".side_sub").css("display", "unset");
  $(".side button").eq(5).addClass("side_select");
  $(".side_sub button").eq(0).addClass("side_sub_select");
  $(".side_sub button").click(function () {
    $(this).siblings().removeClass("side_sub_select");
    $(this).addClass("side_sub_select");
    if ($(this).index() == 1) {
      //미확인 리뷰가 눌렸을 경우
      pageObj.replytf = 0;
      pageObj.currentPageNum = 1;
      resetSearch();
      ajax();
    } else {
      pageObj.replytf = 1;
      pageObj.currentPageNum = 1;
      resetSearch();
      ajax();
    }
  });
}
function initEvent() {
  initPageEvent();
  var idx;
  $(".selectbox select").change(function () {
    //정렬 셀렉트박스 변경 이벤트
    var select_name = $(this).children("option:selected").text();
    $(this).siblings("label").text(select_name);
    pageObj.order = $(".selectbox select")[0].value;
    pageObj.currentPageNum = 1;
    ajax();
  });
  $(".searchBox i.fas").click(function () {
    pageObj.search = $(".search")[0].value;
    pageObj.searchOption = $(".searchBox select")[0].value;
    pageObj.currentPageNum = 1;
    ajax();
  });
  $(".process").on("click", "td.cell2", function () {
    //리뷰내용 누를경우 전체내용 출력
    $(this).toggleClass("open");
    $(this).toggleClass("close");
  });
  $('.process').on("click",".reviewer",function(){//고객의 이름을 클릭했을 경우
    var mno=Number($(this).attr('id').substr(8));
    modal_userInfo(mno);
  });
  $(".process").on("click", "td.replyCell", function () {
    //답글내용 누를경우 전체내용 출력
    $(this).toggleClass("open");
    $(this).toggleClass("close");
  });
  $(".process").on("keyup", ".commentBox", function () {
    //텍스트 개수 출력
    $(this).siblings()[1].innerHTML = $(this).val().length + " / 300";
  });
  $(".process").on("click", ".replyBtn", function () {
    //답글 버튼 클릭시 답글 폼 출력
    idx = $(this).val();
    printReplyForm(idx, "", "submit");
  });
  $(".process").on("click", ".cancel", function () {
    //답글 폼에서 취소 클릭시
    idx = $(this).val();
    cancelReply(idx);
  });
  $(".process").on("click", ".submit", function () {
    //답글 폼에서 등록(INSERT)했을 경우
    idx = $(this).val();
    submitReply(idx);
  });
  $(".process").on("click", ".edit", function () {
    //답글 폼에서 등록(UPDATE)했을 경우
    idx = $(this).val();
    editReply(idx);
  });
  $(".process").on("click", ".editBtn", function () {
    //답글 리스트 수정버튼 눌렀을 경우
    idx = $(this).val();
    editFormPrint(idx);
  });
  $(".process").on("click", ".delBtn", function () {
    idx = $(this).val();
    delReply(idx);
  });
  $("#mask").on("click", function () {
    modalClose();
    userModalClose();
  });
}
function modalClose() {
  $("#modal_container").hide();
  $("#mask").hide();
}
function userModalClose(){
  $("#modal_userInfo").hide();
  $("#mask").hide();
}
function initModal() {
  /* 모달 생성 */
  $("#modal_close").click(function () {
    //모달 X버튼 누를 때
    modalClose(); //모달 닫기
  });
  $("#closeBtn").click(function (event) {
    //모달 돌아가기 누를 때
    event.preventDefault();
    modalClose(); //모달 닫기
  });
  $("#ok").click(function () {
    operate();
  });
  $('#openChatBtn').click(function(){//채팅 버튼 클릭 시
    chatObj.mno=Number($('#modalmno').text());
    chatObj.bno=pageObj.bno;
    chatObj.addressee=Number(chatObj.mno);
    var guest=$('#modalName').text();
    crtRoom(guest);
    userModalClose();
  });
}
function openModal(button) {
  $("#mask").show();
  $("#modal_container").show();
  if (button == "edit") {
    //취소버튼이 눌려서 모달이 열렸다면
    $("#modal_foot p")[0].innerHTML = "정말 수정하시겠습니까?";
    $("#ok")[0].innerHTML = "수정하기";
  } else {
    //삭제버튼이 눌려서 모달이 열렸다면
    $("#modal_foot p")[0].innerHTML = "정말 삭제하시겠습니까?";
    $("#ok")[0].innerHTML = "삭제하기";
  }
}
function operate() {
  if ($("#ok")[0].innerHTML == "수정하기") {
    //버튼이 수정하기라면,
    modalClose();
    editAjax();
  } else {
    //버튼이 삭제하기라면
    modalClose();
    delAjax();
  }
}
function enter() {
  if (window.event.keyCode == 13) {
    pageObj.search = $(".search")[0].value;
    pageObj.searchOption = $(".searchBox select")[0].value;
    ajax();
  }
}
function msgSet() {
  alertObj.rsvNum = pageObj.rsvNum;
  alertObj.msg =
    "주문번호" + pageObj.rsvNum + "의 리뷰에 답글이 등록되었습니다.";
  alertObj.typenum = 4;
}
function initPageEvent() {
  $(".page_next").click(function () {
    if (!$(this).hasClass("no")) {
      pageObj.currentPageNum += 1;
      ajax();
    }
  });
  $(".page_prev").click(function () {
    if (!$(this).hasClass("no")) {
      pageObj.currentPageNum -= 1;
      ajax();
    }
  });
  $(".page_prevBlock").click(function () {
    if (!$(this).hasClass("no")) {
      pageObj.currentPageNum = pageObj.blockFirstPageNum - 1;
      ajax();
    }
  });
  $(".page_nextBlock").click(function () {
    if (!$(this).hasClass("no")) {
      pageObj.currentPageNum = pageObj.blockLastPageNum + 1;
      ajax();
    }
  });
  $(".page_btn").on("click", ".page_list", function () {
    if (pageObj.currentPageNum != JSON.parse($(this).html())) {
      pageObj.currentPageNum = JSON.parse($(this).html());
      ajax();
    }
  });
}
function initPageBtn() {
  if (pageObj.isNextExist) {
    $(".page_next").removeClass("no");
  } else {
    $(".page_next").addClass("no");
  }
  if (pageObj.isNextBlockExist) {
    $(".page_nextBlock").removeClass("no");
  } else {
    $(".page_nextBlock").addClass("no");
  }
  if (pageObj.isPrevExist) {
    $(".page_prev").removeClass("no");
  } else {
    $(".page_prev").addClass("no");
  }
  if (pageObj.isPrevBlockExist) {
    $(".page_prevBlock").removeClass("no");
  } else {
    $(".page_prevBlock").addClass("no");
  }
  $(".page_btn .page_list").remove(); //페이지 리스트 초기화
  for (var i = pageObj.blockLastPageNum; i >= pageObj.blockFirstPageNum; i--) {
    if (i == pageObj.currentPageNum) {
      $("<li class='page_list curPage'>" + i + "</li>")
        .insertAfter($(".page_prev"))
        .trigger("create");
    } else {
      $("<li class='page_list'>" + i + "</li>").insertAfter($(".page_prev"));
    }
  }
}
function initPageObj(data) {
  pageObj.blockLastPageNum = data.blockLastPageNum;
  pageObj.blockFirstPageNum = data.blockFirstPageNum;
  pageObj.isNextBlockExist = data.isNextBlockExist;
  pageObj.isNextExist = data.isNextExist;
  pageObj.isPrevBlockExist = data.isPrevBlockExist;
  pageObj.isPrevExist = data.isPrevExist;
  initPageBtn();
  printTotalPost(data.totalPostCount);
}
function printTotalPost(totalPostCount) {
  $(".content_header span")[0].innerHTML = totalPostCount;
}

function today() {
  var date = new Date();
  var mm = date.getMonth() + 1;
  var dd = date.getDate();
  var today = date.getFullYear() + "." + (mm < 10 ? "0" + mm : mm) + "." + dd;
  return today;
}
function delReply(idx) {
  //답글 삭제 (리팩토링 완료 - 03.25 / 모달 추가 완료 - 03.29)
  pageObj.rsvNum = JSON.parse($("#reply" + idx + " .cell5")[0].innerHTML); //주문번호 담기
  openModal("delete");
}
function editReply(idx) {
  //답글 수정 메서드
  pageObj.rsvNum = JSON.parse($("#reply" + idx + " .cell5")[0].innerHTML); //주문번호 담기
  pageObj.content = $("#commentBox" + idx).val(); //답글 내용 담기
  openModal("edit");
}
function editFormPrint(idx) {
  //답글 수정폼 출력
  var content = $("#reply" + idx + " .replyCell")[0].innerHTML.replace(
    "답글:",
    ""
  );
  $("#reply" + idx).hide(); //답글행 숨기기
  printReplyForm(idx, content, "edit");
}
function submitReply(idx) {
  //답글 등록
  pageObj.rsvNum = JSON.parse($("#review" + idx + " .cell5")[0].innerHTML); //주문번호 담기
  pageObj.eval = JSON.parse(
    $("#review" + idx + " .cell3")[0].innerHTML.charAt(0)
  ); //평점 담기
  alertObj.addressee = $("#review" + idx + " .cell4")[0].id; //알림 수신자 회원번호
  pageObj.content = $("#commentBox" + idx).val(); //답글 내용 담기
  insertAjax();
  removeCommentForm();
}
function cancelReply() {
  var type = $("#comments button").eq(1).attr("class"); //폼의 타입을 체크한다.(1. 등록 / 2. 수정)
  var idx = JSON.parse($("#comments button")[1].value); //폼의 인덱스를 추출한다.
  if (type == "submit") {
    //등록 폼의 경우
    btnChange(idx, "답글 남기기", false); //리뷰의 버튼을 답글버튼으로 전환한다.
  } else {
    //수정 폼의 경우
    btnChange(idx - 1, "답글완료", true); //리뷰의 버튼을 답글완료로 전환한다.
    $("#reply" + idx).show(); //숨겼던 기존의 답글을 다시 띄운다.
  }
  removeCommentForm(); //폼을 없앤다
}
function printReplyForm(idx, content, type) {
  //답글 폼 출력 (인덱스,텍스트내용,등록타입-INSERT,UPDATE)
  //console.log("답글 폼 출력");
  if ($("#comments").length == 1) {
    //답글 폼이 기존에 존재하는 경우 취소버튼을 누르는 것과 동일하게 진행한다.
    cancelReply();
  }
  //수정일 때와 등록일 때는 다르다. 수정일 때는 본인의 주문번호를 끌어다 쓰고,
  //등록일 때는 리뷰의 주문번호를 끌어다 써야 한다.
  //수정과 등록의 구분은 type으로 한다.
  if (type == "submit") {
    //등록일 때,
    var rsvno = $("#review" + idx + " .cell5")[0].innerHTML;
    var id = "#review" + idx; //추가할 폼의 위치를 지정하기 위한 id 설정
    btnChange(idx, "작성중", true); //답글버튼 비활성화
  } else {
    //수정일 때
    var rsvno = $("#reply" + idx + " .cell5")[0].innerHTML;
    var id = "#reply" + idx;
    btnChange(idx - 1, "작성중", true);
  }
  $(
    '<div class="comments" id="comments">' +
      '<div class="comments_header">' +
      '<p><span id="rsvno">' +
      rsvno +
      "</span>번 주문리뷰에 대한 답글</p>" +
      '<button class="cancel" value=' +
      idx +
      ">취소</button>" +
      '<button class="' +
      type +
      '" value=' +
      idx +
      ">등록</button>" +
      "</div>" +
      '<div class="comments_body">' +
      "<span>┗</span>" +
      '<textarea class="commentBox" id="commentBox' +
      idx +
      '" cols="30" rows="3">' +
      content +
      "</textarea>" +
      "<span>" +
      content.length +
      " / 300</span>" +
      "</div>" +
      "</div>"
  ).insertAfter($(id)); //답글 폼 추가
}
function btnChange(idx, name, boolean) {
  //답글 버튼 전환
  //console.log("답글버튼전환");
  $(".replyBtn[value=" + idx + "]")[0].innerHTML = name; //버튼 텍스트 전환
  $(".replyBtn[value=" + idx + "]").attr("disabled", boolean); //버튼 활성화 전환
}
function initPageBtn() {
  if (pageObj.isNextExist) {
    $(".page_next").removeClass("no");
  } else {
    $(".page_next").addClass("no");
  }
  if (pageObj.isNextBlockExist) {
    $(".page_nextBlock").removeClass("no");
  } else {
    $(".page_nextBlock").addClass("no");
  }
  if (pageObj.isPrevExist) {
    $(".page_prev").removeClass("no");
  } else {
    $(".page_prev").addClass("no");
  }
  if (pageObj.isPrevBlockExist) {
    $(".page_prevBlock").removeClass("no");
  } else {
    $(".page_prevBlock").addClass("no");
  }
  $(".page_btn .page_list").remove(); //페이지 리스트 초기화
  for (var i = pageObj.blockLastPageNum; i >= pageObj.blockFirstPageNum; i--) {
    if (i == pageObj.currentPageNum) {
      $("<li class='page_list curPage'>" + i + "</li>")
        .insertAfter($(".page_prev"))
        .trigger("create");
    } else {
      $("<li class='page_list'>" + i + "</li>").insertAfter($(".page_prev"));
    }
  }
}
function resetSearch() {
  pageObj.search = "";
  pageObj.searchOption = 0;
  $(".search")[0].value = "";
  $(".searchBox select").eq(0).prop("selected", true);
}
function modal_userInfo(mno){
  $("#mask").show();
  $("#modal_userInfo").show();
  $("#userInfo_bodycont *").remove();
  $.ajax({
      url: '/getuserInfo.do',
      type: 'post',
      data: {
          mno: mno,   
      }, success: function(data){
          let info = JSON.parse(data);
          let address = (info.address).replaceAll(",", " ");
        $("#userInfo_bodycont").append(
            '<table class="userInfo">' +
            '<tr>'+
                  '<th>회원번호</th>' +
                  '<td id="modalmno">'+ info.mno + '</td>' +
              '</tr>' +
              '<tr>'+
                  '<th>이&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;름</th>' +
                  '<td id="modalName">'+ info.name + '</td>' +
              '</tr>' +
              '<tr>'+
                  '<th>연&nbsp;&nbsp;락&nbsp;&nbsp;처</th>' +
                  '<td>'+ info.phone + '</td>' +
              '</tr>' +
              '<tr>'+
                  '<th>주&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;소</th>' +
                  '<td>'+ address + '</td>' +
              '</tr>' +
            '</table>'
        );
      }   
  });
}