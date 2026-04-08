import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Campaign from './models/Campaign.js';
import Message from './models/Message.js';

dotenv.config();

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('🌱 Seeding database...');

    await Campaign.deleteMany({});
    await Message.deleteMany({});

    await Campaign.create([
      { name: 'Spring Sale Auto-Responder', trigger: 'SPRING24', response: 'Hi! Here is your 20% discount code: SPRING20', dmsSent: 45210, status: 'Active' },
      { name: 'New Follower Welcome', trigger: 'Follow', response: 'Welcome to our community! Thanks for following.', dmsSent: 12804, status: 'Active' },
      { name: 'Waitlist Inquiries', trigger: 'WAITLIST', response: 'You have been added to the waitlist!', dmsSent: 3420, status: 'Paused' }
    ]);

    await Message.create([
      { sender: 'AI Agent', text: 'Hello! This is a sample message to test your Inbox.', type: 'received', chatId: 'default', userId: new mongoose.Types.ObjectId() },
      { sender: 'AI Agent', text: 'I am your AI assistant, ready to help with your DM automation!', type: 'sent', isAI: true, chatId: 'default', userId: new mongoose.Types.ObjectId() }
    ]);

    console.log('✅ Database seeded successfully!');

    process.exit();
  })
  .catch((err) => {
    console.error('❌ Seed Error:', err);
    process.exit(1);
  });
