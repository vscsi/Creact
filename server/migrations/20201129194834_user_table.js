
exports.up = function(knex) {
  return knex.schema.createTable('users', (table)=>{
      table.increments('id').primary();
      table.text('username').notNullable();
      table.text('user_pw').notNullable();
      table.text('first_name').notNullable();
      table.text('last_name').notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
