/*
Navicat MySQL Data Transfer

Source Server         : mydatabase
Source Server Version : 50715
Source Host           : 127.0.0.1:3306
Source Database       : todolist

Target Server Type    : MYSQL
Target Server Version : 50715
File Encoding         : 65001

Date: 2018-09-11 22:40:12
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `list`
-- ----------------------------
DROP TABLE IF EXISTS `list`;
CREATE TABLE `list` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL COMMENT '用户的id',
  `content` varchar(500) DEFAULT NULL COMMENT 'list的内容',
  `status` tinyint(1) DEFAULT NULL COMMENT 'list的状态',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of list
-- ----------------------------
INSERT INTO `list` VALUES ('1', '34', '12345', '0');

-- ----------------------------
-- Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '用户的id',
  `user_name` varchar(50) DEFAULT NULL COMMENT '用户的名字',
  `password` varchar(64) DEFAULT NULL COMMENT '用户的密码',
  `email` varchar(30) DEFAULT 'null' COMMENT '用户邮箱',
  `isvalidate` int(1) DEFAULT NULL COMMENT '是否验证',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('34', 'aizhiheng', '202cb962ac59075b964b07152d234b70', '1712560167@qq.com', '1');
