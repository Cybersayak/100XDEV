const express = require("express");
const fs =require("fs");
const app=express();

app.get("/files/:fileNam", function(req,res){
    const flnm = req.params.fileNam;
    console.log(flnm);
    fs.readFile(flnm, "utf-8", function(err,data){
        res.json({
            data
        })
    })
})

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
