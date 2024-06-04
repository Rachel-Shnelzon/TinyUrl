
import UserModel from "../models/userModel.js";

const UserController = {
  getList: async (req, res) => {
    try {
      const users = await UserModel.find();//ללא סינון
      // const filtered1 = await userModel.find({ complete: true });//סינון 1
      // const filtered2 = await userModel.where('isComplete', false);//סינון 2
      res.json({ users});
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },

  getById: async (req, res) => {
    try {
      const user = await UserModel.findById(req.params.id);//שליפה לפי מזהה
      res.status(200).json(user);
    } catch (e) {
      res.status(400).send("error!!!!")
    }
  },

  add: async (req, res) => {
    try {
        const body = req.body;
        const newUser = new UserModel(body);
        await newUser.save();
        res.status(200).json({ success: true });
    } catch (error) {
        console.error("Error adding user data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
},

  update: async (req, res) => {
    const { id } = req.params;
    try {
      await UserModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });//עדכון לפי מזהה
      res.status(200).send("updated successfully!")
    } catch (e) {
      console.error("Error updating user data:", error);
      res.status(500).send("Internal Server Error");
    }
  },

  delete: async (req, res) => {
    const { id } = req.params;
    try {
      const deleted = await UserModel.findByIdAndDelete(id);//מחיקה לפי מזהה
      res.json(deleted);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },
};

export default UserController;
