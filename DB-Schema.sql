SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";
CREATE DATABASE IF NOT EXISTS `API_Messages` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `API_Messages`;

CREATE TABLE `conversations` (
  `conversationID` varchar(200) CHARACTER SET utf8 NOT NULL,
  `name` varchar(50) CHARACTER SET utf8 NOT NULL,
  `profilePicture` longtext CHARACTER SET utf8 NOT NULL,
  `lastActivity` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `conversation_msg` (
  `messageID` varchar(200) CHARACTER SET utf8 NOT NULL,
  `conversationID` varchar(200) CHARACTER SET utf8 NOT NULL,
  `userID` varchar(200) CHARACTER SET utf8 NOT NULL,
  `message` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` int(1) NOT NULL DEFAULT '1' COMMENT '1 = text | 2 = image',
  `object` longtext CHARACTER SET utf8 NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `conversation_users` (
  `conversationID` varchar(200) CHARACTER SET utf8 NOT NULL,
  `userID` varchar(200) CHARACTER SET utf8 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `sessions` (
  `sessionID` varchar(200) CHARACTER SET utf8 NOT NULL,
  `userID` varchar(200) CHARACTER SET utf8 NOT NULL,
  `authCode` varchar(8) CHARACTER SET utf8 NOT NULL,
  `LastAccess` timestamp NULL DEFAULT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `users` (
  `userID` varchar(200) CHARACTER SET utf8 NOT NULL,
  `countryID` int(4) NOT NULL,
  `phoneNumber` varchar(60) CHARACTER SET utf8 NOT NULL,
  `name` varchar(40) CHARACTER SET utf8 NOT NULL,
  `username` varchar(10) CHARACTER SET utf8 NOT NULL,
  `profilePicture` longtext CHARACTER SET utf8 NOT NULL,
  `status` varchar(120) CHARACTER SET utf8 NOT NULL,
  `publicKey` varchar(3300) CHARACTER SET utf8 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


ALTER TABLE `conversations`
  ADD PRIMARY KEY (`conversationID`),
  ADD KEY `userID` (`name`);

ALTER TABLE `conversation_msg`
  ADD PRIMARY KEY (`messageID`),
  ADD KEY `conversationID` (`conversationID`,`userID`),
  ADD KEY `userID` (`userID`);

ALTER TABLE `conversation_users`
  ADD KEY `conversationID` (`conversationID`,`userID`),
  ADD KEY `userID` (`userID`);

ALTER TABLE `sessions`
  ADD PRIMARY KEY (`sessionID`),
  ADD KEY `userID` (`userID`);

ALTER TABLE `users`
  ADD PRIMARY KEY (`userID`);


ALTER TABLE `conversation_msg`
  ADD CONSTRAINT `conversation_msg_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `users` (`userID`),
  ADD CONSTRAINT `conversation_msg_ibfk_2` FOREIGN KEY (`conversationID`) REFERENCES `conversations` (`conversationID`);

ALTER TABLE `conversation_users`
  ADD CONSTRAINT `conversation_users_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `users` (`userID`),
  ADD CONSTRAINT `conversation_users_ibfk_2` FOREIGN KEY (`conversationID`) REFERENCES `conversations` (`conversationID`);

ALTER TABLE `sessions`
  ADD CONSTRAINT `sessions_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `users` (`userID`);
