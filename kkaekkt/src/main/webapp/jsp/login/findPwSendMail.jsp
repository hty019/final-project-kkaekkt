<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
	<!DOCTYPE html>
	<html lang="en">

	<head>
		<meta charset="UTF-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>Document</title>
		<link rel="stylesheet" href="/css/find.css">
		<script src="https://kit.fontawesome.com/2fc57dd2db.js" crossorigin="anonymous"></script>
		<style>
			.val input {
				margin: 0 0 15px;
			}

			.val button {
				margin-top: 15px;
			}

			.veri_btn {
				height: 250px;
			}
		</style>
	</head>

	<body>
		<jsp:include page="/jsp/header0.jsp"></jsp:include>

		<div class="body_container">
			<nav class="find_nav">
				<div class="id">아이디 찾기</div>
				<div class="pw" style="color: aquamarine;">비밀번호 찾기</div>

			</nav>
			<p>
				<span style="font-weight:bolder;">${userPW.id}</span>님, 해당 아이디에 등록된 이메일로 인증 후 비밀번호 변경이 가능합니다.
			</p>

			<form action="" method="POST">
				<div class="veri_btn val" style="text-align: center;">
					<p>
						${userPW.mmail}${userPW.bmail}로 인증 메일을 전송하시겠습니까?
					</p>
					<button type="submit" name="submit">확인</button>
				</div>
			</form>

			<div class="mail">
				아이디가 기억나지 않는다면 아이디를 먼저 찾아주세요. <br> 비밀번호 찾기 시 문제가 있나요? <a href="mailto:info@kkaekkt.com">고객센터</a>
			</div>
		</div>



	</body>

	</html>