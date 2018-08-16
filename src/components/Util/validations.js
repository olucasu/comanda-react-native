function isUrl(str)
{
  regexp =  /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
  
  console.log(str);

  if (regexp.test(str))
      {
        return true;
      }
      else
      {
        return false;
      }
}

export {isUrl}
 