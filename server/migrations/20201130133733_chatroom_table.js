
exports.up = function(knex) {
    return knex.schema.createTable('chatroom', (table)=>{
        table.increments('id').primary();
        table.boolean('chatroom_type').defaultTo('true').notNullable;
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('chatroom');
  };
  
