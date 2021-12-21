"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nodegui_1 = require("@nodegui/nodegui");
const server_1 = require("../../server");
const win = new nodegui_1.QMainWindow();
win.setWindowTitle("Server");
const centralWidget = new nodegui_1.QWidget();
centralWidget.setObjectName("myroot");
const rootLayout = new nodegui_1.FlexLayout();
centralWidget.setLayout(rootLayout);
const serverStateLabel = new nodegui_1.QLabel();
const serverIPLabel = new nodegui_1.QLabel();
const serverPORTLabel = new nodegui_1.QLabel();
serverStateLabel.setObjectName("ServerState");
serverIPLabel.setObjectName("ServerIP");
serverPORTLabel.setObjectName("ServerPort");
serverStateLabel.setInlineStyle(`


`);
serverIPLabel.setInlineStyle(`


`);
serverPORTLabel.setInlineStyle(`


`);
server_1.Server.getInstance(6001, 0);
server_1.Server.setupServer();
switch (server_1.Server.getServerState()) {
    case 0:
        serverStateLabel.setText("Server State : Running ");
        break;
    case 1:
        serverStateLabel.setText("Server State : Refusing new chat connections ");
        break;
    case 2:
        serverStateLabel.setText("Server State : Maintanance ");
        break;
    case 3:
        serverStateLabel.setText("Server State : Stopped ");
        break;
}
serverIPLabel.setText("Server IP : " + server_1.Server.IP);
serverPORTLabel.setText("Server Port : " + server_1.Server.PORT_APP);
const buttonChangePort = new nodegui_1.QPushButton();
buttonChangePort.setText("change port");
buttonChangePort.addEventListener('clicked', () => {
    let newPort = parseInt(portInput.text());
    server_1.Server.closeHttpServer();
    server_1.Server.changeAppPort(newPort);
    server_1.Server.startHttpServer();
    serverPORTLabel.setText("Server Port : " + newPort);
});
const portInput = new nodegui_1.QLineEdit();
portInput.setObjectName('numCharsInput');
const buttonChangeState = new nodegui_1.QPushButton();
buttonChangeState.setText("Change state");
buttonChangeState.addEventListener('clicked', () => {
    let newState = parseInt(stateInput.text());
    switch (newState) {
        case 0:
            serverStateLabel.setText("Server State : Running ");
            if (server_1.Server.getServerState() != 0) {
                server_1.Server.startChatServer();
                server_1.Server.startHttpServer();
            }
            server_1.Server.changeServervState(0);
            break;
        case 1:
            serverStateLabel.setText("Server State : Refusing new chat connections ");
            server_1.Server.changeServervState(1);
            break;
        case 2:
            serverStateLabel.setText("Server State : Maintanance ");
            server_1.Server.closeHttpServer();
            server_1.Server.closeChatServer();
            server_1.Server.startMaintananceServer();
            server_1.Server.changeServervState(2);
            break;
        case 3:
            serverStateLabel.setText("Server State : Stopped ");
            server_1.Server.closeHttpServer();
            server_1.Server.closeChatServer();
            server_1.Server.changeServervState(3);
            break;
    }
});
const stateInput = new nodegui_1.QLineEdit();
portInput.setObjectName('numCharsInput');
rootLayout.addWidget(serverStateLabel);
rootLayout.addWidget(serverIPLabel);
rootLayout.addWidget(serverPORTLabel);
rootLayout.addWidget(portInput);
rootLayout.addWidget(buttonChangePort);
rootLayout.addWidget(stateInput);
rootLayout.addWidget(buttonChangeState);
win.setCentralWidget(centralWidget);
win.setStyleSheet(`
    #myroot {
      background-color: white;
      padding:15px 15px 15px 15px;
      height: '100%';

    }
    #mylabel {
      font-size: 16px;
      font-weight: bold;
      padding: 1;
    }
  `);
win.show();
global.win = win;
