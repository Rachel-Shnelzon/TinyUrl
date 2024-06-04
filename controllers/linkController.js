import linkModel from "../models/linkModel.js";
import UserModel from "../models/userModel.js";


const LinkController = {
  getList: async (req, res) => {
    try {
      const links = await linkModel.find();//ללא סינון
      res.json({ links});
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },

  getById: async (req, res) => {
    const { id } = req.params;

        try {
            const link = await linkModel.findById(id);
            if (!link) {
                return res.status(404).json({ message: 'Link not found' });
            }
    
            const targetParamName = link.targetParamName;
            const targetParamValue = req.query[targetParamName];

            const click = {
                insertedAt: new Date(),
                ipAddress: req.ip,
                targetParamValue: targetParamValue || ''
            };
            link.clicks.push(click);
            await link.save();
    
            res.redirect(link.originalUrl);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
  },

  add: async (req,res)=>{
    try{
      const { userId, originalUrl} = req.body;
      const newLink = new linkModel({
        originalUrl
    });
    await newLink.save();

    const user = await UserModel.findById(userId);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    user.links.push(newLink._id);
    await user.save();

    res.status(201).json({
        message: 'Link created successfully',
        shortUrl: `http://localhost:8787/links/${newLink._id}?t=VALUE`
    });
    }catch (e) {
      res.status(400).json({ message: e.message });
    }
  }
}
export default LinkController;
