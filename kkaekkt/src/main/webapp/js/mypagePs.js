$(document).ready(function() {
    initSide();
    initEvent();
    ajax(); //처음 마이페이지 들어왔을 때, 진행중 주문 항목 출력
});
function initEvent() {
	var rsvNum;
    $('.rsvList').on("click",".detailBtn",function() { // 버블링으로 생성된 주문에 클릭 이벤트 활성화
		rsvNum=$(this).attr('id').substr(9);
        $('#detail'+rsvNum).toggleClass('none');
    });
    $('.rsvList').on("click",".cancelBtn",function() {//주문 취소 버튼이 눌렸을 경우
        rsvNum=Number($(this).attr('id').substr(9));
        alertObj.addressee=Number($('#rsvBox'+rsvNum+' .mno').eq(0).attr('id').substr(3));
        cancelRsv(rsvNum);
    });
    $('.rsvList').on("click",".chatBtn",function() {
        //채팅방 만들기 코드
        var rsvNum=Number($(this).attr('id').substr(7));//chatBtn+주문번호 형식의 id에서 주문번호 추출
        var addressee=Number($('#rsvBox'+rsvNum+' .mno').eq(0) //해당 예약번호의 주문박스 안에 mno클래스로 접근
                                                        .attr('id') //id 요소에 접근
                                                        .substr(3)); //mno+업체회원번호 형식의 id에서 업체회원번호 추출
        if($('.chatBox[id^='+addressee+'room]')[0]!=undefined){
            $('.chatBox[id^='+addressee+'room]').remove();
        }else{
            chatObj.mno=alertObj.sender;
            chatObj.addressee=addressee;
            var guest=$('#rsvBox'+rsvNum+' .mno')[0].innerHTML;//해당 예약번호의 주문박스 안에 mno클래스로 접근해서 업체명을 추출
            chatObj.bno=$('#rsvBox'+rsvNum+' .like').eq(0)//해당 예약번호의 주문박스 안에 like클래스로 접근
                                                           .attr('value');//value 속성으로 접근해서 업체번호 추출
            crtRoom(guest);
        }
    });
    //
    $('.page_next').click(function() {
        if(!$(this).hasClass('no')) {
            pageObj.currentPageNum+=1;
            ajax();
        }
    });
    $('.page_prev').click(function() {
        if(!$(this).hasClass('no')) {
            pageObj.currentPageNum-=1;
            ajax();
        }
    });
    $('.page_prevBlock').click(function() {
        if(!$(this).hasClass('no')) {
            pageObj.currentPageNum=pageObj.blockFirstPageNum-1;
            ajax();
        }
    });
    $('.page_nextBlock').click(function() {
        if(!$(this).hasClass('no')) {
            pageObj.currentPageNum=pageObj.blockLastPageNum+1;
            ajax();
        }
    });
    $('.page_btn').on("click",".page_list",function() {
        if(pageObj.currentPageNum!=JSON.parse($(this).html())) {
            pageObj.currentPageNum=JSON.parse($(this).html());
            ajax();
        }
    });
    $('.rsvList').on('click','i.fa-heart',function() {//좋아요버튼
        likeObj.bno=$(this).attr('value');
        if($(this).hasClass('unlike')) {
            $(this).removeClass('unlike');
            likeOn(likeObj);
        }else {
            $(this).addClass('unlike');
            likeOff(likeObj);
        }
    });
    
}
function cancelRsv(rsvNum) {//주문 취소 버튼을 눌렀을 때 함수
    $.post({
        url:"/cancel.do",
        data:{rsvNum:rsvNum},
        success:function(result) {
            if(result!=''){//JAVA에서 null 반환시 공백으로 전달
                alertMsgSet(rsvNum);
                sendAlarm();
            }
            ajax();//초기화
        }
    });
}
function alertMsgSet(rsvNum) { //알림 보낼 메시지를 세팅하는 함수
    alertObj.rsvNum=rsvNum;
    alertObj.typenum=5;
    alertObj.msg='주문번호'+rsvNum+' 가 취소되었습니다.'
}
function likeOff() {
    $.post({
        url:"/likeOff.do",
        data:likeObj,
        success:function() {
        	ajax();
            delete likeObj.bno;//초기화
        }
    });
}
function likeOn() {
    $.post({
        url:"/likeOn.do",
        data:likeObj,
        success:function() {
        	ajax();
            delete likeObj.bno;//초기화
        }
    });
}
function initPageBtn() {
    if(pageObj.isNextExist) {
        $('.page_next').removeClass('no');
    }else {
        $('.page_next').addClass('no');
    }
    if(pageObj.isNextBlockExist) {
        $('.page_nextBlock').removeClass('no');
    }else {
        $('.page_nextBlock').addClass('no');
    }
    if(pageObj.isPrevExist) {
        $('.page_prev').removeClass('no');
    }else {
        $('.page_prev').addClass('no');
    }
    if(pageObj.isPrevBlockExist) {
        $('.page_prevBlock').removeClass('no');
    }else {
        $('.page_prevBlock').addClass('no');
    }
    $('.page_btn .page_list').remove(); //페이지 리스트 초기화
    for(var i=pageObj.blockLastPageNum;i>=pageObj.blockFirstPageNum;i--) {
        if(i==pageObj.currentPageNum) {
            $("<li class='page_list curPage'>"+i+"</li>").insertAfter($('.page_prev')).trigger("create");
        } else {
            $("<li class='page_list'>"+i+"</li>").insertAfter($('.page_prev'));
        }
    }
}
function initPageObj(data) {
    pageObj.blockLastPageNum=data.blockLastPageNum;
    pageObj.blockFirstPageNum=data.blockFirstPageNum;
    pageObj.isNextBlockExist=data.isNextBlockExist;
    pageObj.isNextExist=data.isNextExist;
    pageObj.isPrevBlockExist=data.isPrevBlockExist;
    pageObj.isPrevExist=data.isPrevExist;
    if(pageObj.blockLastPageNum==0){
        $('.noList').attr('style','');
    }
    initPageBtn();
}
function ajax() { //ajax로 리스트 받아오기
    //console.log('ajax 함수 진입');
    $.post({
        url:"/getRsvListPs.do",
        data:pageObj,
        success: function(data) {
            var rsv=JSON.parse(data);
            var list=rsv.rsvListRno;
            initPageObj(rsv);
            printlist(list);
            //console.log('ajax 완료');
        }
    });
}
function initSide() {
    $(".content").css("left", "22vw");
    $('.side_sub').css('display','unset');
    $('.side button').eq(0).addClass("side_select");
    $('.side_sub button').eq(0).addClass("side_sub_select");
    
    $('.side_sub button').click(function() { // 서브 사이드 버튼(진행중인 주문, 완료된 주문) 클릭 시
        if($(this).index()==1){ //완료된 주문일 경우 이동  
            //console.log('완료 페이지로 이동');
            location.href="mypagePs_com.jsp";
        }
    });
}
function today() {
    let today = new Date();   
    let year = today.getFullYear(); // 년도
    let month = today.getMonth() + 1;  // 월
    let date = today.getDate();  // 날짜
    return year+'.'+month+'.'+date;
}
function printlist(list) {
    var price;
    var totalPrice=0;
    $('.rsvList').children().remove();
    $.each(list, function(key,value) {
        $('.rsvList').append(
            '<div class="rsvBox" id="rsvBox'+value.rsvNum+'">'+
                '<table class="rsvTable">'+
                    '<tr>'+
                    '<th colspan="2" class="mno" id="mno'+value.mno+'">'+value.bname+'</th>'+
                        '<td><i class="fas fa-heart like '+(value.like==0?'unlike':'')+'" value='+value.bno+'></i></td>'+
                    '</tr>'+
                    '<tr>'+
                        '<td class="column">주문일시</td>'+
                        '<td>'+value.rsvDate+'</td>'+
                    '</tr>'+
                    '<tr>'+
                        '<td class="column">예약번호</td>'+
                        '<td id="rsvNum'+value.rsvNum+'">'+value.rsvNum+'</td>'+
                    '</tr>'+
                    '<tr>'+
                        '<td class="column">전화번호</td>'+
                        '<td>'+value.phone+'</td>'+
                    '</tr>'+
                    '<tr>'+
                        '<td class="column">주문항목</td>'+
                        '<td><span>'+value.laundryList[0].laundry+'</span>'+
                            (value.laundryList.length-1==0?''://만약 0개라면 공백 아니면 외 ~ 개 추가
                            '</span> 외 <span>'+(value.laundryList.length-1)+'</span>개</td>')+
                    '</tr>'+
                '</table>'+
                '<div id="btnDiv'+value.rsvNum+'" class="btnDiv">'+
                    '<button class="chatBtn" id="chatBtn'+value.rsvNum+'">채팅상담</button>'+
                    '<button id="detailBtn'+value.rsvNum+'"class="detailBtn">상세보기</button>'+
                    (value.timeOut==0?'<button disabled>':'<button id="cancelBtn'+value.rsvNum+'" class="cancelBtn">')// if 리뷰가 없으면 -> 7일이 지났으면 비활성화 아니면 활성화
                    +'주문취소</button>'+
                '</div>'+
                '<div class="detail none" id="detail'+value.rsvNum+'">'+
                    '<hr>'+
                    '<div1-1>'+
                        '<table class="receipt">'+
                            '<tr class="column">'+
                                '<th class="laundry">품목</th>'+
                                '<th class="count">개수</th>'+
                                '<th class="price">가격</th>'+
                            '</tr>'+
                        '</table>'+
                        '<hr>'+
                        '<table class="result">'+
                            '<th>결제금액</th>'+
                            '<td>&nbsp;&nbsp;</td>'+
                            '<td><span class="totalPrice"></span> 원</td>'+
                        '</table>'+
                    '</div1-1>'+
                '</div>'+
            '</div>')+
        '</div>'
    });
    for(var i=0;i<list.length;i++) {//각 주문 별 상세 물품 목록 붙이기
        totalPrice=0;//초기화
        $.each(list[i].laundryList,function(idx,value) {
            price=value.count*value.price;
            totalPrice+=price;
            $('.receipt').eq(i).append(
                '<tr>'+
                    '<td class="laundry">'+value.laundry+'</td>'+
                    '<td class="count">'+value.count+'개</td>'+
                    '<td class="price">'+price+'</td>'+
                '</tr>'
            );
        });
        $('.totalPrice')[i].innerHTML=totalPrice;
    }
}