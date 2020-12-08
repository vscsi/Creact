
exports.up = function(knex) {
    return knex.schema.createTable('document_workspace', (table)=>{
        table.increments('id').primary();
        table.integer('workspace_id').unsigned();
        table.foreign('workspace_id').references('workspace.id');
        table.integer('document_id').unsigned();
        table.foreign('document_id').references('document.id');
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('document_workspace');
  };
  