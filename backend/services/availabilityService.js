import prisma from "../config/db.js";

// Add a new availability slot for the mentor
export const addAvailability = async (userId, day, startTime, endTime) => {
  const availabilitySlot = await prisma.availabilitySlot.create({
    data: {
      mentorId: userId,
      day,
      startTime,
      endTime,
    },
  });
  return availabilitySlot;
};

// Get all availability slots for a mentor
export const getAvailability = async (mentorId) => {
  const availability = await prisma.availabilitySlot.findMany({
    where: { mentorId },
  });
  return availability;
};

export const getMentors = async () => {
  const mentors = await prisma.user.findMany({
    where: { role: 'mentor' },
    include: {
      availabilitySlots: true, // include their available slots
    },
  });
  return mentors;
};

// Update an availability slot
export const updateAvailability = async (
  availabilityId,
  startTime,
  endTime,
) => {
  const updatedAvailability = await prisma.availabilitySlot.update({
    where: { id: availabilityId },
    data: {
      day,
      startTime,
      endTime,
    },
  });
  return updatedAvailability;
};

// Delete an availability slot
export const deleteAvailability = async (availabilityId) => {
  const deletedAvailability = await prisma.availabilitySlot.delete({
    where: { id: availabilityId },
  });
  return deletedAvailability;
};
