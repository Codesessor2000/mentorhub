import * as availabilityService from "../services/availabilityService.js";

// Add a new availability slot for the mentor
export const add = async (req, res) => {
  try {
    const { day, startTime, endTime } = req.body;
    const mentorId = req.user.userId; // Get mentor's userId from authenticated user

    const availabilitySlot = await availabilityService.addAvailability(mentorId, day, startTime, endTime);
    res.status(201).json({ message: "Availability added", availabilitySlot });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all availability slots for the mentor
export const getAll = async (req, res) => {
  try {
    const mentorId = req.user.userId; // Get mentor's userId from authenticated user
    const availabilitySlots = await availabilityService.getAvailability(mentorId);
    res.status(200).json({ availabilitySlots });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getAllSlotsByMentorId = async (req, res) => {
  try {
    const { mentorId } = req.params; // Get mentor's userId from authenticated user
    const availabilitySlots =
      await availabilityService.getAvailability(mentorId);
    res.status(200).json({ availabilitySlots });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update an existing availability slot
export const update = async (req, res) => {
  try {
    const { day, startTime, endTime } = req.body;
    const { availabilityId } = req.params;
    const updatedAvailability = await availabilityService.updateAvailability(
      availabilityId,
      day,
      startTime,
      endTime,
    );
    res
      .status(200)
      .json({ message: 'Availability updated', updatedAvailability });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getAllMentors = async (req, res) => {
  try {
    console.log('mentors api');
    const mentors = await availabilityService.getMentors();
    res.status(200).json({ mentors });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete an availability slot
export const deleteAvailability = async (req, res) => {
  try {
    const { availabilityId } = req.params;
    const deletedAvailability =
      await availabilityService.deleteAvailability(availabilityId);
    res
      .status(200)
      .json({ message: 'Availability deleted', deletedAvailability });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
