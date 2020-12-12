
exports.up = function(knex) {
  return knex.schema.createTable('video_workspace', (table)=>{
      table.increments('id').primary();
      table.integer('video_id').unsigned();
      table.foreign('video_id').references('video.id');
      table.integer('workspace_id').unsigned();
      table.foreign('workspace_id').references('workspace.id');
      table.integer('user_id').unsigned();
      table.foreign('user_id').references('users.id');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('video_workspace');
};
