
exports.up = function(knex) {
  return knex.schema.createTable('chatroom', (table)=>{
      table.increments('id').primary();
      table.boolean('chatroom_type').defaultTo('false').notNullable;
      table.integer('number_of_users');
      table.integer('workspace_id').unsigned();
      table.foreign('workspace_id').references('workspace.id');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('chatroom');
};
