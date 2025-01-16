const path=  require('path')
const fs=require('fs')
require('dotenv').config()

//function to return list of all contacts
const getContactsList = (req,res)=>{
    fs.readFile(path.join(__dirname,`/${process.env.DATAFILE}`),'utf8',(err,data)=>{
        if(err){
            console.log(err)
            res.send({'response': {}})
        }
        else{
            if(data) {
                res.send({'response': data})
            }
            else {
                res.send({'response': {}})
            }
        }
    })
}

//function to add contact
const addContact = (req,res)=>{
    let name= req.body.name
    let email=req.body.email
    let id = 'orhd'+Math.floor(Math.random()*10000).toString()
    let lastedit = new Date().toString().split('GMT')[0]

    fs.readFile(path.join(__dirname,`/${process.env.DATAFILE}`),'utf8',(err,data)=>{
        console.log(err,data)
        if(err){
            //if the file is not found, create a new one
            console.log(31)
            let d={}
            d[id]={'name':name,'email':email,'lastedit':lastedit}
            fs.writeFile(path.join(__dirname,`/${process.env.DATAFILE}`),JSON.stringify(d),(err)=>{
                if(err)console.log(err)
            })
            res.send({'response':200,'id':id,'lastedit':lastedit})
        }
        else{
            if(data) {
                //file is found and data exists
                data=JSON.parse(data)
                data[id] = {'name': name, 'email': email, 'lastedit': lastedit}
                fs.writeFile(path.join(__dirname,`/${process.env.DATAFILE}`), JSON.stringify(data), (err) => {
                    if (err) console.log(err)
                })
                res.send({'response': 200,'id':id,'lastedit':lastedit})
            }
            else{
                //if a file is found and contains no data, then just write the data
                let d={}
                d[id]={'name': name, 'email': email, 'lastedit': lastedit}
                fs.writeFile(path.join(__dirname,`/${process.env.DATAFILE}`), JSON.stringify(d), (err) => {
                    if (err) console.log(err)
                })
                res.send({'response': 200,'id':id,'lastedit':lastedit})
            }
        }
    })
}
//function to update contact
const updateContact = (req,res)=>{
    let name= req.body.name
    let email=req.body.email
    let id = req.body.id
    let lastedit = new Date().toString().split('GMT')[0]
    fs.readFile(path.join(__dirname,`/${process.env.DATAFILE}`),'utf8',(err,data)=>{
        if(!err) {
            //if there are no errors, delete the existing data and add the updated one.
            data=JSON.parse(data)
            delete data[id]
            data[id] = {'name': name, 'email': email, 'lastedit': lastedit}
            fs.writeFile(path.join(__dirname,`/${process.env.DATAFILE}`), JSON.stringify(data),(err)=>{
                if (err) console.log(err)
            })
            res.send({'response': 200})
        }
    })
//    no else because if the file doesn't exist, that means contacts haven't been added yet, so not possible to make edits
}
//function to delete contacts
const deleteContact = (req,res)=>{
    let id = req.body.id
    fs.readFile(path.join(__dirname,`/${process.env.DATAFILE}`),'utf8',(err,data)=>{
        if(!err) {
            //if no errors, go ahead with deletion and write the updates to the file
            data=JSON.parse(data)
            delete data[id]
            fs.writeFile(path.join(__dirname,`/${process.env.DATAFILE}`), JSON.stringify(data),(err)=>{
                if (err) console.log(err)
            })
            res.send({'response': 200})
        }
    })
    //    agiain no else because if the file doesn't exist, that means contacts haven't been added yet, so not possible to delete

}

//function to search contacts
const search = (req,res)=>{
    let q = req.query.q
    console.log(q)
    let results = {}
    fs.readFile(path.join(__dirname,`/${process.env.DATAFILE}`),'utf8',(err,data)=>{
        if(!err) {
            //if no errors loop through each object and check if the name or email starts with the search query and return the results
            data=JSON.parse(data)
            for(let i of Object.keys(data)){
                if (data[i]['name'].startsWith(q) || data[i]['email'].startsWith(q)){
                    results[i] =data[i]
                }
            }
            res.send({'response':results})
        }
    })
}
//exporting all our helper functions
module.exports = {getContactsList,addContact,updateContact,deleteContact,search}