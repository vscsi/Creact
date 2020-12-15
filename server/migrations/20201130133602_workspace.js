
exports.up = function(knex) {
    return knex.schema.createTable('workspace', (table)=>{
        table.increments('id').primary();
        table.text('workspace_name').notNullable();
        table.timestamp('created_at', { precision: 6 }).defaultTo(knex.fn.now(6));
        table.integer('max_user');
      })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('workspace');
  };
  