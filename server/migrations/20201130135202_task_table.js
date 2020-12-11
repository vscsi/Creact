
exports.up = function(knex) {
    return knex.schema.createTable('task', (table)=>{
        table.increments('id').primary();
        table.text('task_name').notNullable();
        table.text('task_content').notNullable();
        table.timestamp('deadline').notNullable();
        table.integer('user_id').unsigned();
        table.foreign('user_id').references('users.id');
        table.boolean('finished').defaultTo(false);
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('task');
  };
  