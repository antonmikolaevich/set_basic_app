function getFieldValue(string, fieldName) {
    const fieldPattern = `${fieldName}: `;
    const value = string.replace(fieldPattern, '');
    return value;
}

module.exports = {
    getFieldValue
}