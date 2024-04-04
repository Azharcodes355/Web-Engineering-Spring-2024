const fs = require("fs");

let studentData="";

// function readFile(callThis){
//   fs.readFile("a.txt","utf8", (err,mydata)=> {
//     if(err){
//       console.log("ERROR OCCURED", err);
//     }else{
//       callThis(mydata)
//     }
//   })
// }


function readFile(filename){
    fs.readFile(filename,"utf8", (err,mydata)=> {
      if(err){
        console.log("ERROR")
      }else{
        console.log("DATA IS: ", mydata)
      }
    })
}

async function readFile(filename){
  //returning promise object
  return new Promise((resolve,reject) => {
    fs.readFile(filename,"utf8", (err,mydata)=> {
      if(err){
        reject("SUPER ERROR: ", err);
      }else{
        console.log("First promsie fullfilled")
        resolve(mydata)
      }
    })
  }) 
}

async function secondFunction(){
  return new Promise((resolve,reject)=>{
    setTimeout(() => {
      console.log('Second promise fullfilled')
      resolve();
    }, 3000)
  })
}

//use of promise funtion
readFile('b.txt').then((data) => {
    secondFunction().then(() => {
      console.log("DATA IS: ", data)
    })
});


// readFile().then((data) => {
//       console.log(data)
//   })


 
 
  // function callThis(data){
  //   console.log(data);
  // }
  
  // readFile(callThis);



