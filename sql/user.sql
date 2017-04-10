/*
Navicat MySQL Data Transfer

Source Server         : mydatabase
Source Server Version : 50714
Source Host           : 127.0.0.1:3306
Source Database       : todolist

Target Server Type    : MYSQL
Target Server Version : 50714
File Encoding         : 65001

Date: 2017-04-10 11:33:57
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '用户的id',
  `user_name` varchar(50) DEFAULT NULL COMMENT '用户的名字',
  `password` varchar(32) DEFAULT NULL COMMENT '用户的密码',
  `email` varchar(30) DEFAULT NULL COMMENT '用户邮箱',
  `isvalidate` int(1) DEFAULT NULL COMMENT '是否验证',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8;
