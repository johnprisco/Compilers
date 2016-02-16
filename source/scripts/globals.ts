var _Lexer = TSC.Lexer;

// Token Types
const LEFT_BRACE       = '{';
const RIGHT_BRACE      = '}';
const LEFT_PAREN       = '(';
const RIGHT_PAREN      = ')';
const ASSIGNMENT       = '=';
const EQUAL            = '==';
const NOT_EQUAL        = '!=';
const PRINT            = 'print';
const WHILE            = 'while';
const IF               = 'if';
const INT              = 'int';
const STRING           = 'string';
const BOOLEAN          = 'boolean';
const BOOLEAN_OPERATOR = 'boolean operator';
const CHARACTER        = 'character';
const DIGIT            = 'digit';
const SPACE            = 'space';
const QUOTE            = '"';
const PLUS             = '+';
const END_OF_PROGRAM   = '$';
const IDENTIFIER       = 'identifier';

// Global variables
    var tokens = "";
    var tokenIndex = 0;
    var currentToken = "";
    var errorCount = 0;
    var EOF = "$";
