const mongoose = require("mongoose");

const dbUri =
  process.env.NODE_ENV === "production"
    ? process.env.dbUri
    : process.env.NODE_ENV === "test"
    ? "mongodb://localhost/pm-test"
    : "mongodb://localhost/projectsmanager";


mongoose.connect(dbUri, { useNewUrlParser: true,  useUnifiedTopology: true , useFindAndModify: false});

mongoose.connection.on("connected", () =>
process.env.NODE_ENV !== "test" && console.log("Mongoose is connected to ", dbUri)
);

mongoose.connection.on("error", err => console.log(err));

mongoose.connection.on("disconnected", () =>
  console.log("Mongoose is disconnected")
);

process.on("SIGINT", () => {
  console.log("Mongoose disconnected on exit process");
  process.exit(0);
});
