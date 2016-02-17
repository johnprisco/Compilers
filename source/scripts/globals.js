var _Lexer = TSC.Lexer;
var _Tokens = [];
// Token Types
// TODO: probably forgot a couple...
var LEFT_BRACE = '{';
var RIGHT_BRACE = '}';
var LEFT_PAREN = '(';
var RIGHT_PAREN = ')';
var ASSIGNMENT = '=';
var EQUAL = '==';
var NOT_EQUAL = '!=';
var PRINT = 'print';
var WHILE = 'while';
var IF = 'if';
var INT = 'int';
var STRING = 'string';
var BOOLEAN = 'boolean';
var BOOLEAN_OPERATOR = 'boolean operator';
var CHARACTER = 'character';
var DIGIT = 'digit';
var SPACE = 'space';
var QUOTE = '"';
var PLUS = '+';
var END_OF_PROGRAM = '$';
var IDENTIFIER = 'identifier';
// Global variables
var tokens = "";
var tokenIndex = 0;
var currentToken = "";
var errorCount = 0;
var EOF = "$";
//# sourceMappingURL=globals.js.map