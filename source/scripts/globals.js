var _Lexer = TSC.Lexer;
var _Tokens = [];
var _CurrentToken = null;
// Token Types
var LEFT_BRACE = { type: 'LEFT_BRACE', value: '{' };
var RIGHT_BRACE = { type: 'RIGHT_BRACE', value: '}' };
var LEFT_PAREN = { type: 'LEFT_PAREN', value: '(' };
var RIGHT_PAREN = { type: 'RIGHT_PAREN', value: ')' };
var ASSIGNMENT = { type: 'ASSIGNMENT', value: '=' };
var EQUAL = { type: 'EQUAL', value: '==' };
var NOT_EQUAL = { type: 'NOT_EQUAL', value: '!=' };
var PRINT = { type: 'PRINT', value: 'print' };
var WHILE = { type: 'WHILE', value: 'while' };
var IF = { type: 'IF', value: 'if' };
var INT = { type: 'INT', value: 'int' };
var STRING = { type: 'STRING', value: 'string' };
var BOOLEAN = { type: 'BOOLEAN', value: 'boolean' };
var TRUE = { type: 'TRUE', value: 'true' };
var FALSE = { type: 'FALSE', value: 'false' };
var CHARACTER = { type: 'CHARACTER', value: '' };
var DIGIT = { type: 'DIGIT', value: '' };
var SPACE = { type: 'SPACE', value: ' ' };
var QUOTE = { type: 'QUOTE', value: '"' };
var PLUS = { type: 'PLUS', value: '+' };
var END_OF_PROGRAM = { type: 'END_OF_PROGRAM', value: '$' };
var IDENTIFIER = { type: 'IDENTIFIER', value: '' };
var _Keywords = [PRINT, WHILE, IF, INT, STRING, BOOLEAN, TRUE, FALSE];
var _Punctuation = [LEFT_BRACE, RIGHT_BRACE, LEFT_PAREN, RIGHT_PAREN,
    ASSIGNMENT, EQUAL, NOT_EQUAL, QUOTE, PLUS, END_OF_PROGRAM];
// Global variables
var tokens = "";
var tokenIndex = 0;
var currentToken = "";
var errorCount = 0;
var EOF = "$";
//# sourceMappingURL=globals.js.map