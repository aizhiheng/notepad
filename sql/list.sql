/*
Navicat MySQL Data Transfer

Source Server         : mydatabase
Source Server Version : 50714
Source Host           : 127.0.0.1:3306
Source Database       : todolist

Target Server Type    : MYSQL
Target Server Version : 50714
File Encoding         : 65001

Date: 2017-04-10 11:33:49
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for list
-- ----------------------------
DROP TABLE IF EXISTS `list`;
CREATE TABLE `list` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL COMMENT '用户的id',
  `content` varchar(500) DEFAULT NULL COMMENT 'list的内容',
  `status` tinyint(1) DEFAULT NULL COMMENT 'list的状态',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
