const connection = require('../config/connection'); 
const { getRandomName, getRandomThoughts } = require('./data'); 
const User = require('../models/user'); 
const Thought = require('../models/thought'); 

connection.once('open', async () => {
  console.log('🌱 Connected to MongoDB');

  await User.deleteMany({});
  await Thought.deleteMany({});
  console.log('🧹 Database cleared!');

  const users = [];
  for (let i = 0; i < 10; i++) {
    const username = getRandomName();
    const email = `${username.split(' ').join('.')}@example.com`;
    users.push({ username, email, thoughts: [], friends: [] });
  }
  const createdUsers = await User.insertMany(users);
  console.log(`✨ Created ${createdUsers.length} users`);

  for (let i = 0; i < 10; i++) {
    const randomUser = createdUsers[Math.floor(Math.random() * createdUsers.length)];

    const thoughts = getRandomThoughts(20); 
    const createdThoughts = await Thought.insertMany(thoughts);

    for (const user of createdUsers) {
      const userThoughts = createdThoughts
        .sort(() => 0.5 - Math.random())
        .slice(0, Math.floor(Math.random() * 3) + 1);

      user.thoughts = userThoughts.map((thought) => thought._id);
      await user.save();
    }
  }
  console.log('✨ Created thoughts and updated users with thought IDs');

  for (const user of createdUsers) {
    const randomFriends = createdUsers
      .filter((friend) => friend._id.toString() !== user._id.toString()) 
      .sort(() => 0.5 - Math.random()) 
      .slice(0, Math.floor(Math.random() * 5) + 1); 

    user.friends = randomFriends.map((friend) => friend._id);
    await user.save();
  }
  console.log('✨ Created friends and updated users with friend IDs');

  const updatedUsers = await User.find({}).populate('thoughts').populate('friends');

  process.exit(0); 
});