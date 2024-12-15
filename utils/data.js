const names = [
  'Alice',
  'Bob',
  'Charlie',
  'Diana',
  'Eve',
  'Frank',
  'Grace',
  'Hank',
  'Ivy',
  'Jack',
  'Karen',
  'Leo',
  'Mona',
  'Nancy',
  'Oscar',
  'Paul',
  'Quincy',
  'Rachel',
  'Sam',
  'Tina',
  'Uma',
  'Victor',
  'Wendy',
  'Xavier',
  'Yara',
  'Zane',
];

const thoughtDescriptions = [
  'This is an amazing thought!',
  'Here is something to ponder...',
  'Learning something new every day.',
  'Coding is like magic.',
  'Never stop exploring.',
  'Ideas are the currency of the future.',
  'A journey of a thousand miles begins with a single step.',
  'What a beautiful world we live in.',
  'Dream big and dare to fail.',
  'Success is no accident.',
  'The best way to predict the future is to create it.',
];

const reactions = [
  'Wow, that’s great!',
  'I completely agree.',
  'This is so insightful.',
  'Amazing perspective!',
  'I never thought about it this way.',
  'That’s hilarious!',
  'Interesting take!',
  'You’re absolutely right.',
  'Great point.',
  'I love this thought.',
  'Thanks for sharing!',
];

// Function to get a random item from an array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Function to generate a random full name
const getRandomName = () =>
  `${getRandomArrItem(names)} ${getRandomArrItem(names)}`;

// Function to generate random thoughts with random reactions
const getRandomThoughts = (int) => {
  const results = [];
  for (let i = 0; i < int; i++) {
    results.push({
      thoughtText: getRandomArrItem(thoughtDescriptions),
      username: getRandomName(),
      reactions: getRandomReactions(Math.floor(Math.random() * 5 + 1)),
    });
  }
  return results;
};

// Function to generate random reactions
const getRandomReactions = (int) => {
  const results = [];
  for (let i = 0; i < int; i++) {
    results.push({
      reactionBody: getRandomArrItem(reactions),
      username: getRandomName(),
    });
  }
  return results;
};

// Export the functions for use in seed.js or elsewhere
module.exports = { getRandomName, getRandomThoughts, getRandomReactions };
