'use strict'

function getType(type) {
    switch (type) {
        case 'Tests':
            return 1;

        case 'ODIs':
            return 2;

        case 'T20Is':
            return 3;

        case 'First-class':
            return 4;

        case 'List A':
            return 5;

        case 'Twenty20':
            return 6;
    }
}

function returnDefault(input) {
    if (input.trim() === '' || input.trim() === '-' || input.trim() === null) {
        return '0';
    }
    
    return input.trim();
}

function missingFields()
{ }

module.exports = {getType:getType,returnDefault:returnDefault};