<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page import="java.util.List"%>
<%@ page import="com.kkaekkt.biz.user.BusinessVO"%>
<%@ page import="com.kkaekkt.biz.reservation.ReservationListVO"%>
<%@ page import="com.kkaekkt.biz.comm.LaundryVO"%>
<%@taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>매장관리</title>
<link rel="stylesheet" href="/css/mpbProg_Num.css">
<link rel="stylesheet" href="/css/orderList.css">
</head>

<body>
	<div id="mask"></div>
	<jsp:include page="/jsp/headerBs.jsp"/>
	<div class="body_container">
		<div class="my_container">
			<jsp:include page="sidebar_bs.jsp"/>
			<div class="content">
				<jsp:include page="/jsp/noListPage.jsp"></jsp:include>
				<div class="content_header">
					<p>전체 개수 <span></span> 개</p>
					<div class="searchBox">
						<select>
							<option value="1">이름</option>
							<option value="2">주문번호</option>
						</select>
						<i class="fas fa-search"></i>
						<input type="text" class="search" value="" onkeypress="enter()">
					</div>
				</div>
				<hr>
				<div class="process">
					<div class="order">
						<p>오늘 주문</p>
						<div class="selectbox">
							<label class="select">주문번호 순</label>
							<select>
								<option value=1>주문번호 순</option>
								<option value=2>남은일자 순</option>
							</select>
						</div>
					</div>
					<table class="processHeader">
						<tr>
							<th>주문일</th>
							<th>주문번호</th>
							<th>주문자</th>
							<th>상품명</th>
							<th>개수</th>
							<th>금액</th>
							<th>처리상황</th>
							<th>남은일자</th>
							<th>상태변경</th>
						</tr>
					</table>
				</div>
				<div class="page_btn_container">
					<ul class="page_btn">
						<!-- 맨처음으로 버튼 -->
						<li class="page_prevBlock"><i class="fas fa-angle-double-left"></i></li> 
						<!-- 이전 -->
						<li class="page_prev">
							<i class="fas fa-angle-left"></i>
						</li>
						<!-- 다음버튼 -->
						<li class="page_next">
							<i class="fas fa-angle-right"></i>
						</li>
						<!-- 맨마지막으로 버튼 -->
						<li class="page_nextBlock"><i class="fas fa-angle-double-right"></i></li>
					</ul>
				</div>
			</div>
		</div>
		<div id="modal_container">
			<button id="modal_close"><i class="fas fa-times"></i></button>
			<div id="modal_bodycont">
					<div id="modal_foot">
						<p style="text-align: center;"></p>
						<div id="review_btn">
							<button id="closeBtn">돌아가기</button>
							<button id="ok"></button>
						</div>                
					</div>
			</div>
		</div>
		<div id="modal_userInfo">
			<button id="modal_close" onclick="modalClose()"><i class="fas fa-times"></i></button><br>
			<h2>고객정보</h2>
			<hr>
			<div id="userInfo_bodycont">
			
			</div>
			<div id="modal_foot">
				<p style="text-align: center;"></p>
				<div id="review_btn">
					<button id="openChatBtn">채팅</button>
					<button id="closeBtn" onclick="modalClose()">돌아가기</button>
				</div>                
			</div>			 
		</div>
	</div>
	<script src="https://kit.fontawesome.com/2fc57dd2db.js"
		crossorigin="anonymous"></script>
	<script>
		var pageObj={//세션에 의존적인 설계는 MVC 설계가 아니지만, 방법을 찾지 못했다..
                bno:${sessionScope.user.bno},
				currentPageNum:1,//현재 페이지 1
				listType:3,//처리중-주문번호별
				state:1,
				order:1 //주문번호 순
            };
		var rsvObj={};
		var username=`${sessionScope.user.name}`;
	</script>
	<script src="/js/mpbProg_Num.js"></script>
</body>
</html>