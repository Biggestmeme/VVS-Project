"use strict";
exports.__esModule = true;
var Iroh = require("iroh");
var chatModifiers1 = require("../controllers/chat/chatInputModifier");
var chatModifiers = chatModifiers1;
var stripAfterCommandCode = new Iroh.Stage("chatModifiers.stripAfterCommand('do:w loremipsum')");
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
