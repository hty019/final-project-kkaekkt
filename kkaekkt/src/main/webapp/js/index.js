//전역변수 선언-모든 홈페이지에서 사용 할 수 있게 index에 저장
var socket = null;

$(document).ready(function () {
  connectWs();
  fadeIn();
  initIndexEvent();
});
function connectWs() {
  socket = new WebSocket("ws://localhost:8080/echo.do");
  // socket = new WebSocket("ws://54.180.33.3:8080/echo.do");
  socket.onopen = function () {
    console.log("info: connection opened.");
  };
  socket.onmessage = function (evt) {
    console.log('메시지 수신');
    //socket.send 했을 때 데이터를 받는 메서드이다.
    var data = evt.data;
    var msgType = data.substr(0,1);//메시지의 타입번호를 받는다. 0=알림, 1=채팅, 2=읽었다는 신호
    var msgText = data.substr(1); //메시지 영역의 텍스트를 추출한다.
    switch(msgType){
      case "0": //메시지 타입이 알람이라면
      const noticeBox = document.getElementById("noticeBox");
      const noticeUl = noticeBox.getElementsByTagName("ul")[0];
        noticeUl.prepend(msgText);
        upAlertDotCount();
        break;
      case "1": //메시지 타입이 채팅이라면
        //메시지의 포맷 = 발신자 번호,name:발신인 명,roomnum:방번호,content:내용
        const nameIdx=msgText.indexOf(',name:');
        const roomnumIdx=msgText.indexOf(',roomnum:');
        const contentIdx=msgText.indexOf(',content:');
        const sendermno=msgText.slice(0,nameIdx); //발신자 번호
        const senderName=msgText.slice(nameIdx+6,roomnumIdx); //발신자 명
        const roomnum=msgText.slice(roomnumIdx+9,contentIdx); //방번호
        const content=msgText.slice(contentIdx+9); //내용
        
        const $guestRoomLi=document.getElementById(sendermno+'roomLi'+roomnum);//헤더의 채팅방 리스트에 상대방과의 채팅방 추출
        const $guestRoom=document.getElementById(sendermno+'room'+roomnum);
        if($guestRoom!=undefined){//상대방과 열려있는 채팅방이 있다면
          console.log('채팅 읽음 입장');
          var chat={//채팅로그를 더하기 위한 객체
            roomnum:roomnum,
            sender:sendermno,
            content:content,
            stime:dateTime(),
            state:1
          }
          readChat({roomnum:roomnum,sender:chatObj.sender});
          appendChat(chat);//채팅로그를 추가한다.
        }else{//열려있는 채팅방이 없다면
          if($guestRoomLi!=undefined){//헤드 채팅방 리스트에 해당 채팅방이 있다면
            initLastChat(roomnum,content);
            rlDotCountUp(roomnum);
          }else{//헤드 채팅방 리스트에 해당 채팅방이 없다면
            var room={//헤드의 채팅방을 만들기 위한 객체
              addressee:sendermno,
              roomnum:roomnum,
              guest:senderName,
              content:content,
              counts:1
            };
            printRoomLi(room);//헤더에 상대방과의 채팅방을 생성한다.
          }
        }
        break;
      case "2": //메시지의 타입이 읽었다는 신호라면, msgText==방 번호
        const roomno=msgText;
        const $chatBox=document.querySelector('.chatBox[id$=room'+roomno+']'); //방 번호로 해당 채팅방 찾기
        const $readSpan=$chatBox.querySelectorAll('.chatStNum'); // 해당 채팅방의 모든 채팅 읽음 상태 span 선택
        if(chatBox!=undefined){//만약 해당 채팅방을 열어놓은 상태라면
            readSet($readSpan);//채팅방의 모든 로그를 읽음처리한다.
        }
        break;
    }
  };
  socket.onclose = function () {
    console.log("connect close");
  };
  socket.onerror = function (err) {
    console.log("Errors : ", err);
  };
}
function fadeIn() {
  const fadeH1 = document.getElementsByTagName("h1");
  const h1List = Array.prototype.slice.call(fadeH1);
  // fadeH1.addClass("animate__animated animate__fadeInUp");
  // $(".search_tab").addClass("animate__animated animate__fadeInUp");
  // $(".search_box").addClass("animate__animated animate__fadeInUp");
}

// $(".btn1").click(function () {
//   $(this).toggleClass("btn_selected");
//   $(".btn2").removeClass("btn_selected");
// });
// $(".btn2").click(function () {
//   $(this).toggleClass("btn_selected");
//   $(".btn1").removeClass("btn_selected");
// })
function initIndexEvent(){
  const search_tabBtn=document.querySelectorAll('.search_tab button');
  
  [].forEach.call(search_tabBtn,function(e) {
    e.addEventListener("click",(event)=>{ //람다식 사용
      event.target.classList.add('btn_selected');
      //정리하면, 리턴은 Static Collection 이며, 배열 함수를 적용할 수 없으므로,
      //filter 메서드도 적용할 수 없다. 
      event.target.previousElementSibling.classList.remove('btn_selected');
    });
  });
}
function showMap() {
	var num = ""
	var inputText = $("#searchBar").val();

	num = $('.btn_selected').attr('value');
	
	if(num == "" || inputText == ""){
    alert("거주하는 시/군/구와 동이름을 입력해주세요. ")
    return;
  }
	
	var mapUrl = '/showMap.do'	
	switch (num) {
	case "1":
		location.href = mapUrl+'?type=1&search='+inputText;
		break;

	case "2":
		location.href = mapUrl+'?type=2&search='+inputText;
		break;
	}

}
function readSet(span){
  for(let i=0;i<span.length;i++){
    span[i].innerText='읽음';
    span[i].style.color='var(--text-gray)';
  }
}
