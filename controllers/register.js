//alternative option for syntax using advanced functions


function handleRegister (req, res, db, bcrypt) {
    const { email, username, password } = req.body;
    if (!email || !username || !password) {
      return res.status(400).json('incorrect from submission')
    }
    const hash = bcrypt.hashSync(password);
    db.transaction(trx => {
      trx.insert({
        hash: hash,
        email: email
      })
      .into('login')
      .returning('email')
      .then(loginEmail => {
        return trx('users')
        .returning('*')
        .insert({
          name: username,
          email: loginEmail[0].email,
          joined: new Date(),
        })
        .then(user => {
          res.json(user[0]);
        })
        .catch(err => res.status(400).json("error registering"))
      })
      .then(trx.commit)
      .catch(err => {
        trx.rollback
        res.status(400).json("Error registering user");
      })
      .catch(err => res.status(400).json("Error registering"));
    })
    
  }

  module.exports = {
    handleRegister: handleRegister
  };