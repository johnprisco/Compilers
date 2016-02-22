var _Lexer = TSC.Lexer;
var _Parser = TSC.Parser;
var _Tokens = [];
var _CurrentToken: TSC.Token = null;
var _TokenIndex: number = 0;

// Token Types
const LEFT_BRACE       = {type: 'LEFT_BRACE', value: '{'};
const RIGHT_BRACE      = {type: 'RIGHT_BRACE', value: '}'};
const LEFT_PAREN       = {type: 'LEFT_PAREN', value: '('};
const RIGHT_PAREN      = {type: 'RIGHT_PAREN', value: ')'};
const ASSIGNMENT       = {type: 'ASSIGNMENT', value: '='};
const EQUAL            = {type: 'EQUAL', value: '=='};
const NOT_EQUAL        = {type: 'NOT_EQUAL', value: '!='};
const PRINT            = {type: 'PRINT', value: 'print'};
const WHILE            = {type: 'WHILE', value: 'while'};
const IF               = {type: 'IF', value: 'if'};
const INT              = {type: 'INT', value: 'int'};
const STRING           = {type: 'STRING', value: 'string'};
const BOOLEAN          = {type: 'BOOLEAN', value: 'boolean'};
const TRUE             = {type: 'TRUE', value: 'true'};
const FALSE            = {type: 'FALSE', value: 'false'};
const CHARACTER        = {type: 'CHARACTER', value: ''};
const DIGIT            = {type: 'DIGIT', value: ''};
const SPACE            = {type: 'SPACE', value: ' '};
const QUOTE            = {type: 'QUOTE', value: '"'};
const PLUS             = {type: 'PLUS', value: '+'};
const END_OF_PROGRAM   = {type: 'END_OF_PROGRAM', value: '$'};
const IDENTIFIER       = {type: 'IDENTIFIER', value: ''};

const _Keywords = [PRINT, WHILE, IF, INT, STRING, BOOLEAN, TRUE, FALSE];
const _Punctuation = [LEFT_BRACE, RIGHT_BRACE, LEFT_PAREN, RIGHT_PAREN,
                      ASSIGNMENT, EQUAL, NOT_EQUAL, QUOTE, PLUS, END_OF_PROGRAM];

// Global variables
    var tokens = "";
    var tokenIndex = 0;
    var currentToken = "";
    var errorCount = 0;
    var EOF = "$";
