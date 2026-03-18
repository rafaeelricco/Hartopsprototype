-- MySQL dump 10.13  Distrib 9.6.0, for macos14.8 (arm64)
--
-- Host: portal-myhems-prod.cz90ylzkqopr.us-east-1.rds.amazonaws.com    Database: crossbox
-- ------------------------------------------------------
-- Server version	8.4.6

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
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '';

--
-- Temporary view structure for view `Account_Update`
--

DROP TABLE IF EXISTS `Account_Update`;
/*!50001 DROP VIEW IF EXISTS `Account_Update`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `Account_Update` AS SELECT 
 1 AS `Account_ID`,
 1 AS `Old_Customer_Business_Name`,
 1 AS `New_Customer_Business_Name`,
 1 AS `Old_Ship_to_Address_Line_1`,
 1 AS `New_Ship_to_Address_Line_1`,
 1 AS `Old_Ship_to_Address_Line_2`,
 1 AS `New_Ship_to_Address_Line_2`,
 1 AS `Old_Ship_To_City`,
 1 AS `New_Ship_To_City`,
 1 AS `Old_ST_Ste`,
 1 AS `New_ST_Ste`,
 1 AS `Old_Zip_Code`,
 1 AS `New_Zip_Code`,
 1 AS `Old_Name_Of_County`,
 1 AS `New_Name_Of_County`,
 1 AS `Old_State_License_Number`,
 1 AS `New_State_License_Number`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `Combined_Account_Data`
--

DROP TABLE IF EXISTS `Combined_Account_Data`;
/*!50001 DROP VIEW IF EXISTS `Combined_Account_Data`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `Combined_Account_Data` AS SELECT 
 1 AS `Account Number`,
 1 AS `Customer Business Name`,
 1 AS `Ship to Address Line 1`,
 1 AS `Ship to Address Line 2`,
 1 AS `Ship To City`,
 1 AS `ST Ste`,
 1 AS `Zip Code`,
 1 AS `Name Of County`,
 1 AS `State License #`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `FileProcessingStatus`
--

DROP TABLE IF EXISTS `FileProcessingStatus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `FileProcessingStatus` (
  `FileKey` varchar(255) NOT NULL,
  `Status` enum('Uploaded','Processed') NOT NULL DEFAULT 'Uploaded',
  `LastUpdated` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`FileKey`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `NYACS119F1_M`
--

DROP TABLE IF EXISTS `NYACS119F1_M`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `NYACS119F1_M` (
  `Account Number` int DEFAULT NULL,
  `Customer Business Name` text,
  `Ship to Address Line 1` text,
  `Ship to Address Line 2` text,
  `Ship To City` text,
  `ST Ste` text,
  `Zip Code` int DEFAULT NULL,
  `Name Of County` text,
  `State License #` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `NYACS119F1_U`
--

DROP TABLE IF EXISTS `NYACS119F1_U`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `NYACS119F1_U` (
  `ï»¿Acct Number` int DEFAULT NULL,
  `Customer Business Name` text,
  `Ship to Address Line 1` text,
  `Ship to Address Line 2` text,
  `Ship To City` text,
  `ST Ste` text,
  `Zip Code` int DEFAULT NULL,
  `Name Of County` text,
  `State License #` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Processed_Files`
--

DROP TABLE IF EXISTS `Processed_Files`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Processed_Files` (
  `File_Name` varchar(255) NOT NULL,
  `Processed_Timestamp` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`File_Name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `SGWS_Accounts`
--

DROP TABLE IF EXISTS `SGWS_Accounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `SGWS_Accounts` (
  `Acct_Number` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Customer_Business_Name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Ship_to_Address_Line_1` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Ship_to_Address_Line_2` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Ship_To_City` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ST_Ste` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Zip_Code` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Name_Of_County` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `State_License_Number` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  UNIQUE KEY `Acct_Number_UNIQUE` (`Acct_Number`),
  KEY `idx_sgws_accounts_acct_number` (`Acct_Number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Temporary view structure for view `SLA_Data`
--

DROP TABLE IF EXISTS `SLA_Data`;
/*!50001 DROP VIEW IF EXISTS `SLA_Data`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `SLA_Data` AS SELECT 
 1 AS `Event Name`,
 1 AS `Date of Event`,
 1 AS `Time of Event`,
 1 AS `Event End`,
 1 AS `Duration (Minutes)`,
 1 AS `Educator`,
 1 AS `Brands Offered`,
 1 AS `Price Per Drink`,
 1 AS `Total (Cannot Exceed $700)`,
 1 AS `Company`,
 1 AS `License Number`,
 1 AS `Address`,
 1 AS `Region`,
 1 AS `Drinks Purchased`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `account_email_logs`
--

DROP TABLE IF EXISTS `account_email_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `account_email_logs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `event_id` int NOT NULL,
  `educator_id` varchar(255) NOT NULL,
  `account_id` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=132934 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `account_sizes`
--

DROP TABLE IF EXISTS `account_sizes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `account_sizes` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `accounts_details`
--

DROP TABLE IF EXISTS `accounts_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `accounts_details` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `company` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `secondary_name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `account_affluency` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `liquor_license` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `manhattan_beer_id` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `winebow_id` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `opici_id` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `empire_id` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `southern_id` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `southern_td_cd` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `premise_id` int DEFAULT NULL,
  `transportation_notes` text COLLATE utf8mb4_unicode_ci,
  `private_admin_notes` text COLLATE utf8mb4_unicode_ci,
  `blacklist_status` int NOT NULL,
  `blacklist_notes` text COLLATE utf8mb4_unicode_ci,
  `logo` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `referred_by` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `age_groups`
--

DROP TABLE IF EXISTS `age_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `age_groups` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `app_logins`
--

DROP TABLE IF EXISTS `app_logins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `app_logins` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `device_os` varchar(255) DEFAULT NULL,
  `os_version` varchar(255) DEFAULT NULL,
  `app_version` varchar(255) DEFAULT NULL,
  `last_updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=48063 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `assigned_contacts`
--

DROP TABLE IF EXISTS `assigned_contacts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `assigned_contacts` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `company_id` int NOT NULL,
  `contact_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3861 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `brands`
--

DROP TABLE IF EXISTS `brands`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `brands` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cities`
--

DROP TABLE IF EXISTS `cities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cities` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `city_name` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2147 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `classification_queue`
--

DROP TABLE IF EXISTS `classification_queue`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `classification_queue` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `source` enum('email','menu','survey') NOT NULL,
  `raw_item_name` varchar(255) NOT NULL,
  `raw_brand` varchar(255) DEFAULT NULL,
  `raw_category` varchar(100) DEFAULT NULL,
  `master_item_id` bigint DEFAULT NULL,
  `ai_suggested_item_id` bigint DEFAULT NULL,
  `ai_confidence` decimal(5,4) DEFAULT NULL,
  `human_confirmed_item_id` bigint DEFAULT NULL,
  `human_confidence` enum('high','medium','low') DEFAULT NULL,
  `status` enum('pending','ai_classified','needs_review','approved','rejected') DEFAULT 'pending',
  `source_record_id` bigint DEFAULT NULL,
  `account_id` bigint DEFAULT NULL,
  `location_id` bigint DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `status` (`status`),
  KEY `raw_item_name` (`raw_item_name`),
  KEY `master_item_id` (`master_item_id`),
  KEY `ai_suggested_item_id` (`ai_suggested_item_id`),
  KEY `account_id` (`account_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `colors`
--

DROP TABLE IF EXISTS `colors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `colors` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `color_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `companies`
--

DROP TABLE IF EXISTS `companies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `companies` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `company` text COLLATE utf8mb4_unicode_ci,
  `hart_company` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `secondary_name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `account_affluency` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image_default` tinyint(1) DEFAULT '0',
  `email` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email_hash` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `website` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fax` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cell_phone` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `liquor_license` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `manhattan_beer_id` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `winebow_id` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `opici_id` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `empire_id` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `southern_id` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `southern_td_cd` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `premise_id` int DEFAULT NULL,
  `account_size` int DEFAULT NULL,
  `transportation_notes` text COLLATE utf8mb4_unicode_ci,
  `referred_by` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `company_address_id` int unsigned DEFAULT NULL,
  `company_type` enum('supplier','distributor','account') COLLATE utf8mb4_unicode_ci NOT NULL,
  `division_id` int DEFAULT NULL,
  `status` tinyint NOT NULL DEFAULT '1' COMMENT '0 - Inactive, 1 - Active',
  `rating_enabled` tinyint NOT NULL DEFAULT '0' COMMENT '1 - Active, 0 - Inactive',
  `has_email` tinyint NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `company_address_id` (`company_address_id`),
  KEY `company_type` (`company_type`),
  KEY `idx_companies_id` (`id`),
  KEY `idx_companies_southern_id` (`southern_id`)
) ENGINE=InnoDB AUTO_INCREMENT=34379 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `company_addresses`
--

DROP TABLE IF EXISTS `company_addresses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `company_addresses` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `street` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `street_2` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `city_id` int DEFAULT NULL,
  `region_id` int DEFAULT NULL,
  `state_id` int DEFAULT NULL,
  `territories_id` int DEFAULT NULL,
  `latitude` decimal(9,6) DEFAULT NULL,
  `longitude` decimal(9,6) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `zip` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `city_id` (`city_id`),
  KEY `state_id` (`state_id`)
) ENGINE=InnoDB AUTO_INCREMENT=31088 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `company_regions`
--

DROP TABLE IF EXISTS `company_regions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `company_regions` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `company_id` int DEFAULT NULL,
  `region_id` int DEFAULT NULL,
  `territory_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=127 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `contact_regions`
--

DROP TABLE IF EXISTS `contact_regions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contact_regions` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `region_id` int NOT NULL,
  `territory_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3064 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `contact_suppliers`
--

DROP TABLE IF EXISTS `contact_suppliers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contact_suppliers` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `company_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=71 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `contact_types`
--

DROP TABLE IF EXISTS `contact_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contact_types` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `csv_data`
--

DROP TABLE IF EXISTS `csv_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `csv_data` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `csv_filename` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  `csv_data` longtext COLLATE utf8mb3_unicode_ci NOT NULL,
  `request_data` longtext COLLATE utf8mb3_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `days`
--

DROP TABLE IF EXISTS `days`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `days` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `day_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `device_details`
--

DROP TABLE IF EXISTS `device_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `device_details` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `device_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1596095 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `distributor_details`
--

DROP TABLE IF EXISTS `distributor_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `distributor_details` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `company` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `hart_company` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `private_admin_note` text COLLATE utf8mb4_unicode_ci,
  `blacklist_status` int NOT NULL,
  `blacklist_notes` text COLLATE utf8mb4_unicode_ci,
  `avatar` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `referred_by` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `divisions`
--

DROP TABLE IF EXISTS `divisions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `divisions` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=427 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `educator_details`
--

DROP TABLE IF EXISTS `educator_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `educator_details` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `ssn` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `payroll_flag_id` int DEFAULT NULL,
  `educator_status_id` int DEFAULT NULL,
  `pay_rate` double DEFAULT NULL,
  `hair_color` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `eye_color` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `notification_type_id` int DEFAULT NULL,
  `private_admin_notes` text COLLATE utf8mb4_unicode_ci,
  `blacklist_status` int DEFAULT NULL,
  `blacklist_notes` text COLLATE utf8mb4_unicode_ci,
  `available_from` date DEFAULT NULL,
  `available_to` date DEFAULT NULL,
  `logo` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `facebook` varchar(256) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `instagram` varchar(256) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `twitter` varchar(256) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `logo_default` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `tattoos` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `referred_by` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `educator_have_car` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT 'no',
  `file_number` int DEFAULT NULL,
  `availability_type` varchar(151) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'open',
  `hire_date` date DEFAULT NULL,
  `send_sms` tinyint(1) NOT NULL DEFAULT '1',
  `send_schedule` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `idx_educator_details_user_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13294 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `educator_event_types`
--

DROP TABLE IF EXISTS `educator_event_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `educator_event_types` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `event_type` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7375 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `educator_ratings`
--

DROP TABLE IF EXISTS `educator_ratings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `educator_ratings` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `event_id` int NOT NULL,
  `educator_id` int NOT NULL,
  `event_educator_id` int NOT NULL,
  `rating` int NOT NULL DEFAULT '0',
  `comments` text COLLATE utf8mb4_unicode_ci,
  `speak_to_manager` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `event_id` (`event_id`),
  KEY `educator_id` (`educator_id`),
  KEY `event_educator_id_index` (`event_educator_id`)
) ENGINE=InnoDB AUTO_INCREMENT=15144 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `educator_schedules`
--

DROP TABLE IF EXISTS `educator_schedules`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `educator_schedules` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `available_date` date DEFAULT NULL,
  `available_from` time DEFAULT NULL,
  `available_to` time DEFAULT NULL,
  `open` tinyint(1) NOT NULL DEFAULT '0',
  `closed` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=577408 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `educator_status_logs`
--

DROP TABLE IF EXISTS `educator_status_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `educator_status_logs` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1585 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `educator_statuses`
--

DROP TABLE IF EXISTS `educator_statuses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `educator_statuses` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ethnic_groups`
--

DROP TABLE IF EXISTS `ethnic_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ethnic_groups` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `evaluation_demographics`
--

DROP TABLE IF EXISTS `evaluation_demographics`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `evaluation_demographics` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `evaluation_id` int NOT NULL,
  `type` enum('age','race') COLLATE utf8mb4_unicode_ci NOT NULL,
  `type_id` int NOT NULL,
  `percent` decimal(8,2) DEFAULT '0.00',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `evaluation_id` (`evaluation_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5779239 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `evaluation_products`
--

DROP TABLE IF EXISTS `evaluation_products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `evaluation_products` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `evaluation_id` int NOT NULL,
  `product_id` int NOT NULL,
  `product_size_id` int DEFAULT NULL,
  `bottles_available` int NOT NULL,
  `bottles_sold` int NOT NULL,
  `end_inventory` int NOT NULL DEFAULT '0',
  `future_purchase_intent` int DEFAULT NULL,
  `planned_to_purchase` text COLLATE utf8mb4_unicode_ci,
  `not_to_purchase_reason` text COLLATE utf8mb4_unicode_ci,
  `competitive_brands` text COLLATE utf8mb4_unicode_ci,
  `price` decimal(15,2) DEFAULT NULL,
  `featured_price` decimal(15,2) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `evaluation_id` (`evaluation_id`,`product_id`),
  KEY `product_id` (`product_id`),
  KEY `evaluation_id_2` (`evaluation_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2499742 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `evaluation_survey_input_options`
--

DROP TABLE IF EXISTS `evaluation_survey_input_options`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `evaluation_survey_input_options` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `question_id` bigint unsigned NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `order` int NOT NULL DEFAULT '0',
  `parent_id` int NOT NULL DEFAULT '0',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `evaluation_survey_input_options_question_id_foreign` (`question_id`),
  CONSTRAINT `evaluation_survey_input_options_question_id_foreign` FOREIGN KEY (`question_id`) REFERENCES `evaluation_survey_questions` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `evaluation_survey_questions`
--

DROP TABLE IF EXISTS `evaluation_survey_questions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `evaluation_survey_questions` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `premise_id` int unsigned NOT NULL,
  `supplier_id` int unsigned NOT NULL,
  `question` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `input_type` enum('text','textarea','number','dollar','radio','checkbox','select','multiselect','selectWithCategory','multiselectWithCategory','insertSelectWithCategory','insertMultiselectWithCategory','date','time','datetime','file','email','url','password') COLLATE utf8mb4_unicode_ci NOT NULL,
  `input_required` tinyint(1) NOT NULL DEFAULT '1',
  `input_min_length` int DEFAULT NULL,
  `input_max_length` int DEFAULT NULL,
  `input_default` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `input_placeholder` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `order` int DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `evaluation_survey_questions_premise_id_foreign` (`premise_id`),
  KEY `evaluation_survey_questions_supplier_id_foreign` (`supplier_id`),
  CONSTRAINT `evaluation_survey_questions_premise_id_foreign` FOREIGN KEY (`premise_id`) REFERENCES `premises` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `evaluation_survey_questions_supplier_id_foreign` FOREIGN KEY (`supplier_id`) REFERENCES `companies` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `evaluation_surveys`
--

DROP TABLE IF EXISTS `evaluation_surveys`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `evaluation_surveys` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `evaluation_id` int NOT NULL,
  `question_id` int NOT NULL,
  `question` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `answer` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `option_id` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `input_type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `done_by` int unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `evaluation_surveys_done_by_foreign` (`done_by`),
  CONSTRAINT `evaluation_surveys_done_by_foreign` FOREIGN KEY (`done_by`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=336977 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `evaluations`
--

DROP TABLE IF EXISTS `evaluations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `evaluations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `event_id` int NOT NULL,
  `educator_id` int NOT NULL,
  `status` tinyint NOT NULL DEFAULT '0' COMMENT '0 - pending, 1 - approved, 2 - rejected',
  `notes` text COLLATE utf8mb4_unicode_ci,
  `consumers_sampled` int DEFAULT NULL,
  `consumers_approached` int DEFAULT NULL,
  `consumer_brand_social_signups` int NOT NULL,
  `promotion_location` enum('front','back') COLLATE utf8mb4_unicode_ci NOT NULL,
  `other_location` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `general_market` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `weather` enum('sunny','cloudy','rain','warm','cold') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `weather1` enum('warm','cold','hot') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `door_traffic` enum('heavy','moderate','slow') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `account_size` int DEFAULT NULL,
  `educator_feedback` text COLLATE utf8mb4_unicode_ci,
  `consumer_feedback` text COLLATE utf8mb4_unicode_ci,
  `competitors` text COLLATE utf8mb4_unicode_ci,
  `competitors_pricing` text COLLATE utf8mb4_unicode_ci,
  `setup_location` text COLLATE utf8mb4_unicode_ci,
  `pos` text COLLATE utf8mb4_unicode_ci,
  `male_percent` decimal(8,2) NOT NULL DEFAULT '0.00',
  `female_percent` decimal(8,2) NOT NULL DEFAULT '0.00',
  `non_binary_percent` decimal(8,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `cocktail_featured` text COLLATE utf8mb4_unicode_ci,
  `approved_user` int DEFAULT NULL,
  `drink_menu` tinyint(1) NOT NULL DEFAULT '0',
  `back_bar` tinyint(1) NOT NULL DEFAULT '0',
  `feature_drink_price` decimal(8,2) NOT NULL DEFAULT '0.00',
  `is_complete` tinyint(1) NOT NULL DEFAULT '0',
  `is_primary` tinyint(1) NOT NULL DEFAULT '0',
  `source` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `rebate` tinyint(1) NOT NULL DEFAULT '0',
  `ibotta` tinyint(1) NOT NULL DEFAULT '0',
  `consumer_education` tinyint(1) NOT NULL DEFAULT '0',
  `bar_spend` tinyint(1) NOT NULL DEFAULT '0',
  `engraver_on_site` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `event_id` (`event_id`),
  KEY `educator_id` (`educator_id`),
  KEY `idx_evaluations_event_id` (`event_id`)
) ENGINE=InnoDB AUTO_INCREMENT=942980 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `event_billing`
--

DROP TABLE IF EXISTS `event_billing`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `event_billing` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `event_id` int unsigned NOT NULL,
  `event_hours` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `promo` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `bill_to_user` int DEFAULT NULL COMMENT 'bill to user id',
  `bill_to_user_type` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'bill to user type',
  `bill_to_contact` int DEFAULT NULL,
  `amt_per_educator` decimal(15,2) DEFAULT NULL COMMENT 'amount per educator',
  `event_amount` decimal(15,2) DEFAULT NULL,
  `max_amb_expense` decimal(15,2) DEFAULT NULL COMMENT 'maximum ambassador expense',
  `amb_expense` decimal(15,2) DEFAULT NULL COMMENT 'ambassador expense',
  `travel_amount` decimal(15,2) DEFAULT NULL COMMENT 'travel amount',
  `gratuity` decimal(15,2) DEFAULT NULL COMMENT 'ambassador expense',
  `other` decimal(15,2) DEFAULT NULL,
  `total_amount` decimal(15,2) DEFAULT NULL COMMENT 'total expense',
  `billing_company` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `billing_account` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `approve_billing` tinyint(1) NOT NULL DEFAULT '0' COMMENT 'Approve for Billing',
  `send_to_qb` int NOT NULL DEFAULT '0' COMMENT 'Sent to Quickbooks',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `pay_per_educator` decimal(8,2) DEFAULT '0.00' COMMENT 'pay per educator',
  `amb_expense_qb` decimal(8,2) NOT NULL DEFAULT '0.00',
  `finance_charge` decimal(15,2) DEFAULT NULL COMMENT 'finance charge',
  `data_entry_fee` decimal(15,2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `event_billing_event_id_foreign` (`event_id`),
  KEY `bill_to_user` (`bill_to_user`),
  KEY `bill_to_contact` (`bill_to_contact`)
) ENGINE=InnoDB AUTO_INCREMENT=561926 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `event_company_contacts`
--

DROP TABLE IF EXISTS `event_company_contacts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `event_company_contacts` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `event_id` int unsigned NOT NULL,
  `company_id` int unsigned NOT NULL,
  `company_type` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `contact_id` int unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `contact_id` (`contact_id`),
  KEY `event_id` (`event_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=14468 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `event_educators`
--

DROP TABLE IF EXISTS `event_educators`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `event_educators` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `event_id` int NOT NULL,
  `educator_id` int NOT NULL,
  `evaluation_id` int DEFAULT NULL,
  `survey_id` bigint DEFAULT NULL,
  `is_notified` tinyint(1) NOT NULL DEFAULT '0',
  `kit_ready_notified` tinyint(1) NOT NULL DEFAULT '0',
  `is_paid` tinyint(1) NOT NULL DEFAULT '0',
  `sent_qb` tinyint(1) NOT NULL DEFAULT '0',
  `paid_amount` float DEFAULT '0',
  `status` tinyint NOT NULL DEFAULT '0' COMMENT '0 - pending, 1 - approved, 2 - rejected',
  `status_updated_at` datetime DEFAULT NULL,
  `sent_reminder` tinyint(1) NOT NULL DEFAULT '0',
  `kit_pick_up` tinyint(1) NOT NULL DEFAULT '0',
  `notes` text COLLATE utf8mb4_unicode_ci,
  `email_token` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `check_in` datetime DEFAULT NULL,
  `check_out` datetime DEFAULT NULL,
  `check_in_notified` tinyint(1) NOT NULL DEFAULT '0',
  `check_out_notified` tinyint(1) NOT NULL DEFAULT '0',
  `educator_checked_in_notified` int NOT NULL DEFAULT '0',
  `final_reminder` tinyint(1) NOT NULL DEFAULT '0',
  `billing_company` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `source` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `check_in_text_notified` tinyint(1) NOT NULL DEFAULT '0',
  `check_out_text_notified` tinyint(1) NOT NULL DEFAULT '0',
  `checkin_token` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `checkout_token` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `rating_token` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `rating_notified` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `event_id_educator_id` (`event_id`,`educator_id`),
  KEY `event_id` (`event_id`),
  KEY `educator_id` (`educator_id`),
  KEY `evaluation_id` (`evaluation_id`),
  KEY `idx_event_educators_event_id` (`event_id`),
  KEY `idx_event_educators_educator_id` (`educator_id`)
) ENGINE=InnoDB AUTO_INCREMENT=800204 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `event_evaluation_image_metadata`
--

DROP TABLE IF EXISTS `event_evaluation_image_metadata`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `event_evaluation_image_metadata` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `event_evaluation_image_id` int unsigned NOT NULL,
  `latitude` decimal(10,8) DEFAULT NULL,
  `longitude` decimal(11,8) DEFAULT NULL,
  `location_processed` tinyint(1) NOT NULL DEFAULT '0',
  `processed_time` timestamp NULL DEFAULT NULL,
  `exif_data` json DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `event_evaluation_image_metadata_location_processed_index` (`location_processed`)
) ENGINE=InnoDB AUTO_INCREMENT=160731 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `event_evaluation_images`
--

DROP TABLE IF EXISTS `event_evaluation_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `event_evaluation_images` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `event_id` int NOT NULL,
  `evaluation_id` int NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '0',
  `type` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `image_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `evaluation_id` (`evaluation_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2996847 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `event_evaluation_videos`
--

DROP TABLE IF EXISTS `event_evaluation_videos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `event_evaluation_videos` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `event_id` int NOT NULL,
  `evaluation_id` int NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `video` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `thumbnail` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '0',
  `type` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5325 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `event_invoice_items`
--

DROP TABLE IF EXISTS `event_invoice_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `event_invoice_items` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `invoice_id` int DEFAULT NULL,
  `event_id` int DEFAULT NULL,
  `event_amount` decimal(15,2) DEFAULT NULL,
  `amb_expense` decimal(15,2) DEFAULT NULL COMMENT 'ambassador expense',
  `finance_charge` decimal(15,2) DEFAULT NULL,
  `travel_amount` decimal(15,2) DEFAULT NULL COMMENT 'travel amount',
  `gratuity` decimal(15,2) DEFAULT NULL COMMENT 'ambassador expense',
  `data_entry_fee` decimal(15,2) DEFAULT NULL,
  `other` decimal(15,2) DEFAULT NULL,
  `total_amount` decimal(15,2) DEFAULT NULL COMMENT 'total expense',
  `product_id` int DEFAULT NULL,
  `product_name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `no_of_educators` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `invoice_id` (`invoice_id`),
  KEY `event_id` (`event_id`)
) ENGINE=InnoDB AUTO_INCREMENT=845018 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `event_invoices`
--

DROP TABLE IF EXISTS `event_invoices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `event_invoices` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `bill_to_id` int DEFAULT NULL,
  `bill_to_contact_id` int DEFAULT NULL,
  `company` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address1` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address2` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `city` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `state` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `zip` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `invoice_amount` decimal(15,2) DEFAULT NULL,
  `billing_promo` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `billing_company` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `billing_account` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `batch_id` int DEFAULT NULL,
  `invoice_id` varchar(55) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `transaction_id` int DEFAULT NULL,
  `transaction_date` date DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `bill_to_id` (`bill_to_id`),
  KEY `bill_to_contact_id` (`bill_to_contact_id`),
  KEY `billing_promo` (`billing_promo`),
  KEY `billing_company` (`billing_company`),
  KEY `billing_account` (`billing_account`),
  KEY `batch_id` (`batch_id`)
) ENGINE=InnoDB AUTO_INCREMENT=403354 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `event_products`
--

DROP TABLE IF EXISTS `event_products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `event_products` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `event_id` int unsigned NOT NULL,
  `product_id` int unsigned NOT NULL,
  `sample_bottles` int NOT NULL DEFAULT '0',
  `kit_issued` tinyint(1) NOT NULL DEFAULT '0',
  `out_of_stock` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `event_id` (`event_id`),
  KEY `product_id` (`product_id`),
  KEY `event_id_product_id` (`event_id`,`product_id`),
  KEY `idx_event_products_event_id` (`event_id`),
  KEY `idx_event_products_product_id` (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1429343 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `event_reports`
--

DROP TABLE IF EXISTS `event_reports`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `event_reports` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `code` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `data` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19968 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `event_statuses`
--

DROP TABLE IF EXISTS `event_statuses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `event_statuses` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `event_types`
--

DROP TABLE IF EXISTS `event_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `event_types` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `event_type_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `events`
--

DROP TABLE IF EXISTS `events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `events` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `event_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `event_status_id` int DEFAULT NULL,
  `premise_id` int NOT NULL,
  `grand_or_large` tinyint(1) NOT NULL DEFAULT '0',
  `wet_dry` enum('W','D') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `date` date NOT NULL,
  `parent_event_date` date DEFAULT NULL,
  `time_from` time NOT NULL,
  `time_to` time NOT NULL,
  `approve_event` tinyint(1) NOT NULL DEFAULT '0',
  `special_event` tinyint(1) NOT NULL DEFAULT '0',
  `calcelled_event` tinyint(1) NOT NULL DEFAULT '0',
  `engraving_event` tinyint(1) NOT NULL DEFAULT '0',
  `event_type_id` int DEFAULT NULL,
  `note_to_educators` text COLLATE utf8mb4_unicode_ci,
  `educator_id` int NOT NULL,
  `distributor_id` int NOT NULL,
  `distributor_contact` int DEFAULT NULL,
  `distributor_contact_division` int DEFAULT NULL,
  `supplier_id` int NOT NULL,
  `supplier_contact` int DEFAULT NULL,
  `supplier_contact_division` int DEFAULT NULL,
  `reconciled` tinyint(1) NOT NULL DEFAULT '0',
  `account_id` int DEFAULT NULL,
  `account_contact` int DEFAULT NULL,
  `local_contact` int DEFAULT NULL,
  `region` int DEFAULT NULL,
  `territory` int DEFAULT NULL,
  `program_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `kit_pick_up` tinyint(1) NOT NULL DEFAULT '0' COMMENT 'Kit Ready Status by Manager',
  `order_samples` tinyint(1) NOT NULL DEFAULT '0',
  `supplier_entered` tinyint(1) NOT NULL DEFAULT '0',
  `recapped` tinyint(1) NOT NULL DEFAULT '0',
  `created_by_id` int DEFAULT NULL,
  `deleted_by_id` int DEFAULT NULL,
  `educator_count` int NOT NULL DEFAULT '0',
  `ms_id` int NOT NULL DEFAULT '0',
  `linked_event_id` bigint unsigned DEFAULT NULL,
  `sla_approve` tinyint(1) NOT NULL DEFAULT '0',
  `show_in_evaluation` tinyint(1) NOT NULL DEFAULT '1',
  `contact_division` int DEFAULT NULL,
  `manager_booking_detail` text COLLATE utf8mb4_unicode_ci,
  `out_of_stock` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `distributor_id` (`distributor_id`),
  KEY `supplier_id` (`supplier_id`),
  KEY `account_id` (`account_id`),
  KEY `time_from` (`time_from`),
  KEY `date` (`date`),
  KEY `idx_events_id` (`id`),
  KEY `idx_events_account_id` (`account_id`)
) ENGINE=InnoDB AUTO_INCREMENT=581299 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `hide_events_from_evaluations`
--

DROP TABLE IF EXISTS `hide_events_from_evaluations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hide_events_from_evaluations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `event_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=186 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `histories`
--

DROP TABLE IF EXISTS `histories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `histories` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `module_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `module_id` int NOT NULL,
  `relation_id` int DEFAULT NULL,
  `description` longtext COLLATE utf8mb4_unicode_ci,
  `created_by` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `module_id` (`module_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3601687 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `history_types`
--

DROP TABLE IF EXISTS `history_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `history_types` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `type_name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `slug` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `item_master_mappings`
--

DROP TABLE IF EXISTS `item_master_mappings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `item_master_mappings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `raw_item_name` varchar(255) DEFAULT NULL,
  `master_item_id` int NOT NULL,
  `confidence_score` decimal(5,4) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `job_roles`
--

DROP TABLE IF EXISTS `job_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `job_roles` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_multiple` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `knowledge_tags`
--

DROP TABLE IF EXISTS `knowledge_tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `knowledge_tags` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `tag` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_by` int DEFAULT NULL,
  `modified_by` int DEFAULT NULL,
  `revised_by` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `languages`
--

DROP TABLE IF EXISTS `languages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `languages` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=209 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `model_has_permissions`
--

DROP TABLE IF EXISTS `model_has_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `model_has_permissions` (
  `permission_id` int unsigned NOT NULL,
  `model_id` int unsigned NOT NULL,
  `model_type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`permission_id`,`model_id`,`model_type`),
  KEY `model_has_permissions_model_id_model_type_index` (`model_id`,`model_type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `model_has_roles`
--

DROP TABLE IF EXISTS `model_has_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `model_has_roles` (
  `role_id` int unsigned NOT NULL,
  `model_id` int unsigned NOT NULL,
  `model_type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`role_id`,`model_id`,`model_type`),
  KEY `model_has_roles_model_id_model_type_index` (`model_id`,`model_type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `notes`
--

DROP TABLE IF EXISTS `notes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notes` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `created_user_id` int NOT NULL,
  `subject` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `type` enum('user','company') COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=37674 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `notification_types`
--

DROP TABLE IF EXISTS `notification_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notification_types` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `type_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `password_resets`
--

DROP TABLE IF EXISTS `password_resets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `password_resets` (
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  KEY `password_resets_email_index` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `payroll_flags`
--

DROP TABLE IF EXISTS `payroll_flags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payroll_flags` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `flag_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `permissions`
--

DROP TABLE IF EXISTS `permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `permissions` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `guard_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `reorder` int NOT NULL DEFAULT '99',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `premises`
--

DROP TABLE IF EXISTS `premises`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `premises` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `slug` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `display_order` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `product_available_sizes`
--

DROP TABLE IF EXISTS `product_available_sizes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_available_sizes` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `product_id` int NOT NULL,
  `product_size_id` int NOT NULL,
  `quantity` int NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `product_docs`
--

DROP TABLE IF EXISTS `product_docs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_docs` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `product_id` int NOT NULL,
  `file_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `file_default` tinyint(1) NOT NULL DEFAULT '0',
  `original_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `file_type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6286 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `product_sizes`
--

DROP TABLE IF EXISTS `product_sizes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_sizes` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `size` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `modified_by` int DEFAULT NULL,
  `revised_by` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `product_types`
--

DROP TABLE IF EXISTS `product_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_types` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_by` int DEFAULT NULL,
  `modified_by` int DEFAULT NULL,
  `revised_by` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `parent` int NOT NULL DEFAULT '0',
  `status` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `product_videos`
--

DROP TABLE IF EXISTS `product_videos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_videos` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `product_id` int DEFAULT NULL,
  `video_url` text COLLATE utf8mb4_unicode_ci,
  `video_id` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image_default` tinyint(1) DEFAULT '0',
  `type` int DEFAULT NULL,
  `sub_type` int DEFAULT NULL,
  `sku` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `distributor_id` int NOT NULL,
  `supplier_id` int NOT NULL,
  `summary` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `inventory` int NOT NULL DEFAULT '25',
  `website` varchar(190) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `name` (`name`),
  KEY `type` (`type`),
  KEY `sub_type` (`sub_type`),
  KEY `idx_products_id` (`id`),
  FULLTEXT KEY `name_2` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=20482 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `programs`
--

DROP TABLE IF EXISTS `programs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `programs` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=310 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `promo_codes`
--

DROP TABLE IF EXISTS `promo_codes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `promo_codes` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `promo_code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` int DEFAULT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18673 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `quickbook_batches`
--

DROP TABLE IF EXISTS `quickbook_batches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `quickbook_batches` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `batch_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '0',
  `batch_info` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `approved_by` int DEFAULT NULL,
  `approved_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=35786 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `quickbook_options`
--

DROP TABLE IF EXISTS `quickbook_options`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `quickbook_options` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `option_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `regional_managers`
--

DROP TABLE IF EXISTS `regional_managers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `regional_managers` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `region_id` int NOT NULL,
  `job_role_id` int NOT NULL,
  `manager_id` int NOT NULL,
  `primary` tinyint(1) NOT NULL DEFAULT '0',
  `type` enum('region','territory') COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11916 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `regions`
--

DROP TABLE IF EXISTS `regions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `regions` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `state_id` int DEFAULT NULL,
  `territory_id` int DEFAULT NULL,
  `region_abbrev` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `region_name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `role_has_permissions`
--

DROP TABLE IF EXISTS `role_has_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role_has_permissions` (
  `permission_id` int unsigned NOT NULL,
  `role_id` int unsigned NOT NULL,
  PRIMARY KEY (`permission_id`,`role_id`),
  KEY `role_has_permissions_role_id_foreign` (`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `search_views`
--

DROP TABLE IF EXISTS `search_views`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `search_views` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `search_query` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_by` int DEFAULT NULL,
  `modified_by` int DEFAULT NULL,
  `revised_by` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=49168 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `site_options`
--

DROP TABLE IF EXISTS `site_options`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `site_options` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `option_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `sms_logs`
--

DROP TABLE IF EXISTS `sms_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sms_logs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `educator_id` int NOT NULL,
  `message_id` varchar(255) NOT NULL,
  `message_type` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=771595 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `states`
--

DROP TABLE IF EXISTS `states`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `states` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `state_code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `state_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=63 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `supplier_details`
--

DROP TABLE IF EXISTS `supplier_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `supplier_details` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `company` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `private_admin_note` text COLLATE utf8mb4_unicode_ci,
  `blacklist_status` int DEFAULT NULL,
  `blacklist_notes` text COLLATE utf8mb4_unicode_ci,
  `logo` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `referred_by` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `survey_image_metadata`
--

DROP TABLE IF EXISTS `survey_image_metadata`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `survey_image_metadata` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `survey_image_id` bigint unsigned NOT NULL,
  `latitude` decimal(10,8) DEFAULT NULL,
  `longitude` decimal(11,8) DEFAULT NULL,
  `location_processed` tinyint(1) NOT NULL DEFAULT '0',
  `processed_time` timestamp NULL DEFAULT NULL,
  `exif_data` json DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `survey_image_metadata_survey_image_id_index` (`survey_image_id`),
  KEY `survey_image_metadata_location_processed_index` (`location_processed`)
) ENGINE=InnoDB AUTO_INCREMENT=2938 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `survey_images`
--

DROP TABLE IF EXISTS `survey_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `survey_images` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `event_id` int unsigned NOT NULL,
  `survey_id` bigint unsigned NOT NULL,
  `image` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2938 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `surveys`
--

DROP TABLE IF EXISTS `surveys`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `surveys` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `event_id` int unsigned NOT NULL,
  `educator_id` int unsigned NOT NULL,
  `status` tinyint NOT NULL DEFAULT '0' COMMENT '0 - pending, 1 - approved, 2 - rejected',
  `notes` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `beer_sold` tinyint(1) DEFAULT NULL COMMENT 'Is Beer being sold in the account?',
  `draught_sold` tinyint(1) DEFAULT NULL COMMENT 'Is Draught sold in the account?',
  `more_than_5_draught_lines` tinyint(1) DEFAULT NULL COMMENT 'Are there More than 5 Draught Lines?',
  `draught_brands` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci COMMENT 'What brands are on Draught?',
  `package_sold` tinyint(1) DEFAULT NULL COMMENT 'Is Package sold in the account (cans & bottles or beer/RTDs)?',
  `package_focus` json DEFAULT NULL COMMENT 'Is the account import/craft/domestic beer focused? (Import, Craft, Domestic)',
  `package_beer_brands` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci COMMENT 'What package beer brands are sold in the account?',
  `rtd_sold` tinyint(1) DEFAULT NULL COMMENT 'Are RTDs (canned cocktails, seltzers, hard teas etc.) sold in the account?',
  `rtd_brands` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci COMMENT 'What RTD brands are sold in the account?',
  `is_complete` tinyint(1) NOT NULL DEFAULT '0',
  `is_primary` tinyint(1) NOT NULL DEFAULT '0',
  `approved_user` int unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `draught_brand_selections` json DEFAULT NULL COMMENT 'Selected draught brands from predefined list',
  `draught_brand_other` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci COMMENT 'Other draught brand text input',
  `package_brand_selections` json DEFAULT NULL COMMENT 'Selected package beer brands from predefined list',
  `package_brand_other` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci COMMENT 'Other package beer brand text input',
  `rtd_brand_selections` json DEFAULT NULL COMMENT 'Selected RTD brands from predefined list',
  `rtd_brand_other` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci COMMENT 'Other RTD brand text input',
  PRIMARY KEY (`id`),
  KEY `surveys_event_id_foreign` (`event_id`),
  KEY `surveys_educator_id_foreign` (`educator_id`),
  KEY `surveys_approved_user_foreign` (`approved_user`),
  CONSTRAINT `surveys_approved_user_foreign` FOREIGN KEY (`approved_user`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `surveys_educator_id_foreign` FOREIGN KEY (`educator_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `surveys_event_id_foreign` FOREIGN KEY (`event_id`) REFERENCES `events` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=635 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `sync_tracker`
--

DROP TABLE IF EXISTS `sync_tracker`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sync_tracker` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `table_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_synced_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `sync_tracker_table_name_unique` (`table_name`)
) ENGINE=InnoDB AUTO_INCREMENT=95 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `territories`
--

DROP TABLE IF EXISTS `territories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `territories` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `territory_abbrev` text COLLATE utf8mb4_unicode_ci,
  `territory_name` text COLLATE utf8mb4_unicode_ci,
  `region_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `titles`
--

DROP TABLE IF EXISTS `titles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `titles` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_addresses`
--

DROP TABLE IF EXISTS `user_addresses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_addresses` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `street` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `street_2` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `city_id` int DEFAULT NULL,
  `region_id` int DEFAULT NULL,
  `zip` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `state_id` int DEFAULT NULL,
  `territories_id` int DEFAULT NULL,
  `latitude` decimal(9,6) DEFAULT NULL,
  `longitude` decimal(9,6) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17025 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_permissions`
--

DROP TABLE IF EXISTS `user_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_permissions` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `permission_add` int DEFAULT NULL,
  `permission_edit` int DEFAULT NULL,
  `permission_delete` int DEFAULT NULL,
  `create_user` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_types`
--

DROP TABLE IF EXISTS `user_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_types` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `guard_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_admin` tinyint NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `title_id` int DEFAULT NULL,
  `first_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `gender` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `date_of_birth` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email_hash` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `website` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fax` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cell_phone` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email_token` text COLLATE utf8mb4_unicode_ci,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_type_id` int NOT NULL,
  `contact_type_id` int DEFAULT NULL,
  `status` tinyint(1) NOT NULL,
  `user_address_id` int DEFAULT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deactivated_at` date DEFAULT NULL,
  `rehire_date` date DEFAULT NULL,
  `first_name_2` text COLLATE utf8mb4_unicode_ci,
  `last_name_2` text COLLATE utf8mb4_unicode_ci,
  `date_of_birth_2` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_users_id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18057 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `users_knowledge_tags`
--

DROP TABLE IF EXISTS `users_knowledge_tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users_knowledge_tags` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `knowledge_tag_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4303 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `users_languages`
--

DROP TABLE IF EXISTS `users_languages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users_languages` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `language_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=460 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping routines for database 'crossbox'
--
--
-- WARNING: can't read the INFORMATION_SCHEMA.libraries table. It's most probably an old server 8.4.6.
--

--
-- Final view structure for view `Account_Update`
--

/*!50001 DROP VIEW IF EXISTS `Account_Update`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`crossbox_user`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `Account_Update` AS select coalesce(`O`.`Account Number`,`N`.`Acct_Number`) AS `Account_ID`,max((case when (`O`.`Customer Business Name` <> `N`.`Customer_Business_Name`) then `O`.`Customer Business Name` else NULL end)) AS `Old_Customer_Business_Name`,max((case when (`O`.`Customer Business Name` <> `N`.`Customer_Business_Name`) then `N`.`Customer_Business_Name` else NULL end)) AS `New_Customer_Business_Name`,max((case when (`O`.`Ship to Address Line 1` <> `N`.`Ship_to_Address_Line_1`) then `O`.`Ship to Address Line 1` else NULL end)) AS `Old_Ship_to_Address_Line_1`,max((case when (`O`.`Ship to Address Line 1` <> `N`.`Ship_to_Address_Line_1`) then `N`.`Ship_to_Address_Line_1` else NULL end)) AS `New_Ship_to_Address_Line_1`,max((case when (`O`.`Ship to Address Line 2` <> `N`.`Ship_to_Address_Line_2`) then `O`.`Ship to Address Line 2` else NULL end)) AS `Old_Ship_to_Address_Line_2`,max((case when (`O`.`Ship to Address Line 2` <> `N`.`Ship_to_Address_Line_2`) then `N`.`Ship_to_Address_Line_2` else NULL end)) AS `New_Ship_to_Address_Line_2`,max((case when (`O`.`Ship To City` <> `N`.`Ship_To_City`) then `O`.`Ship To City` else NULL end)) AS `Old_Ship_To_City`,max((case when (`O`.`Ship To City` <> `N`.`Ship_To_City`) then `N`.`Ship_To_City` else NULL end)) AS `New_Ship_To_City`,max((case when (`O`.`ST Ste` <> `N`.`ST_Ste`) then `O`.`ST Ste` else NULL end)) AS `Old_ST_Ste`,max((case when (`O`.`ST Ste` <> `N`.`ST_Ste`) then `N`.`ST_Ste` else NULL end)) AS `New_ST_Ste`,max((case when (cast(`O`.`Zip Code` as char charset utf8mb4) <> convert(`N`.`Zip_Code` using utf8mb4)) then cast(`O`.`Zip Code` as char charset utf8mb4) else NULL end)) AS `Old_Zip_Code`,max((case when (cast(`O`.`Zip Code` as char charset utf8mb4) <> convert(`N`.`Zip_Code` using utf8mb4)) then convert(`N`.`Zip_Code` using utf8mb4) else NULL end)) AS `New_Zip_Code`,max((case when (`O`.`Name Of County` <> `N`.`Name_Of_County`) then `O`.`Name Of County` else NULL end)) AS `Old_Name_Of_County`,max((case when (`O`.`Name Of County` <> `N`.`Name_Of_County`) then `N`.`Name_Of_County` else NULL end)) AS `New_Name_Of_County`,max((case when (cast(`O`.`State License #` as char charset utf8mb4) <> convert(`N`.`State_License_Number` using utf8mb4)) then cast(`O`.`State License #` as char charset utf8mb4) else NULL end)) AS `Old_State_License_Number`,max((case when (cast(`O`.`State License #` as char charset utf8mb4) <> convert(`N`.`State_License_Number` using utf8mb4)) then convert(`N`.`State_License_Number` using utf8mb4) else NULL end)) AS `New_State_License_Number` from (`Combined_Account_Data` `O` left join `SGWS_Accounts` `N` on((`O`.`Account Number` = `N`.`Acct_Number`))) where ((`O`.`Account Number` is null) or (`O`.`Customer Business Name` <> `N`.`Customer_Business_Name`) or (`O`.`Ship to Address Line 1` <> `N`.`Ship_to_Address_Line_1`) or (`O`.`Ship to Address Line 2` <> `N`.`Ship_to_Address_Line_2`) or (`O`.`Ship To City` <> `N`.`Ship_To_City`) or (`O`.`ST Ste` <> `N`.`ST_Ste`) or (cast(`O`.`Zip Code` as char charset utf8mb4) <> convert(`N`.`Zip_Code` using utf8mb4)) or (`O`.`Name Of County` <> `N`.`Name_Of_County`) or (cast(`O`.`State License #` as char charset utf8mb4) <> convert(`N`.`State_License_Number` using utf8mb4))) group by coalesce(`O`.`Account Number`,`N`.`Acct_Number`) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `Combined_Account_Data`
--

/*!50001 DROP VIEW IF EXISTS `Combined_Account_Data`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`crossbox_user`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `Combined_Account_Data` AS select `NYACS119F1_M`.`Account Number` AS `Account Number`,`NYACS119F1_M`.`Customer Business Name` AS `Customer Business Name`,`NYACS119F1_M`.`Ship to Address Line 1` AS `Ship to Address Line 1`,`NYACS119F1_M`.`Ship to Address Line 2` AS `Ship to Address Line 2`,`NYACS119F1_M`.`Ship To City` AS `Ship To City`,`NYACS119F1_M`.`ST Ste` AS `ST Ste`,`NYACS119F1_M`.`Zip Code` AS `Zip Code`,`NYACS119F1_M`.`Name Of County` AS `Name Of County`,`NYACS119F1_M`.`State License #` AS `State License #` from `NYACS119F1_M` union select `NYACS119F1_U`.`ï»¿Acct Number` AS `ï»¿Acct Number`,`NYACS119F1_U`.`Customer Business Name` AS `Customer Business Name`,`NYACS119F1_U`.`Ship to Address Line 1` AS `Ship to Address Line 1`,`NYACS119F1_U`.`Ship to Address Line 2` AS `Ship to Address Line 2`,`NYACS119F1_U`.`Ship To City` AS `Ship To City`,`NYACS119F1_U`.`ST Ste` AS `ST Ste`,`NYACS119F1_U`.`Zip Code` AS `Zip Code`,`NYACS119F1_U`.`Name Of County` AS `Name Of County`,`NYACS119F1_U`.`State License #` AS `State License #` from `NYACS119F1_U` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `SLA_Data`
--

/*!50001 DROP VIEW IF EXISTS `SLA_Data`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`crossbox_user`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `SLA_Data` AS select `e`.`event_name` AS `Event Name`,`e`.`parent_event_date` AS `Date of Event`,`e`.`time_from` AS `Time of Event`,`e`.`time_to` AS `Event End`,round(if(((timestampdiff(SECOND,`e`.`time_from`,`e`.`time_to`) / 60) >= 0),(timestampdiff(SECOND,`e`.`time_from`,`e`.`time_to`) / 60),(time_to_sec(addtime(addtime(timediff('23:59:59',`e`.`time_from`),'00:00:01'),`e`.`time_to`)) / 60)),0) AS `Duration (Minutes)`,concat(`u`.`first_name`,' ',`u`.`last_name`) AS `Educator`,(select group_concat(distinct `p`.`name` order by `p`.`name` ASC separator ', ') from (`event_products` `ep` left join `products` `p` on((`ep`.`product_id` = `p`.`id`))) where (`ep`.`event_id` = `e`.`id`)) AS `Brands Offered`,`ev`.`feature_drink_price` AS `Price Per Drink`,`eb`.`amb_expense` AS `Total (Cannot Exceed $700)`,`c`.`company` AS `Company`,`c`.`liquor_license` AS `License Number`,concat(`cad`.`street`,', ',`ct`.`city_name`,', ',`st`.`state_name`,', ',`cad`.`zip`) AS `Address`,`r`.`region_name` AS `Region`,`ep`.`bottles_sold` AS `Drinks Purchased` from ((((((((((((`events` `e` left join `event_billing` `eb` on((`e`.`id` = `eb`.`event_id`))) left join `event_educators` `ee` on((`e`.`id` = `ee`.`event_id`))) left join `educator_details` `ed` on((`ee`.`educator_id` = `ed`.`user_id`))) left join `users` `u` on((`ed`.`user_id` = `u`.`id`))) left join `evaluations` `ev` on((`e`.`id` = `ev`.`event_id`))) left join `evaluation_products` `ep` on((`ev`.`id` = `ep`.`evaluation_id`))) left join `companies` `c` on((`e`.`account_id` = `c`.`id`))) left join `SGWS_Accounts` `s` on((`c`.`southern_id` = `s`.`Acct_Number`))) left join `company_addresses` `cad` on((`c`.`company_address_id` = `cad`.`id`))) left join `cities` `ct` on((`cad`.`city_id` = `ct`.`id`))) left join `states` `st` on((`cad`.`state_id` = `st`.`id`))) left join `regions` `r` on((`e`.`region` = `r`.`id`))) where ((`e`.`distributor_id` = 93) and ((`e`.`premise_id` = 8) or (`e`.`premise_id` = 13)) and (`e`.`deleted_at` is null)) group by `e`.`parent_event_date`,`e`.`time_from`,`e`.`time_to`,`ev`.`feature_drink_price`,`ev`.`bar_spend`,concat(`u`.`first_name`,' ',`u`.`last_name`),`c`.`company`,`c`.`liquor_license`,concat(`cad`.`street`,', ',`ct`.`city_name`,', ',`st`.`state_name`,', ',`cad`.`zip`) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-03-17 18:57:32
