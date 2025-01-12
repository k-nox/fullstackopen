import mongoose from "mongoose";

if (process.argv.length < 3) {
  console.log("give password and as argument");
  process.exit(1);
}

const password = process.argv[2];
const env = process.argv.length < 4 ? "dev" : process.argv[3];

const urls = {
  dev: `mongodb://fullstackopen:${password}@127.0.0.1:27017/noteApp?authSource=admin&retryWrites=true&w=majority`,
  prod: `mongodb+srv://fullstackopen:${password}@fullstackopen.9kdef.mongodb.net/noteApp?retryWrites=true&w=majority&appName=FullStackOpen`,
};

mongoose.set("strictQuery", false);
mongoose.connect(urls[env]);

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
});

const Note = mongoose.model("Note", noteSchema);

// const note = new Note({
//   content: "HTML is easy",
//   important: true,
// });
//
// note.save().then((result) => {
//   console.log("note saved!");
//   mongoose.connection.close();
// });

Note.find({}).then((result) => {
  result.forEach((note) => {
    console.log(note);
  });
  mongoose.connection.close();
});
