
exports.up = function(knex) {
  return knex.schema.createTable('video_workspace', (table)=>{
      table.increments('id').primary();
      table.integer('video_id').unsigned();
      table.foreign('video_id').references('video.id');
      table.integer('workspace_id').unsigned();
      table.foreign('workspace_id').references('workspace.id');
      table.integer('users_id').unsigned();
      table.foreign('users_id').references('users.id');
  })
};

exports.dwno = function(knex) {
  return knex.schema.dropTable('video_workspace');
};
