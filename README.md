# Amadeus Front-End

This project is the front-end for one of my personal projects, called Amadeus.
The purpose of this project is to be an almost exact clone of the iMessage application
that currently exists for Macs/iPhones. For the front-end, I've chosen to copy the iMessage interface, colors
and all. I've selected Angular 2 for the framework, since I've been using Angular for the past year and a half at my workplace, but will likely be creating an implementation in React as well. I've also chosen to use Socket.IO
for the WebSocket implementation. For security reasons, I've removed the API/Websocket urls that the web app
connects to.

## Features

The front-end web app currently supports real-time messaging and updates. When a user receives a text message on their Android device, the front-end will update real-time to show the new message. Emojis are also supported, but there is a caveat. Emojis take up more bytes than normal unicode characters, and so, if there are too many emojis
sent in a message, the message will not be sent (this is because Android usually does some analyzation of a text message before it is sent, and will break up a message into parts if it is too big; the Amadeus Android app does not currently do this).

## High-Level Description of Amadeus

The Amadeus Front-End web application serves as an interface for users (currently only myself) to create text messages from a web-browser. From the web application, the "text message" gets sent to the back-end Node/Express server, and once the server receives it, it sends a push notification down to the user's (my) Android device.
The Android device must have the Amadeus Android app installed. Once the Android app receives the push notification, it parses the payload (which has two notable properties: the text message body and the phone number
for which this message must go to). It then programatically creates and transmits a real text message to the designated phone number with the designated message body.

Amadeus works bi-directionally; a user can use the web app to create text messages to be sent out,
and the web app also receives real-time text messages that the user's phone receives. I.e., when an Android device
receives a text message, the Amadeus Android app will be listening for this event, and contact the back-end server with the time and date, phone number of the sender, and the message payload. From here, the server stores the message in a MySQL database, and also sends the web app a WebSocket message to let the user know that they have a received a text message. The web app then updates that particular conversation with the new message.

## Screenshots

