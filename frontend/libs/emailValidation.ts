export default function emailValidation(enteredEmail: string) {
  // var mail_format =
  // /^[a-zA-Z0-9.! #$%&'*+/=? ^_`{|}~-]+@[a-zA-Z0-9-]+(?:\. [a-zA-Z0-9-]+)*$/;
  const mail_format = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (enteredEmail.match(mail_format)) {
    return true;
  } else {
    return false;
  }
}
