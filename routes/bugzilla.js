const express = require('express');
const connection = require('../connection');
const router = express.Router();

//const cors= 'Access-Control-Allow-Origin';

router.use(function (request, response, next) {
  console.log("REQUEST:" + request.method + "   " + request.url);
  console.log("BODY:" + JSON.stringify(request.body));
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  response.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

router.post('/create',(req, res)=>{
  let bug = req.body;
  query = "insert into t_bugdetails (bugDetails, bugDate, bugStat, bugowner) values(?,?,?,?)";
  connection.query(query,[bug.bugDetails,bug.bugDate,bug.bugStat,bug.bugowner],(err,results)=>{
    if(!err){
      return res.status(200).json({message: "Bug Added Successfully"});
    }
    else
     return res.status(500).json(err);
  });
});

router.get('/read',(req, res, next)=>{
  //res.set(cors, '*');
  var query = "select * from t_bugdetails";
  connection.query(query,(err,results)=>{
    if(!err){
      return res.status(200).json(results);
    }
    else
     return res.status(500).json(err);
  });
});

router.patch('/update/:bugId',(req,res,next)=>{
  const bugId = req.params.bugId;
  let bug = req.body;
  var query = "update t_bugdetails set bugDetails=?,bugDate=?,bugStat=?,bugowner=? where bugId=?";
  connection.query(query,[bug.bugDetails,bug.bugDate,bug.bugStat,bug.bugowner,bugId],(err,results)=>{
    if(!err){
      if(results.affectedRows == 0){
        return res.status(404).json({message:"Bug id does not found"});
      }
      return res.status(200).json({message:"Bug Updated Successfully"});
    }
    else{
      return res.status(500).json(err);
    }
  });
});

router.delete('/delete/:bugId',(req,res,next)=>{
  const bugId = req.params.bugId;
  var query = "delete from t_bugdetails where bugId=?";
  connection.query(query,[bugId],(err,results)=>{
    if(!err){
      if(results.affectedRows == 0){
        return res.status(404).json({message:"Bug id does not found"});
      }
      return res.status(200).json({message:"Bug Delete Successfully"});
    }
    else{
      return res.status(500).json(err);
    }
  });
});

module.exports = router;