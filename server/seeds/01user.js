
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: 'Martin1234', user_pw: 'asdfasdf', first_name: 'Martin', last_name: 'Choi', email: 'martin@test.com'},
        {id: 2, username: 'Winnie1234', user_pw: 'asdfasdf', first_name: 'Winnie', last_name: 'Wong', email: 'winnie@test.com'},
        {id: 3, username: 'Venus1234', user_pw: 'asdfasdf', first_name: 'Venus', last_name: 'Chan', email: 'venus@test.com'},
        {id: 4, username: 'Charles1234', user_pw: 'asdfasdf', first_name: 'Charles', last_name: 'Choi', email:'charles@test.com'}
      ]);
    });
};
