let templist=[]

function initContacts(){
    console.log(4)
    let xhr=new XMLHttpRequest()
    xhr.onreadystatechange = function(){
       if (xhr.readyState===4 && xhr.status===200){
           let response=JSON.parse(xhr.response)
           displayContacts(response['response'])
       }
    }
    xhr.open('GET','http://localhost:3000/getcontactslist')
    xhr.send()
}
function displayContacts(contactList){
    document.getElementById('contactsList').innerText=''
    try {
        contactList = JSON.parse(contactList)
    }
    catch (e){}
    templist=contactList
    let temp=Object.keys(contactList)
    if(temp.length > 0){
        for (let i=0;i<temp.length;i++){
            console.log(i)
            let tr=document.createElement('tr')
            let no =document.createElement('label')
            let name =document.createElement('label')
            let email =document.createElement('label')
            let lastedit =document.createElement('label')
            let editbtn = document.createElement('button')
            let deletbtn = document.createElement('button')

            let th1=document.createElement('td')
            let th2=document.createElement('td')
            let th3=document.createElement('td')
            let th4=document.createElement('td')
            let th5=document.createElement('td')
            let th6=document.createElement('td')

            no.innerText=(i+1).toString()
            name.innerText = contactList[temp[i]]['name']
            email.innerText = contactList[temp[i]]['email']
            lastedit.innerText=contactList[temp[i]]['lastedit']

            editbtn.id=temp[i]+'-editbtn'
            deletbtn.id=temp[i]+'-deletebtn'
            editbtn.innerText='Update'
            deletbtn.innerText='Delete'

            th2.id=temp[i]+'-name'
            th3.id=temp[i]+'-email'
            th6.id=temp[i]+'-lastedit'

            editbtn.className=deletbtn.className='btncls'

            editbtn.onclick = (e)=>{
                let spid=e.target.id.split('-')[0]
                if(document.getElementById(e.target.id).innerText==='Update'){
                    document.getElementById(e.target.id).innerText='Cancel'
                    let nameinput=document.createElement('input')
                    let emailinput=document.createElement('input')
                    nameinput.className=emailinput.className='entrybox'
                    nameinput.value=templist[spid]['name']
                    emailinput.value=templist[spid]['email']
                    document.getElementById(spid+'-deletebtn').innerText='Confirm'
                    document.getElementById(spid+'-name').innerHTML=''
                    document.getElementById(spid+'-name').append(nameinput)
                    document.getElementById(spid+'-email').innerHTML=''
                    document.getElementById(spid+'-email').append(emailinput)
                }
                else{
                    document.getElementById(e.target.id).innerText='Update'
                    let name =document.createElement('label')
                    let email =document.createElement('label')
                    name.innerText = templist[spid]['name']
                    email.innerText = templist[spid]['email']
                    document.getElementById(spid+'-name').innerHTML=''
                    document.getElementById(spid+'-name').append(name)
                    document.getElementById(spid+'-email').innerHTML=''
                    document.getElementById(spid+'-email').append(email)
                    document.getElementById(spid+'-deletebtn').innerText='Delete'
                }
            }
            deletbtn.onclick = (e)=> {
                if (document.getElementById(e.target.id).innerText === 'Delete') {
                    let xhr = new XMLHttpRequest()
                    xhr.onreadystatechange = function () {
                        if (xhr.readyState === 4 && xhr.status === 200) {
                            let response = JSON.parse(xhr.response)['response']
                            if (response === 200){
                                delete templist[e.target.id.split('-')[0]]
                                document.getElementById('contactList').removeChild(
                                    document.getElementById(e.target.id).parentElement.parentElement
                                )
                            }
                        }
                    }
                    xhr.open('DELETE', 'http://localhost:3000/deletecontact')
                    xhr.setRequestHeader('Content-Type','application/json;charset=UTF-8')
                    xhr.send(JSON.stringify({'id': e.target.id.split('-')[0]}))
                }
                else{
                    let spid=e.target.id.split('-')[0]
                    let newname=document.getElementById(spid+'-name').firstChild.value
                    let newemail=document.getElementById(spid+'-email').firstChild.value
                    let xhr = new XMLHttpRequest()
                    console.log(newname,newemail)
                    xhr.onreadystatechange = function () {
                        if (xhr.readyState === 4 && xhr.status === 200) {
                            let response = JSON.parse(xhr.response)['response']
                            if(response===200){
                                templist[spid]['name']=newname
                                templist[spid]['email']=newemail
                                document.getElementById(e.target.id).innerText='Update'
                                let name =document.createElement('label')
                                let email =document.createElement('label')
                                name.innerText = newname
                                email.innerText = newemail
                                document.getElementById(spid+'-name').innerHTML=''
                                document.getElementById(spid+'-name').append(name)
                                document.getElementById(spid+'-email').innerHTML=''
                                document.getElementById(spid+'-email').append(email)
                                document.getElementById(spid+'-deletebtn').innerText='Delete'
                                document.getElementById(spid+'-lastedit').innerText=new Date().toString().split('GMT')[0]
                                document.getElementById(spid+'-editbtn').innerText='Update'
                                templist[spid]['lastedit']=new Date().toString().split('GMT')[0]
                            }
                        }
                    }
                    xhr.open('POST', 'http://localhost:3000/updatecontact')
                    xhr.setRequestHeader('Content-Type','application/json;charset=UTF-8')
                    xhr.send(JSON.stringify({'id': spid,'name':newname, 'email':newemail}))
                }
            }

            th1.append(no)
            th2.append(name)
            th3.append(email)
            th4.append(editbtn)
            th5.append(deletbtn)
            th6.append(lastedit)
            tr.append(th1,th2,th3,th4,th5,th6)
            document.getElementById('contactsList').appendChild(tr)
        }
    }
    else
        document.getElementById('contactsList').innerHTML=" <td colspan=\"6\" align=\"center\" >\n" +
            "                            <label style=\"margin: 30px auto;font-size: x-large\">Nothing to show</label>\n" +
            "                        </td>"

}
document.getElementById('searchButton').onclick = ()=>{
    let q = document.getElementById('searchField').value
    if(q.length >=3){
        let xhr = new XMLHttpRequest()
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                let response = JSON.parse(xhr.response)
                console.log(response)
                displayContacts(response['response'])
            }
        }
        xhr.open('GET', 'http://localhost:3000/search?q='+q)
        xhr.send(JSON.stringify({'q':q}))
    }
}

document.getElementById('addButton').onclick =()=> {
    let name = document.getElementById('name').value
    let email = document.getElementById('email').value
    if (name.length !== 0 && email.length !== 0) {
        let xhr = new XMLHttpRequest()
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                let response = JSON.parse(xhr.response)
                if (response['response'] === 200) {
                    templist[response['id']] = {'name':name,'email':email,'lastedit':response['lastedit']}
                    displayContacts(templist)
                }
            }
        }
        xhr.open('POST', 'http://localhost:3000/addcontact')
        xhr.setRequestHeader('Content-Type','application/json;charset=UTF-8')
        xhr.send(JSON.stringify({'name': name, 'email': email}))
    }
    else{
        //TODO nope
    }
}
document.getElementById('refreshButton').onclick=()=>{initContacts()}
initContacts()