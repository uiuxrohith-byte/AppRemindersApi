import { ReminderService } from '../services/reminderService.js';

export const ReminderController = {
  async getAllReminders(req, res) {
    try {
      const reminders = await ReminderService.getAllReminders();
      res.status(200).json(reminders);
    } catch (error) {
      res.status(500).send({ message: 'Internal Server Error' });
    }
  },

  async getReminderById(req, res) {
    try {
      const reminderId = parseInt(req.params.id, 10);
      
      const reminder = await ReminderService.getReminderById(reminderId);
      res.status(200).json(reminder);
    } catch (error) {
      res.status(500).send({ message: 'Internal Server Error' });
    }
  },

  async createReminder(req, res) {
    try {
      const newReminder = await ReminderService.createReminder(req.body);
      res.status(200).json(newReminder);
    } catch (error) {
      res.status(500).send({ message: 'Internal Server Error' });
    }
  },

  async updateReminder(req, res) {
    try {
      const reminderId = parseInt(req.params.id, 10);

      const updatedReminder = await ReminderService.updateReminder(reminderId, req.body);
      res.status(200).json(updatedReminder);
    } catch (error) {
      res.status(500).send({ message: 'Internal Server Error' });
    }
  },

  async deleteReminder(req, res) {
    try {
      const reminderId = parseInt(req.params.id, 10);
      
      const reminder = await ReminderService.deleteReminder(reminderId);
      res.status(200).json(reminder);
    } catch (error) {
      res.status(500).send({ message: 'Internal Server Error' });
    }
  },
};
