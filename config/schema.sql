
CREATE TABLE `Item` (
  `Item_ID` int not null auto_increment,
  `Num_of_orders` Numeric(6),
  `Item_name` Varchar(80),
  `Category` Varchar(20),
  `Description` Varchar(200),
  `Status` ENUM('Available', 'Out of stock'),
  `Price` Float,
  `Image` blob,
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
  `Variant_name` Varchar(30),
  `Price` Float,
  `Color` Varchar(30),
  `Size` Varchar(30),
  `SpecificDetail` Varchar(100),
  `Quantity` Numeric(4),
  `Image` blob,
  PRIMARY KEY (`Variant_ID`),
--   KEY `Fk` (`Item_ID`)
  FOREIGN KEY (`Item_ID`) references Item(`Item_ID`)
);

CREATE TABLE `Bank_Card` (
  `Card_Number` Varchar(40) not null,
  `User_ID` int,
  `Bank_Name` Varchar(20),
  `Owner` Varchar(40),
  `CVV` Varchar(10),
  `Exp_Date` Varchar(20),      -- Date changed as varchar : inserting error
  PRIMARY KEY (`Card_Number`),
--   KEY `Fk` (`Customer_ID`)
  FOREIGN KEY (`User_ID`) references User(`User_ID`)

);


CREATE TABLE `Order_Address` (
  `Address_ID` int,
  `First_Name` Varchar(20),
  `Last_Name` Varchar(20),
  `State` Varchar(20),
  `Number` Varchar(6),
  `City` Varchar(20),
  `Street` Varchar(20),
  `ZIP` Varchar(10),
  PRIMARY KEY (`Address_ID`)
--   KEY `Fk` (`Order_ID`),
);

