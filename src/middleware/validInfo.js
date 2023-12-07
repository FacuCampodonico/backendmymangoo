module.exports = (req, res, next) => {
    const { mail, password, name} = req.body;
  
    function validEmail(userEmail) {
      return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
    }
  
    if (req.path === "/user") {
      console.log(!mail.length);
      if (![mail, password].every(Boolean)) {
        return res.status(401).json("Missing Credentials");
      } else if (!validEmail(mail)) {
        return res.status(401).json("Invalid Email");
      }

    } else if (req.path === "/login") {
      if (![mail, password].every(Boolean)) {
        return res.status(401).json("Missing Credentials");
      } else if (!validEmail(mail)) {
        return res.status(401).json("Invalid Email");
      }
    }
  
    next();
};
