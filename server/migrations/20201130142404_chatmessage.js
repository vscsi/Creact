
exports.up = function(knex) {
    return knex.schema.createTable('chatmessage', (table)=>{
        table.increments('id').primary();
        table.text('chatmessage_content');
        table.timestamp('created_at', { precision: 6 }).defaultTo(knex.fn.now(6));
        table.text('imgurl');
        table.integer('user_id').unsigned();
        table.foreign('user_id').references('users.id');
        table.integer('chatroom_id').unsigned();
        table.foreign('chatroom_id').references('chatroom.id');
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('chatmessage');
  };
  