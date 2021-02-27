CREATE TABLE `Member` (
	`mno`	INTEGER	NOT NULL,
	`mname`	VARCHAR(40)	NULL,
	`phone`	INTEGER	NULL,
	`birth`	INTEGER	NULL,
	`address`	VARCHAR(100)	NULL,
	`email`	VARCHAR(40)	NULL
);

CREATE TABLE `Account` (
	`mno`	INTEGER	NOT NULL,
	`id`	VARCHAR(20)	NULL,
	`password`	VARCHAR(20)	NULL
);

CREATE TABLE `Business` (
	`bno`	INTEGER	NOT NULL,
	`mno`	INTEGER	NOT NULL,
	`bname`	VARCHAR(40)	NULL,
	`address`	VARCHAR(100)	NULL,
	`email`	VARCHAR(40)	NULL,
	`comment`	VARCHAR(255)	NULL,
	`time`	VARCHAR(255)	NULL,
	`typeNum`	INTEGER	NOT NULL
);

CREATE TABLE `Payment` (
	`pno`	INTEGER	NOT NULL,
	`pname`	VARCHAR(20)	NULL
);

CREATE TABLE `Bsn_Payment` (
	`bno`	INTEGER	NOT NULL,
	`pno`	INTEGER	NOT NULL
);

CREATE TABLE `Bank` (
	`bkno`	INTEGER	NOT NULL,
	`bkname`	VARCHAR(30)	NULL
);

CREATE TABLE `Bsn_Account` (
	`bno`	INTEGER	NOT NULL,
	`bkno`	INTEGER	NOT NULL,
	`acno`	INTEGER	NULL
);

CREATE TABLE `Laundry_type` (
	`lno`	INTEGER	NOT NULL,
	`lname`	VARCHAR(20)	NULL,
	`prno`	INTEGER	NOT NULL
);

CREATE TABLE `Period` (
	`prno`	INTEGER	NOT NULL,
	`prname`	VARCHAR(15)	NULL
);

CREATE TABLE `Bsn_Laundry` (
	`bno`	INTEGER	NOT NULL,
	`lno`	INTEGER	NOT NULL,
	`price`	INTEGER	NULL
);

CREATE TABLE `Equipment` (
	`eno`	INTEGER	NOT NULL,
	`ename`	VARCHAR(25)	NULL
);

