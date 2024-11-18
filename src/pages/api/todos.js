// 在 Next.js 中创建 API 路由
// pages/api/todos.js
export default function handler(req, res) {
    res.json({
      todos: [
        {
          title: '产品设计会议纪要',
          content: [
            '讨论用户反馈: 界面响应好，功能入口需优化',
            '规划新版本: 改进数据分析，流程批量处理',
            '时间节点: 下月初发布',
            '重点关注性能优化'
          ],
          time: '2024-11-07 14:30'
        }
      ]
    })
  }