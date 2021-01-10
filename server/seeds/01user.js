
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: 'Admin', user_pw: '$2b$10$8lg.0GW3dbexHXfRdQRFsOY31hLyGL2VxD7ekJ.sIwTgZZRdl3dS.', first_name: 'Admin', last_name: 'Admin', email:'admin@test.com', img:'https://visualpharm.com/assets/23/Woman%20Profile-595b40b65ba036ed117d36ff.svg'  }
      ]);
    });
};