const fs = require("fs");

const sushiMenu = [
  {
    title: "Fried Crab",
    price: 360,
    weight: "300G",
    roll_number: 20,
    category: "sushi",
    ingredients: [
      "rice",
      "nori",
      "crab",
      "cream cheese",
      "spicy sauce",
      "cheese pillow",
      "unagi sauce",
      "sesame mix",
    ],
  },

  {
    title: "Roll vulcano",
    price: 240,
    weight: "250G",
    roll_number: 15,
    category: "sushi",
    ingredients: [
      "rice",
      "nori",
      "crab",
      "cucumber",
      "salmon fried in tempura",
      "tobiko caviar",
      "unagi sauce",
      "sesame mix",
    ],
  },

  {
    title: "Maki set",
    price: 500,
    weight: "0.5Kg",
    roll_number: 10,
    category: "sushi",
    ingredients: [
      "rice",
      "maki with cucumber",
      "maki with avocado",
      "maki with salmon ",
      "maki with eel",
      "maki with smoked salmon",
      "maki with surimi",
      "maki with tuna",
      "maki with shrimp",
      " maki filet",
      "maki filet with salmon roe",
    ],
  },

  {
    title: "SUSHIBOOM set",
    price: 1238,
    weight: "1Kg",
    roll_number: 16,
    category: "sushi",
    ingredients: [
      "rice",
      "maki with salmon",
      "maki filo",
      " maki with cucumber",
      "maki with avocado",
      "Philadelphia with salmon",
      "Philadelphia with eel",
      "California filet with smoked salmon",
      "California filet with eel",
      " golden dragon",
      "green dragon",
      " bonito light roll",
    ],
  },

  {
    title: "Ninja set",
    price: 910,
    weight: "360G",
    roll_number: 8,
    category: "sushi",
    ingredients: [
      "Ninja with avocado and tuna",
      "Ninja with spicy shrimp",
      "Ninja with shrimp and avocado",
      "Ninja with shrimp and salmon",
      "Ninja with shrimp and tuna",
    ],
  },

  {
    title: "Fuji set",
    price: 370,
    weight: "386G",
    roll_number: 16,
    category: "sushi",
    ingredients: [
      "Philadelphia Classic",
      " Gunkan with Salmon",
      "Gunkan with Eel",
      "Gunkan with Shrimp",
    ],
  },

  {
    title: "Set of the Week",
    price: 1238,
    weight: "1Kg",
    roll_number: 16,
    category: "sushi",
    ingredients: [
      "Philadelphia Classic",
      "Chicken Roll",
      "California Classic",
      "Baked Hosomaki with Avocado",
      "Hosomaki Salmon",
    ],
  },

  {
    title: "Ocean set",
    price: 565,
    weight: "2.4Kg",
    roll_number: 80,
    category: "sushi",
    ingredients: [
      "Philadelphia Classic X2",
      "Philadelphia Eel",
      "Tenderness",
      "California Classic",
      "California Shrimp",
      "California Grilled Salmon",
      "Philadelphia Sesame",
      " Baked Roll with Salmon in Sesame",
      "Baked Roll with Shrimp in Caviar",
    ],
  },

  {
    title: "Ocean set",
    price: 620,
    weight: "1Kg",
    roll_number: 32,
    category: "sushi",
    ingredients: [
      "Philadelphia Classic",
      "Cheese Roll",
      "California Grilled Salmon",
      "Baked Salmon Roll in Sesame",
    ],
  },
];

sushiMenu.sort((a, b) => {
  const titleComparison = a.title.localeCompare(b.title);
  return titleComparison !== 0 ? titleComparison : a.price - b.price;
});

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let userData = {
  fullName: '',
  phoneNumber: '',
  street: ''
};

const ask = (question, callback) => rl.question(question, (answer) => callback(answer.trim()));

const askPhoneNumber = () => ask('Enter your phone number (must be exactly 12 digits): ', (phoneNumber) => {
  if (/^\d{12}$/.test(phoneNumber)) {
    userData.phoneNumber = phoneNumber;
    ask('Enter your street: ', (street) => {
      if (street.trim() !== '') {
        userData.street = street;
        displayData();
      } else {
        console.log('Street cannot be empty. Please enter a valid street.');
        askPhoneNumber();
      }
    });
  } else {
    console.log('Invalid phone number format. Please enter exactly 12 digits.');
    askPhoneNumber();
  }
});

const displayData = () => {
  console.log(`You entered:
Name and Surname: ${userData.fullName}
Phone Number: ${userData.phoneNumber}
Street: ${userData.street}`);
  ask('Is the data correct? (y/n): ', (confirmation) => {
    if (confirmation.toLowerCase() === 'y') {
      console.log('Great, opening the menu...');
      selectSushi();
    } else if (confirmation.toLowerCase() === 'n') {
      ask('What do you want to change? (1-Name, 2-Phone, 3-Street): ', handleChoice);
    } else {
      console.log('Incorrect response. Closing the program.');
      rl.close();
    }
  });
};

const handleChoice = (choice) => {
  const actions = {
    '1': () => askAndSet('Enter the new name: ', 'Name cannot be empty. Please enter a valid name.', 'fullName', displayData),
    '2': askPhoneNumber,
    '3': () => askAndSet('Enter the new street: ', 'Street cannot be empty. Please enter a valid street.', 'street', displayData),
    'default': () => (console.log('Invalid choice. Closing the program.'), rl.close())
  };
  (actions[choice] || actions['default'])();
};

const askAndSet = (question, errorMessage, property, callback) => ask(question, (answer) => {
  if (answer.trim() !== '') {
    userData[property] = answer;
    console.log('Data updated.');
    callback();
  } else {
    console.log(errorMessage);
    askAndSet(question, errorMessage, property, callback);
  }
});

const selectSushi = () => {
  const title = '=======SUSHI DELIVERY=======';
  const spaces = ' '.repeat((process.stdout.columns - title.length) / 2);

  console.log(spaces + title + spaces);
  console.log('Available Sushi:');
  sushiMenu
    .sort((a, b) => a.price - b.price)
    .forEach((item, index) => {
      console.log(
        `${index + 1}. ${item.title.padEnd(20)} | Weight: ${item.weight.padEnd(8)} | ₴${item.price.toFixed(2)}`
      );
    });

  rl.question('Select a sushi (enter the number): ', (selectedSushi) => {
    const sushi = sushiMenu[selectedSushi - 1];
    if (sushi) {
      rl.question('Enter the quantity: ', (quantity) => {
        const totalCost = sushi.price * quantity;
        console.log('===========================');
        console.log(`You ordered:`);
        console.log(`${quantity} ${sushi.title} - Total: ₴${totalCost.toFixed(2)}`);
        console.log('Thank you for your order!');
        console.log('===========================');
        rl.close();
      });
    } else {
      console.log('Invalid selection. Please try again.');
      // Повторный вызов функции для перезапуска
      selectSushi();
    }
  });
};

ask('Enter your name and surname: ', (fullName) => {
  if (fullName.trim() !== '') {
    userData.fullName = fullName;
    askPhoneNumber();
  } else {
    console.log('Name cannot be empty. Please enter a valid name.');
    ask('Enter your name and surname: ', (newFullName) => {
      if (newFullName.trim() !== '') {
        userData.fullName = newFullName;
        askPhoneNumber();
      } else {
        console.log('Name cannot be empty. Closing the program.');
        rl.close();
      }
    });
  }
});

rl.on('close', () => {
  console.log('Exiting the program...');
  process.exit(0);
});