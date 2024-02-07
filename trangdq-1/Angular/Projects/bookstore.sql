-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: localhost    Database: bookstore
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `items_order`
--

DROP TABLE IF EXISTS `items_order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `items_order` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `address_to_receive` varchar(255) DEFAULT NULL,
  `checkout_date` date DEFAULT NULL,
  `items` varchar(255) DEFAULT NULL,
  `message` varchar(255) DEFAULT NULL,
  `order_status` varchar(255) DEFAULT NULL,
  `payment_method` varchar(255) DEFAULT NULL,
  `user_id` bigint NOT NULL,
  `user_info` text,
  `voucher_id` bigint NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `items_order`
--

LOCK TABLES `items_order` WRITE;
/*!40000 ALTER TABLE `items_order` DISABLE KEYS */;
INSERT INTO `items_order` VALUES (1,'Hanoi','2024-01-30','[{\"productId\":10,\"quantity\":2},{\"productId\":1,\"quantity\":2},{\"productId\":17,\"quantity\":1}]',NULL,'CANCELED','CASH',1,'Admin1, 0123456789',0),(2,'Hanoi','2024-01-30','[{\"productId\":1,\"quantity\":1}]',NULL,'CANCELED','CASH',1,'Admin1, 0123456789',0),(3,'Hanoi','2024-01-30','[{\"productId\":2,\"quantity\":1}]',NULL,'CANCELED','CASH',1,'Admin1, 0123456789',0),(4,'Hanoi','2024-01-30','[{\"productId\":2,\"quantity\":1}]',NULL,'CANCELED','CASH',1,'Admin1, 0123456789',0),(5,'Hanoi','2024-01-30','[{\"productId\":1,\"quantity\":1}]',NULL,'CANCELED','CASH',1,'Admin1, 0123456789',0),(6,'Hanoi','2024-01-30','[{\"productId\":1,\"quantity\":1}]',NULL,'CANCELED','CASH',1,'Admin1, 0123456789',0),(7,'Hanoi','2024-01-30','[{\"productId\":2,\"quantity\":1}]',NULL,'SUCCESS','CASH',1,'Admin1, 0123456789',0),(8,'Hanoi','2024-01-31','[{\"productId\":3,\"quantity\":1},{\"productId\":1,\"quantity\":1}]',NULL,'SUCCESS','CASH',1,'Admin1, 0123456789',0),(9,'Hanoi','2024-01-31','[{\"productId\":2,\"quantity\":1}]',NULL,'CANCELED','CASH',1,'Admin1, 0123456789',0),(10,'Hanoi','2024-01-31','[{\"productId\":3,\"quantity\":1}]',NULL,'SUCCESS','CASH',1,'Admin1, 0123456789',0),(11,'Hanoi','2024-01-31','[{\"productId\":1,\"quantity\":1}]',NULL,'CANCELED','CASH',1,'Admin1, 0123456789',0),(12,'Hanoi','2024-01-31','[{\"productId\":1,\"quantity\":1}]',NULL,'CUSTOMER_REQUEST_CANCEL','CASH',1,'Admin1, 0123456789',0),(13,'Hanoi','2024-01-31','[{\"productId\":10,\"quantity\":2},{\"productId\":1,\"quantity\":3},{\"productId\":17,\"quantity\":1}]','','CUSTOMER_REQUEST_CANCEL','CASH',7,'User1, 0123456789',0),(14,'Hanoi','2024-01-31','[{\"productId\":3,\"quantity\":1}]','','SUCCESS','CASH',7,'User1, 0123456789',0),(16,'Hanoi','2024-02-01','[{\"productId\":6,\"quantity\":1}]','','SHIPPING','CASH',7,'User1, 0123456789',0),(17,'Hanoi','2024-02-01','[{\"productId\":6,\"quantity\":1}]','','ADMIN_PREPARING','CASH',7,'User1, 0123456789',0),(18,'Hanoi','2024-02-01','[{\"productId\":6,\"quantity\":1}]','','CUSTOMER_CONFIRMED','CASH',7,'User1, 0123456789',0);
/*!40000 ALTER TABLE `items_order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `category` varchar(255) DEFAULT NULL,
  `description` text,
  `discount` int NOT NULL,
  `images` text,
  `in_stock` bigint NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `price` double NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_jmivyxk9rmgysrmsqw15lqr5b` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (1,'Horror','Thanks to the manipulations of those in the broadcast room, Nene and Sumire find themselves trapped once more in No. 6’s boundary. While Hanako-kun isn’t there to help them escape this time, they aren’t alone―No. 6 himself is there as well! Sumire is thrilled to be reunited with her beloved after so many years, and with No. 6 having come to terms with his feelings at long last, perhaps they have a chance to change how they left things…',0,'https://res.cloudinary.com/dzi8lavyv/image/upload/v1706160863/Hanako-kun.jpg_1706160861808.jpg\n',20,'Toilet-bound Hanako-kun, Vol. 19 ',10.4),(2,'Detective','An action-packed comedy about a fake family that includes a spy, an assassin and a telepath!\nMaster spy Twilight is unparalleled when it comes to going undercover on dangerous missions for the betterment of the world. But when he receives the ultimate assignment—to get married and have a kid—he may finally be in over his head!\nThreatened by Yor’s relationship with Melinda Desmond, Anya gets serious about her own friendship scheme. On the way to a museum field trip, however, she and her class become the target of activists looking to free their political allies… ',10,'https://res.cloudinary.com/dzi8lavyv/image/upload/v1706160932/Spy%20x%20Family.jpg_1706160929743.jpg\n',15,'Spy x Family, Vol. 11',10),(3,'Fiction','To gain the power he needs to save his friend from a cursed spirit, Yuji Itadori swallows a piece of a demon, only to find himself caught in the midst of a horrific war of the supernatural!\nIn a world where cursed spirits feed on unsuspecting humans, fragments of the legendary and feared demon Ryomen Sukuna have been lost and scattered about. Should any demon consume Sukuna’s body parts, the power they gain could destroy the world as we know it. Fortunately, there exists a mysterious school of jujutsu sorcerers who exist to protect the precarious existence of the living from the supernatural!\nA mysterious cursed spirit with a grudge against Maki flies into Sakurajima Colony. It evolves with incredible speed from cursed womb to adult form and threatens to overwhelm Maki and Noritoshi. Just then, two more combatants join the battle… ',10,'https://res.cloudinary.com/dzi8lavyv/image/upload/v1706160977/Jujutsu%20Kaisen.jpg_1706160976712.jpg\nhttps://res.cloudinary.com/dzi8lavyv/image/upload/v1706161129/Jujutsu%20Kaisen%202.jpg_1706161128419.jpg\n',20,'Jujutsu Kaisen, Vol. 21',12),(4,'Horror','Broke young man + chainsaw demon = Chainsaw Man!\nDenji was a small-time devil hunter just trying to survive in a harsh world. After being killed on a job, he is revived by his pet devil Pochita and becomes something new and dangerous—Chainsaw Man!\nAs a primal fear devil makes its appearance, the world may soon be turned upside down. This devil has the power to drive a wedge between Asa and Yoru—can the two of them manage to work together to avoid becoming a meal for the residents of hell? ',25,'https://res.cloudinary.com/dzi8lavyv/image/upload/v1706161090/Chainsaw%20Man.jpg_1706161088681.jpg\n',20,'Chainsaw Man, Vol. 12',12),(5,'Adventure','Chainsaw Man returns in novel form with four stories of devil-hunting partners!\nPower lives out her favorite anime by becoming a genius detective—or so she wants her “audience” to believe! Denji is along for the ride as her assistant for an investigation into disappearances at a mountain hotel. Other stories center on Quanxi and Kishibe’s relationship nine years after they met, Himeno and Aki’s first assignment together, and Denji, Power, and Aki’s dream trip to Enoshima. ',0,'https://res.cloudinary.com/dzi8lavyv/image/upload/v1706161195/Buddy%20Story.jpg_1706161195053.jpg\n',30,'Chainsaw Man: Buddy Stories',15),(6,'Fiction','Thus far, Jinwoo has managed to keep his rapid evolution hidden from his fellow hunters. When he arrives at his latest assignment, though, he is greeted by a group of familiar faces-Joohee, Mr. Song, and the other survivors of the double dungeon are gathered for the raid, and his comrades can’t help but notice Jinwoo’s drastic change in stature! Jinwoo intends to act the weakling he was before, but when their party is joined by a group of criminals and their association minder, Jinwoo may have no choice but to push his newly acquired skills to the limit if he and his friends want to get out alive!',10,'https://res.cloudinary.com/dzi8lavyv/image/upload/v1706161267/Solo%20Leveling.jpg_1706161265752.jpg\n',25,'Solo Leveling, Vol 3',10),(7,'Literature','Kafka wants to clean up kaiju, but not literally! Will a sudden metamorphosis stand in the way of his dream?\nWith the highest kaiju-emergence rates in the world, Japan is no stranger to attack by deadly monsters. Enter the Japan Defense Force, a military organization tasked with the neutralization of kaiju. Kafka Hibino, a kaiju-corpse cleanup man, has always dreamed of joining the force. But when he gets another shot at achieving his childhood dream, he undergoes an unexpected transformation. How can he fight kaiju now that he’s become one himself?!\n\nWith the looming threat of a cataclysm induced by No. 9, the next generation of the Defense Force takes steps to prepare. Reno undergoes training and becomes the first compatible user of No. 6 in history. Kafka sharpens his skills by learning squadron-style combat techniques under Hoshina’s tutelage. Meanwhile, Kikoru gets clearance from Narumi to inherit a powerful memento that once belonged to her mother. ',20,'https://res.cloudinary.com/dzi8lavyv/image/upload/v1706161438/Kaiju%20No.%208.jpg_1706161437877.jpg\n',10,'Kaiju No. 8, Vol. 9',20),(8,'Detective','Kill some time with former hit man Taro Sakamoto!\nTaro Sakamoto was once a legendary hit man considered the greatest of all time. Bad guys feared him! Assassins revered him! But then one day he quit, got married, and had a baby. He’s now living the quiet life as the owner of a neighborhood store, but how long can Sakamoto enjoy his days of retirement before his past catches up to him?!\n\nAs Sakamoto and his friends hunt for the database at the JCC, Shin winds up in a serious duel with a teacher who might have information on what they want. Meanwhile, Sakamoto deals with Amane, a boy with a connection to X. Thanks to X’s schemes, the JCC faces an unprecedented crisis! ',10,'https://res.cloudinary.com/dzi8lavyv/image/upload/v1706161503/Sakamoto%20Days.jpg_1706161503159.jpg\n',0,'Sakamoto Days, Vol. 10',15),(9,'Comic','There are lotss of cover pages here!',20,'https://res.cloudinary.com/dzi8lavyv/image/upload/v1706161576/Sakamoto%20Days%202.jpg_1706161574854.jpg\nhttps://res.cloudinary.com/dzi8lavyv/image/upload/v1706161578/Sakamoto%20Days.jpg_1706161578263.jpg\nhttps://res.cloudinary.com/dzi8lavyv/image/upload/v1706161580/Kaiju%20No.%208.jpg_1706161580158.jpg\nhttps://res.cloudinary.com/dzi8lavyv/image/upload/v1706161583/Buddy%20Story.jpg_1706161582432.jpg\nhttps://res.cloudinary.com/dzi8lavyv/image/upload/v1706161585/Hanako-kun.jpg_1706161584425.jpg\nhttps://res.cloudinary.com/dzi8lavyv/image/upload/v1706161586/Spy%20x%20Family.jpg_1706161586569.jpg\nhttps://res.cloudinary.com/dzi8lavyv/image/upload/v1706161589/My%20Hero%20Academia.jpg_1706161588639.jpg\nhttps://res.cloudinary.com/dzi8lavyv/image/upload/v1706161591/One%20Punch%20Man.jpg_1706161591126.jpg\nhttps://res.cloudinary.com/dzi8lavyv/image/upload/v1706161593/Chainsaw%20Man%202.jpg_1706161593453.jpg\nhttps://res.cloudinary.com/dzi8lavyv/image/upload/v1706161595/Chainsaw%20Man.jpg_1706161595262.jpg\nhttps://res.cloudinary.com/dzi8lavyv/image/upload/v1706161598/Jujutsu%20Kaisen%202.jpg_1706161597481.jpg\nhttps://res.cloudinary.com/dzi8lavyv/image/upload/v1706161600/Jujutsu%20Kaisen.jpg_1706161599608.jpg\nhttps://res.cloudinary.com/dzi8lavyv/image/upload/v1706161603/Solo%20Leveling.jpg_1706161601952.jpg\n',10,'Cover Pages',50),(10,'Adventure','Midoriya inherits the superpower of the world’s greatest hero, but greatness won’t come easy.\nWhat would the world be like if 80 percent of the population manifested superpowers called “Quirks”? Heroes and villains would be battling it out everywhere! Being a hero would mean learning to use your power, but where would you go to study? The Hero Academy of course! But what would you do if you were one of the 20 percent who were born Quirkless?\n\nThe plan to engage the villains on the heroes’ terms has mostly succeeded. Now in different locations around Japan, the heroes and U.A. students take on the villains in all-out battles! First, Todoroki squares off against Dabi with terrifying intensity. Elsewhere, Endeavor and Hawks hope to turn the tables on All For One, but the villain mastermind has one last trick up his sleeve. Finally, it’s Tomura’s new and improved body versus the crew at the airborne U.A., where the youngest heroes have critical roles to play! ',50,'https://res.cloudinary.com/dzi8lavyv/image/upload/v1706161662/My%20Hero%20Academia.jpg_1706161661356.jpg\n',20,'My Hero Academia, Vol. 36',20),(11,'Horror','Thanks to the manipulations of those in the broadcast room, Nene and Sumire find themselves trapped once more in No. 6’s boundary. While Hanako-kun isn’t there to help them escape this time, they aren’t alone―No. 6 himself is there as well! Sumire is thrilled to be reunited with her beloved after so many years, and with No. 6 having come to terms with his feelings at long last, perhaps they have a chance to change how they left things…',0,'https://res.cloudinary.com/dzi8lavyv/image/upload/v1706160863/Hanako-kun.jpg_1706160861808.jpg\n',20,'Toilet-bound Hanako-kun, Vol. 20',10.4),(12,'Fiction','Thus far, Jinwoo has managed to keep his rapid evolution hidden from his fellow hunters. When he arrives at his latest assignment, though, he is greeted by a group of familiar faces-Joohee, Mr. Song, and the other survivors of the double dungeon are gathered for the raid, and his comrades can’t help but notice Jinwoo’s drastic change in stature! Jinwoo intends to act the weakling he was before, but when their party is joined by a group of criminals and their association minder, Jinwoo may have no choice but to push his newly acquired skills to the limit if he and his friends want to get out alive!',10,'https://res.cloudinary.com/dzi8lavyv/image/upload/v1706161267/Solo%20Leveling.jpg_1706161265752.jpg\n',25,'Solo Leveling, Vol 4',10),(13,'Adventure','Chainsaw Man returns in novel form with four stories of devil-hunting partners!\n\nPower lives out her favorite anime by becoming a genius detective—or so she wants her “audience” to believe! Denji is along for the ride as her assistant for an investigation into disappearances at a mountain hotel. Other stories center on Quanxi and Kishibe’s relationship nine years after they met, Himeno and Aki’s first assignment together, and Denji, Power, and Aki’s dream trip to Enoshima. ',0,'https://res.cloudinary.com/dzi8lavyv/image/upload/v1706161195/Buddy%20Story.jpg_1706161195053.jpg\n',30,'Chainsaw Man: Buddy Stories 2',15),(14,'Detective','Kill some time with former hit man Taro Sakamoto!\nTaro Sakamoto was once a legendary hit man considered the greatest of all time. Bad guys feared him! Assassins revered him! But then one day he quit, got married, and had a baby. He’s now living the quiet life as the owner of a neighborhood store, but how long can Sakamoto enjoy his days of retirement before his past catches up to him?!\n\nAs Sakamoto and his friends hunt for the database at the JCC, Shin winds up in a serious duel with a teacher who might have information on what they want. Meanwhile, Sakamoto deals with Amane, a boy with a connection to X. Thanks to X’s schemes, the JCC faces an unprecedented crisis! ',10,'https://res.cloudinary.com/dzi8lavyv/image/upload/v1706161503/Sakamoto%20Days.jpg_1706161503159.jpg\n',0,'Sakamoto Days, Vol. 11',15),(15,'Fiction','To gain the power he needs to save his friend from a cursed spirit, Yuji Itadori swallows a piece of a demon, only to find himself caught in the midst of a horrific war of the supernatural!\n\nIn a world where cursed spirits feed on unsuspecting humans, fragments of the legendary and feared demon Ryomen Sukuna have been lost and scattered about. Should any demon consume Sukuna’s body parts, the power they gain could destroy the world as we know it. Fortunately, there exists a mysterious school of jujutsu sorcerers who exist to protect the precarious existence of the living from the supernatural!\n\nA mysterious cursed spirit with a grudge against Maki flies into Sakurajima Colony. It evolves with incredible speed from cursed womb to adult form and threatens to overwhelm Maki and Noritoshi. Just then, two more combatants join the battle… ',10,'https://res.cloudinary.com/dzi8lavyv/image/upload/v1706160977/Jujutsu%20Kaisen.jpg_1706160976712.jpg\nhttps://res.cloudinary.com/dzi8lavyv/image/upload/v1706161129/Jujutsu%20Kaisen%202.jpg_1706161128419.jpg\n',20,'Jujutsu Kaisen, Vol. 22',12),(16,'Literature','Kafka wants to clean up kaiju, but not literally! Will a sudden metamorphosis stand in the way of his dream?\nWith the highest kaiju-emergence rates in the world, Japan is no stranger to attack by deadly monsters. Enter the Japan Defense Force, a military organization tasked with the neutralization of kaiju. Kafka Hibino, a kaiju-corpse cleanup man, has always dreamed of joining the force. But when he gets another shot at achieving his childhood dream, he undergoes an unexpected transformation. How can he fight kaiju now that he’s become one himself?!\n\nWith the looming threat of a cataclysm induced by No. 9, the next generation of the Defense Force takes steps to prepare. Reno undergoes training and becomes the first compatible user of No. 6 in history. Kafka sharpens his skills by learning squadron-style combat techniques under Hoshina’s tutelage. Meanwhile, Kikoru gets clearance from Narumi to inherit a powerful memento that once belonged to her mother. ',20,'https://res.cloudinary.com/dzi8lavyv/image/upload/v1706161438/Kaiju%20No.%208.jpg_1706161437877.jpg\n',10,'Kaiju No. 8, Vol. 10',20),(17,'Detective','An action-packed comedy about a fake family that includes a spy, an assassin and a telepath!\nMaster spy Twilight is unparalleled when it comes to going undercover on dangerous missions for the betterment of the world. But when he receives the ultimate assignment—to get married and have a kid—he may finally be in over his head!\nThreatened by Yor’s relationship with Melinda Desmond, Anya gets serious about her own friendship scheme. On the way to a museum field trip, however, she and her class become the target of activists looking to free their political allies… ',10,'https://res.cloudinary.com/dzi8lavyv/image/upload/v1706160932/Spy%20x%20Family.jpg_1706160929743.jpg\n',15,'Spy x Family, Vol. 12',10),(18,'Horror','Thanks to the manipulations of those in the broadcast room, Nene and Sumire find themselves trapped once more in No. 6’s boundary. While Hanako-kun isn’t there to help them escape this time, they aren’t alone―No. 6 himself is there as well! Sumire is thrilled to be reunited with her beloved after so many years, and with No. 6 having come to terms with his feelings at long last, perhaps they have a chance to change how they left things…',0,'https://res.cloudinary.com/dzi8lavyv/image/upload/v1706160863/Hanako-kun.jpg_1706160861808.jpg\n',20,'Toilet-bound Hanako-kun, Vol. 21',10.4),(19,'Detective','Kill some time with former hit man Taro Sakamoto!\nTaro Sakamoto was once a legendary hit man considered the greatest of all time. Bad guys feared him! Assassins revered him! But then one day he quit, got married, and had a baby. He’s now living the quiet life as the owner of a neighborhood store, but how long can Sakamoto enjoy his days of retirement before his past catches up to him?!\n\nAs Sakamoto and his friends hunt for the database at the JCC, Shin winds up in a serious duel with a teacher who might have information on what they want. Meanwhile, Sakamoto deals with Amane, a boy with a connection to X. Thanks to X’s schemes, the JCC faces an unprecedented crisis! ',10,'https://res.cloudinary.com/dzi8lavyv/image/upload/v1706161503/Sakamoto%20Days.jpg_1706161503159.jpg\n',0,'Sakamoto Days, Vol. 12',15),(20,'Horror','Thanks to the manipulations of those in the broadcast room, Nene and Sumire find themselves trapped once more in No. 6’s boundary. While Hanako-kun isn’t there to help them escape this time, they aren’t alone―No. 6 himself is there as well! Sumire is thrilled to be reunited with her beloved after so many years, and with No. 6 having come to terms with his feelings at long last, perhaps they have a chance to change how they left things…',0,'https://res.cloudinary.com/dzi8lavyv/image/upload/v1706160863/Hanako-kun.jpg_1706160861808.jpg\nhttps://res.cloudinary.com/dzi8lavyv/image/upload/v1706174812/Sakamoto%20Days%202.jpg_1706174812346.jpg\nhttps://res.cloudinary.com/dzi8lavyv/image/upload/v1706174815/Buddy%20Story.jpg_1706174814369.jpg\n',30,'Toilet-bound Hanako-kun, Vol. 22',10.4),(21,'Comic','There are lotss of cover pages here!',20,'https://res.cloudinary.com/dzi8lavyv/image/upload/v1706161576/Sakamoto%20Days%202.jpg_1706161574854.jpg\nhttps://res.cloudinary.com/dzi8lavyv/image/upload/v1706161578/Sakamoto%20Days.jpg_1706161578263.jpg\nhttps://res.cloudinary.com/dzi8lavyv/image/upload/v1706161580/Kaiju%20No.%208.jpg_1706161580158.jpg\nhttps://res.cloudinary.com/dzi8lavyv/image/upload/v1706161583/Buddy%20Story.jpg_1706161582432.jpg\nhttps://res.cloudinary.com/dzi8lavyv/image/upload/v1706161585/Hanako-kun.jpg_1706161584425.jpg\nhttps://res.cloudinary.com/dzi8lavyv/image/upload/v1706161586/Spy%20x%20Family.jpg_1706161586569.jpg\nhttps://res.cloudinary.com/dzi8lavyv/image/upload/v1706161589/My%20Hero%20Academia.jpg_1706161588639.jpg\nhttps://res.cloudinary.com/dzi8lavyv/image/upload/v1706161591/One%20Punch%20Man.jpg_1706161591126.jpg\nhttps://res.cloudinary.com/dzi8lavyv/image/upload/v1706161593/Chainsaw%20Man%202.jpg_1706161593453.jpg\nhttps://res.cloudinary.com/dzi8lavyv/image/upload/v1706161595/Chainsaw%20Man.jpg_1706161595262.jpg\nhttps://res.cloudinary.com/dzi8lavyv/image/upload/v1706161598/Jujutsu%20Kaisen%202.jpg_1706161597481.jpg\nhttps://res.cloudinary.com/dzi8lavyv/image/upload/v1706161600/Jujutsu%20Kaisen.jpg_1706161599608.jpg\nhttps://res.cloudinary.com/dzi8lavyv/image/upload/v1706161603/Solo%20Leveling.jpg_1706161601952.jpg\n',10,'Cover Pages 2',50),(22,'Horror','Broke young man + chainsaw demon = Chainsaw Man!\nDenji was a small-time devil hunter just trying to survive in a harsh world. After being killed on a job, he is revived by his pet devil Pochita and becomes something new and dangerous—Chainsaw Man!\nAs a primal fear devil makes its appearance, the world may soon be turned upside down. This devil has the power to drive a wedge between Asa and Yoru—can the two of them manage to work together to avoid becoming a meal for the residents of hell? ',25,'https://res.cloudinary.com/dzi8lavyv/image/upload/v1706161090/Chainsaw%20Man.jpg_1706161088681.jpg\n',20,'Chainsaw Man, Vol. 13',12);
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shopping_cart`
--

