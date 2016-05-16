-- MySQL dump 10.15  Distrib 10.0.24-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: dev
-- ------------------------------------------------------
-- Server version	10.0.24-MariaDB-7

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `bookmark`
--

DROP TABLE IF EXISTS `bookmark`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bookmark` (
  `username` varchar(40) NOT NULL DEFAULT '',
  `title` varchar(40) NOT NULL DEFAULT '',
  `url` varchar(150) DEFAULT NULL,
  `description` text,
  `star` int(11) DEFAULT NULL,
  `tag1` varchar(40) DEFAULT NULL,
  `tag2` varchar(40) DEFAULT NULL,
  `tag3` varchar(40) DEFAULT NULL,
  `tag4` varchar(40) DEFAULT NULL,
  `creationDate` date DEFAULT NULL,
  `lastVisit` date DEFAULT NULL,
  `counter` int(11) DEFAULT NULL,
  `folder` varchar(40) DEFAULT NULL,
  PRIMARY KEY (`username`,`title`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookmark`
--

LOCK TABLES `bookmark` WRITE;
/*!40000 ALTER TABLE `bookmark` DISABLE KEYS */;
INSERT INTO `bookmark` VALUES ('ghauss@hotmail.fr','facebook','www.facebook.com','facebook is the first social network in the world',1,'facebook',NULL,NULL,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `bookmark` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `books`
--

DROP TABLE IF EXISTS `books`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `books` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(40) DEFAULT NULL,
  `author` varchar(40) DEFAULT NULL,
  `publisher` varchar(40) DEFAULT NULL,
  `price` float(10,2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=64 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `books`
--

LOCK TABLES `books` WRITE;
/*!40000 ALTER TABLE `books` DISABLE KEYS */;
INSERT INTO `books` VALUES (23,'Truthwitch','Susan Dennard','Tor Books',9.99),(24,'The Alloy of Law','Brandon Sanderson','Tor Books ',8.99),(22,'The Queen of the Tearling','Erika Johansen ','Harper',9.50),(31,'The Alloy of Law','Brandon Sanderson','Tor Books ',8.99),(32,'The Queen of the Tearling','Erika Johansen','Harper',9.50),(34,'The Alloy of Law','Brandon Sanderson','Tor Books ',8.99),(25,'The Queen of the Tearling','Erika Johansen','Harper',9.50),(26,'Truthwitch','Susan Dennard','Tor Books',9.99),(35,'The Queen of the Tearling','Erika Johansen','Harper',9.50),(36,'Truthwitch','Susan Dennard','Tor Books',9.99),(45,'The Queen of the Tearling','Erika Johansen','Harper',9.50),(46,'Truthwitch','Susan Dennard','Tor Books',9.99),(63,'hope1','hope1',NULL,88.00),(62,'newrow§!\"#¤%&/()=?','author',NULL,0.00),(61,'test','test',NULL,0.00);
/*!40000 ALTER TABLE `books` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `folder`
--

DROP TABLE IF EXISTS `folder`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `folder` (
  `name` varchar(40) NOT NULL DEFAULT '',
  `username` varchar(40) DEFAULT NULL,
  PRIMARY KEY (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `folder`
--

LOCK TABLES `folder` WRITE;
/*!40000 ALTER TABLE `folder` DISABLE KEYS */;
/*!40000 ALTER TABLE `folder` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `username` varchar(40) NOT NULL DEFAULT '',
  `password` varchar(40) DEFAULT NULL,
  `name` varchar(40) DEFAULT NULL,
  `lastname` varchar(40) DEFAULT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('ghauss@hotmail.fr','88fab5a2b0d46413e5c77541c897ab1c','Guillaume','Hauss'),('shk001@ucsd.edu','8ec5088eab680a67c8210f323c881846','Brian','Kim');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-05-15 17:56:12
