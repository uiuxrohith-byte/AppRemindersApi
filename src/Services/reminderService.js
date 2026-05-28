import { ReminderModel } from "../models/reminderModel.js";

export const ReminderService = {
  async getAllReminders() {
    return ReminderModel.getAll();
  },

  async getReminderById(reminderId) {
    const reminder = await ReminderModel.findById(reminderId);
    if (!reminder) throw new Error('Reminder not found');
    return reminder;
  },

  async createReminder(newReminder) {
    const { reminder, notes, userId } = newReminder;

    const sanitizedReminder = {
      reminder: reminder?.trim(),
      notes: notes?.trim(),
      userId,
    };

    const createdReminder = await ReminderModel.create(sanitizedReminder);
    return createdReminder;
  },

  async updateReminder(reminderId, newValues) {
    const { reminder, notes, completed } = newValues;

    // Build SQL dynamically
    const fields = Object.keys(newValues);
    const setClauses = fields.map((key, index) => `${key} = $${index + 1}`);
    const values = Object.values(newValues);
    values.push(reminderId); // Add ID at the end for WHERE clause

    const query = `
      UPDATE reminders 
      SET ${setClauses.join(", ")}
      WHERE id = $${values.length}
      RETURNING *;
    `;

    const updatedReminder = await ReminderModel.update(query, values);
    if (!updatedReminder) throw new Error('Reminder not found');
    return updatedReminder;
  },

  async deleteReminder(reminderId) {
    const authenticatedUserId = 3;

    const reminder = await ReminderModel.findById(reminderId);

    if (!reminder) {
      throw new Error('Reminder not found');
    }

    if (reminder.user_id !== authenticatedUserId) {
      throw new Error('You are not authorized to delete this reminder');
    }

    const rowCount = await ReminderModel.delete(reminderId);

    if (rowCount === 0) {
      throw new Error('Failed to delete the reminder');
    }

    return { message: 'Reminder deleted successfully' };
  }
};