CREATE TABLE `Bsn_Equipment` (
	`bno`	INTEGER	NOT NULL,
	`eno`	INTEGER	NOT NULL,
    `cnt`   INTEGER NULL,
    `price` INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE `Reservation` (
	`rno`	INTEGER	NOT NULL,
	`mno`	INTEGER	NOT NULL,
	`bno`	INTEGER	NOT NULL,
	`rdate`	date	NULL,
	`ddate`	date	NULL,
	`stno`	INTEGER	NOT NULL
);

CREATE TABLE `Rsv_Laundry` (
	`rno`	INTEGER	NOT NULL,
	`lno`	INTEGER	NOT NULL,
	`cnt`	INTEGER	NULL,
	`stno`	INTEGER	NOT NULL
);

CREATE TABLE `State` (
	`stno`	INTEGER	NOT NULL,
	`stname`	VARCHAR(20)	NULL
);

CREATE TABLE `Rsv_Payment` (
	`rno`	INTEGER	NOT NULL,
	`pno`	INTEGER	NOT NULL,
	`price`	INTEGER	NULL
);

CREATE TABLE `Comment` (
	`cno`	INTEGER	NOT NULL,
	`mno`	INTEGER	NOT NULL,
	`bno`	INTEGER	NOT NULL,
	`comment`	VARCHAR(255)	NULL,
	`order`	INTEGER	NULL,
	`depth`	INTEGER	NULL,
	`groupNum`	INTEGER	NULL
);

CREATE TABLE `Evaluation` (
	`mno`	INTEGER	NOT NULL,
	`bno`	INTEGER	NOT NULL,
	`grade`	INTEGER	NULL
);

CREATE TABLE `Like` (
	`bno`	INTEGER	NOT NULL,
	`mno`	INTEGER	NOT NULL
);

CREATE TABLE `Cancel` (
	`cancelNum`	INTEGER	NOT NULL,
	`reason`	VARCHAR(50)	NULL
);

CREATE TABLE `Bsn_type` (
	`typeNum`	INTEGER	NOT NULL,
	`typename`	VARCHAR(20)	NULL
);

ALTER TABLE `Account` ADD CONSTRAINT `PK_ACCOUNT` PRIMARY KEY (
	`mno`
);
ALTER TABLE `Account` MODIFY COLUMN mno INTEGER NOT NULL AUTO_INCREMENT;
ALTER TABLE `Business` ADD CONSTRAINT `PK_BUSINESS` PRIMARY KEY (
	`bno`
);
ALTER TABLE `Business` MODIFY COLUMN bno INTEGER NOT NULL AUTO_INCREMENT;
ALTER TABLE `Payment` ADD CONSTRAINT `PK_PAYMENT` PRIMARY KEY (
	`pno`
);
ALTER TABLE `Payment` MODIFY COLUMN pno INTEGER NOT NULL AUTO_INCREMENT;
ALTER TABLE `Bank` ADD CONSTRAINT `PK_BANK` PRIMARY KEY (
	`bkno`
);
ALTER TABLE `Bank` MODIFY COLUMN bkno INTEGER NOT NULL AUTO_INCREMENT;
ALTER TABLE `Laundry_type` ADD CONSTRAINT `PK_LAUNDRY_TYPE` PRIMARY KEY (
	`lno`
);
ALTER TABLE `Laundry_type` MODIFY COLUMN lno INTEGER NOT NULL AUTO_INCREMENT;
ALTER TABLE `Period` ADD CONSTRAINT `PK_PERIOD` PRIMARY KEY (
	`prno`
);
ALTER TABLE `Period` MODIFY COLUMN prno INTEGER NOT NULL AUTO_INCREMENT;
ALTER TABLE `Equipment` ADD CONSTRAINT `PK_EQUIPMENT` PRIMARY KEY (
	`eno`
);
ALTER TABLE `Equipment` MODIFY COLUMN eno INTEGER NOT NULL AUTO_INCREMENT;
ALTER TABLE `Reservation` ADD CONSTRAINT `PK_RESERVATION` PRIMARY KEY (
	`rno`
);
ALTER TABLE `Reservation` MODIFY COLUMN rno INTEGER NOT NULL AUTO_INCREMENT;
ALTER TABLE `State` ADD CONSTRAINT `PK_STATE` PRIMARY KEY (
	`stno`
);
ALTER TABLE `State` MODIFY COLUMN stno INTEGER NOT NULL AUTO_INCREMENT;
ALTER TABLE `Comment` ADD CONSTRAINT `PK_COMMENT` PRIMARY KEY (
	`cno`
);
ALTER TABLE `Comment` MODIFY COLUMN cno INTEGER NOT NULL AUTO_INCREMENT;
ALTER TABLE `Cancel` ADD CONSTRAINT `PK_CANCEL` PRIMARY KEY (
	`cancelNum`
);
ALTER TABLE `Cancel` MODIFY COLUMN cancelNum INTEGER NOT NULL AUTO_INCREMENT;
ALTER TABLE `Bsn_type` ADD CONSTRAINT `PK_BSN_TYPE` PRIMARY KEY (
	`typeNum`
);
ALTER TABLE `Bsn_type` MODIFY COLUMN typeNum INTEGER NOT NULL AUTO_INCREMENT;
ALTER TABLE `Member` ADD CONSTRAINT `FK_Account_TO_Member_1` FOREIGN KEY (
	`mno`
)
REFERENCES `Account` (
	`mno`
);

ALTER TABLE `Business` ADD CONSTRAINT `FK_Account_TO_Business_1` FOREIGN KEY (
	`mno`
)
REFERENCES `Account` (
	`mno`
);

ALTER TABLE `Business` ADD CONSTRAINT `FK_Bsn_type_TO_Business_1` FOREIGN KEY (
	`typeNum`
)
REFERENCES `Bsn_type` (
	`typeNum`
);

ALTER TABLE `Bsn_Payment` ADD CONSTRAINT `FK_Business_TO_Bsn_Payment_1` FOREIGN KEY (
	`bno`
)
REFERENCES `Business` (
	`bno`
);

ALTER TABLE `Bsn_Payment` ADD CONSTRAINT `FK_Payment_TO_Bsn_Payment_1` FOREIGN KEY (
	`pno`
)
REFERENCES `Payment` (
	`pno`
);

ALTER TABLE `Bsn_Account` ADD CONSTRAINT `FK_Business_TO_Bsn_Account_1` FOREIGN KEY (
	`bno`
)
REFERENCES `Business` (
	`bno`
);

ALTER TABLE `Bsn_Account` ADD CONSTRAINT `FK_Bank_TO_Bsn_Account_1` FOREIGN KEY (
	`bkno`
)
REFERENCES `Bank` (
	`bkno`
);

ALTER TABLE `Laundry_type` ADD CONSTRAINT `FK_Period_TO_Laundry_type_1` FOREIGN KEY (
	`prno`
)
REFERENCES `Period` (
	`prno`
);

ALTER TABLE `Bsn_Laundry` ADD CONSTRAINT `FK_Business_TO_Bsn_Laundry_1` FOREIGN KEY (
	`bno`
)
REFERENCES `Business` (
	`bno`
);

ALTER TABLE `Bsn_Laundry` ADD CONSTRAINT `FK_Laundry_type_TO_Bsn_Laundry_1` FOREIGN KEY (
	`lno`
)
REFERENCES `Laundry_type` (
	`lno`
);

ALTER TABLE `Bsn_Equipment` ADD CONSTRAINT `FK_Business_TO_Bsn_Equipment_1` FOREIGN KEY (
	`bno`
)
REFERENCES `Business` (
	`bno`
);

ALTER TABLE `Bsn_Equipment` ADD CONSTRAINT `FK_Equipment_TO_Bsn_Equipment_1` FOREIGN KEY (
	`eno`
)
REFERENCES `Equipment` (
	`eno`
);

ALTER TABLE `Reservation` ADD CONSTRAINT `FK_Member_TO_Reservation_1` FOREIGN KEY (
	`mno`
)
REFERENCES `Member` (
	`mno`
);

ALTER TABLE `Reservation` ADD CONSTRAINT `FK_Business_TO_Reservation_1` FOREIGN KEY (
	`bno`
)
REFERENCES `Business` (
	`bno`
);

ALTER TABLE `Reservation` ADD CONSTRAINT `FK_State_TO_Reservation_1` FOREIGN KEY (
	`stno`
)
REFERENCES `State` (
	`stno`
);

ALTER TABLE `Rsv_Laundry` ADD CONSTRAINT `FK_Reservation_TO_Rsv_Laundry_1` FOREIGN KEY (
	`rno`
)
REFERENCES `Reservation` (
	`rno`
);

ALTER TABLE `Rsv_Laundry` ADD CONSTRAINT `FK_Laundry_type_TO_Rsv_Laundry_1` FOREIGN KEY (
	`lno`
)
REFERENCES `Laundry_type` (
	`lno`
);

ALTER TABLE `Rsv_Laundry` ADD CONSTRAINT `FK_State_TO_Rsv_Laundry_1` FOREIGN KEY (
	`stno`
)
REFERENCES `State` (
	`stno`
);

ALTER TABLE `Rsv_Payment` ADD CONSTRAINT `FK_Reservation_TO_Rsv_Payment_1` FOREIGN KEY (
	`rno`
)
REFERENCES `Reservation` (
	`rno`
);

ALTER TABLE `Rsv_Payment` ADD CONSTRAINT `FK_Payment_TO_Rsv_Payment_1` FOREIGN KEY (
	`pno`
)
REFERENCES `Payment` (
	`pno`
);

ALTER TABLE `Comment` ADD CONSTRAINT `FK_Member_TO_Comment_1` FOREIGN KEY (
	`mno`
)
REFERENCES `Member` (
	`mno`
);

ALTER TABLE `Comment` ADD CONSTRAINT `FK_Business_TO_Comment_1` FOREIGN KEY (
	`bno`
)
REFERENCES `Business` (
	`bno`
);

ALTER TABLE `Evaluation` ADD CONSTRAINT `FK_Member_TO_Evaluation_1` FOREIGN KEY (
	`mno`
)
REFERENCES `Member` (
	`mno`
);

ALTER TABLE `Evaluation` ADD CONSTRAINT `FK_Business_TO_Evaluation_1` FOREIGN KEY (
	`bno`
)
REFERENCES `Business` (
	`bno`
);

ALTER TABLE `Like` ADD CONSTRAINT `FK_Business_TO_Like_1` FOREIGN KEY (
	`bno`
)
REFERENCES `Business` (
	`bno`
);

ALTER TABLE `Like` ADD CONSTRAINT `FK_Member_TO_Like_1` FOREIGN KEY (
	`mno`
)
REFERENCES `Member` (
	`mno`
);
-- 설비
INSERT INTO equipment (ename) VALUES ("세탁기(중형)");
INSERT INTO equipment (ename) VALUES ("세탁기(대형)");
INSERT INTO equipment (ename) VALUES ("세탁기(특대형)");
INSERT INTO equipment (ename) VALUES ("건조기");


-- 결제수단
INSERT INTO Payment (pname) VALUES ("카드");
-- 은행
INSERT INTO Bank (bkname) VALUES ("KB국민은행");
INSERT INTO Bank (bkname) VALUES ("신한은행");
INSERT INTO Bank (bkname) VALUES ("하나은행");
INSERT INTO Bank (bkname) VALUES ("우리은행");
INSERT INTO Bank (bkname) VALUES ("IBK기업은행");
INSERT INTO Bank (bkname) VALUES ("NH농협은행");
INSERT INTO Bank (bkname) VALUES ("카카오뱅크");
-- 기간
INSERT INTO Period (prname)VALUES("1일~3일");
INSERT INTO Period (prname)VALUES("4일~7일");

-- 취급 품목
INSERT INTO laundry_type (lname,prno) values("일반의류",1);
INSERT INTO laundry_type (lname,prno) values("와이셔츠",1);
INSERT INTO laundry_type (lname,prno) values("이불",1);
INSERT INTO laundry_type (lname,prno) values("운동화",1);
INSERT INTO laundry_type (lname,prno) values("가죽모피",2);
INSERT INTO laundry_type (lname,prno) values("명품가방",2);
INSERT INTO laundry_type (lname,prno) values("아웃도어",2);
INSERT INTO laundry_type (lname,prno) values("기타",2);

-- 진행상태
INSERT INTO state (stname) values("취소");
INSERT INTO state (stname) values("작업 전");
INSERT INTO state (stname) values("작업 완료");
INSERT INTO state (stname) values("전달 완료");

-- 취소사유 (업체용)
INSERT INTO cancel (reason) values("고객 요청으로 취소합니다.");
INSERT INTO cancel (reason) values("취급하는 품목이 아닙니다.(기타)");
INSERT INTO cancel (reason) values("기간 내에 작업을 완료할 수 없습니다.");
INSERT INTO cancel (reason) values("가게 내부 사정으로 취소합니다.");

-- 업체유형
INSERT INTO bsn_type (typename) values("일반 세탁소");
INSERT INTO bsn_type (typename) values("코인 세탁소");