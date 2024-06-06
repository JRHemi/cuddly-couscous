function handelProfileGet (req, res, db) {
    const { id } = req.params;
  
    db.select("*").from("users").where({id})
    .then(data => {
      if (data.length) {
        res.json(data[0]);
      } else {
        res.status(404).json("User not found")
      }
    })
}

module.exports = {
    handelProfileGet: handelProfileGet
}