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
![alt text](/src/images/wireframe/landingPage.png)
![alt text](/src/images/wireframe/loginPage.png)
![alt text](/src/images/wireframe/registerPage.png)

### Profile and workspaces
#### Profile page
![alt text](/src/images/wireframe/profilePage.png)

#### workspace searching
![alt text](/src/images/wireframe/searchWorkspace.png)


### Features
#### Realtime chatroom
![alt text](/src/images/wireframe/chatroom.png)
#### Realtime collaboration document
![alt text](/src/images/wireframe/collaborationDocPage.png)
#### Calendar for tasks display
![alt text](/src/images/wireframe/calendar.png)
#### Collaboration task 
![alt text](/src/images/wireframe/collaborationTaskPage.png)
#### Video conferencing 
![alt text](/src/images/wireframe/video.png)


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

├── App.css
├── App.js
├── Pages
│   ├── DashboardPage
│   │   ├── DashboardComponent
│   │   │   ├── DashboardAddSocial.js
│   │   │   ├── DashboardCreateWorkspace.js
│   │   │   ├── DashboardCreateWorkspace.module.css
│   │   │   ├── DashboardFeatureSidebar.js
│   │   │   ├── DashboardFriendSidebar.js
│   │   │   ├── DashboardMain.js
│   │   │   ├── DashboardMain.module.css
│   │   │   ├── DashboardNavbar.js
│   │   │   ├── DashboardNavbar.module.css
│   │   │   ├── DashboardProfieSidebar.js
│   │   │   ├── DashboardProfileHome.js
│   │   │   ├── DashboardProfileMain.js
│   │   │   ├── DashboardProfileUserCalender.js
│   │   │   ├── DashboardProfileUserInfo.js
│   │   │   ├── DashboardSearchWorkspace.js
│   │   │   ├── DashboardSearchWorkspace.module.css
│   │   │   ├── DashboardSidebar.js
│   │   │   ├── DashboardSidebar.module.css
│   │   │   └── DashboardSidebarEachWorkspace.js
│   │   ├── DashboardContainer.jsx
│   │   ├── DashboardContainer.module.css
│   │   ├── DashboardFeatures
│   │   │   ├── CalenderPage
│   │   │   │   ├── CalenderContainer.js
│   │   │   │   └── component
│   │   │   │       └── EventCalendar.js
│   │   │   ├── ChatroomPage
│   │   │   │   ├── Chat.module.css
│   │   │   │   ├── ChatInput
│   │   │   │   │   ├── ChatInput.css
│   │   │   │   │   └── ChatInput.js
│   │   │   │   ├── ChatroomContainer.js
│   │   │   │   └── Message
│   │   │   │       ├── Message.css
│   │   │   │       └── Message.js
│   │   │   ├── CollaborationNotePage
│   │   │   │   ├── CollabNoteContainer.js
│   │   │   │   └── CollaborationNote.module.css
│   │   │   ├── CollaborationTaskPage
│   │   │   │   ├── CollabTaskContainer.js
│   │   │   │   ├── CollabTaskContainer.module.css
│   │   │   │   └── components
│   │   │   │       ├── CollabTaskBox.jsx
│   │   │   │       ├── CollabTaskBox.module.css
│   │   │   │       ├── CollabTaskList.jsx
│   │   │   │       ├── CollabTaskList.module.css
│   │   │   │       ├── CollabTaskListItem.jsx
│   │   │   │       ├── CollabTaskListItem.module.css
│   │   │   │       ├── Pagination.js
│   │   │   │       └── Pagination.module.css
│   │   │   ├── DropboxPage
│   │   │   │   └── DropboxContainer.js
│   │   │   ├── VideoPage
│   │   │   │   ├── VideoConferenceRoom.js
│   │   │   │   ├── VideoConferenceRoom.module.css
│   │   │   │   ├── VideoContainer.js
│   │   │   │   ├── VideoCreateRoom.js
│   │   │   │   ├── VideoCreateRoom.module.css
│   │   │   │   └── VideoJoinRoom.js
│   │   │   └── WhiteboardPage
│   │   │       ├── Whiteboard.css
│   │   │       ├── Whiteboard.module.css
│   │   │       └── WhiteboardContainer.js
│   │   └── DashboardProfileContainer.js
│   ├── ErrorPage
│   │   ├── ErrorContainer.js
│   │   └── ErrorContainer.module.css
│   ├── LandingPage
│   │   ├── Content
│   │   │   ├── Download
│   │   │   │   └── Download.jsx
│   │   │   ├── Home
│   │   │   │   ├── Data.js
│   │   │   │   ├── Header.jsx
│   │   │   │   ├── HeroSection
│   │   │   │   │   ├── HeroSection.jsx
│   │   │   │   │   └── Herosection.module.css
│   │   │   │   ├── Home.jsx
│   │   │   │   ├── Wave.jsx
│   │   │   │   ├── Wave2.jsx
│   │   │   │   ├── Wave3.jsx
│   │   │   │   ├── Waves
│   │   │   │   │   └── Wave.module.css
│   │   │   │   └── Waves.js
│   │   │   └── gridref.js
│   │   ├── Footer
│   │   │   ├── FooterContainer.js
│   │   │   └── FooterContainer.module.css
│   │   ├── LandingPageContainer.js
│   │   ├── Nav
│   │   │   ├── Burger.jsx
│   │   │   ├── NavBar.jsx
│   │   │   └── RightBar.jsx
│   │   ├── css
│   │   │   ├── fonts
│   │   │   │   ├── ...
│   │   │   └── ...
│   │   ├── img 
│   │   │   ├── ...
│   │   ├── sass
│   │   │   ├── abstracts
│   │   │   │   ├── _functions.scss
│   │   │   │   ├── _mixins.scss
│   │   │   │   └── _variables.scss
│   │   │   ├── base
│   │   │   │   ├── _animation.scss
│   │   │   │   ├── _base.scss
│   │   │   │   ├── _typography.scss
│   │   │   │   └── _utilites.scss
│   │   │   ├── component
│   │   │   │   ├── _button.scss
│   │   │   │   ├── _card.scss
│   │   │   │   ├── _feature-box.scss
│   │   │   │   └── _svgstyle.scss
│   │   │   ├── landingpage.scss
│   │   │   ├── layout
│   │   │   │   ├── _footer.scss
│   │   │   │   ├── _grid.scss
│   │   │   │   └── _header.scss
│   │   │   └── pages
│   │   │       └── _home.scss
│   │   └── svg
│   │       ├── OnlineCollab.svg
│   │       ├── collaborate.svg
│   │       ├── icons
│   │       │   ├── browser.svg
│   │       │   ├── calendar.svg
│   │       │   ├── chat.svg
│   │       │   └── clipboard.svg
│   │       └── lookingpost.svg
│   ├── LoginPage
│   │   ├── Login.module.css
│   │   └── LoginContainer.js
│   └── RegisterPage
│       ├── Register.module.css
│       └── RegisterContainer.js
├── api
│   └── task
│       └── task.js
├── css
│   ├── header.css
│   ├── herosection.css
│   ├── index.css
│   ├── nav.css
│   └── wave.css
├── images
│   ├── arnold.jpg
│   ├── blurbackground.jpg
│   ├── creact.png
│   ├── creactBlack.png
│   ├── creactWhite.png
│   ├── firework.png
│   ├── header-1.jpeg
│   ├── header-2.jpeg
│   ├── header-3.jpeg
│   ├── sunset.jpg
│   ├── tomcruise.jpg
│   └── wireframe
│       ├── calendar.png
│       ├── chatroom.png
│       ├── collaborationDocPage.png
│       ├── collaborationTask.png
│       ├── landingPage.png
│       ├── loginPage.png
│       ├── profilePage.png
│       ├── registerPage.png
│       ├── searchWorkspace.png
│       └── video.png
├── index.css
├── index.js
└── services
    ├── auth-header.js
    ├── auth.service.js
    ├── getCurrentWorkspace.js
    └── user.service.js


## Developed by
* [Winnie](https://github.com/wongw859)
* [Martin](https://github.com/auntRaunt)
* [Charles](https://github.com/Jarlzc)
* [Venus](https://github.com/vscsi)
