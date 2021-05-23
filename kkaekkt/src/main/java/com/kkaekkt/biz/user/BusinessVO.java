package com.kkaekkt.biz.user;

import java.util.List;

import com.kkaekkt.biz.comm.CommVO;
import com.kkaekkt.biz.comm.EquipmentVO;
import com.kkaekkt.biz.comm.EtcVO;
import com.kkaekkt.biz.comm.LaundryVO;
import com.kkaekkt.biz.comm.ScheduleVO;

public class BusinessVO extends AccountVO{
	private String bname;
	private String comment;
	private int bizType; //1. 일반 세탁소, 2. 코인 세탁소
	private int bankNum; //은행번호
	private String bankAccountNum; //계좌번호
	private List<ScheduleVO> scheduleList; // 형변환을 거쳐서 저장되는 필드
	private List<EquipmentVO> equipmentList; // 형변환을 거쳐서 저장되는 필드
	private List<LaundryVO> laundryList; // 형변환을 거쳐서 저장되는 필드
	private List<EtcVO> etcList; // 형변환을 거쳐서 저장되는 필드
	private List<CommVO> commList;
	private String equipment; //JSON으로 전송되는 설비 정보
	private String laundry; //JSON으로 전송되는 취급 품목
	private String schedule; //JSON으로 전송되는 일정
	private String etc; //JOSN으로 전송되는 부가서비스
	private double eval; //평가
	private int count; //댓글 개수
	private int likedNum; // 찜당한 수

	private int state=1; // 테스트
	
	public int getState() {
		return state;
	}
	public void setState(int state) {
		this.state = state;
	}
	
	public int getCount() {
		return count;
	}
	public void setCount(int count) {
		this.count = count;
	}
	public List<CommVO> getCommList() {
		return commList;
	}
	public void setCommList(List<CommVO> commList) {
		this.commList = commList;
	}
	public List<EtcVO> getEtcList() {
		return etcList;
	}
	public void setEtcList(List<EtcVO> etcList) {
		this.etcList = etcList;
	}
	public String getLaundry() {
		return laundry;
	}
	public void setLaundry(String laundry) {
		this.laundry = laundry;
	}
	public int getBankNum() {
		return bankNum;
	}
	public void setBankNum(int bankNum) {
		this.bankNum = bankNum;
	}
	public String getEquipment() {
		return equipment;
	}
	public void setEquipment(String equipment) {
		this.equipment = equipment;
	}

	public String getBname() {
		return bname;
	}
	public void setBname(String bname) {
		this.bname = bname;
	}
	public String getComment() {
		return comment;
	}
	public void setComment(String comment) {
		this.comment = comment;
	}
	public int getBizType() {
		return bizType;
	}
	public void setBizType(int bizType) {
		this.bizType = bizType;
	}

	public String getBankAccountNum() {
		return bankAccountNum;
	}
	public void setBankAccountNum(String bankAccountNum) {
		this.bankAccountNum = bankAccountNum;
	}
	public List<ScheduleVO> getScheduleList() {
		return scheduleList;
	}
	public void setScheduleList(List<ScheduleVO> scheduleList) {
		this.scheduleList = scheduleList;
	}
	public List<EquipmentVO> getEquipmentList() {
		return equipmentList;
	}
	public void setEquipmentList(List<EquipmentVO> equipmentList) {
		this.equipmentList = equipmentList;
	}
	public List<LaundryVO> getLaundryList() {
		return laundryList;
	}
	public void setLaundryList(List<LaundryVO> laundryList) {
		this.laundryList = laundryList;
	}
	public String getSchedule() {
		return schedule;
	}
	public void setSchedule(String schedule) {
		this.schedule = schedule;
	}
	public String getEtc() {
		return etc;
	}
	public void setEtc(String etc) {
		this.etc = etc;
	}
	public double getEval() {
		return eval;
	}
	public void setEval(double eval) {
		this.eval = eval;
	}
	public int getLikedNum() {
		return likedNum;
	}
	public void setLikedNum(int likedNum) {
		this.likedNum = likedNum;
	}
	@Override
	public String toString() {
		return "BusinessVO [bname=" + bname + ", comment=" + comment + ", bizType=" + bizType + ", bankNum=" + bankNum
				+ ", bankAccountNum=" + bankAccountNum + ", scheduleList=" + scheduleList + ", equipmentList="
				+ equipmentList + ", laundryList=" + laundryList + ", etcList=" + etcList + ", commList=" + commList
				+ ", equipment=" + equipment + ", laundry=" + laundry + ", schedule=" + schedule + ", etc=" + etc
				+ ", eval=" + eval + ", count=" + count + ", likedNum=" + likedNum + ", state=" + state + "]";
	}
	


}
