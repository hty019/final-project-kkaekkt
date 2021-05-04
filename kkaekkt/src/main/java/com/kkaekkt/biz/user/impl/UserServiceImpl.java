package com.kkaekkt.biz.user.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.gson.Gson;
import com.kkaekkt.biz.comm.ChatVO;
import com.kkaekkt.biz.comm.EquipmentVO;
import com.kkaekkt.biz.comm.EtcVO;
import com.kkaekkt.biz.comm.LaundryVO;
import com.kkaekkt.biz.comm.ScheduleVO;
import com.kkaekkt.biz.user.AccountVO;
import com.kkaekkt.biz.user.BusinessVO;
import com.kkaekkt.biz.user.PersonVO;
import com.kkaekkt.biz.user.UserService;

@Service("userService")
public class UserServiceImpl implements UserService {
	@Autowired
	UserDAO userDao;

	@Override
	public void insertUser(PersonVO vo) {
		userDao.insertUser(vo);
	}
	@Override
	public void likeOff(BusinessVO vo) {
		userDao.likeOff(vo);
	}
	@Override
	public void likeOn(BusinessVO vo) {
		userDao.likeOn(vo);
	}
	@Override
	public List<BusinessVO> getLikedBs(int mno) {
		return userDao.getLikedBs(mno);
	}
	@Override
	public int countLikeBs(BusinessVO vo) {
		return userDao.countLikeBs(vo);
	}
	@Override
	public double avgGradeBs(BusinessVO vo) {
		return userDao.avgGradeBs(vo);
	}

	@Override
	public void insertUser(BusinessVO vo) {
		vo.setScheduleList(convertToObj(vo.getSchedule(), ScheduleVO.class));
		if (vo.getBizType() == 1) { // 일반 세탁소라면
			vo.setLaundryList(convertToObj(vo.getLaundry(), LaundryVO.class));
		} else {
			vo.setEquipmentList(convertToObj(vo.getEquipment(), EquipmentVO.class));
			vo.setEtcList(convertToObj(vo.getEtc(), EtcVO.class));
		}
		userDao.insertUser(vo);
	}

	@Override
	public void updateUser(PersonVO vo) {
		userDao.updateUser(vo);

	}

	@Override
	public void updateUser(BusinessVO vo) {
		userDao.updateUser(vo);

	}

	@Override
	public String deleteUser(AccountVO vo) {
		int result = userDao.orderChk(vo);

		// result가 0이면 삭제
		// 1이면 삭제 안 함
		if (result == 0) {
			// 삭제부분
			userDao.deleteUser(vo);
			return "success";
		} else if(result != 0) {
			// 예약있음
			return "fail";
		}
		return null;
	}	
	// 로그인 들
	
	
//	@Override
//	public int idchkBs(BusinessVO vo) {
//		System.out.println("아이디 찾는 서비스 옴 -- 업체");
//		return userDao.idchkBs(vo);
//	}

	@Override
	public AccountVO getUser(AccountVO vo) {
		return userDao.getUser(vo);
	}
	
	public AccountVO method(AccountVO vo) {
		System.out.println("소셜유저로그인 servie옴");
		return userDao.getUserSNS(vo);
	}

	public <T> List<T> convertToObj(String json, Class<T> type) {
		String data = json.substring(1, json.length() - 1); // 양 끝의 [ ] 제거
		String[] dataArray = data.split("},"); // {~},{~} 을 split하여 배열로 나눔
		List<T> list = new ArrayList<T>();
		Gson gson = new Gson();
		for (int i = 0; i < dataArray.length; i++) {
			if (i != dataArray.length - 1) {// 만약 마지막 { ~ }이 아니라면,
				dataArray[i] += "}";// split 과정에서 떨어졌던 '}'를 붙여준다.
			}
			list.add(gson.fromJson(dataArray[i], type));//지정한 타입으로 형변환 후 리스트에 저장
		}
		return list;
	}

	@Override
	public BusinessVO getComspec(BusinessVO vo) {
		vo.setLaundryList(userDao.getLaundry(vo.getBno()));
		vo.setScheduleList(userDao.getSchedule(vo.getBno()));
		return vo;
	}

	@Override
	public BusinessVO getCoinspec(BusinessVO vo) {
		vo.setEquipmentList(userDao.getEquipment(vo.getBno()));
		vo.setEtcList(userDao.getEtc(vo.getBno()));
		vo.setScheduleList(userDao.getSchedule(vo.getBno()));
		return vo;
	}

