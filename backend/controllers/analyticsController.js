import { getMentorDashboardData, getMenteeDashboardData } from "../services/analyticsService.js";

export const getMentorDashboard = async (req, res) => {
  try {
    const data = await getMentorDashboardData(req.user.userId);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getMenteeDashboard = async (req, res) => {
    try {
      const data = await getMenteeDashboardData(req.user.userId);
      res.status(200).json(data);
    } catch (err) {
      console.log(err)
      res.status(500).json({ error: err.message });
    }
  };