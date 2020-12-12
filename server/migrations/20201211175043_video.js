
exports.up = function(knex) {
  return knex.schema.createTable('video', (table)=>{
      table.increments('id').primary();
      table.text('video_link_id');
      table.text('video_room_name');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('video');
};
