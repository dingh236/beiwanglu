// pages/api/index.js
export default function handler(req, res) {
    // 处理 OPTIONS 请求
    if (req.method === 'OPTIONS') {
      res.status(200).end()
      return
    }
  
    const { action } = req.method === 'GET' ? req.query : req.body
  
    switch (action) {
      case 'getTodos':
        // 返回待办事项列表
        return res.json({ todos: [/* 你的数据 */] })
      
      case 'addTodo':
        const { content } = req.body
        // 添加待办事项
        return res.json({ success: true })
      
      case 'updateTodo':
        const { id, ...updateData } = req.body
        // 更新待办事项
        return res.json({ success: true })
      
      default:
        return res.status(400).json({ error: 'Invalid action' })
    }
  }