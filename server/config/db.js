const Sequelize = require('sequelize'); // ����sequelize

// ʹ��url���ӵ���ʽ�������ӣ�ע�⽫root: �����XXXX�ĳ��Լ����ݿ������
const Todolist = new Sequelize('mysql://root:root@127.0.0.1/todolist',{
  define: {
    timestamps: false // ȡ��Sequelzie�Զ������ݱ����ʱ�����createdAt�Լ�updatedAt��
  }
}) 

module.exports = {
  Todolist // ��Todolist��¶���ӿڷ���Model����
}