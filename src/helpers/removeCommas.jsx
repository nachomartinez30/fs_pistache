const removeCommas = str => {
    while (str.search(",") >= 0) {
        str = (str + "").replace(',', '');
    }
    return str;
}

export default removeCommas;