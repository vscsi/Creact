
exports.up = function(knex) {
    return knex.schema.createTable('task_workspace', (table)=>{
        table.increments('id').primary();
        table.integer('workspace_id').unsigned();
        table.foreign('workspace_id').references('workspace.id');
        table.integer('task_id').unsigned();
        table.foreign('task_id').references('task.id');
        table.integer('user_id').unsigned();
        table.foreign('user_id').references('users.id');
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('task_workspace');
  };
  