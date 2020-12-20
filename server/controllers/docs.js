const knex = require("../models/knex")

// exports.getDocs = async(req, res, next) => {
//     try{

//         res.json(val || null)

//     } catch (error) {
//         console.log(error.message)
//     }
// }


// check if the doc exists
exports.postCheckUpdateDoc = async(req, res, next) => {
    let{docContent, docName} = req.body

    console.log(docContent, "AND THE NAME", docName)
    // let check = await knex('document').select(1).where({
    //     document_name: docName,
    // })

    // if(check.length > 0) {
    //     //update the database instead
    //     let update = await knex('document').where({document_name: docName}).update({document_content: docContent})
    // } else {
    //     next()
    // }

}

exports.postSaveNewDoc = async(req, res, next) =>{
    let{docContent, docName} = req.body

    console.log("SAVING THE DOC", docContent, docName)

    // await knex('document').insert({
    //     document_name: docName,
    //     document_content: docContent
    // })


}