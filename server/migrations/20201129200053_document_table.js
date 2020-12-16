
exports.up = function(knex) {
  return knex.schema.createTable('document', (table)=>{
      table.increments('id').primary();
      table.text('document_name');
      table.text('document_content');
      table.timestamps(true, true)
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('document');
};
