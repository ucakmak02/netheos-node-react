const query = require("../utils/config");

module.exports.addData = async function (req, res) {
    let values = req.body;
    let dataValues = [
        values.question,
        values.answer,
        values.tag,
    ];
    let sql = "INSERT INTO `faq` (`question`, `answer`, `tag`) VALUES (?)";
    await query(sql, [dataValues]);

    let tagList = [
        "Envoyer un colis",
        "Envoyer un courrirer",
        "Envoyer un objet de valeur",
        "Donner procuration"
    ]
    let returnData = {};
    for (const tag of tagList) {
        let sqlSelect = "SELECT * FROM faq USE INDEX (tag) WHERE tag = (?)";
        let rows = await query(sqlSelect, tag)
        if(rows.length > 0){
            returnData[tag] = {rows}
        }
      }
    return res.json(returnData);
};