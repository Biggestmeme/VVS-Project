"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodegui_1 = require("@nodegui/nodegui");
const logox200_png_1 = __importDefault(require("../assets/logox200.png"));
const server_1 = require("../../server");
const win = new nodegui_1.QMainWindow();
win.setWindowTitle("Server");
const centralWidget = new nodegui_1.QWidget();
centralWidget.setObjectName("myroot");
const rootLayout = new nodegui_1.FlexLayout();
centralWidget.setLayout(rootLayout);
const serverStateLabel = new nodegui_1.QLabel();
server_1.Server.getInstance();
serverStateLabel.setObjectName("ServerState");
switch (server_1.Server.getServerState()) {
    case 0:
        serverStateLabel.setText("Server State : Running ");
        break;
    case 1:
        serverStateLabel.setText("Server State : Refusing new connections ");
        break;
    case 0:
        serverStateLabel.setText("Server State : Maintanance ");
        break;
    case 0:
        serverStateLabel.setText("Server State : Stopped ");
        break;
}
setTimeout(() => {
    server_1.Server.changeServervState(2);
}, 5000);
serverStateLabel.setInlineStyle(`


`);
const button = new nodegui_1.QPushButton();
button.setIcon(new nodegui_1.QIcon(logox200_png_1.default));
const label2 = new nodegui_1.QLabel();
label2.setText("World");
label2.setInlineStyle(`
  position:relative;
  left:50%;
  color: red;
`);
rootLayout.addWidget(serverStateLabel);
rootLayout.addWidget(button);
rootLayout.addWidget(label2);
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
