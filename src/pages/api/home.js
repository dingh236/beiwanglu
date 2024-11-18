// pages/api/home.js
export default function handler(req, res) {
    const data = {
      weather: {
        temperature: 24,
        condition: 'sunny'
      },
      memo: {
        id: 1,
        title: "产品设计会议纪要",
        content: "今天的产品设计会议讨论了多个重要议题：首先是用户反馈分析...",
        time: "11月07日 14:30",
        aiSummary: [
          "讨论用户反馈：界面响应好，功能入口需优化",
          "规划新版本：改进数据分析，添加批量处理",
          "时间节点：下月初发布",
          "重点关注性能优化"
        ],
        tags: ["工作", "会议"]
      }
    }
    
    res.status(200).json(data)
  }