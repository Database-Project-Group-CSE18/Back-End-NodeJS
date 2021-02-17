
CREATE TABLE `Item` (
  `Item_ID` int not null auto_increment,
  `Num_of_orders` Numeric(6),
  `Item_name` Varchar(20),
  `Category` Varchar(20),
  `Description` Varchar(200),
  `Status` Varchar(10),
  PRIMARY KEY (`Item_ID`)
);

CREATE TABLE `Cart` (
  `Cart_ID` int not null auto_increment,
  `NumOfItems` int,
  PRIMARY KEY (`Cart_ID`)
);

CREATE TABLE `User` (
  `User_ID` int not null auto_increment,
  `User_Type` Varchar(20),
  `Password` Varchar(10),
  `First_name` Varchar(20),
  `Last_name` Varchar(20),
  `Email` varchar(30),
  `Phone_No` Numeric(10),
  `Cart_ID` int,
  `Reg_Date` DATETIME,
  PRIMARY KEY (`User_ID`),
--   KEY `Fk` (`Cart_ID`)
  FOREIGN KEY(`Cart_ID`) references Cart(`Cart_ID`)
);


CREATE TABLE `Address` (
  `Address_ID` int not null auto_increment,
  `User_ID` int,
  `First_Name` Varchar(20),
  `Last_Name` Varchar(20),
  `Street` Varchar(20),
  `City` Varchar(20),
  `State` Varchar(20),
  `ZIP` Varchar(20),
  PRIMARY KEY (`Address_ID`),
--   KEY `Fk` (`Customer_ID`)
  FOREIGN KEY(`User_ID`) references User(`User_ID`)
);


CREATE TABLE `Variant` (
  `Variant_ID` int not null auto_increment,
  `Item_ID` int,
  `Variant_name` Varchar(6),
  `Price` Float,
  `Color` Varchar(10),
  `Size` Varchar(10),
  `SpecificDetail` Varchar(20),
  `Quantity` Numeric(4),
  PRIMARY KEY (`Variant_ID`),
--   KEY `Fk` (`Item_ID`)
  FOREIGN KEY (`Item_ID`) references Item(`Item_ID`)
);


CREATE TABLE `Order` (
  `Order_ID` int not null auto_increment,
  `User_ID` int,
  `Address_ID` int,
  `Order_status` Varchar(15),
  `Card_Number` int,
  `Ordered_date` date,
  `Tracking _Number` varchar(10),
  PRIMARY KEY (`Order_ID`),
--   KEY `Fk` (`Customer_ID`, `Address_ID`)
  FOREIGN KEY (`User_ID`) references User(`User_ID`),
  FOREIGN KEY (`Address_ID`) references Address(`Address_ID`)
);

CREATE TABLE `Order_Item` (
  `OrderItem_ID` int not null auto_increment,
  `Order_ID` int,
  `Variant_ID` int,
  `Quantity` int,
  `Price` Float,
  PRIMARY KEY (`OrderItem_ID`),
  FOREIGN KEY (`Order_ID`) references `Order`(`Order_ID`) ,
  FOREIGN KEY (`Variant_ID`) references `Variant`(`Variant_ID`)
);

CREATE TABLE `Bank_Card` (
  `Card_Number` Varchar(40) not null,
  `User_ID` int,
  `Bank_Name` Varchar(20),
  `Owner` Varchar(40),
  `CVV` Varchar(10),
  `Exp_Date` Date,
  PRIMARY KEY (`Card_Number`),
--   KEY `Fk` (`Customer_ID`)
  FOREIGN KEY (`User_ID`) references User(`User_ID`)

);

CREATE TABLE `Image` (
  `Image_ID` int not null auto_increment,
  `Variant_ID` int,
  `Image` Blob,
  PRIMARY KEY (`Image_ID`),
--   KEY `Fk` (`Variant_ID`),
  FOREIGN KEY (`Variant_ID`) references Variant(`Variant_ID`)


);

CREATE TABLE `Order_Address` (
  `Address_ID` int,
  `Order_ID` int,
  `First Name` Varchar(20),
  `Last_Name` Varchar(20),
  `State` Varchar(20),
  `Number` Varchar(6),
  `City` Varchar(20),
  `Street` Varchar(20),
  `ZIP` Varchar(10),
  PRIMARY KEY (`Address_ID`),
--   KEY `Fk` (`Order_ID`),
  FOREIGN KEY(`Order_ID`) references `Order`(`Order_ID`)
);



CREATE TABLE `Cart_Item` (
  `CartItem_ID` int not null auto_increment,
  `Cart_ID` int,
  `Variant_ID` int,
  `Quantity` int,
  PRIMARY KEY (`CartItem_ID`),
--   KEY `Fk` (`Cart_ID`),
--   KEY `Fk ` (`Variant_ID`)
  FOREIGN KEY(`Cart_ID`) references `Cart`(`Cart_ID`),
  FOREIGN KEY(`Variant_ID`) references `Variant`(`Variant_ID`)
);




CREATE TABLE `Feedback` (
  `Feedback_ID` int not null auto_increment,
  `User_ID` int,
  `Item_ID` int,
  `Order_ID` int,
  `Rate` Numeric(4),
  `Comment` Varchar(200),
  PRIMARY KEY (`Feedback_ID`),
  FOREIGN KEY(`User_ID`) references `User`(`User_ID`),
  FOREIGN KEY(`Item_ID`) references `Item`(`Item_ID`),
  FOREIGN KEY(`Order_ID`) references `Order`(`Order_ID`)
  
);


CREATE TABLE `Reply` (
  `Reply_ID` int not null auto_increment ,
  `Feedback_ID` int,
  `Reply` Varchar(100),
  PRIMARY KEY (`Reply_ID`),
  FOREIGN KEY (`Feedback_ID`) references `Feedback`(`Feedback_ID`)
);



-- insert statements

INSERT INTO Item(Num_of_orders,Item_name,Category,Description,Status) VALUES(2,'BOTTLE','STATIONERY','ABCABC','AVAILABLE');

INSERT INTO Cart(NumOfItems) VALUES(2);

INSERT INTO `User`(User_Type,Password,First_name,Last_name,Email,Phone_No,Cart_ID,Reg_Date) VALUES('BUYER','PASAN','PASAN','MADUSHAN','pasan.18@cse.mrt.ac.lk','0770741508',1,'2021-01-12');

INSERT INTO `Address`(User_ID,First_Name,Last_Name,Street,City,State,ZIP) VALUES(1,'PASAN','MADUSHAN','214/B','GALLE','SOUTHERN','80000');
INSERT INTO `Address`(User_ID,First_Name,Last_Name,Street,City,State,ZIP) VALUES(1,'Vimukthi','MADUSHAN','233/w','Mathara','SOUTHERN','90000');

INSERT INTO Bank_Card(Card_Number,User_ID,Bank_Name,Owner,CVV,Exp_Date) VALUES('123456789012',1,'Commercial Bank','Pasan madushan','123','2021-12-12');
INSERT INTO Bank_Card(Card_Number,User_ID,Bank_Name,Owner,CVV,Exp_Date) VALUES('098765432123',1,'NDB','Vimukthi madushan','987','2021-12-12');


