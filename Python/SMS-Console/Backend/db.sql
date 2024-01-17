-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: student_management_system
-- ------------------------------------------------------
-- Server version	8.0.33

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
-- Table structure for table `attendance`
--

DROP TABLE IF EXISTS `attendance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `attendance` (
  `attendance_id` int NOT NULL AUTO_INCREMENT,
  `enrollment_id` int DEFAULT NULL,
  `attendance_date` date DEFAULT NULL,
  `status` varchar(20) DEFAULT NULL,
  `additional_info` text,
  `teacher_id` int DEFAULT NULL,
  PRIMARY KEY (`attendance_id`),
  KEY `attendance_ibfk_2` (`teacher_id`),
  KEY `attendance_ibfk_1` (`enrollment_id`),
  CONSTRAINT `attendance_ibfk_1` FOREIGN KEY (`enrollment_id`) REFERENCES `enrollments` (`enrollment_id`),
  CONSTRAINT `attendance_ibfk_2` FOREIGN KEY (`teacher_id`) REFERENCES `teachers` (`teacher_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `attendance`
--

LOCK TABLES `attendance` WRITE;
/*!40000 ALTER TABLE `attendance` DISABLE KEYS */;
INSERT INTO `attendance` VALUES (1,1,'2023-08-20','present','Arrived on time',1),(2,2,'2023-08-20','absent','Sick',2),(3,3,'2023-08-21','present','Active participation',3),(4,4,'2023-08-21','present','Contributed to class discussion',4),(5,5,'2023-08-22','absent','Family emergency',5),(6,7,'2023-10-06','present','Arrived on time',1),(7,4,'2023-10-07','present','NA',14),(8,10,'2023-10-07','present','Need to work quickly',12),(9,10,'2023-12-18','present','should be on it only',14);
/*!40000 ALTER TABLE `attendance` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `courses`
--

DROP TABLE IF EXISTS `courses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `courses` (
  `course_id` int NOT NULL,
  `course_name` varchar(100) DEFAULT NULL,
  `course_code` varchar(20) DEFAULT NULL,
  `description` text,
  `credits` int DEFAULT NULL,
  `department_id` int DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `instructor_id` int DEFAULT NULL,
  `prerequisite_course_id` int DEFAULT NULL,
  `course_level` varchar(20) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT NULL,
  `max_students` int DEFAULT NULL,
  `syllabus_url` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`course_id`),
  KEY `department_id` (`department_id`),
  KEY `prerequisite_course_id` (`prerequisite_course_id`),
  KEY `courses_ibfk_2` (`instructor_id`),
  CONSTRAINT `courses_ibfk_1` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`),
  CONSTRAINT `courses_ibfk_2` FOREIGN KEY (`instructor_id`) REFERENCES `teachers` (`teacher_id`),
  CONSTRAINT `courses_ibfk_3` FOREIGN KEY (`prerequisite_course_id`) REFERENCES `courses` (`course_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `courses`
--

LOCK TABLES `courses` WRITE;
/*!40000 ALTER TABLE `courses` DISABLE KEYS */;
INSERT INTO `courses` VALUES (1,'Computer Science from scratch','CS102','Building blocks of computer science',2,1,'2023-10-13','2023-12-31',1,NULL,'Beginner',1,50,'www.google.com'),(2,'Google Data Analytics','SW190','Google Data Analytics Professional Certificate',3,2,'2023-10-13','2023-12-31',2,NULL,'Advanced',1,40,'https://example.com/math301-syllabus'),(3,'Web Development','WEB202','Learn web development technologies and frameworks.',3,1,'2023-11-10','2024-03-20',3,1,'Intermediate',1,30,'https://example.com/web202-syllabus'),(4,'Sysadmin Internals','IS201','Become a Linux system admin',4,4,'2023-11-12','2023-12-31',4,NULL,'Intermediate',1,45,'https://example.com/hist201-syllabus'),(5,'Google IT Support','SA767','You’ll learn in-demand skills that will have you job-ready',4,5,'2023-10-13','2023-12-31',5,NULL,'Beginner',1,60,'https://example.com/bio101-syllabus'),(6,'Cloud computing','CC200','Modern cloud computing',4,3,'2023-10-13','2023-12-31',6,3,'Advanced',1,25,'https://example.com/phys401-syllabus'),(7,'Machine Learning from scratch','ML9872','Complete guide on Machine learning',4,6,'2023-09-10','2023-12-20',7,1,'Advanced',1,35,'https://example.com/chem301-syllabus'),(8,'Deep learning Programme','DL0826','Deep learning - Next Gen AI',3,6,'2023-10-15','2024-02-10',7,7,'Advanced',1,30,'https://example.com/ee202-syllabus'),(9,'Fundamentals of Computing','SW989','Learn how to program and think like a Computer Scientist',5,2,'2023-10-13','2024-03-15',9,NULL,'Beginner',1,40,'https://example.com/math201-syllabus'),(11,'Python Masterclass','PY5612','Python complete guide',2,1,'2023-09-26','2023-12-31',14,1,'Beginner',1,100,'www.w3schools.com');
/*!40000 ALTER TABLE `courses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `departments`
--

DROP TABLE IF EXISTS `departments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `departments` (
  `department_id` int NOT NULL,
  `department_name` varchar(100) DEFAULT NULL,
  `department_code` varchar(20) DEFAULT NULL,
  `head_of_department` varchar(100) DEFAULT NULL,
  `contact_email` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`department_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `departments`
--

LOCK TABLES `departments` WRITE;
/*!40000 ALTER TABLE `departments` DISABLE KEYS */;
INSERT INTO `departments` VALUES (1,'Computer Science','CS','Dr. John Smith','john.smith@example.com'),(2,'Software Engineering','SW','Dr.Mohan Raj','rmohanraj@mieupro.com'),(3,'Cloud computing','CC','Dr. Maximillian','maxdeeps@academind.com'),(4,'IT support','IS','Dr.Jane Doe','janedoe@yahoo.com'),(5,'SystemAdministration','SA','Dr.Mohan Raj','rmohanraj@mieupro.com'),(6,'Artificial Intelligence','AI','Dr.Tech with Tim','techwithtimdeep@gmail.com');
/*!40000 ALTER TABLE `departments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `enrollments`
--

DROP TABLE IF EXISTS `enrollments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `enrollments` (
  `enrollment_id` int NOT NULL AUTO_INCREMENT,
  `student_id` int DEFAULT NULL,
  `course_id` int DEFAULT NULL,
  `enrollment_date` date DEFAULT NULL,
  `enrollment_status` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`enrollment_id`),
  KEY `course_id` (`course_id`),
  KEY `enrollments_ibfk_1` (`student_id`),
  CONSTRAINT `enrollments_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`),
  CONSTRAINT `enrollments_ibfk_2` FOREIGN KEY (`course_id`) REFERENCES `courses` (`course_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `enrollments`
--

LOCK TABLES `enrollments` WRITE;
/*!40000 ALTER TABLE `enrollments` DISABLE KEYS */;
INSERT INTO `enrollments` VALUES (1,1,8,'2023-08-01','active'),(2,2,6,'2023-08-02','active'),(3,3,9,'2023-08-03','active'),(4,4,1,'2023-08-04','active'),(5,5,1,'2023-08-05','active'),(6,13,3,'2023-09-07','active'),(7,11,1,'2023-09-11','active'),(8,14,2,'2023-09-11','active'),(9,12,3,'2023-09-11','active'),(10,11,3,'2023-09-11','active'),(11,14,8,'2023-12-18','active');
/*!40000 ALTER TABLE `enrollments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `grades`
--

DROP TABLE IF EXISTS `grades`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `grades` (
  `grade_id` int NOT NULL,
  `enrollment_id` int DEFAULT NULL,
  `grade` varchar(2) DEFAULT NULL,
  `grade_date` date DEFAULT NULL,
  `comments` text,
  `grader_id` int DEFAULT NULL,
  `feedback_url` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`grade_id`),
  KEY `grades_ibfk_2` (`grader_id`),
  KEY `grades_ibfk_1` (`enrollment_id`),
  CONSTRAINT `grades_ibfk_1` FOREIGN KEY (`enrollment_id`) REFERENCES `enrollments` (`enrollment_id`),
  CONSTRAINT `grades_ibfk_2` FOREIGN KEY (`grader_id`) REFERENCES `teachers` (`teacher_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `grades`
--

LOCK TABLES `grades` WRITE;
/*!40000 ALTER TABLE `grades` DISABLE KEYS */;
INSERT INTO `grades` VALUES (1,1,'A','2023-08-15','Excellent work!',1,'https://example.com/feedback1'),(2,2,'B+','2023-08-16','Good effort!',2,'https://example.com/feedback2'),(3,3,'B','2023-08-17','Well done!',3,'https://example.com/feedback3'),(4,4,'A-','2023-08-18','Great job!',4,'https://example.com/feedback4'),(5,5,'C','2023-08-19','Keep working hard!',5,'https://example.com/feedback5');
/*!40000 ALTER TABLE `grades` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `students`
--

DROP TABLE IF EXISTS `students`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `students` (
  `student_id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `date_of_birth` date DEFAULT NULL,
  `gender` varchar(10) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `phone_number` varchar(20) DEFAULT NULL,
  `address` varchar(200) DEFAULT NULL,
  `guardian_name` varchar(100) DEFAULT NULL,
  `guardian_phone_number` varchar(20) DEFAULT NULL,
  `admission_date` date DEFAULT NULL,
  `nationality` varchar(50) DEFAULT NULL,
  `emergency_contact_name` varchar(100) DEFAULT NULL,
  `emergency_contact_phone` varchar(20) DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`student_id`),
  KEY `students_ibfk_1` (`user_id`),
  CONSTRAINT `students_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `students`
--

LOCK TABLES `students` WRITE;
/*!40000 ALTER TABLE `students` DISABLE KEYS */;
INSERT INTO `students` VALUES (1,'John','Doe','2002-05-15','Male','john.doe@example.com','+1234567890','123 Main St, City','Jane Doe','+9876543210','2020-08-25','USA','Mary Smith','+1357908642',1),(2,'Alice','Johnson','2003-02-10','Female','alice.johnson@example.com','+9876543210','456 Park Ave, Town','Bob Johnson','+1234567890','2019-09-10','Canada','Michael Brown','+2468135790',2),(3,'David','Smith','2002-11-22','Male','david.smith@example.com','+5555555555','789 Elm St, Village','Samantha Smith','+4444444444','2020-05-01','USA','Lucy Anderson','+7777777777',3),(4,'Emily','Taylor','2003-07-05','Female','emily.taylor@example.com','+1111111111','101 Oak St, City','John Taylor','+2222222222','2019-12-18','UK','Oliver Turner','+9999999999',4),(5,'Michael','Lee','2002-09-30','Male','michael.lee@example.com','+7777777777','222 Maple Ave, Town','Sophia Lee','+8888888888','2021-02-22','USA','Grace Wilson','+3333333333',5),(6,'Emma','Wang','2003-04-12','Female','emma.wang@example.com','+4444444444','333 Pine St, Village','James Wang','+5555555555','2020-07-07','China','Jacob Chen','+2222222222',6),(7,'Matthew','Garcia','2002-06-18','Male','matthew.garcia@example.com','+9999999999','444 Birch Ave, City','Isabella Garcia','+1111111111','2019-10-03','USA','Ava Martinez','+4444444444',7),(8,'Olivia','Lopez','2003-01-09','Female','olivia.lopez@example.com','+2222222222','555 Cedar St, Town','Luis Lopez','+7777777777','2021-05-20','Mexico','Sophia Sanchez','+1111111111',8),(9,'Daniel','Kim','2002-08-27','Male','daniel.kim@example.com','+6666666666','666 Walnut Ave, Village','Jennifer Kim','+3333333333','2020-04-11','USA','Grace Park','+6666666666',9),(10,'Sophia','Chang','2003-03-14','Female','sophia.chang@example.com','+8888888888','777 Oakwood St, City','David Chang','+6666666666','2019-11-28','South Korea','Emily Kim','+8888888888',10),(11,'Sriram','Sr','2000-06-09','male','sriramsr90@gmail.com','8428259394','No.2 Sample address','NA','MA','2023-08-20','Indian','NA','NA',22),(12,'Veera','Mani','1998-10-20','male','veraveen@cisco.com','9126816112','No.23, Thousand lights, ch-15','NA','NA','2023-08-20','Indian','NA','NA',24),(13,'Rahul','Kumar','1999-05-30','male','rahulmani@gmail.com','9821751212','No.2, Thousand lights, chennai - 23.','NA','NA','2023-08-29','Indian','NA','NA',26),(14,'test','student','2048-08-31','male','test@student.com','9999888877','test, testers colony, test-72','NA','NA','2023-09-11','NA','NA','NA',27),(15,'Dennis','Ivy','1992-01-01','male','dennisivy@gmail.com','992171611','No.89, Park town, Churchill, Newyork','NA','NA','2023-09-11','England','NA','NA',29);
/*!40000 ALTER TABLE `students` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teachers`
--

DROP TABLE IF EXISTS `teachers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `teachers` (
  `teacher_id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `phone_number` varchar(20) DEFAULT NULL,
  `address` varchar(200) DEFAULT NULL,
  `department_id` int DEFAULT NULL,
  `hire_date` date DEFAULT NULL,
  `specialization` varchar(100) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`teacher_id`),
  KEY `department_id` (`department_id`),
  KEY `teachers_ibfk_2` (`user_id`),
  CONSTRAINT `teachers_ibfk_1` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`),
  CONSTRAINT `teachers_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teachers`
--

LOCK TABLES `teachers` WRITE;
/*!40000 ALTER TABLE `teachers` DISABLE KEYS */;
INSERT INTO `teachers` VALUES (1,'Mark','Johnson','mark.johnson@example.com','+1234567890','123 Main St, City',1,'2020-01-15','Computer Science',1,11),(2,'Emma','Williams','emma.williams@example.com','+9876543210','456 Park Ave, Town',2,'2019-05-20','Mathematics',1,12),(3,'Stuart','Broad','scjbroad@example.com','+6666666666','123 Oval St, Lords',1,'2022-01-15','Cricket',1,13),(4,'Laura','Miller','laura.miller@example.com','+1111111111','101 Oak St, City',4,'2018-08-25','History',0,14),(5,'Sarah','Wilson','sarah.wilson@example.com','+7777777777','222 Maple Ave, Town',5,'2022-02-10','Biology',1,15),(6,'Daniel','Chang','daniel.chang@example.com','+6666666666','666 Walnut Ave, Village',NULL,'2017-11-30','Physics',1,16),(7,'Sophia','Garcia','sophia.garcia@example.com','+4444444444','333 Pine St, Village',6,'2019-09-15','Artificial Intelligence',1,17),(8,'Alex','Lopez','alex.lopez@example.com','+2222222222','555 Cedar St, Town',3,'2020-06-28','Electrical Engineering',1,18),(9,'Oliver','Brown','oliver.brown@example.com','+9999999999','777 Oakwood St, City',2,'2018-04-05','Algebra',1,19),(10,'Sophie','Anderson','sophie.anderson@example.com','+8888888888','888 Elmwood Ave, Town',NULL,'2021-10-12','Literature',1,20),(11,'Varsha','Sri','varshasri@gmail.com','9186171711','No.12, Theradi street, Thiruneermalai, ch-44',NULL,'2023-08-25','Mathematics',1,23),(12,'Hanish','Kumar','hanishkumar121@gmail.com','9816215111','No.123, Richie street, koyambedu, ch-56.',NULL,'2023-08-25','Computer Science',1,25),(13,'Max','Schwraz','max@academind.com','9128168318','No.12, New colony, Germany',NULL,'2023-09-11','Computer Science',1,28),(14,'test','teacher','test@teacher.com','921972121','NA',NULL,'2023-09-11','Software Testing',1,30);
/*!40000 ALTER TABLE `teachers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `user_type` varchar(20) DEFAULT NULL,
  `profile_picture` varchar(200) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT NULL,
  `last_login` datetime DEFAULT NULL,
  `registration_date` date DEFAULT NULL,
  `reset_token` varchar(100) DEFAULT NULL,
  `reset_token_expiry` datetime DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'JohnDoe','Doe@8124','student',NULL,1,'2023-08-01 10:30:00','2023-08-01',NULL,NULL),(2,'AliceJohnson','Johnson@8124','student',NULL,1,'2023-08-02 11:45:00','2023-08-02',NULL,NULL),(3,'DavidSmith','Smith@8124','student',NULL,1,'2023-08-03 14:20:00','2023-08-03',NULL,NULL),(4,'EmilyTaylor','Taylor@8124','student',NULL,1,'2023-08-04 09:15:00','2023-08-04',NULL,NULL),(5,'MichaelLee','Lee@8124','student',NULL,1,'2023-08-05 16:00:00','2023-08-05',NULL,NULL),(6,'EmmaWang','Wang@8124','student',NULL,1,'2023-08-05 16:00:00','2023-08-05',NULL,NULL),(7,'MatthewGarcia','Garcia@8124','student',NULL,1,'2023-08-05 16:00:00','2023-08-05',NULL,NULL),(8,'OliviaLopez','Lopez@8124','student',NULL,1,'2023-08-05 16:00:00','2023-08-05',NULL,NULL),(9,'DanielKim','Kim@8124','student',NULL,1,'2023-08-05 16:00:00','2023-08-05',NULL,NULL),(10,'SophiaChang','Chang@8124','student',NULL,1,'2023-08-05 16:00:00','2023-08-05',NULL,NULL),(11,'MarkJohnson','Johnson@8124','teacher',NULL,1,'2023-08-05 16:00:00','2023-08-05',NULL,NULL),(12,'EmmaWilliams','Williams@8124','teacher',NULL,1,'2023-08-05 16:00:00','2023-08-05',NULL,NULL),(13,'StuartBroad','Lee@8124','teacher',NULL,1,'2023-08-05 16:00:00','2023-08-05',NULL,NULL),(14,'LauraMiller','Miller@8124','teacher',NULL,1,'2023-08-05 16:00:00','2023-08-05',NULL,NULL),(15,'SarahWilson','Wilson@8124','teacher',NULL,1,'2023-08-05 16:00:00','2023-08-05',NULL,NULL),(16,'Daniel','Chang@8124','teacher',NULL,1,'2023-08-05 16:00:00','2023-08-05',NULL,NULL),(17,'SophiaGarcia','Garcia@8124','teacher',NULL,1,'2023-08-05 16:00:00','2023-08-05',NULL,NULL),(18,'AlexLopez','Lopez@8124','teacher',NULL,1,'2023-08-05 16:00:00','2023-08-05',NULL,NULL),(19,'OliverBrown','Brown@8124','teacher',NULL,1,'2023-08-05 16:00:00','2023-08-05',NULL,NULL),(20,'SophiaAnderson','Anderson@8124','teacher',NULL,1,'2023-08-05 16:00:00','2023-08-05',NULL,NULL),(21,'admin','admin','admin',NULL,1,'2023-08-01 10:30:00','2023-08-01',NULL,NULL),(22,'sriram','sriram','student',NULL,NULL,NULL,'2023-08-13',NULL,NULL),(23,'Varsha','SriVarsha@9000','teacher',NULL,NULL,NULL,'2023-08-13',NULL,NULL),(24,'Veeramani','veeraveen@8124','student',NULL,NULL,NULL,'2023-08-20',NULL,NULL),(25,'Hanish','hanish@8124','teacher',NULL,NULL,NULL,'2023-08-25',NULL,NULL),(26,'Rahul','schoolboy','student',NULL,NULL,NULL,'2023-08-29',NULL,NULL),(27,'test','test','student',NULL,NULL,NULL,'2023-09-07',NULL,NULL),(28,'Max','max123','teacher',NULL,NULL,NULL,'2023-09-11',NULL,NULL),(29,'Dennis','dennisivy','student',NULL,NULL,NULL,'2023-09-11',NULL,NULL),(30,'ttest','test','teacher',NULL,NULL,NULL,'2023-09-11',NULL,NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-01-17 19:02:38