	public void updateSpec(BusinessVO vo) {
		vo.setScheduleList(convertToObj(vo.getSchedule(), ScheduleVO.class));
		if (vo.getBizType() == 1) { // 일반 세탁소라면
			vo.setLaundryList(convertToObj(vo.getLaundry(), LaundryVO.class));
		} else {
			vo.setEquipmentList(convertToObj(vo.getEquipment(), EquipmentVO.class));
			vo.setEtcList(convertToObj(vo.getEtc(), EtcVO.class));
		}

		userDao.updateSpec(vo);
	}

	@Override
	public AccountVO findId(AccountVO vo) {
		return userDao.findId(vo);
	}

	@Override
	public AccountVO findPw(AccountVO vo) {
		return userDao.findPw(vo);
	}

	@Override
	public int idchk(PersonVO vo) {
		return userDao.idchk(vo);
	}
	@Override
	public int emailchk(String email) {
		return userDao.emailchk(email);
	}

	@Override
	public AccountVO joinCfm(AccountVO vo) {
		return userDao.joinCfm(vo);
	}
    // PW 변경
    @Override
    public void updatePw(AccountVO vo) {
        userDao.updatePw(vo);
    }
	@Override
	public PersonVO getPerson(int mno) {
		return userDao.getPerson(mno);
	}
	@Override
	public BusinessVO getBusiness(BusinessVO vo) {
		return userDao.getBusiness(vo);
	}
	@Override
	public List<LaundryVO> getLaundryList(String bno) {
		return userDao.getLaundry(bno);
	}
	@Override
	public void deleteUser(BusinessVO vo) {
		//
	}
	@Override
	public int bnoChk(String bno) {
		return userDao.bnoChk(bno);
	}
	@Override
	public Map<String,Object> crtRoom(ChatVO vo) {
		Map<String,Object> map=new HashMap<String,Object>();
		int result=userDao.chkRoom(vo);
		if(result==0) {//만약 방이 없다면
			userDao.createRoom(vo);//방을 만들고
			result=userDao.chkRoom(vo);//방 번호를 받아서
			map.put("roomnum", result);//맵에 넣고 전달한다. 
		}else {//만약 방이 있다면
			map.put("roomnum",result); //방 번호를 맵에 넣는다.
			vo.setRoomnum(result);//방 번호를 입력한 후
			vo.setCloser(vo.getSender());//내가 나갔는 지 확인하기 위해 closer 필드에 본인의 번호를 넣는다.
			ChatVO closer=userDao.chkCloser(vo);//본인이 나간 사람인 지 체크한다(리턴은 나간 시간과 상태를 받는다)
			if(!closer.getClosetime().equals("null")&&closer.getState()==0) {//나간 사람이고, 들어온 상태가 아니라면
				userDao.updateCloserIn(vo); //들어온 상태로 변환한다.
			}else {//본인이 나간사람이 아니거나, 들어온 상태의 사람이라면
				userDao.updateChatRog(vo);//수신자가 본인인 메시지를 읽음상태로 전환한다.
				vo.setClosetime(closer.getClosetime());//받아온 종료시점을 입력한다.
				map.put("chatRog",userDao.getChatRog(vo));//쌓인 채팅로그를 리스트로 받아온다.
			}
		}
		return map;
	}
	@Override
	public void sendChat(ChatVO vo) {
		userDao.insertChatRog(vo);
		vo.setCloser(vo.getAddressee());//상대가 나갔는 지 확인하기 위해 closer 필드에 상대방의 번호를 넣는다.
		ChatVO closer=userDao.chkCloser(vo);//상대가 나간사람인 지 체크한다.
		if(!closer.getClosetime().equals("null")&&closer.getState()==0) {//상대가 나간 사람이고, 들어온 상태가 아니라면
			userDao.updateCloserIn(vo); //들어온 상태로 변환한다.
		}
	}
	@Override
	public void readChat(ChatVO vo) {
		userDao.updateChatRog(vo);
	}
	@Override
	public void exitChatRoom(ChatVO vo) {
		int result=userDao.chkGuestClose(vo);
		if(result==0) {//상대방이 나가지 않았다면
			result=userDao.chkCloserMe(vo);//내가 나간 기록이 있는 지 체크
			if(result==0) {//기록이 없다면 insert
				userDao.insertCloser(vo);
			}else {//기록이 있다면 update
				userDao.updateCloserOut(vo);
			}
		}else {//상대방이 나갔다면
			userDao.deleteRoom(vo);
		}
	}
	@Override
	public List<ChatVO> readChatRog(ChatVO vo) {
		ChatVO closer=userDao.chkCloser(vo);
		vo.setClosetime(closer.getClosetime());//나간 시간을 입력한다.
		userDao.updateChatRog(vo);//로그를 읽음처리한다.
		return userDao.getChatRog(vo);//채팅 로그를 가져온다.
	}
	@Override
	public List<ChatVO> initRoomLi(ChatVO vo) {
		return userDao.getMyRoomLi(vo);
	}
}
