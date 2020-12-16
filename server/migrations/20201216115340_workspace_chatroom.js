
exports.up = function(knex) {
    return knex.schema.createTable('workspace_chatroom', (table)=>{
        table.increments('id').primary();
        table.integer('workspace_id').unsigned();
        table.foreign('workspace_id').references('workspace.id');
        table.integer('chatroom_id').unsigned();
        table.foreign('chatroom_id').references('chatroom.id');
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('workspace_chatroom');
  };
  