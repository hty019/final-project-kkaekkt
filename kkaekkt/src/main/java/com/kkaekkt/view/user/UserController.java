package com.kkaekkt.view.user;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.Gson;
import com.kkaekkt.biz.comm.LaundryVO;
import com.kkaekkt.biz.user.BusinessListVO;
import com.kkaekkt.biz.user.BusinessVO;
import com.kkaekkt.biz.user.PersonVO;
import com.kkaekkt.biz.user.UserService;

@Controller
public class UserController {
	@Autowired
	UserService userService;
	
//	@RequestMapping(value="/login.do", method=RequestMethod.POST) //인터페이스로 VO를 합칠지 고민 중..
//	public String Join(PersonVO vo) {
//		userService.insertUser(vo);		
//		return "Join.html";
//	}
//	@RequestMapping(value="/logout.do", method=RequestMethod.POST)
//	public String Join(PersonVO vo) {
//		userService.insertUser(vo);		
//		return "Join.html";
//	}
	@RequestMapping(value="/likeOff.do",method=RequestMethod.POST)
	@ResponseBody
	public void likeOff(BusinessVO vo) {
		userService.likeOff(vo);
	}
	@RequestMapping(value="/getLikedBs.do",method=RequestMethod.POST,produces="application/text;charset=utf-8")
	@ResponseBody
	public String getLikedBs(BusinessListVO vo) {
		Gson gson=new Gson();
		return gson.toJson(userService.getLikedBs(vo));
	}
	@RequestMapping(value="/joinPs.do", method=RequestMethod.POST)
	public String Join(PersonVO vo) {
		userService.insertUser(vo);
		return "index.jsp";
	}
	@RequestMapping(value="/joinBs.do", method=RequestMethod.POST)
	public String Join(BusinessVO vo) {
		System.out.println("메서드 진입");
		userService.insertUser(vo);
		return "index.jsp";
	}
	@RequestMapping(value="/updatePs.do", method=RequestMethod.POST)
	public String Update(PersonVO vo, HttpSession session) {
		System.out.println(vo);
		userService.updateUser(vo);
		if(vo.getId() != null) {
			PersonVO member = userService.getUser(vo);
			session.setAttribute("member", member);
		} 
		return "/jsp/mypageUser/mybio.jsp";
	}
	
	// 로그인
		@RequestMapping(value = "/login.do", method = RequestMethod.POST)
		public String Login(PersonVO vo, HttpSession session) {
			System.out.println("로그인처리");
			PersonVO member = userService.getUser(vo);
			session.setAttribute("member", member);
			
			if(member.getId() == null || member.getPassword() == null) {
				System.out.println("사용자 정보가 없습니다.");
				return "/jsp/login/login.jsp";
			}else{	
				return "/jsp/index.jsp";
			}

		}
	// 일반사양관리
		@RequestMapping(value="/selectComspec.do", method=RequestMethod.POST, produces="application/text;charset=utf-8")
		@ResponseBody
		public String SelcetComspec(BusinessVO vo) {
			System.out.println(vo);
			Gson gson=new Gson();
			String test=gson.toJson(userService.getComspec(vo));
			System.out.println("test:" + test);
			return test;
		}
}
