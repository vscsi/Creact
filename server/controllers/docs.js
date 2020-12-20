const knex = require("../models/knex")

exports.getDoc = async(req, res, next) => {
    let{docName} = req.body

    let getDoc = await knex('document').select('document_content').where({document_name: docName})
    console.log(getDoc)
    console.log('helping you get doc now')

    res.send(getDoc)
}


// check if the doc exists
exports.postCheckUpdateSaveDoc = async(req, res, next) => {
    let{docContent, docName} = req.body

    console.log(docContent, "AND THE NAME", docName)
    let check = await knex('document').select(1).where({
        document_name: docName,
    })

    if(check.length > 0) {
        //update the database instead
        let update = await knex('document').where({document_name: docName}).update({document_content: docContent})
    } else {
        await knex('document').insert({
            document_name: docName,
            document_content: docContent
        })
    }
    res.send("check and updated!")
}