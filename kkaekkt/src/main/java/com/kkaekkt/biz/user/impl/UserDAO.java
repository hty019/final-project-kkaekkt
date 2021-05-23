package com.kkaekkt.biz.user.impl;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.kkaekkt.biz.comm.ChatVO;
import com.kkaekkt.biz.comm.EquipmentVO;
import com.kkaekkt.biz.comm.EtcVO;
import com.kkaekkt.biz.comm.LaundryVO;
import com.kkaekkt.biz.comm.ScheduleVO;
import com.kkaekkt.biz.user.AccountVO;
import com.kkaekkt.biz.user.BusinessVO;
import com.kkaekkt.biz.user.PersonVO;

@Repository
public class UserDAO {
	@Autowired
	private SqlSessionTemplate mybatis;

	public void likeOff(BusinessVO vo) {
		mybatis.delete("UserDAO.likeOff", vo);
	}
	public void likeOn(BusinessVO vo) {
		mybatis.insert("UserDAO.likeOn",vo);
	}
	public void insertUser(PersonVO vo) {
		mybatis.insert("UserDAO.insertPs", vo);
	}
	public void insertUser(BusinessVO vo) {
		mybatis.insert("UserDAO.insertBs", vo);
	}
	public void updateUser(PersonVO vo) {
		mybatis.update("UserDAO.updatePs", vo);
	}
	public void updateUser(BusinessVO vo) {
		mybatis.update("UserDAO.updateBs", vo);
	}

	public int deleteUser(AccountVO vo) {
		return mybatis.delete("UserDAO.deleteUser", vo);
	}
	
	public int orderChk(AccountVO vo) {
		return mybatis.selectOne("UserDAO.orderChk", vo);
	}

	public void deleteUser(BusinessVO vo) {
		mybatis.delete("UserDAO.deleteBs", vo);
	}

	public List<BusinessVO> getLikedBs(int mno) {
		return mybatis.selectList("UserDAO.getLikedBs", mno);
	}
	// 아이디 중복확인
	public int idchkBs(BusinessVO vo) {
		int res = mybatis.selectOne("UserDAO.idchk", vo);
		return res;
	}
		// 소셜 로그인
		public AccountVO getUserSNS(AccountVO vo) {
			return mybatis.selectOne("UserDAO.getPersonSNS", vo);
		}
		
		
		// 이메일 확인
		public int emailchk(String email) {
			return mybatis.selectOne("UserDAO.getEmail", email);
		}

	// laundry
	public List<LaundryVO> getLaundry(String bno) {
		return mybatis.selectList("UserDAO.getLaundryList", bno);
	}

	// equipment
	public List<EquipmentVO> getEquipment(String bno) {
		return mybatis.selectList("UserDAO.getEquipmentList", bno);
	}

	// etc
	public List<EtcVO> getEtc(String bno) {
		return mybatis.selectList("UserDAO.getEtc", bno);
	}

	// schedule
	public List<ScheduleVO> getSchedule(String bno) {
		return mybatis.selectList("UserDAO.getScheduleList", bno);
	}
	public void updateSpec(BusinessVO vo) {
		mybatis.update("UserDAO.updateSpec", vo);

	}
	// 아이디 중복확인
	public int idchk(PersonVO vo) {
		int res = mybatis.selectOne("UserDAO.idchk", vo);
		return res;
	}
	// 아이디 찾기
	public AccountVO findId(AccountVO vo) {
		return mybatis.selectOne("UserDAO.findId",vo); 
	}
	// 비밀번호 찾기
	public AccountVO findPw(AccountVO vo) {
		AccountVO res = mybatis.selectOne("UserDAO.findPw",vo);
		return res;
	}
	public AccountVO joinCfm(AccountVO vo) {
		return mybatis.selectOne("UserDAO.joinCfm",vo);
	}
	
	// 업체 찜 당한 수
	public int countLikeBs(BusinessVO vo) {
		return  mybatis.selectOne("UserDAO.countLikeBs", vo);
	}
	// 업체 평균 평점
	public double avgGradeBs(BusinessVO vo) {
		return  mybatis.selectOne("UserDAO.avgGradeBs", vo);
	}
	public void updatePw(AccountVO vo) {
		mybatis.update("UserDAO.updatePw", vo);
	}

	public AccountVO getUser(AccountVO vo) {
		return mybatis.selectOne("UserDAO.getAccount",vo);
	}
	public PersonVO getPerson(int mno) {
		return mybatis.selectOne("UserDAO.getPerson",mno);
	}
	public BusinessVO getBusiness(BusinessVO vo) {
		return mybatis.selectOne("UserDAO.getBusiness",vo);
	}
	public int bnoChk(String bno) {
		return mybatis.selectOne("UserDAO.bnoChk",bno);
	}
	public int chkRoom(ChatVO vo) {
		return mybatis.selectOne("UserDAO.chkRoomNum",vo);		
	}
	public void createRoom(ChatVO vo) {
		mybatis.insert("UserDAO.createRoom",vo);
	}
	public ChatVO chkCloser(ChatVO vo) {
		return mybatis.selectOne("UserDAO.chkCloser",vo);
	}
	public void updateCloserIn(ChatVO vo) {
		mybatis.update("UserDAO.updateCloserIn",vo);
	}
	public void updateChatRog(ChatVO vo) {
		mybatis.update("UserDAO.updateChatRog",vo);
		
	}
	public List<ChatVO> getChatRog(ChatVO vo) {
		return mybatis.selectList("UserDAO.getChatRog",vo);
	}
	public void insertChatRog(ChatVO vo) {
		mybatis.insert("UserDAO.insertChatRog",vo);
		
	}
	public int chkGuestClose(ChatVO vo) {
		return mybatis.selectOne("UserDAO.chkGuestClose",vo);
		
	}
	public void deleteRoom(ChatVO vo) {
		mybatis.delete("UserDAO.deleteRoom",vo);
	}
	public int chkCloserMe(ChatVO vo) {
		return mybatis.selectOne("UserDAO.chkCloserMe",vo);
	}
	public void insertCloser(ChatVO vo) {
		mybatis.insert("UserDAO.insertCloser",vo);
	}
	public void updateCloserOut(ChatVO vo) {
		mybatis.update("UserDAO.updateCloserOut",vo);
	}
	public String getBno(ChatVO vo) {
		return mybatis.selectOne("UserDAO.getBno",vo);
	}
	public List<ChatVO> getMyRoomLi(ChatVO vo) {
		return mybatis.selectList("UserDAO.getMyRoomLi",vo);
	}
	public ChatVO getBsGuestData(ChatVO guest) {
		return mybatis.selectOne("UserDAO.getBsGuestData",guest);
	}
	public ChatVO getPsGuestData(ChatVO guest) {
		return mybatis.selectOne("UserDAO.getPsGuestData",guest);		
	}
}
