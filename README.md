# Creact 
### Creact is a multi-media platform dedicated to making collaboration a productive and enjoyable experience. 
### Creact operates in units as workspace , where users can create and join workspaces. 
### All sorts of collaboration happens in a workspace and is exclusive to workspace members, including tasks assignment, realtime chat, collaboration documents, video calls.

[creact app](https://creact-app.com)

## Tech stack
React JS
Node JS
Draft.js
Socket.io
Postgresql
Knex.js

### External APIs and plugins
Jitsi meet Iframe API [documentation](https://jitsi.github.io/handbook/docs/dev-guide/dev-guide-iframe)
Jutsu (A jitsi meet component wrapper and custom hook moulded with react's chakra) [documentation](https://github.com/this-fifo/jutsu)
Full Calendar [documentation](https://fullcalendar.io/docs)


## Features 
- Workspace management
- Realtime chat
- Realtime collaboration document 
- Realtime whiteboard
- Video Conferencing
- Collaboration task assigment 


## User interface
### remarks: {} wraps around variables
### Landing, signup and registration page :
![alt text](/client/src/images/wireframe/landingPage.png)
![alt text](/client/src/images/wireframe/loginPage.png)
![alt text](/client/src/images/wireframe/registerPage.png)

### Profile and workspaces
#### Profile page
![alt text](/client/src/images/wireframe/profilePage.png)

#### workspace searching
![alt text](/client/src/images/wireframe/searchWorkspace.png)


### Features
#### Realtime chatroom
![alt text](/client/src/images/wireframe/chatroom.png)
#### Realtime collaboration document
![alt text](/client/src/images/wireframe/collaborationDocPage.png)
#### Calendar for tasks display
![alt text](/client/src/images/wireframe/calendar.png)
#### Collaboration task 
![alt text](/client/src/images/wireframe/collaborationTaskPage.png)
#### Video conferencing 
![alt text](/client/src/images/wireframe/video.png)


## Folder structure
We separate the structure into a few main components: 
- Landing page
- Login page
- Registration page
- Dashboard

We wrap major functions in dashboard in such struture:
- Dashboard components: Profile page and workspace
- Dashboard features(realtime chatroom, realtime collaboration document etc.)

Within src folder, we have the following structure:
![alt text](/client/src/images/wireframe/tree1.png)
![alt text](/client/src/images/wireframe/tree2.png)
![alt text](/client/src/images/wireframe/tree3.png)
![alt text](/client/src/images/wireframe/tree4.png)



## Developed by
* [Winnie](https://github.com/wongw859)
* [Martin](https://github.com/auntRaunt)
* [Charles](https://github.com/Jarlzc)
* [Venus](https://github.com/vscsi)