CREATE TABLE `Order` (
  `Order_ID` int not null auto_increment,
  `User_ID` int,
  `Address_ID` int,
  `Order_status` Varchar(15),
  `Card_Number` Varchar(20),
  `Ordered_date` date,
  `Tracking _Number` varchar(10),
  PRIMARY KEY (`Order_ID`),
--   KEY `Fk` (`Customer_ID`, `Address_ID`)
  FOREIGN KEY (`User_ID`) references User(`User_ID`),
  FOREIGN KEY (`Address_ID`) references Order_Address(`Address_ID`)
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



--- insert statements
----- items
INSERT INTO item(Num_of_orders,Item_name,Category,Description,Status, Price) VALUES(2,'iPhone 8','Mobile Phones','asdasjhdas asdhajsdas dsahdjahsd asdjahsdjas asdiasd','Available', 25000);
INSERT INTO item(Num_of_orders,Item_name,Category,Description,Status, Price) VALUES(8,'PunnkFunnk Wireless Headphones Bluetooth','Earphones','asdasjhdas asdhajsdas dsahdjahsd asdjahsdjas asdiasd','Available', 3500);
INSERT INTO item(Num_of_orders,Item_name,Category,Description,Status, Price) VALUES(20,'Wireless Charger Stand','Phone Accessories','asdhjsads sakjkdafkelgg wlgkwkglwe ewflwkeflw','Out of stock', 200);
INSERT INTO item(Num_of_orders,Item_name,Category,Description,Status, Price) VALUES(45,'Philips Usb Speaker','Speakers','Speakers','Available', 200);
INSERT INTO item(Num_of_orders,Item_name,Category,Description,Status, Price) VALUES(1,'Apple Watch Series 6','Wearable devices','asdhjsads sakjkdafkelgg wlgkwkglwe ewflwkeflw','Out of stock', 200);
INSERT INTO item(Num_of_orders,Item_name,Category,Description,Status, Price) VALUES(20,'Canon EOS Rebel T5i DSLR','Cameras','asdhjsads sakjkdafkelgg wlgkwkglwe ewflwkeflw','Available', 200);

----- variants
INSERT INTO variant(Item_ID,Variant_name,Price,Color,Size, SpecificDetail, Quantity) VALUES(1,'64GB Red','25000','Red','6 inches', 'Free tempered glass', 20);
INSERT INTO variant(Item_ID,Variant_name,Price,Color,Size, SpecificDetail, Quantity) VALUES(1,'128GB Red','45000','Red','6 inches', 'Free tempered glass', 21);
INSERT INTO variant(Item_ID,Variant_name,Price,Color,Size, SpecificDetail, Quantity) VALUES(1,'64GB Blue','22000','Blue','6 inches', 'Free tempered glass', 50);
INSERT INTO variant(Item_ID,Variant_name,Price,Color,Size, SpecificDetail, Quantity) VALUES(2,'Black','5000','Black','Regular', 'asdasdadv', 20);
INSERT INTO variant(Item_ID,Variant_name,Price,Color,Size, SpecificDetail, Quantity) VALUES(2,'Gray','5500','Gray','Regular', 'asdasdadv', 20);
INSERT INTO variant(Item_ID,Variant_name,Price,Color,Size, SpecificDetail, Quantity) VALUES(3,'Charger','5000','Black','10x10x10cm', 'Wireless charger', 20);
INSERT INTO variant(Item_ID,Variant_name,Price,Color,Size, SpecificDetail, Quantity) VALUES(4,'Speaker','25000','Black','10X20X20cm', 'Wired speker set', 20);
INSERT INTO variant(Item_ID,Variant_name,Price,Color,Size, SpecificDetail, Quantity) VALUES(5,'Red','35000','Red','2 inches', 'With two belts', 10);
INSERT INTO variant(Item_ID,Variant_name,Price,Color,Size, SpecificDetail, Quantity) VALUES(5,'Blue','32000','Blue','2 inches', 'With one belts', 15);
INSERT INTO variant(Item_ID,Variant_name,Price,Color,Size, SpecificDetail, Quantity) VALUES(5,'Gray','31000','Gray','2 inches', 'With three belts', 18);
INSERT INTO variant(Item_ID,Variant_name,Price,Color,Size, SpecificDetail, Quantity) VALUES(6,'64GB Black','85000','black','large', 'Free box', 10);

INSERT INTO Cart(NumOfItems) VALUES(2);

INSERT INTO `User`(User_Type,Password,First_name,Last_name,Email,Phone_No,Cart_ID,Reg_Date) VALUES('BUYER','PASAN','PASAN','MADUSHAN','pasan.18@cse.mrt.ac.lk','0770741508',1,'2021-01-12');

INSERT INTO `Address`(User_ID,First_Name,Last_Name,Street,City,State,ZIP) VALUES(1,'PASAN','MADUSHAN','214/B','GALLE','SOUTHERN','80000');
INSERT INTO `Address`(User_ID,First_Name,Last_Name,Street,City,State,ZIP) VALUES(1,'Vimukthi','MADUSHAN','233/w','Mathara','SOUTHERN','90000');

INSERT INTO Bank_Card(Card_Number,User_ID,Bank_Name,Owner,CVV,Exp_Date) VALUES('123456789012',1,'Commercial Bank','Pasan madushan','123','2021-12-12');
INSERT INTO Bank_Card(Card_Number,User_ID,Bank_Name,Owner,CVV,Exp_Date) VALUES('098765432123',1,'NDB','Vimukthi madushan','987','2021-12-12');

INSERT INTO variant(Item_ID,Variant_name,Price,Color,Size,SpecificDetail, Quantity) VALUES(1,'Pink',600,'pink','1500ml','none', 30);
INSERT INTO variant(Item_ID,Variant_name,Price,Color,Size,SpecificDetail, Quantity) VALUES(1,'Blue',750,'blue','2200ml','none', 40);


INSERT INTO `Order_Address`
(
  `Address_ID`,
  `First Name`,
  `Last_Name`,
  `State`,
  `Number`,
  `City`,
  `Street`,
  `ZIP`
)
VALUES
(1,
"Chandima",
"Amarasena",
"western",
"No.231",
"Peliyagoda",
"Dutugemunu Mv",
"11830");

INSERT INTO `order`
(`User_ID`,
`Address_ID`,
`Order_status`,
`Card_Number`,
`Ordered_date`,
`Tracking _Number`)
VALUES
(1,
1,
"Shipped",
"2345123456783456",
"2020/01/02",
"23223");

INSERT INTO feedback(User_ID,Item_ID,Order_ID,Rate,Comment) VALUES(1,1,1,4,'nice');
INSERT INTO feedback(User_ID,Item_ID,Order_ID,Rate,Comment) VALUES(1,1,1,1,'not recived');
INSERT INTO feedback(User_ID,Item_ID,Order_ID,Rate,Comment) VALUES(1,1,1,5,'Fast shipping');

INSERT INTO cart_item(Cart_ID, Variant_ID, Quantity) VALUES (1,1,6);
INSERT INTO cart_item(Cart_ID, Variant_ID, Quantity) VALUES (1,2,5);
