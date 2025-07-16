function es_url_valido(string) {
  try {
    new URL(string);
    return true;
  } 
  catch {
    return false;
  };
};

module.exports = {es_url_valido};