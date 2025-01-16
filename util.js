const path=  require('path')
const fs=require('fs')

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

const getContact = (req,res)=>{

}

const addContact = (req,res)=>{
    let name= req.body.name
    let email=req.body.email
    let id = 'orhd'+Math.floor(Math.random()*10000).toString()
    let lastedit = new Date().toString().split('GMT')[0]

    fs.readFile(path.join(__dirname,`/${process.env.DATAFILE}`),'utf8',(err,data)=>{
        console.log(err,data)
        if(err){
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
                data=JSON.parse(data)
                data[id] = {'name': name, 'email': email, 'lastedit': lastedit}
                fs.writeFile(path.join(__dirname,`/${process.env.DATAFILE}`), JSON.stringify(data), (err) => {
                    if (err) console.log(err)
                })
                res.send({'response': 200,'id':id,'lastedit':lastedit})
            }
            else{
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

const updateContact = (req,res)=>{
    let name= req.body.name
    let email=req.body.email
    let id = req.body.id
    let lastedit = new Date().toString().split('GMT')[0]
    fs.readFile(path.join(__dirname,`/${process.env.DATAFILE}`),'utf8',(err,data)=>{
        if(!err) {
            data=JSON.parse(data)
            delete data[id]
            data[id] = {'name': name, 'email': email, 'lastedit': lastedit}
            fs.writeFile(path.join(__dirname,`/${process.env.DATAFILE}`), JSON.stringify(data),(err)=>{
                if (err) console.log(err)
            })
            res.send({'response': 200})
        }
    })
}
const deleteContact = (req,res)=>{
    let id = req.body.id
    fs.readFile(path.join(__dirname,`/${process.env.DATAFILE}`),'utf8',(err,data)=>{
        if(!err) {
            data=JSON.parse(data)
            delete data[id]
            fs.writeFile(path.join(__dirname,`/${process.env.DATAFILE}`), JSON.stringify(data),(err)=>{
                if (err) console.log(err)
            })
            res.send({'response': 200})
        }
    })
}
const search = (req,res)=>{
    let q = req.query.q
    console.log(q)
    let results = {}
    fs.readFile(path.join(__dirname,`/${process.env.DATAFILE}`),'utf8',(err,data)=>{
        if(!err) {
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

module.exports = {getContactsList,getContact,addContact,updateContact,deleteContact,search}