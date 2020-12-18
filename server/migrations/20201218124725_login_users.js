exports.up = function (knex) {
  return knex.schema.createTable("login_users", (table) => {
    table.increments("id").primary();
    table.text("username").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("login_users");
};
