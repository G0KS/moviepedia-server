const users = require("../Models/userSchema");

exports.register = async (req, res) => {
   const { uName, email, password } = req.body;
   try {
      const existingUser = await users.findOne({ email });
      if (existingUser) {
         res.status(406).json("User already exists");
      } else {
         const newUser = new users({
            uName,
            email,
            password,
            profile: req.file.filename,
            favorties: [],
         });

         await newUser.save();
         res.status(200).json(newUser);
      }
   } catch (error) {
      res.status(401).json(error);
   }
};

exports.login = async (req, res) => {
   const { email, password } = req.body;
   try {
      const user = await users.findOne({ email });
      if (user) {
         if (user.password === password) {
            res.status(200).json(user);
         } else {
            res.status(406).json("Invalid credentials");
         }
      } else {
         res.status(404).json("User does not exist");
      }
   } catch (error) {
      res.status(401).json(error);
   }
};

exports.deleteUser = async (req, res) => {
   const { id } = req.params;
   try {
      console.log("idns");
      const response = await users.findByIdAndDelete({ _id: id });
      res.status(200).json(response);
   } catch (error) {
      res.status(401).json(error);
   }
};

exports.addFavorite = async (req, res) => {
   const { id } = req.params;
   const details = req.body;
   try {
      const user = await users.findOne({ _id: id });
      user.favorites.push(details);
      await user.save();
      res.status(200).json(user);
   } catch (error) {
      res.status(401).json(error);
   }
};

exports.getAllFavorites = async (req, res) => {
   const { id } = req.params;
   try {
      const response = await users.findOne({ _id: id });
      res.status(200).json(response.favorites);
   } catch (error) {
      res.status(401).json(error);
   }
};

exports.updateFavorites = async (req, res) => {
   const { id } = req.params;
   console.log(id);
   const { uName, email, password, profile, favorites } = req.body;
   console.log(uName, email, password, profile, favorites);
   try {
      const updatedUser = await users.findByIdAndUpdate(
         id,
         {
            uName,
            email,
            password,
            profile,
            favorites,
         },
         { new: true }
      );

      await updatedUser.save();
      res.status(200).json(updatedUser);
   } catch (error) {
      res.status(401).json(error);
   }
};
