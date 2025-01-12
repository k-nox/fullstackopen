import mongoose from 'mongoose';

const CREATE = 'create';
const FIND = 'find';

if (process.argv.length < 3) {
  console.log('must provide password');
}

const url = (password) => {
  const urls = {
    dev: `mongodb://fullstackopen:${password}@127.0.0.1:27017/phonebook?authSource=admin&retryWrites=true&w=majority`,
    prod: `mongodb+srv://fullstackopen:${password}@fullstackopen.9kdef.mongodb.net/phonebook?retryWrites=true&w=majority&appName=FullStackOpen`,
  };
  return urls[environment()];
};

const environment = () => {
  if (mode() === FIND) {
    return process.argv.length < 4 ? 'dev' : process.argv[3];
  }
  return process.argv.length < 6 ? 'dev' : process.argv[5];
};

const mode = () => {
  if (process.argv.length < 5) {
    return FIND;
  }
  return CREATE;
};

const password = process.argv[2];

mongoose.connect(url(password));
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model('Person', personSchema);

const create = () => {
  const name = process.argv[3];
  const number = process.argv[4];
  const person = new Person({ name, number });
  return person.save().then((result) => {
    console.log(`added ${result.name} number ${result.number} to phonebook`);
  });
};

const find = () => {
  console.log('phonebook:');
  return Person.find({}).then((results) => {
    results.forEach((result) => {
      console.log(result.name, result.number);
    });
  });
};

if (mode() === CREATE) {
  create().then(() => {
    mongoose.connection.close();
  });
} else {
  find().then(() => {
    mongoose.connection.close();
  });
}