DROP TABLE IF EXISTS `shopping_cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shopping_cart` (
  `user_id` bigint NOT NULL,
  `items` text,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shopping_cart`
--

LOCK TABLES `shopping_cart` WRITE;
/*!40000 ALTER TABLE `shopping_cart` DISABLE KEYS */;
INSERT INTO `shopping_cart` VALUES (1,'[{\"productId\":1,\"quantity\":8},{\"productId\":2,\"quantity\":8},{\"productId\":3,\"quantity\":8}]'),(7,NULL),(18,NULL),(19,NULL);
/*!40000 ALTER TABLE `shopping_cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `dtype` varchar(20) NOT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  `address` varchar(255) DEFAULT NULL,
  `age` int NOT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `enabled` bit(1) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_t8tbwelrnviudxdaggwr1kd9b` (`email`,`username`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('admin',1,'Hanoi',20,'https://cdn.alongwalk.info/info/wp-content/uploads/2022/11/16190605/image-99-hinh-avatar-cute-ngau-ca-tinh-de-thuong-nhat-cho-nam-nu-0096fcffd35002f7d89daff94d95ab6b.jpg','admin@gmail.com',_binary '','Admin1','$2a$10$Cw2n02Zy65mdrj9mYBa/zu1ANvGSyeRs/R7Ms1LfgsY7KofyaLnw2','0123456789','ROLE_ADMIN','test_admin'),('customer',7,'Hanoi',20,'https://cdn.alongwalk.info/info/wp-content/uploads/2022/11/16190605/image-99-hinh-avatar-cute-ngau-ca-tinh-de-thuong-nhat-cho-nam-nu-0096fcffd35002f7d89daff94d95ab6b.jpg','user@gmail.com',_binary '','User1','$2a$10$VqKsRxltrxlsm2qH.5BKfOdDvmo3uSpntQ4ohUbjZfNjpCOjQOcJy','0123456789','ROLE_CUSTOMER','test_user');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `voucher`
--

DROP TABLE IF EXISTS `voucher`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `voucher` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `due_date` date DEFAULT NULL,
  `rate` double NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `user_id` bigint NOT NULL,
  `user` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK3ukqbgruq0xv63io954tni4l0` (`user`),
  CONSTRAINT `FK3ukqbgruq0xv63io954tni4l0` FOREIGN KEY (`user`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `voucher`
--

LOCK TABLES `voucher` WRITE;
/*!40000 ALTER TABLE `voucher` DISABLE KEYS */;
/*!40000 ALTER TABLE `voucher` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-06 23:25:46
