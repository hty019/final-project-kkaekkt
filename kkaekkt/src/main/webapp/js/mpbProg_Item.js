$(document).ready(function () {
  initSide();
  initEvent();
  initModal();
  listAjax(); //처음 마이페이지 들어왔을 때, 진행중 주문 항목 출력
});
function initEvent() {
  initPageEvent();
  $(".searchBox i.fas").click(function () {
    pageObj.search = $(".search")[0].value;
    pageObj.searchOption = $(".searchBox select")[0].value;
    pageObj.currentPageNum = 1;
    listAjax();
  });
  $(".selectbox select").change(function () {
    var select_name = $(this).children("option:selected").text();
    $(this).siblings("label").text(select_name);
    pageObj.order = $(".selectbox select")[0].value;
    pageObj.currentPageNum = 1;
    listAjax();
  });
  $(".laundry_nav li").click(function () {
    if (!$(this).hasClass("selected")) {
      resetSearch();
      pageObj.laundryType = $(this)[0].value;
      $(this).siblings().removeClass("selected");
      $(this).addClass("selected");
      listAjax();
    }
  });
  $(".process").on("click", ".cancelBtn", function () {
    //리스트의 취소 버튼을 누를 때
    rsvObj.laundry = $(".processList tr")
      .eq($(this)[0].value)
      .children()
      .eq(3)[0].innerHTML; //품목명
    rsvObj.rsvNum = JSON.parse(
      $(".processList tr").eq($(this)[0].value).children().eq(1)[0].innerHTML
    ); //예약번호
    alertObj.addressee = $(".processList tr")
      .eq($(this)[0].value)
      .children()[2].id; //알림 수신자 회원번호
    openModal("cancel");
  });
  $(".process").on("click", ".completeBtn", function () {
    //리스트의 완료버튼을 누를 때
    rsvObj.laundry = $(".processList tr")
      .eq($(this)[0].value)
      .children()
      .eq(3)[0].innerHTML;
    rsvObj.rsvNum = JSON.parse(
      $(".processList tr").eq($(this)[0].value).children().eq(1)[0].innerHTML
    );
    alertObj.addressee = $(".processList tr")
      .eq($(this)[0].value)
      .children()[2].id; //알림 수신자 회원번호
    openModal("complete");
  });

  $("#mask").on("click", function () {
    $("#modal_container").hide();
    $("#mask").hide();
  });
  $("#mask").on("click", function () {
    $("#modal_userInfo").hide();
    $("#mask").hide();
  });
}
function cancel() {
  $.post({
    url: "/cancel.do",
    data: rsvObj,
    success: function (result) {
      //주문완료-complete 반환, 주문취소-cancel 반환
      if (result != "") {
        msgSet(result);
        sendAlarm();
      }
      ajax(pageObj);
      alert("주문이 정상적으로 취소되었습니다.");
      modalClose();
    },
  });
}
function msgSet(result) {
  if (result == "cancel") {
    //주문이 취소되었다면
    alertObj.rsvNum = rsvObj.rsvNum;
    alertObj.msg = "주문번호" + rsvObj.rsvNum + " 가 취소되었습니다.";
    alertObj.typenum = 5;
  } else if (result == "complete") {
    //주문이 완료되었다면
    alertObj.rsvNum = rsvObj.rsvNum;
    alertObj.msg = "주문번호" + rsvObj.rsvNum + "의 세탁이 완료되었습니다.";
    alertObj.typenum = 3;
  } else {
    //console.log("알림메시지 처리 에러");
  }
}
function modalClose() {
  $("#modal_container").hide();
  $("#modal_userInfo").hide();
  $("#mask").hide();
}
function complete() {
  $.post({
    url: "/washingDone.do",
    data: rsvObj,
    success: function (result) {
      if (result != "") {
        //JAVA에서 null 반환시 공백으로 전달
        msgSet(result);
        sendAlarm();
      }
      listAjax();
      alert("작업이 완료되었습니다.");
      modalClose();
    },
  });
}
function enter() {
  if (window.event.keyCode == 13) {
    pageObj.search = $(".search")[0].value;
    pageObj.searchOption = $(".searchBox select")[0].value;
    listAjax();
  }
}
function initSide() {
  $(".side_sub")[0].innerHTML =
    '<button onclick="location.href=' +
    "'/jsp/mypageBiz/mpbProg_Num.jsp'" +
    '">주문번호별</button>' +
    '<button onclick="location.href=' +
    "'/jsp/mypageBiz/mpbProg_Item.jsp'" +
    '">품목별</button>';
  $(".content").css("left", "22vw");
  $(".side_sub").css("display", "unset");
  $(".side button").eq(0).addClass("side_select");
  $(".side_sub button").eq(1).addClass("side_sub_select");
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
function initPageEvent() {
  $(".page_next").click(function () {
    if (!$(this).hasClass("no")) {
      pageObj.currentPageNum += 1;
      listAjax();
    }
  });
  $(".page_prev").click(function () {
    if (!$(this).hasClass("no")) {
      pageObj.currentPageNum -= 1;
      listAjax();
    }
  });
  $(".page_prevBlock").click(function () {
    if (!$(this).hasClass("no")) {
      pageObj.currentPageNum = pageObj.blockFirstPageNum - 1;
      listAjax();
    }
  });
  $(".page_nextBlock").click(function () {
    if (!$(this).hasClass("no")) {
      pageObj.currentPageNum = pageObj.blockLastPageNum + 1;
      listAjax();
    }
  });
  $(".page_btn").on("click", ".page_list", function () {
    if (pageObj.currentPageNum != JSON.parse($(this).html())) {
      pageObj.currentPageNum = JSON.parse($(this).html());
      listAjax();
    }
  });
}
function initPageObj(data) {
  pageObj.blockLastPageNum = data.blockLastPageNum;
  pageObj.blockFirstPageNum = data.blockFirstPageNum;
  pageObj.isNextBlockExist = data.isNextBlockExist;
  pageObj.isNextExist = data.isNextExist;
  pageObj.isPrevBlockExist = data.isPrevBlockExist;
  pageObj.isPrevExist = data.isPrevExist;
  if(data.totalPostCount==0){
    $('.noList').attr('style','');
}
  initPageBtn();
}
function resetSearch() {
  pageObj.search = "";
  pageObj.searchOption = 0;
  $(".search")[0].value = "";
  $(".searchBox select").eq(0).prop("selected", true);
}
function listAjax() {
  $.post({
    url: "/getRsvListBs.do",
    data: pageObj,
    success: function (data) {
      let result = JSON.parse(data);
      $(".content_header p:nth-child(1) span").html(result.totalPostCount);// 총 개수 반영
      let list = result.rsvListLno;
      printlist(list); // 리스트 출력
      initPageObj(result); // 객체 초기화
    },
    fail: function(){
      alert("페이지를 불러올 수 없습니다.");
      location.href="/index.do"; // 메인 페이지로 이동
    }
  });
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
    modalClose();
  });
}
function openModal(button) {
  $("#mask").show();
  $("#modal_container").show();
  if (button == "cancel") {
    //취소버튼이 눌려서 모달이 열렸다면
    $("#modal_foot p")[0].innerHTML = "정말 취소하시겠습니까?";
    $("#ok")[0].innerHTML = "취소하기";
  } else {
    //완료버튼이 눌려서 모달이 열렸다면
    $("#modal_foot p")[0].innerHTML = "정말 완료하시겠습니까?";
    $("#ok")[0].innerHTML = "완료하기";
  }
}
function operate() {
  if ($("#ok")[0].innerHTML == "취소하기") {
    //버튼이 취소하기라면,
    cancel();
  } else {
    //버튼이 완료하기라면
    complete();
  }
}
function today() {
  var date = new Date();
  var mm = date.getMonth() + 1;
  var dd = date.getDate();
  var today =
    date.getFullYear() +
    "." +
    (mm < 10 ? "0" + mm : mm) +
    "." +
    (dd < 10 ? "0" + dd : dd);
  return today;
}
function printHeader(key, value) {
  if ($(".selectbox select")[0].value == 1) {
    //정렬이 주문번호 순이라면,
    if (key == 0 && value.rsvDate.substr(0, 10) == today()) {
      $(".process p")[0].innerHTML = "오늘 주문";
    } else if (key == 0) {
      $(".process p")[0].innerHTML = "지난 주문";
    } else if (
      $(".process p")[0].innerHTML == "오늘 주문" && //첫 번째 라벨이 오늘 주문이라면
      $(".process p")[1] == undefined && //두 번째 라벨이 없다면
      value.rsvDate.substr(0, 10) != today()
    ) {
      //날짜가 오늘날짜가 아니라면
      $(".process").append('<p class="processTitle">지난 주문</p>');
    }
  } else {
    //정렬이 남은일자 순이라면
    if (key == 0) {
      //첫 번째라면
      if (value.dDay < 0) {
        //남은 기한이 음수라면
        $(".process p")[0].innerHTML = "기한을 넘긴 주문";
        $(".process p")[0].style.color = "red";
      } else if (value.dDay <= 3) {
        //남은 기한이 3미만
        $(".process p")[0].innerHTML = "마감이 임박한 주문";
      } else if (value.dDay > 3) {
        //남은 기한이 3이상
        $(".process p")[0].innerHTML = "기한이 넉넉한 주문";
      }
    } else if ($(".process p")[1] == undefined) {
      //두 번째 제목이 선정되지 않았다면
      if ($(".process p")[0].innerHTML == "기한을 넘긴 주문") {
        //첫 번째 제목이 기한을 넘긴 주문이라면
        if (value.dDay <= 3 && value.dDay >= 0) {
          $(".process").append(
            '<p class="processTitle">마감이 임박한 주문</p>'
          );
        } else if (value.dDay > 3) {
          $(".process").append(
            '<p class="processTitle">기한이 넉넉한 주문</p>'
          );
        }
      } else if (
        $(".process p")[0].innerHTML == "마감이 임박한 주문" && //첫 번째 제목이 마감임박 주문이고
        value.dDay > 3
      ) {
        //기한이 3일 이상이라면
        $(".process").append('<p class="processTitle">기한이 넉넉한 주문</p>');
      }
    } else if ($(".process p")[2] == undefined) {
      //3번째 제목이 선정되지 않았다면
      if (
        value.dDay > 3 &&
        $(".process p")[1].innerHTML != "기한이 넉넉한 주문"
      ) {
        $(".process").append('<p class="processTitle">기한이 넉넉한 주문</p>');
      }
    }
  }
}
function printlist(list) {
  var date;
  var time;
  $(".processList").remove();
  $(".processTitle").remove();
  $(".order p")[0].style.color = null;
  $.each(list, function (key, value) {
    printHeader(key, value);
    date= value.rsvDate.slice(0,10);
    time=value.rsvDate.substr(11);
    $(".process").append(
      '<table class="processList">' +
        "<tr>" +
        "<td>" +
        date+'<br>'+time+
        "</td>" +
        "<td>" +
        value.rsvNum +
        "</td>" +
        '<td id="' +
        value.mno +
        '"><button class="btn_info" onclick="modal_userInfo(' +
        value.mno +
        ')">' +
        value.mname +
        "</td>" +
        "<td>" +
        value.laundry +
        "</td>" +
        "<td>" +
        value.count +
        "</td>" +
        (value.dDay < 0
          ? '<td style="color:red;">D+' + value.dDay * -1 + "</td>"
          : "<td>D" + value.dDay * -1 + "</td>") +
        '<td><div><button class="cancelBtn" value=' +
        key +
        ">취소하기</button>" +
        '<button class="completeBtn" value=' +
        key +
        ">작업완료</button></div></td>" +
        "</tr>" +
        "</table>"
    );
  });
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
           
        )
      }   

  });
}
