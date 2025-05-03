import prisma from "../config/db.js";

// Get the profile of the logged-in user
export const getProfile = async (userId) => {
  return await prisma.user.findUnique({
    where: { id: userId },
  });
};

// Update the profile of the logged-in user
export const updateProfile = async (userId, updateData) => {
  return await prisma.user.update({
    where: { id: userId },
    data: { ...updateData },
  });
};
