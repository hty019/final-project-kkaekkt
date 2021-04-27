package com.kkaekkt.biz.comm;

public class CommVO {
	private int cno; //글 번호
	private int rsvNum; //댓글이 달린 주문번호
	private int mno;//회원번호
	private String bno; //사업자 번호
	private String mname;
	private String bname;
	private int orderNum;//순서
	private int depth; //0.댓글 1.대댓글
	private int eval;//평가
	private String content;
	private String rdate; //date_format 쿼리를 이용한 String으로 날짜받기
	private String dateText;
	private int replytf;//답글 여부
	
	public String getDateText() {
		return dateText;
	}
	public int getCno() {
		return cno;
	}
	public void setCno(int cno) {
		this.cno = cno;
	}
	public int getReplytf() {
		return replytf;
	}
	public void setReplytf(int replytf) {
		this.replytf = replytf;
	}
	public int getOrderNum() {
		return orderNum;
	}
	public void setOrderNum(int orderNum) {
		this.orderNum = orderNum;
	}
//	public Timestamp getRdate() {
//		return rdate;
//	}
//	public void setRdate(Timestamp rdate) {
//		this.rdate = rdate;
//	}
	
	public String getMname() {
		return mname;
	}
	public String getRdate() {
		return rdate;
	}
	public void setRdate(String rdate) {
		this.rdate = rdate;
	}
	public void setMname(String mname) {
		this.mname = mname;
	}
	public String getBname() {
		return bname;
	}
	public void setBname(String bname) {
		this.bname = bname;
	}
	public int getEval() {
		return eval;
	}
	public void setEval(int eval) {
		this.eval = eval;
	}
	public int getRsvNum() {
		return rsvNum;
	}
	public void setRsvNum(int rsvNum) {
		this.rsvNum = rsvNum;
	}
	public int getMno() {
		return mno;
	}
	public void setMno(int mno) {
		this.mno = mno;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	
	public String getBno() {
		return bno;
	}
	public void setBno(String bno) {
		this.bno = bno;
	}
	public int getDepth() {
		return depth;
	}
	public void setDepth(int depth) {
		this.depth = depth;
	}
	
}
