
exports.up = function(knex) {
  return knex.schema.createTable('video', (table)=>{
      table.increments('id').primary();
      table.text('video_room_pw');
      table.text('video_room_name');
      table.text('video_hashed_room_name');
      table.text('video_room_url');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('video');
};
