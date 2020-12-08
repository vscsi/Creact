
exports.up = function(knex) {
    return knex.schema.createTable('user_workspace', (table)=>{
        table.increments('id').primary();
        table.integer('workspace_id').unsigned();
        table.foreign('workspace_id').references('workspace.id');
        table.integer('user_id').unsigned();
        table.foreign('user_id').references('users.id');
        table.boolean('workspace_admin').defaultTo('false').notNullable;
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('user_workspace');
  };
  