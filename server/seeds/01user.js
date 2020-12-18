
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: 'admin1234', user_pw: 'asdfasdf', first_name: 'Admin', last_name: 'Admin', email:'admin@test.com'}
      ]);
    });
};
