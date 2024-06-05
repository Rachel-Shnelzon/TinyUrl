import linkModel from "../models/linkModel.js";
import UserModel from "../models/userModel.js";


const LinkController = {
  getList: async (req, res) => {
    try {
      const links = await linkModel.find();//ללא סינון
      res.json({ links });
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },

  getById: async (req, res) => {
    const { id } = req.params;

    try {
      const link = await linkModel.findById(id);
      if (!link) {
        return res.status(404).json("Link not found");
      }

      const paramValue = req.query[link.targetParamName];
      const targetValueObject = link.targetValues.find(x => x.name===paramValue);
      if(targetValueObject){
        targetValueObject.value = targetValueObject.value+1;
      }
      else{
        const object = {
          name: paramValue, 
          value:1
        }
        link.targetValues.push(object);
      }

      const click = {
        insertedAt: new Date(),
        ipAddress: req.ip,
        targetParamValue: paramValue || ''
      };
      link.clicks.push(click);
      await link.save();

      res.redirect(link.originalUrl);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  //מתבצע רק אם משתמש מחובר
  getSourceById:async(req, res)=>{
    const {id} = req.params;
    try{
      const link = await linkModel.findById(id);
      if (!link) {
        return res.status(404).json("Link not found");
      }

      res.status(200).send(link.targetValues);
    }catch{
      res.status(500).json({ message: err.message });
    }
  },

  add: async (req, res) => {
    try {
      const { userId, originalUrl , targetParamName} = req.body;
     
      const newLink = new linkModel({
        originalUrl,
        targetParamName
      });
      await newLink.save();

      const user = await UserModel.findById(userId);
      if (!user) {
        return res.status(404).json("User not found");
      }

      user.links.push(newLink._id);
      await user.save();

      res.status(201).json({
        message: 'Link created successfully',
        shortUrl: `http://localhost:3000/link/${newLink._id}?${targetParamName}=val1`,
        shortUrl2: `http://localhost:3000/link/${newLink._id}?${targetParamName}=val2`
      });
    } catch (e) {
      res.status(400).json(e);
    }
  }
}
export default LinkController;
