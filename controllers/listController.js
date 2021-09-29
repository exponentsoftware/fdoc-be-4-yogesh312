const mongoose = require("mongoose");
//const user = require("../models/user");
const List = mongoose.model("List");
const User = mongoose.model("User");

exports.createList = async (req, res) => {
  const { title,description, category} = req.body;
  const userId = req.payload.id;
  const listExist = await List.findOne({ title });
  if (listExist) throw "form with that name already exists!";
  const list = new List({
    userId,
    title, 
    description,
     
    category
  });
  await list.save();
  res.json({message: "list created!",
  });
};
exports.createLists =async (req, res) => {
    res.render('./submitlist',{
      title:"submit list"
    });
}



exports.getAllList = async (req, res) => {
    try{
        const lists = await List.find({});
        res.json(lists);
    } catch(err){
        console.log(err)
    }
    
};

exports.getAllListAdmin = async (req, res) => {
    try{
        const id=req.query.userId;
        
        const user = await User.findById(id);
        //console.log(user);
        if(user.role=="admin"){
            const lists = await List.find({}, function(err,list){
                res.render('showlist',{
                  title:"all list",
                  List: list
                })
              });
            res.json(lists);
        } else if(user.role=="user"){
            res.json("admin role required")
        }
         
    } catch(err){
        console.log(err)
    }
    
};


exports.getList = async (req, res) => {
    const id = req.params.id;
    let list = await List.findById(id);
    res.json(list);
    
};
exports.getUserList = async (req, res) => {
    
    const userId = req.query.userId
    //console.log(userId)
    let list = await List.find({"userId":userId});
    res.json(list);
    
};

exports.deleteList = async (req, res) => {
    const id = req.params.id;
    //console.log(id);
    await List.findByIdAndDelete(id);
    res.json(`id ${id} list has been deleted`);
};



exports.updateList = async (req, res) => {
    try{
        const id = req.params.id;
        const updated= await List.findByIdAndUpdate(id, req.body, {new: true})
        res.json({ message: updated });
    } catch(err){
        console.log(err)
    }
    
};
//-----------------------------------------------------------------------
exports.getAllByFilter = async (req, res) => {
    try{
        let cat =req.query.category;
        let title= req.query.title
        let sort = req.query.sort
        if(sort=="new"){
            if(cat){
                let listByCat= await List.find({"category": cat}).sort({createdAt:-1})
                res.json({message:`list by ${cat}`,listByCat});
            } else if(title){
                let listByTitle= await List.find({"title": title}).sort({createdAt:-1})
                res.json({message:`list by ${cat}`,listByTitle});
            }else{
                let lists = await List.find({}).sort({createdAt:-1});
            res.json(lists);
            }
        } else if (sort=="old"){
            if(cat){
                let listByCat= await List.find({"category": cat}).sort({createdAt:1})
                res.json({message:`list by ${cat}`,listByCat});
            } else if(title){
                let listByTitle= await List.find({"title": title}).sort({createdAt:1})
                res.json({message:`list by ${cat}`,listByTitle});
            }else{
                let lists = await List.find({}).sort({createdAt:1});
            res.json(lists);
            }
        } else if (cat){
            let listByCat= await List.find({"category": cat}).sort({createdAt:1})
            res.json({message:`list by ${cat}`,listByCat});
        } else if(title){
            let listByTitle= await List.find({"title": title}).sort({createdAt:1})
            res.json({message:`list by ${cat}`,listByTitle});
        }else{
            let lists = await List.find({});
        res.json(lists);
        }
    } catch(err){
        console.log(err)
    }
    
};








 