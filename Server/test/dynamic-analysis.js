"use strict";
exports.__esModule = true;
var Iroh = require("iroh");
var chatModifiers1 = require("../controllers/chat/chatInputModifier");
var chatVerifiers1 = require("../controllers/chat/chatMessageVerifiers");
var chatModifiers = chatModifiers1;
var chatVerifiers = chatVerifiers1;
var stripAfterCommandCode = new Iroh.Stage("chatModifiers.stripAfterCommand('do:w loremipsum')");
var handleReceivedMessage = new Iroh.Stage("chatVerifiers.isHTML('bogdan123')");
var chatVerifiers_isHTML = new Iroh.Stage("chatModifiers.stripNewLine('do:w')");
var chatModifiers_stripAfterCommand = new Iroh.Stage("chatVerifiers.checkMessageConditions('hello world')");
var chatModifiers_stripNewLine = new Iroh.Stage("chatVerifiers.isGameCommand('do:w')");
// function call
stripAfterCommandCode.addListener(Iroh.CALL)
    .on("before", function (e) {
    var external = e.external ? "#external" : "";
    console.log(" ".repeat(e.indent) + "call", e.name, external, "(", e.arguments, ")");
    //console.log(e.getSource());
})
    .on("after", function (e) {
    var external = e.external ? "#external" : "";
    console.log(" ".repeat(e.indent) + "call", e.name, "end", external, "->", [e["return"]]);
    //console.log(e.getSource());
});
// function
stripAfterCommandCode.addListener(Iroh.FUNCTION)
    .on("enter", function (e) {
    var sloppy = e.sloppy ? "#sloppy" : "";
    if (e.sloppy) {
        console.log(" ".repeat(e.indent) + "call", e.name, sloppy, "(", e.arguments, ")");
        //console.log(e.getSource());
    }
})
    .on("leave", function (e) {
    var sloppy = e.sloppy ? "#sloppy" : "";
    if (e.sloppy) {
        console.log(" ".repeat(e.indent) + "call", e.name, "end", sloppy, "->", [void 0]);
        //console.log(e.getSource());
    }
})
    .on("return", function (e) {
    var sloppy = e.sloppy ? "#sloppy" : "";
    if (e.sloppy) {
        console.log(" ".repeat(e.indent) + "call", e.name, "end", sloppy, "->", [e["return"]]);
        //console.log(e.getSource());
    }
});
// program
stripAfterCommandCode.addListener(Iroh.PROGRAM)
    .on("enter", function (e) {
    console.log(" ".repeat(e.indent) + "Program");
})
    .on("leave", function (e) {
    console.log(" ".repeat(e.indent) + "Program end", "->", e["return"]);
});
eval(stripAfterCommandCode.script);
// function call
handleReceivedMessage.addListener(Iroh.CALL)
    .on("before", function (e) {
    var external = e.external ? "#external" : "";
    console.log(" ".repeat(e.indent) + "call", e.name, external, "(", e.arguments, ")");
    //console.log(e.getSource());
})
    .on("after", function (e) {
    var external = e.external ? "#external" : "";
    console.log(" ".repeat(e.indent) + "call", e.name, "end", external, "->", [e["return"]]);
    //console.log(e.getSource());
});
// function
handleReceivedMessage.addListener(Iroh.FUNCTION)
    .on("enter", function (e) {
    var sloppy = e.sloppy ? "#sloppy" : "";
    if (e.sloppy) {
        console.log(" ".repeat(e.indent) + "call", e.name, sloppy, "(", e.arguments, ")");
        //console.log(e.getSource());
    }
})
    .on("leave", function (e) {
    var sloppy = e.sloppy ? "#sloppy" : "";
    if (e.sloppy) {
        console.log(" ".repeat(e.indent) + "call", e.name, "end", sloppy, "->", [void 0]);
        //console.log(e.getSource());
    }
})
    .on("return", function (e) {
    var sloppy = e.sloppy ? "#sloppy" : "";
    if (e.sloppy) {
        console.log(" ".repeat(e.indent) + "call", e.name, "end", sloppy, "->", [e["return"]]);
        //console.log(e.getSource());
    }
});
// program
handleReceivedMessage.addListener(Iroh.PROGRAM)
    .on("enter", function (e) {
    console.log(" ".repeat(e.indent) + "Program");
})
    .on("leave", function (e) {
    console.log(" ".repeat(e.indent) + "Program end", "->", e["return"]);
});
eval(handleReceivedMessage.script);
// function call
chatVerifiers_isHTML.addListener(Iroh.CALL)
    .on("before", function (e) {
    var external = e.external ? "#external" : "";
    console.log(" ".repeat(e.indent) + "call", e.name, external, "(", e.arguments, ")");
    //console.log(e.getSource());
})
    .on("after", function (e) {
    var external = e.external ? "#external" : "";
    console.log(" ".repeat(e.indent) + "call", e.name, "end", external, "->", [e["return"]]);
    //console.log(e.getSource());
});
// function
chatVerifiers_isHTML.addListener(Iroh.FUNCTION)
    .on("enter", function (e) {
    var sloppy = e.sloppy ? "#sloppy" : "";
    if (e.sloppy) {
        console.log(" ".repeat(e.indent) + "call", e.name, sloppy, "(", e.arguments, ")");
        //console.log(e.getSource());
    }
})
    .on("leave", function (e) {
    var sloppy = e.sloppy ? "#sloppy" : "";
    if (e.sloppy) {
        console.log(" ".repeat(e.indent) + "call", e.name, "end", sloppy, "->", [void 0]);
        //console.log(e.getSource());
    }
})
    .on("return", function (e) {
    var sloppy = e.sloppy ? "#sloppy" : "";
    if (e.sloppy) {
        console.log(" ".repeat(e.indent) + "call", e.name, "end", sloppy, "->", [e["return"]]);
        //console.log(e.getSource());
    }
});
// program
chatVerifiers_isHTML.addListener(Iroh.PROGRAM)
    .on("enter", function (e) {
    console.log(" ".repeat(e.indent) + "Program");
})
    .on("leave", function (e) {
    console.log(" ".repeat(e.indent) + "Program end", "->", e["return"]);
});
eval(chatVerifiers_isHTML.script);
// function call
chatModifiers_stripAfterCommand.addListener(Iroh.CALL)
    .on("before", function (e) {
    var external = e.external ? "#external" : "";
    console.log(" ".repeat(e.indent) + "call", e.name, external, "(", e.arguments, ")");
    //console.log(e.getSource());
})
    .on("after", function (e) {
    var external = e.external ? "#external" : "";
    console.log(" ".repeat(e.indent) + "call", e.name, "end", external, "->", [e["return"]]);
    //console.log(e.getSource());
});
// function
chatModifiers_stripAfterCommand.addListener(Iroh.FUNCTION)
    .on("enter", function (e) {
    var sloppy = e.sloppy ? "#sloppy" : "";
    if (e.sloppy) {
        console.log(" ".repeat(e.indent) + "call", e.name, sloppy, "(", e.arguments, ")");
        //console.log(e.getSource());
    }
})
    .on("leave", function (e) {
    var sloppy = e.sloppy ? "#sloppy" : "";
    if (e.sloppy) {
        console.log(" ".repeat(e.indent) + "call", e.name, "end", sloppy, "->", [void 0]);
        //console.log(e.getSource());
    }
})
    .on("return", function (e) {
    var sloppy = e.sloppy ? "#sloppy" : "";
    if (e.sloppy) {
        console.log(" ".repeat(e.indent) + "call", e.name, "end", sloppy, "->", [e["return"]]);
        //console.log(e.getSource());
    }
});
// program
chatModifiers_stripAfterCommand.addListener(Iroh.PROGRAM)
    .on("enter", function (e) {
    console.log(" ".repeat(e.indent) + "Program");
})
    .on("leave", function (e) {
    console.log(" ".repeat(e.indent) + "Program end", "->", e["return"]);
});
eval(chatModifiers_stripAfterCommand.script);
// function call
chatModifiers_stripNewLine.addListener(Iroh.CALL)
    .on("before", function (e) {
    var external = e.external ? "#external" : "";
    console.log(" ".repeat(e.indent) + "call", e.name, external, "(", e.arguments, ")");
    //console.log(e.getSource());
})
    .on("after", function (e) {
    var external = e.external ? "#external" : "";
    console.log(" ".repeat(e.indent) + "call", e.name, "end", external, "->", [e["return"]]);
    //console.log(e.getSource());
});
// function
chatModifiers_stripNewLine.addListener(Iroh.FUNCTION)
    .on("enter", function (e) {
    var sloppy = e.sloppy ? "#sloppy" : "";
    if (e.sloppy) {
        console.log(" ".repeat(e.indent) + "call", e.name, sloppy, "(", e.arguments, ")");
        //console.log(e.getSource());
    }
})
    .on("leave", function (e) {
    var sloppy = e.sloppy ? "#sloppy" : "";
    if (e.sloppy) {
        console.log(" ".repeat(e.indent) + "call", e.name, "end", sloppy, "->", [void 0]);
        //console.log(e.getSource());
    }
})
    .on("return", function (e) {
    var sloppy = e.sloppy ? "#sloppy" : "";
    if (e.sloppy) {
        console.log(" ".repeat(e.indent) + "call", e.name, "end", sloppy, "->", [e["return"]]);
        //console.log(e.getSource());
    }
});
// program
chatModifiers_stripNewLine.addListener(Iroh.PROGRAM)
    .on("enter", function (e) {
    console.log(" ".repeat(e.indent) + "Program");
})
    .on("leave", function (e) {
    console.log(" ".repeat(e.indent) + "Program end", "->", e["return"]);
});
eval(chatModifiers_stripNewLine.script);
