## A simple Contacts app.

### Performs creating, updating, deleting, and searching for contacts

## Installation

- Clone the git repository on your local machine
- Unzip the contents and navigate to the root where package.json is located
- run `npm install` to install dependencies.
- run `node server.js` to run on [http://localhost:3000/]()
- open your browser and type in the URL.

## Approach
- I first started by designing the back-end by figuring out what features needs
to be included and writing end points for them
- Secondly, I used file-based storage retrieval as it was simple and fast to use
- Third, I prototyped the UI elements from how to display the results, where to provide the search field,
a method to add contacts and update them in a simple manner
- finally i manually tested the application by performing all the basic operations and
ensuring the application was working as expected.

### Note
- Although i wasn't able to write tests in a short amount of time that
i allocated to developing this application, but i look forward to doing so in the future.
- one trade-off is not checking a duplicate entries, I did come up with a solution to use hashes by using email and name as
a combination which would reduce the time to check the entire database before adding a contact, But this was all the features i could
deliver with the allotted time.

### Deliverables
- Allows users to **ADD** contacts (name and email)
- **Displays** the list of contacts added
- allows users to **Search** based on name and email
- allows users to **Update** and **Delete** a contact
- **Displays** the **Time** last edits were made to a contact
- nice minimalistic User interface for simple use case.

### Code
- The **Static** folder contains all the resources that will be server for our application
  (index.html, style.css, script.js)
- The **.env** file contains the environmental variables used by the server for easier 
management of global variables
- **Server.js** file which is our back-end server serving our endpoints for our front-end application
- **Util.js** which contains the helper libraries to perform all the neccessary functions
- **Contacts.json** (may appear once contacts are added) used as a datafile to store contacts.
- **Misc** include **._gitignore_**, **_package.json_**, and **_README.md_** files.