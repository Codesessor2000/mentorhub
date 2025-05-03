import { getProfile, updateProfile } from "../services/profileService.js";

// Get the profile of the logged-in user
export const getProfileController = async (req, res) => {
  try {
    const userId = req.user.userId;
    const profile = await getProfile(userId);
    res.json(profile);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update the profile of the logged-in user
export const updateProfileController = async (req, res) => {
  try {
    const userId = req.user.userId;
    const updatedProfile = await updateProfile(userId, req.body);
    res.json(updatedProfile);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
