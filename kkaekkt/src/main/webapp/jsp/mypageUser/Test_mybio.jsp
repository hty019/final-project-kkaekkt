<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<script src="https://code.jquery.com/jquery-1.12.4.min.js"></script>
<link rel="stylesheet" href="/css/mybio.css">

</head>

<body>
	<jsp:include page="/jsp/header1.jsp"></jsp:include>

	<div class="body_container">
		<jsp:include page="sidebar_ps.jsp"></jsp:include>
		<div class="content">
			<form action="/updatePs.do" method="POST" name="mybio">
				<h3 id="mybio_title">내 정보</h3>
				<button type="button" id="btn_mybio">수정하기</button>
				<div id="btn_mybioClick">
					<button type="button" id="btn_mybiofin">수정완료</button>
					<button type="button" id="btn_back">돌아가기</button>
				</div>

				<!-- 회원탈퇴 -->
				<div class="delete">
					<form action="/deletePs.do" method="POST" name="userDel">
						<input type="submit" id="userDel" value="회우너탈퇴"/>
					</form>
				</div>
				<hr>
				<div id="mybio_info">
					<table>
						<tr>
							<td>아이디</td>
							<td><input type="text" id="read" name="id" readonly></td>
						</tr>
						<tr>
							<td>이름</td>
							<td><input type="text" id="read" name="mname" readonly></td>
						</tr>
						</tr>
						<tr>
							<td>비밀번호</td>
							<td><input name="password" type="password" id="curpwd">
								<button type="button" id="btn_checkpwd">수 정</button> <label
								id="checkpwd"></label></td>
						</tr>
						<div id="btn_mybiopwd">
							<tr>
								<td>새 비밀번호</td>
								<td><input type="password" id="pwd"><label
									id="checkval"></label></td>
							</tr>
							<tr>
								<td>새 비밀번호 확인</td>
								<td><input type="password" id="newpwd">
									<button type="button" id="btn_updatepwd">변경하기</button> <label
									id="match"></label></td>
							</tr>
						</div>
						<tr>
							<td><input type="hidden" name="mno" value="" id="mno">
								<!-- 회원번호 -->
						</tr>
					</table>
					<div id="mybioPhone">
						연락처<br> <input id="phone1" type='text' maxlength='3'>
						- <input id="phone2" type="text" maxlength='4'> - <input
							id="phone3" type="text" maxlength='4'> <input
							name="phone" type="tel" id="phone" value="" hidden>
					</div>
					<div id="mybioBirth">
						생년월일<br> <input name="birth" type="text" id="input2 birth"
							value=""><label id="checkbirth" value=""></label>
					</div>
					<div>
						이메일<br> <input name="email" type="email" value="" id="email"
							class="mail_input">
						<button type="button" id="btn_checkemail"
							class="mail_check_button">이메일인증</button>
						<label id="checkemail" value=""></label></br>
						<div id="mailChkDiv">
							<input class="mail_check_input" id="mail_check_input_box_false"
								disabled="disabled"><span id='timeout'></span>
							<button type="button" id="mail_check">확인</button>
							</td> <br>
						</div>
					</div>
					<div id="mybioAddress">
						주소<br> <input type="text" id="postcode" placeholder="우편번호">
						<button type="button" onclick=execDaumPostcode() id="btn_address">우편번호
							찾기</button>
						<br> <input type="text" id="roadAddress" placeholder="도로명주소"><br>
						<!-- <span id="guide" style="color:#999;"></span><br> -->
						<input type="text" id="detailAddress" placeholder="상세주소">
						<input type="text" id="extraAddress" placeholder="참고항목"> <span
							id="guide" style="color: #999; display: none"></span><br> <input
							type="hidden" name="address" id="address" value="">
						<!--여기에 디비로 보낼 도로명주소+상세주소 해서 보내기-->

						<script
							src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
						<script src="/js/adress.js"></script>

					</div>
				</div>

			</form>
		</div>
	</div>
	<script>
		var pageObj = {//세션에서 정보를 받아오는건 독립된 js파일에서 불가능, jsp 내에서만 가능하기 때문에 여기서 값을 받아준다.
			mno : '${sessionScope.person.mno}',
			id : '${sessionScope.person.id}',
			name : '${sessionScope.person.name}',
			password : '${sessionScope.person.password}',
			phone : '${sessionScope.person.phone}',
			birth : '${sessionScope.person.birth}',
			email : '${sessionScope.person.email}',
			address : '${sessionScope.person.address}',
			state : '${sessionScope.person.state}'

		};
	</script>
	<script src="/js/mybio.js"></script>



</body>
</html>
